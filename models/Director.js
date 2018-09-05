const mongoose = require('mongoose');
const Schema =mongoose.Schema;


const director = new Schema({
    name:{
        type:String,
        required:[true,'{PATH} alanı gereklidir.'],
        maxlength:[20,'{PATH} alanı {MAXLENGTH} karakteri geçemez.']
    },
    surname:String,
    age:Number,
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('director',director);