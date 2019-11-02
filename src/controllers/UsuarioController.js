const Usuario = require('../model/Usuario');

module.exports = {

    async index(req, res){

        const returnGet = await Usuario.find();
        return res.json(returnGet)
    },

    async show(req, res){
        const returnShow = await Usuario.find({ _id: req.params.id });
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

    store(req, res) {
        const { email, pwd, validado, nome } = req.body;

        const returnPost = Usuario.create({
            email,
            pwd,
            validado,
            nome
        });

        return res.json(returnPost);
    },

};