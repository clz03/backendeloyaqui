const Endereco = require('../model/Endereco');

module.exports = {

    async index(req, res){

        const returnGet = await Endereco.find();
        return res.json(returnGet)
    },

    async show(req, res){
        const returnShow = await Endereco.find({ _id: req.params.id });
        return res.json(returnShow)
    },

    async showbyuser(req, res){
        const returnShow = await Endereco.find({ idusuario: req.params.id });
        return res.json(returnShow)
    },

    async update(req, res){
        const returnUpdate = await Endereco.updateOne({ _id: req.params.id },req.body);
        return res.json(returnUpdate)
    },

    async delete(req, res){
        const returnDel = await Endereco.deleteOne({ _id: req.params.id });
        return res.json(returnDel)
    },

    store(req, res) {
        const { apelido, rua, numero, bairro, cep, complemento, idusuario } = req.body;

        const returnPost = Endereco.create({
            apelido,
            rua,
            numero,
            bairro,
            cep,
            complemento,
            idusuario
        });

        return res.json(returnPost);
    },

};