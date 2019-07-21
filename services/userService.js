const constants = require('../constants/constancts');
const User = require('../models/db/userModal');
const crudRepository = require('../database/crudRepository');
const mongoose = require('mongoose');

module.exports.createUser = async (serviceData) => {
    let responseObj = {}
    try{
        const user = new User({
            name: serviceData.name,
            password: serviceData.password,
            phone: serviceData.phone,
        })
        let data = {
            model: user
        }
        let responseFromDatabase = await crudRepository.dataInsert(data)
        switch(responseFromDatabase.status) {
            case constants.databaseStatus.ENTITY_CREATED:
                responseObj.body = responseFromDatabase.result
                responseObj.status = constants.serviceStatus.USER_CREATED_SUCCESSFULLY
                break
            default:
                responseObj = constants.responseObj
                break
        }
        return responseObj
    }catch(err) {
        console.log('Something went wrong: Service: creat user:', err)
        return responseObj = constants.defaultFailedResponse
    }
}

module.exports.getAllUsers = async (serviceData) => {
    let responseObj = {}
    try{
        let data = {
            query:{},
            model: User,
            excludeFileds:'-password -__v' 
        }
        if(serviceData.skip && serviceData.limit){
            data.pagination= {
                skip:parseInt(serviceData.skip),
                limit:parseInt(serviceData.limit)
            };
        } else {
            data.pagination={};
        }
        let responseFromDatabase = await crudRepository.find(data)
        switch(responseFromDatabase.status) {
            case constants.databaseStatus.ENTITY_FETCHED:
                responseObj.body = responseFromDatabase.result
                responseObj.status = constants.serviceStatus.USER_LIST_FETCHED_SUCCESSFULLY
                break
            default:
                responseObj = constants.responseObj
                break
        }
        return responseObj
    }catch(err) {
        console.log('Something went wrong: Service: get user:', err)
        return responseObj = constants.defaultFailedResponse
    }
}

module.exports.getUserDetails = async (serviceData) => {
    let responseObj = {}
    try{
        let data = {
            query:{
                _id : mongoose.Types.ObjectId(serviceData.userId)
            },
            model: User,
            excludeFileds:'-password -__v' 
        }
        let responseFromDatabase = await crudRepository.find(data)
        switch(responseFromDatabase.status) {
            case constants.databaseStatus.ENTITY_FETCHED:
                responseObj.body = responseFromDatabase.result
                responseObj.status = constants.serviceStatus.USER_DETAILS_FETCHED_SUCCESSFULLY
                break
            default:
                responseObj = constants.responseObj
                break
        }
        return responseObj
    }catch(err) {
        console.log('Something went wrong: Service: get user:', err)
        return responseObj = constants.defaultFailedResponse
    }
}

module.exports.updateUser = async (serviceData) => {
    let responseObj = {}
    try{
        let data = {
            findQuery: {
                _id: mongoose.Types.ObjectId(serviceData.userId)
            },
            model: User,
            excludeFileds:'-password -__v',
            updateQuery: {}
        }
        if(serviceData.name) {
            data.updateQuery.name = serviceData.name
        }
        if(serviceData.password) {
            data.updateQuery.password = serviceData.password
        }
        if(serviceData.phone) {
            data.updateQuery.phone = serviceData.phone
        }
        let responseFromDatabase = await crudRepository.findOneAndUpdate(data)
        switch(responseFromDatabase.status) {
            case constants.databaseStatus.ENTITY_MODIFIED:
                responseObj.body = responseFromDatabase.result
                responseObj.status = constants.serviceStatus.USER_UPDATED_SUCCESSFULLY
                break
            default:
                responseObj = constants.responseObj
                break
        }
        return responseObj
    }catch(err) {
        console.log('Something went wrong: Service: update user:', err)
        return responseObj = constants.defaultFailedResponse
    }
}

