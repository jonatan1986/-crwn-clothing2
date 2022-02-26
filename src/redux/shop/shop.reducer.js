// import SHOP_DATA from "./shop.data"; // file exists but not used
import ShopActionTypes from "./shop.types";

const INITAL_STATE = {
    collections: null,
    isFetching:false,
    errorMesaage:undefined
}

 const shopReducer = (state=INITAL_STATE,action) => {
    switch(action.type){
    case ShopActionTypes.FETCH_COLLECTION_START:
        return {
            ...state,
            isFetching:true
        }
    case ShopActionTypes.FETCH_COLLECTION_SUCCESS:
        return {
            ...state,
            isFetching:false,
            collections: action.payload
        }
    case ShopActionTypes.FETCH_COLLECTION_FAILURE:
        return {
            ...state,
            isFetching:false,
            errorMesaage:action.payload
        }    
    default:return state;
    }   
}

export default shopReducer;