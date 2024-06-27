const {generateResponse} = require('../../Utils/GenerateResponse.js')
const {statusCodes} = require('../../Utils/StatusCodes.js')
const Employee = require('../../Models/index.js').Employees;
const { AppError } = require('../../Utils/Errors/AppError.js');

const updateEmployee = async (employeeId, employeeObject) => {

    const result = await Employee.findOne( {where: {id: employeeId}})

    if(!result){
        throw new AppError("Employee does not exists", statusCodes.BAD_REQUEST);
    }
    
    result.employeeType = employeeObject.employeeType;
    result.firstName = employeeObject.firstName;
    result.lastName = employeeObject.lastName;
    result.email = employeeObject.email;
    result.reportsTo = employeeObject.reportsTo;
    
    const updatedResult = await result.save();

    return generateResponse(statusCodes.ACCEPTED, "Employee data has been updated in the database succesfully", updatedResult);
}

module.exports = {
    updateEmployee
}