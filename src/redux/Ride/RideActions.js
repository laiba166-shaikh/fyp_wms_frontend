import client from "../client"
import { GET_ALL_RIDE, RIDE_START_LOADING, RIDE_ERROR, RIDE_STOP_LOADING, UPDATE_RIDE, CREATE_RIDE } from "./RideConstant";

export const getAllRides = (page, limit) => async (dispatch) => {
    try {
        dispatch({ type: RIDE_START_LOADING })
        const { data } = await client.get(`/logistics/rides?page=${page + 1}&limit=${limit}`)
        dispatch({
            type: GET_ALL_RIDE,
            payload: {
                rides: data.data.rides,
                totalCount: data.count
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({ type: RIDE_ERROR, payload: { error: "Something went wrong" } })
        return 0;
    }
}

export const getRide = (rideId) => async (dispatch) => {
    try {
        const { data, status } = await client.get(`/logistics/rides/${rideId}`)
        if (status === 200) {
            return { ...data.data.ride }
        }
    } catch (error) {
        console.log(error)
        return 0;
    }
}

export const updateRide = (ride) => async (dispatch) => {
    try {
        dispatch({ type: RIDE_START_LOADING })
        const { _id, ...body } = ride
        const { data } = await client.patch(`/logistics/rides/${_id}`, { ...body })
        dispatch({
            type: UPDATE_RIDE,
            payload: {
                ride: { ...data.data.ride }
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({ type: RIDE_ERROR, payload: { error: "Something went wrong" } })
        return 0;
    }
}

export const createRide = (ride) => async (dispatch, getState) => {
    try {
        dispatch({ type: RIDE_START_LOADING })
        const { userData } = getState().auth
        const reqBody = { ...ride, userId: userData.id }
        const { data } = await client.post(`/logistics/rides/`, { ...reqBody })
        // dispatch({
        //     type: CREATE_RIDE,
        //     payload: {
        //         ride: { ...data.data.ride }
        //     }
        // })
        return 1
    } catch (error) {
        console.log(error)
        dispatch({ type: RIDE_ERROR, payload: { error: "Something went wrong" } })
        return 0;
    }
}