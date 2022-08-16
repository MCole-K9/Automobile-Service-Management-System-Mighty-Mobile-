export default class Validation {
    
    static validEmail(email:string):boolean {
        
        const regex = new RegExp(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/);

        return regex.test(email);
    }

    static validPhoneNumber(number:string):boolean {
        const regex = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);

        return regex.test(number);
    }
    static isEmpty(str: string):boolean {
        return (str === "" || str.length <= 1);
        
    }
    static isZeroOrNegative(number: number):boolean {

        return (number <= 0 );
    }

    static dateGteToday(date: Date | string){

        try{
            const varDate = new Date(date).setHours(0, 0, 0 , 0);

            const today = new Date().setHours(0, 0, 0, 0);

            return (varDate >= today)

        }catch(err){
            
            console.log(err);
        }
        


    }
    
}