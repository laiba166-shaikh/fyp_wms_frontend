import client from "../client"
import { GET_ALL_DRIVER, DRIVER_START_LOADING, DRIVER_ERROR, DRIVER_STOP_LOADING, UPDATE_DRIVER, CREATE_DRIVER } from "./DriverConstant";

export const getAllDriver = (page, limit) => async (dispatch) => {
    try {
        dispatch({ type: DRIVER_START_LOADING })
        const { data } = await client.get(`/logistics/drivers?page=${page + 1}&limit=${limit}`)
        dispatch({
            type: GET_ALL_DRIVER,
            payload: {
                drivers: data.data.drivers,
                totalCount: data.count
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({ type: DRIVER_ERROR, payload: { error: "Something went wrong" } })
        return 0;
    }
}

export const getDriver = (driverId) => async (dispatch) => {
    try {
        const { data, status } = await client.get(`/logistics/drivers/${driverId}`)
        if (status === 200) {
            return { ...data.data.driver }
        }
    } catch (error) {
        console.log(error)
        return 0;
    }
}

export const updateDriver = (driver) => async (dispatch) => {
    try {
        dispatch({ type: DRIVER_START_LOADING })
        const { _id, ...body } = driver
        const { data } = await client.patch(`/logistics/drivers/${_id}`, { ...body })
        dispatch({
            type: UPDATE_DRIVER,
            payload: {
                driver: { ...data.data.driver }
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({ type: DRIVER_ERROR, payload: { error: "Something went wrong" } })
        return 0;
    }
}

export const createDriver = (driver) => async (dispatch, getState) => {
    try {
        dispatch({ type: DRIVER_START_LOADING })
        const { userData } = getState().auth
        const reqBody = { ...driver, userId: userData.id }
        const { data } = await client.post(`/logistics/drivers/`, { ...reqBody })
        dispatch({
            type: CREATE_DRIVER,
            payload: {
                driver: { ...data.data.driver }
            }
        })
    } catch (error) {
        console.log(error)
        dispatch({ type: DRIVER_ERROR, payload: { error: "Something went wrong" } })
        return 0;
    }
}