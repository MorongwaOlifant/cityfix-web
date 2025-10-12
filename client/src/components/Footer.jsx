import { Facebook, Twitter, Instagram, Linkedin, BookOpen, Building, Scale, Mail } from "lucide-react";
import { Button } from "./common/Button";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      toast.success("Successfully subscribed!");
      setEmail("");
    } else {
      toast.error("Please enter a valid email");
    }
  };

  return (
    <footer className="mt-auto">
      {/* Newsletter Section with Curved Design & Bus Animation */}
      <div className="relative bg-[#5b9138] overflow-hidden">
        {/* Curved top edge */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-white">
          <svg
            viewBox="0 0 1440 80"
            className="absolute bottom-0 w-full h-16"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 Q360,80 720,40 T1440,0 L1440,80 L0,80 Z"
              fill="#5b9138"
            />
          </svg>
        </div>

        <div className="relative pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Newsletter form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="text-white" size={24} />
                  <h2 className="text-white" style={{ fontSize: '36px', fontWeight: 700 }}>
                    Stay Informed
                  </h2>
                </div>
                <p className="text-white/90 mb-6 max-w-lg" style={{ fontSize: '18px', lineHeight: '1.6' }}>
                  Get updates on city progress, resolved issues in your area, and community impact stories.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white/95 border-white/30 text-[#222222] placeholder:text-gray-500 rounded-lg px-4 py-4"
                    style={{ fontSize: '16px' }}
                  />
                  <Button
                    onClick={handleSubscribe}
                    className="bg-gradient-to-r from-[#f7941e] to-[#f2701d] hover:shadow-xl text-white rounded-lg px-8 py-4 transition-all shadow-lg whitespace-nowrap"
                    style={{ fontSize: '16px', fontWeight: 600 }}
                  >
                    Subscribe
                  </Button>
                </div>
              </motion.div>

              {/* Right side - Animated Bus */}
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                {/* Bus Illustration - Side View Flat Design */}
                <div className="relative">
                  <motion.svg
                    viewBox="0 0 500 200"
                    className="w-full max-w-md mx-auto lg:max-w-lg drop-shadow-2xl"
                    animate={{ x: [0, 15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {/* Simple Flat Bus - Side View */}
                    <g>
                      {/* Shadow */}
                      <ellipse cx="250" cy="185" rx="140" ry="10" fill="rgba(0,0,0,0.15)" />

                      {/* Main bus body - Simple rectangle */}
                      <rect x="80" y="70" width="340" height="100" rx="8" fill="#5b9138" />

                      {/* Roof */}
                      <rect x="90" y="55" width="320" height="20" rx="6" fill="#4a7a2d" />

                      {/* Windows - Simple rectangles with white lines */}
                      <rect x="100" y="80" width="45" height="35" rx="3" fill="rgba(255,255,255,0.25)" />
                      <rect x="155" y="80" width="45" height="35" rx="3" fill="rgba(255,255,255,0.25)" />
                      <rect x="210" y="80" width="45" height="35" rx="3" fill="rgba(255,255,255,0.25)" />
                      <rect x="265" y="80" width="45" height="35" rx="3" fill="rgba(255,255,255,0.25)" />
                      <rect x="320" y="80" width="45" height="35" rx="3" fill="rgba(255,255,255,0.25)" />
                      <rect x="375" y="80" width="35" height="35" rx="3" fill="rgba(255,255,255,0.25)" />

                      {/* White horizontal stripe */}
                      <rect x="80" y="120" width="340" height="8" fill="white" opacity="0.9" />

                      {/* Door */}
                      <rect x="370" y="128" width="45" height="42" rx="2" fill="rgba(0,0,0,0.15)" />
                      <rect x="392" y="133" width="2" height="32" fill="rgba(255,255,255,0.4)" />

                      {/* Wheels */}
                      <g>
                        <circle cx="130" cy="170" r="20" fill="#2d3748" />
                        <circle cx="130" cy="170" r="12" fill="#4a5568" />
                        <motion.g
                          animate={{ rotate: -360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          style={{ transformOrigin: "130px 170px" }}
                        >
                          <line x1="130" y1="158" x2="130" y2="182" stroke="#718096" strokeWidth="2" />
                          <line x1="118" y1="170" x2="142" y2="170" stroke="#718096" strokeWidth="2" />
                        </motion.g>
                      </g>

                      <g>
                        <circle cx="370" cy="170" r="20" fill="#2d3748" />
                        <circle cx="370" cy="170" r="12" fill="#4a5568" />
                        <motion.g
                          animate={{ rotate: -360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          style={{ transformOrigin: "370px 170px" }}
                        >
                          <line x1="370" y1="158" x2="370" y2="182" stroke="#718096" strokeWidth="2" />
                          <line x1="358" y1="170" x2="382" y2="170" stroke="#718096" strokeWidth="2" />
                        </motion.g>
                      </g>

                      {/* Front detail */}
                      <rect x="75" y="75" width="10" height="90" rx="2" fill="#4a7a2d" />

                      {/* Headlights */}
                      <motion.circle
                        cx="85"
                        cy="95"
                        r="6"
                        fill="#FFE066"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.circle
                        cx="85"
                        cy="145"
                        r="6"
                        fill="#FFD700"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      />

                      {/* CityFix branding on side */}
                      <rect x="180" y="135" width="140" height="30" rx="4" fill="rgba(255,255,255,0.95)" />
                      <text x="250" y="156" textAnchor="middle" fill="#5b9138" fontSize="18" fontWeight="700">
                        CITYFIX
                      </text>
                    </g>
                  </motion.svg>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <rect width="40" height="40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Footer Links */}
      <div className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo & Description */}
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5b9138] to-[#4a7a2d] flex items-center justify-center mr-3 shadow-md">
                  <div className="w-5 h-5 border-2 border-white rounded-md"></div>
                </div>
                <span className="text-[#222222]" style={{ fontSize: '22px', fontWeight: 700 }}>CityFix</span>
              </div>
              <p className="text-[#666666] mb-6" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                Empowering citizens to build better, safer, and more sustainable cities together.
              </p>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#5b9138] text-gray-600 hover:text-white flex items-center justify-center transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#5b9138] text-gray-600 hover:text-white flex items-center justify-center transition-all duration-300"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#5b9138] text-gray-600 hover:text-white flex items-center justify-center transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#5b9138] text-gray-600 hover:text-white flex items-center justify-center transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>

            {/* Resources */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="text-[#5b9138]" size={20} />
                <h3 className="text-[#222222]" style={{ fontSize: '18px', fontWeight: 700 }}>Resources</h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-[#666666] hover:text-[#5b9138] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5b9138]"></span>
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#666666] hover:text-[#5b9138] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5b9138]"></span>
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#666666] hover:text-[#5b9138] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5b9138]"></span>
                    Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#666666] hover:text-[#5b9138] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5b9138]"></span>
                    Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Building className="text-[#5b9138]" size={20} />
                <h3 className="text-[#222222]" style={{ fontSize: '18px', fontWeight: 700 }}>Company</h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-[#666666] hover:text-[#5b9138] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5b9138]"></span>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#666666] hover:text-[#5b9138] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5b9138]"></span>
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#666666] hover:text-[#5b9138] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5b9138]"></span>
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#666666] hover:text-[#5b9138] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5b9138]"></span>
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Scale className="text-[#5b9138]" size={20} />
                <h3 className="text-[#222222]" style={{ fontSize: '18px', fontWeight: 700 }}>Legal</h3>
              </div>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-[#666666] hover:text-[#5b9138] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5b9138]"></span>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#666666] hover:text-[#5b9138] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5b9138]"></span>
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#666666] hover:text-[#5b9138] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5b9138]"></span>
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-center text-[#666666]" style={{ fontSize: '14px' }}>
              © {new Date().getFullYear()} CityFix. All rights reserved. Made with care for better cities.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}