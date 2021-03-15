import authAPI from '@/services/authApi';
import authApi from '../../services/authApi';
import * as actionType from './actionTypes';
export const login = (data) => dispatch => {
        dispatch({ type: actionType.LOGIN_REQUEST });
        authAPI.login(data)
                .then(data => dispatch({ type: actionType.LOGIN_SUCCESS, payload: data }))
                .catch(err => dispatch({ type: actionType.LOGIN_FAILURE, error: err }))
}

export const logout = () => ({ type: actionType.LOG_OUT });

export const addToCart = (idaccount, data) => dispatch => {
        authApi.addToCart(idaccount, data)
                .then(({ data }) => dispatch({ type: actionType.ADD_TO_CART, payload: data }))
                .catch(err => console.log(err));
}
export const loginFacebook = (data) => dispatch => {
        authApi.loginFacebook(data)
                .then(data => {
                     dispatch({ type: actionType.LOGIN_SUCCESS, payload: data })
                })
                .catch(err => dispatch({ type: actionType.LOGIN_FAILURE, error: err }))
}

export const editCart = (id,idproduct,data) => dispatch => {
        authApi.editCart(id,idproduct,data)
                .then(({data}) => dispatch({type : actionType.EDIT_CART,payload : data}))
                .catch(err => console.log(err));
}
export const deleteCartItem = (id,idproduct) => dispatch => {
        authApi.deleteCartItem(id,idproduct)
                .then(({data}) => dispatch({type : actionType.EDIT_CART,payload : data}))
                .catch(err => console.log(err));
}