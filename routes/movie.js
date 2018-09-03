const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie');
//GET all Movies
router.get('/',(req,res,next)=>{
    Movie.find({},(err,data)=>{
        res.json(data);
    })
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
    Movie.findById(req.params.movie_id,(err,data)=>{
        if(err)
            res.json(err);
        if(!data)
        {
            next({message:'Aradığınız film yok.'});
        }
        res.json(data);
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
router.get('/:start_year/:end_year',(req,res,next)=>{
    const {start_year,end_year} = req.params;
    Movie.find({
        year:{'$gte':parseInt(start_year) , '$lte':parseInt(end_year)}
    },(err,data)=>{
        if(err)
            next({error:err.message});
        if(!data)
            next({message:'Bu tarihler arasında kayıt bulunamadı!'});
        res.json(data);    
    });
});
module.exports=router;