import type { User, Appointment, Vehicle, Job } from "./src/classlib/Types";
import axios from "axios";
import  type { MonthBlock, DayBlock } from "./src/classlib/MonthlySchedule";
import {HourDataBlock} from "./src/classlib/MonthlySchedule";



const URL = "http://localhost:5000/api"

export default class BackendService{

    static async createUser(user:User) {
        
        try{
            
            const res = await axios.post(URL + "/user/register", {
                user   
            })
            return(res);

        }catch(err){
            
        }
    }
    static async login(email:string, password:string){
        try{
            const res = await axios.post(URL + "/user/login", {
                email,
                password
            })
            return res;

        }catch(err){

        }
        
    }

    static async registerVehicle(userId: number, vehicle:Vehicle){

        try{
            const res = await axios.post(URL + `/user/${userId}/vehicle`, {
                vehicle
            })
            return res;

        }catch(err){

        }
            
    }

    static async makeAppointment(userId: number, appointment:Appointment){
        try{
            const res = await axios.post(URL + `/user/${userId}/appointmentbooking`, {
                appointment
            })
            return res;

        }catch(err){

        }
    }

    static async getUpcomingJobs() {

        try{
            const res = await axios.get(URL + "/jobs/upcoming");
            return res;

        }catch(err){
            
        }
    }
    static async getCustomers() {

        try{
            const res = await axios.get(URL + "/user/customers");
            return res;

        }catch(err){
            
        }
    }
    static async createJob(job:Job) {

        try{
            const res = await axios.post(URL + "/jobs", {
                job
            });
            return res;

        }catch(err){
            
        }
    }
    static async getAppointments() {

        try{
            const res = await axios.get(URL + "/appointments")
            return res;

        }catch(err){
            
        }
    }

