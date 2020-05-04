const { Schema, model} = require('mongoose');

const FeriadoSchema = new Schema({
    data: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model('Feriado', FeriadoSchema);