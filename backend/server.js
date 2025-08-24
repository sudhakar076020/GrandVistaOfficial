const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const foodRoutes = require("./routes/foodRoutes");
const userRoutes = require("./routes/auth");
const reservationRoutes = require("./routes/reservationRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// connect DB
connectDB();

// routes
app.use("/api/foods", foodRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/reservations", reservationRoutes);

// test
app.get("/", (req, res) => {
  res.send("Restaurant API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
