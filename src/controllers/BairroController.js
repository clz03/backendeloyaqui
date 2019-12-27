const Bairro = require('../model/Bairro');

module.exports = {

    async index(req, res){
        const returnGet = await Bairro.find();
        return res.json(returnGet)
    },

    async show(req, res){
        const returnShow = await Bairro.find({ _id: req.params.id });
        return res.json(returnShow)
    },

    async update(req, res){
        const returnUpdate = await Bairro.updateOne({ _id: req.params.id },req.body);
        return res.json(returnUpdate)
    },

    async delete(req, res){
        const returnDel = await Bairro.deleteOne({ _id: req.params.id });
        return res.json(returnDel)
    },

    store(req, res) {
        const { identificacao, nome } = req.body;

        const returnPost = Bairro.create({
            identificacao,
            nome
        });

        return res.json(returnPost);
    },

};