const TelUtil = require('../model/TelUtil');

module.exports = {

    async index(req, res){

        const returnGet = await TelUtil.find();
        return res.json(returnGet)
    },

    async show(req, res){
        const returnShow = await TelUtil.find({ _id: req.params.id });
        return res.json(returnShow)
    },

    async update(req, res){
        const returnUpdate = await TelUtil.updateOne({ _id: req.params.id },req.body);
        return res.json(returnUpdate)
    },

    async delete(req, res){
        const returnDel = await TelUtil.deleteOne({ _id: req.params.id });
        return res.json(returnDel)
    },

    store(req, res) {
        const { nome, telefone, categoria } = req.body;

        const returnPost = TelUtil.create({
            nome,
            telefone,
            categoria
        });

        return res.json(returnPost);
    },

};