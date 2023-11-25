import express from "express";
import mongoose from "mongoose";
import 'dotenv/config'

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to Database!");
}).catch((err)=>{
    console.log(err);
});

const app = express();
const port = 3000;

app.listen(port,()=>{
    console.log(`server running on ${port}!!`);
});