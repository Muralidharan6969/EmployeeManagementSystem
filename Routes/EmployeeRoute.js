const express = require('express');
const employeeRouter = express.Router();
const {signupController,
    loginController,
    roleAuthorizationController,
    validateTokenController,
    updateEmployeeController} = require('../Controllers/AuthController') 
const { shiftAllocationController } = require('../Controllers/ShiftAllocationController')
const { formCreationController,
    getFormsController} = require('../Controllers/FormsController')

    employeeRouter
    .route('/')
    .post(validateTokenController, roleAuthorizationController('0'), signupController)
    .get(validateTokenController,  roleAuthorizationController('0', '1'), );

    employeeRouter
    .route('/:id')
    .patch(validateTokenController, roleAuthorizationController('0'), updateEmployeeController);
    
    employeeRouter
    .route('/login')
    .get(loginController);

    employeeRouter
    .route('/shifts')
    .post(validateTokenController, roleAuthorizationController('1'), shiftAllocationController);
    
    employeeRouter
    .route('/forms')
    .post(validateTokenController, roleAuthorizationController('2'), formCreationController)
    .get(validateTokenController, roleAuthorizationController('1'), getFormsController)

module.exports = {
    employeeRouter
}
