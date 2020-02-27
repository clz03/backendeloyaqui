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
        // var yesterday = new Date(new Date().setDate(new Date().getDate()-1));
        const returnShow = await UserCupom.find({ idusuario: req.params.id })
        .populate({
            path: 'idcupom',
            // match: { validade: { "$gte": yesterday }}
        })
        .populate('idestabelecimento')
        .sort({createdAt: -1});
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

    async store(req, res) {
        const { idusuario, idcupom, idestabelecimento, utilizado } = req.body;

        const countCupom = await UserCupom.countDocuments({ idusuario: idusuario, idcupom: idcupom, utilizado: false })

        if(countCupom < 1){
            const returnPost = UserCupom.create({
                idusuario,
                idcupom,
                idestabelecimento,
                utilizado
            });
            return res.json(returnPost);
        } else {
            return res.json("{sucess:true}");
        }
    }

};