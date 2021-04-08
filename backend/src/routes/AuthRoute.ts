import { Router } from 'express';
import AuthController from 'controllers/AuthController';
import { signUpValidator } from 'middlewares/handleValidation';
const route = Router();

route.post('/signin',AuthController.signin);

route.post('/signup',
        signUpValidator,
        AuthController.signup
);

export default route;
