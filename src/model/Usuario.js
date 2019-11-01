const { Schema, model} = require('mongoose');

const UsuarioSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    nome: {
        type: String
    },
    tipo: {
        type: String
    },
    idestabelecimento: {
        type: Schema.Types.ObjectId,
        ref: 'Estabelecimento'
    }
}, {
    timestamps: true
});

module.exports = model('Usuario', UsuarioSchema);