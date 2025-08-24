const express = require("express");
const router = express.Router();
const Food = require("../models/Food");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE food (Admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const food = await Food.create(req.body);
    res.status(201).json({ message: "Food item created", food });
  } catch (error) {
    res.status(500).json({ message: "Error creating food", error });
  }
});

// READ all foods (Public)
router.get("/", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: "Error fetching foods", error });
  }
});

// UPDATE food (Admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.json({ message: "Food updated", food });
  } catch (error) {
    res.status(500).json({ message: "Error updating food", error });
  }
});

// DELETE food (Admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.json({ message: "Food deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting food", error });
  }
});

module.exports = router;
