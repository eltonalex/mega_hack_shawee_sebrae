const Mongoose = require('mongoose');
const axios = require('axios');
const Vendedor = require('../models/Vendedor');

module.exports = {

    async lista(request, response) {
        await Vendedor.find({}, function(err, vendedor) {
            if (!err){ 
                console.log(vendedor);
                return response.json(vendedor);
                process.exit();
            } else {throw err;}
        });
    },

    async listaUm(request, response) {
        const nome =  request.params.nome;

        await Vendedor.find({nome}, function(err, vendedor) {
            if (!err){ 
                console.log(vendedor);
                return response.json(vendedor);
                process.exit();
            } else {throw err;}
        });
    },


    async cadastra(request, response) {
    
        try {

            const vendedorReq = request.body.vendedor;
            const servicosReq = request.body.vendas;
            const vendedorVendas = [];
            const nome = vendedorReq[0].nome;

            for (var x in servicosReq) {
                vendedorVendas.push(servicosReq[x]);
            }  
        
            const vendedor = await Vendedor.create({
                    nome,
                    vendas:vendedorVendas,                
            });
            
            return response.json(vendedor);
            
    
        } catch (error) {
            return response.status(400).send({error:'Não foi possível realizar o registro!'+error});
        }
        
    },

    async atualiza(request, response) { 
    
        const id =  request.params.id;
        const vendedorReq = request.body.vendedor;
        const servicosReq = request.body.vendas;
        const vendedorVendas = [];
        const nome = vendedorReq[0].nome;

        for (var x in servicosReq) {
            vendedorVendas.push(servicosReq[x]);
        }

        if( await Vendedor.findOne({ "_id": `${id}` }))
    
            await Vendedor.updateOne({ "_id": `${id}` }, {nome, vendas:vendedorVendas}, (err) => {
                
                if(err) return response.status(400).json({
                    error:true,
                    message:"Não foi possível realizar a edição do registro!"
                });
        
                return response.json({
                    error:false,
                    message:"Registro editado com sucesso!"
                });
            });
    
     },
    
     async apaga(request, response) { 
       
        let id =  request.params.id;
       
        const query = { "_id": `${id}` };
    
        await Vendedor.deleteOne(query, request.body, (err) => {
            if(err) return response.status(400).json({
                error:true,
                message:"Registro não foi apagado com sucesso!"
            });
    
            return response.json({
                error:false,
                message:"Registro apagado com sucesso"
            });
        });
    
    },
}