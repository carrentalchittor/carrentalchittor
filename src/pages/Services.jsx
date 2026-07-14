import React from "react";
import "./service.css"
import {
  Car,
  Bike,
  Sparkles,
  ShieldCheck,
  Clock3,
  BadgeIndianRupee,
  MessageCircle,
  Phone,
  Store,
} from "lucide-react";

export default function Services() {
  const callNumber = "6378162396";
  const whatsappNumber = "6378162396";

  const whatsappMessage = encodeURIComponent(
    "Hello, mujhe car, bike ya scooty rental ke baare me jankari chahiye."
  );

  return (
    <main className="servicesPage">
      <section className="servicesHero">
        <div className="servicesHeroContent">
          <span className="eyebrow">
            Vehicle Rental Services
          </span>

          <h1>
            Cars, Bikes and Scooties Available for Rent
          </h1>

          <p>
            CarRental Chittorgarh par aap apni zarurat aur budget ke
            hisaab se car, bike, scooty aur premium vehicles book kar
            sakte hain. Booking confirm hone ke baad vehicle hamari
            shop se collect kiya ja sakta hai.
          </p>

          <div className="servicesHeroActions">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="primaryServiceButton"
            >
              <MessageCircle size={18} />
              Book on WhatsApp
            </a>

            <a
              href={`tel:${callNumber}`}
              className="secondaryServiceButton"
            >
              <Phone size={18} />
              Call {callNumber}
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="sectionHead">
          <span className="eyebrow">
            Our Services
          </span>

          <h2>
            Choose the Right Vehicle for Your Journey
          </h2>

          <p>
            Hamare yahan alag-alag category ke vehicles available hain.
            Vehicle availability aur final rental price booking ke samay
            confirm ki jayegi.
          </p>
        </div>

        <div className="servicesGrid">
          <article className="serviceCard">
            <Car size={34} />

            <h3>Budget Cars</h3>

            <p>
              Daily travel aur family use ke liye Alto, WagonR, Swift,
              Baleno, Dzire aur isi category ki anya cars availability
              ke hisaab se book ki ja sakti hain.
            </p>
          </article>

          <article className="serviceCard">
            <Car size={34} />

            <h3>SUV and Premium Cars</h3>

            <p>
              Comfortable aur premium travel ke liye Brezza, Creta,
              Ertiga, Innova, Scorpio, Fortuner aur anya premium
              quality vehicles available ho sakte hain.
            </p>
          </article>

          <article className="serviceCard">
            <Bike size={34} />

            <h3>Bikes</h3>

            <p>
              Daily use aur short-distance travel ke liye Splendor,
              Shine, Pulsar, Apache, Royal Enfield aur anya bikes
              availability ke hisaab se rent par mil sakti hain.
            </p>
          </article>

          <article className="serviceCard">
            <Bike size={34} />

            <h3>Scooties</h3>

            <p>
              Easy city travel ke liye Activa, Jupiter, Access aur
              anya scooties booking ke liye available ho sakti hain.
            </p>
          </article>

          <article className="serviceCard">
            <Sparkles size={34} />

            <h3>Premium Vehicle Options</h3>

            <p>
              Special occasions ya premium travel requirement ke liye
              higher-category vehicles bhi availability ke hisaab se
              arrange kiye ja sakte hain.
            </p>
          </article>

          <article className="serviceCard">
            <Store size={34} />

            <h3>Shop Pickup</h3>

            <p>
              Booking approve hone ke baad customer ko vehicle hamari
              shop se collect karna hoga. Vehicle handover se pehle
              required documents aur payment verify ki jayegi.
            </p>
          </article>
        </div>
      </section>
          <div className="servicesHeroActions">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="primaryServiceButton"
            >
              Check Vehicle Availability
            </a>

            <a
              href={`tel:${callNumber}`}
              className="secondaryServiceButton"
            >
              Call for Details
            </a>
          </div>
      <section className="section serviceHighlightSection">
        <div className="sectionHead">
          <span className="eyebrow">
            Why Choose Us
          </span>

          <h2>
            Simple Booking and Clear Information
          </h2>
        </div>

        <div className="benefitsGrid">
          <div className="benefitCard">
            <ShieldCheck size={30} />

            <h3>Vehicle Details</h3>

            <p>
              Booking se pehle vehicle model, rent, security amount
              aur required documents ki information clear ki jayegi.
            </p>
          </div>

          <div className="benefitCard">
            <Clock3 size={30} />

            <h3>Easy Booking Process</h3>

            <p>
              Website se vehicle select karke WhatsApp par booking
              request bheji ja sakti hai.
            </p>
          </div>

          <div className="benefitCard">
            <BadgeIndianRupee size={30} />

            <h3>Clear Rental Pricing</h3>

            <p>
              Vehicle rent, security deposit, late return charge aur
              other applicable charges booking confirm karte samay
              bataye jayenge.
            </p>
          </div>
        </div>
      </section>

      <section className="section premiumSection">
        <div className="premiumContent">
          <span className="eyebrow">
            Book Your Vehicle
          </span>

          <h2>
            Select, Book and Collect from Our Shop
          </h2>

          <p>
            Website par available car, bike ya scooty select karein.
            Booking details submit karne ke baad WhatsApp par request
            bhejein. Admin approval aur payment confirmation ke baad
            vehicle shop se collect kiya ja sakta hai.
          </p>

          <p>
            Vehicle availability real-time basis par badal sakti hai.
            Isliye shop par aane se pehle booking confirmation lena
            zaroori hai.
          </p>

          <div className="servicesHeroActions">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="primaryServiceButton"
            >
              Check Vehicle Availability
            </a>

            <a
              href={`tel:${callNumber}`}
              className="secondaryServiceButton"
            >
              Call for Details
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}