const Feriado = require('../model/Feriado');
const Estabelecimento = require('../model/Estabelecimento');

module.exports = {

    async index(req, res){
        const returnGet = await Feriado.find();
        return res.json(returnGet)
    },

    async showByEstabFlag(req, res){
        var returnGet;
        const returnEstab = await Estabelecimento.findById({_id: req.params.idestabelecimento});

        if(returnEstab.enableFeriado){
            returnGet = {};
        } else {
            returnGet = await Feriado.find();
        };
        
        return res.json(returnGet)
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