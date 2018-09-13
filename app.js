const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const db = require('./helper/db')();
const movie = require('./routes/movie');
const director = require('./routes/director');
const user = require('./routes/user');
const config = require('./config');
const verifyToken = require('./middleware/jwt-verify');
app.set('api_secret_key',config.api_secret_key);
app.set('view engine','pug');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use('/api',verifyToken);
app.use('/',user);
app.use('/api/movie',movie);
app.use('/api/director',director);
app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    if(err)
    {
        res.json({message:err.message});
    }
    next();
})

const server =app.listen(process.env.PORT||3000,()=>{
console.log(`Server başladı port numarası :${server.address().port}`);
});
  
module.exports=app;