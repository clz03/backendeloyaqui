const Estabelecimento = require('../model/Estabelecimento');

module.exports = {

    async index(req, res){
        const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
        const page = req.query.page ? parseInt(req.query.page) : 1;

        const returnGet = await Estabelecimento.find()
        .skip((page -1) * pagination)
        .limit(pagination);
        return res.json(returnGet)
    },

    async showAll(req, res){
        const returnShow = await Estabelecimento.find();
        return res.json(returnShow)
    },

    async show(req, res){
        const returnShow = await Estabelecimento.find({ _id: req.params.id });
        return res.json(returnShow)
    },

    async showbycat(req, res){
        const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
        const page = req.query.page ? parseInt(req.query.page) : 1;
        var totalCount = 0;

        totalCount = await Estabelecimento.countDocuments({ idcategoria: req.params.id });

        const returnShow = await Estabelecimento.find({ idcategoria: req.params.id })
        .skip((page -1) * pagination)
        .limit(pagination);

        var result = {
            "totalRecords" : totalCount,
            "result": returnShow
        };
        
        return res.json(result)
    },

    async showbyagenda(req, res){
        const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
        const page = req.query.page ? parseInt(req.query.page) : 1;
        var totalCount = 0;

        totalCount = await Estabelecimento.countDocuments({ pedonline: 1 });

        const returnShow = await Estabelecimento.find({ pedonline: 1 })
        .skip((page -1) * pagination)
        .limit(pagination);

        var result = {
            "totalRecords" : totalCount,
            "result": returnShow
        };
        
        return res.json(result)
    },

    async showbysearch(req, res){
        const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
        const page = req.query.page ? parseInt(req.query.page) : 1;
        var totalCount = 0;

        totalCount = await Estabelecimento.countDocuments(
            {  $or: [ 
                    {nome: { $regex: '.*' + req.params.nome + '.*', $options: 'i' }}, 
                    {tipo: { $regex: '.*' + req.params.nome + '.*', $options: 'i' }},
                    {subtipo: { $regex: '.*' + req.params.nome + '.*', $options: 'i' }}
                ]
            }
        )

        const returnShow = await Estabelecimento.find(
            {  $or: [ 
                    {nome: { $regex: '.*' + req.params.nome + '.*', $options: 'i' }}, 
                    {tipo: { $regex: '.*' + req.params.nome + '.*', $options: 'i' }},
                    {subtipo: { $regex: '.*' + req.params.nome + '.*', $options: 'i' }}
                ]
            }
        )
        .skip((page -1) * pagination)
        .limit(pagination);

        var result = {
            "totalRecords" : totalCount,
            "result": returnShow
        };

        return res.json(result)
    },

    async update(req, res){
        const returnUpdate = await Estabelecimento.updateOne({ _id: req.params.id },req.body);
        return res.json(returnUpdate)
    },

    async delete(req, res){
        const returnDel = await Estabelecimento.deleteOne({ _id: req.params.id });
        return res.json(returnDel)
    },

    store(req, res) {

        const { nome, descr, tipo, subtipo, imagemcapa, imagem, rua, numero, bairro, cep, fone1, fone2, pedonline, plano, email, facebook, instagram, whatsapp, idcategoria } = req.body;

        const returnPost = Estabelecimento.create({
            nome, 
            descr, 
            tipo,
            subtipo,
            imagem,
            imagemcapa, 
            rua, 
            numero, 
            bairro, 
            cep, 
            fone1, 
            fone2, 
            pedonline,
            plano,
            email, 
            facebook, 
            instagram, 
            whatsapp, 
            idcategoria
        });

        return res.json(returnPost);
    }
};
