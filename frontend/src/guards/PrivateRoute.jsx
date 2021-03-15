import React from 'react';
import { Route,Redirect } from 'react-router-dom';
import { PATH } from '@/constants/Path';

export const PrivateRoute = ({component : Component,...rest}) => {
     return <Route {...rest} render = {props => 
                localStorage.getItem('auth.token') ? 
                        <Component {...props} /> : 
                        <Redirect to = {PATH.LOGIN} />
     } />
}