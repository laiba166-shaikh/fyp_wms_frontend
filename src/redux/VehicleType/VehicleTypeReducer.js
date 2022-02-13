import { GET_ALL_VEHICLE_TYPE, VEHICLE_TYPE_START_LOADING, VEHICLE_TYPE_ERROR, UPDATE_VEHICLE_TYPE, CREATE_VEHICLE_TYPE } from "./VehicleTypeConstant";

const initialState = {
    vehicleTypeLoading: false,
    error: "",
    vehicleTypes: [],
    totalCount: 0
}

const VehicleTypeReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case VEHICLE_TYPE_START_LOADING:
            return { ...state, vehicleTypeLoading: true };
        case VEHICLE_TYPE_ERROR:
            return { ...state, vehicleTypeLoading: false, error: payload.error };
        case CREATE_VEHICLE_TYPE:
            return {
                ...state,
                vehicleTypeLoading: false,
                vehicleTypes:[...state.vehicleTypes,{...payload.vehicleType}],
                totalCount:state.totalCount+1
            }
        case GET_ALL_VEHICLE_TYPE:
            return {
                ...state,
                vehicleTypeLoading: false,
                vehicleTypes: [...payload.vehicleTypes],
                totalCount: payload.totalCount
            }
        case UPDATE_VEHICLE_TYPE:
            return {
                ...state,
                vehicleTypeLoading: false,
                vehicleTypes: state.vehicleTypes.map((vehicleType) => {
                    if (vehicleType._id === payload.vehicleType._id) return { ...payload.vehicleType }
                    else return vehicleType
                })
            }
        default:
            return state
    }
}

export default VehicleTypeReducer