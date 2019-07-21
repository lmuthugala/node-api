const Joi = require('@hapi/joi');
const constants = require('../constants/constancts')

let response = {};

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if (result.error) {

                let errorMessage = result.error.details.map(error => {
                    return {
                        error: error.message,
                        path: error.path
                    }
                })

                response.status = 400;
                response.message = constants.controllerStatus.BAD_REQUEST;
                response.body = errorMessage;

                return res.status(400).json(response);
            } else {
                next();
            }
        }
    },
    validateQuaryParams: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.query, schema);
            if (result.error) {
                let errorMessage = result.error.details.map(error => {
                    return {
                        error: error.message,
                        path: error.path
                    }
                })
                response.status = 400;
                response.message = constants.controllerStatus.BAD_REQUEST;
                response.body = errorMessage;
                return res.status(400).json(response);
            } else {
                next();
            }
        }
    },
    validatePathParams: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.params , schema);
            if (result.error) {
                let errorMessage = result.error.details.map(error => {
                    return {
                        error: error.message,
                        path: error.path
                    }
                })
                response.status = 400;
                response.message = constants.controllerStatus.BAD_REQUEST;
                response.body = errorMessage;
                return res.status(400).json(response);
            } else {
                next();
            }
        }
    }
}