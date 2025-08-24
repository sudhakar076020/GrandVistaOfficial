import "./styles.css";

import { motion } from "framer-motion"; // Importing framer-motion for animations

import { IoTimeOutline, IoStar } from "react-icons/io5"; // Clock and  Star Icon

import FoodMenu from "../../context/menuContext";
import MenuCategoryTab from "../MenuCategoryTab";

const foodMenuTabList = [
  { id: "Main Course", menuCategoryName: "Main Course" },
  { id: "Appetizer", menuCategoryName: "Appetizer" },
  { id: "Dessert", menuCategoryName: "Dessert" },
  { id: "Beverage", menuCategoryName: "Beverage" },
];

const OurFoodMenu = () => {
  return (
    <FoodMenu.Consumer>
      {(value) => {
        const { menuList, activeCategoryTab } = value;
        console.log(menuList.length);
        return (
          <div className="our-menu-section" id="menu">
            <h1 className="section-header-title">Our Menu</h1>
            <ul className="foodMenu-category-container">
              {foodMenuTabList.map((category) => (
                <MenuCategoryTab
                  key={category.id}
                  categoryItem={category}
                  isActiveCategory={activeCategoryTab === category.id}
                />
              ))}
            </ul>
            <ul className="menu-section-container">
              {menuList
                .filter(
                  (foodCategory) => foodCategory.category === activeCategoryTab
                )
                .map((food, index) => (
                  <motion.li
                    key={food.id}
                    className="food-card"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    {/* Image Section */}
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

                    {/* Name + Price */}
                    <div className="food-header">
                      <h3 className="food-name">{food.foodName}</h3>
                      <p className="food-price">₹{food.foodPrice}</p>
                    </div>

                    {/* Description */}
                    <p className="food-description">{food.description}</p>

                    {/* Order Button + Time */}
                    <div className="food-footer">
                      <button className="order-btn">Order Now</button>
                      <div className="preparationTime-card">
                        <IoTimeOutline color="#333" size={20} />
                        <p className="food-time">{food.preparationTime} mins</p>
                      </div>
                    </div>
                  </motion.li>
                ))}
            </ul>
          </div>
        );
      }}
    </FoodMenu.Consumer>
  );
};

export default OurFoodMenu;
