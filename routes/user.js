const express= require('express'),
      router = express.Router();

      const bcrypt = require('bcrypt');
const User = require('../models/User');

const jwt = require('jsonwebtoken');
router.get('/',(req,res,next)=>{
       res.send('get user'); 
})

router.post('/register',(req,res,next)=>{ 
    const{userName,password} = req.body;

    bcrypt.hash(password,10,(err,hash)=>{
        const user = new User({
            userName,
            password:hash
        });
    
    user.save((err,data)=>{
        if(err)
        {
            next({message:err.message});
        }
        else{
            res.json(data);
        }

    });
    });
   
});
router.post('/authenticate',(req,res,next)=>{
const {userName, password} = req.body;

User.findOne(
    {userName:userName},(err,data)=>{
        if(err)
        {
            next({message:err.message});
        }
        else if(!data)
        { 
            next({message:'Böyle bir kullanıcı adı yok.'});
        }
        else{
            bcrypt.compare(password,data.password,(err,same)=>{
                if(err)
                {
                    next({message:err.message});
                }
                else
                {
                    const payload = {
                        userName
                    };
                    const token = jwt.sign(payload,req.app.get('api_secret_key'),{
                        expiresIn:720
                    });

                    res.json({
                        status:true,
                        token
                    });
                }
            });
        }
    }
)

});

module.exports=router;