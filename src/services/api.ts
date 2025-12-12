import axios from "axios";
import { API_BASE_URL } from "../constants";
import { store } from "../store/store";
import { logout } from "../store/authSlice";

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // Important for cookies
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;


        // Ignore refresh for these routes
        const skipRefresh =
            originalRequest.url?.includes("/auth/login") ||
            originalRequest.url?.includes("/auth/signup") ||
            originalRequest.url?.includes("/auth/logout");

        if (skipRefresh) {
            return Promise.reject(error);
        }

        // If 401 Unauthorized and not already retrying
        if (error.response?.status === 401 && !originalRequest._retry && !skipRefresh) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh token
                await api.post("/auth/refresh");

                // Retry original request
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh failed, logout user
                store.dispatch(logout());
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
