import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../common/Button";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar({ currentPage, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    if (latest > previous && latest > 150) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  return (
    <motion.nav
      className={`bg-white border-b sticky top-0 z-50 transition-all ${
        scrolled ? 'border-gray-200 shadow-md' : 'border-transparent'
      }`}
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate("home")}
          >
            <div className="w-8 h-8 rounded-lg bg-[#5b9138] flex items-center justify-center mr-2">
              <div className="w-4 h-4 border-2 border-white rounded"></div>
            </div>
            <span className="text-[#222222]" style={{ fontSize: '20px', fontWeight: 700 }}>CityFix</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className={`transition-colors ${
                currentPage === "home" ? "text-[#5b9138]" : "text-gray-600 hover:text-[#5b9138]"
              }`}
            >
              Home
            </a>
            <a
              href="#report-section"
              className={`transition-colors ${
                currentPage === "report" ? "text-[#5b9138]" : "text-gray-600 hover:text-[#5b9138]"
              }`}
            >
              Report Issue
            </a>
            <a
              href="#my-reports"
              className={`transition-colors ${
                currentPage === "myreports" ? "text-[#5b9138]" : "text-gray-600 hover:text-[#5b9138]"
              }`}
            >
              My Reports
            </a>
            <a
              href="#dashboard"
              className={`transition-colors ${
                currentPage === "admin" ? "text-[#5b9138]" : "text-gray-600 hover:text-[#5b9138]"
              }`}
            >
              Dashboard
            </a>
            <a
              href="/signin"
              className="bg-gradient-to-r from-[#f7941e] to-[#f2701d] hover:shadow-md text-white rounded-lg px-6 py-2 transition-all shadow-sm inline-block"
            >
              Sign In
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => {
                  onNavigate("home");
                  setMobileMenuOpen(false);
                }}
                className={`text-left ${
                  currentPage === "home" ? "text-[#5b9138]" : "text-gray-600"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  onNavigate("report");
                  setMobileMenuOpen(false);
                }}
                className={`text-left ${
                  currentPage === "report" ? "text-[#5b9138]" : "text-gray-600"
                }`}
              >
                Report Issue
              </button>
              <button
                onClick={() => {
                  onNavigate("myreports");
                  setMobileMenuOpen(false);
                }}
                className={`text-left ${
                  currentPage === "myreports" ? "text-[#5b9138]" : "text-gray-600"
                }`}
              >
                My Reports
              </button>
              <button
                onClick={() => {
                  onNavigate("admin");
                  setMobileMenuOpen(false);
                }}
                className={`text-left ${
                  currentPage === "admin" ? "text-[#5b9138]" : "text-gray-600"
                }`}
              >
                Dashboard
              </button>
              <Button
                onClick={() => {
                  onNavigate("auth");
                  setMobileMenuOpen(false);
                }}
                className="bg-gradient-to-r from-[#f7941e] to-[#f2701d] hover:shadow-md text-white rounded-lg w-full"
              >
                Sign In
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  );
}