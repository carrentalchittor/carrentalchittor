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

const VEHICLE_CACHE_KEY = "availableVehicles";
const VEHICLE_CACHE_TIME_KEY = "availableVehiclesTime";
const VEHICLE_CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

function getCachedVehicles() {
  try {
    const cached = localStorage.getItem(
      VEHICLE_CACHE_KEY
    );

    if (!cached) return [];

    const parsed = JSON.parse(cached);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Vehicle cache read error:", error);
    return [];
  }
}

export default function Home() {
  const [cars, setCars] = useState(
    getCachedVehicles
  );

  const [loadingCars, setLoadingCars] =
    useState(() => getCachedVehicles().length === 0);

  const [selected, setSelected] =
    useState(null);

  const [booking, setBooking] =
    useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    const loadCars = async () => {
      const cachedVehicles =
        getCachedVehicles();

      try {
        const cachedTime = Number(
          localStorage.getItem(
            VEHICLE_CACHE_TIME_KEY
          ) || 0
        );

        const cacheIsFresh =
          cachedVehicles.length > 0 &&
          Date.now() - cachedTime <
            VEHICLE_CACHE_DURATION;

        if (cacheIsFresh) {
          if (active) {
            setCars(cachedVehicles);
            setLoadingCars(false);
          }

          return;
        }

        const { data } = await API.get(
          "/cars",
          {
            timeout: 60000,
          }
        );

        if (!active) return;

        const vehicles = Array.isArray(data)
          ? data
          : [];

        setCars(vehicles);
        setLoadingCars(false);

        localStorage.setItem(
          VEHICLE_CACHE_KEY,
          JSON.stringify(vehicles)
        );

        localStorage.setItem(
          VEHICLE_CACHE_TIME_KEY,
          String(Date.now())
        );
      } catch (error) {
        console.error(
          "Vehicles load error:",
          error
        );

        if (!active) return;

        setLoadingCars(false);

        // API fail होने पर पुराना cached data दिखाते रहें
        if (cachedVehicles.length > 0) {
          setCars(cachedVehicles);
        }
      }
    };

    loadCars();

    return () => {
      active = false;
    };
  }, []);

  const call = () => {
    const callNumber =
      import.meta.env.VITE_CALL_NUMBER ||
      "6378162396";

    window.location.href = `tel:${callNumber}`;
  };

  const book = async (event) => {
    event.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    if (!selected?._id || booking) {
      return;
    }

    try {
      setBooking(true);

      const formData = new FormData(
        event.currentTarget
      );

      const payload =
        Object.fromEntries(formData);

      payload.car = selected._id;

      const { data } = await API.post(
        "/bookings",
        payload
      );

      const whatsappNumber =
        import.meta.env
          .VITE_WHATSAPP_NUMBER ||
        "916378162396";

      const message = [
        "New Vehicle Booking",
        "",
        `Name: ${user.name || ""}`,
        `Phone: ${user.phone || ""}`,
        `Vehicle: ${selected.name}`,
        `Pickup: ${payload.pickupDate}`,
        `Return: ${payload.returnDate}`,
        `Location: ${payload.pickupLocation}`,
        `Booking ID: ${data._id}`,
        "",
        "Please approve my booking.",
      ].join("\n");

      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          message
        )}`,
        "_blank",
        "noopener,noreferrer"
      );

      setSelected(null);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Booking failed"
      );
    } finally {
      setBooking(false);
    }
  };

  const today = new Date()
    .toISOString()
    .split("T")[0];

  return (
    <main>
      <section className="hero">
        <div>
          <span className="eyebrow">
            Trusted Local Vehicle Rental
          </span>

          <h1>
            Car, Bike and Scooty Rental
            Service in Chittorgarh
          </h1>

          <p>
            Book affordable cars, bikes,
            scooties, SUVs and premium vehicles
            on rent in Chittorgarh with clear
            daily pricing, document verification
            and quick WhatsApp booking.
          </p>

          <h2>
            Available Cars, Bikes and Scooties
            on Rent in Chittorgarh
          </h2>

          <div className="actions">
            <a href="#cars">
              View Vehicles
            </a>

            <button
              type="button"
              onClick={call}
            >
              <Phone size={18} />
              Call 6378162396
            </button>
          </div>
        </div>
      </section>

      <section
        className="section"
        id="cars"
      >
        <div className="sectionHead">
          <div>
            <span className="eyebrow">
              Our Fleet
            </span>

            <h2>Choose Your Ride</h2>
          </div>
        </div>

        {loadingCars &&
          cars.length === 0 && (
            <div className="vehicleLoading">
              <div className="loadingSpinner" />

              <p>
                Available vehicles loading...
              </p>
            </div>
          )}

        {!loadingCars &&
          cars.length === 0 && (
            <div className="noVehicles">
              <p>
                फिलहाल कोई vehicle available
                नहीं है।
              </p>
            </div>
          )}

        <div className="grid">
          {cars.map((car, index) => (
            <article
              className="car"
              key={car._id}
            >
            <img
  src={asset(car.image)}
  alt={`${car.name} rental in Chittorgarh`}
  loading={index < 3 ? "eager" : "lazy"}
  decoding="async"
  width="500"
  height="320"
/>

              <div className="carBody">
                <h3>{car.name}</h3>

                {car.description && (
                  <p>{car.description}</p>
                )}

                <div className="specs">
                  <span>
                    <Users size={16} />
                    {car.seats} Seats
                  </span>

                  {car.fuel && (
                    <span>
                      <Fuel size={16} />
                      {car.fuel}
                    </span>
                  )}

                  {car.transmission && (
                    <span>
                      <Gauge size={16} />
                      {car.transmission}
                    </span>
                  )}
                </div>

                <div className="price">
                  ₹{car.pricePerDay}
                  <small>/day</small>
                </div>

                <div className="cardActions">
                  <button
                    type="button"
                    onClick={() =>
                      setSelected(car)
                    }
                  >
                    <MessageCircle
                      size={18}
                    />
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
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-title"
          onClick={() => {
            if (!booking) {
              setSelected(null);
            }
          }}
        >
          <form
            className="modalBox"
            onSubmit={book}
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              className="close"
              aria-label="Close booking form"
              disabled={booking}
              onClick={() =>
                setSelected(null)
              }
            >
              ×
            </button>

            <h2 id="booking-title">
              Book {selected.name}
            </h2>

            <label>
              Pickup Date

              <input
                type="date"
                name="pickupDate"
                min={today}
                required
              />
            </label>

            <label>
              Return Date

              <input
                type="date"
                name="returnDate"
                min={today}
                required
              />
            </label>

            <label>
              Pickup Location

              <input
                type="text"
                name="pickupLocation"
                placeholder="Enter pickup location"
                maxLength={200}
                required
              />
            </label>

            <label>
              Note

              <textarea
                name="note"
                placeholder="Timing, vehicle requirement etc."
                maxLength={500}
              />
            </label>

            <button
              type="submit"
              className="primary"
              disabled={booking}
            >
              {booking
                ? "Booking..."
                : "Continue on WhatsApp"}
            </button>
          </form>
        </div>
      )}
    </main>
  );
}