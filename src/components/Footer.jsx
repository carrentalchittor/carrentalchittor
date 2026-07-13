import React from "react";
import { Link } from "react-router-dom";
import {
  Car,
  Phone,
  MessageCircle,
  MapPin,
} from "lucide-react";

import "./footer.css";

export default function Footer() {
  const callNumber = "6367697913";
  const whatsappNumber = "916367697913";

  const whatsappMessage = encodeURIComponent(
    "Hello, mujhe car, bike ya scooty rental ke baare me jankari chahiye."
  );

  return (
    <footer className="siteFooter">
      <div className="footerMain">
        <div className="footerBrandBlock">
          <Link to="/" className="footerBrand">
            <Car size={24} />
            <span>CarRental Chittorgarh</span>
          </Link>

          <p>
            Cars, bikes, scooties aur premium vehicles ke liye
            reliable rental booking service.
          </p>
        </div>

        <div className="footerLinks">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/disclaimer">Disclaimer</Link>
        </div>

        <div className="footerContact">
          <a href={`tel:${callNumber}`}>
            <Phone size={16} />
            {callNumber}
          </a>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>

          <span>
            <MapPin size={16} />
            Chittorgarh, Rajasthan
          </span>
        </div>
      </div>

      <div className="footerBottom">
        <p>
          © {new Date().getFullYear()} CarRental Chittorgarh.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}