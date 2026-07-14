import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api";
import { useAuth } from "../context/AuthContext";
import "./login.css";

export default function Login() {
  const [mode, setMode] = useState("login");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] =
    useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

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
            autoComplete="tel"
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
          />
        </label>

        {msg && <p className="msg">{msg}</p>}

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

        <button
          type="button"
          className="linkBtn"
          onClick={() => {
            setMsg("");
            setMode(
              mode === "login"
                ? "register"
                : "login"
            );
          }}
        >
          {mode === "login"
            ? "New User? Register"
            : "Already Registered? Login"}
        </button>
      </form>
    </section>
  );
}