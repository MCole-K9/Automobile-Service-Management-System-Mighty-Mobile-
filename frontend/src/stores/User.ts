import {defineStore} from "pinia";
import type {User} from "../classlib/Types";




let User: User  =  {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    roles: []
};



export const currentUserStore = defineStore("currentUser", {
    state: ()=>({
        User: User,
        loggedIn: false,
    }),
    actions:{
        
        setUser(user:User){
            this.User = user;
            this.User.password = "";
            this.loggedIn = true;
        },
        hasRole(roleId: number):boolean{
            
            let hasRole = false;
            this.User.roles?.forEach((role)=>{
                
                hasRole =  (roleId === role.id);
            });

            return hasRole;
        }
    },
    persist: true
})




export const newUserStore = defineStore("newUser", {
    state: ()=>({
        User : User
    }),
    actions: {
        changeAttr(attrName:string, value:string){

            //Uses the name of the input fields in RegisterForm component
            if(attrName == "password"){
                this.User.password = value;
            }else{
                this.User = {...this.User, [attrName]: value}
            }
        },
        splitName(fullName:string):void{
            let nameArray = fullName.split(" ");

            if(nameArray.length === 2){
                this.User.firstName = nameArray[0];
                this.User.lastName = nameArray[1];
            }
        },
        clearData(){
            this.User = User;
        }
    },
    getters: {
        getFullName():string{
            return this.User.firstName + " " + this.User.lastName;
        }
    }
})

