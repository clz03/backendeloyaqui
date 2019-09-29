const Cupom = require('../model/Cupom');

module.exports = {

    async index(req, res){

        const returnGet = await Cupom.find();
        return res.json(returnGet)
    },

    store(req, res) {

        const { nome, icon } = req.body;

        const returnPost = Cupom.create({
            validade,
            premio,
            expirado,
            idestabelecimento
        });

        return res.json(returnPost);
    }
};