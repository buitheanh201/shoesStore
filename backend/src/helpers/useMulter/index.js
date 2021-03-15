const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination : (req,filename,callback) => {
        callback(null,path.join(__dirname,'..','..','resources/images'));
    },
    filename : (req,filename,callback) => {
        callback(null,filename.originalname);
    }
})

const upload = multer({ storage });

module.exports = upload;