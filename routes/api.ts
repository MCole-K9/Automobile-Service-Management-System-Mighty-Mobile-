import { Response, Request, Router} from "express";
import { PrismaClient } from "@prisma/client"; //Db Connection

const prisma = new PrismaClient();

//These routes will be called when a request is sent to ip-address/api
// The symbol "/" represents in the context of this file -  ip-address/api  E.g http://localhost:5000/api
export default class Routes{

    static routes():Router {

        const router:Router = Router();

        router.route("/").get((req:Request, res:Response)=>{
            res.send("API Call");
        });

        // router.route("/test").get(async (req:Request, res:Response)=>{
        //    const todoAll = await prisma.todo.findMany({})
        //    res.send(todoAll)
        // })


        return router;

    }
    
}

    



