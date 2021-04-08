import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL: string =
    process.env.MONGO_URL || 'mongodb://localhost:27017/ecommerce';

const SECRET: string = 'hiahoriohghdgdsg';

const PORT: string | number = process.env.PORT || 4000;

const TOKEN_LIFE : number = (60 * 60 * 24 ) * 30

export default {
    MONGO_URL,
    SECRET,
    PORT,
    TOKEN_LIFE
};
