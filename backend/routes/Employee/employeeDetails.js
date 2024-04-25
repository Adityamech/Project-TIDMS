const express = require("express")
const {Employee} = require("../../models/employeeModel")

const router =  express.Router()


router.get("/employee-details", async(req, res)=> {
    try {

        const employees = await Employee.find();
        res.send(employees)

     
        // Send a success response
        // res.status(201).json({ message: 'Data displayed', employee: newEmployee });
    } catch (error) {
        // Send an error response if something goes wrong
        console.error('Error creating employee:', error);
        res.status(500).json({ message: 'Internal server error' });
    }    

})

module.exports = router;