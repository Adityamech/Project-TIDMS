const express = require("express");
const { Employee } = require("../../models/employeeModel");

const router = express.Router();

router.put("/employee/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Find the employee by ID and update its data
        const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true });

        // If no employee is found with the given ID, return a 404 status
        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Send a success response
        res.status(200).json({ message: "Employee updated successfully", employee: updatedEmployee });
    } catch (error) {
        // Send an error response if something goes wrong
        console.error('Error updating employee:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
