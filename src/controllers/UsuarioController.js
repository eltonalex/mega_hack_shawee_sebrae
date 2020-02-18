const Mongoose = require('mongoose');
const axios = require('axios');
const Usuario = require('../models/Usuario');

module.exports = {

    async lista(request, response) {
        await Usuario.find({}, function(err, usuario) {
            if (!err){ 
                console.log(usuario);
                return response.json(usuario);
                process.exit();
            } else {throw err;}
        });
    },

    async cadastra(request, response) {

        const { nome , email, senha , tipoUsuario="P"} = request.body;
    
        try {
            //A - Administrador, V - Vendedor
            
            if( await Usuario.findOne({ email }))
                return response.send(400).send({ error: 'Usuário já existe.' });        
        
                const usuario = await Usuario.create({
                    nome,
                    email,
                    senha,
                    tipoUsuario
            });
            
            usuario.senha = undefined;
            
            return response.json(usuario);
    
        } catch (error) {
            return response.status(400).send({error:'Não foi possível realizar o registro!'});
        }
        
    },

    async atualiza(request, response) { 
    
        let id =  request.params.id;
    
        const usuario = await Usuario.updateOne({ "_id": `${id}` }, request.body, (err) => {
            if(err) return response.status(400).json({
                error:true,
                message:"Não foi possível realizar a edição do registro!"
            });
    
            return response.json({
                error:false,
                message:"Registro editado com sucesso!"
            });
        });
    
        console.log(usuario);
    
     },
    
     async apaga(request, response) { 
       
        let id =  request.params.id;
        console.log(id);
        const query = { "_id": `${id}` };
    
        await Usuario.deleteOne(query)
        .then(function(){
            response.send("Usuário apagado com sucesso!");
        }).catch(function(){
            response.send("Usuário não foi apagado com sucesso!")
        });
    
    },
}