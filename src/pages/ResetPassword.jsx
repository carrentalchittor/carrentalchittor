import React, { useState ,useEffect} from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import API from "../api";
import "./login.css";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] =
    useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedEmail =
      sessionStorage.getItem("resetEmail");

    if (!savedEmail) {
      navigate("/forgot-password", {
        replace: true,
      });

      return;
    }

    setEmail(savedEmail);

    if (location.state?.message) {
      setMsg(location.state.message);
    }
  }, [location.state, navigate]);

  const submit = async (event) => {
    event.preventDefault();

    setMsg("");

    if (newPassword !== confirmPassword) {
      setMsg("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setMsg(
        "Password must contain at least 8 characters"
      );
      return;
    }

    setLoading(true);

    try {
      const response = await API.post(
        "/auth/reset-password",
        {
          email,
          otp,
          newPassword,
        }
      );

      sessionStorage.removeItem("resetEmail");

      navigate("/login", {
        replace: true,
        state: {
          message: response.data.message,
        },
      });
    } catch (error) {
      setMsg(
        error.response?.data?.message ||
          "Unable to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth">
      <form onSubmit={submit}>
        <h1>Reset Password</h1>

        <p>
          OTP was sent to:
          <strong> {email}</strong>
        </p>

        <label>
          6-Digit OTP
          <input
            type="text"
            value={otp}
            onChange={(event) =>
              setOtp(
                event.target.value.replace(
                  /\D/g,
                  ""
                )
              )
            }
            required
            minLength={6}
            maxLength={6}
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="123456"
          />
        </label>

        <label>
          New Password
          <input
            type="password"
            value={newPassword}
            onChange={(event) =>
              setNewPassword(event.target.value)
            }
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="Minimum 8 characters"
          />
        </label>

        <label>
          Confirm New Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(
                event.target.value
              )
            }
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="Repeat new password"
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
            ? "Resetting..."
            : "Reset Password"}
        </button>

        <button
          type="button"
          className="linkBtn"
          onClick={() =>
            navigate("/forgot-password")
          }
        >
          Request New OTP
        </button>
      </form>
    </section>
  );
}