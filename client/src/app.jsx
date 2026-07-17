// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout & Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/Footer";

// Pages
import HomePage from "./components/pages/HomePage";
import LoginEntry from "./components/pages/LoginEntry";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import AdminLogin from "./components/pages/AdminLogin";
import { AdminDashboard } from "./components/pages/AdminDashboard";
import ReportIssue from "./components/pages/ReportIssue";
import ReportConfirmation from "./components/pages/ReportConfirmation";
import MyReports from "./components/pages/MyReports";

// Route Guards
import RequireAdmin from "./components/common/RequireAdmin";
import RequireAuth from "./components/common/RequireAuth"; 

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppShell />
      </Router>
    </AuthProvider>
  );
}

function AppShell() {
  const location = useLocation();
  const showFooter = location.pathname === "/";

  return (
    <div className="font-inter min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginEntry />} />
          <Route path="/login-entry" element={<LoginEntry />} />
          <Route path="/login/user" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login/admin" element={<AdminLogin />} />

          {/* Protected Routes */}
          <Route
            path="/report-issue"
            element={
              <RequireAuth>
                <ReportIssue />
              </RequireAuth>
            }
          />
          <Route
            path="/report-confirmation"
            element={
              <RequireAuth>
                <ReportConfirmation />
              </RequireAuth>
            }
          />
          <Route
            path="/my-reports"
            element={
              <RequireAuth>
                <MyReports />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <RequireAdmin>
                <AdminDashboard />
              </RequireAdmin>
            }
          />
        </Routes>
      </div>
      {showFooter && <Footer />}
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
  );
}
