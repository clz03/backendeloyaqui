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
    tipo: {
        type: String,
        required: true
    },
    subtipo: {
        type: String,
        required: false
    },
    imagem: {
        type: String
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
    pedonline: {
        type: Boolean,
        require: true,
        default: false
    },
    plano: {
        type: Number,
        require: true,
        default: 0
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
    hrinicio_semana: {
        type: Number
    },
    hrfim_semana: {
        type: Number
    },
    hrinicio_sabado: {
        type: Number
    },
    hrfim_sabado: {
        type: Number
    },
    hrinicio_domingo: {
        type: Number
    },
    hrfrim_domingo: {
        type: Number
    },
    idcategoria: [{
        type: Schema.Types.ObjectId,
        ref: 'Categoria'
    }]
    
}, {
    timestamps: true
});

module.exports = model('Estabelecimento', EstabelecimentoSchema);
