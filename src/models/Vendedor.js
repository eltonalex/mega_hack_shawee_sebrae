const mongoose = require('mongoose');

const VendaSchema =  new mongoose.Schema({
    nome: String,
    descricao: String,
    quantidade: Number,
    preco: Number,
    createdAt : {
        type:Date,
        default:Date.now,
    },
 })


const vendedorSchema =  new mongoose.Schema({
    nome: String,
    //Mapeamento como array
    vendas: [],
 })      

 mongoose.model('vendas', VendaSchema);
 module.exports = mongoose.model('vendedor', vendedorSchema);