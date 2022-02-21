import client from "../client"
import { GET_ALL_PRODUCT_OUTWARD, PRODUCT_OUTWARD_START_LOADING, PRODUCT_OUTWARD_ERROR, PRODUCT_OUTWARD_STOP_LOADING, CREATE_PRODUCT_OUTWARD } from "./ProductOutwardConstants";

export const getAllProductOutward = (page, limit) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_OUTWARD_START_LOADING })
        const { data } = await client.get(`/product-outwards?page=${page + 1}&limit=${limit}`)
        dispatch({
            type: GET_ALL_PRODUCT_OUTWARD,
            payload: {
                productOutwards: [...data.data.productOutwards],
                totalCount: data.count
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({ type: PRODUCT_OUTWARD_ERROR, payload: { error: "Something went wrong" } })
        return 0;
    }
}

export const getProductOutward=(productOutwardId)=> async (dispatch)=>{
    try {
        const {data,status}=await client.get(`/product-outwards/${productOutwardId}`)
        console.log("api -> ",data);
        const {productOutward,orderGroups,outwardGroups}=data.data
        if(status === 200) {
            return {
                orderData:productOutward,
                products:orderGroups.map(({quantity,Inventory,inventoryId})=>{
                    //check if this product of dispatch order is in outward or not
                    if(outwardGroups.some((outwardProduct)=>outwardProduct.inventoryId === inventoryId)){
                        return {
                            product:Inventory.Product,
                            orderedQuantity:quantity,
                            outwardQuantity:outwardGroups.find((outwardGroup)=>outwardGroup.inventoryId === inventoryId).quantity //outward quantity
                        }
                    }else return null
                }),
            }
        }
    } catch (error) {
        console.log(error)
        return 0;
    }
}

export const getProductOutwardOrders=()=>async (dispatch)=>{
    try {
        const { data,status } = await client.get(`/product-outwards/relations`)
        if(status===200){
            return [...data.data.dispatchOrders]
        }
    } catch (error) {
        console.log(error)
        dispatch({type:PRODUCT_OUTWARD_ERROR,payload:{error:"Something went wrong"}})
    }
}

export const createProductOutward=(productOutward)=>async (dispatch,getState)=>{
    try {
        dispatch({type:PRODUCT_OUTWARD_START_LOADING})
        const {userData}=getState().auth
        const reqBody={...productOutward,userId:userData.id}
        const {data}=await client.post(`/product-outwards/`,{...reqBody})
        console.log("prod out", data)
        dispatch({
            type:CREATE_PRODUCT_OUTWARD,
            payload:{
                productOutward:{...data.data.productOutward[0]}
            }
        })
    } catch (error) {
        console.log(error)
        dispatch({type:PRODUCT_OUTWARD_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }
}