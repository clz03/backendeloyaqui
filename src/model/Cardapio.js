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
    idestabelecimento: {
        type: Schema.Types.ObjectId,
        ref: 'Estabelecimento'
    }
}, {
    timestamps: true
});

module.exports = model('Cardapio', CardapioSchema);