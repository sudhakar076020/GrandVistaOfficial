import "./styles.css";

import { Parallax } from "react-parallax"; // Parallax effect images
import Swal from "sweetalert2"; // SweetAlert2

import React, { useState } from "react";
import emailjs from "@emailjs/browser"; // Send Email using EmailJS

// React Icons
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";

// Components
import Navbar from "../Navbar";
import ReservationCTA from "../ReservationCTA";
import Newsletter from "../Newsletter";
import Footer from "../Footer";

// Component parallax banner image
const parallaxBannerImage =
  "https://res.cloudinary.com/dehz5pshe/image/upload/v1755860909/vegetables-set-left-black-slate_yz25rt.jpg";
// Adderss Details
const addressDetails = {
  address: "Grandvista Restaurent, JL Raya Canggu, Bali",
  email: {
    email1: "grandvistaofficial@gmail.com",
    email2: "booking@grandvista.com",
  },
  phone: {
    phone1: "(+62) 81 522 557 900",
    phone2: "(+62) 81 522 557 911",
  },
  openingTime: "08:00 AM",
  closingTime: "11: 00 PM",
};

const ContactUsForm = () => {
  const [contactFormData, setContactFormData] = useState({
    userName: "",
    userEmail: "",
    phone: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContactFormData({ ...contactFormData, [name]: value });
  };

  const sendContactForm = (event) => {
    event.preventDefault();

    emailjs
      .send(
        "grandvistaofficial7602", // Service ID
        "grandvista7602", //Template ID
        contactFormData, //Send state object
        "BxAorOfOS2UT5oM5X" //Public Key
      )
      .then(
        (result) => {
          console.log(result.text);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Message Sent Successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          setContactFormData({
            userName: "",
            userEmail: "",
            phone: "",
            message: "",
          });
        },
        (error) => {
          console.log(error.text);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Failed to send, try again later",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
  };

  return (
    <>
      <Navbar />
      <Parallax
        bgImage={parallaxBannerImage}
        strength={300}
        className="parallax-banner-card"
      >
        <div className="parallax-banner-box">
          <h2 className="section-header-title">Contact Us</h2>
        </div>
      </Parallax>
      <section className="contact-section">
        <div className="contact-container">
          {/* LEFT SIDE - Info */}
          <div className="contact-left">
            <p className="subtitle">KEEP CLOSE</p>
            <h2 className="title">Get In Touch</h2>
            <p className="description">
              At GrandVista Restaurant, we blend fine flavors with warm
              hospitality in an inviting setting. Whether it’s a casual meal or
              a special celebration, every visit promises great taste, comfort,
              and memorable moments.
            </p>

            <div className="contact-info">
              <div className="info-box">
                <FiMapPin className="icon" />
                <p>{addressDetails.address}</p>
              </div>

              <div className="info-box">
                <FiPhone className="icon" />
                <div>
                  <p>{addressDetails.phone.phone1}</p>
                  <p>{addressDetails.phone.phone2}</p>
                </div>
              </div>

              <div className="info-box">
                <FiMail className="icon" />
                <div>
                  <p>{addressDetails.email.email1}</p>
                  <p>{addressDetails.email.email2}</p>
                </div>
              </div>

              <div className="info-box">
                <FiClock className="icon" />
                <div>
                  <p>Open {addressDetails.openingTime}</p>
                  <p>Closed {addressDetails.closingTime}</p>
                </div>
              </div>
            </div>

            {/* Line */}
            <div className="line"></div>
            {/* Social media icons card */}
            <div className="social">
              <p className="follow">FOLLOW US</p>
              <div className="social-icons-card">
                <a href="#">
                  <FaFacebookF className="social-icons" />
                </a>
                <a href="#">
                  <FaInstagram className="social-icons" />
                </a>
                <a href="#">
                  <FaTwitter className="social-icons" />
                </a>
                <a href="#">
                  <FaLinkedinIn className="social-icons" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Form */}
          <div className="contact-right">
            <h3 className="form-title">Your Details</h3>
            <p className="form-subtitle">Let us know how to get back to you.</p>
            <form className="contact-form" onSubmit={sendContactForm}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name*</label>
                  <input
                    name="userName"
                    value={contactFormData.userName}
                    type="text"
                    placeholder="John"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address*</label>
                  <input
                    name="userEmail"
                    value={contactFormData.userEmail}
                    type="email"
                    placeholder="email@gmail.com"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Phone*</label>
                <input
                  name="phone"
                  value={contactFormData.phone}
                  type="tel"
                  placeholder="Phone"
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  required
                />
              </div>
              <div className="form-group">
                <label>Comments / Questions*</label>
                <textarea
                  name="message"
                  value={contactFormData.message}
                  placeholder="Comments/ Question"
                  onChange={handleChange}
                  rows="4"
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">
                CONTACT US
              </button>
            </form>
          </div>
        </div>
      </section>
      {/* ReservationCTA  */}
      <ReservationCTA />
      {/* Newsletter */}
      <Newsletter />
      {/* Footer */}
      <Footer />
    </>
  );
};

export default ContactUsForm;
