import axios from "axios";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL

export const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

// Add a response interceptor
axiosInstance.interceptors.response.use(function onFulfilled(response) {
    if (response.status === 401) {
        toast.error("Unauthorized");
        window.location.href = "/login"
    }
    return response;
}, function onRejected(error) {
    return Promise.reject(error);
});