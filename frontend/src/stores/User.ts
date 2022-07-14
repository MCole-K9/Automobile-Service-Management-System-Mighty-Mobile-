import { defineStore} from "pinia";
import User from "@/classlib/User";

export const newUserStore = defineStore("newUser", {
    state: ()=>({
        User  :  new User("", "", "", "")
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
            this.User = new User("", "", "", "");
        }
    },
    getters: {
        getFullName():string{
            return this.User.firstName + " " + this.User.lastName;
        }
    }
})