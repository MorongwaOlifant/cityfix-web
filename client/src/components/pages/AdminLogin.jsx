import { useState } from "react";
import { Button } from "../common/Button";
import { Eye, EyeOff, ArrowLeft, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    // Simulate admin login validation
    if (email === "admin@cityfix.com" && password === "admin123") {
      alert("Admin access granted");
      setTimeout(() => {
        // For now, just navigate back to home
        navigate("/");
      }, 1000);
    } else {
      alert("Invalid admin credentials");
    }
  };

  const onNavigate = (page) => {
    if (page === "login") {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
      >
        {/* Back Button */}
        <button
          onClick={() => onNavigate("login")}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#f7941e] transition-colors mb-6"
          style={{ fontSize: '14px' }}
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-[#f7941e] to-[#f2701d] flex items-center justify-center shadow-md">
              <Shield className="w-5 h-5 text-white" />
            </div>
          </div>
          <h1 className="text-[#111827] mb-2" style={{ fontSize: '28px', fontWeight: 700 }}>
            Administrator Login
          </h1>
          <p className="text-[#6B7280]" style={{ fontSize: '14px' }}>
            Secure access for city officials only
          </p>
        </div>

        {/* Admin Info Badge */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
          <p className="text-[#f7941e] text-center" style={{ fontSize: '13px', lineHeight: '1.5' }}>
            <strong>Admin Access Required</strong><br />
            Contact your system administrator if you need login credentials
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="adminEmail" className="text-[#374151]">Admin Email</label>
            <input
              id="adminEmail"
              type="email"
              placeholder="admin@cityfix.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#f7941e] focus:border-[#f7941e]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="adminPassword" className="text-[#374151]">Admin Password</label>
            <div className="relative">
              <input
                id="adminPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#f7941e] focus:border-[#f7941e]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#374151]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#f7941e] to-[#f2701d] hover:shadow-lg text-white rounded-full py-3 transition-all border-0 mt-4"
            style={{ fontSize: '16px', fontWeight: 600 }}
          >
            Sign In as Admin
          </Button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <p className="text-[#6B7280] text-center" style={{ fontSize: '12px' }}>
            <strong>Demo Credentials:</strong><br />
            Email: admin@cityfix.com<br />
            Password: admin123
          </p>
        </div>
      </motion.div>
    </div>
  );
}