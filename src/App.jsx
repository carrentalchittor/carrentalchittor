import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminOrders from "./pages/AdminOrders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Bookings from "./pages/Bookings";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import Services from "./pages/Services";
import AdminVehicles from "./pages/AdminVehicles";
import { useAuth } from "./context/AuthContext";

function Guard({ children, admin = false }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (admin && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  return (
    <div className="appLayout">
      <Navbar />

      <main className="appContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Legal type="terms" />} />
          <Route
            path="/disclaimer"
            element={<Legal type="disclaimer" />}
          />
<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/reset-password"
  element={<ResetPassword />}
/>
          <Route
            path="/bookings"
            element={
              <Guard>
                <Bookings />
              </Guard>
            }
          />

         
          <Route
  path="/admin"
  element={
    <Guard admin>
      <Admin />
    </Guard>
  }
/>

<Route
  path="/admin/vehicles"
  element={
    <Guard admin>
      <AdminVehicles />
    </Guard>
  }
/>

<Route
  path="/admin/orders"
  element={
    <Guard admin>
      <AdminOrders />
    </Guard>
  }
/>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}