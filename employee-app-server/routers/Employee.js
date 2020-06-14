const express = require('express')
const router = express.Router()

const EmployeeController = require('../controllers/Employee')

router.get('', EmployeeController.home)
router.get('/employee', EmployeeController.listEmployee)    // home
router.post('/employee', EmployeeController.createEmployee)     // Create
router.get('/employee/:_id', EmployeeController.employeeProfile)     // get profile
router.put('/employee/:_id', EmployeeController.updateEmployee)      // update
router.delete('/employee/:_id', EmployeeController.deleteEmployee)   // delete

module.exports = router
