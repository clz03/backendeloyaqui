const { Schema, model} = require('mongoose');

const UsuarioSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    nome: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = model('Usuario', UsuarioSchema);