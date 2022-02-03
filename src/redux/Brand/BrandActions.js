import client from "../client"
import { GET_ALL_BRAND, BRAND_START_LOADING, BRAND_ERROR, BRAND_STOP_LOADING, UPDATE_BRAND, CREATE_BRAND } from "./BrandConstant";

export const getAllBrands=(page,limit)=>async (dispatch) => {
    try {
        dispatch({type:BRAND_START_LOADING})
        const {data}=await client.get(`/brands?page=${page+1}&limit=${limit}`)
        console.log(" get api -> ",data);
        dispatch({
            type:GET_ALL_BRAND,
            payload:{
                brands:data.data.brands,
                totalCount:data.count
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({type:BRAND_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }
}

export const getBrand=(brandId)=> async (dispatch)=>{
    try {
        const {data,status}=await client.get(`/brands/${brandId}`)
        if(status === 200) {
            return {...data.data.brand}
        }
    } catch (error) {
        console.log(error)
        return 0;
    }
}

export const updateBrand=(brand)=>async (dispatch)=>{
    try {
        dispatch({type:BRAND_START_LOADING})
        const {_id,...body}=brand
        const {data}=await client.patch(`/brands/${_id}`,{...body})
        dispatch({
            type:UPDATE_BRAND,
            payload:{
                brand:{...data.data.brand}
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({type:BRAND_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }   
}

export const createBrand=(brand)=>async (dispatch,getState)=>{
    try {
        dispatch({type:BRAND_START_LOADING})
        const {userData}=getState().auth
        const reqBody={...brand,userId:userData.id}
        const {data}=await client.post(`/brands/`,{...reqBody})
        dispatch({
            type:CREATE_BRAND,
            payload:{
                brand:{...data.data.brand}
            }
        })
    } catch (error) {
        console.log(error)
        dispatch({type:BRAND_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }   
}