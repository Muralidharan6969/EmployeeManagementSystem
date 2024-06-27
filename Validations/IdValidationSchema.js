const Joi = require('joi');

const IdValidateSchema = Joi.number()
    .required()
    .messages({
        'number.base': 'ID must be a number',
        'any.required': 'ID is a required field',
    });

module.exports = {
    IdValidateSchema
}