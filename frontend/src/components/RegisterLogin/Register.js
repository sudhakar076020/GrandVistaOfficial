import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

// Alert Notification
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners"; // Loader

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false); // Loader

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      navigate("./dashboard");
    }
  }, [navigate]);

  const inputChangeValue = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submitRegisterForm = async (event) => {
    event.preventDefault();
    setLoader(true); //Loader
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      Swal.fire({
        title: "Registration successful! Please Login",
        icon: "success",
        draggable: true,
      });
      navigate("/login");
      console.log(res.data);
      setLoader(false); //Loader
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Registration failed",
      });
      console.log(error);
      setLoader(false); //Loader
    }
  };

  return (
    <div className="form-section">
      <div className="form-card">
        <h2 className="form-title">Create an Account</h2>
        <p className="form-subtitle">Sign up to access your dashboard</p>

        <form className="contact-form" onSubmit={submitRegisterForm}>
          <div className="form-group">
            <label>Username</label>
            <input
              className="form-input"
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={inputChangeValue}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={inputChangeValue}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              className="form-input"
              type="text"
              name="phone"
              placeholder="Enter phone number"
              onChange={inputChangeValue}
              required
              pattern="[0-9]{10}"
            />
          </div>

          <div className="form-group password-field">
            <label>Password</label>
            <input
              className="form-input"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              onChange={inputChangeValue}
              required
              minLength={8}
              autoComplete="new-password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password-icon"
            >
              {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </span>
          </div>

          <button className="submit-btn" type="submit">
            {loader ? <ClipLoader color="#0e0c0a" size={20} /> : "REGISTER"}
          </button>
        </form>

        <p className="form-word">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        style={{ marginTop: "50px" }}
      />
    </div>
  );
};

export default Register;
