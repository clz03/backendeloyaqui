const { Schema, model} = require('mongoose');

const CategoriaSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model('Categoria', CategoriaSchema);