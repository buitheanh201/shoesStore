const mongoose = require('mongoose');
const { Schema } = mongoose;

const Comment = new Schema({
    IDAccount : String,
    content : String ,
    likes : [{IDAccount : String}],
    disLikes : [{IDAccount : String}]
},{
    timestamps : true
})

const Product = new Schema({
    name : String ,
    price : Number ,
    oldPrice : Number ,
    sale : String ,
    sizes : [{
        size : Number,
        inventory : Number
    }],
    description : String,
    brandID : String,
    comments : [Comment],
    imageGallery : [{_id : String,image : String}],
    folderID : String,
    views : { type : String ,default : 0 }
},
{
    timestamps : true
})


module.exports = mongoose.model('products',Product);