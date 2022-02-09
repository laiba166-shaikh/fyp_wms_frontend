import client from "../client"
import { GET_ALL_DISPATCH_ORDER, DISPATCH_ORDER_START_LOADING, DISPATCH_ORDER_ERROR, DISPATCH_ORDER_STOP_LOADING, UPDATE_DISPATCH_ORDER, CREATE_DISPATCH_ORDER } from "./DispatchOrderConstant";

export const getAllOrders=(page,limit)=>async (dispatch) => {
    try {
        dispatch({type:DISPATCH_ORDER_START_LOADING})
        const {data}=await client.get(`/dispatch-orders?page=${page+1}&limit=${limit}`)
        dispatch({
            type:GET_ALL_DISPATCH_ORDER,
            payload:{
                orders:data.data.dispatchOrders,
                totalCount:data.count
            }
        })
        return 1;
    } catch (error) {
        console.log(error)
        dispatch({type:DISPATCH_ORDER_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }
}

// export const getProductInward=(productInwardId)=> async (dispatch)=>{
//     try {
//         const {data,status}=await client.get(`/product-inwards/${productInwardId}`)
//         console.log("api -> ",data);
//         if(status === 200) {
//             return {...data.data.productInward}
//         }
//     } catch (error) {
//         console.log(error)
//         return 0;
//     }
// }

// export const updateProductInward=(productInward)=>async (dispatch)=>{
//     try {
//         dispatch({type:PRODUCT_INWARD_START_LOADING})
//         const {_id,...body}=product
//         const {data}=await client.patch(`/product-inwards/${_id}`,{...body})
//         console.log("api -> ",data);
//         dispatch({
//             type:UPDATE_PRODUCT_INWARD,
//             payload:{
//                 productInward:{...data.data.productInward}
//             }
//         })
//         return 1;
//     } catch (error) {
//         console.log(error)
//         dispatch({type:PRODUCT_ERROR,payload:{error:"Something went wrong"}})
//         return 0;
//     }   
// }

export const createProductInward=(order)=>async (dispatch,getState)=>{
    try {
        dispatch({type:DISPATCH_ORDER_START_LOADING})
        const {userData}=getState().auth
        const reqBody={...order,userId:userData.id}
        const {data}=await client.post(`/dispatch-orders/`,{...reqBody})
        console.log("prod order", data)
        dispatch({
            type:CREATE_DISPATCH_ORDER,
            payload:{
                order:{...data.data.dispatchOrder[0]}
            }
        })
    } catch (error) {
        console.log(error)
        dispatch({type:DISPATCH_ORDER_ERROR,payload:{error:"Something went wrong"}})
        return 0;
    }   
}