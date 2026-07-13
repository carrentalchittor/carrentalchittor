import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Phone,
  MessageCircle,
  Users,
  Fuel,
  Gauge,
} from "lucide-react";
import "./home.css";
import API, { asset } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [selected, setSelected] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/cars")
      .then((res) => setCars(res.data))
      .catch((err) => console.error(err));
  }, []);

  const call = () => {
    window.location.href = `tel:${
      import.meta.env.VITE_CALL_NUMBER || "6367697913"
    }`;
  };

  const book = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const formData = new FormData(e.currentTarget);
      const payload = Object.fromEntries(formData);

      payload.car = selected._id;

      const { data } = await API.post("/bookings", payload);

      const whatsappNumber =
        import.meta.env.VITE_WHATSAPP_NUMBER ||
        "916367697913";

      const message = `
New Vehicle Booking

Name: ${user.name}
Phone: ${user.phone}
Vehicle: ${selected.name}
Pickup: ${payload.pickupDate}
Return: ${payload.returnDate}
Location: ${payload.pickupLocation}
Booking ID: ${data._id}

Please approve my booking.
      `;

      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          message
        )}`,
        "_blank"
      );

      setSelected(null);
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <main>
      <section className="hero">
        <div>
          <span className="eyebrow">
            Trusted Local Vehicle Rental
          </span>

          <h1>
            Explore Chittorgarh with the Right Vehicle
          </h1>

          <p>
            Clean vehicles, transparent pricing and quick booking
            through WhatsApp or phone.
          </p>
          

          <div className="actions">
            <a href="#cars">View Vehicles</a>

            <button type="button" onClick={call}>
              <Phone size={18} />
              Call 6367697913
            </button>
          </div>
        </div>

      
      </section>

      <section className="section" id="cars">
        <div className="sectionHead">
          <div>
            <span className="eyebrow">
              Our Fleet
            </span>

            <h2>Choose Your Ride</h2>
          </div>
        </div>

        <div className="grid">
          {cars.map((car) => (
            <article className="car" key={car._id}>
              <img
                src={asset(car.image)}
                alt={car.name}
              />

              <div className="carBody">
                <h3>{car.name}</h3>

                <p>{car.description}</p>

                <div className="specs">
                  <span>
                    <Users size={16} />
                    {car.seats} Seats
                  </span>

                  <span>
                    <Fuel size={16} />
                    {car.fuel}
                  </span>

                  <span>
                    <Gauge size={16} />
                    {car.transmission}
                  </span>
                </div>

                <div className="price">
                  ₹{car.pricePerDay}
                  <small>/day</small>
                </div>

                <div className="cardActions">
                  <button
                    type="button"
                    onClick={() => setSelected(car)}
                  >
                    <MessageCircle size={18} />
                    Book / Order
                  </button>

                  <button
                    type="button"
                    className="light"
                    onClick={call}
                  >
                    <Phone size={18} />
                    Call
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selected && (
        <div className="modal">
          <form
            className="modalBox"
            onSubmit={book}
          >
            <button
              type="button"
              className="close"
              onClick={() => setSelected(null)}
            >
              ×
            </button>

            <h2>
              Book {selected.name}
            </h2>

            <label>
              Pickup Date
              <input
                type="date"
                name="pickupDate"
                required
              />
            </label>

            <label>
              Return Date
              <input
                type="date"
                name="returnDate"
                required
              />
            </label>

            <label>
              Pickup Location
              <input
                type="text"
                name="pickupLocation"
                placeholder="Shop pickup details"
                required
              />
            </label>

            <label>
              Note
              <textarea
                name="note"
                placeholder="Timing, vehicle requirement etc."
              />
            </label>

            <button
              type="submit"
              className="primary"
            >
              Continue on WhatsApp
            </button>
          </form>
        </div>
      )}

    </main>
  );
}