const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const cart = new Schema({
    _id : String,
    status: Number,
    quantity : Number,
    size : Number,
    idProduct : String
})
const notification = new Schema({
    sendBy: String,
    content: String,
    status: Number
}, {
    timestamps: true
})
const account = new Schema({
    permission : { type : String , default : 1 },
    email: String,
    password: { type : String, default : '123456789'},
    name: String,
    address: String,
    avatar: { type: String, default: 'https://drive.google.com/uc?id=1jnDa2xmwh1pvJmWQ-V8UGErvf0UC9MMz&export=download' },
    notifications: [notification],
    carts: [cart],
    _id : String,
    address : { type : String ,default : ''},
    phoneNumber : { type : String , default : ''},
    folderID : String
}, {
    timestamps: true
})
module.exports = mongoose.model('accounts', account);