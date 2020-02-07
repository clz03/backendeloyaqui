const socketio = require('socket.io');

const connections = [];
let io;

exports.setupWebsocket = (server) => {
    io = socketio(server);

    io.on('connection', socket => {
      const { idestab } = socket.handshake.query;

        connections.push({
            id: socket.id,
            idestab: idestab
        });
        console.log(socket.id);
    });
};

exports.findConnections = (idestab) => {
    return connections.filter(connection => {
        return idestab === connection.idestab
    })
};

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message,data);
    });
}