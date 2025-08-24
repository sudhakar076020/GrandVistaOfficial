import "./index.css";
import axios from "axios";
import { Component } from "react";
import FoodMenu from "./context/menuContext";

import { Routes, Route, Navigate } from "react-router-dom";

// Components
import Home from "./components/Home";
import About from "./components/About";
import MenuSection from "./components/Menu";
import TableReservation from "./components/ContactReservationForm/tableReservation";
import ContactUsForm from "./components/ContactReservationForm/contact";
import Login from "./components/RegisterLogin/Login";
import Register from "./components/RegisterLogin/Register";
import Dashboard from "./components/Dashboard/Dashboard";

// ProtectedRoute
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// Admin panel for CRUD for the foodItems
import AdminFoodPanel from "./adminPages/AdminFoodPanel/adminFoodPanel";

class App extends Component {
  state = {
    menuList: [],
    activeCategoryTab: "Main Course",
  };

  componentDidMount() {
    this.fetchFoodItems();
  }

  fetchFoodItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/foods/");
      this.setState({ menuList: res.data });
    } catch (err) {
      console.error("Error fetching foods:", err);
    }
  };

  handleCategoryTab = (id) => {
    this.setState({ activeCategoryTab: id });
  };

  render() {
    const { menuList, activeCategoryTab } = this.state;
    return (
      <FoodMenu.Provider
        value={{
          menuList,
          activeCategoryTab,
          handleCategoryTab: this.handleCategoryTab,
        }}
      >
        <Routes>
          {/* Default redirect to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Public routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<MenuSection />} />
          <Route path="/tableReservation" element={<TableReservation />} />
          <Route path="/contact" element={<ContactUsForm />} />

          {/* Admin Panel */}
          <Route path="/admin" element={<AdminFoodPanel />} />

          {/* Protected Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch-all for unknown routes */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </FoodMenu.Provider>
    );
  }
}

export default App;
