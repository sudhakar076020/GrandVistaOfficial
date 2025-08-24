import "./styles.css"; // Import normal CSS
import { Link } from "react-router-dom";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          {/* Left Section */}
          <div className="footer-about">
            <h2>
              <span className="logo-box">G</span> GrandVista
            </h2>
            <p>
              Welcome to our restaurant! We serve fresh meals made with love.
              Experience fine dining with a cozy atmosphere and friendly
              service.
            </p>
            {/* This section css was in the contact component */}
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
          {/* Menu Section */}
          <div className="footer-links">
            <h3>Menu</h3>
            <ul>
              <li>
                <a href="#">Main Course</a>
              </li>
              <li>
                <a href="#">Appetizer</a>
              </li>
              <li>
                <a href="#">Desserts</a>
              </li>
              <li>
                <a href="#">Beverage</a>
              </li>
            </ul>
          </div>

          {/* Services Section */}
          <div className="footer-links">
            <h3>Services</h3>
            <ul>
              <li>
                <a href="#tableReservation">Table Reservation</a>
              </li>
              <li>
                <a href="#">Home Delivery</a>
              </li>
              <li>
                <a href="#">Catering</a>
              </li>
              <li>
                <a href="#">Private Events</a>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div className="footer-links">
            <h3>Our Restaurant</h3>
            <ul>
              <Link to="/about">
                <li>About</li>
              </Link>
              <li>
                <a href="#ourChef">Our Chefs</a>
              </li>
              <li>
                <a href="#">Gallery</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>
            © 2025 GrandVista by{" "}
            <span className="developer-name">Sudhakar</span>
          </p>
          <div className="footer-bottom-links">
            <a href="#">Terms of Use</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
