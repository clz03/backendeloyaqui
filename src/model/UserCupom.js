const { Schema, model} = require('mongoose');

const UserCupomSchema = new Schema({
    idusuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    idcupom: {
        type: Schema.Types.ObjectId,
        ref: 'Cupom'
    },
    utilizado: {
        type: Boolean
    }
}, {
    timestamps: true
});

module.exports = model('UserCupom', UserCupomSchema);
