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

    async showbycat(req, res){
        const returnShow = await Estabelecimento.find({ idcategoria: req.params.id });
        return res.json(returnShow)
    },

    async showbysearch(req, res){
        const returnShow = await Estabelecimento.find({ nome: { $regex: '.*' + req.params.nome + '.*', $options: 'i' } });
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

        const { nome, descr, tipo, subtipo, imagemcapa, imagem, rua, numero, bairro, cep, fone1, fone2, pedonline, plano, email, facebook, instagram, whatsapp, idcategoria } = req.body;

        const returnPost = Estabelecimento.create({
            nome, 
            descr, 
            tipo,
            subtipo,
            imagem,
            imagemcapa, 
            rua, 
            numero, 
            bairro, 
            cep, 
            fone1, 
            fone2, 
            pedonline,
            plano,
            email, 
            facebook, 
            instagram, 
            whatsapp, 
            idcategoria
        });

        return res.json(returnPost);
    }
};
