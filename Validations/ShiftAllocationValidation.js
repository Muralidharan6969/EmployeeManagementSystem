const Joi = require('joi');

const shiftNameValidateSchema = Joi.string()
    .length(1) // Ensure the string is exactly one character long
    .pattern(/^[A-Z]$/) // Ensure the character is an uppercase letter (A-Z)
    .required()
    .messages({
        'string.base': 'ShiftName must be a string',
        'string.length': 'ShiftName must be exactly one character long',
        'string.pattern.base': 'ShiftName must be an uppercase letter (A-Z)',
        'any.required': 'ShiftName is a required field',
    });

module.exports = {
    shiftNameValidateSchema
}