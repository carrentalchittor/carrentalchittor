import React, { useEffect, useMemo, useState } from "react";
import API, { asset } from "../api";
import "./admin.css";

const bookingStatuses = [
  "pending",
  "approved",
  "payment_submitted",
  "rejected",
  "paid",
  "completed",
];

export default function AdminOrders() {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);

      const [bookingsResponse, usersResponse] = await Promise.all([
        API.get("/bookings"),
        API.get("/auth/users"),
      ]);

      setBookings(bookingsResponse.data || []);
      setUsers(usersResponse.data || []);
    } catch (error) {
      console.error("ADMIN ORDERS LOAD ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Orders aur users load nahi ho paye"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredBookings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesStatus =
        statusFilter === "all" ||
        booking.status === statusFilter;

      const searchableText = [
        booking.user?.name,
        booking.user?.phone,
        booking.user?.city,
        booking.car?.name,
        booking.pickupLocation,
        booking.paymentReference,
        booking.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [bookings, search, statusFilter]);

  const updateBookingStatus = async (bookingId, status) => {
    try {
      setUpdatingId(bookingId);

      await API.patch(`/bookings/${bookingId}/status`, {
        status,
      });

      await loadData();
    } catch (error) {
      console.error("BOOKING STATUS ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Booking status update nahi hua"
      );
    } finally {
      setUpdatingId("");
    }
  };

  const verifyPayment = async (booking) => {
    if (!booking.paymentReference) {
      alert("Transaction ID available nahi hai");
      return;
    }

    const confirmed = window.confirm(
      `Kya aapne transaction ID ${booking.paymentReference} verify kar li hai?`
    );

    if (!confirmed) {
      return;
    }

    await updateBookingStatus(booking._id, "paid");
  };

  const completeBooking = async (booking) => {
    const confirmed = window.confirm(
      `${booking.car?.name || "Vehicle"} return ho gaya hai aur booking complete karni hai?`
    );

    if (!confirmed) {
      return;
    }

    await updateBookingStatus(booking._id, "completed");
  };

  const copyPaymentReference = async (reference) => {
    try {
      await navigator.clipboard.writeText(reference);
      alert("Transaction ID copied");
    } catch {
      alert("Transaction ID copy nahi ho payi");
    }
  };

  const pendingCount = bookings.filter(
    (booking) => booking.status === "pending"
  ).length;

  const approvedCount = bookings.filter(
    (booking) => booking.status === "approved"
  ).length;

  const paymentSubmittedCount = bookings.filter(
    (booking) => booking.status === "payment_submitted"
  ).length;

  const paidCount = bookings.filter(
    (booking) => booking.status === "paid"
  ).length;

  const completedCount = bookings.filter(
    (booking) => booking.status === "completed"
  ).length;

  return (
    <section className="section admin">
      <div className="adminHeader">
        <div>
          <span className="eyebrow">
            Booking Management
          </span>

          <h1>Orders & Payments</h1>

          <p>
            Booking requests, payment verification,
            completed orders aur registered users manage karein.
          </p>
        </div>

        <button
          type="button"
          onClick={loadData}
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>

      <div className="statsGrid">
        <div className="statCard">
          <span>Total Orders</span>
          <strong>{bookings.length}</strong>
        </div>

        <div className="statCard">
          <span>Pending</span>
          <strong>{pendingCount}</strong>
        </div>

        <div className="statCard">
          <span>Approved</span>
          <strong>{approvedCount}</strong>
        </div>

        <div className="statCard">
          <span>Payment Submitted</span>
          <strong>{paymentSubmittedCount}</strong>
        </div>

        <div className="statCard">
          <span>Paid</span>
          <strong>{paidCount}</strong>
        </div>

        <div className="statCard">
          <span>Completed</span>
          <strong>{completedCount}</strong>
        </div>

        <div className="statCard">
          <span>Registered Users</span>
          <strong>{users.length}</strong>
        </div>
      </div>

      <div className="panel">
        <div className="panelHeader">
          <div>
            <h2>Booking Requests</h2>

            <p>
              Search aur status filter se bookings manage karein.
            </p>
          </div>

          <div className="adminFilters">
            <input
              className="searchInput"
              type="search"
              placeholder="Search user, vehicle, phone, UTR..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="all">All Status</option>

              {bookingStatuses.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Vehicle</th>
                <th>Pickup Location</th>
                <th>Dates</th>
                <th>Note</th>
                <th>Payment Reference</th>
                <th>Status</th>
                <th>Quick Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.map((booking) => (
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
                    <strong>
                      {booking.car?.name || "Deleted vehicle"}
                    </strong>

                    <br />

                    <small>
                      ₹{booking.car?.pricePerDay || 0}/day
                    </small>
                  </td>

                  <td>
                    {booking.pickupLocation || "-"}
                  </td>

                  <td>
                    {booking.pickupDate
                      ? new Date(
                          booking.pickupDate
                        ).toLocaleDateString()
                      : "-"}

                    {" - "}

                    {booking.returnDate
                      ? new Date(
                          booking.returnDate
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>
                    {booking.note || "-"}
                  </td>

                  <td>
                    {booking.paymentReference ? (
                      <div className="paymentReferenceBox">
                        <span>
                          {booking.paymentReference}
                        </span>

                        <button
                          type="button"
                          className="copyButton"
                          onClick={() =>
                            copyPaymentReference(
                              booking.paymentReference
                            )
                          }
                        >
                          Copy
                        </button>
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td>
                    <div className="bookingStatusActions">
                      <select
                        value={booking.status}
                        disabled={
                          updatingId === booking._id
                        }
                        className={
                          booking.status === "payment_submitted"
                            ? "paymentPendingSelect"
                            : ""
                        }
                        onChange={(event) =>
                          updateBookingStatus(
                            booking._id,
                            event.target.value
                          )
                        }
                      >
                        {bookingStatuses.map((status) => (
                          <option
                            key={status}
                            value={status}
                          >
                            {status.replaceAll("_", " ")}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>

                  <td>
                    <div className="orderQuickActions">
                      {booking.status === "pending" && (
                        <>
                          <button
                            type="button"
                            className="approveButton"
                            disabled={
                              updatingId === booking._id
                            }
                            onClick={() =>
                              updateBookingStatus(
                                booking._id,
                                "approved"
                              )
                            }
                          >
                            Approve
                          </button>

                          <button
                            type="button"
                            className="rejectButton"
                            disabled={
                              updatingId === booking._id
                            }
                            onClick={() =>
                              updateBookingStatus(
                                booking._id,
                                "rejected"
                              )
                            }
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {booking.status ===
                        "payment_submitted" && (
                        <button
                          type="button"
                          className="verifyPaymentButton"
                          disabled={
                            updatingId === booking._id
                          }
                          onClick={() =>
                            verifyPayment(booking)
                          }
                        >
                          Verify Payment
                        </button>
                      )}

                      {booking.status === "paid" && (
                        <button
                          type="button"
                          className="completeButton"
                          disabled={
                            updatingId === booking._id
                          }
                          onClick={() =>
                            completeBooking(booking)
                          }
                        >
                          Mark Completed
                        </button>
                      )}

                      {booking.status === "approved" && (
                        <span className="orderHint">
                          Waiting for payment
                        </span>
                      )}

                      {booking.status === "completed" && (
                        <span className="completedText">
                          Completed
                        </span>
                      )}

                      {booking.status === "rejected" && (
                        <span className="rejectedText">
                          Rejected
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {!filteredBookings.length && (
                <tr>
                  <td colSpan="8">
                    {loading
                      ? "Loading bookings..."
                      : "No bookings found."}
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
                    {loading
                      ? "Loading users..."
                      : "No users found."}
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