import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "../../components/Navbar";
import FoodForm from "./AddNewFoodForm";
import FoodList from "./FoodList";

const API_URL = "http://localhost:5000/api/foods";
const ADMIN_HEADERS = { headers: { "x-user-role": "admin" } };

const foodCategories = [
  { id: "Main Course", menuCategoryName: "Main Course" },
  { id: "Appetizer", menuCategoryName: "Appetizer" },
  { id: "Dessert", menuCategoryName: "Dessert" },
  { id: "Beverage", menuCategoryName: "Beverage" },
];

const AdminFoodPanel = () => {
  const [foods, setFoods] = useState([]);
  const [form, setForm] = useState({
    foodName: "",
    foodPrice: "",
    description: "",
    category: foodCategories[0].id,
    imageUrl: "",
    isAvailable: true,
    isVeg: true,
    preparationTime: "",
    rating: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [filteredFoodCategory, setFilteredFoodCategory] =
    useState("All Categories");
  const [searchFoodItem, setSearchFoodItem] = useState("");

  // Fetch foods
  const fetchFoods = async () => {
    try {
      const res = await axios.get(API_URL, ADMIN_HEADERS);
      setFoods(res.data);
    } catch (err) {
      toast.error("Failed to fetch food items!");
    }
  };

  // Fetch foods on component mount
  useEffect(() => {
    fetchFoods();
  }, []);

  // Change browser title
  useEffect(() => {
    document.title = "GrandVista | Admin Food Panel";
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  // Handle category and search changes
  const handleCategoryChange = (e) => setFilteredFoodCategory(e.target.value);
  // Handle search change
  const handleSearchChange = (e) => setSearchFoodItem(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form, ADMIN_HEADERS);
        toast.success("Food updated successfully!");
      } else {
        await axios.post(API_URL, form, ADMIN_HEADERS);
        toast.success("Food added successfully!");
      }
      setForm({
        foodName: "",
        foodPrice: "",
        description: "",
        category: foodCategories[0].id,
        imageUrl: "",
        isAvailable: true,
        isVeg: true,
        preparationTime: "",
        rating: "",
      });
      setEditingId(null);
      fetchFoods();
    } catch {
      toast.error("Error while saving food!");
    }
  };

  // Handle edit action
  const handleEdit = (food) => {
    setForm(food);
    setEditingId(food._id);
  };
  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, ADMIN_HEADERS);
      toast.success("Food deleted successfully!");
      fetchFoods();
    } catch {
      toast.error("Failed to delete food!");
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }} className="admin-container">
        <h2 className="section-header-title">Admin Food Panel</h2>
        <div className="admin-card">
          {/* Left: Food Form */}
          <FoodForm
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            editingId={editingId}
            foodCategories={foodCategories}
          />

          {/* Right: Food List */}
          <FoodList
            foods={foods}
            filteredFoodCategory={filteredFoodCategory}
            searchFoodItem={searchFoodItem}
            handleCategoryChange={handleCategoryChange}
            handleSearchChange={handleSearchChange}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            foodCategories={foodCategories}
          />
        </div>

        <ToastContainer
          position="top-right"
          autoClose={2000}
          style={{ marginTop: "50px" }}
        />
      </div>
    </>
  );
};

export default AdminFoodPanel;
