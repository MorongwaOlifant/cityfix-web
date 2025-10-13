// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/layout/Navbar";
import HomePage from "./components/pages/HomePage";
import LoginEntry from "./components/pages/LoginEntry";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import AdminLogin from "./components/pages/AdminLogin";
import ReportIssue from "./components/pages/ReportIssue";
import ReportConfirmation from "./components/pages/ReportConfirmation";
import MyReports from "./components/pages/MyReports";
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
          <Route path="/report-issue" element={<ReportIssue />} />
          <Route path="/report-confirmation" element={<ReportConfirmation />} />
          <Route path="/my-reports" element={<MyReports />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login/admin" element={<AdminLogin />} />
        </Routes>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </div>
    </Router>
  );
}