const Produto = require('../model/Produto');

module.exports = {

    async index(req, res){

        const returnGet = await Produto.find().populate('idestabelecimento');;
        return res.json(returnGet)
    },

    async show(req, res){
        const returnShow = await Produto.find({ _id: req.params.id }).populate('idestabelecimento');;
        return res.json(returnShow)
    },

    async showbyestab(req, res){
        const returnShow = await Produto.find({ idestabelecimento: req.params.idestabelecimento });
        return res.json(returnShow)
    },

    async update(req, res){
        const returnUpdate = await Produto.updateOne({ _id: req.params.id },req.body);
        return res.json(returnUpdate)
    },

    async delete(req, res){
        const returnDel = await Produto.deleteOne({ _id: req.params.id });
        return res.json(returnDel)
    },

    store(req, res) {

        const { nome, descr, preco, imagem, promocao, idestabelecimento } = req.body;

        const returnPost = Produto.create({
            nome, 
            descr, 
            preco, 
            imagem, 
            promocao, 
            idestabelecimento
        });

        return res.json(returnPost);
    }
};
