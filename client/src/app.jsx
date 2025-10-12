// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import HomePage from "./components/pages/HomePage";
import LoginEntry from "./components/pages/LoginEntry";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import AdminLogin from "./components/pages/AdminLogin";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <div className="font-inter">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginEntry />} />
          <Route path="/login/user" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login/admin" element={<AdminLogin />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}