const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title:{
        type:String,
        required:[true,'{PATH} alanı zorunludur.']

    },
     category:String,
     country:String,
     year:Number,
     imbdScore:Number,
     director_id:Schema.Types.ObjectId,
     date:{
         type:Date,
         default:Date.now
     }
});
module.exports=mongoose.model('movie',MovieSchema);