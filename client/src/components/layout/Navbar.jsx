import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isSignInPage = location.pathname === "/login/user";
  const isSignUpPage = location.pathname === "/signup";
  const isAdminLoginPage = location.pathname === "/login/admin";
  const isReportIssuePage = location.pathname === "/report-issue";
  const isReportConfirmationPage = location.pathname === "/report-confirmation";
  const isMyReportsPage = location.pathname === "/my-reports";
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = ["hero", "how-it-works", "real-impact", "real-results"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-50% 0px -50% 0px" }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center py-4 px-6 md:px-12 bg-white shadow-sm">
      {/* Left: Logo */}
      <Link to="/" className="flex items-center space-x-2 cursor-pointer">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#5b9138] to-[#4a7a2d] flex items-center justify-center shadow-md">
          <div className="w-5 h-5 border-2 border-white rounded-md"></div>
        </div>
        <span className="text-xl font-semibold text-gray-800">CityFix</span>
      </Link>

      {/* Center: Navigation Links - Only show on non-login, non-signin, non-signup, non-admin, non-report, non-confirmation, and non-my-reports pages */}
      {!isLoginPage && !isSignInPage && !isSignUpPage && !isAdminLoginPage && !isReportIssuePage && !isReportConfirmationPage && !isMyReportsPage && (
        <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
          <a
            href="#hero"
            className={`transition-colors ${
              activeSection === "hero" ? "text-[#f18b24] font-bold" : "text-gray-600 hover:text-[#5b9138]"
            }`}
          >
            Home
          </a>
          <a
            href="#how-it-works"
            className={`transition-colors ${
              activeSection === "how-it-works" ? "text-[#f18b24] font-bold" : "text-gray-600 hover:text-[#5b9138]"
            }`}
          >
            How CityFix Works
          </a>
          <a
            href="#real-impact"
            className={`transition-colors ${
              activeSection === "real-impact" ? "text-[#f18b24] font-bold" : "text-gray-600 hover:text-[#5b9138]"
            }`}
          >
            Making Real Impact Together
          </a>
          <a
            href="#real-results"
            className={`transition-colors ${
              activeSection === "real-results" ? "text-[#f18b24] font-bold" : "text-[#5b9138] hover:text-[#4a7a2d]"
            }`}
          >
            Real People, Real Results
          </a>
        </div>
      )}

      {/* Right: Sign In Button or Home Button - Only show on non-signin, non-signup, non-admin, non-report, non-confirmation, and non-my-reports pages */}
      {!isSignInPage && !isSignUpPage && !isAdminLoginPage && !isReportIssuePage && !isReportConfirmationPage && !isMyReportsPage && (
        <div className="hidden md:block">
          {isLoginPage ? (
            <Link
              to="/"
              className="bg-gradient-to-r from-[#f7941e] to-[#f2701d] hover:shadow-md text-white px-6 py-2 transition-all shadow-sm inline-block"
              style={{ borderRadius: '9999px' }}
            >
              Home
            </Link>
          ) : (
            <Link
              to="/login"
              className="bg-gradient-to-r from-[#f7941e] to-[#f2701d] hover:shadow-md text-white px-6 py-2 transition-all shadow-sm inline-block"
              style={{ borderRadius: '9999px' }}
            >
              Sign In
            </Link>
          )}
        </div>
      )}

      {/* Mobile Menu Button (placeholder for hamburger) */}
      <div className="md:hidden">
        <button className="text-gray-600 hover:text-[#5b9138]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}