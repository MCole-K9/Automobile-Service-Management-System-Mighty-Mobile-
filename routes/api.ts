import { Response, Request, Router} from "express";
import { PrismaClient } from "@prisma/client"; //Db Connection
import {genSalt, hash} from "bcrypt"


const prisma = new PrismaClient();

//These routes will be called when a request is sent to ip-address/api
// The symbol "/" represents in the context of this file -  ip-address/api  E.g http://localhost:5000/api
export default class Routes{

    static routes():Router {

        const router:Router = Router();

        router.route("/").get((req:Request, res:Response)=>{
            res.send("API Call");
        });

        router.route("/user").get((req:Request, res:Response)=>{
            res.send("Egt Users");
        })
        .post(async (req:Request, res:Response)=>{

            try{

                const firstName:string = req.body.user.firstName;
                const lastName:string = req.body.user.lastName;
                const email:string = req.body.user.email;
                const phoneNumber:string = req.body.user.phoneNumber;

                const salt = await genSalt();
                const hashedPassword = await hash(req.body.user.password, salt);

                const createdUser = await prisma.user.create({
                    data:{
                        
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        phoneNumber: phoneNumber,
                        password: hashedPassword 

                    }
                })

                res.status(200).send(createdUser)

            }catch(err){

                res.status(400).send(err)
            }

        })




        return router;

    }
    
}

    



