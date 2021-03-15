const route = require('express').Router();
const AuthController = require('./../app/controllers/AuthController');
const upload = require('./../helpers/useMulter');

//level 2 

route.post('/:id/cart',AuthController.addToCart);
route.put('/:id/cart/:idproduct',AuthController.editCart);
route.delete('/:id/cart/:idproduct',AuthController.removeItemCart)

route.post('/login',AuthController.login)
route.post('/loginfacebook',AuthController.loginWithFB)
route.post('/logingoogle',AuthController.loginWithGoogle)
route.post('/existemail',AuthController.existEmail)

//level 1 
route.post('/signup',AuthController.signup)
route.get('/',AuthController.findAll)
route.get('/:id',AuthController.findOne)
route.post('/',AuthController.register);
route.put('/:id',upload.single('avatar'),AuthController.update);


module.exports = route;
