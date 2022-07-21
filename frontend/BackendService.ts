import type { User, Appointment, Vehicle } from "./src/classlib/Types";
import axios from "axios";



const URL = "http://localhost:5000/api"

export default class BackendService{

    static async createUser(user:User) {
        
        try{
            
            const res = await axios.post(URL + "/user/register", {
                user   
            })
            return(res);

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

    static async registerVehicle(userId: number, vehicle:Vehicle){

        try{
            const res = await axios.post(URL + `/user/${userId}/vehicle`, {
                vehicle
            })
            return res;

        }catch(err){

        }
            
    }

    static async makeAppointment(userId: number, appointment:Appointment){
        try{
            const res = await axios.post(URL + `/user/${userId}/appointmentbooking`, {
                appointment
            })
            return res;

        }catch(err){

        }
    }

    static async getUpcomingJobs() {

        try{
            const res = await axios.get(URL + "/jobs/upcoming");
            return res;

        }catch(err){
            
        }
    }


}