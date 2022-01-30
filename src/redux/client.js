import axios from "axios";
import { store } from "./store";

const client = axios.create({
    baseURL:"http://localhost:8001/api/v1",
    // withCredentials:false
})

client.interceptors.request.use(
    async (config)=>{
        const {auth}=store.getState();
        if(auth.token){
            client.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`
        }
        return config;
    },
    (err) => {
        console.log("client error");
        return Promise.reject(err);
    }
)

export default client;