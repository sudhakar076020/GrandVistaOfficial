const express = require("express");
const Reservation = require("../models/Reservation");
const router = express.Router();
const transporter = require("../mailer/mailer");

const authMiddleware = require("../middleware/authMiddleware");

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
router.get("/", authMiddleware, async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservations", error });
  }
});

// DELETE reservation
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation)
      return res.status(404).json({ message: "Reservation not found" });
    res.json({ message: "Reservation deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting reservation", error });
  }
});

// Send Email for table reservation confirmation
router.post("/send-confirmation", authMiddleware, async (req, res) => {
  const {
    tableNumber,
    userName,
    userEmail,
    phone,
    guests,
    date,
    time,
    bookedTime,
  } = req.body;

  // Email validation
  if (!userEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address. Please provide a valid email.",
    });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Table Reservation Confirmation - GrandVista",
    html: `
      <h2>Reservation Confirmed!</h2>
      <p>Dear ${userName},</p>
      <p>Your table has been successfully reserved!</p>
      <ul>
        <li><strong>Table Number:</strong> ${tableNumber}</li>
        <li><strong>Name:</strong> ${userName}</li>
        <li><strong>Email:</strong> ${userEmail}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>No. of Guests:</strong> ${guests}</li>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${time}</li>
        <li><strong>Booked Time:</strong> ${bookedTime}</li>
      </ul>
      <p>We look forward to serving you!</p>
      <p>Best regards,</p>
      <p><strong>The GrandVista Team</strong></p>
        <hr />
      <p><strong>Contact Us:</strong></p>
      <p>
        📍 GrandVista Fine Dining, MG Road, Bengaluru, India <br />
        📞 +91 98765 43210 <br />
        ✉️ support@grandvista.com
      </p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Mail sent successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error sending mail", error });
  }
});

// Send Email for table reservation Rejection
router.post("/send-rejection", authMiddleware, async (req, res) => {
  const { userName, userEmail, phone, guests, date, time, bookedTime } =
    req.body;

  // Email validation
  if (!userEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address. Please provide a valid email.",
    });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Table Reservation Update - GrandVista",
    html: `
    <h2>Reservation Unavailable</h2>
    <p>Dear ${userName},</p>
    <p>Thank you for choosing <strong>GrandVista</strong>. Unfortunately, we’re unable to confirm your reservation because the selected time and date slot is not available.</p>
    
    <h3>Reservation Details</h3>
    <ul>
      <li><strong>Name:</strong> ${userName}</li>
      <li><strong>Email:</strong> ${userEmail}</li>
      <li><strong>Phone:</strong> ${phone}</li>
      <li><strong>No. of Guests:</strong> ${guests}</li>
      <li><strong>Date:</strong> ${date}</li>
      <li><strong>Time:</strong> ${time}</li>
      <li><strong>Booked Time:</strong> ${bookedTime}</li>
    </ul>

    <p>We sincerely apologize for the inconvenience. You may try booking for another available time slot, and we’ll be happy to assist you in making new arrangements.</p>
    
    <p>We truly appreciate your interest in dining with us and look forward to welcoming you soon.</p>
    
    <p>Warm regards,</p>
    <p><strong>The GrandVista Team</strong></p>

      <hr />
    <p><strong>Contact Us:</strong></p>
    <p>
      📍 GrandVista Fine Dining, MG Road, Bengaluru, India <br />
      📞 +91 98765 43210 <br />
      ✉️ support@grandvista.com
    </p>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Mail sent successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error sending mail", error });
  }
});

module.exports = router;
