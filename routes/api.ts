import { Response, Request, Router} from "express";

//These routes will be called when a request is sent to ip Address/api
// The symbol "/" represents in the context of this file -  ip Address/api  E.g http://localhost:5000/api
export default class Routes{

    static routes():Router {

        const router:Router = Router();

        router.route("/").get((req:Request, res:Response)=>{
            res.send("API Call");
        })

        return router;

    }
    
}

    



