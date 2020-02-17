const Administrador = require('../model/Administrador');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
var CryptoJS = require("crypto-js");

module.exports = {

    async index(req, res){

        const returnGet = await Administrador.find();
        return res.json(returnGet)
    },

    async show(req, res){
        const returnShow = await Administrador.find({ _id: req.params.id });
        return res.json(returnShow)
    },

    async authenticate(req, res){

        const { email, senha } = req.body;
         
        const skey = process.env.SECRET_KEY;

        const hashEmail  = CryptoJS.AES.decrypt(email, skey);
        const hashPwd  = CryptoJS.AES.decrypt(senha, skey);     

        const user = await Administrador.findOne({ hashEmail });

        if (!user)
            return res.status(200).send({ error: "Usuário/Senha inválida"});

        if (hashPwd != user.pwd)
            return res.status(200).send({ error: "Usuário/Senha inválida"});

        user.pwd = undefined;

        return res.json(user)
    },

    async forgotpwd(req, res){

        const { email } = req.body;
        const user = await Administrador.findOne({ email });

        if (!user)
            return res.status(200).send({ error: "Usuário não encontrado"});

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
        
        const userid = user._id;
        const useridp1 = userid.toString().substring(0, 1);
        const useridp2 = userid.toString().substring(5, 6);

        await transporter.sendMail({
            from: '"EloyAqui" <noreply@eloyaqui.com.br>',
            to: email,
            subject: 'Redefinição da sua senha ✔',
            text: 'Redefina sua senha', 
            template: 'forgotpwd',
            context: {
                nome : user.nome,
                action_url: 'http://eloyaqui.com.br/admredefinirsenha/' + userid + '/' + useridp1 + useridp2,
                support_url:'mailto:suporte@eloyaqui.com.br',
                whatsapp: '1197602-3836'
           }
        });

        return res.status(200).send({ success: "Email enviado com sucesso. Verifique seu e-mail para gerar nova senha."});
    },

    async update(req, res){
        const returnUpdate = await Administrador.updateOne({ _id: req.params.id },req.body);
        return res.json(returnUpdate)
    },

    async delete(req, res){
        const returnDel = await Administrador.deleteOne({ _id: req.params.id });
        return res.json(returnDel)
    },

    store(req, res) {
        const { email, pwd, validado, tipo, nome, idestabelecimento } = req.body;

        const returnPost = Administrador.create({
            email,
            pwd,
            validado,
            tipo,
            nome,
            idestabelecimento
        });

        return res.json(returnPost);
    },

};