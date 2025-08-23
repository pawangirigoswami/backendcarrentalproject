const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null
  },
  email: {
    type: String,
    unique: true, // Ensures no duplicate emails
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: Number, // Changed from String to Number
    default: 1    // Assuming 1 = Admin, you can modify as needed
  },
  status: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now // Corrected function reference
  }
});

// Create the Admin model
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
