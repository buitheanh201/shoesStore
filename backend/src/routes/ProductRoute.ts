import { Router } from 'express';
import multer from 'middlewares/handleUpload';
import { findProductById, findAccountById } from 'middlewares/handleParams';
import { isMemberShip, isAuthentication } from 'middlewares/handlePermission';
import { accessToken  } from 'middlewares/handleToken';
import ProductController from 'controllers/ProductController';

const route = Router();

route.get('/:id', ProductController.findOne);

route.get('/', ProductController.findAll);

route.post('/:idUser',
    accessToken,
    isAuthentication,
    isMemberShip,
    multer.array('imageGallery', 10),
    ProductController.create
);
route.put('/:id/:idUser',
    accessToken,
    isAuthentication,
    isMemberShip,
    multer.array('imageGallery',10),
    ProductController.update
);
// route.delete('/:id-:folderID',ProductController.delete)

//handle params
route.param('id', findProductById);
route.param('idUser', findAccountById);

export default route;
