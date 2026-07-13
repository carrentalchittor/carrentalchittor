import React, { useEffect, useState } from "react";
import API, { asset } from "../api";
import "./booking.css";
export default function Bookings() {
  const [list, setList] = useState([]);
  const [settings, setSettings] = useState({});

  const load = () => {
    API.get("/bookings/mine")
      .then((res) => setList(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    load();

    API.get("/settings/public")
      .then((res) => setSettings(res.data))
      .catch((err) => console.error(err));
  }, []);

  const pay = async (id) => {
    const reference = prompt(
      "Payment ke baad UTR / Transaction ID enter karein"
    );

    if (!reference) return;

    try {
      await API.patch(`/bookings/${id}/payment`, {
        paymentReference: reference,
      });

      alert("Payment submitted successfully.");

      load();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Payment update failed."
      );
    }
  };

  return (
    <section className="section">
      <h1>My Bookings</h1>

      <div className="bookingList">
        {list.length === 0 && (
          <p>No bookings yet.</p>
        )}

        {list.map((booking) => (
          <article
            className="booking"
            key={booking._id}
          >
            <img
              src={asset(booking.car?.image)}
              alt={booking.car?.name}
            />

            <div>
              <h3>{booking.car?.name}</h3>

              <p>
                {new Date(
                  booking.pickupDate
                ).toLocaleDateString()}
                {" - "}
                {new Date(
                  booking.returnDate
                ).toLocaleDateString()}
              </p>

              <p>
                Status :
                <b
                  className={`status ${booking.status}`}
                >
                  {" "}
                  {booking.status}
                </b>
              </p>

              {booking.status === "approved" && (
                <div className="paybox">
                  <h4>
                    Booking Approved – Scan to Pay
                  </h4>

                  {settings.paymentQr ? (
                    <img
                      className="qr"
                      src={asset(
                        settings.paymentQr
                      )}
                      alt="Payment QR"
                    />
                  ) : (
                    <p>
                      Admin has not uploaded
                      a payment QR yet.
                    </p>
                  )}

                  <button
                    onClick={() =>
                      pay(booking._id)
                    }
                  >
                    I Have Paid
                  </button>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}