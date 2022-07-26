import express, {Application, Response, Request, query} from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from 'path';

import Routes from "../routes/api"


const app:Application = express();

app.use(bodyParser.json());

const corsOptions = {
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
app.use(cors(corsOptions)); 
//app.set("query parser", "simple")

app.use("/api", Routes.routes())
app.use(express.static(path.join(__dirname, "/public/")))

const port = process.env.PORT || 5000;

if(process.env.NODE_ENV === 'production'){
    
    console.log('production');
    //app.use(history())
    app.use(express.static(path.join(__dirname, '/public/')));
    
    app.get("/", (req:Request, res:Response)=>{
        res.sendFile(__dirname+"/public/index.html");
    })
}




app.listen(port, ()=>{
    console.log(`App Running on port ${port}` );
});