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
                console.log(err)
                res.status(400).send(err)
            }

        }));

        router.route("/user/:id/vehicle").get(async (req:Request, res:Response)=>{

            //Get User Vehicles 
            console.log(req.params.id)
            let id = Number(req.params.id)
            const vehicles = await prisma.vehicle.findMany({
                where:{
                    ownerId : id
                }
            })
            res.status(200).send(vehicles);

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
                        suggestedDate: req.body.appointment.suggestedDate,
                        streetAddress: req.body.appointment.streetAddress as string,
                        town: req.body.appointment.town as string,
                        parish: req.body.appointment.parish as string,
                        customer: {
                            connect: {
                                id: userId
                            }
                        },
                        vehicle:{
                            connectOrCreate: {
                                where:{
                                    id: req.body.appointment.vehicle.id ? req.body.appointment.vehicle.id : 0
                                },
                                create: {
                                    make: req.body.appointment.vehicle.make as string,
                                    model: req.body.appointment.vehicle.model as string,
                                    year: Number.parseInt(req.body.appointment.vehicle.year) , //Getting it as string in the json for some reason
                                    owner: {
                                        connect: {
                                            id: userId
                                        }
                                       
                                    }

                                }
                                
                            }
                        }
                        

                    },
                    include: {
                        customer: true
                    }
                })
                console.log(appointment)
                res.status(200).send(appointment)


            }catch(err){

                console.log(err)
                res.status(400).send(err)
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

        router.route("/job/:id").get(async (req:Request, res:Response) => {

            const jobNumber = Number.parseInt(req.params.id);

            const job = await prisma.job.findUniqueOrThrow({
                where: {
                    jobNumber
                },
                include: {
                    vehicle: {
                        include: {
                            owner: true
                        }
                    },
                    requiredParts: true,
                    assignedMechanic: true,
                    createdBy: true
                }
            });

            res.status(200).send(job);

        }).put(async (req:Request, res:Response) =>{

            try{
                console.log("update hit")

                
                
                const job = await prisma.job.update({
                    where: {
                        jobNumber: req.body.job.jobNumber as number
                    },
                    data: {
                        assignedMechanicId: req.body.job.assignedMechanicId ? req.body.job.assignedMechanicId as number: null,
                        completed: req.body.job.completed ? req.body.job.completed as boolean: false,
                        isPaid:  req.body.job.isPaid ?  req.body.job.isPaid as boolean : false,
                        streetAddress: req.body.job.streetAddress ? req.body.job.streetAddress : null ,
                        town: req.body.job.town ? req.body.job.town : null ,
                        parish: req.body.job.parish ? req.body.job.parish : null ,
                        confirmed: req.body.job.confirmed ? req.body.job.confirmed : false,
                        createdById: req.body.job.createdById ? req.body.job.createdById : null,
                        endDate: req.body.job.endDate,
                        startDate: req.body.job.startDate,
                        serviceFee: req.body.job.serviceFee,
                        serviceType: req.body.job.serviceType as string,
                        summary: req.body.job.summary as string,
                        totalCost: req.body.job.totalCost ,
                        vehicleId: req.body.job.vehicle.id as number
                    },
                    include:{
                        vehicle: true,
                        assignedMechanic: true,
                        createdBy: true,
                        requiredParts: true
                    }
                })
    
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
            //console.log(jobs)

            res.status(200).send(jobs)
        });

        // Gets the schedule for a given mechanic using the Current Date and the Desired Month
        router.get("/user/:id/schedule/:currentDate-:givenMonth", async (req:Request, res: Response)=>{
            
            // console.log(req.params.id + " " + req.query.currentDate + " " + req.query.givenMonth);

            // route parameters transformed
            const currentDate: Date = new Date(parseInt(req.params.currentDate, 10));
            const givenMonth: number = parseInt(req.params.givenMonth, 10);
            const userId: number = parseInt(req.params.id, 10);

            // console.log(currentDate.toString() + " " + givenMonth + " " + userId);

            // determining the days of the week and the current month
            let daysInMonth: number = 0;
            const selectedMonth: Date = new Date(currentDate.getFullYear(), givenMonth);

            switch (givenMonth){
                case 0:
                    daysInMonth = 31;
                    break;
                case 1:
                    if ((currentDate.getFullYear() % 4) === 0){
                        daysInMonth = 29;
                    }
                    else{
                        daysInMonth = 28;
                    }
                    break;
                case 2:
                    daysInMonth = 31;
                    break;
                case 3:
                    daysInMonth = 30;
                    break;
                case 4:
                    daysInMonth = 31;
                    break;
                case 5:
                    daysInMonth = 30;
                    break;
                case 6:
                    daysInMonth = 31;
                    break;
                case 7:
                    daysInMonth = 31;
                    break;
                case 8:
                    daysInMonth = 30;
                    break;
                case 9:
                    daysInMonth = 31;
                    break;
                case 10:
                    daysInMonth = 30;
                    break;
                case 11:
                    daysInMonth = 31;
                    break;
                default:
                    if (typeof givenMonth !== 'number'){
                        throw new TypeError("Type of Month must be a number");
                    }
                    else if (givenMonth >= 12){
                        throw new RangeError("Value of Month must be less than or equal to 11");
                    }
                    break;
            }

            // getting the information from the database
            const schedule = await prisma.schedule.findMany({
                orderBy: {
                    date: 'asc'
                },
                //  but since a schedule only has appt OR jobstage, kinda wondering what happens when i try to pull for both
                select: {
                    id: true,
                    date: true,
                    appointment: {
                        select: {
                            problemDescription: true,
                            customer: {
                                select: {
                                    id: true,
                                    firstName: true,
                                    lastName: true
                                }
                            },
                            streetAddress: true,
                            town: true,
                            parish: true
                        }
                    },
                    jobStage: {
                        select: {
                            description: true,
                            duration: true,
                            job: {
                                select: {
                                    jobNumber: true,
                                    streetAddress: true,
                                    town: true,
                                    parish: true,
                                    vehicle: {
                                        select: {
                                            owner: {
                                                select: {
                                                    id: true,
                                                    firstName: true,
                                                    lastName: true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },        
                where: {
                    AND: [
                        {
                            date: {
                                gte: new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1),
                                lte: new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), daysInMonth)
                            }
                        },
                        {
                            OR: [
                                {
                                    appointment: {
                                        assignedMechId: userId
                                    }
                                },
    
                                {
                                    jobStage: {
                                        job: {
                                            assignedMechanicId: userId
                                        }
                                    }
                                }
                            ] 
                        }
                    ]
                }
            })
        
            schedule.forEach(schedule =>{
                console.log(schedule);
            });

            res.status(200).send(schedule);
        
        });

        // gets a list the jobNumbers, Customers, and of all active jobs that a mechanic is assigned to
        router.get("/user/:id/activejobs", async(req: Request, res: Response) => {

            const mechanicId: number = parseInt(req.params.id);

            const activeJobs = await prisma.job.findMany({
                orderBy: {
                    startDate: 'asc'
                },
                select: {
                    jobNumber: true,
                    vehicle: {
                        select: {
                            owner: {
                                select: {
                                    firstName: true,
                                    lastName: true,
                                    id: true
                                }
                            }
                        }
                    }
                },
                where: {
                    assignedMechanicId: mechanicId,
                    completed: false,
                    confirmed: true
                }

            })

            if (activeJobs !== undefined){
                res.status(200).send(activeJobs);
            }
            else{
                // need to re-read http errors
                res.status(400);
            }
        })

        // posts a JobStage to the database
        router.post('/user/:id/jobstage', async (req: Request, res: Response)=>{

        })
        return router;

    }
    
}

    



