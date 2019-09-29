const { Schema, model} = require('mongoose');

const ProdutoSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    descr: {
        type: String,
        required: true
    },
    preco: {
        type: String,
        required: true
    },
    imagem: {
        type: String,
        required: true
    },
    promocao: {
        type: Boolean,
        required: true
    },
    idestabelecimento: {
        type: Schema.Types.ObjectId,
        ref: 'Estabelecimento'
    }
}, {
    timestamps: true
});

module.exports = model('Produto', ProdutoSchema);