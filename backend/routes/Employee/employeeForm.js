const express = require("express")
const {Employee} = require("../../models/employeeModel")

const router =  express.Router()

router.post("/employee-form", async(req, res)=> {
    try {

        // Create a new Employee instance
        const newEmployee = new Employee({
            empdate : req.body.empdate,
            empId: req.body.empId,
            fullName: req.body.fullName,
            phoneNumber: req.body.phoneNumber,
            category: req.body.category,
            salary: req.body.salary
        });

        // Save the new employee to the database
        await newEmployee.save();

        // Send a success response
        res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
    } catch (error) {
        // Send an error response if something goes wrong
        console.error('Error creating employee:', error);
        res.status(500).json({ message: 'Internal server error' });
    }    

})

module.exports = router;