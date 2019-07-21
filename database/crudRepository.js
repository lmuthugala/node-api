const mongoose = require('mongoose');
const constants = require('../constants/constancts')

module.exports.createConnection = () => {
    return new Promise((resolve,reject) => {
      let responseObject = {};
      mongoose.connect(process.env.DB_URL || "mongodb://localhost/myapidb",{useNewUrlParser: true},(err) => {
        if(err){
            responseObject.status = constants.databaseStatus.DATABASE_ERROR;
            console.log("DB Connection Status - ",responseObject);
            return reject(responseObject)
        } else {
            responseObject.status = constants.databaseStatus.DATABASE_CONNECTED;
            console.log("DB Connection Status - ",responseObject);
            return resolve(responseObject)
        }
      })
    })
}

module.exports.dataInsert = (data) => {
    return new Promise((resolve,reject) => {
        try {
            data.model.save().then(docs => {
                resolve({
                    result:docs,
                    status: constants.databaseStatus.ENTITY_CREATED
                })
            }).catch(error => {
                reject({
                    error:error.message,
                    status: constants.databaseStatus.DATABASE_ERROR
                })
            })
        } catch(error) {
            reject({
                error:error.message,
                status: constants.databaseStatus.DATABASE_ERROR
            })
            console.log('Something went Wrong : CruDRepository : Insert Data', error);
        } 
    })
} 

module.exports.find = (data) => {
    return new Promise((resolve,reject) => {
        try {
            data.model.find(data.query,data.excludeFileds,data.pagination).then((docs)=>{
                //success
                resolve({
                    result:docs,
                    status:constants.databaseStatus.ENTITY_FETCHED
                })
            }).catch((error)=>{
                //error
                reject({
                    error:error.message,
                    status:constants.serviceStatus.databaseStatus.DATABASE_ERROR
                })
            })
        } catch(error) {
            reject({
                error:error.message,
                status: constants.databaseStatus.DATABASE_ERROR
            })
            console.log('Something went Wrong : CruDRepository : find', error);
        }
    });
} 

module.exports.findOneAndUpdate = (data) => {
    return new Promise((resolve, reject) => {
        try {
            data.model.findOneAndUpdate(data.findQuery, data.updateQuery).then(docs => {
                //success
                resolve({
                    result: docs,
                    status: constants.databaseStatus.ENTITY_MODIFIED
                })
            }).catch(err => {
                //error
                reject({
                    error: err.message,
                    status: constants.databaseStatus.DATABASE_ERROR
                })
            })
        }catch(err) {
            console.log('Something went wrong: CrudRepository: findOneAndUpdate', err)
        }
    })
}
