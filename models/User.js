const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

const UserSchema = new Schema({
    userName:{
        type:String,
        required:[true,'{PATH} alanı boş geçilemez.'],
        unique:[true,'{PATH} alanında böyle bir kullanıcı adı zaten mevcut.'],
        maxlength:[20,'{PATH} alanı {MAXLENGTH} karakteri geçemez. ']
    },
    password:{
        type:String,
        required:[true,'{PATH} alanı boş geçilemez.'],
        minlength:[8,'{PATH} alanı {MINLENGTH} karakterden az olamaz.']
    }
});

module.exports=mongoose.model('user',UserSchema);