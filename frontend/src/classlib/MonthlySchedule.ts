type MonthBlock = {
    month: number
    workingDays: DayBlock[]
}


type HourBlock = {
    time: Date
    description: string
    duration: number
    
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
                workingDayBlock.day = chosenMonth.getDate();
                monthlySchedule.workingDays.push(workingDayBlock);

                chosenMonth.setDate(chosenMonth.getDate()+1);
                
            }
        }

        // once every day added to the month object, check each day to see which
        // hours are taken and available 
        for (let day in monthlySchedule.workingDays){
            // This should probably be one API call, rather than several ones
        }

    }
    catch(functionError){
        alert(functionError);
    }

    return monthlySchedule;
}