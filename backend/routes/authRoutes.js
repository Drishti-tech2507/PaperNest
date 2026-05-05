const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");


// ================= SEND OTP =================
router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    console.log("EMAIL:", email);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Prevent multiple OTP overwrite
    if (user.otp && user.otpExpiry > Date.now()) {
      return res.json({
        message: "OTP already sent. Check your email.",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    console.log("OTP GENERATED:", otp);

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;

    await user.save();

    await sendEmail(email, "Your OTP 🔐", `Your OTP is ${otp}`);

    res.json({ message: "OTP sent successfully" });

  } catch (error) {
    console.log("❌ ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= VERIFY OTP =================
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    console.log("Entered OTP:", otp);
    console.log("Stored OTP:", user.otp);

    if (user.otp !== otp.trim()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    res.json({ message: "OTP verified successfully" });

  } catch (error) {
    console.log("❌ ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= RESET PASSWORD =================
router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    user.password = hashed;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (error) {
    console.log("❌ ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // ================= EMAIL LOGIC =================
    try {
      if (!user.welcomeSent) {
        // 🌟 FIRST LOGIN
        await sendEmail(
  email,
  "Welcome to PaperNest",
  `
Hi ${user.fullName},

Welcome to PaperNest.

We’ve built PaperNest to help you read better, discover meaningful content, and stay informed — all in one place.

You can now:
• Explore books tailored to your interests  
• Access research and insightful content  
• Stay updated with curated news  

Your account is ready — you can begin anytime.

If you need any help, feel free to reach out to us.

Regards,  
PaperNest Team
  `
);

        user.welcomeSent = true;
        await user.save();

      } else {
        // 🔁 RETURNING USER
        await sendEmail(
          email,
          "Welcome back to PaperNest 💛",
          `
Hey ${user.fullName} 👋,

Welcome back!

📚 Your saved books are waiting  
🔥 Continue your reading streak  
✨ Discover something new  

Happy reading 💫

– Team PaperNest
          `
        );
      }
    } catch (err) {
      console.log("Email error:", err.message);
    }

    // =================================================

    res.json({ token, user, message: "Login successful" });

  } catch (error) {
    console.log("❌ LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      password: hashed,
      welcomeSent: false, // ✅ important
    });

    res.json({ message: "Registered successfully" });

  } catch (error) {
    console.log("❌ REGISTER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= EXPORT =================
module.exports = router;