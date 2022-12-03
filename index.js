const express=require("express");
const employeeRouter=require("./router/employeeRouter")
const cors=require("cors");

const mongo =require("./connect")
const registerRouter =require("./router/registerRouter");
const auth=require("./modules/authModule")
const dotenv =require("dotenv");
dotenv.config();

mongo.connect();

const app=express();
app.use(cors());
app.use(express.json());

app.use("/register",registerRouter);

app.use("/",auth.authenticateUser)

app.use("/employees",employeeRouter);



app.listen(process.env.PORT)