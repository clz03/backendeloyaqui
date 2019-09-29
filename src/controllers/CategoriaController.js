const Categoria = require('../model/Categoria');

module.exports = {

    async index(req, res){

        const returnGet = await Categoria.find();
        return res.json(returnGet)
    },

    store(req, res) {

        const { nome, icon } = req.body;

        const returnPost = Categoria.create({
            nome,
            icon
        });

        return res.json(returnPost);
    }
};