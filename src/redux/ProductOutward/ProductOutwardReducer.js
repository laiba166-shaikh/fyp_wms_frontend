
import { GET_ALL_PRODUCT_OUTWARD, PRODUCT_OUTWARD_START_LOADING, PRODUCT_OUTWARD_ERROR, PRODUCT_OUTWARD_STOP_LOADING, CREATE_PRODUCT_OUTWARD } from "./ProductOutwardConstants";

const initialState = {
    productOutwardLoading: false,
    error: "",
    productOutwards: [],
    totalCount: 0
}

const ProductOutwardReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case PRODUCT_OUTWARD_START_LOADING:
            return { ...state, productOutwardLoading: true };
        case PRODUCT_OUTWARD_STOP_LOADING:
            return { ...state, productOutwardLoading: false };
        case PRODUCT_OUTWARD_ERROR:
            return { ...state, productOutwardLoading: false, error: payload.error };
        case CREATE_PRODUCT_OUTWARD:
            return {
                ...state,
                productOutwardLoading: false,
                productOutwards:[...state.productOutwards],
                totalCount:state.totalCount+1
            }
        case GET_ALL_PRODUCT_OUTWARD:
            return {
                ...state,
                productOutwardLoading: false,
                productOutwards: [...payload.productOutwards],
                totalCount: payload.totalCount
            }
        default:
            return state
    }
}

export default ProductOutwardReducer;