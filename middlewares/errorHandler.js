const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err,req,res,next)=>{
    let error = {...err}
    error.message = err.message

    // console.log(err)
    if(err.code==11000){
        const message = `User already exist`;
        error = new ErrorResponse(message,400)
    }
    if(err.name ===`ValidationError`){
        console.log(Object.values(err.errors)[0].properties.message);
        const message = Object.values(err.errors)[0].properties.message;
        // const message = Object.values(err.errors).map(values=>{
        //     values.properties.message
        // });
        error = new ErrorResponse(message,400)
    }

    res.status(error.statusCode).json({
        success:false,
        error:error.message || "Server Error"
    })
}

module.exports = errorHandler;