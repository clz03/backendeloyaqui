const Administrador = require('../model/Administrador');

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

        const user = await Administrador.findOne({ email });

        if (!user)
            return res.status(400).send({ error: "Usuario nao encontrado"});

        if (senha != user.pwd)
            return res.status(400).send({ error: "Senha inválida"});

        user.pwd = undefined;

        return res.json(user)
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