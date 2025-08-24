const express = require("express");
const Reservation = require("../models/Reservation");

const router = express.Router();

// @desc    Create a new reservation
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, date, time, guests } = req.body;

    const newReservation = new Reservation({
      name,
      email,
      phone,
      date,
      time,
      guests,
    });

    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(500).json({ error: "Failed to create reservation" });
  }
});

// @route   GET /api/reservations
// @desc    Get all reservations
router.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ date: 1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reservations" });
  }
});

module.exports = router;
