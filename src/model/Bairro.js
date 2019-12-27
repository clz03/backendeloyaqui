const { Schema, model} = require('mongoose');

const BairroSchema = new Schema({
    identificacao: {
        type: Number,
        required: true
    },
    nome: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model('Bairro', BairroSchema);