
export class MonthlySchedule{
    // rn i have no idea whether or not i should use a class, type, interface, or god knows what else
}

type HourBlock = {
    time: Date
    description: string
    duration: number
    
}

type DayBlock = {
    day: number
    hourBlocks: HourBlock[];
}


// Returns a class object that holds all of the remaining days of the month
// (from the current day), along with all of their scheduled events and/or
// free blocks for scheduling
export default function createMonthObject(month: number, currentDate: Date): MonthlySchedule {
    try{
        let daysInMonth: number = 0;
        let workingDays: number[] = [];

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
        
        // It's necessary to distinguish between whether or not the month given
        // is the current month or not
        if (month === currentDate.getMonth()){
            // use the current day to get rid of every day up to (not including) the currentDay
            for (let i: number = currentDate.getDate() ; daysInMonth; i++){
                let dayCompare: Date = new Date(currentDate.getFullYear(), 
                                        currentDate.getMonth(), i);
                
                // Excludes Saturday and Sunday from the list of available days
                if (!(dayCompare.getDay() === 0) && !(dayCompare.getDay() === 6)){
                    workingDays.push(i);
                }
                
                           
                // For each day, DB call to get the number of scheduled events for that day
                // put the scheduled blocks into the day object
                // - Needs to actually be an object that can hold days and hour-blocks
                
            }
        }
        else{
            for (let i: number = 0; daysInMonth; i++){
                let dayCompare: Date = new Date(currentDate.getFullYear(), month);
                
                // Excludes Saturday and Sunday from the list of available days
                if (!(dayCompare.getDay() === 0) && !(dayCompare.getDay() === 6)){
                    workingDays.push(i);
                }
            }           
        }
    }
    catch(functionError){
        alert(functionError);
    }

    return new MonthlySchedule();
}