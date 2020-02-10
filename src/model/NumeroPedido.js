const { Schema, model} = require('mongoose');

const NumeroPedidoSchema = new Schema({
    _id: {
        type: String, 
        required: true
    },
    seq: { 
        type: Number, 
        default: 1 
    }
});

module.exports = model('NumeroPedido', NumeroPedidoSchema);