import mongoose, { Schema } from 'mongoose';

const Comment: Schema = new Schema(
    {
        IDAccount: String,
        content: String,
        likes: [{ IDAccount: String }],
        disLikes: [{ IDAccount: String }],
    },
    {
        timestamps: true,
    }
);

const Product: Schema = new Schema(
    {
        name: String,
        price: Number,
        oldPrice: Number,
        sale: String,
        sizes: [
            {
                size: Number,
                inventory: Number,
            },
        ],
        description: String,
        brandID: String,
        comments: [Comment],
        imageGallery: [{ _id: String, image: String }],
        folderID: String,
        views: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('products', Product);
