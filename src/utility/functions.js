
import client from "../redux/client";

export const getRoles=async ()=>{
    const {data}= await client.get("/roles/")
    return [...data.data.roles]
}
