import React from "react";
import "./legal.css";
export default function Legal({ type }) {
  return (
    <section className="section legal">
      <h1>
        {type === "terms" ? "Terms of Service" : "Disclaimer"}
      </h1>

      {type === "terms" ? (
        <>
          <p>
            Bookings are confirmed only after admin approval and any
            required advance payment.
          </p>

          <p>
            Customers must provide a valid driving licence and a
            government-issued ID when opting for self-drive services.
          </p>

          <p>
            Fuel, toll, parking, waiting charges, vehicle damage,
            and extra kilometre charges may apply according to the
            final quotation.
          </p>

          <p>
            Cancellation and refund eligibility depends on vehicle
            availability and the time of cancellation.
          </p>

          <p>
            The company reserves the right to cancel or reject any
            booking in case of incorrect information or unforeseen
            circumstances.
          </p>
        </>
      ) : (
        <>
          <p>
            Vehicle images, models, prices, and availability displayed
            on this website are for reference only and may change
            without prior notice.
          </p>

          <p>
            Final vehicle availability, pricing, and booking
            confirmation will be provided through phone or WhatsApp
            by the admin.
          </p>

          <p>
            Travel time may vary due to traffic, weather conditions,
            road closures, or other circumstances beyond our control.
          </p>

          <p>
            This website does not guarantee an instant booking.
            A booking becomes valid only after the admin approves it.
          </p>

          <p>
            Please verify the payment details before making any online
            payment. The company is not responsible for payments made
            to incorrect accounts due to user negligence.
          </p>
        </>
      )}
    </section>
  );
}