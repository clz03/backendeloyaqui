const Categoria = require('../model/Categoria');
//const { showConnections } = require('../websocket')

module.exports = {

    async index(req, res){

        const returnGet = await Categoria.find();
        //showConnections();
        return res.json(returnGet)
    },

    async show(req, res){
        const returnShow = await Categoria.find({ _id: req.params.id });
        return res.json(returnShow)
    },

    async update(req, res){
        const returnUpdate = await Categoria.updateOne({ _id: req.params.id },req.body);
        return res.json(returnUpdate)
    },

    async delete(req, res){
        const returnDel = await Categoria.deleteOne({ _id: req.params.id });
        return res.json(returnDel)
    },

    store(req, res) {
        const { nome, icon, color } = req.body;

        const returnPost = Categoria.create({
            nome,
            icon,
            color
        });

        return res.json(returnPost);
    },

};