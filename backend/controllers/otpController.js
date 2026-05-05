const Otp = require("../models/Otp");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const generateOtp = require("../utils/generateOtp");
const sendEmail = require("../utils/sendEmail");


// SEND OTP
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    console.log("📩 OTP Request Email:", email);

    // Restrict to Gmail/Yahoo only
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Only Gmail or Yahoo accounts are allowed",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User not found");

      return res.status(404).json({
        message: "User not found",
      });
    }

    // Generate OTP
    const otp = generateOtp();

    console.log("🔥 DEBUG OTP:", otp);

    // Delete previous OTPs
    await Otp.deleteMany({ email });

    // Save OTP
    await Otp.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    console.log("🚀 OTP saved to MongoDB");

    // Send OTP Email
    await sendEmail(
      email,
      "PaperNest Password Reset OTP",
      `Your PaperNest OTP is: ${otp}. It expires in 5 minutes.`
    );

    res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("❌ Failed to send OTP:", error);

    res.status(500).json({
      message: "Failed to send OTP",
      error: error.message,
    });
  }
};


// VERIFY OTP + RESET PASSWORD
const verifyOtpAndResetPassword = async (
  req,
  res
) => {
  try {
    const { email, otp, newPassword } = req.body;

    console.log("🔎 Verifying OTP for:", email);

    const otpRecord = await Otp.findOne({
      email,
      otp,
    });

    if (!otpRecord) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    // Update password
    await User.findOneAndUpdate(
      { email },
      {
        password: hashedPassword,
      }
    );

    // Remove OTP after success
    await Otp.deleteMany({ email });

    console.log(
      "✅ Password reset successful for:",
      email
    );

    res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    console.error(
      "❌ Password reset failed:",
      error
    );

    res.status(500).json({
      message: "Password reset failed",
      error: error.message,
    });
  }
};


module.exports = {
  sendOtp,
  verifyOtpAndResetPassword,
};