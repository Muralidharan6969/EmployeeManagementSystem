const { AppError } = require('../Utils/Errors/AppError');
const { catchAsyncError } = require('../Utils/Errors/CatchAsyncError');
const { statusCodes } = require('../Utils/StatusCodes');
const { employeeSignupValidationSchema,
    employeeLoginValidationSchema,
    employeeUpdateValidationSchema } = require('../Validations/EmployeeModelValidation');
const { createEmployee } = require('../Services/EmployeeService/CreateEmployeeService');
const { login } = require('../Services/EmployeeService/EmployeeLoginService');
const { employeeValidateToken } = require('../Services/TokenService/ValidateTokenService');
const { IdValidateSchema } = require('../Validations/IdValidationSchema')
const { updateEmployee } = require('../Services/EmployeeService/UpdateEmployeeService')


const signupController = catchAsyncError(async (req, res, next) => {
    try{
        const employeeObject = req.body;
        await employeeSignupValidationSchema.validateAsync(employeeObject, {abortEarly: false});
        const result = await createEmployee(employeeObject);
        res.status(result.statusCode).json({
            status: 'Success',
            message: result.message
        });
    }
    catch(error){
        if(error.isJoi){
            const errors = error.details.map((detail) => detail.message);
            throw new AppError(errors, statusCodes.UNPROCESSABLE_ENTITY);
        }
        else{
            // throw new AppError('Unexpected error has happened while validation', statusCodes.INTERNAL_SEVRER_ERROR);
            next(error);
        }
    }
});

const loginController = catchAsyncError(async (req, res, next) => {
    try{
        const employeeObject = req.body;
        await employeeLoginValidationSchema.validateAsync(employeeObject, {abortEarly: false});
        const result = await login(employeeObject);
        res.status(result.statusCode).json({
            status: 'Success',
            message: result.message,
            token: result.data.token
        });
    }
    catch(error){
        if(error.isJoi){
            const errors = error.details.map((detail) => detail.message);
            throw new AppError(errors, statusCodes.UNPROCESSABLE_ENTITY);
        }
        else{
            next(error);
        }
    }

});

const validateTokenController = catchAsyncError(async (req, res, next) => {
    const token = req.headers.authorization;
    if(token && token.startsWith('Bearer ')){
        try{
            const result = await employeeValidateToken(token);
            req.employee = result.data;
            return next();
            // res.status(result.statusCode).json({
            //     status: 'Success',
            //     message: result.message,
            //     data: req.user
            // });
        }
        catch(error){
            next(error);
        }
    }
    else{
        throw new AppError("Please login to access", statusCodes.FORBIDDEN);
    }
});

const roleAuthorizationController = (...employeeTypes) => {
    return (req, res, next) => {
        if(!employeeTypes.includes(req.employee.employeeType)){
            throw new AppError("Employee is not authorized to perform this operation", statusCodes.FORBIDDEN);
        }
        return next();
    } 
}

const updateEmployeeController = catchAsyncError(async (req, res, next) => {
    try{
        const employeeId = req.params.id;
        const employeeObject = req.body;
        await IdValidateSchema.validateAsync(employeeId, {abortEarly: false});
        await employeeUpdateValidationSchema.validateAsync(employeeObject, {abortEarly: false});
        const result = await updateEmployee(employeeId, employeeObject);
        res.status(result.statusCode).json({
            status: 'Success',
            message: result.message,
            token: result.data.token
        });
    }
    catch(error){
        if(error.isJoi){
            const errors = error.details.map((detail) => detail.message);
            throw new AppError(errors, statusCodes.UNPROCESSABLE_ENTITY);
        }
        else{
            next(error);
        }
    }

});

module.exports = {
    signupController,
    loginController,
    roleAuthorizationController,
    validateTokenController,
    updateEmployeeController
}