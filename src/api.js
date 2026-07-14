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

  const cleanUrl = String(url).trim();

  // Cloudinary ki full HTTPS URL
  if (
    cleanUrl.startsWith("https://") ||
    cleanUrl.startsWith("http://")
  ) {
    return cleanUrl;
  }

  const backendUrl = (
    import.meta.env.VITE_BACKEND_URL ||
    "https://carrentalchittorbackend.onrender.com"
  ).replace(/\/+$/, "");

  return `${backendUrl}${
    cleanUrl.startsWith("/") ? "" : "/"
  }${cleanUrl}`;
}

export default API;