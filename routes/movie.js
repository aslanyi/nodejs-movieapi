const mongoose=require('mongoose');
const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie');
//GET all Movies
router.get('/',(req,res,next)=>{
    Movie.aggregate([
        {
            $lookup:{
                from:'directors',
                localField:'director_id',
                foreignField:'_id',
                as:'director'
            }
        },
        {
            $unwind:{
                path:'$director',
                preserveNullAndEmptyArrays:true
            }
        },
        {
            $group:{
                _id:{
                    _id:'$_id',
                    title:'$title',
                    category:'$category',
                    country:'$country',
                    year:'$year',
                    imdb_score:'$imdb_score',
                },
                director:{
                    $push:'$director'
                }
            }
        },
        {
            $project:{
                _id:'$_id._id',
                title:'$_id.title',
                category:'$_id.category',
                country:'$_id.country',
                year:'$_id.year',
                imdb_score:'$_id.imdb_score',
                director:'$director'
            }
        }
    ],(err,data)=>{
        if(err){
            next({message:err.message});
        }
        else if(data.length===0)
        {
            next({message:'Data yok.'});
        }
        else{
            res.json(data);
        }
    });
});
//Get TOP10 Movie
router.get('/top10',(req,res,next)=>{
    Movie.find({},(err,data)=>{
        if(err)
            res.json(err);
        res.json(data)
            
    }).limit(10).sort({imdb_score:-1});
});
//Get one movie
router.get('/:movie_id',(req,res,next)=>{
    Movie.aggregate([
        {
            $match:{
               '_id': mongoose.Types.ObjectId(req.params.movie_id)
            }
        },
        {
            $lookup:{
                from:'directors',
                localField:'director_id',
                foreignField:'_id',
                as:'director'
            }
        },
        {
            $unwind:{
                path:'$director',
                preserveNullAndEmptyArrays:true
            }
        },
        {
            $group:{
                _id:{
                    _id:'$_id',
                    title:'$title',
                    category:'$category',
                    country:'$country',
                    year:'$year',
                    imdb_score:'$imdb_score',
                },
                director:{
                    $push:'$director'
                }
            }
        },
        {
            $project:{
                _id:'$_id._id',
                title:'$_id.title',
                category:'$_id.category',
                country:'$_id.country',
                year:'$_id.year',
                imdb_score:'$_id.imdb_score',
                director:'$director'
            }
        }
    ],(err,data)=>{
        if(err){
            next({message:err.message});
        }
        else if(data.length===0)
        {
            next({message:'Data yok.'});
        }
        else{
            res.json(data);
        }
    });
})
//SAVE Movie in db
router.post('/',(req,res,next)=>{
    // const {title,category,country,year,imdb_score} = req.body;
    const movie = new Movie(req.body);
    const promise = movie.save();
    promise.then((data)=>{
        res.json({status : 1});
    }).catch((err)=>{
        if(err)
            res.json(err);
    });
});
//Update record
router.put('/:movie_id',(req,res,next)=>{
    Movie.findByIdAndUpdate(req.params.movie_id,req.body,{new:true},(err,data)=>{
        if(err)
            res.json(err);
        if(!data)
        {
            next({message:'Güncellenecek kayıt bulunamadı.'})
        }
        res.json(data);
    });

});
//Delete record
router.delete('/:movie_id',(req,res,next)=>{
    Movie.findByIdAndRemove(req.params.movie_id,(err,data)=>{
        if(err)
            next({error:err.message});
        if(!data){
            next({message:'Silinecek kayıt bulunamadı.'});
        }
        res.json(data);
    });
});
//Between 
router.get('/:start_year/:end_year',(req,res,next)=>{
    const {start_year,end_year} = req.params;
    Movie.find({
        year:{'$gte':parseInt(start_year) , '$lte':parseInt(end_year)}
    },(err,data)=>{
        if(err)
            next({error:err.message});
        if(data.length===0){
            next({message:'Bu tarihler arasında kayıt bulunamadı!'});
        }else{
            res.json(data);   
        }
         
    });
});
module.exports=router;