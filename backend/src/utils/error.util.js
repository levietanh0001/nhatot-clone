function returnError(res, statusCode, error) {
  return res.status(statusCode || 500).json({ ...error });
}

module.exports = {
  returnError
}