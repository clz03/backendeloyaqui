const { Schema, model} = require('mongoose');

const TelUtilSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model('TelUtil', TelUtilSchema);