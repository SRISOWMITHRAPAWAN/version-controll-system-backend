const express=require("express");
const { getEmployees, updateEmployees, createEmployees, deleteEmployees,getEmployee } = require("../modules/employeeModule");
const router=express.Router();


router.get("/get",getEmployees);

router.get("/get/:id",getEmployee);

router.put("/update/:id",updateEmployees);

router.post("/create",createEmployees);

router.delete("/delete/:id",deleteEmployees);

module.exports=router