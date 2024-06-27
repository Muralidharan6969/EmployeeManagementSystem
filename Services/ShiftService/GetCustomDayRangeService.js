const {statusCodes} = require('../../Utils/StatusCodes.js')
const Shift = require('../../Models/index.js').Shifts
const { AppError } = require('../../Utils/Errors/AppError.js')


const getCustomDayRange = async(inputDate) => {
    const shiftA = await Shift.findOne({ where: { shiftName: 'A' } });
    const shiftC = await Shift.findOne({ where: { shiftName: 'C' } });
    if (!shiftA || !shiftC) {
        throw new AppError("Shift timings could not be fetched", statusCodes.INTERNAL_SEVRER_ERROR);
    }

    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const customDayStart = new Date(year, month, day, shiftA.shiftStartHour, shiftA.shiftStartMinutes, 0);
    console.log(customDayStart);
    console.log(shiftA.shiftStartHour, shiftA.shiftStartMinutes);
    const customDayEnd = new Date(year, month, day, shiftC.shiftEndHour, shiftC.shiftEndMinutes, 0);
    console.log(customDayEnd);
    customDayEnd.setDate(customDayEnd.getDate() + 1);
    console.log(customDayEnd);

    const dateRange = {};
    dateRange.customDayStart = customDayStart;
    dateRange.customDayEnd = customDayEnd;
    console.log(dateRange);

    return dateRange;
}

module.exports = {
    getCustomDayRange
}