import client from "../client"
import { GET_ALL_VEHICLE, VEHICLE_START_LOADING, VEHICLE_ERROR, UPDATE_VEHICLE, CREATE_VEHICLE } from "./VehicleConstant";

export const getAllVehicle=(page,limit)=>async (dispatch) => {
    try {
        dispatch({type:VEHICLE_START_LOADING})
        const {data}=await client.get(`/logistics/vehicles/?page=${page+1}&limit=${limit}`)
        console.log(" get api -> ",data);
        dispatch({
            type:GET_ALL_VEHICLE,
            payload:{
                vehicles:data.data.vehicles,
                totalCount:data.count
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({type:VEHICLE_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }
}

export const getVehicle=(vehicleId)=> async (dispatch)=>{
    try {
        const {data,status}=await client.get(`/logistics/vehicles/${vehicleId}`)
        if(status === 200) {
            return {...data.data.vehicle}
        }
    } catch (error) {
        console.log(error)
        return 0;
    }
}

export const updateVehicle=(vehicle)=>async (dispatch)=>{
    try {
        dispatch({type:VEHICLE_START_LOADING})
        const {_id,...body}=vehicle
        const {data}=await client.patch(`/logistics/vehicles/${_id}`,{...body})
        dispatch({
            type:UPDATE_VEHICLE,
            payload:{
                vehicle:{...data.data.vehicle}
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({type:VEHICLE_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }   
}

export const createVehicle=(vehicle)=>async (dispatch,getState)=>{
    try {
        dispatch({type:VEHICLE_START_LOADING})
        const {userData}=getState().auth
        const reqBody={...vehicle,userId:userData.id}
        const {data}=await client.post(`/logistics/vehicles/`,{...reqBody})
        dispatch({
            type:CREATE_VEHICLE,
            payload:{
                vehicle:{...data.data.vehicle}
            }
        })
    } catch (error) {
        console.log(error)
        dispatch({type:VEHICLE_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }   
}