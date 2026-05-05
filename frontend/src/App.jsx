import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import OTPVerification from "./pages/OTPVerification";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Research from "./pages/Research";
import Newspapers from "./pages/Newspapers";
import Saved from "./pages/Saved";
import Profile from "./pages/Profile";
import Chatbot from "./components/Chatbot";
function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* Protected */}
        <Route path="/home" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/research" element={<Research />} />
        <Route
          path="/newspapers"
          element={<Newspapers />}
        />
        <Route path="/otp-verification" element={<OTPVerification />} />
<Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {/* 🔥 ADD CHATBOT HERE (GLOBAL) */}

      <Chatbot />
    </Router>
  );
}

export default App;