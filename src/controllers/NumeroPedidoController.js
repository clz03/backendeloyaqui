const NumeroPedido = require('../model/NumeroPedido');

module.exports = {

    async index(req, res){

        const returnGet = await NumeroPedido.find();
        return res.json(returnGet)
    },

    async show(req, res){
        const returnShow = await NumeroPedido.find({ _id: req.params.id });
        return res.json(returnShow)
    },

    async update(req, res){
        const returnUpdate = await NumeroPedido.updateOne({ _id: req.params.id },req.body);
        return res.json(returnUpdate)
    },

    async delete(req, res){
        const returnDel = await NumeroPedido.deleteOne({ _id: req.params.id });
        return res.json(returnDel)
    },

    store(req, res) {
        const { _id, seq } = req.body;

        const returnPost = NumeroPedido.create({
            _id, seq
        });

        return res.json(returnPost);
    },

    

};