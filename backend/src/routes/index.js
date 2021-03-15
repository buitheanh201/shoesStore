const AuthRoute = require('./AuthRoute');
const ProductRoute = require('./ProductRoute');
const CategoryRoute = require('./CategoryRoute');

const init = (app) => {
    app.use('/api/v1/auth',AuthRoute);
    app.use('/api/v1/product',ProductRoute);
    app.use('/api/v1/category',CategoryRoute);
}

module.exports = { init }