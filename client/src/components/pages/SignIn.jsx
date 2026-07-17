import { useState } from "react";
import { Button } from "../common/Button";
import { Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { apiUrl } from '../../lib/api';

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      // Call the backend API
      const response = await fetch(apiUrl('/api/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success - use auth context to login
        login(data.user, data.accessToken);

        toast.success(`Welcome back, ${data.user.name}!`, {
          style: {
            background: '#ECFDF3',
            color: '#166534',
            border: '1px solid #A7F3D0',
            fontWeight: 'bold',
          },
          icon: '✅',
        });

        setTimeout(() => {
          const destination = location.state?.from?.pathname || "/my-reports";
          navigate(destination, { replace: true });
        }, 1000);
      } else {
        // Error from backend
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onNavigate = (page) => {
    if (page === "login") {
      navigate("/login-entry");
    } else if (page === "signup") {
      navigate("/signup", { state: location.state });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
      >
        {/* Back Button */}
        <button
          onClick={() => onNavigate("login")}
          className="flex items-center gap-2 text-[#5b9138] hover:text-[#4a7a2d] transition-colors mb-6"
          style={{ fontSize: '14px' }}
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#5b9138] to-[#4a7a2d] flex items-center justify-center shadow-md">
              <div className="w-5 h-5 border-2 border-white rounded-md"></div>
            </div>
          </div>
          <h1 className="text-[#111827] mb-2" style={{ fontSize: '28px', fontWeight: 700 }}>
            Welcome Back
          </h1>
          <p className="text-[#6B7280]" style={{ fontSize: '14px' }}>
            Sign in to your CityFix account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="text-[#374151]">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#5b9138] focus:border-[#5b9138]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-[#374151]">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#5b9138] focus:border-[#5b9138]"
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

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-[#6B7280]" style={{ fontSize: '14px' }}>Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => toast.info("Password reset is not available yet. Please contact CityFix support.")}
              className="text-[#5b9138] hover:text-[#4a7a2d] transition-colors"
              style={{ fontSize: '14px' }}
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5b9138] hover:bg-[#4a7a2d] disabled:bg-gray-400 text-white rounded-full py-3 transition-all border-0 flex items-center justify-center gap-2"
            style={{ fontSize: '16px', fontWeight: 600 }}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-[#6B7280]" style={{ fontSize: '14px' }}>
            Don&apos;t have an account?{" "}
            <button
              onClick={() => onNavigate("signup")}
              className="text-[#5b9138] hover:text-[#4a7a2d] transition-colors"
              style={{ fontWeight: 600 }}
            >
              Sign Up
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
