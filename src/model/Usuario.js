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
    admin: {
        type: Boolean,
        required: true,
        default: false
    },
    nome: {
        type: String
    },
    telefone: {
        type: String
    },
    pushToken: {
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