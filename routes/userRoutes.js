var express = require('express');
var router = express.Router();
const userController = require('../controller/userController');
const joiSchemaValidation = require('../helper/joiSchemaValidation');
const userSchema = require('../models/api/userSchema')

/* Add New User. */
router.post('/add-user', joiSchemaValidation.validateBody(userSchema.createUserSchema),userController.createUser);

/* Get All Users */
router.get('/get-all-users', joiSchemaValidation.validateQuaryParams(userSchema.getUserListSchema), userController.getAllUsers);

/*Get A Specific User*/
router.get('/user-details/:userId',joiSchemaValidation.validatePathParams(userSchema.getUserDetailsPathParamScema),userController.getUserDetails)

/*Update A User*/
router.put('/user-update/:userId',joiSchemaValidation.validatePathParams(userSchema.getUserDetailsPathParamScema),joiSchemaValidation.validateBody(userSchema.updateUserSchema),userController.updateUser)


module.exports = router;
