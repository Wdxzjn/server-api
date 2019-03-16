const express=require('express');
const router=express.Router();
const { newProduct } = require('../../../models');

//商品新增
router.post('/newProduct',async (req,res) => {
    if(!req.body.name){
        res.json({
            status:'error',
            info:'请输入商品名称'
        })
        return;
    }

    const countProduct =await newProduct.countDocuments({name:req.body.name});
    if(countProduct > 0){
        res.json({
            status:'error',
            info:'商品已存在'
        })
    }else{
        try {
            const product = new newProduct(req.body);
            await product.save();
            res.json({
                status:'success',
                info:'商品添加成功'
            })
        } catch (error) {
            res.json({
                status:'error',
                info:error
            })
        }
    }
})


//商品修改
router.put('/name', async (req,res) => {
    if(!req.body.name){
        res.json({
            status:'error',
            info:'请输入商品名称'
        })
        return;
    }

    const uProduct =await newProduct.findOne({name:req.body.name})
    if(uProduct){
        console.log(uProduct);
        res.json({
            status:'success',
            info:'查询成功'
        })
    }else{
        res.json({
            status:'error',
            info:'没有该商品'
        })
    }
    
})

//商品查询
router.get('/search', async (req,res) => {
    if(!req.body.name){
        res.json({
            status:'error',
            info:'请输入和商品名称有关的信息'
        })
        return;
    }

    async function getAllProductTypeFilter(query) {
        const result = await newProduct.find(query);
        console.log(result);
        if(result != ""){
            res.json({
                status:'success',
                info:'查找成功'
            })
        }else{
            res.json({
                status:'error',
                info:'没有与该描述相符的商品'
            })
        }
      }
      
      getAllProductTypeFilter({
        name: new RegExp(req.body.name), // 模糊查找,使用正则表达式
      });
        // console.log(req.body.name);
        // const result = await newProduct.find({name:'/req.body.name/'});
        // console.log(result);
        // if(result != ""){
        //     res.json({
        //         status:'success',
        //         info:'查询成功'
        //     })
        //     return;
        // }else{
        //     res.json({
        //         status:'error',
        //         info:'没有与该描述相关的商品'
        //     })
        // }
    

    const allCount = await newProduct.countDocuments({});
    const page = req.query.page || 1;
    const pageCount = Math.ceil(allCount/2);
    const product = await newProduct.find({}).skip((page-1)*2).limit(2);
})

module.exports = router;