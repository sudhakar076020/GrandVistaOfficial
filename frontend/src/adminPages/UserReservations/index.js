import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";

import { format } from "date-fns"; // Date format
// Toast Notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminNavbar from "../AdminNavbar";

const API_URL = "http://localhost:5000/api/reservations";

const UserReservationsDetails = () => {
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

  // Send Email for Reservation confirmation
  const handleSendEmail = async (reservation) => {
    const reservationTableNumber = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit table number
    try {
      const res = await axios.post(
        `${API_URL}/send-confirmation`,
        {
          tableNumber: reservationTableNumber,
          userName: reservation.name,
          userEmail: reservation.email,
          phone: reservation.phone,
          guests: reservation.guests,
          date: reservation.date,
          time: reservation.time,
        }
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(`Failed to send email: ${error.message}`);
    }
  };

  return (
    <>
      <AdminNavbar />
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
                  <button
                    type="button"
                    className="send-mail-button"
                    onClick={() => {
                      handleSendEmail(reservation);
                    }}
                  >
                    Send Mail
                  </button>
                </li>
              ))}
            </>
          )}
        </ul>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          style={{ marginTop: "50px" }}
        />
      </div>
    </>
  );
};

export default UserReservationsDetails;
