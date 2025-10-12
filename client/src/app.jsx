// src/App.jsx
import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import HomePage from "./components/pages/HomePage";
import Footer from "./components/Footer";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const onNavigate = (page) => {
    setCurrentPage(page);
    console.log("Navigate to", page);
  };

  return (
    <div className="font-inter">
      <Navbar currentPage={currentPage} onNavigate={onNavigate} />
      <HomePage />
      <Footer />
    </div>
  );
}