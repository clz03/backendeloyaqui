const UserCupom = require('../model/UserCupom');

module.exports = {

    async index(req, res){
        const returnGet = await UserCupom.find();
        return res.json(returnGet)
    },

    async show(req, res){
        const returnShow = await UserCupom.find({ _id: req.params.id });
        return res.json(returnShow)
    },

    async showbyuser(req, res){
        const returnShow = await UserCupom.find({ idusuario: req.params.id }).populate('idcupom');;
        return res.json(returnShow)
    },

    async update(req, res){
        const returnUpdate = await UserCupom.updateOne({ _id: req.params.id },req.body);
        return res.json(returnUpdate)
    },

    async delete(req, res){
        const returnDel = await UserCupom.deleteOne({ _id: req.params.id });
        return res.json(returnDel)
    },

    store(req, res) {
        const { idusuario, idcupom, utilizado } = req.body;

        const returnPost = UserCupom.create({
            idusuario,
            idcupom,
            utilizado
        });

        return res.json(returnPost);
    },

};