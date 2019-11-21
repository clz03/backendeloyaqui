const Usuario = require('../model/Usuario');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

module.exports = {

    async index(req, res){
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
            to: email,
            subject: 'Redefinicao da sua senha ✔',
            text: 'Redefina seu cadastro efetuando a confirmação', 
            template: 'forgotpwd',
            context: {
                nome : nome,
                action_url: 'http://eloyaqui.com.br/validauser/FGF5FREDS542VGHJHHHGTR8541',
                whatsapp: '11 97602-3836'
           }
        });

        return res.status(200).send({ success: "Email enviado"});
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

        const returnCount = await Usuario.countDocuments({ email: email });
        if(returnCount > 0)
            return res.status(400).send({ error: "O e-mail informado já está cadastrado."});

        Usuario.create({
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

        await transporter.sendMail({
            from: '"EloyAqui" <noreply@eloyaqui.com.br>',
            to: email,
            subject: 'Confirme seu e-mail ✔',
            text: 'Termine seu cadastro efetuando a confirmação',
            template: 'index',
            context: {
                nome : nome,
                action_url: 'http://eloyaqui.com.br/validauser/FGF5FREDS542VGHJHHHGTR8541',
                whatsapp: '11 97602-3836'
           }
        });

        return res.json(docs)

    },
};