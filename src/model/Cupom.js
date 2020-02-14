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
    regra: {
        type: String
    },
    expirado: {
        type: Boolean
    },
    utilizado: {
        type: Boolean,
        default: false
    },
    idestabelecimento: {
        type: Schema.Types.ObjectId,
        ref: 'Estabelecimento'
    }
    
}, {
    timestamps: true
});

module.exports = model('Cupom', CupomSchema);
