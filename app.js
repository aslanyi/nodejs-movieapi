const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const db = require('./helper/db')();
const movie = require('./routes/Movie');

app.set('view engine','pug');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use('/api/movie',movie);

app.use((err,req,res,next)=>{
    res.status(err.status);
    res.send(err.status);
})

const server =app.listen(3000,()=>{
console.log(`Server başladı port numarası :${server.address().port}`);
});