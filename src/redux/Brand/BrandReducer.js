import { GET_ALL_BRAND, BRAND_START_LOADING, BRAND_ERROR, BRAND_STOP_LOADING, UPDATE_BRAND, CREATE_BRAND } from "./BrandConstant";

const initialState = {
    brandLoading: false,
    error: "",
    brands: [],
    totalCount: 0
}

const BrandReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case BRAND_START_LOADING:
            return { ...state, brandLoading: true };
        case BRAND_STOP_LOADING:
            return { ...state, brandLoading: false };
        case BRAND_ERROR:
            return { ...state, brandLoading: false, error: payload.error };
        case CREATE_BRAND:
            return {
                ...state,
                brandLoading: false,
                brands:[...state.brands,{...payload.brand}],
                totalCount:state.totalCount+1
            }
        case GET_ALL_BRAND:
            return {
                ...state,
                brandLoading: false,
                brands: [...payload.brands],
                totalCount: payload.totalCount
            }
        case UPDATE_BRAND:
            return {
                ...state,
                brandLoading: false,
                brands: state.brands.map((brand) => {
                    if (brand._id === payload.brand._id) return { ...payload.brand }
                    else return brand
                })
            }
        default:
            return state
    }
}

export default BrandReducer