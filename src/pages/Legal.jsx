import React from "react";
import "./legal.css";

export default function Legal({ type }) {
  return (
    <section className="section legal">
      <span className="eyebrow">
        CarRental Chittorgarh
      </span>

      <h1>
        {type === "terms"
          ? "Terms of Service"
          : "Disclaimer"}
      </h1>

      {type === "terms" ? (
        <>
          <h2>1. Per-Day Rental Price</h2>

          <p>
            Website par vehicle ke saamne dikhaya gaya amount
            sirf ek din ka basic rental charge hai. Final rental
            amount booking dates, vehicle availability, security
            deposit aur other applicable charges ke hisaab se
            confirm kiya jayega.
          </p>

          <h2>2. Fuel Charges</h2>

          <p>
            Website par dikhaya gaya per-day rental amount fuel
            charge ko include nahi karta, jab tak booking ke samay
            alag se confirm na kiya gaya ho. Vehicle me use hua fuel
            customer ko apne kharch par bharwana hoga.
          </p>

          <p>
            Vehicle jis fuel level par customer ko diya jayega,
            generally usi ya agreed fuel level par return karna hoga.
            Kam fuel ke saath return karne par additional fuel charge
            liya ja sakta hai.
          </p>

          <h2>3. Shop Pickup Only</h2>

          <p>
            Hamare yahan home delivery, hotel pickup, railway pickup
            ya doorstep vehicle delivery available nahi hai. Booking
            approve hone ke baad customer ko vehicle hamari shop se
            personally collect karna hoga.
          </p>

          <p>
            Vehicle collect karne se pehle customer ko booking
            confirmation, required documents, security deposit aur
            payment verification complete karna hoga.
          </p>

          <h2>4. Booking Confirmation</h2>

          <p>
            Website par booking form submit karna sirf booking request
            maana jayega. Booking tabhi final aur confirmed hogi jab
            admin vehicle availability check karke request approve karega.
          </p>

          <p>
            Admin approval se pehle kisi bhi booking ko confirmed booking
            nahi maana jayega.
          </p>

          <h2>5. Required Documents</h2>

          <p>
            Self-drive vehicle collect karne ke liye customer ko valid
            driving licence, government-issued ID aur zarurat padne par
            address proof dena hoga.
          </p>

          <p>
            Invalid, expired ya incorrect documents milne par booking
            reject ya cancel ki ja sakti hai.
          </p>

          <h2>6. Security Deposit</h2>

          <p>
            Vehicle category ke hisaab se refundable security deposit
            liya ja sakta hai. Deposit amount booking confirm karte samay
            customer ko bataya jayega.
          </p>

          <p>
            Vehicle damage, traffic fine, missing accessories, late return,
            fuel difference ya outstanding charges hone par applicable
            amount security deposit se deduct kiya ja sakta hai.
          </p>

          <h2>7. Late Return Charges</h2>

          <p>
            Vehicle agreed return date aur time tak shop par return karna
            zaroori hai. Late return hone par hourly ya additional per-day
            charge lag sakta hai.
          </p>

          <h2>8. Vehicle Damage and Fines</h2>

          <p>
            Rental period ke dauran vehicle damage, accident, challan,
            traffic violation, towing charge ya illegal use ki responsibility
            customer ki hogi.
          </p>

          <h2>9. Payment</h2>

          <p>
            Online payment sirf booking approve hone ke baad website par
            dikhaye gaye official payment QR ya admin dwara confirmed payment
            details par hi karein.
          </p>

          <p>
            Payment karne se pehle receiver name aur amount verify karna
            customer ki responsibility hai.
          </p>

          <h2>10. Cancellation</h2>

          <p>
            Cancellation aur refund eligibility booking status, payment,
            cancellation timing aur vehicle reservation ke hisaab se decide
            ki jayegi.
          </p>

          <h2>11. Right to Reject Booking</h2>

          <p>
            Incorrect information, invalid documents, vehicle unavailability,
            suspicious activity ya safety concerns ke case me booking reject
            ya cancel ki ja sakti hai.
          </p>
        </>
      ) : (
        <>
          <h2>Vehicle Price and Availability</h2>

          <p>
            Website par dikhayi gayi vehicle images, models, prices aur
            availability reference purpose ke liye hain. Actual vehicle,
            colour, model ya availability booking ke samay badal sakti hai.
          </p>

          <p>
            Website par displayed amount basic per-day rental charge hai.
            Fuel, security deposit, late return, damage, challan aur other
            applicable charges is amount me include nahi hote, jab tak
            separately confirm na kiya gaya ho.
          </p>

          <h2>Shop Pickup Requirement</h2>

          <p>
            Vehicles sirf shop se collect kiye ja sakte hain. Home delivery,
            doorstep pickup, hotel pickup, railway pickup ya airport pickup
            available nahi hai.
          </p>

          <h2>Booking Approval</h2>

          <p>
            Website par booking request submit karne se booking automatically
            confirm nahi hoti. Booking admin approval aur vehicle availability
            confirmation ke baad hi valid hogi.
          </p>

          <h2>Payment Safety</h2>

          <p>
            Payment sirf official QR ya admin dwara confirm kiye gaye account
            par karein. Galat account, unknown QR ya third-party person ko ki
            gayi payment ke liye business responsible nahi hoga.
          </p>

          <h2>Customer Responsibility</h2>

          <p>
            Vehicle collect karne ke baad rental period ke dauran vehicle use,
            fuel, traffic rules, fines, damages aur timely return ki
            responsibility customer ki hogi.
          </p>

          <h2>External Conditions</h2>

          <p>
            Traffic, weather, road conditions, government restrictions,
            vehicle breakdown ya anya unexpected circumstances ke karan
            availability ya booking plan me change ho sakta hai.
          </p>

          <h2>No Instant Guarantee</h2>

          <p>
            Website kisi bhi vehicle ki instant ya guaranteed availability
            promise nahi karti. Final confirmation phone ya WhatsApp ke
            through admin approval ke baad hi di jayegi.
          </p>
        </>
      )}
    </section>
  );
}