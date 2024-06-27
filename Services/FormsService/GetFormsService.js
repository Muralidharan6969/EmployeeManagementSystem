const {generateResponse} = require('../../Utils/GenerateResponse.js')
const {statusCodes} = require('../../Utils/StatusCodes.js')
const Form = require('../../Models/index.js').Forms;
const Employee = require('../../Models/index.js').Employees;
const Shift = require('../../Models/index.js').Shifts
const EmployeeShiftAllocation = require('../../Models/index.js').EmployeeShiftAllocation
const { AppError } = require('../../Utils/Errors/AppError.js');
const { getCustomDayRange } = require('../ShiftService/GetCustomDayRangeService.js')
const Op = require('../../Models/index.js').Sequelize.Op;

const getAllForms = async(date, employeeId, shiftId) => {
    const whereClause = {};
    const includeClause = [
      {
        model: EmployeeShiftAllocation,
        required: true,
        include: []
      }
    ];

    if (date) {
        const [year, month, day] = date.split('-');
        const parsedDate = new Date(year, month - 1, day);
        console.log(parsedDate);
        const { customDayStart, customDayEnd } = await getCustomDayRange(parsedDate);
        // console.log(`Day Start Time: ${customDayStart}, Day End Time: ${customDayEnd}`);
        console.log(customDayStart);
        console.log(customDayEnd);

        whereClause.createdAt = {
            [Op.between]: [customDayStart, customDayEnd]
        };
    }

    if (employeeId) {
        includeClause[0].include.push({
            model: Employee,
            where: { id: employeeId }
        });
    }

    if (shiftId) {
        includeClause[0].include.push({
            model: Shift,
            where: { id: shiftId }
        });
    }

    const result = await Form.findAll({
      where: whereClause,
      include: includeClause
    });

    if(!result){
        throw new AppError("Fetch forms request could not be completed", statusCodes.INTERNAL_SEVRER_ERROR);
    }

    return generateResponse(statusCodes.OK, "All products data fetched successfully", result);
}

module.exports = {
    getAllForms
}