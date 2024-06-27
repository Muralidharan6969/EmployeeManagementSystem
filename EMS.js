const express = require('express');
const ems_app = express();
const bodyParser = require('body-parser');
require('dotenv').config({ path: `${process.cwd()}/ems_app.env`});
const db = require('./Models/index')
const { customGlobalErrorHandler } = require('./Utils/Errors/CustomGlobalErrorHandler');
const { employeeRouter } = require('./Routes/EmployeeRoute')
const { catchAsyncError } = require('./Utils/Errors/CatchAsyncError')
const { AppError } = require('./Utils/Errors/AppError');

//JSON parser for incoming JSON objects
ems_app.use(bodyParser.json());
ems_app.use(express.json());

//Health-Check Endpoint
ems_app.get('/', (req, res) => {
    res.status(200).json({
        status: 'Success',
        message: 'Successfully tested the health endpoint'
    }); 
});

ems_app.use('/EMS/employees', employeeRouter);

ems_app._router.stack.forEach(function (middleware) {
    if (middleware.route) { // routes registered directly on the app
        const { route } = middleware;
        const methods = Object.keys(route.methods).join(', ').toUpperCase();
        console.log(`${methods} ${route.path}`);
    } else if (middleware.name === 'router') { // router middleware
        middleware.handle.stack.forEach(function (handler) {
            const { route } = handler;
            const methods = Object.keys(route.methods).join(', ').toUpperCase();
            console.log(`${methods} ${route.path}`);
        });
    }
});


//Response for all endpoints not available in the Server
ems_app.use('*', catchAsyncError(async (req, res, next) => {
    throw new AppError(`The URL ${req.originalUrl} you are trying to hit is not available`, 404);
}));

//Calling Custom Global Error Handler
ems_app.use(customGlobalErrorHandler);

//Sync up function between Models and DB Schema
async function startServer() {
    try {
        await db.sequelize.sync({ alter: true });
        console.log('All models were synchronized successfully.');
        const port = process.env.PORT || 3000;
        ems_app.listen(port, ()=>{
            console.log(`Server is up and listening on port ${port}`);
        });
        console.log(`Employee Model: ${db.Employees}
            Shift Model: ${db.Shifts}
            Form Model: ${db.Forms}
            EmployeeShiftAllocation Model: ${db.EmployeeShiftAllocation}
            FormsEmployeeMapping Model: ${db.FormsEmployeeMapping}`);
    } 
    catch (error) {
        console.error('Unable to synchronize the models:', error);
    }
}
startServer();
  

