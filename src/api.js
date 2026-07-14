import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",

  withCredentials: true,
  timeout: 30000,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    return Promise.reject(error);
  }
);

export function asset(url) {
  if (!url) return "";

  if (
    url.startsWith("https://") ||
    url.startsWith("http://")
  ) {
    return url;
  }

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL ||
    "http://localhost:5000";

  return `${backendUrl}${url}`;
}

export default API;