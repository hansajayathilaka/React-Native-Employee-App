const mongoose = require('mongoose');
require('../models/Employee')

const EmployeeModel = mongoose.model('employee')
const { jsonSuccess, jsonError } = require('./utils')


module.exports.home = (req, res, next) => {
    res.send("Hello World....!")
}


module.exports.listEmployee = (req, res, next) => {
    EmployeeModel.find()
        .select('_id name phone email salary position picture')
        .then(docs => {
            jsonSuccess(res, 'done', docs)
        })
}


module.exports.createEmployee = (req, res, next) => {
    const employee = new EmployeeModel({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        salary: req.body.salary,
        position: req.body.position,
        picture: req.body.picture
    })
    employee.save()
        .then(data => {
            console.log(data)
            jsonSuccess(res, 'saved', data)
        })
        .catch(err => {
            console.error(err)
            jsonError(res, 'not saved', err)
        })
}


module.exports.deleteEmployee = (req, res, next) => {
    let empId = req.params._id
    EmployeeModel.findByIdAndDelete(empId)
        .then(doc => {
            if (doc){
                jsonSuccess(res, 'deleted', doc)
            } else{
                jsonError(res, 'not found')
            }
        })
        .catch(err => {
            console.error('[-] ', err)
            jsonError(res, err.message, err)
        })
}


module.exports.employeeProfile = (req, res, next) => {
    const empId = req.params._id
    EmployeeModel.findOne({ _id: empId })
        .then(doc => {
            jsonSuccess(res, 'done', doc)
        })
        .catch(err => {
            jsonError(res, err.message, err)
        })
}


module.exports.updateEmployee = (req, res, next) => {
    let empId = req.params._id
    const employee = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        salary: req.body.salary,
        position: req.body.position,
        picture: req.body.picture
    }
    EmployeeModel.findByIdAndUpdate(empId, employee)
        .then(doc => {
            jsonSuccess(res, 'updated', doc)
        })
        .catch(err => {
            jsonError(res, err.message, err)
        })
}
