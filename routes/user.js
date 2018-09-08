const express= require('express'),
      router = express.Router();


const User = require('../models/User');


router.get('/',(req,res,next)=>{
       res.send('get user'); 
})

router.post('/register',(req,res,next)=>{ 
    const{userName,password} = req.body;

    const user = new User({
        userName,
        password
    });

user.save((err,data)=>{
    if(err)
        throw err;

    res.json(data);
});
});

module.exports=router;