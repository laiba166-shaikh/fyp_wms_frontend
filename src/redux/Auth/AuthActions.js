import client from "../client.js";
import { AUTH_START_LOAD, AUTH_ERROR, USER_SIGN_IN, LOGOUT } from "./AuthConstant.js";

export const signin=(email,password)=>async (dispatch)=>{
    try {
        dispatch({type:AUTH_START_LOAD})
        const {data} = await client.post(`/auth/signin`,{email,password});
        const {role,...userData}=data.data.user
        dispatch({
            type:USER_SIGN_IN,
            payload:{
                token:data.token,
                userRole:data.data.user.role,
                user:userData
            }
        })
    } catch (error) {
        dispatch({type:AUTH_ERROR,payload:{errorMessage:"Something went wrong"}})
        console.log(error.response)
    }
}

export const signout=()=>async (dispatch)=>{
    dispatch({type:LOGOUT})
}