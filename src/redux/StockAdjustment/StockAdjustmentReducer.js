
import { GET_ALL_STOCK_ADJUST, STOCK_ADJUST_START_LOADING, STOCK_ADJUST_ERROR, STOCK_ADJUST_STOP_LOADING, DELETE_STOCK_ADJUST, CREATE_STOCK_ADJUST } from "./StockAdjustmentConstant";

const initialState = {
    stockAdjustmentLoading: false,
    error: "",
    stockAdjustments: [],
    totalCount: 0
}

const StockAdjustmentReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case STOCK_ADJUST_START_LOADING:
            return { ...state, stockAdjustmentLoading: true };
        case STOCK_ADJUST_STOP_LOADING:
            return { ...state, stockAdjustmentLoading: false };
        case STOCK_ADJUST_ERROR:
            return { ...state, stockAdjustmentLoading: false, error: payload.error };
        case GET_ALL_STOCK_ADJUST:
            return {
                ...state,
                stockAdjustmentLoading: false,
                stockAdjustments: [...payload.stockAdjustments],
                totalCount: payload.totalCount
            }
        case DELETE_STOCK_ADJUST:
            return {
                ...state,
                stockAdjustments:state.stockAdjustments.filter((stockAdjust)=>stockAdjust._id !== payload.id),
                totalCount:state.totalCount - 1
            }
        default:
            return state
    }
}

export default StockAdjustmentReducer;