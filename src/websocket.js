const socketio = require('socket.io');

const connections = [];
let io;

exports.setupWebsocket = (server) => {
    io = socketio(server);

    io.on('connection', socket => {
      const { idestab, idusuario } = socket.handshake.query;

        //gravar idestab no campo sockedid do Estabelecimento
        //gravar idusuario no campo sockedid do Usuario

        //1 - procura por ID
        //2 - PUT com o socketid

        connections.push({
            id: socket.id,
            idestab: idestab,
            idusuario: idusuario
        });
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
        //console.log(connection.id);
        io.to(connection.id).emit(message,data);
    });
}