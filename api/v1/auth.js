const express=require('express');
const router=express.Router();
const { User }=require('../../models');

//注册接口
router.post('/reg',async (req,res) => {
    if(!req.body.userName || !req.body.password) {
        res.json({
            status:'error',
            info:'用户名或密码不能为空'
        })
        return;
    }

    const userCount=await User.countDocuments({userName:req.body.userName})
    if(userCount > 0) {
        res.json({
            status:'error',
            info:'用户名已存在'
        })
    }else{
        try {
            const user = new User(req.body);
            await user.save();
            res.json({
                status:'success',
                info:'注册成功'
            })
        } catch (err) {
            res.json({
                status:'error',
                info:err
            })
        }  
    }
})

//登录接口
router.post('/login',async (req,res) => {
    if(!req.body.userName || !req.body.password) {
        res.json({
            status:'error',
            info:'用户名或密码不能为空'
        })
        return;
    }
        const user = await User.findOne({userName: req.body.userName});
        if(user) {
            if(user.password == req.body.password) {
                res.json({
                    status:'success',
                    info:'登录成功'
                })
            } else {
                res.json({
                    status:'error',
                    info:'密码不正确'
                })
            }
        } else {
            res.json({
                status:'error',
                info:'请输入正确的用户名'
            })
        }
        return;

        //const users=await User.find({});
        //users.forEach((item) => {
        //     if(req.body.userName == item.userName){
        //         if(req.body.password== item.password){
        //             res.json({
        //                 status:'success',
        //                 info:'登录成功'
        //             })
        //         }else{
        //             res.json({
        //                 status:'error',
        //                 info:'密码不正确'
        //             })
        //         }
                
        //     }else{
        //         res.json({
        //             status:'error',
        //             info:'请输入正确的用户名'
        //         })
        //     }
            
        // });
        // return;
})

module.exports = router;