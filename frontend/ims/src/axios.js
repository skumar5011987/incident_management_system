import axios from "axios";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

// Function to log out user and prevent infinite loop
const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem('user');
    window.location.href = "/"; // Redirect to login page
};

instance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark the request as retried

            try {
                const refreshToken = localStorage.getItem("refresh");

                // If there's no refresh token, log out immediately
                if (!refreshToken) {
                    console.warn("No refresh token found. Logging out...");
                    logoutUser();
                    return Promise.reject(error);
                }

                // Refresh the token
                console.log("Attempting token refresh...");
                const refreshResponse = await axios.post("http://127.0.0.1:8000/api/token/refresh/", { refresh: refreshToken });

                if (refreshResponse.status === 200) {
                    const newAccessToken = refreshResponse.data.access;
                    localStorage.setItem("token", newAccessToken);

                    // Update headers with new token
                    instance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
                    originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

                    console.log("Token refreshed. Retrying original request...");
                    return instance(originalRequest); // Retry original request with new token
                }
            } catch (refreshError) {
                console.error("Token refresh failed. Logging out...");
                logoutUser();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
