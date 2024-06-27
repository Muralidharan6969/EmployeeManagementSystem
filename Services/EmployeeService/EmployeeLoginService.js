const Employee = require('../../Models/index.js').Employees;
const {statusCodes} = require('../../Utils/StatusCodes.js')
const {generateResponse} = require('../../Utils/GenerateResponse.js')
const bcrypt = require('bcrypt')
const {generateToken} = require('../TokenService/GenerateTokenService.js')
const { AppError } = require('../../Utils/Errors/AppError.js');

const login = async (employeeObject) => {
    const {email, password} = employeeObject;

    const result = await Employee.findOne({ where: {email}});
    if(!result || !(await bcrypt.compare(password, result.password))){
        throw new AppError("Email or Password incorrect", statusCodes.FORBIDDEN);
        // return generateResponse(statusCodes.FORBIDDEN, "Email or Password incorrect", null)
    }
    // console.log("result :", result);

    const token = generateToken({
        id: result.id,
    });
    // console.log("token object:", token);

    return generateResponse(statusCodes.OK, "Logged In Successfully", {
        token: token
    })
};

module.exports = {
    login
}