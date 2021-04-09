import { Application } from 'express';
import ProductRoute from './ProductRoute';
import AuthRoute from './AuthRoute';
// import AccountRoute from './AccountRoute';

const rootRoute = (App: Application) => {
    App.use('/api/v1/auth',AuthRoute);
    App.use('/api/v1/product', ProductRoute);
};

export default rootRoute;
