// File: client/src/components/sections/HeroSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const HeroSection = ({ onNavigate }) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const isLoggedIn = auth.isAuthenticated();
  const isAdmin = auth.user?.role === 'admin';
  const ctaLabel = isAdmin ? 'Open Admin Dashboard' : isLoggedIn ? 'Report an Issue' : 'Get Started';
  const ctaPath = isAdmin ? '/admin/dashboard' : isLoggedIn ? '/report-issue' : '/login-entry';

  return (
    <div id="hero" className="bg-white">
      {/* Hero Section */}
      <div className="min-h-[650px] md:min-h-[750px] flex items-center justify-center">
        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[#1A1A1A] mb-6" style={{ fontSize: '56px', fontWeight: 700, lineHeight: '1.2' }}>
              Sharing knowledge for better cities
            </h1>
            <p className="text-[#333333] mb-6 max-w-3xl mx-auto" style={{ fontSize: '20px', lineHeight: '1.6' }}>
              Report infrastructure issues in your community and help build safer, more sustainable cities for everyone.
            </p>
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => navigate(ctaPath)}
                className="relative bg-gradient-to-r from-[#f7941e] to-[#f2701d] hover:shadow-2xl text-white rounded-[50px] px-24 py-5 transition-all shadow-xl overflow-hidden group border-0"
                style={{ fontSize: '18px', fontWeight: 600 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {ctaLabel}
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </button>
              {!isLoggedIn && (
                <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => navigate("/login/user", { state: { from: { pathname: "/report-issue" } } })}
                    className="text-sm font-semibold text-[#5b9138] hover:text-[#4a7a2d]"
                  >
                    Citizen login
                  </button>
                  <span className="hidden text-gray-300 sm:block">|</span>
                  <button
                    type="button"
                    onClick={() => navigate("/login/admin")}
                    className="text-sm font-semibold text-[#f2701d] hover:text-[#c85f17]"
                  >
                    Admin login
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
