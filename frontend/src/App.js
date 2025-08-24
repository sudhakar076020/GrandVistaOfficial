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
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
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
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/menu" element={<MenuSection />} />
          <Route
            exact
            path="/tableReservation"
            element={<TableReservation />}
          />
          <Route exact path="/contact" element={<ContactUsForm />} />
          <Route path="/admin" element={<AdminFoodPanel />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </FoodMenu.Provider>
    );
  }
}

export default App;
