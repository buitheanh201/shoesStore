import mongoose, { Schema } from 'mongoose';

const categoryImage: Schema = new Schema({
    _id: String,
    avatar: String,
});

const category: Schema = new Schema({
    categoryName: String,
    categoryImage: [categoryImage],
    folderID: String,
});

export default mongoose.model('categories', category);
