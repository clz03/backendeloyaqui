const Cupom = require('../model/Cupom');

module.exports = {

    async index(req, res){
        const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
        const page = req.query.page ? parseInt(req.query.page) : 1;
        var totalCount = 0;

        totalCount = await Cupom.countDocuments();

        const returnGet = await Cupom.find().populate('idestabelecimento')
        .skip((page -1) * pagination)
        .limit(pagination)
        .sort({data: -1});

        var result = {
            "totalRecords" : totalCount,
            "result": returnGet
        };
        
        return res.json(result)
    },

    async showAll(req, res){
        const returnShow = await Cupom.find();
        return res.json(returnShow)
    },

    async show(req, res){
        const returnShow = await Cupom.find({ _id: req.params.id }).populate('idestabelecimento');
        return res.json(returnShow)
    },

    async showbyestab(req, res){
        const returnShow = await Cupom.find({ idestabelecimento: req.params.id });
        return res.json(returnShow)
    },

    async update(req, res){
        const returnUpdate = await Cupom.updateOne({ _id: req.params.id },req.body);
        return res.json(returnUpdate)
    },

    async delete(req, res){
        const returnDel = await Cupom.deleteOne({ _id: req.params.id });
        return res.json(returnDel)
    },


    store(req, res) {

        const { validade, premio, regra, expirado, idestabelecimento  } = req.body;

        const returnPost = Cupom.create({
            validade,
            premio,
            regra,
            expirado,
            idestabelecimento
        });

        return res.json(returnPost);
    }
};