    static async getMonthSchedule(selectedMonth: number, userId: number = 0): Promise<MonthBlock | undefined>{
        const res: MonthBlock = {} as MonthBlock;
        res.month = selectedMonth;

        try {
            const schedule = await axios.get(URL + `/user/${userId}/schedule/${Date.now()}-${selectedMonth}`).then((result)=>result.data, response=>{throw new Error("whoops lol")});
            
            let daysInMonth: number = 0;
            switch (selectedMonth){
                case 0:
                    daysInMonth = 31;
                    break;
                case 1:
                    if ((new Date(Date()).getFullYear() % 4) === 0){
                        daysInMonth = 29;
                    }
                    else{
                        daysInMonth = 28;
                    }
                    break;
                case 2:
                    daysInMonth = 31;
                    break;
                case 3:
                    daysInMonth = 30;
                    break;
                case 4:
                    daysInMonth = 31;
                    break;
                case 5:
                    daysInMonth = 30;
                    break;
                case 6:
                    daysInMonth = 31;
                    break;
                case 7:
                    daysInMonth = 31;
                    break;
                case 8:
                    daysInMonth = 30;
                    break;
                case 9:
                    daysInMonth = 31;
                    break;
                case 10:
                    daysInMonth = 30;
                    break;
                case 11:
                    daysInMonth = 31;
                    break;
                default:
                    if (typeof selectedMonth !== 'number'){
                        throw new TypeError("Type of Month must be a number");
                    }
                    else if (selectedMonth >= 12){
                        throw new RangeError("Value of Month must be less than or equal to 11");
                    }
                    break;
            }

            // generate a Date object that corresponds to the month the user wants to be fed
            // 
            const intendedDate: Date = new Date(Date());
            if (intendedDate.getMonth() === selectedMonth){
                // nothing, will probably refactor this
            }
            else{
                intendedDate.setDate(1);
                intendedDate.setMonth(selectedMonth);
            }
            
            // check for and only add the days that are workdays (not saturday or sunday) to the res object
            for (let i: number = intendedDate.getDate(); i <= daysInMonth; i++){
                // Check for and exclude Saturdays and Sundays
                if (intendedDate.getDay() !== 6 && intendedDate.getDay() !== 0){
                    
                    let workingDayBlock: DayBlock = {} as DayBlock;
                    workingDayBlock.day = i;
                    res.workingDays.push(workingDayBlock);
    
                    intendedDate.setDate(i);
                }
            }


            let incrementor: number = 0;

            // Put the scheduled items into their corresponding hour blocks of every working day
            res.workingDays.forEach((workingDay)=>{
                if (schedule === null){
                    return;
                }

                // not sure that this is correct, do not want to truth-table it
                do {
                    if(workingDay.day == schedule[incrementor].date.getDate()){
                        // this means that it's a jobStage
                        if (schedule[incrementor].jobStage !== null){
                            let hourBlock = new HourDataBlock();

                            hourBlock.blocktype = "JOBSTAGE";
                            hourBlock.id = schedule[incrementor].id;

                            hourBlock.client = schedule[incrementor].jobStage.job.vehicle.owner.firstName + " " +
                                schedule[incrementor].jobStage.job.vehicle.owner.lastName;

                            hourBlock.duration = schedule[incrementor].jobStage.duration;
                            hourBlock.time = schedule[incrementor].date.getHours();
                            hourBlock.description = schedule[incrementor].jobStage.description;

                            // leaving out the address on purpose, since i might choose to leave it out on the UI

                        }
                        // this means that it's an appointment
                        else{
                            let hourBlock = new HourDataBlock();

                            hourBlock.blocktype = "APPOINTMENT";
                            hourBlock.id = schedule[incrementor].id;

                            hourBlock.client = schedule[incrementor].appointment.customer.firstName + " " +
                                schedule[incrementor].appointment.customer.lastName;

                            hourBlock.duration = 1;
                            hourBlock.time = schedule[incrementor].date.getHours();
                            hourBlock.description = schedule[incrementor].appointment.problemDescription;

                            // leaving out the address on purpose, since i might choose to leave it out on the UI
                        }

                        incrementor++;
                    }
                    else{
                        // if the working day is 13 and the day doesn't match because it's 14, then you break without incrementing 
                        // incrementor++;
                        break;
                    }
                }while(true);
            });

            // this tracks the position of each schedule item as a list of all of the ones in the array
            let hourIndex: number = 0;
            // this tracks the hour to ask about, and starts at 8AM. duration of items are added to it to advance which time to check
            let timeToCheck: number = 8;
            // this stores the difference between the hourIndex of a schedule item's time and the time the algorithm checks for next 
            let timeDifference: number = 0;

            // recursive function that adds in the missing blocks between others. i literally don't know if this will work
            function checkBlockDifferenceAddMissing(workingDay: DayBlock){
                // this should break the recursion (intentionally)
                if (timeToCheck >= 17 || workingDay.hourBlocks.length > 9){
                    return;
                }

                if (workingDay.hourBlocks[hourIndex].time == timeToCheck){
                        
                    timeToCheck = workingDay.hourBlocks[hourIndex].time + workingDay.hourBlocks[hourIndex].duration;
                    hourIndex++;

                    checkBlockDifferenceAddMissing(workingDay);

                }
                else{
                    
                    timeDifference = workingDay.hourBlocks[hourIndex].time - timeToCheck;

                    for (let i: number = 0; i < timeDifference; i++){
                        let newHourBlock: HourDataBlock = new HourDataBlock();
                        newHourBlock.time = i;
                        newHourBlock.duration = 1;

                        // need to rework this to account for splice
                        workingDay.hourBlocks.splice( hourIndex++, 0, newHourBlock);
                    }

                    timeToCheck = workingDay.hourBlocks[hourIndex].time + workingDay.hourBlocks[hourIndex].duration;
                    // ASSUMING the postfix in the splice works, the following SHOULDN'T be necessary
                    //hourIndex += timeDifference;
                }
            }

            // forEach to pad the remaining empty spaces of each day with empty hourBlocks
            res.workingDays.forEach((workingDay)=>{
                // this starts when the business starts, i.e. 8AM
                
                // for days with literally no scheduled items, it just generates 9 empty items
                if (workingDay.hourBlocks.length == 0){
                    // i.e 8AM to 5PM
                    for (let i = timeToCheck; i < 17; i++){
                        let newHourBlock: HourDataBlock = new HourDataBlock();
                        newHourBlock.time = i;
                        newHourBlock.duration = 1;

                        workingDay.hourBlocks.push(newHourBlock);
                    }
                }
                else{
                    // sort whatever blocks are there in ascending order by time
                    // this is probably poorly narrowed, need to consult TS docs
                    // also: almost certainly going to break, not sure when and how yet
                    workingDay.hourBlocks.sort((a, b)=> a.time != null ? (b.time != null ? a.time-b.time : -1) : -1);
                    
                    checkBlockDifferenceAddMissing(workingDay);
                }
            });

            console.log(res.month);

            // res.workingDays.forEach(workingDay=>{
            //     console.log(workingDay.day);
            // });

            return res;

        }catch(err){
            return undefined;
        }
    }



}