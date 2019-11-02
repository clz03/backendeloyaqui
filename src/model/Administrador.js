const { Schema, model} = require('mongoose');

const AdministradorSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    },
    validado: {
        type: Boolean,
        required: true
    },
    // 0 = User Estabelecimento / 1= Master User
    tipo: {
        type: Number,
        required: true
    },
    nome: {
        type: String
    },
    idestabelecimento: {
        type: Schema.Types.ObjectId,
        ref: 'Estabelecimento'
    }
}, {
    timestamps: true
});

module.exports = model('Administrador', AdministradorSchema);