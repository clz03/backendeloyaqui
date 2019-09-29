const Produto = require('../model/Produto');

module.exports = {

    async index(req, res){

        const returnGet = await Produto.find();
        return res.json(returnGet)
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
