import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // SweetAlert2 for login alert message
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate(); // ✅ put this first

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  // If JWT token exists in cookies, skip login page
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      navigate("/home"); //  absolute path
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
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginFormData
      );
      Cookies.set("token", res.data.token, { expires: 1, secure: true });
      Swal.fire({
        icon: "success",
        title: "Welcome back!",
        text: "Login successful",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/dashboard"); // ✅ correct path
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Login</h2>
        <form onSubmit={submitLoginForm}>
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="Email"
            onChange={inputChangeValue}
          />
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={inputChangeValue}
              autoComplete="new-password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password-icon"
            >
              {showPassword ? (
                <i className="fa-solid fa-eye-slash"></i>
              ) : (
                <i className="fa-solid fa-eye"></i>
              )}
            </span>
          </div>
          <br />
          <button className="submit-btn" type="submit">
            Login
          </button>
        </form>
        <p className="form-word">
          Don't have an account?
          <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
