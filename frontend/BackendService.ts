import axios from "axios";


import User from "./src/classlib/User";

const URL = "http://localhost:5000/api"

export default class BackendService{

    static async createUser(user:User) {
        
        try{
            
            const res = await axios.post(URL + "/user/register", {
                user   
            })
            return(res)

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

}