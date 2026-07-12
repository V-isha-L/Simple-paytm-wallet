import express from "express";
import {dbConnect,User} from "./db.js";
import route from "./routes/index.js";
import cors from 'cors'


const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1",route);


await dbConnect();


app.listen(3000,(req,res) => {
    console.log("Listening on port 3000");
})