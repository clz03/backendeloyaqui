const { Schema, model} = require('mongoose');

const EventoSchema = new Schema({
    data: {
        type: Date,
        required: true
    },
    hora: {
        type: Number,
        required: true
    },
    comentario: {
        type: String,
        required: true
    },
    idestabelecimento: {
        type: Schema.Types.ObjectId,
        ref: 'Estabelecimento'
    },
    idservico: {
        type: Schema.Types.ObjectId,
        ref: 'Servico'
    },
    idprofissional: {
        type: Schema.Types.ObjectId,
        ref: 'Profissional'
    },
    idusuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, {
    timestamps: true
});

module.exports = model('Evento', EventoSchema);



