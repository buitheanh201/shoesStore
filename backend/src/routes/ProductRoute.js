const route = require('express').Router();
const ProductController = require('./../app/controllers/ProductController');
const multerUpload = require('./../helpers/useMulter');

route.get('/:id',ProductController.findOne);
route.get('/',ProductController.findAll);
route.post('/',multerUpload.array('galleryProduct',10),ProductController.create);
route.put('/:id',multerUpload.array('galleryProduct',10),ProductController.update);
route.delete('/:id-:folderID',ProductController.delete)

module.exports = route;