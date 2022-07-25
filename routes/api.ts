import { Response, Request, Router} from "express";
import { Job, JobPart, PrismaClient } from "@prisma/client"; //Db Connection
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
        });

        router.route("/user/customers").get(async (req:Request, res:Response)=>{
            try{
                const customers = await prisma.user.findMany({
                    where: {
                        roles: {
                            some: {
                                id: UserRole.Customer
                            }
                        }
                    },
                    include: {
                        vehicles:true,
                        roles: true
                    }
                })

                res.status(200).send(customers);

            }catch(err){

            }
            

           
        });

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

        router.get("/appointments", async (req:Request, res:Response)=>{
            const appointments = await prisma.appointment.findMany({
                include: {
                    assignedMech: true,
                    customer: true,
                    vehicle: true,
                }
            })
            res.send(appointments);
        });

        router.route("/jobs").get(async (req:Request, res:Response)=>{
            //Code Here
        }).post(async (req:Request, res:Response)=>{
            
            try{
                //console.log(req.body.job)
                let job = await prisma.job.create({
                    data: {
                        startDate: req.body.job.startDate as Date,
                        endDate: req.body.job.endDate as Date,
                        serviceFee:  req.body.job.serviceFee as number,
                        serviceType:  req.body.job.serviceType as string,
                        summary: req.body.job.summary as string,
                        createdBy: {
                            connect: {
                                id: req.body.job.createdById as number
                            }
                        },
                        vehicle: {
                            connect: {
                                id:  req.body.job.vehicleId as number
                            }
                        },
                        requiredParts: {
                            createMany: {
                                data: req.body.job.requiredParts as JobPart[]
                            }
                        }
                        
                    },

                    
                })

                console.log(job)

                res.status(200).send(job)
            }catch(err){
                console.log(err)
            }
         

            
        })

        router.get("/jobs/upcoming", async (req:Request, res:Response)=>{
            const jobs = await prisma.job.findMany({
                include: {
                    vehicle: {
                        include: {
                            owner: true
                        }
                    },
                    assignedMechanic: true
                }
            })
            console.log(jobs)

            res.status(200).send(jobs)
        });

        // router.get("/user/:id/schedule/:currentDate-:givenMonth", async (req:Request, res: Response)=>{
        //     // route parameters transformed

        //     console.log(req.params.id + " " + req.params.currentDate + " " + req.params.givenMonth);



        //     const currentDate: Date = new Date(parseInt(req.params.currentDate, 10));
        //     const givenMonth: number = parseInt(req.params.givenMonth, 10);
        //     const userId: number = parseInt(req.params.id, 10);

        //     console.log(currentDate.toISOString() + " " + givenMonth + " " + userId);

        //     // determining the days of the week and the current month
        //     let daysInMonth: number = 0;
        //     const selectedMonth: Date = new Date(currentDate.getFullYear(), givenMonth);

        //     switch (givenMonth){
        //         case 0:
        //             daysInMonth = 31;
        //             break;
        //         case 1:
        //             if ((currentDate.getFullYear() % 4) === 0){
        //                 daysInMonth = 29;
        //             }
        //             else{
        //                 daysInMonth = 28;
        //             }
        //             break;
        //         case 2:
        //             daysInMonth = 31;
        //             break;
        //         case 3:
        //             daysInMonth = 30;
        //             break;
        //         case 4:
        //             daysInMonth = 31;
        //             break;
        //         case 5:
        //             daysInMonth = 30;
        //             break;
        //         case 6:
        //             daysInMonth = 31;
        //             break;
        //         case 7:
        //             daysInMonth = 31;
        //             break;
        //         case 8:
        //             daysInMonth = 30;
        //             break;
        //         case 9:
        //             daysInMonth = 31;
        //             break;
        //         case 10:
        //             daysInMonth = 30;
        //             break;
        //         case 11:
        //             daysInMonth = 31;
        //             break;
        //         default:
        //             if (typeof givenMonth !== 'number'){
        //                 throw new TypeError("Type of Month must be a number");
        //             }
        //             // else if (givenMonth >= 12){
        //             //     throw new RangeError("Value of Month must be less than or equal to 11");
        //             // }
        //             break;
        //     }

        //     // getting the information from the database
        //     const schedule = await prisma.schedule.findMany({
        //         orderBy: {
        //             date: 'asc'
        //         },
        //         //  but since a schedule only has appt OR jobstage, kinda wondering what happens when i try to pull for both
        //         select: {
        //             id: true,
        //             date: true,
        //             appointment: {
        //                 select: {
        //                     problemDescription: true,
        //                     customer: {
        //                         select: {
        //                             id: true,
        //                             firstName: true,
        //                             lastName: true
        //                         }
        //                     },
        //                     streetAddress: true,
        //                     town: true,
        //                     parish: true
        //                 }
        //             },
        //             jobStage: {
        //                 select: {
        //                     description: true,
        //                     duration: true,
        //                     job: {
        //                         select: {
        //                             jobNumber: true,
        //                             streetAddress: true,
        //                             town: true,
        //                             parish: true,
        //                             vehicle: {
        //                                 select: {
        //                                     owner: {
        //                                         select: {
        //                                             id: true,
        //                                             firstName: true,
        //                                             lastName: true
        //                                         }
        //                                     }
        //                                 }
        //                             }
        //                         }
        //                     }
        //                 }
        //             }
        //         },        
        //         where: {
        //             AND: [
        //                 {
        //                     date: {
        //                         // this may be a point of failure, because i'm not sure that this is how you do this for dates
        //                         // might need to turn these into date objects, not sure.
        //                         gte: selectedMonth.getFullYear() + '-' + selectedMonth.getMonth() + '-01',
        //                         lte: selectedMonth.getFullYear() + '-' + selectedMonth.getMonth() + '-' + daysInMonth
        //                     }
        //                 },
        //                 {
        //                     OR: [
        //                         {
        //                             appointment: {
        //                                 assignedMechId: userId
        //                             }
        //                         },
    
        //                         {
        //                             jobStage: {
        //                                 job: {
        //                                     assignedMechanicId: userId
        //                                 }
        //                             }
        //                         }
        //                     ] 
        //                 }
        //             ]
        //         }
        //     })
        
        //     console.log(schedule);

        //     res.status(200).send(schedule);
        
        // });



        return router;

    }
    
}

    



