const Joi = require('joi');

const employeeSignupValidationSchema = Joi.object({
    employeeType: Joi.string()
    .required()
    .messages({
        'any.required' : 'UserType is a required field'
    }),

    firstName: Joi.string()
    .required()
    .messages({
        'string.empty' : 'FirstName cannot be an empty field',
        'any.required' : 'FirstName is a required field'
    }),

    lastName: Joi.string(),

    password: Joi.string()
    .min(8)
    .required()
    .messages({
        'string.empty': 'Password cannot be an empty field',
        'string.min': 'Password should have a minimum length of {#limit}',
        'any.required': 'Password is a required field'
    }),

    email: Joi.string()
    .email()
    .required()
    .messages({
        'string.empty': 'Email cannot be an empty field',
        'string.email': 'Email format is invalid',
        'any.required': 'Email is a required field'
    }),

    reportsTo: Joi.number()

});

const employeeLoginValidationSchema = Joi.object({

    email: Joi.string()
    .email()
    .required()
    .messages({
        'string.empty': 'Email cannot be an empty field',
        'string.email': 'Email format is invalid',
        'any.required': 'Email is a required field'
    }),

    password: Joi.string()
    .min(8)
    .required()
    .messages({
        'string.empty': 'Password cannot be an empty field',
        'string.min': 'Password should have a minimum length of {#limit}',
        'any.required': 'Password is a required field'
    })

});

const employeeUpdateValidationSchema = Joi.object({
    employeeType: Joi.string()
    .required()
    .messages({
        'any.required' : 'UserType is a required field'
    }),

    firstName: Joi.string()
    .required()
    .messages({
        'string.empty' : 'FirstName cannot be an empty field',
        'any.required' : 'FirstName is a required field'
    }),

    lastName: Joi.string(),

    // password: Joi.string()
    // .min(8)
    // .required()
    // .messages({
    //     'string.empty': 'Password cannot be an empty field',
    //     'string.min': 'Password should have a minimum length of {#limit}',
    //     'any.required': 'Password is a required field'
    // }),

    email: Joi.string()
    .email()
    .required()
    .messages({
        'string.empty': 'Email cannot be an empty field',
        'string.email': 'Email format is invalid',
        'any.required': 'Email is a required field'
    }),

    reportsTo: Joi.number()

});

module.exports = {
    employeeSignupValidationSchema,
    employeeLoginValidationSchema,
    employeeUpdateValidationSchema
}
