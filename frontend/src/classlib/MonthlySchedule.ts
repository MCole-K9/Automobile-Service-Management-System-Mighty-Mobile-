import {PrismaClient} from '@prisma/client';
import {newUserStore} from '../stores/User';

type MonthBlock = {
    month: number
    workingDays: DayBlock[]
}


class HourBlock {
    time: number | null;
    description: string;
    duration: number;
    id: number | null;
    client: string;
    blocktype: "APPOINTMENT" | "JOBSTAGE" | null;

    constructor(){
        this.time = null;
        this.description = "";
        this.duration = 1;
        this.id = null;
        this.client = "";
        this.blocktype = null;
    }
    
}

type DayBlock = {
    day: number
    hourBlocks: HourBlock[]
}


// Returns an object that holds all of the remaining days of the month
// (from the current day), along with all of their scheduled events and/or
// free blocks for scheduling
export default function createMonthObject(month: number, currentDate: Date): MonthBlock {
    const monthlySchedule = {} as MonthBlock;
    
    try{
        monthlySchedule.month = month;
        
        let daysInMonth: number = 0;

        // get the number of days in the month
        switch (month){
            case 0:
                daysInMonth = 31;
                break;
            case 1:
                if ((currentDate.getFullYear() % 4) === 0){
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
                if (!(typeof month === 'number')){
                    throw new TypeError("Type of Month must be a number");
                }
                else if (month > 12){
                    throw new RangeError("Value of Month must be less than or equal to 12");
                }
                break;
        }
        
        // It's necessary to distinguish between whether the month passed is the current one
        // or one the user wishes to see
        let chosenMonth: Date;

        if (currentDate.getMonth() === month){
            chosenMonth = new Date(currentDate);
        }
        else{
            chosenMonth = new Date(currentDate.getFullYear(), month, 1);
        }
        

        // Creating the objects for each day
        for (let i: number = chosenMonth.getDate(); i <= daysInMonth; i++){
            // Check for and exclude Saturdays and Sundays
            if (!(chosenMonth.getDay() === 6) && !(chosenMonth.getDay() === 0)){
                
                let workingDayBlock: DayBlock = {} as DayBlock;
                workingDayBlock.day = i;
                monthlySchedule.workingDays.push(workingDayBlock);

                chosenMonth.setDate(i);
                
            }
        }
        
        // creating a ref to the user account store for the query
        // needs double-checking
        const currentUser = newUserStore();

        // this should be able to generate a default list of however many blocks are
        // available in one working day (9h, 8AM->5PM)

        const prisma = new PrismaClient();

        async function getSchedule(){
            return await prisma.schedule.findMany({
                orderBy: {
                    date: 'asc'
                },
                //  but since a schedule only has appt OR jobstage, kinda wondering what happens when i try to pull for both
                select: {
                    id: true,
                    date: true,
                    appointment: {
                        select: {
                            problemDescription: true,
                            customer: {
                                select: {
                                    id: true,
                                    firstName: true,
                                    lastName: true
                                }
                            },
                            streetAddress: true,
                            town: true,
                            parish: true
                        }
                    },
                    jobStage: {
                        select: {
                            description: true,
                            duration: true,
                            job: {
                                select: {
                                    jobNumber: true,
                                    streetAddress: true,
                                    town: true,
                                    parish: true,
                                    vehicle: {
                                        select: {
                                            owner: {
                                                select: {
                                                    id: true,
                                                    firstName: true,
                                                    lastName: true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },        
                
                where: {
                    AND: [
                        {
                            date: {
                                lte: chosenMonth.getFullYear() + '-' + chosenMonth.getMonth() + '-01',
                                gte: chosenMonth.getFullYear() + '-' + chosenMonth.getMonth() + '-' + daysInMonth
                            }
                        },
                        {
                            OR: [
                                {
                                    appointment: {
                                        assignedMechId: currentUser.User.id
                                    }
                                },
    
                                {
                                    jobStage: {
                                        job: {
                                            assignedMechanicId: currentUser.User.id
                                        }
                                    }
                                }
                            ] 
                        }
                    ]
                }
            });
        }

        // Get all of the scheduled items for the month
        const schedule: any | null = getSchedule().then(value => value).catch(reason=> null); // worrying about errors later

        let incrementor: number = 0;

        // Put the scheduled items into their corresponding hour blocks of every working day
        monthlySchedule.workingDays.forEach((workingDay)=>{
            // need to check if schedule is null before i do this, but that's for later
            do {
                if(workingDay.day == schedule[incrementor].date.getDate()){
                    // this means that it's a jobStage
                    if (schedule[incrementor].jobStage !== null){
                        let hourBlock = new HourBlock();

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
                        let hourBlock = new HourBlock();

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
                    incrementor++;
                    break;
                }
            }while(true);

            // code here needs to determine how many more spaces i need to fill with empty blocks
        });

        // unsure whether to handle the padding of hourblocks in a dayblock here or in the other function
        // 

    }
    catch(functionError){
        console.error(functionError);
    }

    return monthlySchedule;
}