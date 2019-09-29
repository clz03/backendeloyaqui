const { Schema, model} = require('mongoose');

const CupomSchema = new Schema({
    validade: {
        type: Date,
        required: true
    },
    premio: {
        type: String,
        required: true
    },
    expirado: {
        type: Boolean
    },
    idestabelecimento: {
        type: Schema.Types.ObjectId,
        ref: 'Estabelecimento'
    }
    
}, {
    timestamps: true
});

module.exports = model('Cupom', CupomSchema);
