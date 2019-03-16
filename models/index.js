const mongoose=require('mongoose');

const User=require('./user');
//const Product = require('./products');
const newProduct = require('./newProduct');

mongoose.connect('mongodb://localhost:27017/cat-shop',{useNewUrlParser:true});

module.exports={
    User,
    newProduct
}