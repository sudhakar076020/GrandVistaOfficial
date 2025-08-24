import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // SweetAlert2 for login alert message
import Cookies from "js-cookie";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); //Input password show password

  // If JWT token is exists in cookies, skip the login page
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
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      // Login alert message by sweetAlert2
      Swal.fire({
        title: "Registration successful please Login",
        icon: "success",
        draggable: true,
      });
      navigate("/login");
      console.log(res.data);
    } catch (error) {
      // Login error alert message by sweetAlert2
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Registration failed",
      });
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Register</h2>
        <form onSubmit={submitRegisterForm}>
          <input
            className="form-input"
            type="text"
            name="username"
            placeholder="Username"
            onChange={inputChangeValue}
            required
          />
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="Email"
            onChange={inputChangeValue}
            required
          />
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={inputChangeValue}
              required
              minLength={8}
              autoComplete="new-password"
            />{" "}
            {/*autoComplete="new-password" is don't Save Password in Chrome*/}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password-icon"
            >
              {showPassword ? (
                <i class="fa-solid fa-eye-slash"></i>
              ) : (
                <i class="fa-solid fa-eye"></i>
              )}
            </span>
          </div>
          <br />
          <button className="submit-btn" type="submit">
            Register
          </button>
        </form>
        <p className="form-word">
          Already have an account?
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
