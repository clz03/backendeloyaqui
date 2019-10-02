const Noticia = require('../model/Noticia');

module.exports = {

    async index(req, res){

        const returnGet = await Noticia.find();
        return res.json(returnGet)
    },

    async show(req, res){
        const returnShow = await Noticia.find({ _id: req.params.id });
        return res.json(returnShow)
    },

    async update(req, res){
        const returnUpdate = await Noticia.updateOne({ _id: req.params.id },req.body);
        return res.json(returnUpdate)
    },

    async delete(req, res){
        const returnDel = await Noticia.deleteOne({ _id: req.params.id });
        return res.json(returnDel)
    },


    store(req, res) {

        const { nome, descr, data, imagem } = req.body;

        const returnPost = Cupom.create({
            nome,
            descr,
            data,
            imagem
        });

        return res.json(returnPost);
    }
};