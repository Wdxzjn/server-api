const express=require('express');
//express会把所有的请求方式都作为方法挂载到app对象中，客户端发送请求并且会执行对应的回调函数
const app=express();

//格式化传递过来的数据
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res) => {
    //console.log(req.body);
    res.json({
        status: 'success',
        info: 'api is ok!'
    })
})

app.use('/api/v1',require('./api/v1/auth'));
app.use('/api/v1/admin',require('./api/v1/admin/products'));

const port=process.env.PORT || 3000

app.listen(port,() => {
    console.log(`server is running on ${port}`)
})