exports.codes = {

    successCodes: {
        ok: 200,  // For GET 
        created: 201, // For POST
        requested: 202, // Accepted 
        noContent: 204 // For Delete
    },

    clientErrorCodes: {
        badRequest: 400, 
        unAuthorized: 401, // Given credentials  were  invalid
        forbidden: 403, //  The  server  understood  the  request  but  refuses  to  authorize  it
        notFound: 404,
        methodNotAllowed: 405,
        notAcceptable: 406, 
        conflicts: 409,
        invalidData: 422,
        requestTimeOut: 408
    },

    serverErrorCodes: {
        internalServerError: 500,
        notImplemented: 501,
        badGateway: 502
    }
}