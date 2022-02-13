import client from "../client"
import { GET_ALL_VEHICLE_TYPE, VEHICLE_TYPE_START_LOADING, VEHICLE_TYPE_ERROR, UPDATE_VEHICLE_TYPE, CREATE_VEHICLE_TYPE } from "./VehicleTypeConstant";

export const getAllVehicleType=(page,limit)=>async (dispatch) => {
    try {
        dispatch({type:VEHICLE_TYPE_START_LOADING})
        const {data}=await client.get(`/logistics/vehicle-types/?page=${page+1}&limit=${limit}`)
        console.log(" get api -> ",data);
        dispatch({
            type:GET_ALL_VEHICLE_TYPE,
            payload:{
                VEHICLE_TYPEs:data.data.vehicleTypes,
                totalCount:data.count
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({type:VEHICLE_TYPE_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }
}

export const getVehicleType=(vehicleTypeId)=> async (dispatch)=>{
    try {
        const {data,status}=await client.get(`/logistics/vehicle-types/${vehicleTypeId}`)
        if(status === 200) {
            return {...data.data.vehicleType}
        }
    } catch (error) {
        console.log(error)
        return 0;
    }
}

export const updateVehicleType=(vehicleType)=>async (dispatch)=>{
    try {
        dispatch({type:VEHICLE_TYPE_START_LOADING})
        const {_id,...body}=vehicleType
        const {data}=await client.patch(`/logistics/vehicle-types/${_id}`,{...body})
        dispatch({
            type:UPDATE_VEHICLE_TYPE,
            payload:{
                vehicleType:{...data.data.vehicleType}
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({type:VEHICLE_TYPE_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }   
}

export const createVehicleType=(vehicleType)=>async (dispatch,getState)=>{
    try {
        dispatch({type:VEHICLE_TYPE_START_LOADING})
        const {userData}=getState().auth
        const reqBody={...vehicleType,userId:userData.id}
        const {data}=await client.post(`/logistics/vehicle-types/`,{...reqBody})
        dispatch({
            type:CREATE_VEHICLE_TYPE,
            payload:{
                vehicleType:{...data.data.vehicleType}
            }
        })
    } catch (error) {
        console.log(error)
        dispatch({type:VEHICLE_TYPE_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }   
}