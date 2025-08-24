const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  foodName: { type: String, required: true },
  foodPrice: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  imageUrl: { type: String },
  isAvailable: { type: Boolean, default: true },
  preparationTime: { type: Number }, // minutes
  rating: { type: Number, min: 0, max: 5 },
});

module.exports = mongoose.model("Food", foodSchema);
