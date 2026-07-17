import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const homeSections = [
  { id: "hero", label: "Home" },
  { id: "how-it-works", label: "How It Works" },
  { id: "real-impact", label: "Impact" },
  { id: "real-results", label: "Results" },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = location.pathname === "/";
  const isAdmin = auth.user?.role === "admin";
  const isLoggedIn = auth.isAuthenticated();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isHome) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );

    homeSections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isHome]);

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };

  const goToHomeSection = (sectionId) => {
    if (isHome) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  };

  const primaryLinks = isHome ? (
    homeSections.map((section) => (
      <button
        key={section.id}
        type="button"
        onClick={() => goToHomeSection(section.id)}
        className={`transition-colors ${
          activeSection === section.id ? "font-bold text-[#f18b24]" : "text-gray-600 hover:text-[#5b9138]"
        }`}
      >
        {section.label}
      </button>
    ))
  ) : (
    <>
      <Link to="/" className="text-gray-600 transition-colors hover:text-[#5b9138]">
        Home
      </Link>
      {!isAdmin && isLoggedIn && (
        <>
          <Link to="/report-issue" className="text-gray-600 transition-colors hover:text-[#5b9138]">
            Report Issue
          </Link>
          <Link to="/my-reports" className="text-gray-600 transition-colors hover:text-[#5b9138]">
            My Reports
          </Link>
        </>
      )}
      {isAdmin && (
        <Link to="/admin/dashboard" className="text-gray-600 transition-colors hover:text-[#5b9138]">
          Admin Dashboard
        </Link>
      )}
    </>
  );

  const actionLinks = (
    <>
      {!auth.loading && isLoggedIn ? (
        <>
          <span className="hidden text-sm text-gray-600 lg:inline">
            {isAdmin ? "Admin" : "Signed in"}: {auth.user?.name || auth.user?.fullName || auth.user?.email}
          </span>
          <button
            type="button"
            onClick={handleLogout}
            className="min-h-10 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login/user"
            state={{ from: { pathname: "/report-issue" } }}
            className="min-h-10 rounded-full border border-[#5b9138] px-4 py-2 text-sm font-semibold text-[#5b9138] transition hover:bg-[#5b9138]/5"
          >
            Citizen Login
          </Link>
          <Link
            to="/login/admin"
            className="min-h-10 rounded-full bg-gradient-to-r from-[#f7941e] to-[#f2701d] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:shadow-md"
          >
            Admin Login
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      <div className="flex min-h-[72px] items-center justify-between px-4 md:px-12">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#5b9138] to-[#4a7a2d] shadow-md">
            <div className="h-5 w-5 rounded-md border-2 border-white" />
          </div>
          <span className="text-xl font-semibold text-gray-800">CityFix</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">{primaryLinks}</div>

        <div className="hidden items-center gap-3 md:flex">{actionLinks}</div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 text-gray-700 md:hidden"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {primaryLinks}
            <div className="mt-2 flex flex-col gap-3 border-t border-gray-100 pt-4">{actionLinks}</div>
          </div>
        </div>
      )}
    </nav>
  );
}
