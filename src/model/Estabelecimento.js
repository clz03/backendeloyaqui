const { Schema, model} = require('mongoose');

const EstabelecimentoSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    descr: {
        type: String,
        required: true
    },
    imagemcapa: {
        type: String
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
    fone1: {
        type: String,
        required: true
    },
    fone2: {
        type: String
    },
    email: {
        type: String
    },
    facebook: {
        type: String
    },
    instagram: {
        type: String
    },
    whatsapp: {
        type: String
    },    
    idcategoria: [{
        type: Schema.Types.ObjectId,
        ref: 'Categoria'
    }]
    
}, {
    timestamps: true
});

module.exports = model('Estabelecimento', EstabelecimentoSchema);
