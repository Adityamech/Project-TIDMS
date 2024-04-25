const mongoose = require('mongoose');

// Define the schema for the example model
const employeeSchema = new mongoose.Schema({
  empdate: {
    type: String,
    // required: true
  },
  empId: {
    type: Number,
    required: true,
    unique : true,
  },
  fullName: {
    type: String,
    // required: true,
    // unique: true
  },
  phoneNumber: {
    type: Number,
    // required: true,
    // unique: true
  },

  category: {
    type: String,
    // required: true,
    // unique: true
  },

  salary: {
    type: Number,
    // required: true,
    // unique: true
  }
});

// Create the Example model based on the schema
const Employee = mongoose.model('employee', employeeSchema);

module.exports = {Employee};
