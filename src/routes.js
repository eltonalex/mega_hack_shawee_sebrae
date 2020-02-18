
const { Router } = require('express');
//para utilização de api´s externas
const Mongoose = require('mongoose');
const axios = require('axios');
const UsuarioController = require('./controllers/UsuarioController');
const VendedorController = require('./controllers/VendedorController');


const routes = Router();

routes.get('/', function(request, response){
    return response.send('<h2>Projeto Mega Hack - Desafio Proposto pelo SEBRAE</h2>');
} );

routes.get('/usuario', UsuarioController.lista);

routes.post('/usuario', UsuarioController.cadastra);

routes.put('/usuario/:id', UsuarioController.atualiza);

routes.delete('/usuario/:id', UsuarioController.apaga);

routes.get('/vendedor', VendedorController.lista);

routes.get('/vendedor/:nome', VendedorController.listaUm);

routes.post('/vendedor', VendedorController.cadastra);

routes.put('/vendedor/:id', VendedorController.atualiza);

routes.delete('/vendedor/:id', VendedorController.apaga);

module.exports = routes;
