import axios from "axios"
import User from "./src/classlib/User";

const URL = "http://localhost:5000/api"

export default class BackendService{

    static async createUser(user:User) {
        
        try{
            console.log(user)
            const res = await axios.post(URL+"/user", {
                user   
            })
            return(res.data)

        }catch(err){

        }
    }
}