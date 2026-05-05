import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔥 Password strength logic
  const getStrength = () => {
    if (password.length < 6) return "Weak";
    if (password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])/)) return "Strong";
    return "Medium";
  };

  const strengthColor = {
    Weak: "bg-red-500",
    Medium: "bg-yellow-400",
    Strong: "bg-green-500",
  };

  const handleReset = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("resetEmail");

    if (!email) {
      alert("Session expired. Try again.");
      navigate("/forgot-password");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8000/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword: password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Password updated successfully ✅");

      localStorage.removeItem("resetEmail");

      navigate("/login");

    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-4">

      <div className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-md animate-fadeIn border border-white/10">

        <h1 className="text-4xl font-bold text-center mb-6">
          Reset Password 🔐
        </h1>

        <p className="text-gray-300 text-center mb-6">
          Create a new secure password
        </p>

        <form onSubmit={handleReset} className="space-y-5">

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pr-12 rounded-lg bg-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400"
            />

            {/* 👁️ Toggle */}
            <span
              onClick={() => setShow(!show)}
              className="absolute right-3 top-3 cursor-pointer text-gray-300"
            >
              {show ? "🙈" : "👁️"}
            </span>
          </div>

          {/* STRENGTH BAR */}
          {password && (
            <div>
              <div className="h-2 w-full bg-gray-700 rounded">
                <div
                  className={`h-2 rounded ${strengthColor[getStrength()]} w-${
                    getStrength() === "Weak"
                      ? "1/3"
                      : getStrength() === "Medium"
                      ? "2/3"
                      : "full"
                  }`}
                ></div>
              </div>
              <p className="text-sm mt-1 text-gray-400">
                Strength: {getStrength()}
              </p>
            </div>
          )}

          {/* CONFIRM PASSWORD */}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-black py-3 rounded-full font-bold hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>

        {/* EXTRA */}
        <p className="text-center mt-6 text-gray-300">
          Remember password?{" "}
          <a href="/login" className="text-yellow-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;