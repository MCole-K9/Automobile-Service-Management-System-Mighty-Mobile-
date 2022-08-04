import { Response, Request, Router} from "express";
import { Job, JobPart, PrismaClient } from "@prisma/client"; //Db Connection
import bcrypt, {genSalt, hash} from "bcrypt"
import { transformDocument } from "@prisma/client/runtime";




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

            // route parameters transformed
            const currentDate: Date = new Date(parseInt(req.params.currentDate, 10));
            const givenMonth: number = parseInt(req.params.givenMonth);
            const userId: number = parseInt(req.params.id, 10);

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
                                /*  Weird bug(?): Dates are stored as MySQL datetime fields, where the month goes from 1-12 (Jan-Dec),
                                    but the date object here is a JS date, which stores months as zero-indexed (0-11). getMonth() is
                                    supposed to output 7 for August (it does), but prisma seems to convert the value for datetime here
                                    in some way that it returns records for the next month over (so it returns for Sept./8 instead of Aug./7).
        
                                    happens even if you use .toISOString(). Solution is to put -1 after getMonth(). idk why.
                                */
                                gte: new Date(selectedMonth.getFullYear(), selectedMonth.getMonth()-1),
                                lte: new Date(selectedMonth.getFullYear(), selectedMonth.getMonth()-1, daysInMonth)
                            },
                        },
                        {
                            OR: [
                                {
                                    appointment: { 
                                        is: {
                                            assignedMechId: userId,
                                            fulfilled: false
                                        },
                                    },
                                },
        
                                {
                                    // problem is fixed, issues was just the or conditon was wrong
                                    // (the other problem was that the stages were attached to the wrong job. time taken to realise: 2 hours)
                                    jobStage: {
                                            job: {
                                                is: {
                                                    assignedMechanicId: userId,
                                                    confirmed: true,
                                                    completed: false
                                                }
                                            }
                                    },
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

        // gets the minimum necessary appointment corresponding to a schedule item's id
        router.get('/appointments/short/:appointmentscheduleid', async (req: Request, res: Response)=>{
            const appointmentId = parseInt(req.params.appointmentscheduleid);
            
            try{
                const shortAppointment = await prisma.appointment.findUnique({
                    where: {
                        scheduledItemId: appointmentId
                    },

                    select: {
                        streetAddress: true,
                        town: true,
                        parish: true,
                        problemDescription: true,
                        customer: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true
                            }
                        },
                        vehicle: {
                            select: {
                                id: true,
                                make: true,
                                model: true,
                                year: true,
                            }
                        },
                        scheduledItem: {
                            select: {
                                date: true,
                                id: true
                            }
                        }
                        
                    }
                });

                res.status(200).send(shortAppointment);
            }
            catch (err){
                console.log(err)
            }

            // uses the schedule id to return a basic minimum amount of information relevant to a jobstage
            router.get('/jobstage/short/:jobstagescheduleid', async (req: Request, res: Response) => {
                const stageScheduleId = parseInt(req.params.jobstagescheduleid)
                
                try{
                    const shortJobStage = await prisma.jobStage.findUnique({
                        where: {
                            scheduledItemId: stageScheduleId
                        },

                        select: {
                            description: true,
                            duration: true,
                            stageNumber: true,
                            job: {
                                select: {
                                    streetAddress: true,
                                    town: true,
                                    parish: true,
                                    jobNumber: true,
                                    summary: true,
                                    vehicle: {
                                        select: {
                                            make: true,
                                            model: true,
                                            year: true,
                                            id: true,
                                            owner: {
                                                select: {
                                                    id: true,
                                                    lastName: true,
                                                    firstName: true
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            scheduledItem: {
                                select: {
                                    id: true,
                                    date: true
                                }
                            }

                        }
    
                    })

                    res.status(200).send(shortJobStage);
                }
                catch(err){
                    console.log(err);
                }
                
            })

            // gets all of the information for a specific job. every stage, the vehicle, and the owner entirely
            router.get('/jobs/fulljob/:jobnumber', async (req: Request, res: Response) => {
                const jobId = parseInt(req.params.jobnumber);

                try{
                    const fullJobInformation = await prisma.job.findUnique({
                        where: {
                            jobNumber: jobId
                        },

                        include: {
                            stages: true,
                            vehicle:{
                                include: {
                                    owner: true
                                }
                            }
                        }
                    });

                    res.status(200).send(fullJobInformation);
                }
                catch(err){
                    console.log(err);
                }
            })
            
        })
        return router;

    }
    
}

    



