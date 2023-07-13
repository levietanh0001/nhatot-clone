

function handle404(req, res, next) {
  throwError(404, 'Page Not Found', 'This page does not exist');
}


function throwError(statusCode, name, message) {
  const error = new Error(message);
  error.name = name;
  error.code = statusCode;
  throw error;
}


function passErrorToHandler(error, next) {
  return next(error);
}


function errorHandler(error, req, res, next) {

  const statusCode = error.code || 500; // if no status code, defaults to 500 (server side error)

  res
    .status(statusCode)
    .json({
      statusCode: error.code,
      error: error.name,
      message: error.message,
    });

  return next(); // continue regardless
}


module.exports = {
  handle404,
  throwError,
  passErrorToHandler,
  errorHandler
}