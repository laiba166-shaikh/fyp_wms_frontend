import { GET_ALL_DRIVER, DRIVER_START_LOADING, DRIVER_ERROR, DRIVER_STOP_LOADING, UPDATE_DRIVER, CREATE_DRIVER } from "./DriverConstant";

const initialState = {
    driverLoading: false,
    error: "",
    drivers: [],
    totalCount: 0
}

const DriverReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case DRIVER_START_LOADING:
            return { ...state, driverLoading: true };
        case DRIVER_STOP_LOADING:
            return { ...state, driverLoading: false };
        case DRIVER_ERROR:
            return { ...state, driverLoading: false, error: payload.error };
        case CREATE_DRIVER:
            return {
                ...state,
                driverLoading: false,
                drivers: [...state.drivers, { ...payload.driver }],
                totalCount: state.totalCount + 1
            }
        case GET_ALL_DRIVER:
            return {
                ...state,
                driverLoading: false,
                drivers: [...payload.drivers],
                totalCount: payload.totalCount
            }
        case UPDATE_DRIVER:
            return {
                ...state,
                driverLoading: false,
                drivers: state.drivers.map((driver) => {
                    if (driver._id === payload.driver._id) return { ...payload.driver }
                    else return driver
                })
            }
        default:
            return state
    }
}

export default DriverReducer;