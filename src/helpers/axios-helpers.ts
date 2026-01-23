import type { AxiosRequestConfig } from "axios";
import axios from "axios";

const api = axios.create({
    baseURL: "https://fakestoreapi.com",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Token logic later
        // const token = localStorage.getItem("token");
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response || error.message);
        return Promise.reject(error);
    }
);


// ---------- Common API Helpers ----------

export const get = async <T>(
    url: string,
    config?: AxiosRequestConfig
): Promise<T> => {
    const response = await api.get<T>(url, config);
    return response.data;
};

export const post = async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
): Promise<T> => {
    const response = await api.post<T>(url, data, config);
    return response.data;
};

export const put = async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
): Promise<T> => {
    const response = await api.put<T>(url, data, config);
    return response.data;
};

export const patch = async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
): Promise<T> => {
    const response = await api.patch<T>(url, data, config);
    return response.data;
};

export const del = async <T>(
    url: string,
    config?: AxiosRequestConfig
): Promise<T> => {
    const response = await api.delete<T>(url, config);
    return response.data;
};

export default api;
