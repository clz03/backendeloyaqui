const { Schema, model} = require('mongoose');

const TokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    idusuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    validade: {
        type: Date,
        required: true
    },
}, {
    timestamps: true
});

module.exports = model('Token', TokenSchema);