

function handle404(req, res, next) {
    throwError(404, 'Page Not Found', 'This page does not exist');
}


function throwError(statusCode, name, message) {
    const error = new Error(message);
    error.name = name;
    error.statusCode = statusCode;
    throw error;
}


function passErrorToHandler(error, statusCode, next) {
    error.statusCode = statusCode;
    return next(error);
}


function errorHandler(error, req, res, next) {

    console.error(error);

    const statusCode = error.statusCode || 500; // if no status code, defaults to 500 (server side error)

    res
        .status(statusCode)
        .json({
            statusCode: statusCode,
            error: error.name,
            message: error.message
        });
        
    return next(); // continue regardless
}


module.exports = {
    handle404, 
    throwError,
    passErrorToHandler,
    errorHandler
}