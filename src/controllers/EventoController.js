const Evento = require('../model/Evento');
const Usuario = require('../model/Usuario');
const Estabelecimento = require('../model/Estabelecimento');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

module.exports = {

    async index(req, res){
        const returnGet = await Evento.find();
        return res.json(returnGet)
    },

    async show(req, res){
        const returnShow = await Evento.find({ _id: req.params.id });
        return res.json(returnShow)
    },

    async showbyuser(req, res){
        const returnShow = await Evento.find({ idusuario: req.params.idusuario }).populate('idestabelecimento');
        return res.json(returnShow)
    },

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
        const dia = new Date(req.params.data);
        const diasemana = dia.getDay();
        const returnEventos = await Evento.find({ data: req.params.data, idestabelecimento: req.params.estab });
        const returnSlots = await Estabelecimento.findById({ _id: req.params.estab });

        if (returnEventos.length > 0){
            for(var i = 0; i < returnEventos.length; i++) {
                jsonEventos[i] = returnEventos[i].hora;
            }
        }

        if(diasemana == 0){
            for (var i = returnSlots.hrinicio_domingo; i <= returnSlots.hrfim_domingo; i++) {
                var status = jsonEventos.includes(i) ? 'I' : 'D';
                jsonArr.push({
                    id: req.params.data + i,
                    data: req.params.data,
                    hora: i,
                    status: status
                });
            }
        }

        if(diasemana > 0 && diasemana < 6){
            for (var i = returnSlots.hrinicio_semana; i <= returnSlots.hrfim_semana; i++) {
                var status = jsonEventos.includes(i) ? 'I' : 'D';
                jsonArr.push({
                    id: req.params.data + i,
                    data: req.params.data,
                    hora: i,
                    status: status
                });
            }
        }

        if(diasemana == 6){
            for (var i = returnSlots.hrinicio_sabado; i <= returnSlots.hrfim_sabado; i++) {
                var status = jsonEventos.includes(i) ? 'I' : 'D';
                jsonArr.push({
                    id: req.params.data + i,
                    data: req.params.data,
                    hora: i,
                    status: status
                });
            }
        }

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
        const { data, hora, comentario, idestabelecimento, idusuario } = req.body;

        const returnPost = Evento.create({
            data,
            hora,
            comentario,
            idestabelecimento,
            idusuario
        });

        const user = await Usuario.findById({ _id: idusuario });
        const estab = await Estabelecimento.findById({ _id: idestabelecimento });

        let transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "cb617fac631548",
                pass: "e6242a10de30be"
            }
        });

        const options = {
            viewEngine: {
              extName: ".handlebars",
              partialsDir: './views/',
              defaultLayout: false
            },
            viewPath: './views/',
            extName: ".handlebars"
          };

        transporter.use('compile',hbs(options));

        await transporter.sendMail({
            from: '"EloyAqui" <noreply@eloyaqui.com.br>',
            to: user.email,
            subject: 'Novo Agendamento realizado com sucesso ✔',
            text: 'Novo agendamento realizado com sucesso', 
            template: 'agendamento',
            context: {
                nome : user.nome,
                estabelecimento: estab.nome,
                rua: estab.rua,
                numero: estab.numero,
                telefone: estab.telefone,
                data: data,
                hora: hora,
                support_url:'mailto:suporte@eloyaqui.com.br'
           }
        });

        return res.json(returnPost);
    },

};