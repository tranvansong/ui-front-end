import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8100/api", 
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // Chỉ thêm token cho các URL cần xác thực
    const protectedUrls = [
      "/carts",
      "/users/me",
      "/orders",
      "/products/create",
      "/products/update",
    ];

    if (protectedUrls.some((url) => config.url.startsWith(url)) && token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
