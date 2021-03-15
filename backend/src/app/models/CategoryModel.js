const mongoose = require('mongoose');
const { Schema } = mongoose;


const category = new Schema({
    categoryName : String,
    categoryImage : {
        _id : String,
        avatar : String
    },
    folderID : String
});



module.exports = mongoose.model('categories',category);