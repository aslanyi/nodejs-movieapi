const mongoose=require('mongoose');
const express = require('express');
const router = express.Router();

const Director = require('../models/Director');
//add director
router.post('/addDirector',(req,res,next)=>{
const director = new Director(req.body);

director.save((err,data)=>{
    if(err)
        throw err;
    res.json(data);
});

});
//Get all directors with movies
router.get('/',(req,res,next)=>{
    Director.aggregate([
        {   
            $lookup:{
                 from:'movies',
                 localField:'_id',
                 foreignField:'director_id',
                 as:'movies'
            }      
    },
    {
        $unwind:{
          path:'$movies',
        preserveNullAndEmptyArrays:true
        }
    },

    {
        $group:{
            _id:{
                _id:'$_id',
                name:'$name',
                surname:'$surname',
                age:'$age'
            },
            movies:{
                $push:'$movies'
            }
        }
    },
    {
        $project:{
            _id:'$_id._id',
            name:'$_id.name',
            surname:'$_id.surname',
            age:'$_id.age',
            movies:'$movies'
        }
    }
    ],(err,data)=>{
        if(err)
        {
            next({message:err.message});
        }
        else if(data.length===0)
        {
            next({message:'Veri bulunamadı.'})
        }
        else{
            res.json(data);
        }
        
    }
);
});
//Get One Director with movies
router.get('/:directorId',(req,res,next)=>{
    Director.aggregate([
        {
            $match:{
                '_id':mongoose.Types.ObjectId(req.params.directorId)
            }
        },  
        {
            $lookup:{
                from:'movies',
                localField:'_id',
                foreignField:'director_id',
                as:'movies'
            }
        },
        {
            $unwind:{
                path:'$movies',
                preserveNullAndEmptyArrays:true
            }
        },
        {
            $group:{
                _id:{
                    _id:'$_id',
                    name:'$name',
                    surname:'$surname',
                    age:'$age'
                },
                movies:{
                    $push:'$movies'
                }
                
            }
        },
        {
            $project:{
                _id:'$_id._id',
                name:'$_id.name',
                surname:'$_id.surname',
                age:'$_id.age',
                movies:'$movies'
            }

        }

    ],(err,data)=>{
        if(err)
        {
            next({message:err.message});
        }
        else if(data.length===0)
        {
            next({message:'Veri bulunamadı.'});
        }
        else{
            res.json(data);
        }
    });
});
//Update
router.put('/update/:directorId',(req,res,next)=>{
    Director.findByIdAndUpdate(req.params.directorId,req.body,{
        new:true
    },(err,data)=>{
        if(err)
        {
            next({message:err.message})
        }
        else if(!data){
            next({message:'Kayıt bulunamadı.'});
        }
        else{
            res.json(data);
        }
    });
});
//Delete
router.delete('/delete/:directorId',(req,res,next)=>{
    Director.findByIdAndRemove(req.params.directorId,(err,data)=>{
        if(err)
        {
            next({message:err.message})
        }
        else if(!data){
            next({message:'Kayıt bulunamadı.'});
        }
        else{
            res.json(data);
        }
    });
});

module.exports=router;