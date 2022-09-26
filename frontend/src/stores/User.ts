import {defineStore} from "pinia";
import type {User} from "../classlib/Types";
import {UserRole} from "../classlib/Types"



let currentUser: User  =  {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    roles: [],
    createdAt : new Date()
};

let newUser: User  =  {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: ""
};



export const currentUserStore = defineStore("currentUser", {
    state: ()=>({
        User: currentUser,
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
                
                if(roleId === role.id){
                    hasRole = true;
                }
            });

            return hasRole;
        }
    },
    getters: {
        isCustomer():boolean{
            return currentUserStore().hasRole(UserRole.Customer)
        },
        isManager():boolean{
            return currentUserStore().hasRole(UserRole.Manager)
        },
        isMechanic():boolean{
            return currentUserStore().hasRole(UserRole.Mechanic)
        },
        isAdmin():boolean{
            return currentUserStore().hasRole(UserRole.ADMIN)
        },
        fullName():string{
            
            return this.User.firstName + " " + this.User.lastName;
        }
        
    },
    persist: true
})




export const newUserStore = defineStore("newUser", {
    state: ()=>({
        User : newUser
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
            this.User = newUser;
        }
    },
    getters: {
        getFullName():string{
            return this.User.firstName + " " + this.User.lastName;
        }
    }
})

