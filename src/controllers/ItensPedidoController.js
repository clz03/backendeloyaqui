const ItemPedido = require('../model/ItensPedido');

module.exports = {

    async index(req, res){
        const returnGet = await ItemPedido.find();
        return res.json(returnGet)
    },

    async show(req, res){
        const returnShow = await ItemPedido.find({ _id: req.params.id });
        return res.json(returnShow)
    },

    async showbyorder(req, res){
        const returnShow = await ItemPedido.find({ idpedido: req.params.id });
        return res.json(returnShow)
    },

    async update(req, res){
        const returnUpdate = await ItemPedido.updateOne({ _id: req.params.id },req.body);
        return res.json(returnUpdate)
    },

    async delete(req, res){
        const returnDel = await ItemPedido.deleteOne({ _id: req.params.id });
        return res.json(returnDel)
    },

    store(req, res) {
        const { item, valorun, valortotal, qtde, obs, idpedido } = req.body;

        const returnPost = ItemPedido.create({
            item, 
            // descr, 
            valorun,
            valortotal,
            qtde, 
            obs,
            idpedido
        });

        return res.json(returnPost);
    },

};