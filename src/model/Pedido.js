const { Schema, model} = require('mongoose');

const PedidoSchema = new Schema({
    data: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    taxaentrega: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    tipopag: {
        type: String,
        required: true
    },
    idestabelecimento: {
        type: Schema.Types.ObjectId,
        ref: 'Estabelecimento'
    },
    idusuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, {
    timestamps: true
});

module.exports = model('Pedido', PedidoSchema);