import React from "react";
import { Link } from "react-router-dom";
import {
  Bike,
  Phone,
  MessageCircle,
  MapPin,
} from "lucide-react";

import "./footer.css";

export default function Footer() {
  const callNumber = "6378162396";
  const whatsappNumber = "916378162396";

  const whatsappMessage = encodeURIComponent(
    "Hello, mujhe bike ya taxi rental ke baare me jankari chahiye."
  );

  return (
    <footer className="siteFooter">
      <div className="footerContainer">
        <div className="footerBrandSection">
          <Link to="/" className="footerBrand">
            <Bike size={26} />
            <span>RideGo Bike & Taxi</span>
          </Link>

          <p>
            Bikes aur taxis ke liye quick, reliable aur affordable
            rental booking service.
          </p>
        </div>

        <div className="footerLinksMap">
          <div className="footerLinksSection">
            <h3>Quick Links</h3>

            <div className="footerLinks">
              <Link to="/">Home</Link>
              <Link to="/services">Services</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/terms">Terms</Link>
              <Link to="/disclaimer">Disclaimer</Link>
            </div>
          </div>

          <div className="footerMap">
  <iframe
    title="RideGo Bike and Taxi Rental Location"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.691075301325!2d74.6231501!3d24.874398499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3968a199e9722f05%3A0xffe367ee922bed61!2sSk%20tour%20and%20travels%20bike%20%26%20car%20rent!5e0!3m2!1sen!2sin!4v1784013430640!5m2!1sen!2sin"
    loading="lazy"
    allowFullScreen
    referrerPolicy="strict-origin-when-cross-origin"
  />
</div>
        </div>

        <div className="footerContact">
          <h3>Contact Us</h3>

          <a href={`tel:${callNumber}`}>
            <Phone size={17} />
            <span>{callNumber}</span>
          </a>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={17} />
            <span>WhatsApp Booking</span>
          </a>

          <div className="footerLocation">
            <MapPin size={17} />
            <span>10, Nimbahera Rd, Railway Colony, Chittorgarh, Rajasthan 312001</span>
          </div>
        </div>
      </div>

      <div className="footerBottom">
        <p>
          © {new Date().getFullYear()} RideGo Bike & Taxi.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}