const Servico = require('../model/Servico');

module.exports = {

    async index(req, res){

        const returnGet = await Servico.find();
        return res.json(returnGet)
    },

    async show(req, res){
        const returnShow = await Servico.find({ _id: req.params.id });
        return res.json(returnShow)
    },

    async showbyestab(req, res){
        const returnShow = await Servico.find({ idestabelecimento: req.params.id })
        .populate('idprofissional');
        return res.json(returnShow)
    },

    async showbyprof(req, res){
        const returnShow = await Servico.find({ idprofissional: req.params.id });
        return res.json(returnShow)
    },

    async update(req, res){
        const returnUpdate = await Servico.updateOne({ _id: req.params.id },req.body);
        return res.json(returnUpdate)
    },

    async delete(req, res){
        const returnDel = await Servico.deleteOne({ _id: req.params.id });
        return res.json(returnDel)
    },


    store(req, res) {

        const { nome, descr, preco, idestabelecimento, idprofissional } = req.body;

        const returnPost = Servico.create({
            nome, 
            descr,
            preco, 
            idestabelecimento,
            idprofissional
        });

        return res.json(returnPost);
    }
};

