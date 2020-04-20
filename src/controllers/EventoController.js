const Evento = require('../model/Evento');
const Usuario = require('../model/Usuario');
const Estabelecimento = require('../model/Estabelecimento');
const Servico = require('../model/Servico');
const axios = require('axios')
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

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
            .populate('idservico');

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
        var returnEventos
        
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
            }
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
        for (var i = returnSlots.hrinicio; i <= returnSlots.hrfim; i++) {
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
        const returnDel = await Evento.deleteOne({ _id: req.params.id });
        return res.json(returnDel)
    },

    async store(req, res) {
        const { data, hora, comentario, idestabelecimento, idservico ,idusuario } = req.body;

        const returnEventos = await Evento.find({ data: data, hora: hora, idservico: idservico, idusuario: idusuario});
        //if(returnEventos.length > 0) return res.json(false);

        const returnPost = await Evento.create({
            data,
            hora,
            comentario,
            idestabelecimento,
            idservico,
            idusuario
        });

        const user = await Usuario.findById({ _id: idusuario });
        const userEstab = await Usuario.findById({ idestabelecimento: idestabelecimento });
        const estab = await Estabelecimento.findById({ _id: idestabelecimento });

        // let transporter = nodemailer.createTransport({
        //     host: "smtp.mailtrap.io",
        //     port: 2525,
        //     auth: {
        //         user: "cb617fac631548",
        //         pass: "e6242a10de30be"
        //     }
        // });

        // const options = {
        //     viewEngine: {
        //       extName: ".handlebars",
        //       partialsDir: './views/',
        //       defaultLayout: false
        //     },
        //     viewPath: './views/',
        //     extName: ".handlebars"
        // };

        // transporter.use('compile',hbs(options));

        // await transporter.sendMail({
        //     from: '"EloyAqui" <noreply@eloyaqui.com.br>',
        //     to: user.email,
        //     subject: 'Novo Agendamento realizado com sucesso ✔',
        //     text: 'Novo agendamento realizado com sucesso', 
        //     template: 'agendamento',
        //     context: {
        //         nome : user.nome,
        //         estabelecimento: estab.nome,
        //         rua: estab.rua,
        //         numero: estab.numero,
        //         telefone: estab.fone1,
        //         telefone2: estab.fone2,
        //         data: data.substring(8,10) + "/" + data.substring(5,7) + "/" + data.substring(0,4),
        //         hora: hora,
        //         support_email:'mailto:suporte@eloyaqui.com.br',
        //         whatsapp: '1197602-3836'
        //    }
        // });

        // await transporter.sendMail({
        //     from: '"EloyAqui" <noreply@eloyaqui.com.br>',
        //     to: estab.email,
        //     subject: 'Novo Agendamento em seu estabelecimento ✔',
        //     text: 'Novo agendamento realizado com sucesso', 
        //     template: 'agendamento2',
        //     context: {
        //         nome : user.nome,
        //         estabelecimento: estab.nome,
        //         rua: estab.rua,
        //         numero: estab.numero,
        //         telefone: user.telefone,
        //         email: user.email,
        //         data: data.substring(8,10) + "/" + data.substring(5,7) + "/" + data.substring(0,4),
        //         hora: hora,
        //         support_email:'mailto:suporte@eloyaqui.com.br',
        //         whatsapp: '1197602-3836'
        //    }
        // });


        if (user.pushToken.length > 0) {

            const headers = {
                host: 'exp.host',
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json'
            }

            const datastore = {
                "to": user.pushToken,
                "sound": "default",
                "title":"Agendamento realizado! ✔",
                "body": "Agendado em " + estab.nome +" no dia " + data.substring(8,10) + "/" + data.substring(5,7) + "/" + data.substring(0,4) + " as " + hora + ":00",
                "_displayInForeground": "true"
            }

            //Envia push notification para o mobile
            axios.post('https://exp.host/--/api/v2/push/send', datastore, {
                headers: headers
            });
            
        };

        if (userEstab.pushToken.length > 0) {

            const headers = {
                host: 'exp.host',
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json'
            }

            const datastore2 = {
                "to": userEstab.pushToken,
                "sound": "default",
                "title": "Novo Agendamento " + estab.nome,
                "body": "Cliente " + user.nome +" agendou para " + data.substring(8,10) + "/" + data.substring(5,7) + "/" + data.substring(0,4) + " as " + hora + ":00",
                "_displayInForeground": "true"
            }

            //Envia push notification para o mobile
            axios.post('https://exp.host/--/api/v2/push/send', datastore2, {
                headers: headers
            });
            
        };


        return res.json(returnPost);
    },

};