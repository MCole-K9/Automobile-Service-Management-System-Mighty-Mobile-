import type { User, Appointment, Vehicle, Job, JobStage } from "./src/classlib/Types";
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

    static async getJob(jobNumber: number) {

        try{
            const res = await axios.get(URL + `/job/${jobNumber}`);
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
    static async updateJob(job:Job) {

        try{
            const res = await axios.put(URL + `/job/${job.jobNumber}`, {
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

    static async getMonthSchedule(selectedMonth: number, userId: number = 0): Promise<MonthBlock>{
        const res: MonthBlock = {month: selectedMonth, workingDays: []} as MonthBlock;

        try {
            const schedule = await axios.get(URL + `/user/${userId}/schedule/${Date.now()}-${selectedMonth}`);
            
            // schedule.data.forEach(element =>{
            //     console.log(element.date);
            // })

            // generating the amount of days in the month for calculations later
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
            const intendedDate: Date = new Date(Date.now());
            if (intendedDate.getMonth() === selectedMonth){
                // nothing, will probably refactor this
            }
            else{
                intendedDate.setDate(1);
                intendedDate.setMonth(selectedMonth);
            }
            
            // check for and only add the days that are workdays (not saturday or sunday) to the res object
            for (let i: number = intendedDate.getDate(); i <= daysInMonth; i++){
                
                intendedDate.setDate(i);
                if (intendedDate.getDay() === 6){
                    continue;
                }
                else if (intendedDate.getDay() === 0){
                    continue;
                }

                // Check for and exclude Saturdays and Sundays
                let workingDayBlock: DayBlock = {} as DayBlock;
                workingDayBlock.day = i === 1 ? i : intendedDate.getDate();
                res.workingDays.push(workingDayBlock);


            }

            // arrays are objects in javascript, so i have to do this
            res.workingDays.forEach(workingDay =>{
                workingDay.hourBlocks = [];
            });

            let incrementor: number = 0;

            // Put the scheduled items into their corresponding hour blocks of every working day
            res.workingDays.forEach((workingDay)=>{
                // the second i remove this the entire page will freeze. no idea why, yet

                // not sure that this is correct, do not want to truth-table it
                do {
                    if (schedule.data[incrementor] === undefined){
                        break;
                    }
                    const checkDate: Date = new Date(Date.parse(schedule.data[incrementor].date));
                    
                    // if i don't do this, it returns July (in August) as the date because of some kind of ISO 8601 fuckery. deeven know
                    checkDate.setMonth(checkDate.getMonth()+1);
                    
                    // Without this check, if someone (in this case: me) fucks up and schedules something for
                    // a weekend, then the do-while will loop forever and crash the page. might still happen, not sure yet
                    if (checkDate.getDay() === 0 || checkDate.getDay() === 6){
                     incrementor++;   
                        continue;
                    }

                    // console.log(checkDate.toString());

                    if(workingDay.day == checkDate.getDate()){
                        // this means that it's a jobStage
                        if (schedule.data[incrementor].jobStage !== null){
                            let hourBlock = new HourDataBlock();

                            hourBlock.blocktype = "JOBSTAGE";
                            hourBlock.id = schedule.data[incrementor].id;

                            hourBlock.client = schedule.data[incrementor].jobStage.job.vehicle.owner.firstName + " " +
                                schedule.data[incrementor].jobStage.job.vehicle.owner.lastName;

                            hourBlock.duration = schedule.data[incrementor].jobStage.duration;
                            hourBlock.time = checkDate.getHours();
                            hourBlock.description = schedule.data[incrementor].jobStage.description;

                            // console.log(hourBlock)

                            workingDay.hourBlocks.push(hourBlock);

                        }
                        // this means that it's an appointment
                        else{
                            let hourBlock = new HourDataBlock();

                            hourBlock.blocktype = "APPOINTMENT";
                            hourBlock.id = schedule.data[incrementor].id;

                            hourBlock.client = schedule.data[incrementor].appointment.customer.firstName + " " +
                                schedule.data[incrementor].appointment.customer.lastName;

                            hourBlock.duration = 1;
                            hourBlock.time = checkDate.getHours();
                            hourBlock.description = schedule.data[incrementor].appointment.problemDescription;

                            workingDay.hourBlocks.push(hourBlock);

                            // console.log(hourBlock);
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

            // this function WILL crash the page if the datetimes aren't adjusted for the time difference
            function checkBlockDifferenceAddMissing(workingDay: DayBlock, 
                _hourIndex: number, _timeToCheck: number, _timeDifference: number){
                // this should break the recursion (intentionally)
                // if (timeToCheck >= 17 || workingDay.hourBlocks.length > 9){
                    
                //     // resetting these so that they work for the next day                 
                    
                //     return;
                // }
                // else 
                if (workingDay.hourBlocks[_hourIndex] === undefined){
                    // this needs to add in the remaining hour blocks
                    for (let i: number = _timeToCheck; i < 17; i++){
                        let newHourBlock: HourDataBlock = new HourDataBlock();
                        newHourBlock.time = i;
                        newHourBlock.duration = 1;

                        // need to rework this to account for splice
                        workingDay.hourBlocks.splice( _hourIndex++, 0, newHourBlock);
                    }


                    return;
                }

                console.log(`Prior to action: hourIndex: ${_hourIndex}, ${_timeToCheck}, ${_timeDifference}`);

                // this confirms that there's a schedule item at this increment of timeToCheck
                if (workingDay.hourBlocks[_hourIndex].time === _timeToCheck){
                    
                    // move the next time to check to the end of this schedule item block (i.e. time+duration)
                    _timeToCheck = workingDay.hourBlocks[_hourIndex].time + workingDay.hourBlocks[_hourIndex].duration;
                    // increment the hour index so that it checks the next hourblock
                    _hourIndex++;

                    checkBlockDifferenceAddMissing(workingDay, _hourIndex, _timeToCheck, _timeDifference);

                }
                // this indicates that for a given time, there is no schedule item
                else{
                    // work out the difference between the time you checked and the value of the next hourBlock
                    // in the list of scheduled items
                    _timeDifference = workingDay.hourBlocks[_hourIndex].time - _timeToCheck;


                    for (let i: number = _timeToCheck; i < workingDay.hourBlocks[_hourIndex].time; i++){
                        let newHourBlock: HourDataBlock = new HourDataBlock();
                        newHourBlock.time = i;
                        newHourBlock.duration = 1;

                        // need to rework this to account for splice
                        workingDay.hourBlocks.splice( _hourIndex++, 0, newHourBlock);
                    }

                    _timeToCheck = workingDay.hourBlocks[_hourIndex].time + workingDay.hourBlocks[_hourIndex].duration;

                    console.log(_timeToCheck)
                    // ASSUMING the postfix in the splice works, the following SHOULDN'T be necessary
                    //hourIndex += timeDifference;
                }

                
            }

            // forEach to pad the remaining empty spaces of each day with empty hourBlocks
            res.workingDays.forEach((workingDay)=>{
                // this starts when the business starts, i.e. 8AM
                
                // for days with literally no scheduled items, it just generates 9 empty items
                if (workingDay.hourBlocks.length === 0){
                    
                    // i.e 8AM to 5PM
                    for (let i = 8; i < 17; i++){
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
                    
                    // this tracks the position of each schedule item as a list of all of the ones in the array
                    let hourIndex: number = 0;
                    // this tracks the hour to ask about, and starts at 8AM. duration of items are added to it to advance which time to check
                    let timeToCheck: number = 8;
                    // this stores the difference between the hourIndex of a schedule item's time and the time the algorithm checks for next 
                    let timeDifference: number = 0;

                    checkBlockDifferenceAddMissing(workingDay, hourIndex, timeToCheck, timeDifference);
                    console.log(workingDay);
                }
            });

            // console.log(res);
            return res;

        }catch(err: any){
            throw new Error(err);
        }
    }
    static async getUserVehicles(userId:number){
        try{
            let res = await axios.get(URL + `/user/${userId}/vehicle`)
            return res;
        }catch(err){
            console.log(err)
        }
    }

    static async getActiveJobsForMechanic(mechanicId: number){
        try{
            let res = await axios.get(URL + `/user/${mechanicId}/activejobs`);
            return res;
        }
        catch(err){
            console.log(err);
        }
    }

    static async writeJobStageToDatabase(jobStage: JobStage){
        try{

        }
        catch(err){
            console.log(err);
        }
    }


}