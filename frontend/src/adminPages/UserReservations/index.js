import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";

import { format } from "date-fns"; // Date format

const API_URL = "http://localhost:5000/api/reservations";

const UserReservations = () => {
  const [reservationsDetails, setReservationDetails] = useState([]);

  useEffect(() => {
    const fetchReservationsDetails = async () => {
      try {
        const response = await axios.get(API_URL);
        setReservationDetails(response.data);
      } catch (error) {
        console.error("Error fetching reservation details:", error);
      }
    };
    fetchReservationsDetails();
  }, []);

  // Format the date to "MMM dd yyyy Aug 24 2025"
  const formatDate = (date) => {
    if (!date) return "N/A";
    return format(new Date(date), "MMM dd yyyy");
  };

  return (
    <div className="user-reservations-details-card">
      <h2>Reserved Tables Details</h2>
      {/* Add your reservation details here */}
      <ul className="reservation-list">
        {reservationsDetails.length === 0 ? (
          <li className="no-reservation">No reservations found.</li>
        ) : (
          <>
            {reservationsDetails.map((reservation) => (
              <li key={reservation.id} className="reservation-item">
                <p>
                  <strong>Name:</strong> {reservation.name}
                </p>
                <p>
                  <strong>Email:</strong> {reservation.email}
                </p>
                <p>
                  <strong>Phone:</strong> {reservation.phone}
                </p>
                <p>
                  <strong>No. of Guests:</strong> {reservation.guests}
                </p>
                <p>
                  <strong>Date:</strong> {formatDate(reservation.date)}
                </p>
                <p>
                  <strong>Time:</strong> {reservation.time}
                </p>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default UserReservations;
