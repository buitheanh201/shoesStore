const mongoose = require('mongoose');
const { Schema } = mongoose;

const Users = new Schema({
    name : String,
    email : String,
    password : String,
    gender : String
});


module.exports = mongoose.model('users',Users);