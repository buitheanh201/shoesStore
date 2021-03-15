import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PublicRoute from './SiteRoute';
import AdminRoute from './AdminRoute';
import { PrivateRoute } from '@/guards/PrivateRoute'
import { PATH } from '@/constants/Path';
import AuthAPI from './../services/authApi';
import { useDispatch} from 'react-redux';
import * as actionType from '@/actions/auth/actionTypes';

function RootRoute() {
    const dispatch = useDispatch();
    useEffect(() => {
        const handleToken = async() => {
            if (localStorage.getItem('auth.token')) {
                const token = localStorage.getItem('auth.token');
                try{
                    const data = await AuthAPI.login({ token });
                    dispatch({type : actionType.LOGIN_SUCCESS,payload : data})
                }catch(err){
                    console.log(err);
                    localStorage.removeItem('auth.token');
                }
            }
        }
        handleToken();
    }, []);
    return (
        <BrowserRouter>
            <Switch>
                <PrivateRoute path={PATH.MANAGER} component={AdminRoute} />
                <Route path={PATH.HOME} component={PublicRoute} />
            </Switch>
        </BrowserRouter>
    );
}

export default RootRoute;