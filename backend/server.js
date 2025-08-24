const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const foodRoutes = require("./routes/foodRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/grandvistaofficial", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/foods", foodRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Restaurant API is running...");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
