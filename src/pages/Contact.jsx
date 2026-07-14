import React from "react";
import {
  Phone,
  MessageCircle,
  MapPin,
} from "lucide-react";
import "./contact.css";
export default function Contact() {
  return (
    <section className="section">
      <span className="eyebrow">
        Get in Touch
      </span>

      <h1>Contact Us</h1>

      <div className="contactCards">
        {/* Call */}

        <a href="tel:6378162396">
          <Phone size={28} />

          <h3>Call</h3>

          <p>6378162396</p>
        </a>

        {/* WhatsApp */}

        <a
          href="https://wa.me/6378162396"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={28} />

          <h3>WhatsApp</h3>

          <p>Chat for Booking</p>
        </a>

        {/* Location */}

        <div>
          <MapPin size={28} />

          <h3>Service Area</h3>

          <p>
            Chittorgarh and Nearby Locations
          </p>
        </div>
      </div>
    </section>
  );
}