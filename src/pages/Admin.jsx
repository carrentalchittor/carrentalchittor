import React, { useEffect, useMemo, useState } from "react";
import API, { asset } from "../api";
import "./admin.css";
const bookingStatuses = [
  "pending",
  "approved",
  "rejected",
  "paid",
  "completed",
];

export default function Admin() {
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [addingVehicle, setAddingVehicle] = useState(false);
  const [uploadingQr, setUploadingQr] = useState(false);

  const load = async () => {
    try {
      setLoading(true);

      const [carsRes, bookingsRes, usersRes] = await Promise.all([
        API.get("/cars"),
        API.get("/bookings"),
        API.get("/auth/users"),
      ]);

      setCars(carsRes.data || []);
      setBookings(bookingsRes.data || []);
      setUsers(usersRes.data || []);
    } catch (error) {
      console.error("ADMIN LOAD ERROR:", error);
      alert(
        error.response?.data?.message ||
          "Admin data load nahi ho paya"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filteredCars = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return cars;
    }

    return cars.filter((car) => {
      return (
        car.name?.toLowerCase().includes(query) ||
        car.brand?.toLowerCase().includes(query) ||
        car.vehicleType?.toLowerCase().includes(query) ||
        car.type?.toLowerCase().includes(query)
      );
    });
  }, [cars, search]);

  const addVehicle = async (event) => {
    event.preventDefault();

    try {
      setAddingVehicle(true);

      const form = event.currentTarget;
      const formData = new FormData(form);

      const availableInput = form.elements.available;

      formData.set(
        "available",
        availableInput?.checked ? "true" : "false"
      );

      const response = await API.post("/cars", formData);

      console.log("VEHICLE ADDED:", response.data);

      alert("Vehicle added successfully");

      form.reset();

      if (availableInput) {
        availableInput.checked = true;
      }

      await load();
    } catch (error) {
      console.error("ADD VEHICLE ERROR:", error);
      console.error("SERVER RESPONSE:", error.response?.data);

      alert(
        error.response?.data?.message ||
          "Vehicle add nahi ho paya"
      );
    } finally {
      setAddingVehicle(false);
    }
  };

  const deleteVehicle = async (id) => {
    const confirmed = window.confirm(
      "Kya aap is vehicle ko delete karna chahte hain?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await API.delete(`/cars/${id}`);

      alert("Vehicle deleted successfully");

      await load();
    } catch (error) {
      console.error("DELETE VEHICLE ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Vehicle delete nahi ho paya"
      );
    }
  };

  const toggleAvailability = async (vehicle) => {
    try {
      const formData = new FormData();

      formData.append(
        "available",
        String(!vehicle.available)
      );

      await API.put(`/cars/${vehicle._id}`, formData);

      await load();
    } catch (error) {
      console.error("AVAILABILITY UPDATE ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Availability update nahi ho payi"
      );
    }
  };

  const updateBookingStatus = async (id, status) => {
    try {
      await API.patch(`/bookings/${id}/status`, {
        status,
      });

      await load();
    } catch (error) {
      console.error("BOOKING STATUS ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Booking status update nahi hua"
      );
    }
  };

  const uploadPaymentQr = async (event) => {
    event.preventDefault();

    try {
      setUploadingQr(true);

      const form = event.currentTarget;
      const formData = new FormData(form);

      await API.post(
        "/settings/payment-qr",
        formData
      );

      alert("Payment QR updated successfully");

      form.reset();
    } catch (error) {
      console.error("QR UPLOAD ERROR:", error);

      alert(
        error.response?.data?.message ||
          "QR upload nahi ho paya"
      );
    } finally {
      setUploadingQr(false);
    }
  };

  const totalPaidBookings = bookings.filter(
    (booking) => booking.status === "paid"
  ).length;

  const totalPendingBookings = bookings.filter(
    (booking) => booking.status === "pending"
  ).length;

  return (
    <section className="section admin">
      <div className="adminHeader">
        <div>
          <span className="eyebrow">
            Management Dashboard
          </span>

          <h1>Admin Panel</h1>

          <p>
            Cars, bikes, scooties, bookings,
            users aur payment QR manage karein.
          </p>
        </div>

        <button
          type="button"
          onClick={load}
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>

      <div className="statsGrid">
        <div className="statCard">
          <span>Total Vehicles</span>
          <strong>{cars.length}</strong>
        </div>

        <div className="statCard">
          <span>Total Bookings</span>
          <strong>{bookings.length}</strong>
        </div>

        <div className="statCard">
          <span>Pending Bookings</span>
          <strong>{totalPendingBookings}</strong>
        </div>

        <div className="statCard">
          <span>Paid Bookings</span>
          <strong>{totalPaidBookings}</strong>
        </div>

        <div className="statCard">
          <span>Registered Users</span>
          <strong>{users.length}</strong>
        </div>
      </div>

      <div className="adminGrid">
        <form
          className="panel"
          onSubmit={addVehicle}
        >
          <h2>Add Vehicle</h2>

          <label>
            Vehicle Type
            <select
              name="vehicleType"
              defaultValue="car"
              required
            >
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="scooty">Scooty</option>
            </select>
          </label>

          <label>
            Vehicle Name
            <input
              name="name"
              placeholder="Swift, Activa, Classic 350"
              required
            />
          </label>

          <label>
            Brand
            <input
              name="brand"
              placeholder="Maruti, Honda, Royal Enfield"
            />
          </label>

          <label>
            Category
            <input
              name="type"
              placeholder="SUV, Sedan, Cruiser, Scooter"
            />
          </label>

          <label>
            Seats
            <input
              type="number"
              name="seats"
              min="1"
              max="20"
              defaultValue="5"
            />
          </label>

          <label>
            Customer Price Per Day
            <input
              type="number"
              name="pricePerDay"
              min="0"
              placeholder="1800"
              required
            />
          </label>

          <label>
            Fuel
            <input
              name="fuel"
              placeholder="Petrol / Diesel / Electric"
            />
          </label>

          <label>
            Transmission
            <input
              name="transmission"
              placeholder="Manual / Automatic"
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              placeholder="Vehicle details, driver option, luggage capacity etc."
              maxLength="1000"
            />
          </label>

          <label>
            Vehicle Image
            <input
              type="file"
              name="image"
              accept="image/jpeg,image/png,image/webp"
              required
            />
          </label>

          <label className="checkboxLabel">
            <input
              type="checkbox"
              name="available"
              defaultChecked
            />
            Available for booking
          </label>

          <button
            type="submit"
            disabled={addingVehicle}
          >
            {addingVehicle
              ? "Uploading..."
              : "Add Vehicle"}
          </button>
        </form>

        <form
          className="panel"
          onSubmit={uploadPaymentQr}
        >
          <h2>Payment Scanner</h2>

          <p>
            Booking approve hone ke baad user ko
            ye QR dikhaya jayega.
          </p>

          <label>
            Upload Payment QR
            <input
              type="file"
              name="image"
              accept="image/jpeg,image/png,image/webp"
              required
            />
          </label>

          <button
            type="submit"
            disabled={uploadingQr}
          >
            {uploadingQr
              ? "Uploading..."
              : "Update Payment QR"}
          </button>
        </form>
      </div>

      <div className="panel">
        <div className="panelHeader">
          <div>
            <h2>Vehicles</h2>
            <p>
              Car, bike aur scooty inventory manage karein.
            </p>
          </div>

          <input
            className="searchInput"
            placeholder="Search vehicle..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Vehicle Type</th>
                <th>Category</th>
                <th>Price</th>
                <th>Availability</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredCars.map((car) => (
                <tr key={car._id}>
                  <td>
                    <img
                      className="adminVehicleImage"
                      src={asset(car.image)}
                      alt={car.name}
                    />
                  </td>

                  <td>
                    <strong>{car.name}</strong>
                    <br />
                    <small>{car.brand}</small>
                  </td>

                  <td>
                    {car.vehicleType || "car"}
                  </td>

                  <td>{car.type || "-"}</td>

                  <td>
                    ₹{car.pricePerDay}/day
                  </td>

                  <td>
                    <button
                      type="button"
                      className={
                        car.available
                          ? "statusButton available"
                          : "statusButton unavailable"
                      }
                      onClick={() =>
                        toggleAvailability(car)
                      }
                    >
                      {car.available
                        ? "Available"
                        : "Unavailable"}
                    </button>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="deleteButton"
                      onClick={() =>
                        deleteVehicle(car._id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {!filteredCars.length && (
                <tr>
                  <td colSpan="7">
                    No vehicles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel">
        <h2>Bookings</h2>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Vehicle</th>
                <th>Pickup Location</th>
                <th>Dates</th>
                <th>Payment Reference</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>
                    <strong>
                      {booking.user?.name || "Unknown"}
                    </strong>
                    <br />
                    <span>
                      {booking.user?.phone || "-"}
                    </span>
                    <br />
                    <small>
                      {booking.user?.city || "-"}
                    </small>
                  </td>

                  <td>
                    {booking.car?.name || "Deleted vehicle"}
                  </td>

                  <td>
                    {booking.pickupLocation || "-"}
                  </td>

                  <td>
                    {new Date(
                      booking.pickupDate
                    ).toLocaleDateString()}
                    {" - "}
                    {new Date(
                      booking.returnDate
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    {booking.paymentReference || "-"}
                  </td>

                  <td>
                    <select
                      value={booking.status}
                      onChange={(event) =>
                        updateBookingStatus(
                          booking._id,
                          event.target.value
                        )
                      }
                    >
                      {bookingStatuses.map(
                        (status) => (
                          <option
                            key={status}
                            value={status}
                          >
                            {status}
                          </option>
                        )
                      )}
                    </select>
                  </td>
                </tr>
              ))}

              {!bookings.length && (
                <tr>
                  <td colSpan="6">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel">
        <h2>Registered Users</h2>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>City</th>
                <th>Registered On</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.city}</td>
                  <td>
                    {user.createdAt
                      ? new Date(
                          user.createdAt
                        ).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))}

              {!users.length && (
                <tr>
                  <td colSpan="4">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}