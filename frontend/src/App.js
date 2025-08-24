import "./index.css";

import axios from "axios";

import { v4 as uuidv4 } from "uuid";
import { Component } from "react";
import FoodMenu from "./context/menuContext";

import { Routes, Route } from "react-router-dom";

// Components
import Home from "./components/Home";
import About from "./components/About";
import MenuSection from "./components/Menu";
import TableReservation from "./components/ContactReservationForm/tableReservation";
import ContactUsForm from "./components/ContactReservationForm/contact";

// Admin panel for CRUD for the foodItems
import AdminFoodPanel from "./adminPages/AdminFoodPanel/adminFoodPanel";

const foodMenuList = [
  // Existing 10 items

  {
    id: uuidv4(),
    foodName: "Tacos",
    foodPrice: 200,
    description: "Soft tacos filled with spicy beef and fresh salsa.",
    category: "Main Course",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1679231521293-e13146411fb2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isAvailable: true,
    preparationTime: "8 mins",
    rating: 4.4,
  },
  {
    id: uuidv4(),
    foodName: "Sushi Platter",
    foodPrice: 450,
    description: "Fresh assorted sushi served with soy sauce and wasabi.",
    category: "Main Course",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1668146927669-f2edf6e86f6f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isAvailable: true,
    preparationTime: "10 mins",
    rating: 4.8,
  },
  {
    id: uuidv4(),
    foodName: "Cheeseburger",
    foodPrice: 180,
    description: "Juicy cheeseburger with lettuce, tomato, and pickles.",
    category: "Main Course",
    imageUrl:
      "https://images.unsplash.com/photo-1603498195855-4f17930ee40b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isAvailable: true,
    preparationTime: "7 mins",
    rating: 4.3,
  },
  {
    id: uuidv4(),
    foodName: "Caesar Salad",
    foodPrice: 150,
    description: "Crisp romaine lettuce with creamy Caesar dressing.",
    category: "Appetizer",
    imageUrl:
      "https://images.unsplash.com/photo-1746211108786-ca20c8f80ecd?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isAvailable: true,
    preparationTime: "5 mins",
    rating: 4.1,
  },
  {
    id: uuidv4(),
    foodName: "Butter Chicken",
    foodPrice: 350,
    description: "Creamy butter chicken served with soft naan bread.",
    category: "Main Course",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1723575734758-97e6e862a670?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isAvailable: true,
    preparationTime: "18 mins",
    rating: 4.6,
  },
  {
    id: uuidv4(),
    foodName: "Pepperoni Pizza",
    foodPrice: 400,
    description: "Cheesy pepperoni pizza baked in a wood-fired oven.",
    category: "Main Course",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1667682942148-a0c98d1d70db?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isAvailable: true,
    preparationTime: "15 mins",
    rating: 4.5,
  },
  {
    id: uuidv4(),
    foodName: "Chocolate Cake",
    foodPrice: 120,
    description: "Rich chocolate cake topped with smooth ganache.",
    category: "Dessert",
    imageUrl:
      "https://images.unsplash.com/photo-1682596044365-eb5c3bc51555?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isAvailable: true,
    preparationTime: "5 mins",
    rating: 4.9,
  },
  {
    id: uuidv4(),
    foodName: "Falafel Wrap",
    foodPrice: 160,
    description: "Crispy falafel wrapped with tahini and fresh veggies.",
    category: "Main Course",
    imageUrl:
      "https://images.unsplash.com/photo-1649138783888-0ec9c3ec2f21?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isAvailable: true,
    preparationTime: "6 mins",
    rating: 4.2,
  },

  // New 10 items - Beverage Category
  {
    id: uuidv4(),
    foodName: "Iced Coffee",
    foodPrice: 90,
    description: "Chilled coffee with milk and a hint of vanilla syrup.",
    category: "Beverage",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661756773609-24b47ea2b34b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isAvailable: true,
    preparationTime: "3 mins",
    rating: 4.3,
  },
  {
    id: uuidv4(),
    foodName: "Lemon Iced Tea",
    foodPrice: 70,
    description: "Refreshing iced tea with lemon slices.",
    category: "Beverage",
    imageUrl:
      "https://images.unsplash.com/photo-1656936632107-0bfa69ea06de?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isAvailable: true,
    preparationTime: "2 mins",
    rating: 4.2,
  },
  {
    id: uuidv4(),
    foodName: "Hot Chocolate",
    foodPrice: 95,
    description: "Creamy hot chocolate topped with whipped cream.",
    category: "Beverage",
    imageUrl:
      "https://images.unsplash.com/photo-1519749309470-4be889b4e4e2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isAvailable: true,
    preparationTime: "5 mins",
    rating: 4.8,
  },
  {
    id: uuidv4(),
    foodName: "Green Tea",
    foodPrice: 60,
    description: "Light and healthy hot green tea.",
    category: "Beverage",
    imageUrl:
      "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isAvailable: true,
    preparationTime: "3 mins",
    rating: 4.1,
  },
  {
    id: uuidv4(),
    foodName: "Orange Juice",
    foodPrice: 80,
    description: "Freshly squeezed orange juice.",
    category: "Beverage",
    imageUrl:
      "https://images.unsplash.com/photo-1692296979427-f3679c8d13e4?q=80&w=813&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isAvailable: true,
    preparationTime: "3 mins",
    rating: 4.4,
  },
  {
    id: uuidv4(),
    foodName: "Strawberry Milkshake",
    foodPrice: 120,
    description: "Strawberry milkshake with a scoop of vanilla ice cream.",
    category: "Beverage",
    imageUrl:
      "https://images.unsplash.com/photo-1629174114500-6ec256a6213f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isAvailable: true,
    preparationTime: "4 mins",
    rating: 4.7,
  },
  {
    id: uuidv4(),
    foodName: "Coconut Water",
    foodPrice: 50,
    description: "Chilled fresh coconut water.",
    category: "Beverage",
    imageUrl:
      "https://images.unsplash.com/photo-1711815122728-b370f7392f23?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isAvailable: true,
    preparationTime: "1 min",
    rating: 4.5,
  },
  {
    id: uuidv4(),
    foodName: "Milk Tea",
    foodPrice: 75,
    description: "Hot milk tea brewed with strong black tea leaves.",
    category: "Beverage",
    imageUrl:
      "https://images.unsplash.com/photo-1553611323-8c7976b6a39b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isAvailable: true,
    preparationTime: "5 mins",
    rating: 4.0,
  },
  {
    id: uuidv4(),
    foodName: "Watermelon Juice",
    foodPrice: 85,
    description: "Fresh watermelon juice served chilled.",
    category: "Beverage",
    imageUrl:
      "https://images.unsplash.com/photo-1579503739626-d1cfa5cba7fa?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isAvailable: true,
    preparationTime: "3 mins",
    rating: 4.6,
  },
  {
    id: uuidv4(),
    foodName: "Pomegranate Mint Cooler",
    foodPrice: 250,
    description: "Fresh pomegranate juice with a hint of mint and lime.",
    category: "Beverage",
    imageUrl:
      "https://images.archanaskitchen.com/images/recipes/drink-recipes/cocktail-recipes/Pomegranate_Mint_Cocktail_Recipe_1_b1a238a744.jpg",
    isAvailable: true,
    preparationTime: "5 mins",
    rating: 4.8,
  },
  {
    id: uuidv4(),
    foodName: "Golden Mango Lassi",
    foodPrice: 220,
    description:
      "Creamy mango lassi topped with saffron strands and pistachios.",
    category: "Beverage",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqlowtFyJoyEHfSZTE7LL4nbt7NSWEfFERBwE06IaJ7up3qrQUdoNQvT4Kdhkl0dGoQX8&usqp=CAU",
    isAvailable: true,
    preparationTime: "4 mins",
    rating: 4.9,
  },
  {
    id: uuidv4(),
    foodName: "Watermelon Basil Refresher",
    foodPrice: 200,
    description:
      "Chilled watermelon juice infused with fresh basil and a splash of lime.",
    category: "Beverage",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY_785EmvIgqT01fws4cc8-DoanEkaWh3zHA&s",
    isAvailable: true,
    preparationTime: "5 mins",
    rating: 4.7,
  },
  {
    id: uuidv4(),
    foodName: "Tropical Lychee Punch",
    foodPrice: 280,
    description:
      "Exotic lychee blended with pineapple and passion fruit juice.",
    category: "Beverage",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1676642615413-e18b508a0ff3?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isAvailable: true,
    preparationTime: "6 mins",
    rating: 4.9,
  },
  {
    id: uuidv4(),
    foodName: "Berry Hibiscus Cooler",
    foodPrice: 240,
    description: "Mixed berry juice with hibiscus infusion, served chilled.",
    category: "Beverage",
    imageUrl:
      "https://thirstytales.com/wp-content/uploads/2025/03/Hibiscus-Berry-Cooler-Mocktail-Recipe.jpg",
    isAvailable: true,
    preparationTime: "5 mins",
    rating: 4.8,
  },
  // Additional Appetizers
  {
    id: uuidv4(),
    foodName: "Bruschetta",
    foodPrice: 140,
    description:
      "Grilled bread topped with fresh tomatoes, basil, and olive oil.",
    category: "Appetizer",
    imageUrl:
      "https://images.unsplash.com/photo-1623962470382-a01d602b3a16?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isAvailable: true,
    preparationTime: "5 mins",
    rating: 4.4,
  },
  {
    id: uuidv4(),
    foodName: "Spring Rolls",
    foodPrice: 130,
    description: "Crispy fried rolls stuffed with vegetables.",
    category: "Appetizer",
    imageUrl:
      "https://images.unsplash.com/photo-1731601816600-b86d5a1e35b3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isAvailable: true,
    preparationTime: "6 mins",
    rating: 4.5,
  },
  {
    id: uuidv4(),
    foodName: "Garlic Bread",
    foodPrice: 100,
    description: "Toasted bread with garlic butter and herbs.",
    category: "Appetizer",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1700064758614-392160787ce1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isAvailable: true,
    preparationTime: "4 mins",
    rating: 4.3,
  },
  {
    id: uuidv4(),
    foodName: "Stuffed Mushrooms",
    foodPrice: 160,
    description: "Mushrooms stuffed with cheese and herbs.",
    category: "Appetizer",
    imageUrl:
      "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/10/Stuffed-Mushrooms-main.jpg",
    isAvailable: true,
    preparationTime: "7 mins",
    rating: 4.6,
  },
  {
    id: uuidv4(),
    foodName: "Caprese Salad",
    foodPrice: 150,
    description: "Fresh mozzarella, tomatoes, and basil with olive oil.",
    category: "Appetizer",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/caprese-salad-recipe-2-664ceea357d6f.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*",
    isAvailable: true,
    preparationTime: "5 mins",
    rating: 4.5,
  },
  // Additional Desserts
  {
    id: uuidv4(),
    foodName: "Cheesecake",
    foodPrice: 180,
    description: "Creamy cheesecake topped with berry sauce.",
    category: "Dessert",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKepl20EHvn5hh5ZvelBhPLfSFGFmJVHAO4A&s",
    isAvailable: true,
    preparationTime: "8 mins",
    rating: 4.8,
  },
  {
    id: uuidv4(),
    foodName: "Tiramisu",
    foodPrice: 200,
    description: "Italian coffee-flavored dessert layered with mascarpone.",
    category: "Dessert",
    imageUrl:
      "https://i0.wp.com/mediterraneantaste.com/wp-content/uploads/2023/11/tiramisu-4583.jpg?fit=1024%2C683&ssl=1",
    isAvailable: true,
    preparationTime: "10 mins",
    rating: 4.9,
  },
  {
    id: uuidv4(),
    foodName: "Ice Cream Sundae",
    foodPrice: 150,
    description: "Ice cream topped with chocolate syrup and nuts.",
    category: "Dessert",
    imageUrl:
      "https://images.unsplash.com/photo-1657225953401-5f95007fc8e0?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isAvailable: true,
    preparationTime: "5 mins",
    rating: 4.7,
  },
  {
    id: uuidv4(),
    foodName: "Panna Cotta",
    foodPrice: 170,
    description: "Italian dessert made of sweetened cream set with gelatin.",
    category: "Dessert",
    imageUrl:
      "https://www.homecookingadventure.com/wp-content/uploads/2024/07/Caramel-Panna-Cotta-square1.webp",
    isAvailable: true,
    preparationTime: "8 mins",
    rating: 4.6,
  },
  {
    id: uuidv4(),
    foodName: "Fruit Tart",
    foodPrice: 160,
    description: "Crispy tart filled with cream and topped with fresh fruits.",
    category: "Dessert",
    imageUrl:
      "https://sugarspunrun.com/wp-content/uploads/2020/07/FRUIT-TART-PHOTOS-1-of-1.jpg",
    isAvailable: true,
    preparationTime: "7 mins",
    rating: 4.7,
  },
];

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
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/menu" element={<MenuSection />} />
          <Route
            exact
            path="/tableReservation"
            element={<TableReservation />}
          />
          <Route exact path="/contact" element={<ContactUsForm />} />
          <Route path="/admin" element={<AdminFoodPanel />} />
        </Routes>
      </FoodMenu.Provider>
    );
  }
}

export default App;
