import { GET_ALL_VENDOR, VENDOR_START_LOADING, VENDOR_ERROR, VENDOR_STOP_LOADING, UPDATE_VENDOR, CREATE_VENDOR } from "./VendorConstant";

const initialState = {
    vendorLoading: false,
    error: "",
    vendors: [],
    totalCount: 0
}

const VendorReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case VENDOR_START_LOADING:
            return { ...state, vendorLoading: true };
        case VENDOR_STOP_LOADING:
            return { ...state, vendorLoading: false };
        case VENDOR_ERROR:
            return { ...state, vendorLoading: false, error: payload.error };
        case CREATE_VENDOR:
            return {
                ...state,
                vendorLoading: false,
                vendors: [...state.vendors, { ...payload.vendor }],
                totalCount: state.totalCount + 1
            }
        case GET_ALL_VENDOR:
            return {
                ...state,
                vendorLoading: false,
                vendors: [...payload.vendors],
                totalCount: payload.totalCount
            }
        case UPDATE_VENDOR:
            return {
                ...state,
                vendorLoading: false,
                vendors: state.vendors.map((vendor) => {
                    if (vendor._id === payload.vendor._id) return { ...payload.vendor }
                    else return vendor
                })
            }
        default:
            return state
    }
}

export default VendorReducer