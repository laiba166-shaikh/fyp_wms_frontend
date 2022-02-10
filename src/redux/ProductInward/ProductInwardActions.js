import client from "../client"
import { GET_ALL_PRODUCT_INWARD, PRODUCT_INWARD_START_LOADING, PRODUCT_INWARD_ERROR, PRODUCT_INWARD_STOP_LOADING, UPDATE_PRODUCT_INWARD, CREATE_PRODUCT_INWARD } from "./ProductInwardConstants";

export const getAllProductInward=(page,limit)=>async (dispatch) => {
    try {
        dispatch({type:PRODUCT_INWARD_START_LOADING})
        const {data}=await client.get(`/product-inwards?page=${page+1}&limit=${limit}`)
        dispatch({
            type:GET_ALL_PRODUCT_INWARD,
            payload:{
                productInwards:data.data.productInwards,
                totalCount:data.count
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({type:PRODUCT_INWARD_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }
}

export const getProductInward=(productInwardId)=> async (dispatch)=>{
    try {
        const {data:{data},status}=await client.get(`/product-inwards/${productInwardId}`)
        console.log("api -> ",data);
        if(status === 200) {
            return {
                productInward:{...data.productInward},
                inwardProducts:data.inwardGroups.map((inwardProd)=>({product:inwardProd.Product,quantity:inwardProd.quantity})) //Product will also contain uom
            }
        }
    } catch (error) {
        console.log(error)
        return 0;
    }
}   

export const createProductInward=(productInward)=>async (dispatch,getState)=>{
    try {
        dispatch({type:PRODUCT_INWARD_START_LOADING})
        const {userData}=getState().auth
        const reqBody={...productInward,userId:userData.id}
        const {data}=await client.post(`/product-inwards/`,{...reqBody})
        console.log("prod inw", data)
        dispatch({
            type:CREATE_PRODUCT_INWARD,
            payload:{
                productInward:{...data.data.productInward[0]}
            }
        })
    } catch (error) {
        console.log(error)
        dispatch({type:PRODUCT_INWARD_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }   
}