const constants = require('../constants/constancts');
const userService = require('../services/userService')

let createUser = async   (req,res,next) => {
    try{
        let responseObj = {};
        let data = req.body;

        let responseFromService = await userService.createUser(data) 

        
        switch(responseFromService.status) {
            case constants.serviceStatus.USER_CREATED_SUCCESSFULLY:
                responseObj.status = 201;
                responseObj.message = constants.serviceStatus.USER_CREATED_SUCCESSFULLY,
                responseObj.body = responseFromService.body
                break;
            default:
                responseObj = constants.defaultFailedResponse;
        }
        res.status(201).json(responseObj);
    } catch(error){
        console.log("\nSomething Went Wrong : User Creation - \n",error);
        res.status(500).json(constants.defaultFailedResponse);
    }
}

let getAllUsers = async (req,res,next) => {
    try{
        let responseObj = {};
        let data = {
            skip: req.query.skip,
            limit: req.query.limit
        }
        let responseFromService = await userService.getAllUsers(data);

        switch(responseFromService.status) {
            case constants.serviceStatus.USER_LIST_FETCHED_SUCCESSFULLY:
                responseObj.status = 200;
                responseObj.message = constants.serviceStatus.USER_LIST_FETCHED_SUCCESSFULLY,
                responseObj.body = responseFromService.body
                break;
            default:
                responseObj = constants.defaultFailedResponse;
        }
        res.status(200).json(responseObj);
    } catch(error) {
        console.log("\nSomething Went Wrong : User List Fetch - \n",error);
        res.status(500).json(constants.defaultFailedResponse);
    }
}

let getUserDetails = async (req,res,next) => {
    try{
        let responseObj = {};
        let data = {
            userId: req.params.userId
        }
        let responseFromService = await userService.getUserDetails(data);

        switch(responseFromService.status) {
            case constants.serviceStatus.USER_DETAILS_FETCHED_SUCCESSFULLY:
                responseObj.status = 200;
                responseObj.message = constants.serviceStatus.USER_DETAILS_FETCHED_SUCCESSFULLY,
                responseObj.body = responseFromService.body
                break;
            default:
                responseObj = constants.defaultFailedResponse;
        }
        res.status(200).json(responseObj);
    } catch (error) {
        console.log("\nSomething Went Wrong : User Details Fetch - \n",error);
        res.status(500).json(constants.defaultFailedResponse);
    }
}

let updateUser = async (req,res,next) => {
    try{
        let responseObj = {};
        let data = {
            userId: req.params.userId,
            name: req.body.name,
            phone: req.body.phone
        };
        let responseFromService = await userService.updateUser(data) 
        
        switch(responseFromService.status) {
            case constants.serviceStatus.USER_UPDATED_SUCCESSFULLY:
                responseObj.status = 200;
                responseObj.message = constants.serviceStatus.USER_UPDATED_SUCCESSFULLY,
                responseObj.body = responseFromService.body
                break;
            default:
                responseObj = constants.defaultFailedResponse;
        }
        res.status(200).json(responseObj);
    } catch(error){
        console.log("\nSomething Went Wrong : User Updation - \n",error);
        res.status(500).json(constants.defaultFailedResponse);
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserDetails,
    updateUser
}