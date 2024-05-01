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
});


router.delete('/employee-details/:empId', async (req, res) => {
    const { empId } = req.params;
    try {
        // Find and delete employee by ID
        const deletedEmployee = await Employee.findOneAndDelete({ empId: empId });
        if (deletedEmployee) {
            console.log('Employee deleted:', deletedEmployee);
            res.status(200).json({ message: `Employee with ID ${empId} deleted successfully.` });
        } else {
            res.status(404).json({ error: `Employee with ID ${empId} not found.` });
        }
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.put('/employee-details/:empId', async (req, res) => {
    const { empId } = req.params;
    try {
        const updatedEmployee = await Employee.findOneAndUpdate({ empId: empId }, req.body, { new: true });
        if (updatedEmployee) {
            console.log('Employee updated:', updatedEmployee);
            res.status(200).json({ message: `Employee with ID ${empId} updated successfully.`, employee: updatedEmployee });
        } else {
            res.status(404).json({ error: `Employee with ID ${empId} not found.` });
        }
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;