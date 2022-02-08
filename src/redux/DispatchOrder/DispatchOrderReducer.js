
import { GET_ALL_DISPATCH_ORDER, DISPATCH_ORDER_START_LOADING, DISPATCH_ORDER_ERROR, DISPATCH_ORDER_STOP_LOADING, UPDATE_DISPATCH_ORDER, CREATE_DISPATCH_ORDER } from "./DispatchOrderConstant";

const initialState = {
    dispatchOrderLoading: false,
    error: "",
    dispatchOrders: [],
    totalCount: 0
}

const DispatchOrderReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case DISPATCH_ORDER_START_LOADING:
            return { ...state, dispatchOrderLoading: true };
        case DISPATCH_ORDER_STOP_LOADING:
            return { ...state, dispatchOrderLoading: false };
        case DISPATCH_ORDER_ERROR:
            return { ...state, dispatchOrderLoading: false, error: payload.error };
        case CREATE_DISPATCH_ORDER:
            return {
                ...state,
                dispatchOrderLoading: false,
                dispatchOrders:[...state.dispatchOrders,{...payload.order}],
                totalCount:state.totalCount+1
            }
        case GET_ALL_DISPATCH_ORDER:
            return {
                ...state,
                dispatchOrdersLoading: false,
                dispatchOrders: [...payload.orders],
                totalCount: payload.totalCount
            }
        case UPDATE_DISPATCH_ORDER:
            return {
                ...state,
                dispatchOrdersLoading: false,
                dispatchOrders: state.dispatchOrders.map((order) => {
                    if (order._id === payload.order._id) return { ...payload.order }
                    else return order
                })
            }
        default:
            return state
    }
}

export default DispatchOrderReducer;