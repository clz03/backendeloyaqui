const Evento = require('../model/Evento');
const Usuario = require('../model/Usuario');
const Estabelecimento = require('../model/Estabelecimento');
const Servico = require('../model/Servico');
const axios = require('axios')
//const nodemailer = require('nodemailer');
//const hbs = require('nodemailer-express-handlebars');
const { findConnections, sendMessage } = require('../websocket')

module.exports = {

    async index(req, res){
        const returnGet = await Evento.find();
        return res.json(returnGet);
    },

    async show(req, res){
        const returnShow = await Evento.find({ _id: req.params.id });
        return res.json(returnShow);
    },

    async showbyuser(req, res){
        var yesterday = new Date(new Date().setDate(new Date().getDate()-1));
        const returnShow = await Evento.find({ idusuario: req.params.idusuario, data: { "$gte": yesterday }}).populate('idestabelecimento');
        return res.json(returnShow);
    },

    async showbyestab(req, res){
        const ano_atual = 2020;
        const ano_proximo = 2021;

        const mes_atual = req.params.mes;
        const mes_proximo = mes_atual == '12' ? '01' : parseInt(mes_atual) + 1;

        const data_gte = new Date(ano_atual + '-' + mes_atual + '-01');
        const data_lt = new Date(mes_proximo < mes_atual ? ano_proximo + '-' + mes_proximo + '-' + '01' : ano_atual + '-' + mes_proximo + '-01');

        const returnShow = await Evento.find({ 
            idestabelecimento: req.params.estab, 
            data: {
                "$gte": data_gte,
                "$lt": data_lt
            } 
            })
            .populate('idusuario')
            .populate('idservico')
            .sort({data: -1, hora: 1});

        return res.json(returnShow);
    },

    // async showbyday(req, res){
    //     // 0 DOMINGO
    //     // 1 SEGUNDA
    //     // 2 TERCA
    //     // 3 QUARTA
    //     // 4 QUINTA
    //     // 5 SEXTA
    //     // 6 SABADO

    //     var jsonArr = [];
    //     var jsonEventos = [];
    //     const dia = new Date(req.params.data);
    //     const diasemana = dia.getDay();
    //     const returnEventos = await Evento.find({ data: req.params.data, idestabelecimento: req.params.estab });
    //     const returnSlots = await Estabelecimento.findById({ _id: req.params.estab });

    //     if (returnEventos.length > 0){
    //         for(var i = 0; i < returnEventos.length; i++) {
    //             jsonEventos[i] = returnEventos[i].hora;
    //         }
    //     }

    //     if(diasemana == 0){
    //         if(returnSlots.hrinicio_domingo > 0){
    //             for (var i = returnSlots.hrinicio_domingo; i <= returnSlots.hrfim_domingo; i++) {
    //                 var status = jsonEventos.includes(i) ? 'I' : 'D';
    //                 jsonArr.push({
    //                     id: req.params.data + i,
    //                     data: req.params.data,
    //                     hora: i,
    //                     status: status
    //                 });
    //             }
    //         }
    //     }

    //     if(diasemana > 0 && diasemana < 6){
    //         for (var i = returnSlots.hrinicio_semana; i <= returnSlots.hrfim_semana; i++) {
    //             var status = jsonEventos.includes(i) ? 'I' : 'D';
    //             jsonArr.push({
    //                 id: req.params.data + i,
    //                 data: req.params.data,
    //                 hora: i,
    //                 status: status
    //             });
    //         }
    //     }

    //     if(diasemana == 6){
    //         if(returnSlots.hrinicio_sabado > 0){
    //             for (var i = returnSlots.hrinicio_sabado; i <= returnSlots.hrfim_sabado; i++) {
    //                 var status = jsonEventos.includes(i) ? 'I' : 'D';
    //                 jsonArr.push({
    //                     id: req.params.data + i,
    //                     data: req.params.data,
    //                     hora: i,
    //                     status: status
    //                 });
    //             }
    //         }
    //     }

    //     return res.json(jsonArr)
    // },

    async showbyday(req, res){
        // 0 DOMINGO
        // 1 SEGUNDA
        // 2 TERCA
        // 3 QUARTA
        // 4 QUINTA
        // 5 SEXTA
        // 6 SABADO

        var jsonArr = [];
        var jsonEventos = [];
        var status;
        var returnEventos;

        var hoje = new Date();
        var horahoje = hoje.getHours(); // 14
        hoje.setHours(0,0,0,0);

        var hojeparam = new Date(req.params.data);

        const returnSlots = await Servico.findById({ _id: req.params.servico });


        if(returnSlots.markIndisp === true){
            returnEventos = await Evento.find({ data: req.params.data, idservico: req.params.servico });
        } else {
            returnEventos = '';
        }

        //Horarios já preenchidos nesse dia
        if (returnEventos.length > 0){
            for(var i = 0; i < returnEventos.length; i++) {
                jsonEventos[i] = returnEventos[i].hora;
            };
        };

        //somente no dia corrente eliminar horarios ja passados
        if(hojeparam.getUTCDate() == hoje.getUTCDate()){
            for(var i = 0; i <= horahoje; i++) {
                if(!jsonEventos.includes(i)) {
                    jsonEventos.push(i);
                }
            };
        }

        // if(diasemana == 0){
        //     if(returnSlots.hrinicio_domingo > 0){
        //         for (var i = returnSlots.hrinicio_domingo; i <= returnSlots.hrfim_domingo; i++) {
        //             var status = jsonEventos.includes(i) ? 'I' : 'D';
        //             jsonArr.push({
        //                 id: req.params.data + i,
        //                 data: req.params.data,
        //                 hora: i,
        //                 status: status
        //             });
        //         }
        //     }
        // }

        //Horarios livres ja informando quais estão ocupados
        for (var i = parseInt(returnSlots.hrinicio); i <= parseInt(returnSlots.hrfim); i++) {
            status = jsonEventos.includes(parseInt(i)) ? 'I' : 'D';
            jsonArr.push({
                id: req.params.data + i,
                data: req.params.data,
                hora: i,
                status: status
            });
        }


        // if(diasemana == 6){
        //     if(returnSlots.hrinicio_sabado > 0){
        //         for (var i = returnSlots.hrinicio_sabado; i <= returnSlots.hrfim_sabado; i++) {
        //             var status = jsonEventos.includes(i) ? 'I' : 'D';
        //             jsonArr.push({
        //                 id: req.params.data + i,
        //                 data: req.params.data,
        //                 hora: i,
        //                 status: status
        //             });
        //         }
        //     }
        // }

        return res.json(jsonArr)
    },

    async update(req, res){
        const returnUpdate = await Evento.updateOne({ _id: req.params.id },req.body);
        return res.json(returnUpdate)
    },

    async delete(req, res){

        const returnEvento = await Evento.findById({ _id: req.params.id });
        const dataEvento = returnEvento.data.toISOString();

        const idestabelecimento = returnEvento.idestabelecimento;
        const userEstab = await Usuario.find({ idestabelecimento: idestabelecimento });
        const user = await Usuario.findById({ _id: returnEvento.idusuario });

        const returnDel = await Evento.deleteOne({ _id: req.params.id });

         //Envia reload para o mobile-end
        const sendSocketMessageTo = findConnections(idestabelecimento);
        sendMessage(sendSocketMessageTo, 'novo-agenda', 'status');

        if (userEstab) {

            const headers2 = {
                host: 'exp.host',
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json'
            }

            const datastore2 = {
                "to": userEstab[0].pushToken,
                "sound": "default",
                "title": "Agendamento cancelado",
                "body": "Cliente " + user.nome +" cancelou agendamento de " + dataEvento.substring(8,10) + "/" + dataEvento.substring(5,7) + "/" + dataEvento.substring(0,4) + " as " + returnEvento.hora + ":00",
                "_displayInForeground": "true"
            }

            //Envia push notification para o mobile
            axios.post('https://exp.host/--/api/v2/push/send', datastore2, {
                headers: headers2
            });
            
        };

        return res.json(returnDel);
    },

    async store(req, res) {
        const { data, hora, comentario, idestabelecimento, idservico ,idusuario } = req.body;
        
        var returnEventos;
        
        const returnServico = await Servico.findById({ _id: idservico});
        const user = await Usuario.findById({ _id: idusuario });

        //Caso o horario esteja preenchido / Else se estiver marcado o flag MarkIndisp = False nao valida o usuario
        if(!returnServico.markIndisp){
            returnEventos = await Evento.find({ data: data, hora: hora, idservico: idservico, idusuario: idusuario});
        } else {
            returnEventos = await Evento.find({ data: data, hora: hora, idservico: idservico});
        };

        if(returnEventos.length > 0) return res.status(400).send({error: 'Horario já preenchido'});

        //Caso o usuario ja tenha horario marcado em outro estab, porém nao é o admin
        if(!user.admin){
            returnEventos2 = await Evento.find({ data: data, hora: hora, idusuario: idusuario});
            if(returnEventos2.length > 0) return res.status(400).send({error:'Você já possui esse horário agendado em outro estabelecimento'});
        };

        //Caso o usuario ja tenha horario marcado no estab para o mesmo dia, porém nao é o admin
        if(!user.admin){
            returnEventos3 = await Evento.find({ data: data, idservico: idservico, idusuario: idusuario});
            if(returnEventos3.length > 0) return res.status(400).send({error:'Você já possui agendamento para hoje nesse estabelecimento'});
        };

  
        const returnPost = await Evento.create({
            data,
            hora,
            comentario,
            idestabelecimento,
            idservico,
            idusuario
        });

        //const user = await Usuario.findById({ _id: idusuario });
        const userEstab = await Usuario.find({ idestabelecimento: idestabelecimento });
        const estab = await Estabelecimento.findById({ _id: idestabelecimento });

        if (user.pushToken) {

            const headers = {
                host: 'exp.host',
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json'
            }

            const datastore = {
                "to": user.pushToken,
                "sound": "default",
                "title":"Seu agendamento foi realizado!",
                "body": "Agendado em " + estab.nome +" no dia " + data.substring(8,10) + "/" + data.substring(5,7) + "/" + data.substring(0,4) + " as " + hora + ":00",
                "_displayInForeground": "true"
            }

            //Envia push notification para o mobile
            axios.post('https://exp.host/--/api/v2/push/send', datastore, {
                headers: headers
            });
            
        };

        if (userEstab) {

            const headers2 = {
                host: 'exp.host',
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json'
            }

            const datastore2 = {
                "to": userEstab[0].pushToken,
                "sound": "default",
                "title": "Novo Agendamento",
                "body": "Cliente " + user.nome +" agendou para " + data.substring(8,10) + "/" + data.substring(5,7) + "/" + data.substring(0,4) + " as " + hora + ":00",
                "_displayInForeground": "true"
            }

            //Envia push notification para o mobile
            axios.post('https://exp.host/--/api/v2/push/send', datastore2, {
                headers: headers2
            });
            
        };

        //Envia reload para o mobile-end
        const sendSocketMessageTo = findConnections(idestabelecimento);
        sendMessage(sendSocketMessageTo, 'novo-agenda', 'status');


        return res.json(returnPost);
    },

};