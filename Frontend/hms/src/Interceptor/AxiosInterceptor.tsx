import axios, { type InternalAxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9001',
});
axiosInstance.interceptors.request.use(
    (config:InternalAxiosRequestConfig) => {
        console.log("Interceptor triggered",config);
        const token = localStorage.getItem('token');
        if(token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
)

export default axiosInstance;