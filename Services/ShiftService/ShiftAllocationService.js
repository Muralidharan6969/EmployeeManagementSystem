const {generateResponse} = require('../../Utils/GenerateResponse.js')
const {statusCodes} = require('../../Utils/StatusCodes.js')
const Shift = require('../../Models/index.js').Shifts;
const EmployeeShiftAllocation = require('../../Models/index.js').EmployeeShiftAllocation
const { AppError } = require('../../Utils/Errors/AppError.js')

const shiftAllocationService = async(shiftAllocationObject) => {
    const { employeeId, shiftName, startDate, endDate } = shiftAllocationObject;
    const result = await Shift.findOne({ where: {shiftName}});
    if(!result){
        throw new AppError("Shift details are incorrect. Kindly resubmit again", statusCodes.NOT_FOUND);
    }

    const shiftAllocation = await EmployeeShiftAllocation.create({
        employeeId: employeeId,
        shiftId: result.id,
        startDate: startDate,
        endDate: endDate
    });

    if(!shiftAllocation){
        throw new AppError("Shift Allocation Request could not be completed", statusCodes.INTERNAL_SEVRER_ERROR);
    }

    return generateResponse(statusCodes.CREATED, `Shift has been allocated succesfully for the employee ${employeeId}`, null);
}

module.exports = {
    shiftAllocationService
}