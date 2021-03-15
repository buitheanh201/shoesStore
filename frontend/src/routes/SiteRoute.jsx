import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { PATH } from '@/constants/Path';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Shop from '@/pages/Shop';
import News from '@/pages/News';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import { PrivateRoute } from '@/guards/PrivateRoute';
import Cart from '@/pages/cart';
import DetailProduct from '@/pages/DetailProduct';
import Profile from '@/pages/Profile';
import Category from '@/pages/Category';
import SignUp from '@/pages/SignUp'

function PublicRoute() {
   
    return (
        <div>
            <Header />
            <Switch>
                <Route path = {PATH.PROFILE} component = {Profile} />
                {!localStorage.getItem('auth.token') ?
                    <Route path={PATH.LOGIN} component={Login} />
                    : null
                }
                {!localStorage.getItem('auth.token') ?
                    <Route path={PATH.REGISTER} component={Register} />
                    : null
                }
                <Route path = {PATH.CATEGORY_DETAIAL} component = {Category} />
                <Route path={PATH.DETAIL_PRODUCT} component={DetailProduct} />
                <Route path = {PATH.CART} component = {Cart} />
                <Route path={PATH.NEWS} component={News} />
                <Route path={PATH.ABOUT} component={About} />
                <Route path={PATH.SHOP} component={Shop} />
                <Route path = '/signup' component = {SignUp} />
                <Route path={PATH.HOME} component={Home} exact={true} />
            </Switch>
            <Footer />
        </div>
    );
}

export default PublicRoute;