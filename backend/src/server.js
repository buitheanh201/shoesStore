const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const route = require('./routes');
const database = require('./config/database');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

//use body parse and parse json
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

//use static file
app.use(express.static(path.join(__dirname, '../public')))

//use cors
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}))

//connect to mongodb 
database.connect()
    .then(() => console.log('connect successfully !'))
    .catch((err) => console.log('connect error !' + err.message));

//initial route
route.init(app);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'public/index.html'));
})



app.listen(port, () => {
    console.log('server is running !')
})