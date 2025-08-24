// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // optional restriction
      default: "user",
    },
  },
  { timestamps: true } // ✅ keep timestamps inside options
);

// This automatically creates a "users" collection
module.exports = mongoose.model("User", UserSchema);
