const Joi = require('joi');

const formValidationSchema = Joi.object({
    partNumber: Joi.string()
    .required()
    .messages({
        'any.required' : 'PartName is a required field'
    }),

    startTime: Joi.date()
    .required()
    .messages({
        'any.required' : 'StartTime is a required field'
    }),

    endTime: Joi.date()
    .required()
    .messages({
        'any.required' : 'EndTime is a required field'
    }),

});

module.exports = {
    formValidationSchema
}