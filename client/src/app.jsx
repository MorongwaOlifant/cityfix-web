// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import HomePage from "./components/pages/HomePage";
import LoginEntry from "./components/pages/LoginEntry";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <div className="font-inter">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginEntry />} />
          <Route path="/login/user" element={<div>Login User Page (Placeholder)</div>} />
          <Route path="/signup" element={<div>Signup Page (Placeholder)</div>} />
          <Route path="/login/admin" element={<div>Admin Login Page (Placeholder)</div>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}