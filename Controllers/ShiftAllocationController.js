const { AppError } = require('../Utils/Errors/AppError');
const { catchAsyncError } = require('../Utils/Errors/CatchAsyncError');
const { statusCodes } = require('../Utils/StatusCodes');
const { shiftAllocationService } = require('../Services/ShiftService/ShiftAllocationService')
const { shiftNameValidateSchema } = require('../Validations/ShiftAllocationValidation')

const shiftAllocationController = catchAsyncError(async(req, res, next) => {
    try{
        const { employeeId, shiftName, startDate, endDate } = req.body;
        const parsedStartDate = new Date(startDate);
        const parsedEndDate = new Date(endDate);
        const shiftAllocationObject = {}
        shiftAllocationObject.employeeId = employeeId;
        shiftAllocationObject.shiftName = shiftName;
        shiftAllocationObject.startDate = parsedStartDate;
        shiftAllocationObject.endDate = parsedEndDate;
        await shiftNameValidateSchema.validateAsync(shiftAllocationObject.shiftName, {abortEarly: false});
        const result = await shiftAllocationService(shiftAllocationObject);
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
            next(error);
        }
    }
});

module.exports = {
    shiftAllocationController
}