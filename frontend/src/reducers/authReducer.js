import * as Types from '@/actions/auth/actionTypes';
import { getStorage,clearItemStorage } from '@/helpers/Storage';

const initialState = {
    account : '',
}

const myReducer = (state = initialState,action) => {
     switch(action.type){
        case Types.LOGIN_REQUEST : {
            return {...state,isFetchingLogin : true}
        }
        case Types.LOGIN_SUCCESS : {
            if(action.payload.message === 'success') clearItemStorage('products');
            return {...state,isFetchingLogin : false,account : action.payload}
        }
        case Types.LOGIN_FAILURE : {
            return {...state,isFetchingLogin : false,account : action.error}
        }
        case Types.LOG_OUT : {
            localStorage.removeItem('auth.token');
            return {...state,account : ''}
        }
        case Types.ADD_TO_CART : {
            const account = {...state.account.data};
            const { payload } =  action;
            account.carts = payload;
            return {...state,account : {...state.account,data : account}}
        }
        case Types.EDIT_CART : {
            const account = {...state.account.data};
            const { payload } =  action;
            account.carts = payload;
            return {...state,account : {...state.account,data : account}}
        }
        case Types.UPDATE_ACCOUNT : {
            return {...state,account : {...state.account,data : action.payload}}
        }
        default : return {...state}
     }
}


export default myReducer;