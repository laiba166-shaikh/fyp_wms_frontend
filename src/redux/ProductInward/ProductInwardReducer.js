
import { GET_ALL_PRODUCT_INWARD, PRODUCT_INWARD_START_LOADING, PRODUCT_INWARD_ERROR, PRODUCT_INWARD_STOP_LOADING, UPDATE_PRODUCT_INWARD, CREATE_PRODUCT_INWARD, EXPORT_INWARDS } from "./ProductInwardConstants";

const initialState = {
    productInwardLoading: false,
    error: "",
    productInwards: [],
    exportedInwards:false,
    totalCount: 0
}

const ProductInwardReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case PRODUCT_INWARD_START_LOADING:
            return { ...state, productInwardLoading: true };
        case PRODUCT_INWARD_STOP_LOADING:
            return { ...state, productInwardLoading: false };
        case PRODUCT_INWARD_ERROR:
            return { ...state, productInwardLoading: false, error: payload.error };
        case CREATE_PRODUCT_INWARD:
            return {
                ...state,
                productInwardLoading: false,
                productInwards: [...state.productInwards, { ...payload.productInward }],
                totalCount: state.totalCount + 1
            }
        case GET_ALL_PRODUCT_INWARD:
            return {
                ...state,
                productInwardLoading: false,
                productInwards: [...payload.productInwards],
                totalCount: payload.totalCount
            }
        case UPDATE_PRODUCT_INWARD:
            return {
                ...state,
                producInwardLoading: false,
                productInwards: state.productInwards.map((product) => {
                    if (product._id === payload.product._id) return { ...payload.product }
                    else return product
                })
            }
        case EXPORT_INWARDS:
            return {
                ...state,
                producInwardLoading: false,
                exportedInwards: payload.exportedInwards
            }
        default:
            return state
    }
}

export default ProductInwardReducer;