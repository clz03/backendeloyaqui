const Estabelecimento = require('../model/Estabelecimento');

module.exports = {

    async index(req, res){

        const returnGet = await Estabelecimento.find();
        return res.json(returnGet)
    },

    async show(req, res){
        const returnShow = await Estabelecimento.find({ _id: req.params.id });
        return res.json(returnShow)
    },

    async show(req, res){
        const returnShow = await Estabelecimento.find({ _id: req.params.id });
        return res.json(returnShow)
    },

    async update(req, res){
        const returnUpdate = await Estabelecimento.updateOne({ _id: req.params.id },req.body);
        return res.json(returnUpdate)
    },

    async delete(req, res){
        const returnDel = await Estabelecimento.deleteOne({ _id: req.params.id });
        return res.json(returnDel)
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
