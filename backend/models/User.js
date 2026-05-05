const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,

    // ✅ ADD THIS

  otp: {

    type: String,

  },

  otpExpiry: {

    type: Date,

  },
  welcomeSent: {
  type: Boolean,
  default: false,
},

  savedItems: [
    {
      title: String,
      type: String,
    },
  ],

  readingHistory: [
    {
      title: String,
      minutes: Number,
      date: { type: Date, default: Date.now },
    },
  ],

  stats: {
    totalMinutes: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model("User", userSchema);