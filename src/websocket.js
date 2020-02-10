const socketio = require('socket.io');

const connections = [];
let io;

exports.setupWebsocket = (server) => {
    io = socketio(server);

    io.on('connection', socket => {
      const { idestab, idusuario } = socket.handshake.query;

        connections.push({
            id: socket.id,
            idestab: idestab,
            idusuario: idusuario
        });
        console.log(idusuario);
        console.log(socket.id);
    });
};

exports.findConnections = (idestab) => {
    return connections.filter(connection => {
        return idestab === connection.idestab
    })
};

exports.findConnectionsUser = (idusuario) => {
    return connections.filter(connection => {
        return idusuario === connection.idusuario
    })
};

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message,data);
    });
}