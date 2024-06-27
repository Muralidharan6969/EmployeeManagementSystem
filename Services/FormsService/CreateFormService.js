const {generateResponse} = require('../../Utils/GenerateResponse.js')
const {statusCodes} = require('../../Utils/StatusCodes.js')
const Form = require('../../Models/index.js').Forms;
const EmployeeShiftAllocation = require('../../Models/index.js').EmployeeShiftAllocation
// const FormsEmployeeMapping = require('../../Models/index.js').FormsEmployeeMapping
const { AppError } = require('../../Utils/Errors/AppError.js')
const Op = require('../../Models/index.js').Sequelize.Op;

const createFormService = async(formObject, employeeId) => {
    const partNumber = formObject.partNumber;
    const present = await Form.findOne({where: {partNumber: partNumber}});
    if(present){
        throw new AppError(`Form for partNumber: ${partNumber} already exists. New form for the same part cannot be created`, statusCodes.CONFLICT)
    }

    const currentTime = new Date();
    const shiftAllocation = await EmployeeShiftAllocation.findOne({
        where:{
            employeeId: employeeId,
            startDate: { [Op.lte]: currentTime },
            endDate: { [Op.gte]: currentTime }
        }
    });
    if(!shiftAllocation){
        throw new AppError(`Shift allocation for the employee ${employeeId} is not available for the current week`, 
            statusCodes.INTERNAL_SEVRER_ERROR);
    }

    const form = await Form.create({
        partNumber: formObject.partNumber,
        startTime: formObject.startTime,
        endTime: formObject.endTime,
        shiftAllocationId: shiftAllocation.mappingId
    });
    if(!form){
        throw new AppError("Form creation request could not be completed", statusCodes.INTERNAL_SEVRER_ERROR);
    }

    // const formEmployee = await FormsEmployeeMapping.create({
    //     formId: form.id,
    //     shiftAllocationId: shiftAllocation.mappingId
    // })

    // if(!formEmployee){
    //     throw new AppError("Forms Employee Mapping request could not be completed", statusCodes.INTERNAL_SEVRER_ERROR);
    // }

    return generateResponse(statusCodes.CREATED, "Form has been successfully submitted and processed internally", null);
}

module.exports = {
    createFormService
}