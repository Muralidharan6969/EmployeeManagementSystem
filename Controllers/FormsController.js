const { AppError } = require('../Utils/Errors/AppError');
const { catchAsyncError } = require('../Utils/Errors/CatchAsyncError');
const { statusCodes } = require('../Utils/StatusCodes');
const { createFormService } = require('../Services/FormsService/CreateFormService')
const { formValidationSchema } = require('../Validations/FormsModelValidation')
const { getCustomDayRange } = require('../Services/ShiftService/GetCustomDayRangeService')
const { getAllForms } = require('../Services/FormsService/GetFormsService.js')

const formCreationController = catchAsyncError(async(req, res, next) => {
    try{
        const { partNumber, startTime, endTime } = req.body;
        const parsedStartDate = new Date(startTime);
        const parsedEndDate = new Date(endTime);
        const formObject = {};
        formObject.partNumber = partNumber;
        formObject.startTime = parsedStartDate;
        formObject.endTime = parsedEndDate;
        const employeeId = req.employee.id;
        await formValidationSchema.validateAsync(formObject, {abortEarly: false});
        const result = await createFormService(formObject, employeeId);
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

const getFormsController = catchAsyncError(async(req, res, next) => {
    const { date, employeeId, shiftId } = req.query;

    const result = await getAllForms(date, employeeId, shiftId);

    res.status(result.statusCode).json({
        status: 'Success',
        message: result.message,
        data: result.data
    });
});

module.exports = {
    formCreationController,
    getFormsController
}