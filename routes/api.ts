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
                console.log(req.body)
                
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
                    
                    res.send({message: "Account Already Exits", registered: false})

                }else{
                    const salt = await genSalt();
                    const hashedPassword = await hash(req.body.user.password, salt);

                    const createdUser = await prisma.user.create({
                        data:{
                            
                            firstName: firstName,
                            lastName: lastName,
                            email: email.toLowerCase(),
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

                console.log(err)
                res.status(400).send(err)
            }

        }))

        router.post("/user/login", (async (req:Request, res:Response)=>{

            try{

                
                const email:string = req.body.email;

                let user = await prisma.user.findUnique({
                    where: {
                        email: email.toLowerCase()
                    },
                    include: {
                        roles: true
                    }
                    
                });
                console.log(user)
        
                if (user !==  null){

                    const isMatch = await bcrypt.compare(req.body.password as string , user?.password as string);

                    if (isMatch){

                        res.status(200).send({user, login: true})
                        
                    }else{
                        res.send({user: null, message: "Email or Password Incorrect", login: false});
                    }  

                }else{

                    res.send({message: "Email or Password Incorrect", login: false});
                }



            }catch(err){

                res.status(400).send(err)
            }

        }));

        router.route("/user/:id/vehicle").get(async (req:Request, res:Response)=>{

            //Get User Vehicles 
            
        }).post(async (req:Request, res:Response)=>{

            try{
                console.log(req.body)


                const userId: number = Number.parseInt(req.params.id) ;

                let vehicle = await prisma.vehicle.create({

                    data: {
                        make: req.body.vehicle.make as string,
                        model: req.body.vehicle.model as string,
                        year: Number.parseInt(req.body.vehicle.year) ,
                        owner: {
                            connect: {
                                id: userId
                            }
                        }
                    }

                })

                res.status(200).send(vehicle);

            }catch(err){

            }
        })

        router.route("/user/:id/appointmentbooking").post(async (req:Request, res:Response)=>{

            try{

                console.log(req.body)

                const userId: number = Number.parseInt(req.params.id) ;

                let appointment = await prisma.appointment.create({
                    data: {
                        problemDescription: req.body.appointment.problemDescription as string,
                        suggestedDate: req.body.appointment.date,
                        streetAddress: req.body.appointment.streetAddress as string,
                        town: req.body.appointment.town as string,
                        parish: req.body.appointment.parish as string,
                        customer: {
                            connect: {
                                id: userId
                            }
                        },
                        vehicle:{
                            connect: {
                                id: Number.parseInt(req.body.appointment.vehicleId)
                            }
                        }
                    }
                })

                res.status(200).send(appointment)


            }catch(err){

                
                res.send(err)
            }
            


            
        });



        return router;

    }
    
}

    



