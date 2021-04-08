import express, { Application } from 'express';
import DotEnv from 'dotenv';
import cors from 'cors';
import path from 'path';
import env from './config';
import { connect } from './database';
import rootRoute from './routes';
import morgan from 'morgan';

const App: Application = express();

//use static file
App.use(express.static(path.join(__dirname, '../public')));

//use environment
DotEnv.config();

//use json for all request send
App.use(express.json());

//use x-www-urlencoded
App.use(express.urlencoded({ extended: true }));

//access origin
App.use(cors());

//use morgan for log request
App.use(morgan('dev'));

console.log(env.MONGO_URL);

//connect to database
const mongodb = async () => {
    try {
        await connect(env.MONGO_URL);
        console.log('connect successfully !');
    } catch (error) {
        console.log(error.message);
    }
};
mongodb();

//initial route
rootRoute(App);

App.listen(env.PORT, (): void => {
    console.log(`server is running in port : ${env.PORT} `);
});
