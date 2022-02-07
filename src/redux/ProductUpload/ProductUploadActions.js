import client from "../client"
import { GET_ALL_PRODUCT, PRODUCT_START_LOADING, PRODUCT_ERROR, PRODUCT_STOP_LOADING, UPDATE_PRODUCT, CREATE_PRODUCT } from "./ProductUploadConstant";

export const getAllProducts=(page,limit)=>async (dispatch) => {
    try {
        dispatch({type:PRODUCT_START_LOADING})
        const {data}=await client.get(`/products?page=${page+1}&limit=${limit}`)
        console.log("api -> ",data);
        dispatch({
            type:GET_ALL_PRODUCT,
            payload:{
                products:data.data.products,
                totalCount:data.count
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({type:PRODUCT_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }
}

export const getProduct=(productId)=> async (dispatch)=>{
    try {
        const {data,status}=await client.get(`/products/${productId}`)
        console.log("api -> ",data);
        if(status === 200) {
            return {...data.data.product}
        }
    } catch (error) {
        console.log(error)
        return 0;
    }
}

export const updateProduct=(product)=>async (dispatch)=>{
    try {
        dispatch({type:PRODUCT_START_LOADING})
        const {_id,...body}=product
        const {data}=await client.patch(`/products/${_id}`,{...body})
        console.log("api -> ",data);
        dispatch({
            type:UPDATE_PRODUCT,
            payload:{
                product:{...data.data.product}
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({type:PRODUCT_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }   
}

export const createProduct=(product)=>async (dispatch,getState)=>{
    try {
        dispatch({type:PRODUCT_START_LOADING})
        const {userData}=getState().auth
        const reqBody={...product,userId:userData.id}
        console.log(reqBody)
        const {data,status}=await client.post(`/products/`,{...reqBody})
        dispatch({
            type:CREATE_PRODUCT,
            payload:{
                product:{...data.data.product}
            }
        })
    } catch (error) {
        console.log(error)
        dispatch({type:PRODUCT_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }   
}