import React from "react";
import { Link } from "react-router-dom";
import {
  Car,
  ClipboardList,
  WalletCards,
  Users,
} from "lucide-react";

import "./admin.css";

export default function Admin() {
  return (
    <section className="section admin adminHome">
      <div className="adminHeader">
        <div>
          <span className="eyebrow">
            Management Dashboard
          </span>

          <h1>Admin Panel</h1>

          <p>
            Vehicle inventory, booking requests,
            payments aur users ko alag-alag sections
            se manage karein.
          </p>
        </div>
      </div>

      <div className="adminMenuGrid">
        <Link
          to="/admin/vehicles"
          className="adminMenuCard"
        >
          <div className="adminMenuIcon">
            <Car size={34} />
          </div>

          <div>
            <h2>Vehicles & Payment QR</h2>

            <p>
              Cars, bikes aur scooties add karein,
              availability update karein, vehicle
              delete karein aur payment scanner
              upload karein.
            </p>
          </div>

          <span className="adminMenuAction">
            Manage Vehicles
          </span>
        </Link>

        <Link
          to="/admin/orders"
          className="adminMenuCard"
        >
          <div className="adminMenuIcon">
            <ClipboardList size={34} />
          </div>

          <div>
            <h2>Orders & Payments</h2>

            <p>
              Booking requests approve ya reject
              karein, transaction ID verify karein,
              payment status update karein aur
              completed orders manage karein.
            </p>
          </div>

          <span className="adminMenuAction">
            Manage Orders
          </span>
        </Link>
      </div>

      <div className="adminInfoGrid">
        <div className="adminInfoCard">
          <WalletCards size={24} />

          <div>
            <h3>Payment Verification</h3>

            <p>
              User ke UTR submit karne ke baad
              payment verify karke booking ko paid
              mark karein.
            </p>
          </div>
        </div>

        <div className="adminInfoCard">
          <Users size={24} />

          <div>
            <h3>Registered Users</h3>

            <p>
              Registered users ki details Orders &
              Payments page par available rahengi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}