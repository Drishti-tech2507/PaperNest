import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:8000/api/auth/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to send OTP");
        return;
      }

      // ✅ store email for OTP page
      localStorage.setItem("resetEmail", email);

      alert("OTP sent to your email 📧");
      navigate("/otp-verification");
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md animate-fadeIn">
        
        <h1 className="text-4xl font-bold text-center mb-6">
          Forgot Password 🔐
        </h1>

        <p className="text-gray-300 text-center mb-6">
          Enter your registered email to receive an OTP
        </p>

        <form onSubmit={handleSendOTP} className="space-y-5">
          
          {/* EMAIL INPUT */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400"
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-white text-black py-3 rounded-full font-bold hover:scale-105 transition"
          >
            Send OTP
          </button>
        </form>

        {/* BACK TO LOGIN */}
        <p className="text-center mt-6 text-gray-300">
          Remember your password?{" "}
          <a
            href="/login"
            className="text-yellow-400 hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;