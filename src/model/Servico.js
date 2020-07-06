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
    idestabelecimento: {
        type: Schema.Types.ObjectId,
        ref: 'Estabelecimento'
    },
    idprofissional: {
        type: Schema.Types.ObjectId,
        ref: 'Profissional'
    }
}, {
    timestamps: true
});

module.exports = model('Servico', ServicoSchema);