const { Schema, model} = require('mongoose');

const UsuarioSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    },
    validado: {
        type: Boolean,
        required: true
    },
    nome: {
        type: String
    },
    telefone: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = model('Usuario', UsuarioSchema);