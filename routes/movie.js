const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie');

router.get('/',(req,res,next)=>{
    res.json({status:1})
});
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
module.exports=router;