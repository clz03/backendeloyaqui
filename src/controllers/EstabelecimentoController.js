const Estabelecimento = require('../model/Estabelecimento');

module.exports = {

    async index(req, res){

        const returnGet = await Estabelecimento.find();
        return res.json(returnGet)
    },

    store(req, res) {

        const { nome, descr, imagemcapa, rua, numero, bairro, cep, fone1, fone2, email, facebook, instagram, whatsapp, idcategoria } = req.body;

        const returnPost = Estabelecimento.create({
            nome, 
            descr, 
            imagemcapa, 
            rua, 
            numero, 
            bairro, 
            cep, 
            fone1, 
            fone2, 
            email, 
            facebook, 
            instagram, 
            whatsapp, 
            idcategoria
        });

        return res.json(returnPost);
    }
};
