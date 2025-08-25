import React from "react";
import { motion } from "framer-motion";
import { IoTimeOutline, IoStar } from "react-icons/io5";
import { MdOutlineModeEditOutline, MdOutlineDelete } from "react-icons/md";

const FoodList = (props) => {
  const {
    foods,
    filteredFoodCategory,
    searchFoodItem,
    handleCategoryChange,
    handleSearchChange,
    handleEdit,
    handleDelete,
    foodCategories,
  } = props;

  // Apply both category and search filters
  const filteredFoods = foods
    .filter((food) =>
      filteredFoodCategory === "All Categories"
        ? true
        : food.category === filteredFoodCategory
    )
    .filter((food) =>
      food.foodName.toLowerCase().includes(searchFoodItem.toLowerCase())
    );

  return (
    <div className="admin-right-container">
      <div className="search-box-container">
        {/* Menu Category Tab */}
        <div className="menu-category-tab">
          <select onChange={handleCategoryChange} value={filteredFoodCategory}>
            <option value="All Categories">All Categories</option>
            {foodCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.menuCategoryName}
              </option>
            ))}
          </select>
        </div>

        {/* Total Food Items and Category items counts */}
        <div className="total-foodsCount-group">
          Total Food Items: <span className="food-count">{foods.length}</span> |
          Showing Food Items:{" "}
          <span className="food-count">{filteredFoods.length}</span>
        </div>

        {/* Search Box */}
        <div className="search-group">
          <input
            value={searchFoodItem}
            onChange={handleSearchChange}
            type="text"
            placeholder="Search Food Items..."
          />
        </div>
      </div>

      {/* Food List */}
      <div className="food-list-container">
        <ul className="admin-menu-section-container">
          {filteredFoods.length === 0 ? (
            <div className="empty-food-list-card">
              <p>No food items found.</p>
            </div>
          ) : (
            filteredFoods.map((food, index) => (
              <motion.li
                key={food._id}
                className="food-card admin-food-card"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="food-image-container">
                  <div className="food-badge">
                    <IoStar color="#FFAA33" size={12} />
                    <span>{food.rating}</span>
                  </div>
                  <span className="food-badge right">
                    {food.isAvailable ? "Available" : "Not Available"}
                  </span>
                  <img
                    src={food.imageUrl}
                    alt={food.name}
                    className="food-image"
                  />
                </div>

                <div className="food-header">
                  <h3 className="food-name">{food.foodName}</h3>
                  <p className="food-price">₹{food.foodPrice}</p>
                </div>

                <p className="food-description">{food.description}</p>

                <div className="food-footer">
                  <div className="btn-container">
                    <a href="#foodForm" className="view-btn">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(food)}
                      >
                        <MdOutlineModeEditOutline className="edit-icon" />
                      </button>
                    </a>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(food._id)}
                    >
                      <MdOutlineDelete className="delete-icon" />
                    </button>
                  </div>
                  <div className="preparationTime-card">
                    <IoTimeOutline color="#777" size={20} />
                    <p className="food-time">{food.preparationTime} mins</p>
                  </div>
                </div>
              </motion.li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default FoodList;
