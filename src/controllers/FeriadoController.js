const Feriado = require('../model/Feriado');

module.exports = {

    async index(req, res){
        const returnGet = await Feriado.find();
        return res.json(returnGet)
    },

    async show(req, res){
        const returnShow = await Feriado.find({ _id: req.params.id });
        return res.json(returnShow)
    },

    async update(req, res){
        const returnUpdate = await Feriado.updateOne({ _id: req.params.id },req.body);
        return res.json(returnUpdate)
    },

    async delete(req, res){
        const returnDel = await Feriado.deleteOne({ _id: req.params.id });
        return res.json(returnDel)
    },

    store(req, res) {
        const { data } = req.body;

        const returnPost = Feriado.create({
            data
        });

        return res.json(returnPost);
    },

};