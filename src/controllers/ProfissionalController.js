const Profissional = require('../model/Profissional');

module.exports = {

    async index(req, res){

        const returnGet = await Profissional.find();
        return res.json(returnGet)
    },

    async show(req, res){
        const returnShow = await Profissional.find({ _id: req.params.id });
        return res.json(returnShow)
    },

    async showbyestab(req, res){
        const returnShow = await Profissional.find({ idestabelecimento: req.params.id });
        return res.json(returnShow)
    },

    async update(req, res){
        const returnUpdate = await Profissional.updateOne({ _id: req.params.id },req.body);
        return res.json(returnUpdate)
    },

    async delete(req, res){
        const returnDel = await Profissional.deleteOne({ _id: req.params.id });
        return res.json(returnDel)
    },

    store(req, res) {
        const { nome, hrinicio, hrfim, diasemana, idestabelecimento } = req.body;

        const returnPost = Profissional.create({
            nome,
            hrinicio, 
            hrfim, 
            diasemana,
            idestabelecimento
        });

        return res.json(returnPost);
    },

};