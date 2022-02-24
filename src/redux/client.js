import axios from "axios";
import { store } from "./store";

const client = axios.create({
    // baseURL: "http://localhost:8001/api/v1",
    baseURL: "https://warehouse-fyp.herokuapp.com/api/v1"
    // withCredentials:false
})

client.interceptors.request.use(
    (config) => {
        // const { auth } = store.getState();
        const authToken = localStorage.getItem("authToken")
        if (authToken) {
            config.headers.common['Authorization'] = `Bearer ${authToken}`
        }
        return config;
    },
    (err) => {
        console.log("client error");
        return Promise.reject(err);
    }
)

// const headers = { 'Response-Type': 'blob' };

export const exportClient = axios.create({
    baseURL: "https://warehouse-fyp.herokuapp.com/api/v1",
})

exportClient.interceptors.request.use(
    (config) => {
        const { auth } = store.getState();
        if (auth) {
            config.headers.common['Authorization'] = `Bearer ${auth.token}`
        }
        return config;
    },
    (err) => {
        console.log("client error");
        return Promise.reject(err);
    }
)

export default client;