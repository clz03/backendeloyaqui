const { Schema, model} = require('mongoose');

const ItensPedidoSchema = new Schema({
    item: {
        type: String,
        required: true
    },
    descr: {
        type: String,
        required: true
    },
    valorun: {
        type: Number,
        required: true
    },
    valortotal: {
        type: Number,
        required: true
    },
    qtde: {
        type: Number,
        required: true
    },
    idpedido: {
        type: Schema.Types.ObjectId,
        ref: 'Pedido'
    }
}, {
    timestamps: true
});

module.exports = model('ItensPedido', ItensPedidoSchema);