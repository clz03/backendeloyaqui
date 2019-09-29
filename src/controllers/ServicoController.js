const Servico = require('../model/Servico');

module.exports = {

    async index(req, res){

        const returnGet = await Servico.find();
        return res.json(returnGet)
    },

    store(req, res) {

        const { nome, descr, preco, imagem, promocao, idestabelecimento } = req.body;

        const returnPost = Servico.create({
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
