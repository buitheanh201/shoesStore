const route = require('express').Router();
const CategoryController = require('./../app/controllers/CategoryController');
const upload = require('./../helpers/useMulter');

route.get('/',CategoryController.findAll);
route.get('/:id',CategoryController.findOne);
route.post('/',upload.single('categoryImage'),CategoryController.create);
route.put('/:id',upload.single('categoryImage'),CategoryController.update);
route.delete('/:id-:folderID',CategoryController.delete);

module.exports = route;