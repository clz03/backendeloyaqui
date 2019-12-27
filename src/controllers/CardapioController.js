const Cardapio = require('../model/Cardapio');

module.exports = {

    async index(req, res){

        const returnGet = await Cardapio.find().populate('idestabelecimento');
        return res.json(returnGet)
    },

    async show(req, res){
        const returnShow = await Cardapio.find({ _id: req.params.id });
        return res.json(returnShow)
    },

    async showbyestab(req, res){
        const returnShow = await Cardapio.find({ idestabelecimento: req.params.idestabelecimento });
        return res.json(returnShow)
    },

    async update(req, res){
        const returnUpdate = await Cardapio.updateOne({ _id: req.params.id },req.body);
        return res.json(returnUpdate)
    },

    async delete(req, res){
        const returnDel = await Cardapio.deleteOne({ _id: req.params.id });
        return res.json(returnDel)
    },

    store(req, res) {
        const { categoria, item, descr,valor, idestabelecimento } = req.body;

        const returnPost = Cardapio.create({
            categoria,
            item,
            descr,
            valor,
            idestabelecimento
        });

        return res.json(returnPost);
    },

};