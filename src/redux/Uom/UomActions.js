import client from "../client"
import { GET_ALL_UOM, UOM_START_LOADING, UOM_ERROR, UOM_STOP_LOADING, UPDATE_UOM, CREATE_UOM } from "./UomConstant";

export const getAllUoms=(page,limit)=>async (dispatch) => {
    try {
        dispatch({type:UOM_START_LOADING})
        const {data}=await client.get(`/uoms?page=${page+1}&limit=${limit}`)
        console.log(" get api -> ",data);
        dispatch({
            type:GET_ALL_UOM,
            payload:{
                uoms:data.data.uoms,
                totalCount:data.count
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({type:UOM_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }
}

export const getUom=(uomId)=> async (dispatch)=>{
    try {
        const {data,status}=await client.get(`/uoms/${uomId}`)
        if(status === 200) {
            return {...data.data.uom}
        }
    } catch (error) {
        console.log(error)
        return 0;
    }
}

export const updateUom=(uom)=>async (dispatch)=>{
    try {
        dispatch({type:UOM_START_LOADING})
        const {_id,...body}=uom
        const {data}=await client.patch(`/uoms/${_id}`,{...body})
        dispatch({
            type:UPDATE_UOM,
            payload:{
                uom:{...data.data.uom}
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({type:UOM_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }   
}

export const createUom=(uom)=>async (dispatch,getState)=>{
    try {
        dispatch({type:UOM_START_LOADING})
        const {userData}=getState().auth
        const reqBody={...uom,userId:userData.id}
        const {data}=await client.post(`/uoms/`,{...reqBody})
        dispatch({
            type:CREATE_UOM,
            payload:{
                uom:{...data.data.uom}
            }
        })
    } catch (error) {
        console.log(error)
        dispatch({type:UOM_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }   
}