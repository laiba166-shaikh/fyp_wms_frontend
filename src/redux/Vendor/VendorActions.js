import client from "../client"
import { GET_ALL_VENDOR, VENDOR_START_LOADING, VENDOR_ERROR, VENDOR_STOP_LOADING, UPDATE_VENDOR, CREATE_VENDOR } from "./VendorConstant";

export const getAllVendors = (page, limit) => async (dispatch) => {
    try {
        dispatch({ type: VENDOR_START_LOADING })
        const { data } = await client.get(`/logistics/vendors?page=${page + 1}&limit=${limit}`)
        dispatch({
            type: GET_ALL_VENDOR,
            payload: {
                vendors: data.data.vendors,
                totalCount: data.count
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({ type: VENDOR_ERROR, payload: { error: "Something went wrong" } })
        return 0;
    }
}

export const getVendor = (vendorId) => async (dispatch) => {
    try {
        const { data, status } = await client.get(`/logistics/vendors/${vendorId}`)
        if (status === 200) {
            return { ...data.data.vendor }
        }
    } catch (error) {
        console.log(error)
        return 0;
    }
}

export const updateVendor = (vendor) => async (dispatch) => {
    try {
        dispatch({ type: VENDOR_START_LOADING })
        const { _id, ...body } = vendor
        const { data } = await client.patch(`/logistics/vendors/${_id}`, { ...body })
        dispatch({
            type: UPDATE_VENDOR,
            payload: {
                vendor: { ...data.data.vendor }
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({ type: VENDOR_ERROR, payload: { error: "Something went wrong" } })
        return 0;
    }
}

export const createVendor = (vendor) => async (dispatch, getState) => {
    try {
        dispatch({ type: VENDOR_START_LOADING })
        const { userData } = getState().auth
        const reqBody = { ...vendor, userId: userData.id }
        const { data } = await client.post(`/logistics/vendors/`, { ...reqBody })
        dispatch({
            type: CREATE_VENDOR,
            payload: {
                vendor: { ...data.data.vendor }
            }
        })
    } catch (error) {
        console.log(error)
        dispatch({ type: VENDOR_ERROR, payload: { error: "Something went wrong" } })
        return 0;
    }
}