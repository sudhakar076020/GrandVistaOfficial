import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import { ClipLoader } from "react-spinners"; // Loader

const API_URL = process.env.API_URL;

const Login = () => {
  const navigate = useNavigate();

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false); // Loader

  // If JWT token exists in cookies, skip login page
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      navigate("/home"); // absolute path
    }
  }, [navigate]);

  const inputChangeValue = (event) => {
    setLoginFormData({
      ...loginFormData,
      [event.target.name]: event.target.value,
    });
  };

  const submitLoginForm = async (event) => {
    event.preventDefault();
    setLoader(true); //Loader
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, loginFormData);
      Cookies.set("token", res.data.token, { expires: 7, secure: true });
      Swal.fire({
        icon: "success",
        title: "Welcome back!",
        text: "Login successful",
        timer: 1500,
        showConfirmButton: false,
      });
      setLoader(false); //Loader
      navigate("/home");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || error.message,
      });
      setLoader(false); //Loader
    }
  };

  return (
    <div className="form-section">
      <div className="form-card">
        <h2 className="form-title">Login</h2>
        <p className="form-subtitle">Welcome back! Please login</p>

        <form className="contact-form" onSubmit={submitLoginForm}>
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

          <div className="form-group password-field">
            <label>Password</label>
            <input
              className="form-input"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              onChange={inputChangeValue}
              required
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
            {loader ? <ClipLoader color="#0e0c0a" size={20} /> : "LOGIN"}
          </button>
        </form>

        <p className="form-word">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
