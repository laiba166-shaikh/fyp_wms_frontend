import axios from "axios"
import client, { getURL, exportClient } from "../client"
import { INVENTORY_START_LOADING, INVENTORY_STOP_LOADING, GET_ALL_INVENTORY, INVENTORY_ERROR, EXPORT_INVENTORY } from "./InventoryConstant"

export const getAllInventories = (page, limit) => async (dispatch) => {
    try {
        dispatch({ type: INVENTORY_START_LOADING })
        const { data } = await client.get(`/inventories?page=${page + 1}&limit=${limit}`)
        dispatch({
            type: GET_ALL_INVENTORY,
            payload: {
                inventories: data.data.inventories,
                totalCount: data.count
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({ type: INVENTORY_ERROR, payload: { error: "Something went wrong" } })
        return 0;
    }
}

export const exportInventories = () => async (dispatch) => {
    try {
        dispatch({ type: INVENTORY_START_LOADING })

        const { data } = await exportClient.get(`/inventories/export`, {
            responseType: 'blob'
        })

        dispatch({
            type: EXPORT_INVENTORY,
            payload: {
                exportedInventories: data,
            }
        })
        return 1;
    } catch (error) {
        dispatch({ type: INVENTORY_ERROR, payload: { error: "Something went wrong" } })
        return 0;
    }
}

//get inventory by product id