function returnError(res, statusCode, error) {
  return res.status(statusCode || 500).json({
    error: error
  });
}

module.exports = {
  returnError
}