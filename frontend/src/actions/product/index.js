import * as Types from './actionTypes';
import ProductAPI from './../../services/productApi';

export const findOneProduct = (id) => dispatch => {
    dispatch({type : Types.PRODUCT_DETAIL_REQUEST})
    ProductAPI.findOne(id)
                .then(({data}) => dispatch({type : Types.PRODUCT_DETAIL_SUCCESS,payload : data}))
                .catch(err => dispatch({type : Types.PRODUCT_DETAIL_FAILURE,error : err}));
}