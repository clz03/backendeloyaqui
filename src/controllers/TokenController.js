const Token = require('../model/Token');

module.exports = {

    async index(req, res){

        const returnGet = await Token.find();
        return res.json(returnGet)
    },

    async show(req, res){
        const returnShow = await Token.find({ _id: req.params.id });
        return res.json(returnShow)
    },

    async update(req, res){
        const returnUpdate = await Token.updateOne({ _id: req.params.id },req.body);
        return res.json(returnUpdate)
    },

    async delete(req, res){
        const returnDel = await Token.deleteOne({ _id: req.params.id });
        return res.json(returnDel)
    },

    store(req, res) {
        const { token, idusuario, validade } = req.body;

        const returnPost = Token.create({
            token,
            idusuario,
            validade
        });

        return res.json(returnPost);
    },

};