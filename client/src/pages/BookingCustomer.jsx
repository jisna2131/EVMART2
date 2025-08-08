import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axiosInstance from "../axiosInstance";

const BookingPage = () => {
  const [vehicleBookings, setVehicleBookings] = useState([]);
  const [spareBookings, setSpareBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get("/cart/bookings"); // Backend route to fetch bookings

        console.log(response.data);

        // Separate vehicle and spare part bookings
        setVehicleBookings(response.data.bookings);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load bookings.");
        setLoading(false);
      }
    };

    fetchBookings();

    const fetchBookingsSpare = async () => {
      try {
        const response = await axiosInstance.get("/cart/bookings/spare"); // Backend route to fetch bookings

        // Separate vehicle and spare part bookings
        console.log(response.data.bookings);

        setSpareBookings(response.data.bookings);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load bookings.");
        setLoading(false);
      }
    };

    fetchBookingsSpare();
  }, []);

  console.log(vehicleBookings);

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="text-center text-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Bookings</h2>

      {vehicleBookings.length === 0 && spareBookings.length === 0 ? (
        <div className="text-center">
          <p>You have no bookings yet.</p>
        </div>
      ) : (
        <>
          {/* Vehicle Bookings Table */}
          {vehicleBookings.length > 0 && (
            <>
              <h3 className="mt-4">Vehicle Bookings</h3>
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Booking ID</th>
                      <th>Vehicle</th>
                      <th>Brand</th>
                      <th>Model</th>
                      <th>Date</th>
                      <th>Price</th>
                      <th>Condition</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {console.log(vehicleBookings)}
                    {vehicleBookings.map((booking, index) => (
                      <tr key={booking._id}>
                        <td>{index + 1}</td>
                        <td>{booking._id}</td>
                        <td>{booking.itemId.title}</td>
                        <td>{booking.itemId.brand}</td>
                        <td>{booking.itemId.model}</td>
                        <td>
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </td>{" "}
                        <td>₹{booking.itemId.price.toLocaleString()}</td>
                        <td>{booking.itemId.condition}</td>
                        <td>
                          <span
                            className={`badge ${
                              booking.status === "Paid"
                                ? "bg-success"
                                : booking.status === "Pending"
                                ? "bg-warning text-dark"
                                : "bg-danger"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Spare Part Bookings Table */}
          {spareBookings.length > 0 && (
            <>
              <h3 className="mt-4">Spare Part Bookings</h3>
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Booking ID</th>
                      <th>Spare Part</th>
                      <th>Brand</th>
                      <th>Price</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {spareBookings.map((booking, index) => (
                      <tr key={booking._id}>
                        <td>{index + 1}</td>
                        <td>{booking._id}</td>
                        <td>{booking.itemId.name}</td>
                        <td>{booking.itemId.brand}</td>
                        <td>${booking.itemId.price}</td>
                        <td>
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              booking.status === "Confirmed"
                                ? "bg-success"
                                : booking.status === "Pending"
                                ? "bg-warning text-dark"
                                : "bg-danger"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default BookingPage;
