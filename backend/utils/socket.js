const errorsService = require('../services/errors');
let io;

module.exports = {
    init: function(httpServer) {
        io = require('socket.io')(httpServer);
        return io;
    },
    getIO: function() {
        if(!io) {
            errorsService.throwError(500, 'Socket Error', 'socket.io is not connected');
        }
    }
}