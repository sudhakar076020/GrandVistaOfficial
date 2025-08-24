import "./styles.css";
import { IoCloseOutline } from "react-icons/io5";

const orderedFoodsList = [
  {
    id: 1,
    foodImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmgtUlQ7j1qqkT6Q9Sousf681_ChiXUvrsLw&s",
    foodName: "Biriyani",
    quantity: 2,
    totalPrice: 400,
  },
  {
    id: 2,
    foodImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_41ZBwmYLTTWYH_bCQ1Gyj6og0CbCFq2r1yTjcyT76WsEbymNvzXiQ5ItKgq5FIFMfbY&usqp=CAU",
    foodName: "Pizza",
    quantity: 1,
    totalPrice: 300,
  },
];

const OrderedFoods = () => {
  return (
    <div className="user-ordered-details-card">
      <h2>Ordered Foods Details</h2>
      <ul className="ordered-list">
        {orderedFoodsList.length === 0 ? (
          <li className="no-ordered">No ordered foods found.</li>
        ) : (
          <>
            {orderedFoodsList.map((food) => (
              <li key={food.id} className="ordered-item">
                <div className="food-info">
                  <img
                    src={food.foodImage}
                    alt={food.foodName}
                    className="dashboard-food-image"
                  />
                  <div className="food-details">
                    <p className="food-name">{food.foodName}</p>
                    <p className="food-price">₹{food.totalPrice}</p>
                  </div>
                </div>

                <div className="quantity_cancel-card">
                  <div className="quantity-controls">
                    <button className="qty-btn">-</button>
                    <span>{food.quantity}</span>
                    <button className="qty-btn">+</button>
                  </div>

                  <button type="button" className="cancel-order-button">
                    <IoCloseOutline />
                  </button>
                </div>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default OrderedFoods;
