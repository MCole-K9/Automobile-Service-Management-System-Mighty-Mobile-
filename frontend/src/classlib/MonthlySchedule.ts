
export class MonthlySchedule{

}

// This should return a month object that has each day (indexed), with each day
// having its own blocks
export default function createMonthObject(month: number, currentDate: Date): MonthlySchedule {
    try{
        let daysInMonth: number = 0;
        let currentdays: number[] = [];

        // get the number of days in the month
        // get the days that aren't weekends (Sat, Sun)
        switch (month){
            case 1:
                daysInMonth = 31;
                break;
            case 2:
                if ((currentDate.getFullYear() % 4) === 0){
                    daysInMonth = 29;
                }
                else{
                    daysInMonth = 28;
                }
                break;
            case 3:
                daysInMonth = 31;
                break;
            case 4:
                daysInMonth = 30;
                break;
            case 5:
                daysInMonth = 31;
                break;
            case 6:
                daysInMonth = 30;
                break;
            case 7:
                daysInMonth = 31;
                break;
            case 8:
                daysInMonth = 31;
                break;
            case 9:
                daysInMonth = 30;
                break;
            case 10:
                daysInMonth = 31;
                break;
            case 11:
                daysInMonth = 30;
                break;
            case 12:
                daysInMonth = 31;
                break;
            default:
                if (!(typeof month=== 'number')){
                    throw new TypeError("Type of Month must be a number");
                }
                else if (month > 12){
                    throw new RangeError("Value of Month must be less than or equal to 12");
                }
                break;
           

           
           // Put each day into a month containing object
           // For each day, DB call to get the number of scheduled events for that day
           // put the scheduled blocks into the day object
           // 
        }
        
        // use the current day to get rid of every day up to (not including) the currentDay
        for (let i: number = currentDate.getDay() ; daysInMonth; i++){
            // 
            currentdays.push(i);
        }




    }
    catch(functionError){
        alert(functionError);
    }

    return new MonthlySchedule();
}