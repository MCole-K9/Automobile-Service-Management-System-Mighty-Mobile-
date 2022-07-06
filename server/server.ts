import express, {Application, Response, Request} from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Routes from "../routes/api"


const app:Application = express();

app.use(bodyParser.json());

const corsOptions = {
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
app.use(cors(corsOptions)); 

app.use("/api", Routes.routes())

const port = process.env.PORT || 5000;



app.get("/", (req:Request, res:Response)=>{

    res.send("Lets Build This");
})




app.listen(port, ()=>{
    console.log(`App Running on port ${port}` );
});