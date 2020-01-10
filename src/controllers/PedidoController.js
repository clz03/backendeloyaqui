const Pedido = require('../model/Pedido');

module.exports = {

    async index(req, res){
        const returnGet = await Pedido.find();
        return res.json(returnGet)
    },

    async show(req, res){
        const returnShow = await Pedido.find({ _id: req.params.id });
        return res.json(returnShow)
    },

    async showbyuser(req, res){
        const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
        const page = req.query.page ? parseInt(req.query.page) : 1;
        var totalCount = 0;

        totalCount = await Pedido.countDocuments({ idusuario: req.params.id });

        const returnShow = await Pedido.countDocuments({ idusuario: req.params.id })
        .skip((page -1) * pagination)
        .limit(pagination);

        var result = {
            "totalRecords" : totalCount,
            "result": returnShow
        };
        
        return res.json(result)
    },

    async update(req, res){
        const returnUpdate = await Pedido.updateOne({ _id: req.params.id },req.body);
        return res.json(returnUpdate)
    },

    async delete(req, res){
        const returnDel = await Pedido.deleteOne({ _id: req.params.id });
        return res.json(returnDel)
    },

    store(req, res) {
        const { data, status, subtotal, taxaentrega, total, tipopag, tipoentrega, idestabelecimento, idusuario, idendereco } = req.body;

        const returnPost = Pedido.create({
            data, 
            status, 
            subtotal, 
            taxaentrega, 
            total, 
            tipopag, 
            tipoentrega,
            idestabelecimento, 
            idusuario,
            idendereco
        });

        return res.json(returnPost);
    },

};