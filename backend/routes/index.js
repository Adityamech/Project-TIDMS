const express = require("express")
const router =  express.Router()
const employeeForm = require("./Employee/employeeForm")
const employeeDetails = require("./Employee/employeeDetails")
const stockForm = require("./Stock/stockForm")
const stockDetails = require("./Stock/stockDetails")
const employeeEdit = require ("./Employee/employeeEdit")
const ordersForm = require ("./Orders/ordersForm")
const ordersDetails = require ("./Orders/ordersDetails")
const grade1 = require("./Stock/Grades/grade1")
const grade2 = require("./Stock/Grades/grade2")
const grade3 = require("./Stock/Grades/grade3")
const grade4 = require("./Stock/Grades/grade4")
const grade5 = require("./Stock/Grades/grade5")
const grade6 = require("./Stock/Grades/grade6")
const grade7 = require("./Stock/Grades/grade7")
const greenTea = require("./Stock/Grades/greenTea")


router.use(employeeForm, employeeDetails, stockDetails, stockForm,employeeEdit,ordersForm,ordersDetails,grade1,grade2,grade3,grade4,grade5,grade6,grade7,greenTea)

module.exports = router;