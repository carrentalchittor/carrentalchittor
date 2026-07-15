import React, { useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import "./login.css";

export default function Login() {
  const [mode, setMode] = useState("login");
 
  const [loading, setLoading] = useState(false);
const location = useLocation();
  const { login } = useAuth();
  const navigate = useNavigate();
  
 const [msg, setMsg] = useState(
  location.state?.message || ""
);
  const submit = async (event) => {
    event.preventDefault();

    setMsg("");
    setLoading(true);

    try {
      const formData = Object.fromEntries(
        new FormData(event.currentTarget)
      );

      if (mode === "register") {
        await API.post(
          "/auth/register",
          formData
        );

        event.currentTarget.reset();
        setMode("login");

        setMsg(
          "Registration successful. Please login."
        );

        return;
      }

      const response = await API.post(
        "/auth/login",
        formData
      );

      login(response.data);

      navigate(
        response.data.user.role === "admin"
          ? "/admin"
          : "/"
      );
    } catch (error) {
      setMsg(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const changeMode = () => {
    setMsg("");

    setMode((currentMode) =>
      currentMode === "login"
        ? "register"
        : "login"
    );
  };

  return (
    <section className="auth">
      <form onSubmit={submit}>
        <h1>
          {mode === "login"
            ? "Welcome Back"
            : "Create Account"}
        </h1>

        {mode === "register" && (
          <>
            <label>
              Name
              <input
                name="name"
                type="text"
                required
                minLength={2}
                maxLength={60}
                autoComplete="name"
                placeholder="Enter your name"
              />
            </label>

            <label>
              Where are you from?
              <input
                name="city"
                type="text"
                required
                minLength={2}
                maxLength={80}
                autoComplete="address-level2"
                placeholder="Enter your city"
              />
            </label>

            <label>
              Email Address
              <input
                name="email"
                type="email"
                required
                maxLength={120}
                autoComplete="email"
                placeholder="example@gmail.com"
              />
            </label>
          </>
        )}

        <label>
          Phone Number
          <input
            name="phone"
            type="tel"
            required
            pattern="[6-9][0-9]{9}"
            maxLength={10}
            inputMode="numeric"
            autoComplete="tel"
            placeholder="9876543210"
          />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete={
              mode === "login"
                ? "current-password"
                : "new-password"
            }
            placeholder="Minimum 8 characters"
          />
        </label>

        {msg && (
          <p className="msg" role="alert">
            {msg}
          </p>
        )}

        <button
          type="submit"
          className="primary"
          disabled={loading}
        >
          {loading
            ? "Please wait..."
            : mode === "login"
              ? "Login"
              : "Register"}
        </button>

        {mode === "login" && (
          <button
            type="button"
            className="linkBtn"
            onClick={() =>
              navigate("/forgot-password")
            }
          >
            Forgot Password?
          </button>
        )}

        <button
          type="button"
          className="linkBtn"
          onClick={changeMode}
          disabled={loading}
        >
          {mode === "login"
            ? "New User? Register"
            : "Already Registered? Login"}
        </button>
      </form>
    </section>
  );
}