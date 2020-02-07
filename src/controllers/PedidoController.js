const Pedido = require('../model/Pedido');
const ItemPedido = require('../model/ItensPedido');
const { findConnections, sendMessage } = require('../websocket')

module.exports = {

    async index(req, res){
        const returnGet = await Pedido.find();
        return res.json(returnGet)
    },

    async show(req, res){
        const returnShow = await Pedido.find({ _id: req.params.id })
        .populate('idusuario');
        return res.json(returnShow)
    },

    async showbyestab(req, res){
        const returnShow = await Pedido.find({ idestabelecimento: req.params.estabid })
        .sort({data: -1})
        .limit(20);
        return res.json(returnShow)
    },

    async showbyuser(req, res){
        const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
        const page = req.query.page ? parseInt(req.query.page) : 1;
        var totalCount = 0;

        totalCount = await Pedido.countDocuments({ idusuario: req.params.id });

        const returnShow = await Pedido.find({ idusuario: req.params.id })
        .skip((page -1) * pagination)
        .limit(pagination)
        .populate('idestabelecimento','nome')
        .sort({data: -1});

        var result = {
            "totalRecords" : totalCount,
            "result": returnShow
        };
        
        return res.json(result)
    },

    async update(req, res){
        const returnUpdate = await Pedido.updateOne({ _id: req.params.id },req.body);

        const sendSocketMessageTo = findConnections(idestabelecimento);
        sendMessage(sendSocketMessageTo, 'status-ped', req.body);

        return res.json(returnUpdate)
    },

    async delete(req, res){
        const returnDel = await Pedido.deleteOne({ _id: req.params.id });
        return res.json(returnDel)
    },

   async store(req, res) {
        const { data, status, subtotal, taxaentrega, total, tipopag, tipoentrega, apelido, rua, numero, bairro, cep, complemento,idestabelecimento, idusuario } = req.body;

        const returnPost = await Pedido.create({
            data, 
            status, 
            subtotal, 
            taxaentrega, 
            total, 
            tipopag, 
            tipoentrega,
            apelido,
            rua,
            numero,
            bairro,
            cep,
            complemento,
            idestabelecimento, 
            idusuario
        });

        const { itensPed } = req.body;
        const order = await Pedido.findOne({ data, idusuario });

        itensPed.forEach(async function(item){
           await ItemPedido.create({
                item:item.item, 
                valorun: item.valorun,
                valortotal: item.valortotal,
                qtde: item.qtdy, 
                obs: item.obs,
                idpedido: order._id
            });            
        });

        const sendSocketMessageTo = findConnections(idestabelecimento);
        sendMessage(sendSocketMessageTo, 'novo-ped', status);

        return res.json(returnPost);
    },

};