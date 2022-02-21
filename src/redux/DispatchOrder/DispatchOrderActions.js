import client from "../client"
import { GET_ALL_DISPATCH_ORDER, DISPATCH_ORDER_START_LOADING, DISPATCH_ORDER_ERROR, DISPATCH_ORDER_STOP_LOADING, UPDATE_DISPATCH_ORDER, CREATE_DISPATCH_ORDER } from "./DispatchOrderConstant";

export const getAllOrders = (page, limit) => async (dispatch) => {
    try {
        dispatch({ type: DISPATCH_ORDER_START_LOADING })
        const { data } = await client.get(`/dispatch-orders?page=${page + 1}&limit=${limit}`)
        dispatch({
            type: GET_ALL_DISPATCH_ORDER,
            payload: {
                orders: data.data.dispatchOrders,
                totalCount: data.count
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({ type: DISPATCH_ORDER_ERROR, payload: { error: "Something went wrong" } })
        return 0;
    }
}

export const getDispatchOrder=(dispatchOrderId)=> async (dispatch)=>{
    try {
        const {data:{data},status}=await client.get(`/dispatch-orders/${dispatchOrderId}`)
        const {dispatchOrder:{userId,...orderData},orderGroups}=data

        const mapReturnOrder= {
            companyId:orderGroups[0].Inventory.Company._id,
            warehouseId:orderGroups[0].Inventory.Warehouse._id,
            company:orderGroups[0].Inventory.Company,
            warehouse:orderGroups[0].Inventory.Warehouse,
            products:orderGroups.map(({quantity,Inventory})=>{
                const {Product,Company,Warehouse,availableQuantity,...inventoryData} = Inventory
                return {
                    product:Product,
                    inventory: inventoryData,
                    quantity:quantity,
                    availableQuantity:availableQuantity
                }
            }),
            ...orderData
        }
        if(status === 200) {
            return mapReturnOrder
        }
    } catch (error) {
        console.log(error)
        return 0;
    }
}

export const createDispatchOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: DISPATCH_ORDER_START_LOADING })
        const { userData } = getState().auth
        const reqBody = { ...order, userId: userData.id }
        const { data } = await client.post(`/dispatch-orders/`, { ...reqBody })
        dispatch({
            type: CREATE_DISPATCH_ORDER,
            payload: {
                order: { ...data.data.dispatchOrder[0] }
            }
        })
    } catch (error) {
        console.log(error)
        dispatch({ type: DISPATCH_ORDER_ERROR, payload: { error: "Something went wrong" } })
        return 0;
    }
}

export const getCompanyWarehouses = (companyId) => async (dispatch) => {
    try {
        console.log("action",companyId)
        if(companyId){
            const { data, status } = await client.get(`/dispatch-orders/warehouses/${companyId}`)
            if (status === 200) {
                return [...data.data.warehouses]
            }
        }
    } catch (error) {
        console.log(error)
        dispatch({ type: DISPATCH_ORDER_ERROR, payload: { error: "Something went wrong" } })
    }
}

export const getCompanyWarehouseProducts = (companyId, warehouseId) => async (dispatch) => {
    try {
        if (companyId && warehouseId) {
            const { data, status } = await client.get(`/dispatch-orders/products/${companyId}/${warehouseId}`)
            if (status === 200) {
                return [...data.data.products]
            }
        }
    } catch (error) {
        console.log(error)
        return 0;
    }
}

export const getCompanyWarehouseProductInventory = (companyId, warehouseId,productId) => async (dispatch) => {
    try {
        if (companyId && warehouseId && productId) {
            const { data, status } = await client.get(`/dispatch-orders/inventories/${companyId}/${warehouseId}/${productId}`)
            if (status === 200) {
                return {...data.data.inventory}
            }
        }
    } catch (error) {
        console.log(error)
        return 0;
    }
}