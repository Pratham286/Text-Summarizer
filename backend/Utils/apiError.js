// class ApiError inherits Error class
class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message); // calling parent using super function
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        
        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export {ApiError};