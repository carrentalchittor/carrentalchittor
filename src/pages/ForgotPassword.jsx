import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api";
import "./login.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();

    setMsg("");
    setLoading(true);

    try {
      const response = await API.post(
        "/auth/forgot-password",
        {
          email,
        }
      );

      sessionStorage.setItem(
        "resetEmail",
        email.trim().toLowerCase()
      );

      navigate("/reset-password", {
        state: {
          message: response.data.message,
        },
      });
    } catch (error) {
      setMsg(
        error.response?.data?.message ||
          "Unable to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth">
      <form onSubmit={submit}>
        <h1>Forgot Password</h1>

        <p>
          Enter your registered email address.
          We will send a 6-digit OTP.
        </p>

        <label>
          Email Address
          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
            autoComplete="email"
            placeholder="example@gmail.com"
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
            ? "Sending OTP..."
            : "Send OTP"}
        </button>

        <button
          type="button"
          className="linkBtn"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </button>
      </form>
    </section>
  );
}