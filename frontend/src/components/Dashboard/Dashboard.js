import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns"; // Formate the Date
import axios from "axios";
import "./Dashboard.css";
import Swal from "sweetalert2"; // SweetAlert2 for logout alert message
import Cookies from "js-cookie";

// Components
import OrderedFoods from "../OrderedFoods";
import UserReservations from "../UserReservations";

const dashboardTabsList = [
  { id: "ORDERED_FOOD", label: "Ordered Food" },
  { id: "RESERVATION", label: "Reservation" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loginTime, setLoginTime] = useState("");
  const [activeTab, setActiveTab] = useState(dashboardTabsList[1].id);

  // SweetAlert2 The logout alert message popup
  const handleLogout = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "logout-confirm-btn",
        cancelButton: "logout-cancel-btn",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You will be logged out!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, logout!",
        cancelButtonText: "No, stay here",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          Cookies.remove("token");
          swalWithBootstrapButtons.fire({
            title: "Logged out!",
            text: "You have been successfully logged out.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          navigate("/home");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "You are still logged in :)",
            icon: "info",
            timer: 1200,
            showConfirmButton: false,
          });
        }
      });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get("token");
        const res = await axios.get("http://localhost:5000/api/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
        // Logged in - formatted Time
        const formatLoginTime = format(
          new Date(),
          "EEEE, MMMM do yyyy, h:mm:ss a"
        );
        setLoginTime(formatLoginTime); // Set Login Time
      } catch (error) {
        console.log("Failed to fetch user", error);
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  const handleDashboardTabClick = (id) => {
    setActiveTab(id);
  };

  return (
    <div className="dashboard-container">
      {/* Dashboard Header */}
      <div className="dashboard-card">
        <div className="profile-card">
          <h1>
            Welcome
            {user && <span className="user-name"> {user.username}</span>}
          </h1>
          {user && <p className="user-email">Logged in as: {user.email}</p>}
          <p className="login-time">Login time: {loginTime}</p>
        </div>
        <button type="button" onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      {/* Dashboard Content bottom */}
      <div className="dashboard-content-card">
        {/* Dashboard Tabs */}
        <ul className="dashboard-tabs-card">
          {dashboardTabsList.map((tab) => (
            <li key={tab.id} className="dashboard-tab">
              <button
                type="button"
                className={`dashboard-tab-btn ${
                  activeTab === tab.id ? "active-dashboard-tab" : ""
                }`}
                onClick={() => {
                  handleDashboardTabClick(tab.id);
                }}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
        {/* Dashboard Content */}
        <div className="dashboard-content">
          {activeTab === "ORDERED_FOOD" && <OrderedFoods />}
          {activeTab === "RESERVATION" && <UserReservations />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
