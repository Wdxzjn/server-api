const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newSchema = new Schema({
    name:String,
    price:String,
    description:String,
    cover_img:String,
    content:String,
    quatity:String
})

const newProduct = mongoose.model('product',newSchema);

module.exports = newProduct;