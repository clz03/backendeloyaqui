const Cupom = require('../model/Cupom');

module.exports = {

    async index(req, res){

        const returnGet = await Cupom.find();
        return res.json(returnGet)
    },

    async show(req, res){
        const returnShow = await Cupom.find({ _id: req.params.id });
        return res.json(returnShow)
    },

    async update(req, res){
        const returnUpdate = await Cupom.updateOne({ _id: req.params.id },req.body);
        return res.json(returnUpdate)
    },

    async delete(req, res){
        const returnDel = await Cupom.deleteOne({ _id: req.params.id });
        return res.json(returnDel)
    },


    store(req, res) {

        const { validade, premio, expirado, idestabelecimento  } = req.body;

        const returnPost = Cupom.create({
            validade,
            premio,
            expirado,
            idestabelecimento
        });

        return res.json(returnPost);
    }
};