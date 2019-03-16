const mongoose=require('mongoose');

//schema定义模型的数据结构，用来设置模型的字段以及字段对应的数据类型和验证条件
const Schema=mongoose.Schema;

const userSchema=new Schema({
    userName:String,
    password:String,
    avator:String,
    nickName:String
})


const User = mongoose.model('user',userSchema);

module.exports=User;