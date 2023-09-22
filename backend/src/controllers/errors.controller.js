

function handle404(req, res, next) {
  throwError(404, 'Page Not Found', 'This page does not exist');
}


function throwError(statusCode, name, message) {
  const error = new Error();
  error.message = message;
  error.name = name;
  error.status = statusCode;
  throw error;
}


function passErrorToHandler(error, next) {
  return next(error);
}


function errorHandler(error, req, res, next) {

  console.log({ ...error });

  const statusCode = error.status || 500; // if no status code, defaults to 500 (server side error)
  res.status(statusCode).json({ ...error });
  return next(); // continue to next handler
}


module.exports = {
  handle404,
  throwError,
  passErrorToHandler,
  errorHandler
}