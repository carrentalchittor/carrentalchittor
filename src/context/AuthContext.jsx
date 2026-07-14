import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import API from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");

      return savedUser
        ? JSON.parse(savedUser)
        : null;
    } catch {
      return null;
    }
  });

  const [checkingAuth, setCheckingAuth] =
    useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setCheckingAuth(false);
      return;
    }

    API.get("/auth/me")
      .then((response) => {
        const currentUser = response.data.user;

        setUser(currentUser);

        localStorage.setItem(
          "user",
          JSON.stringify(currentUser)
        );
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
      })
      .finally(() => {
        setCheckingAuth(false);
      });
  }, []);

  const login = (loginData) => {
    if (!loginData?.token || !loginData?.user) {
      throw new Error("Invalid login response");
    }

    localStorage.setItem(
      "token",
      loginData.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(loginData.user)
    );

    setUser(loginData.user);
  };

  const logout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        checkingAuth,
        isLoggedIn: Boolean(user),
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}