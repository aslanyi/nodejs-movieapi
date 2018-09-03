const mongoose = require('mongoose');

module.exports=()=>{
    mongoose.connect('mongodb://aslanyi:taha1998@ds143242.mlab.com:43242/movie-api',{ useNewUrlParser: true });
    mongoose.connection.on('open',()=>{
        console.log('MongoDB Şahlandı');
    });
    mongoose.connection.on('error',(err)=>{
        console.log(`MongoDB error :${err});
        `)
    })
mongoose.Promise=global.Promise;
} 