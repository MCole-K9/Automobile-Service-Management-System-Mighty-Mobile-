

export default class User {

    public firstName: string;
    public lastName: string
    public email: string;
    public phoneNumber: string
    public password ?: string
    
    constructor(firstName: string, lastName:string, email:string, phoneNumber: string) {
        
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
    
}