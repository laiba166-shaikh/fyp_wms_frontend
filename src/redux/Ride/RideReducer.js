import { GET_ALL_RIDE, RIDE_START_LOADING, RIDE_ERROR, RIDE_STOP_LOADING, UPDATE_RIDE, CREATE_RIDE } from "./RideConstant";

const initialState = {
    rideLoading: false,
    error: "",
    rides: [],
    totalCount: 0
}

const RideReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case RIDE_START_LOADING:
            return { ...state, rideLoading: true };
        case RIDE_STOP_LOADING:
            return { ...state, rideLoading: false };
        case RIDE_ERROR:
            return { ...state, rideLoading: false, error: payload.error };
        case CREATE_RIDE:
            return {
                ...state,
                rideLoading: false,
                rides: [...state.rides, { ...payload.ride }],
                totalCount: state.totalCount + 1
            }
        case GET_ALL_RIDE:
            return {
                ...state,
                rideLoading: false,
                rides: [...payload.rides],
                totalCount: payload.totalCount
            }
        case UPDATE_RIDE:
            return {
                ...state,
                rideLoading: false,
                rides: state.rides.map((ride) => {
                    if (ride._id === payload.ride._id) return { ...payload.ride}
                    else return ride
                })
            }
        default:
            return state
    }
}

export default RideReducer;