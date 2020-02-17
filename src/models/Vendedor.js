const mongoose = require('mongoose');

const VendaSchema =  new mongoose.Schema({
    nome: String,
    descricao: String,
    preco: Number,
 })


const vendedorSchema =  new mongoose.Schema({
    nome: String,
    //Mapeamento como array
    vendas: [],
 })      

 mongoose.model('vendas', VendaSchema);
 module.exports = mongoose.model('vendedor', vendedorSchema);