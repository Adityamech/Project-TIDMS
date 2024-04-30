// const express = require("express");
// const { Employee } = require("../../models/employeeModel");

// const router = express.Router();

// router.delete("/employee/:id", async (req, res) => {
//     try {
//         const { id } = req.params;

//         // Find the employee by ID and delete it
//         const deletedEmployee = await Employee.findByIdAndDelete(id);

//         // If no employee is found with the given ID, return a 404 status
//         if (!deletedEmployee) {
//             return res.status(404).json({ message: "Employee not found" });
//         }

//         // Send a success response
//         res.status(200).json({ message: "Employee deleted successfully" });
//     } catch (error) {
//         // Send an error response if something goes wrong
//         console.error('Error deleting employee:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// module.exports = router;
