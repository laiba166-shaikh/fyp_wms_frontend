import { GET_ALL_VEHICLE, VEHICLE_START_LOADING, VEHICLE_ERROR, UPDATE_VEHICLE, CREATE_VEHICLE } from "./VehicleConstant";

const initialState = {
    vehicleLoading: false,
    error: "",
    vehicles: [],
    totalCount: 0
}

const VehicleReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case VEHICLE_START_LOADING:
            return { ...state, vehicleLoading: true };
        case VEHICLE_ERROR:
            return { ...state, vehicleLoading: false, error: payload.error };
        case CREATE_VEHICLE:
            return {
                ...state,
                vehicleLoading: false,
                vehicles:[...state.vehicles,{...payload.vehicle}],
                totalCount:state.totalCount+1
            }
        case GET_ALL_VEHICLE:
            return {
                ...state,
                vehicleLoading: false,
                vehicles: [...payload.vehicles],
                totalCount: payload.totalCount
            }
        case UPDATE_VEHICLE:
            return {
                ...state,
                vehicleLoading: false,
                vehicles: state.vehicles.map((vehicle) => {
                    if (vehicle._id === payload.vehicle._id) return { ...payload.vehicle }
                    else return vehicle
                })
            }
        default:
            return state
    }
}

export default VehicleReducer;