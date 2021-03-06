const Pedido = require('../model/Pedido');
const ItemPedido = require('../model/ItensPedido');
const NumeroPedido = require('../model/NumeroPedido');
const Usuario = require('../model/Usuario');
const axios = require('axios')
const { findConnections, findConnectionsUser ,sendMessage } = require('../websocket')

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
        .limit(40);
        return res.json(returnShow)
    },

    async showbyestabtoday(req, res){
        const today = new Date();
        today.setHours(0,0,0,0);
        
        const returnShow = await Pedido.find({ idestabelecimento: req.params.estabid, data: { "$gte": today } })
        .sort({data: -1});
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
        .populate('idestabelecimento','nome imagem')
        .sort({data: -1});

        var result = {
            "totalRecords" : totalCount,
            "result": returnShow
        };
        
        return res.json(result)
    },

    async update(req, res){

        const { idusuario } = req.body;
        const returnUpdate = await Pedido.updateOne({ _id: req.params.id },req.body);

        const pushUser = await Usuario.findOne({ _id: idusuario });

        //Envia reload para o mobile
        const sendSocketMessageTo = findConnectionsUser(idusuario);
        sendMessage(sendSocketMessageTo, 'status-ped', idusuario);

        if (pushUser.pushToken) {

            const headers = {
                host: 'exp.host',
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json'
            }

            const data = {
                "to": pushUser.pushToken,
                "sound": "default",
                "title":"Seu pedido foi atualizado",
                "body": "Estamos preparando seu pedido. Em breve sairá para entrega",
                "_displayInForeground": "true"
            }

            //Envia push notification para o mobile
            axios.post('https://exp.host/--/api/v2/push/send', data, {
                headers: headers
            })
        };

        return res.json(returnUpdate)
    },

    async delete(req, res){
        const returnDel = await Pedido.deleteOne({ _id: req.params.id });
        return res.json(returnDel)
    },

   async store(req, res) {
        const { data, status, subtotal, taxaentrega, total, tipopag, troco, tipoentrega, apelido, rua, numero, bairro, cep, complemento,idestabelecimento, idusuario } = req.body;

        const sequence = await NumeroPedido.findOneAndUpdate({ _id: 'entityID' }, { $inc: { seq: 1 } }, { new: true });
        const seq = sequence.seq;

        const returnPost = await Pedido.create({
            seq,
            data, 
            status, 
            subtotal, 
            taxaentrega, 
            total, 
            tipopag, 
            troco,
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

        const order = await Pedido.findOne({ seq, idusuario });

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

        const pushUser = await Usuario.findOne({ _id: idusuario });

        if (pushUser.pushToken) {

            const headers = {
                host: 'exp.host',
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json'
            }

            const data = {
                "to": pushUser.pushToken,
                "sound": "default",
                "title":"Recebemos seu pedido !",
                "body": "Recebemos seu pedido. Acompanhe o status do seu pedido até a entrega",
                "_displayInForeground": "true"
            }

            //Envia push notification para o mobile
            axios.post('https://exp.host/--/api/v2/push/send', data, {
                headers: headers
            })
        };

        //Envia reload para o front-end
        const sendSocketMessageTo = findConnections(idestabelecimento);
        sendMessage(sendSocketMessageTo, 'novo-ped', status);

        return res.json(returnPost);
    },

};