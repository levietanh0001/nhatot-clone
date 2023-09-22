const errorsService = require('../controllers/errors.controller');
let io;

module.exports = {
  init: function (server, options) {
    io = require('socket.io')(server, options);
    return io;
  },
  getIO: function () {
    if (!io) {
      errorsService.throwError(500, 'Socket Error', 'socket.io is not connected');
    }
  }
}