import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert(
        "Please enter email and password."
      );
      return;
    }

    // Gmail/Yahoo restriction
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;

    if (!emailRegex.test(email)) {
      alert(
        "Only Gmail or Yahoo accounts are allowed."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email,
          password,
        }
      );

      // Save token + user permanently
      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.data.user
        )
      );

      alert(response.data.message);

      navigate("/home");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8">
          Login to PaperNest
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          {/* Email */}
          <input
            type="email"
            placeholder="Gmail / Yahoo Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-white/20 outline-none text-white placeholder-gray-300"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full p-3 rounded-lg bg-white/20 outline-none text-white placeholder-gray-300"
          />

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-yellow-400 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded-full font-bold hover:scale-105 transition"
          >
            {loading
              ? "Logging In..."
              : "Login"}
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center mt-6 text-gray-300">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-yellow-400 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;