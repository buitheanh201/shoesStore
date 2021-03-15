import * as type from './../actions/product/actionTypes';

const initialState = {
    allProducts : [],
    detailProduct : {},
}

const myReducer = (state = initialState,action) => {
    switch(action.type){
        case type.PRODUCT_DETAIL_REQUEST : {
            return {...state,isFetchingDetailProduct : true}
        }
        case type.PRODUCT_DETAIL_SUCCESS : {
            return {...state,isFetchingDetailProduct : false,detailProduct : action.payload}
        }
        case type.PRODUCT_DETAIL_FAILURE : {
            return {...state,isFetchingDetailProduct : false,detailProduct : action.error}
        }
        default : return {...state}
    }
}


export default myReducer;