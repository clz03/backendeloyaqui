const Usuario = require('../model/Usuario');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

module.exports = {

    async index(req, res){
        console.log(req.body);
        const returnGet = await Usuario.find();
        return res.json(returnGet)
    },

    async show(req, res){
        const returnShow = await Usuario.find({ _id: req.params.id });
        return res.json(returnShow)
    },

    async authenticate(req, res){

        const { email, senha } = req.body;

        const user = await Usuario.findOne({ email });

        if (!user)
            return res.status(400).send({ error: "Usuario nao encontrado"});

        if (senha != user.pwd)
            return res.status(400).send({ error: "Senha inválida"});

        user.pwd = undefined;

        return res.json(user)
    },

    async forgotpwd(req, res){

        const { email } = req.body;

        const user = await Usuario.findOne({ email });

        if (!user)
            return res.status(400).send({ error: "Usuario nao encontrado"});

        let transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "cb617fac631548",
                pass: "e6242a10de30be"
            }
        });

        transporter.use('compile',hbs({
            viewEngine: 'express-handlebars',
            viewPah: '../views/'
        }));

        let info = await transporter.sendMail({
            from: '"EloyAqui" <noreply@eloyaqui.com.br>', // sender address
            to: email, // list of receivers
            subject: 'Redefinicao da sua senha ✔', // Subject line
            text: 'Redefina seu cadastro efetuando a confirmação', // plain text body
            template: 'index'
        });

        return res.status(200).send({ error: "Email enviado"});
    },

    async showbyEmail(req, res){
        const returnShow = await Usuario.countDocuments({ email: req.params.email });
        return res.json(returnShow)
    },

    async update(req, res){
        const returnUpdate = await Usuario.updateOne({ _id: req.params.id },req.body);
        return res.json(returnUpdate)
    },

    async delete(req, res){
        const returnDel = await Usuario.deleteOne({ _id: req.params.id });
        return res.json(returnDel)
    },

    async store(req, res) {
        const { email, pwd, validado, nome } = req.body;
        var docs;

        const returnStore = Usuario.create({
            email,
            pwd,
            validado,
            nome
        }, function(error,doc) {
          docs = doc;
        });

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

        let info = await transporter.sendMail({
            from: '"EloyAqui" <noreply@eloyaqui.com.br>', // sender address
            to: email, // list of receivers
            subject: 'Confirme seu e-mail ✔', // Subject line
            text: 'Termine seu cadastro efetuando a confirmação', // plain text body
            template: 'index',
            context: {
                nome : nome,
                action_url: '',
                whatsapp: '+5511976023836'

           }
        });

        return res.json(docs)

    },
};