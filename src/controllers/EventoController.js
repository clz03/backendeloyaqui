const Evento = require('../model/Evento');

module.exports = {

    async index(req, res){

        const returnGet = await Evento.find();
        return res.json(returnGet)
    },

    async show(req, res){
        const returnShow = await Evento.find({ _id: req.params.id });
        return res.json(returnShow)
    },

    async update(req, res){
        const returnUpdate = await Evento.updateOne({ _id: req.params.id },req.body);
        return res.json(returnUpdate)
    },

    async delete(req, res){
        const returnDel = await Evento.deleteOne({ _id: req.params.id });
        return res.json(returnDel)
    },

    store(req, res) {
        const { start, end, title, summary, idestabelecimento } = req.body;

        const returnPost = Evento.create({
            start,
            end,
            title,
            summary,
            idestabelecimento
        });

        return res.json(returnPost);
    },

};