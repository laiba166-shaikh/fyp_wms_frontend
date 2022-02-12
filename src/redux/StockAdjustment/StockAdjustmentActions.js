import client from "../client"
import { GET_ALL_STOCK_ADJUST, STOCK_ADJUST_START_LOADING, STOCK_ADJUST_ERROR, STOCK_ADJUST_STOP_LOADING, DELETE_STOCK_ADJUST, CREATE_STOCK_ADJUST } from "./StockAdjustmentConstant";

export const getAllStockAdjustment = (page, limit) => async (dispatch) => {
    try {
        dispatch({ type: STOCK_ADJUST_START_LOADING })
        const { data } = await client.get(`/inventory-adjustments?page=${page + 1}&limit=${limit}`)
        console.log("adjustemnts ", data)
        dispatch({
            type: GET_ALL_STOCK_ADJUST,
            payload: {
                stockAdjustments: data.data.inventoryAdjustments,
                totalCount: data.count
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({ type: STOCK_ADJUST_ERROR, payload: { error: "Something went wrong" } })
        return 0;
    }
}

export const getStockAdjustment = (stockAdjustId) => async (dispatch) => {
    try {
        const { data: { data }, status } = await client.get(`/inventory-adjustments/${stockAdjustId}`)
        const { comment, adjustmentQuantity, Inventory, _id } = data.inventoryAdjustment
        if (status === 200) {
            return {
                product: [{
                    product: { ...Inventory.Product },
                    quantity: adjustmentQuantity
                }],
                comment,
                companyId: Inventory.companyId,
                warehouseId: Inventory.warehouseId,
                id: _id
            }
        }
    } catch (error) {
        console.log(error)
        return 0;
    }
}

export const createStockAdjust = (inventories) => async (dispatch) => {
    try {
        dispatch({ type: STOCK_ADJUST_START_LOADING })
        const { data } = await client.post(`/inventory-adjustments/`, { inventories })
        console.log("stock adjust", data)
    } catch (error) {
        console.log(error)
        dispatch({ type: STOCK_ADJUST_ERROR, payload: { error: "Something went wrong" } })
        return 0;
    }
}

export const deleteStockAdjust = (adjustmentId) => async (dispatch) => {
    try {
        const { data } = await client.delete(`/inventory-adjustments/${adjustmentId}`)
        console.log("delete", data)
        dispatch({
            type: DELETE_STOCK_ADJUST,
            payload: {
                id: adjustmentId
            }
        })
        return 1
    } catch (error) {
        console.log(error)
        dispatch({ type: STOCK_ADJUST_ERROR, payload: { error: "Something went wrong" } })
        return 0;
    }
}