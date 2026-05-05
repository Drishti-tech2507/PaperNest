import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OTPVerification() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("resetEmail");

    if (!email) {
      alert("Session expired. Please try again.");
      navigate("/forgot-password");
      return;
    }

    if (!otp || otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8000/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("OTP Verified ✅");
      navigate("/reset-password");

    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md animate-fadeIn">
        
        <h1 className="text-4xl font-bold text-center mb-6">
          Verify OTP 🔐
        </h1>

        <p className="text-gray-300 text-center mb-6">
          Enter the 6-digit OTP sent to your email
        </p>

        <form onSubmit={handleVerifyOTP} className="space-y-5">
          
          {/* OTP INPUT */}
          <input
            type="text"
            maxLength="6"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="------"
            className="w-full p-3 text-center text-xl tracking-[0.5em] rounded-lg bg-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded-full font-bold hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* RESEND */}
        <p className="text-center mt-6 text-gray-300">
          Didn’t receive OTP?{" "}
          <a
            href="/forgot-password"
            className="text-yellow-400 hover:underline"
          >
            Resend OTP
          </a>
        </p>
      </div>
    </div>
  );
}

export default OTPVerification;