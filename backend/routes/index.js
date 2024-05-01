const express = require("express")
const router =  express.Router()
const employeeForm = require("./Employee/employeeForm")
const employeeDetails = require("./Employee/employeeDetails")
const stockForm = require("./Stock/stockForm")
const stockDetails = require("./Stock/stockDetails")
const employeeEdit = require ("./Employee/employeeEdit")


router.use(employeeForm, employeeDetails, stockDetails, stockForm,employeeEdit)

module.exports = router;