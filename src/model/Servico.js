const { Schema, model} = require('mongoose');

const ServicoSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    descr: {
        type: String,
        required: true
    },
    preco: {
        type: String
    },
    imagem: {
        type: String
    },
    promocao: {
        type: Boolean
    },
    diasemana: {
        type: Number,
        required: true
    },
    hrinicio: {
        type: String,
        required: true
    },
    hrfim: {
        type: String,
        required: true
    },
    idestabelecimento: {
        type: Schema.Types.ObjectId,
        ref: 'Estabelecimento'
    }
}, {
    timestamps: true
});

module.exports = model('Servico', ServicoSchema);