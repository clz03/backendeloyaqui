const { Schema, model} = require('mongoose');

const EnderecoSchema = new Schema({
    apelido: {
        type: String,
        required: true
    },
    rua: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    bairro: {
        type: String,
        required: true
    },
    cep: {
        type: String,
        required: true
    },
    complemento: {
        type: String,
        required: true
    },
    idusuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, {
    timestamps: true
});

module.exports = model('Endereco', EnderecoSchema);