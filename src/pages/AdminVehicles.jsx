import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import "./admin.css";
import API from "../api";
export default function AdminVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [addingVehicle, setAddingVehicle] =
    useState(false);
  const [uploadingQr, setUploadingQr] =
    useState(false);

  const loadVehicles = async () => {
    try {
      setLoading(true);

      const response = await API.get("/cars");

      setVehicles(response.data || []);
    } catch (error) {
      console.error(
        "VEHICLE LOAD ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Vehicles load nahi ho paye"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const filteredVehicles = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    if (!query) {
      return vehicles;
    }

    return vehicles.filter((vehicle) => {
      return (
        vehicle.name
          ?.toLowerCase()
          .includes(query) ||
        vehicle.brand
          ?.toLowerCase()
          .includes(query) ||
        vehicle.vehicleType
          ?.toLowerCase()
          .includes(query) ||
        vehicle.type
          ?.toLowerCase()
          .includes(query)
      );
    });
  }, [vehicles, search]);

  const addVehicle = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    try {
      setAddingVehicle(true);

      const formData = new FormData(form);
      const availableInput =
        form.elements.available;

      formData.set(
        "available",
        availableInput?.checked
          ? "true"
          : "false"
      );

      await API.post("/cars", formData);

      alert("Vehicle added successfully");

      form.reset();

      if (availableInput) {
        availableInput.checked = true;
      }

      await loadVehicles();
    } catch (error) {
      console.error(
        "ADD VEHICLE ERROR:",
        error
      );

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

      alert(
        "Vehicle deleted successfully"
      );

      await loadVehicles();
    } catch (error) {
      console.error(
        "DELETE VEHICLE ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Vehicle delete nahi ho paya"
      );
    }
  };

  const toggleAvailability = async (
    vehicle
  ) => {
    try {
      const formData = new FormData();

      formData.append(
        "available",
        String(!vehicle.available)
      );

      await API.put(
        `/cars/${vehicle._id}`,
        formData
      );

      await loadVehicles();
    } catch (error) {
      console.error(
        "AVAILABILITY UPDATE ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Availability update nahi ho payi"
      );
    }
  };

  const uploadPaymentQr = async (
    event
  ) => {
    event.preventDefault();

    const form = event.currentTarget;

    try {
      setUploadingQr(true);

      const formData = new FormData(form);

      await API.post(
        "/settings/payment-qr",
        formData
      );

      alert(
        "Payment QR updated successfully"
      );

      form.reset();
    } catch (error) {
      console.error(
        "QR UPLOAD ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
        "QR upload nahi ho paya"
      );
    } finally {
      setUploadingQr(false);
    }
  };

  const availableCount = vehicles.filter(
    (vehicle) => vehicle.available
  ).length;

  const unavailableCount =
    vehicles.length - availableCount;

  return (
    <section className="section admin">
      <div className="adminHeader">
        <div>
          <span className="eyebrow">
            Vehicle Management
          </span>

          <h1>Vehicles & Payment QR</h1>

          <p>
            Cars, bikes, scooties aur payment
            scanner manage karein.
          </p>
        </div>

        <button
          type="button"
          onClick={loadVehicles}
          disabled={loading}
        >
          {loading
            ? "Refreshing..."
            : "Refresh Vehicles"}
        </button>
      </div>

      <div className="statsGrid">
        <div className="statCard">
          <span>Total Vehicles</span>
          <strong>{vehicles.length}</strong>
        </div>

        <div className="statCard">
          <span>Available</span>
          <strong>{availableCount}</strong>
        </div>

        <div className="statCard">
          <span>Unavailable</span>
          <strong>{unavailableCount}</strong>
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
              <option value="car">
                Car
              </option>

              <option value="bike">
                Bike
              </option>

              <option value="scooty">
                Scooty
              </option>
            </select>
          </label>

          <label>
            Vehicle Name
            <input
              type="text"
              name="name"
              placeholder="Swift, Activa, Classic 350"
              maxLength="100"
              required
            />
          </label>

          <label>
            Brand
            <input
              type="text"
              name="brand"
              placeholder="Maruti, Honda, Royal Enfield"
              maxLength="70"
            />
          </label>

          <label>
            Category
            <input
              type="text"
              name="type"
              placeholder="SUV, Sedan, Cruiser, Scooter"
              maxLength="50"
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
              required
            />
          </label>

          <label>
            Price Per Day
            <input
              type="number"
              name="pricePerDay"
              min="0"
              step="1"
              placeholder="1800"
              required
            />
          </label>

          <label>
            Fuel
            <input
              type="text"
              name="fuel"
              placeholder="Petrol / Diesel / Electric"
              maxLength="30"
            />
          </label>

          <label>
            Transmission
            <input
              type="text"
              name="transmission"
              placeholder="Manual / Automatic"
              maxLength="30"
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              placeholder="Vehicle details, luggage capacity, condition etc."
              maxLength="1000"
              rows="5"
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
          className="panel paymentQrPanel"
          onSubmit={uploadPaymentQr}
        >
          <h2>Payment Scanner</h2>

          <p>
            Booking approve hone ke baad user ko
            My Bookings page par ye QR dikhaya
            jayega.
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
            <h2>Vehicle Inventory</h2>

            <p>
              Cars, bikes aur scooties ki
              availability aur details manage
              karein.
            </p>
          </div>

          <input
            className="searchInput"
            type="search"
            placeholder="Search vehicle..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
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
                <th>Seats</th>
                <th>Fuel</th>
                <th>Transmission</th>
                <th>Price</th>
                <th>Availability</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredVehicles.map(
                (vehicle) => (
                  <tr key={vehicle._id}>
                    <td>
                     {vehicle.image?.startsWith("https://") ? (
  <img
    className="adminVehicleImage"
    src={vehicle.image}
    alt={vehicle.name}
  />
) : (
  <span>No image</span>
)}
                    </td>

                    <td>
                      <strong>
                        {vehicle.name}
                      </strong>

                      <br />

                      <small>
                        {vehicle.brand || "-"}
                      </small>
                    </td>

                    <td>
                      {vehicle.vehicleType ||
                        "car"}
                    </td>

                    <td>
                      {vehicle.type || "-"}
                    </td>

                    <td>
                      {vehicle.seats || "-"}
                    </td>

                    <td>
                      {vehicle.fuel || "-"}
                    </td>

                    <td>
                      {vehicle.transmission ||
                        "-"}
                    </td>

                    <td>
                      ₹{vehicle.pricePerDay}
                      /day
                    </td>

                    <td>
                      <button
                        type="button"
                        className={
                          vehicle.available
                            ? "statusButton available"
                            : "statusButton unavailable"
                        }
                        onClick={() =>
                          toggleAvailability(
                            vehicle
                          )
                        }
                      >
                        {vehicle.available
                          ? "Available"
                          : "Unavailable"}
                      </button>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="deleteButton"
                        onClick={() =>
                          deleteVehicle(
                            vehicle._id
                          )
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}

              {!filteredVehicles.length && (
                <tr>
                  <td colSpan="10">
                    {loading
                      ? "Loading vehicles..."
                      : "No vehicles found."}
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