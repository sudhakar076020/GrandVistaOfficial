const express = require("express");
const Reservation = require("../models/Reservation");

const router = express.Router();

// CREATE reservation
router.post("/", async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);
    res.status(201).json({ message: "Reservation created", reservation });
  } catch (error) {
    res.status(500).json({ message: "Error creating reservation", error });
  }
});

// READ all Reservations
router.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservations", error });
  }
});

// DELETE reservation
router.delete("/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation)
      return res.status(404).json({ message: "Reservation not found" });
    res.json({ message: "Reservation deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting reservation", error });
  }
});

module.exports = router;
