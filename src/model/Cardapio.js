const { Schema, model} = require('mongoose');

const CardapioSchema = new Schema({
    categoria: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    descr: {
        type: String
    },
    valor: {
        type: String,
        required: true
    },
    tseg: {
        type: Boolean,
        required: true,
        default: true
    },
    tter: {
        type: Boolean,
        required: true,
        default: true
    },
    tqua: {
        type: Boolean,
        required: true,
        default: true
    },
    tqui: {
        type: Boolean,
        required: true,
        default: true
    },
    tsex: {
        type: Boolean,
        required: true,
        default: true
    },
    tsab: {
        type: Boolean,
        required: true,
        default: true
    },
    tdom: {
        type: Boolean,
        required: true,
        default: true
    },
    compl1: {
        type: String
    },
    compl2: {
        type: String
    },
    compl3: {
        type: String
    },
    idestabelecimento: {
        type: Schema.Types.ObjectId,
        ref: 'Estabelecimento'
    }
}, {
    timestamps: true
});

module.exports = model('Cardapio', CardapioSchema);