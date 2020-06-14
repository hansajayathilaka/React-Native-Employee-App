require('dotenv').config({ path: 'variables.env' });

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const employeeRouters = require('./routers/Employee')
require('./models/Employee')
const EmployeeModel = mongoose.model('employee')

const app = express()

const url = process.env.DATABASE_URL;
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })

mongoose.connection.on('connected', (res) => {
    console.log('[+] Connected to MongoDB Successfully.')
})

mongoose.connection.on('error', (err) => {
    console.error('[-] MongoDB Connection Failed.')
    console.error(err);
    throw err;
})

app.use(bodyParser.json())

// Routers
app.use('/', employeeRouters)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server running on post ${ port }`)
})
