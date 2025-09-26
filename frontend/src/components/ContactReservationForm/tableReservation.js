import "./styles.css";

import React, { useEffect, useState } from "react";
import { Parallax } from "react-parallax"; //Parallax effect image
import axios from "axios";

// Notification alert
import { toast } from "react-toastify";

import { ClipLoader } from "react-spinners"; // Loader

// Components
import Navbar from "../Navbar";
import Newsletter from "../Newsletter";
import Footer from "../Footer";

// Reservation table Time slots
const reservationTimeSlots = [
  { id: "9:00 AM", timeDisplayText: "9:00 AM" },
  { id: "10:00 AM", timeDisplayText: "10:00 AM" },
  { id: "11:00 AM", timeDisplayText: "11:00 AM" },
  { id: "12:00 PM", timeDisplayText: "12:00 PM" },
  { id: "1:00 PM", timeDisplayText: "1:00 PM" },
  { id: "2:00 PM", timeDisplayText: "2:00 PM" },
  { id: "3:00 PM", timeDisplayText: "3:00 PM" },
  { id: "4:00 PM", timeDisplayText: "4:00 PM" },
  { id: "5:00 PM", timeDisplayText: "5:00 PM" },
  { id: "6:00 PM", timeDisplayText: "6:00 PM" },
  { id: "7:00 PM", timeDisplayText: "7:00 PM" },
  { id: "8:00 PM", timeDisplayText: "8:00 PM" },
  { id: "9:00 PM", timeDisplayText: "9:00 PM" },
  { id: "10:00 PM", timeDisplayText: "10:00 PM" },
  { id: "11:00 PM", timeDisplayText: "11:00 PM" },
];

const API_URL = `${process.env.API_URL}/api/reservations`;

// Component parallax banner image
const parallaxBannerImage =
  "https://res.cloudinary.com/dehz5pshe/image/upload/v1755864194/composition-black-tableware-with-copy-space_cubinz.jpg";

// Table Reservation Component
const TableReservation = () => {
  const [reservationForm, setReservationForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: reservationTimeSlots[0].id,
    guests: 1,
    bookedTime: new Date().toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  });

  const [loader, setLoader] = useState(false); // Loader

  // Table Reservation Form Submission
  const tableReservationFormSubmit = async (event) => {
    event.preventDefault();
    setLoader(true); //Loader
    try {
      await axios.post(API_URL, reservationForm);
      setReservationForm({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: 1,
      });
      setLoader(false); //Loader
      toast.success("Reservation created successfully!");
    } catch (error) {
      setLoader(false); //Loader
      toast.error("Error creating reservation");
    }
    console.log("form submitted!");
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReservationForm({
      ...reservationForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Change browser title
  useEffect(() => {
    document.title = "GrandVista | Reservation";
  }, []);

  return (
    <>
      <Navbar />
      <Parallax
        bgImage={parallaxBannerImage}
        strength={300}
        className="parallax-banner-card"
      >
        <div className="parallax-banner-box">
          <h2 className="section-header-title">Table Reservation</h2>
        </div>
      </Parallax>
      <section className="contact-section">
        <div className="contact-container">
          {/* LEFT SIDE - Info */}
          <div className="contact-left">
            <p className="subtitle">RESERVE NOW</p>
            <h2 className="title">BOOK YOUR TABLE</h2>
            <p className="description">
              At GrandVista Restaurant, we blend fine flavors with warm
              hospitality. Reserve your table today and enjoy a memorable dining
              experience.
            </p>
          </div>

          {/* RIGHT SIDE - Form */}
          <div className="contact-right">
            <h3 className="form-title">Reservation Details</h3>
            <p className="form-subtitle">
              Fill in your details below to reserve your table.
            </p>
            <form
              className="contact-form"
              onSubmit={tableReservationFormSubmit}
            >
              <div className="form-row">
                <div className="form-group">
                  <label>Name*</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="John"
                    required
                    value={reservationForm.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address*</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="email@gmail.com"
                    required
                    value={reservationForm.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone*</label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone"
                    pattern="[0-9]{10}"
                    required
                    value={reservationForm.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>No. of Guests*</label>
                  <input
                    name="guests"
                    type="number"
                    placeholder="No. of Guests"
                    required
                    value={reservationForm.guests}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date*</label>
                  <input
                    name="date"
                    type="date"
                    required
                    value={reservationForm.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]} // user can only select today or a future date, not past dates
                  />
                </div>
                <div className="form-group">
                  <label>Time*</label>
                  <select
                    name="time"
                    value={reservationForm.time}
                    onChange={handleChange}
                  >
                    {reservationTimeSlots.map((time) => (
                      <option key={time.id}>{time.timeDisplayText}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button type="submit" className="submit-btn">
                {loader ? (
                  <ClipLoader color="#0e0c0a" size={20} />
                ) : (
                  "BOOK TABLE"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
      {/* Newsletter */}
      <Newsletter />
      {/* Footer */}
      <Footer />
    </>
  );
};

export default TableReservation;
