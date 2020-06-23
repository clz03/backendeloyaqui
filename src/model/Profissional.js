const { Schema, model} = require('mongoose');

const ProfissionalSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    hrinicio: {
        type: String,
        required: true
    },
    hrfim: {
        type: String,
        required: true
    },
    diasemana: {
        type: Array,
        required: true
    },
    idestabelecimento: {
        type: Schema.Types.ObjectId,
        ref: 'Estabelecimento'
    }
}, {
    timestamps: true
});

module.exports = model('Profissional', ProfissionalSchema);