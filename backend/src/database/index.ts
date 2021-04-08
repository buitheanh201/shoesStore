import mongoose from 'mongoose';

export const connect = (URL: string): Promise<typeof mongoose> => {
    return mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });
};
