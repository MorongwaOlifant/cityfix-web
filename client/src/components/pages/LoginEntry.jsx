import { User, Shield } from "lucide-react";
import { Button } from "../common/Button";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function LoginEntry() {
  const navigate = useNavigate();

  const onNavigate = (page) => {
    if (page === "home") {
      navigate("/");
    } else if (page === "signin") {
      navigate("/login/user");
    } else if (page === "signup") {
      navigate("/signup");
    } else if (page === "admin-login") {
      navigate("/login/admin");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5b9138] to-[#4a7a2d] flex items-center justify-center shadow-md">
              <div className="w-8 h-8 border-2 border-white rounded-md"></div>
            </div>
          </div>
          <h1 className="text-[#111827] mb-3" style={{ fontSize: '36px', fontWeight: 700 }}>
            Welcome to CityFix
          </h1>
          <p className="text-[#6B7280]" style={{ fontSize: '18px' }}>
            Choose how you'd like to continue
          </p>
        </motion.div>

        {/* Login Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* User Login/Signup */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
          >
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-[#5b9138]/10 flex items-center justify-center">
                <User className="w-8 h-8 text-[#5b9138]" />
              </div>
              <div>
                <h2 className="text-[#111827] mb-2" style={{ fontSize: '24px', fontWeight: 600 }}>
                  For Citizens
                </h2>
                <p className="text-[#6B7280]" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                  Report issues, track progress, and make your city better
                </p>
              </div>
              <div className="space-y-3 w-full">
                <Button
                  onClick={() => onNavigate("signin")}
                  className="w-full bg-[#5b9138] hover:bg-[#4a7a2d] text-white py-3 transition-all border-0"
                  style={{ fontSize: '16px', fontWeight: 600, borderRadius: '9999px' }}
                >
                  I'm a Returning User
                </Button>
                <Button
                  onClick={() => onNavigate("signup")}
                  className="w-full border-2 border-[#5b9138] text-[#5b9138] bg-white hover:bg-[#5b9138]/5 py-3 transition-all"
                  style={{ fontSize: '16px', fontWeight: 600, borderRadius: '9999px', color: '#5b9138' }}
                >
                  I'm New Here
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Admin Login */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
          >
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-[#f7941e]/10 flex items-center justify-center">
                <Shield className="w-8 h-8 text-[#f7941e]" />
              </div>
              <div>
                <h2 className="text-[#111827] mb-2" style={{ fontSize: '24px', fontWeight: 600 }}>
                  For Administrators
                </h2>
                <p className="text-[#6B7280]" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                  Manage reports, track resolutions, and oversee city operations
                </p>
              </div>
              <div className="w-full">
                <Button
                  onClick={() => onNavigate("admin-login")}
                  className="w-full bg-gradient-to-r from-[#f7941e] to-[#f2701d] hover:shadow-lg text-white py-3 transition-all border-0"
                  style={{ fontSize: '16px', fontWeight: 600, borderRadius: '9999px' }}
                >
                  Admin Login
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <button
            onClick={() => onNavigate("home")}
            className="text-[#6B7280] hover:text-[#5b9138] transition-colors"
            style={{ fontSize: '14px' }}
          >
            ← Back to Home
          </button>
        </motion.div>
      </div>
    </div>
  );
}