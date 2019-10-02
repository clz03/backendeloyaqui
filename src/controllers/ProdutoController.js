const Produto = require('../model/Produto');

module.exports = {

    async index(req, res){

        const returnGet = await Produto.find();
        return res.json(returnGet)
    },

    async show(req, res){
        const returnShow = await Produto.find({ _id: req.params.id });
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
            numero, 
            promocao, 
            idestabelecimento
        });

        return res.json(returnPost);
    }
};
