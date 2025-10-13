import { useState } from "react";
import { Button } from "../common/Button";
import { Eye, EyeOff, ArrowLeft, Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    agreeToTerms: false,
  });

  // Password strength checker
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (passwordStrength < 2) {
      toast.error("Please use a stronger password");
      return;
    }

    if (!formData.agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    // Simulate sign up
    toast.success(`Welcome to CityFix, ${formData.fullName}!`, {
      style: {
        background: '#ECFDF3',
        color: '#166534',
        border: '1px solid #A7F3D0',
        fontWeight: 'bold',
      },
      icon: '✅',
    });
    setTimeout(() => {
      // Navigate to report issue page after signup
      navigate("/report-issue");
    }, 1000);
  };

  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const onNavigate = (page) => {
    if (page === "login") {
      navigate("/login");
    } else if (page === "signin") {
      navigate("/login/user");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4 py-12">
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
            Create Account
          </h1>
          <p className="text-[#6B7280]" style={{ fontSize: '14px' }}>
            Join thousands making their cities better
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-[#374151]">Full Name *</label>
            <input
              id="fullName"
              type="text"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => updateFormData("fullName", e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#5b9138] focus:border-[#5b9138]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-[#374151]">Email Address *</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#5b9138] focus:border-[#5b9138]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-[#374151]">Phone Number (Optional)</label>
            <input
              id="phone"
              type="tel"
              placeholder="+27 12 345 6789"
              value={formData.phone}
              onChange={(e) => updateFormData("phone", e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#5b9138] focus:border-[#5b9138]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-[#374151]">Password *</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => updateFormData("password", e.target.value)}
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

            {/* Password Strength Meter */}
            {formData.password && (
              <div className="space-y-2 mt-2">
                <div className="flex gap-1">
                  {[0, 1, 2, 3].map((index) => (
                    <div
                      key={index}
                      className={`h-1 flex-1 rounded-full transition-all ${
                        index < passwordStrength ? strengthColors[passwordStrength - 1] : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[#6B7280]" style={{ fontSize: '12px' }}>
                  Password strength: {passwordStrength > 0 ? strengthLabels[passwordStrength - 1] : "Too weak"}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-[#374151]">Confirm Password *</label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#5b9138] focus:border-[#5b9138]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#374151]"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formData.confirmPassword && (
              <div className="flex items-center gap-2 mt-1">
                {formData.password === formData.confirmPassword ? (
                  <>
                    <Check size={16} className="text-green-500" />
                    <span className="text-green-500" style={{ fontSize: '12px' }}>Passwords match</span>
                  </>
                ) : (
                  <>
                    <X size={16} className="text-red-500" />
                    <span className="text-red-500" style={{ fontSize: '12px' }}>Passwords don't match</span>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex items-start gap-2 pt-2">
            <input
              type="checkbox"
              id="terms"
              checked={formData.agreeToTerms}
              onChange={(e) => updateFormData("agreeToTerms", e.target.checked)}
              className="mt-1 rounded border-gray-300"
            />
            <label htmlFor="terms" className="text-[#6B7280]" style={{ fontSize: '14px' }}>
              I agree to the{" "}
              <button type="button" className="text-[#5b9138] hover:underline">
                Terms and Conditions
              </button>{" "}
              and{" "}
              <button type="button" className="text-[#5b9138] hover:underline">
                Privacy Policy
              </button>
            </label>
          </div>
          {!formData.agreeToTerms && (
            <p className="text-red-500 text-sm mt-1">
              You must agree to the Terms and Conditions to continue
            </p>
          )}

          <Button
            type="submit"
            className="w-full bg-[#5b9138] hover:bg-[#4a7a2d] text-white rounded-full py-3 transition-all border-0 mt-6"
            style={{ fontSize: '16px', fontWeight: 600 }}
          >
            Create Account
          </Button>
        </form>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p className="text-[#6B7280]" style={{ fontSize: '14px' }}>
            Already have an account?{" "}
            <button
              onClick={() => onNavigate("signin")}
              className="text-[#5b9138] hover:text-[#4a7a2d] transition-colors"
              style={{ fontWeight: 600 }}
            >
              Sign In
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}