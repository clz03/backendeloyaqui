const Noticia = require('../model/Noticia');

module.exports = {

    async index(req, res){
        const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
        const page = req.query.page ? parseInt(req.query.page) : 1;

        const returnGet = await Noticia.find()
        .skip((page -1) * pagination)
        .limit(pagination)
        .sort({data: -1})
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

        const { titulo, descr, data, imagem } = req.body;

        const returnPost = Noticia.create({
            titulo,
            descr,
            data,
            imagem
        });

        return res.json(returnPost);
    }
};