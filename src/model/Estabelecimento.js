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
    complemento: {
        type: String
    },
    fone1: {
        type: String,
        required: true
    },
    fone2: {
        type: String
    },
    agendamento: {
        type: Boolean,
        require: true,
        default: false
    },
    cardapio: {
        type: Boolean,
        default: false
    },
    delivery: {
        type: Boolean,
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
    hrfim_domingo: {
        type: Number
    },
    pedidominimo: {
        type: Number,
        default: 0
    },
    taxaentrega: {
        type: Number,
        default: 0
    },
    tempoentrega: {
        type: Number,
        default: 0
    },
    temporetira: {
        type: Number,
        default: 0
    },
    entrega: {
        type: Boolean,
        default: false
    },
    retira: {
        type: Boolean,
        default: false
    },
    views: {
        type: Number,
        default: 1
    },
    online: {
        type: Boolean
    },
    idcategoria: [{
        type: Schema.Types.ObjectId,
        ref: 'Categoria'
    }]
    
}, {
    timestamps: true
});

module.exports = model('Estabelecimento', EstabelecimentoSchema);
