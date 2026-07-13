import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Car, Menu, X } from "lucide-react";
import "./navbar.css"
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { user, logout } = useAuth();

  return (
    <header className="nav">
      {/* Logo */}

      <Link className="brand" to="/">
        <Car size={26} />
        <span>CarRental Chittorgarh</span>
      </Link>

      {/* Mobile Menu Button */}

      <button
        className="menu"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Navigation */}

      <nav
        className={open ? "links open" : "links"}
        onClick={() => setOpen(false)}
      >
        <Link to="/">Home</Link>
<Link to="/services">Services</Link>
        <Link to="/contact">
          Contact
        </Link>

        <Link to="/terms">
          Terms
        </Link>

        <Link to="/disclaimer">
          Disclaimer
        </Link>

        {user && (
          <Link to="/bookings">
            My Bookings
          </Link>
        )}

        {user?.role === "admin" && (
          <Link to="/admin">
            Admin Panel
          </Link>
        )}

        {user ? (
          <button
            type="button"
            onClick={logout}
            className="logoutBtn"
          >
            Logout
          </button>
        ) : (
          <Link
            className="pill"
            to="/login"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}