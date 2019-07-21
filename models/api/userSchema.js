const Joi = require('@hapi/joi');

const createUserSchema = Joi.object().keys({
    name : Joi.string().required(),
    password: Joi.string().required(),
    phone: Joi.string().required()
})

const updateUserSchema = Joi.object().keys({
    name : Joi.string().optional(),
    phone: Joi.string().optional()
})

const getUserListSchema = Joi.object().keys({
    skip: Joi.string().optional(),
    limit: Joi.string().optional()
}).and('skip','limit')

const getUserDetailsPathParamScema = Joi.object().keys({
    userId: Joi.string().required()
})

module.exports = {
    "createUserSchema":createUserSchema,
    "getUserListSchema" : getUserListSchema,
    "getUserDetailsPathParamScema": getUserDetailsPathParamScema,
    "updateUserSchema":updateUserSchema
};