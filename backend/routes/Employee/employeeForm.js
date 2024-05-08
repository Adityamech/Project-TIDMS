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

router.get("/total-employees", async (req, res) => {
    try {
        // Count the total number of employees
        const totalEmployees = await Employee.countDocuments();

        // Send the total count as response
        res.status(200).json({ totalEmployees });
    } catch (error) {
        // Send an error response if something goes wrong
        console.error('Error fetching total employees:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get("/total-salary", async (req, res) => {
    try {
        // Aggregate the total sum of salaries from all employees
        const totalSalary = await Employee.aggregate([
            {
                $group: {
                    _id: null,
                    totalSalary: { $sum: "$salary" }
                }
            }
        ]);

        // Send the total sum of salaries as response
        if (totalSalary.length > 0) {
            res.status(200).json({ totalSalary: totalSalary[0].totalSalary });
        } else {
            res.status(404).json({ message: 'No employees found' });
        }
    } catch (error) {
        // Send an error response if something goes wrong
        console.error('Error fetching total salary:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;