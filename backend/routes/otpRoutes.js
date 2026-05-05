const express = require("express");

const {
  sendOtp,
  verifyOtpAndResetPassword,
} = require("../controllers/otpController");

const router = express.Router();

// Send OTP
router.post("/send-otp", sendOtp);

// Verify OTP + Reset Password
router.post(
  "/verify-reset-password",
  verifyOtpAndResetPassword
);

module.exports = router;