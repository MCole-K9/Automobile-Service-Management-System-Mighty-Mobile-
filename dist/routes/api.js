"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client"); //Db Connection
const bcrypt_1 = __importStar(require("bcrypt"));
const runtime_1 = require("@prisma/client/runtime");
var UserRole;
(function (UserRole) {
    UserRole[UserRole["ADMIN"] = 1] = "ADMIN";
    UserRole[UserRole["Manager"] = 2] = "Manager";
    UserRole[UserRole["Mechanic"] = 3] = "Mechanic";
    UserRole[UserRole["Customer"] = 4] = "Customer";
})(UserRole || (UserRole = {}));
function jsDateToSql(date) {
    //prisma does automatic utc conversion. 
    //So the fix is as follows
    return new Date(Date.parse(date.toUTCString()) - date.getTimezoneOffset() * 60000).toISOString();
}
const prisma = new client_1.PrismaClient();
//These routes will be called when a request is sent to ip-address/api
// The symbol "/" represents in the context of this file -  ip-address/api  E.g http://localhost:5000/api
class Routes {
    static routes() {
        const router = (0, express_1.Router)();
        router.route("/").get((req, res) => {
            res.send("API Call");
        });
        router.route("/users").get((req, res) => __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma.user.findMany({
                include: {
                    roles: true
                }
            });
            res.status(200).send(users);
        }));
        router.post("/user", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const firstName = req.body.user.firstName;
                const lastName = req.body.user.lastName;
                const email = req.body.user.email;
                const phoneNumber = req.body.user.phoneNumber;
                const roles = req.body.user.roles;
                let user = yield prisma.user.findFirst({
                    where: {
                        email: email
                    }
                });
                if (user !== null) {
                    res.send({ message: "Account Already Exits", created: false });
                }
                else {
                    const salt = yield (0, bcrypt_1.genSalt)();
                    const hashedPassword = yield (0, bcrypt_1.hash)(req.body.user.password, salt);
                    const createdUser = yield prisma.user.create({
                        data: {
                            firstName,
                            lastName,
                            email,
                            phoneNumber,
                            password: hashedPassword,
                            roles: {
                                connect: roles
                            }
                        },
                        include: {
                            roles: true
                        }
                    });
                    console.log(createdUser);
                    res.send(createdUser);
                }
            }
            catch (err) {
                console.log(err);
            }
        }));
        router.route("/user/:id").get((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = Number.parseInt(req.params.id);
                const user = yield prisma.user.findUnique({
                    where: {
                        id: userId
                    },
                    include: {
                        roles: true,
                    }
                });
                console.log(user);
                res.status(200).send(user);
            }
            catch (err) {
                console.log(err);
            }
        })).put((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = Number.parseInt(req.params.id);
                const user = yield prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        firstName: req.body.user.firstName,
                        lastName: req.body.user.lastName,
                        email: req.body.user.email,
                        phoneNumber: req.body.phoneNumber,
                        roles: {
                            set: req.body.user.roles
                        }
                    }
                });
                res.status(200).send(user);
            }
            catch (err) {
                console.log(err);
            }
        }));
        router.post("/user/register", ((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const firstName = req.body.user.firstName;
                const lastName = req.body.user.lastName;
                const email = req.body.user.email;
                const phoneNumber = req.body.user.phoneNumber;
                let user = yield prisma.user.findFirst({
                    where: {
                        email: email
                    }
                });
                if (user !== null) {
                    res.send({ message: "Account Already Exits", registered: false });
                }
                else {
                    const salt = yield (0, bcrypt_1.genSalt)();
                    const hashedPassword = yield (0, bcrypt_1.hash)(req.body.user.password, salt);
                    const createdUser = yield prisma.user.create({
                        data: {
                            firstName: firstName,
                            lastName: lastName,
                            email: email.toLowerCase(),
                            phoneNumber: phoneNumber,
                            password: hashedPassword,
                            roles: {
                                connect: {
                                    id: UserRole.Customer
                                }
                            }
                        }
                    });
                    res.status(200).send({ createdUser, registered: true });
                }
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
        })));
        router.post("/user/login", ((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                let user = yield prisma.user.findUnique({
                    where: {
                        email: email.toLowerCase()
                    },
                    include: {
                        roles: true
                    }
                });
                console.log(user);
                if (user !== null) {
                    const isMatch = yield bcrypt_1.default.compare(req.body.password, user === null || user === void 0 ? void 0 : user.password);
                    if (isMatch) {
                        res.status(200).send({ user, login: true });
                    }
                    else {
                        res.send({ user: null, message: "Email or Password Incorrect", login: false });
                    }
                }
                else {
                    res.send({ message: "Email or Password Incorrect", login: false });
                }
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
        })));
        router.get("/mechanics", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const mechanics = yield prisma.user.findMany({
                    where: {
                        roles: {
                            some: {
                                id: UserRole.Mechanic
                            }
                        }
                    }
                });
                res.send(mechanics);
            }
            catch (err) {
                console.log(err);
            }
        }));
        router.put("/user/:id/changepassword", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("password change hit");
                const userId = Number.parseInt(req.params.id);
                const oldPassword = req.body.oldPassword;
                const newPassword = req.body.newPassword;
                const user = yield prisma.user.findFirstOrThrow({
                    where: {
                        id: userId
                    }
                });
                if (yield bcrypt_1.default.compare(oldPassword, user.password)) {
                    yield prisma.user.update({
                        where: {
                            id: userId
                        },
                        data: {
                            password: yield bcrypt_1.default.hash(newPassword, yield (0, bcrypt_1.genSalt)())
                        }
                    });
                    res.status(200).send({ changed: true, message: "Password Changed Successfully" });
                }
                else {
                    res.send({ changed: false, message: "Old Password not a Match" });
                }
            }
            catch (err) {
                console.log(err);
            }
        }));
        router.route("/user/:id/vehicle").get((req, res) => __awaiter(this, void 0, void 0, function* () {
            //Get User Vehicles 
            let id = Number(req.params.id);
            const vehicles = yield prisma.vehicle.findMany({
                where: {
                    ownerId: id
                }
            });
            res.status(200).send(vehicles);
        })).post((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const userId = Number.parseInt(req.params.id);
                let vehicle = yield prisma.vehicle.create({
                    data: {
                        licensePlate: req.body.vehicle.licensePlate,
                        image: req.body.vehicle.image,
                        make: req.body.vehicle.make,
                        model: req.body.vehicle.model,
                        year: Number.parseInt(req.body.vehicle.year),
                        owner: {
                            connect: {
                                id: userId
                            }
                        }
                    }
                });
                res.status(200).send(vehicle);
            }
            catch (err) {
            }
        }))
            .put((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let vehicle = req.body.vehicle;
                yield prisma.vehicle.update({
                    where: {
                        id: vehicle.id,
                    },
                    data: {
                        image: vehicle.image,
                        make: vehicle.make,
                        model: vehicle.model,
                        licensePlate: vehicle.licensePlate,
                        year: Number(vehicle.year),
                    },
                });
                res.status(200).json({ status: true });
            }
            catch (err) {
                console.log(err);
                res.status(477).json({ message: err, status: false });
            }
        })).delete((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let vid = Number(req.params.id);
                console.log(vid);
                yield prisma.vehicle.delete({
                    where: {
                        id: vid
                    }
                });
                res.status(200).json({ status: true });
            }
            catch (err) {
                console.log(err);
            }
        }));
        router.get("/customs", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const customers = yield prisma.user.findMany({
                    where: {
                        roles: {
                            some: {
                                id: UserRole.Customer
                            }
                        }
                    },
                    include: {
                        vehicles: true,
                        roles: true
                    }
                });
                // console.log(customers);
                res.status(200).send(customers);
            }
            catch (err) {
                console.log(err);
            }
        }));
        router.get("/user/:id/jobrequests", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("User job requests");
                const userId = Number.parseInt(req.params.id);
                const jobs = yield prisma.job.findMany({
                    where: {
                        vehicle: {
                            ownerId: userId,
                        },
                        startDate: {
                            gte: jsDateToSql(new Date())
                        },
                        // completed : false
                    },
                    include: {
                        vehicle: true,
                        assignedMechanic: true,
                        createdBy: true
                    }
                });
                res.status(200).send(jobs);
            }
            catch (err) {
                console.log(err);
                res.send(err);
            }
        }));
        router.route("/user/:id/appointmentbooking").post((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const userId = Number.parseInt(req.params.id);
                let appointment = yield prisma.appointment.create({
                    data: {
                        problemDescription: req.body.appointment.problemDescription,
                        suggestedDate: jsDateToSql(new Date(req.body.appointment.suggestedDate)),
                        streetAddress: req.body.appointment.streetAddress,
                        town: req.body.appointment.town,
                        parish: req.body.appointment.parish,
                        customer: {
                            connect: {
                                id: userId
                            }
                        },
                        vehicle: {
                            connectOrCreate: {
                                where: {
                                    id: req.body.appointment.vehicle.id ? req.body.appointment.vehicle.id : 0
                                },
                                create: {
                                    make: req.body.appointment.vehicle.make,
                                    model: req.body.appointment.vehicle.model,
                                    year: Number.parseInt(req.body.appointment.vehicle.year),
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
                });
                console.log(appointment);
                res.status(200).send(appointment);
            }
            catch (err) {
                console.log(err);
                res.status(400).send(err);
            }
        }));
        router.get("/appointments", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const appointments = yield prisma.appointment.findMany({
                where: {
                    NOT: {
                        fulfilled: true
                    }
                },
                include: {
                    assignedMech: true,
                    customer: true,
                    vehicle: true,
                },
                orderBy: {
                    createdAt: "desc"
                },
            });
            res.send(appointments);
        }));
        router.route("/appointment/:id").get((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const apptId = parseInt(req.params.id);
                const appointment = yield prisma.appointment.findUniqueOrThrow({
                    where: {
                        id: apptId
                    },
                    include: {
                        assignedMech: true,
                        customer: true,
                        vehicle: true,
                    }
                });
                // console.log(appointment)
                res.send(appointment);
            }
            catch (err) {
                console.log(err);
            }
        })).post((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const appId = parseInt(req.params.id);
                console.log(appId);
                yield prisma.appointment.update({
                    where: {
                        id: appId
                    },
                    data: {
                        fulfilled: true
                    }
                });
            }
            catch (err) {
                console.log(err);
            }
        })).put((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const apptId = parseInt(req.params.id);
                const appointment = yield prisma.appointment.update({
                    where: {
                        id: apptId
                    },
                    data: {
                        assignedMechId: req.body.appointment.assignedMechId,
                        fulfilled: req.body.appointment.fulfilled
                    },
                    include: {
                        assignedMech: true,
                        customer: true,
                        vehicle: true
                    }
                });
                res.status(200).send(appointment);
            }
            catch (err) {
                console.log(err);
            }
        }));
        router.route("/jobs").get((req, res) => __awaiter(this, void 0, void 0, function* () {
            //Code Here
        })).post((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                //console.log(req.body.job)
                let job = yield prisma.job.create({
                    data: {
                        startDate: req.body.job.startDate,
                        endDate: req.body.job.endDate,
                        serviceFee: req.body.job.serviceFee,
                        serviceType: req.body.job.serviceType,
                        summary: req.body.job.summary,
                        totalCost: req.body.job.totalCost,
                        createdBy: {
                            connect: {
                                id: req.body.job.createdById
                            }
                        },
                        vehicle: {
                            connect: {
                                id: req.body.job.vehicleId
                            }
                        },
                        requiredParts: {
                            createMany: {
                                data: req.body.job.requiredParts
                            }
                        }
                    },
                });
                console.log(job);
                res.status(200).send(job);
            }
            catch (err) {
                console.log(err);
            }
        }));
        router.route("/job/:id").get((req, res) => __awaiter(this, void 0, void 0, function* () {
            const jobNumber = Number.parseInt(req.params.id);
            const job = yield prisma.job.findUniqueOrThrow({
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
        })).put((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const job = yield prisma.job.update({
                    where: {
                        jobNumber: req.body.job.jobNumber
                    },
                    data: {
                        assignedMechanicId: req.body.job.assignedMechanicId,
                        completed: req.body.job.completed,
                        isPaid: req.body.job.isPaid,
                        streetAddress: req.body.job.streetAddress,
                        town: req.body.job.town,
                        parish: req.body.job.parish,
                        confirmed: req.body.job.confirmed,
                        createdById: req.body.job.createdById,
                        endDate: req.body.job.endDate,
                        startDate: req.body.job.startDate,
                        serviceFee: req.body.job.serviceFee,
                        serviceType: req.body.job.serviceType,
                        summary: req.body.job.summary,
                        totalCost: req.body.job.totalCost,
                        vehicleId: req.body.job.vehicle.id
                    },
                    include: {
                        vehicle: true,
                        assignedMechanic: true,
                        createdBy: true,
                        requiredParts: true
                    }
                });
                res.status(200).send(job);
            }
            catch (err) {
                console.log(err);
            }
        }));
        router.get('/jobs/all', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const jobs = yield prisma.job.findMany({
                    include: {
                        vehicle: {
                            include: {
                                owner: true
                            }
                        },
                        assignedMechanic: true,
                    },
                });
                res.status(200).send(jobs);
            }
            catch (err) {
                console.log(err);
            }
        }));
        router.get("/jobs/upcoming", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const jobs = yield prisma.job.findMany({
                where: {
                    startDate: {
                        gte: jsDateToSql(new Date())
                    }
                },
                include: {
                    vehicle: {
                        include: {
                            owner: true
                        }
                    },
                    assignedMechanic: true,
                },
                orderBy: {
                    startDate: "desc"
                }
            });
            //console.log(jobs)
            res.status(200).send(jobs);
        }));
        // Gets the schedule for a given mechanic using the Current Date and the Desired Month
        router.get("/user/:id/schedule/:currentDate-:givenMonth", (req, res) => __awaiter(this, void 0, void 0, function* () {
            // route parameters transformed
            const currentDate = new Date(parseInt(req.params.currentDate, 10));
            const givenMonth = parseInt(req.params.givenMonth);
            const userId = parseInt(req.params.id, 10);
            // determining the days of the week and the current month
            let daysInMonth = 0;
            const selectedMonth = new Date(currentDate.getFullYear(), givenMonth);
            switch (givenMonth) {
                case 0:
                    daysInMonth = 31;
                    break;
                case 1:
                    if ((currentDate.getFullYear() % 4) === 0) {
                        daysInMonth = 29;
                    }
                    else {
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
                    if (typeof givenMonth !== 'number') {
                        throw new TypeError("Type of Month must be a number");
                    }
                    else if (givenMonth >= 12) {
                        throw new RangeError("Value of Month must be less than or equal to 11");
                    }
                    break;
            }
            // getting the information from the database
            const schedule = yield prisma.schedule.findMany({
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
                                /*  MySQL datetime month values are 1-index (i.e. Jan-Dec = 1-12), JS date month
                                    values are 0-indexed (0-11). Request sends JS date (e.g. '7' for August), so need
                                    to convert it to ISO 8601 (where August is 08)
                                */
                                gte: `${new Date(Date.now()).getFullYear()}-${selectedMonth.getMonth() + 1 < 10 ? '0'
                                    + (selectedMonth.getMonth() + 1) : selectedMonth.getUTCMonth() + 1}-01T00:00:00.000Z`,
                                lte: `${new Date(Date.now()).getFullYear()}-${selectedMonth.getMonth() + 1 < 10 ? '0'
                                    + (selectedMonth.getMonth() + 1) : selectedMonth.getUTCMonth() + 1}-${daysInMonth}T00:00:00.000Z`
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
            });
            // console.log(schedule);
            res.status(200).send(schedule);
        }));
        // gets a list the jobNumbers, Customers, and of all active jobs that a mechanic is assigned to
        router.get("/user/:id/activejobs", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const mechanicId = parseInt(req.params.id);
            const activeJobs = yield prisma.job.findMany({
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
            });
            if (activeJobs !== undefined) {
                res.status(200).send(activeJobs);
            }
            else {
                // need to re-read http errors
                res.status(400);
            }
        }));
        // posts a JobStage to the database
        router.post("/user/jobstage/create", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newJobStage = req.body;
            // console.log(newJobStage);
            try {
                const JobStage = yield prisma.jobStage.create({
                    data: newJobStage,
                });
                res.status(201).send("Job Stage Created");
            }
            catch (err) {
                if (err instanceof runtime_1.PrismaClientKnownRequestError) {
                    if (err.code == 'P1001') {
                        res.status(503).send("Database Temporarily Unavailable");
                    }
                }
                else {
                    // if there's any other way this could go wrong (that i want to write in rn)
                }
            }
        }));
        // gets the minimum necessary appointment corresponding to a schedule item's id
        router.get("/appointments/short/:appointmentscheduleid", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const appointmentId = parseInt(req.params.appointmentscheduleid);
            try {
                const shortAppointment = yield prisma.appointment.findUnique({
                    where: {
                        scheduledItemId: appointmentId
                    },
                    select: {
                        id: true,
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
            catch (err) {
                console.log(err);
            }
        }));
        router.get('/jobstage', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield prisma.jobStage.findMany({});
                res.send(result);
            }
            catch (err) {
                console.log(err);
            }
        }));
        // uses the schedule id to return a basic minimum amount of information relevant to a jobstage
        router.get("/jobstage/short/:jobstagescheduleid", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const stageScheduleId = parseInt(req.params.jobstagescheduleid);
            try {
                const shortJobStage = yield prisma.jobStage.findUnique({
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
                });
                res.status(200).send(shortJobStage);
            }
            catch (err) {
                console.log(err);
            }
        }));
        // gets all of the information for a specific job. every stage, the vehicle, and the owner entirely
        router.get("/jobs/:jobnumber/fulljob", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const jobId = parseInt(req.params.jobnumber);
            try {
                const fullJobInformation = yield prisma.job.findUniqueOrThrow({
                    where: {
                        jobNumber: jobId
                    },
                    include: {
                        stages: {
                            include: {
                                scheduledItem: true
                            }
                        },
                        vehicle: {
                            include: {
                                owner: true
                            }
                        },
                        requiredParts: true
                    }
                });
                res.status(200).send(fullJobInformation);
            }
            catch (err) {
                console.log(err);
            }
        }));
        return router;
    }
}
exports.default = Routes;
