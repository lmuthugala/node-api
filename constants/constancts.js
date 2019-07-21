module.exports = {
    databaseStatus : {
        ENTITY_CREATED : "Entity Created",
        ENTITY_MODIFIED : "Entity Modified",
        ENTITY_FETCHED : "Entity Fetched",
        ENTITY_DELETED : "Entity Deleted",
        DATABASE_CONNECTED: "Database Connected Successfully",
        DATABASE_ERROR: "Database Error"
    },
    controllerStatus: {
        BAD_REQUEST: 'Required Fields Are Missing',
        NO_CONTENT: 'No Content To Display',
        INTERNAL_SERVER_ERROR : "Server Error Occoured"
    },
    serviceStatus : {
        USER_CREATED_SUCCESSFULLY : "User Created Successfully",
        USER_LIST_FETCHED_SUCCESSFULLY : "Userlist Fetched Successfully",
        USER_DETAILS_FETCHED_SUCCESSFULLY : "User Details Fetched Successfully",
        USER_UPDATED_SUCCESSFULLY : "User Details updated Successfully" 
    },
    defaultFailedResponse : {
        msg:"Something Went Wrong",
        status:500
    }
}