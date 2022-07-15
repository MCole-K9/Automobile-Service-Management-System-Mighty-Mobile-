import { Response, Request, Router} from "express";
import { PrismaClient } from "@prisma/client"; //Db Connection
import bcrypt, {genSalt, hash} from "bcrypt"

enum UserRole{
    ADMIN = 1,
    Manager,
    Mechanic,
    Customer 
}

const prisma = new PrismaClient();

//These routes will be called when a request is sent to ip-address/api
// The symbol "/" represents in the context of this file -  ip-address/api  E.g http://localhost:5000/api
export default class Routes{

    static routes():Router {

        const router:Router = Router();

        router.route("/").get((req:Request, res:Response)=>{
            res.send("API Call");
        });

        router.post("/user/register", (async (req:Request, res:Response)=>{

            try{
                
                const firstName:string = req.body.user.firstName;
                const lastName:string = req.body.user.lastName;
                const email:string = req.body.user.email;
                const phoneNumber:string = req.body.user.phoneNumber;

                let user = await prisma.user.findFirst({
                    where: {
                        email: email
                    }
                })

                if (user !== null){
                    
                    res.send({message: "User Already Exits", registered: false})

                }else{
                    const salt = await genSalt();
                    const hashedPassword = await hash(req.body.user.password, salt);

                    const createdUser = await prisma.user.create({
                        data:{
                            
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            phoneNumber: phoneNumber,
                            password: hashedPassword ,
                            roles: {
                                connect: {
                                    id: UserRole.Customer
                                }
                            }

                        }
                    });

                    res.status(200).send({createdUser, registered: true})
                }

            }catch(err){

                res.status(400).send(err)
            }

        }))

        router.post("/user/login", (async (req:Request, res:Response)=>{

            try{
                
                const email:string = req.body.email;

                let user = await prisma.user.findUnique({
                    where: {
                        email: email
                    },
                    
                });
        
                if (user !==  null){

                    const isMatch = await bcrypt.compare(req.body.password as string , user?.password as string);

                    if (isMatch){


                        res.status(200).send({user, login: true})
                        
                    }else{
                        res.send({message: "Email or Password Incorrect", login: false});
                    }  

                }else{

                    res.send({message: "Email or Password Incorrect", login: false});
                }



            }catch(err){

                res.status(400).send(err)
            }

        }))



        return router;

    }
    
}

    



