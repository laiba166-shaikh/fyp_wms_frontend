
import client from "../redux/client";

export const getRoles=async ()=>{
    const {data}= await client.get("/roles/")
    return [...data.data.roles]
}

export const getCities=async ()=>{
    // const {data}= await client.get(`/cities/?page=${page}&limit=${limit}`)
    const {data}=await client.get(`/logistics/rides/relations`)
    console.log(data.data.cities)
    return [...data.data.cities]
}

export const getOwareProductOutwards=async ()=>{
    const {data}=await client.get(`/logistics/rides/relations`)
    return [...data.data.productOutwards]
}

