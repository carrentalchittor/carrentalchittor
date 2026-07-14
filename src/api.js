export function asset(url) {
  if (!url) return "";

  const backendUrl = (
    import.meta.env.VITE_BACKEND_URL ||
    "https://carrentalchittorbackend.onrender.com"
  ).replace(/\/+$/, "");

  const cleanUrl = String(url).trim();

  if (cleanUrl.startsWith("http://localhost:5000")) {
    return cleanUrl.replace(
      "http://localhost:5000",
      backendUrl
    );
  }

  if (cleanUrl.startsWith("http://127.0.0.1:5000")) {
    return cleanUrl.replace(
      "http://127.0.0.1:5000",
      backendUrl
    );
  }

  if (
    cleanUrl.startsWith("https://") ||
    cleanUrl.startsWith("http://")
  ) {
    return cleanUrl;
  }

  return `${backendUrl}${
    cleanUrl.startsWith("/") ? "" : "/"
  }${cleanUrl}`;
}