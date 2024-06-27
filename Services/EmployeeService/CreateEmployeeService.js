const {generateResponse} = require('../../Utils/GenerateResponse.js')
const {statusCodes} = require('../../Utils/StatusCodes.js')
const Employee = require('../../Models/index.js').Employees;
const bcrypt = require('bcrypt')
const { AppError } = require('../../Utils/Errors/AppError.js');

const createEmployee = async (employeeObject) => {
    const {email, password} = employeeObject;
    console.log(`Employee email is ${email} and password is ${password}`);
    const result = await Employee.findOne({ where: {email}})
    if(result){
        throw new AppError("Employee already exists", statusCodes.CONFLICT);
    }

    if(!['1', '2'].includes(employeeObject.employeeType)){
        throw new AppError("Invalid employee type", statusCodes.BAD_REQUEST);
    }

    const hashedPassword = bcrypt.hashSync(password, 12)
    let newEmployee;
    if(employeeObject.employeeType == '1'){
        newEmployee = await Employee.create({
            employeeType: employeeObject.employeeType,
            firstName: employeeObject.firstName,
            lastName: employeeObject.lastName,
            email: employeeObject.email,
            password: hashedPassword    
        });
    }
    else{
        newEmployee = await Employee.create({
            employeeType: employeeObject.employeeType,
            firstName: employeeObject.firstName,
            lastName: employeeObject.lastName,
            email: employeeObject.email,
            password: hashedPassword,
            reportsTo: employeeObject.reportsTo
        });
    }

    if(!newEmployee){
        throw new AppError("Employee Creation Request could not be completed", statusCodes.INTERNAL_SEVRER_ERROR);
    }

    return generateResponse(statusCodes.CREATED, "Employee profile been registered in the database succesfully", null);
};

module.exports = {
    createEmployee
}