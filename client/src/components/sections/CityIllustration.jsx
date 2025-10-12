import { motion } from "framer-motion";

export default function CityIllustration() {
  return (
    <div className="w-full h-52 md:h-72 relative">
      <svg
        viewBox="0 0 1440 320"
        className="w-full h-full"
        preserveAspectRatio="xMidYMax meet"
        style={{ display: 'block' }}
      >
        {/* Sky gradient background for better visibility */}
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(91, 145, 56, 0.15)" />
            <stop offset="50%" stopColor="rgba(91, 145, 56, 0.25)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
          </linearGradient>
        </defs>

        {/* Background with gradient */}
        <rect x="0" y="0" width="1440" height="320" fill="url(#skyGradient)" />

        {/* Animated Clouds */}
        <motion.g
          animate={{ x: [0, 70, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          opacity="0.4"
        >
          <ellipse cx="200" cy="25" rx="40" ry="18" fill="white" />
          <ellipse cx="230" cy="20" rx="45" ry="22" fill="white" />
          <ellipse cx="260" cy="25" rx="35" ry="16" fill="white" />
        </motion.g>

        <motion.g
          animate={{ x: [0, -60, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
          opacity="0.35"
        >
          <ellipse cx="850" cy="40" rx="50" ry="24" fill="white" />
          <ellipse cx="890" cy="35" rx="55" ry="26" fill="white" />
          <ellipse cx="930" cy="40" rx="40" ry="20" fill="white" />
        </motion.g>

        <motion.g
          animate={{ x: [0, 50, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
          opacity="0.38"
        >
          <ellipse cx="1250" cy="30" rx="42" ry="22" fill="white" />
          <ellipse cx="1290" cy="26" rx="48" ry="24" fill="white" />
          <ellipse cx="1325" cy="30" rx="38" ry="18" fill="white" />
        </motion.g>

        {/* Mountain on the left side */}
        <path
          d="M 0 240 L 120 140 L 180 180 L 240 100 L 300 200 L 0 200 Z"
          fill="rgba(74, 122, 45, 0.4)"
          opacity="0.6"
        />
        <path
          d="M 0 250 L 100 160 L 160 190 L 220 120 L 280 210 L 0 210 Z"
          fill="rgba(91, 145, 56, 0.5)"
          opacity="0.5"
        />

        {/* Layered hills for depth */}
        <path
          d="M 0 200 Q 240 160 480 200 T 960 200 T 1440 200 L 1440 320 L 0 320 Z"
          fill="rgba(255,255,255,0.4)"
        />

        <path
          d="M 0 220 Q 360 180 720 220 T 1440 220 L 1440 320 L 0 320 Z"
          fill="rgba(255,255,255,0.6)"
        />

        {/* City skyline - flat design, modern buildings with better contrast */}
        <g fill="white" opacity="0.95">
          {/* Left side buildings */}
          <rect x="0" y="200" width="35" height="120" />
          <rect x="45" y="190" width="40" height="130" />

          {/* Building 1 */}
          <rect x="80" y="180" width="55" height="140" />
          <rect x="88" y="172" width="12" height="8" />
          <rect x="107" y="172" width="12" height="8" />
          <rect x="88" y="190" width="12" height="10" opacity="0.6" />
          <rect x="107" y="190" width="12" height="10" opacity="0.6" />
          <rect x="88" y="210" width="12" height="10" opacity="0.6" />
          <rect x="107" y="210" width="12" height="10" opacity="0.6" />

          {/* Building 2 */}
          <rect x="155" y="200" width="48" height="120" />
          <rect x="163" y="192" width="10" height="8" />
          <rect x="179" y="192" width="10" height="8" />

          {/* Building 3 - Tall */}
          <rect x="220" y="150" width="65" height="170" />
          <rect x="233" y="142" width="14" height="8" />
          <rect x="255" y="142" width="14" height="8" />
          <rect x="233" y="165" width="14" height="12" opacity="0.6" />
          <rect x="255" y="165" width="14" height="12" opacity="0.6" />
          <rect x="233" y="190" width="14" height="12" opacity="0.6" />
          <rect x="255" y="190" width="14" height="12" opacity="0.6" />

          {/* Building 4 */}
          <rect x="305" y="190" width="50" height="130" />

          {/* Tree 1 */}
          <circle cx="390" cy="260" r="26" />
          <circle cx="377" cy="265" r="19" opacity="0.7" />
          <circle cx="403" cy="265" r="19" opacity="0.7" />
          <rect x="385" y="260" width="10" height="60" />

          {/* Building 5 */}
          <rect x="430" y="210" width="42" height="110" />

          {/* Building 6 */}
          <rect x="490" y="195" width="60" height="125" />
          <rect x="500" y="187" width="11" height="8" />
          <rect x="520" y="187" width="11" height="8" />

          {/* Building 7 */}
          <rect x="570" y="220" width="48" height="100" />

          {/* Tree 2 */}
          <circle cx="640" cy="270" r="23" />
          <circle cx="628" cy="274" r="17" opacity="0.7" />
          <circle cx="652" cy="274" r="17" opacity="0.7" />
          <rect x="635" y="270" width="10" height="50" />

          {/* Building 8 */}
          <rect x="680" y="185" width="58" height="135" />
          <rect x="693" y="177" width="14" height="8" />
          <rect x="713" y="177" width="14" height="8" />

          {/* Building 9 */}
          <rect x="758" y="205" width="52" height="115" />

          {/* Tree 3 */}
          <circle cx="835" cy="265" r="24" />
          <circle cx="823" cy="269" r="18" opacity="0.7" />
          <circle cx="847" cy="269" r="18" opacity="0.7" />
          <rect x="830" y="265" width="10" height="55" />

          {/* Building 10 */}
          <rect x="875" y="195" width="60" height="125" />
          <rect x="887" y="187" width="11" height="8" />
          <rect x="907" y="187" width="11" height="8" />

          {/* Building 11 */}
          <rect x="955" y="210" width="48" height="110" />

          {/* Building 12 */}
          <rect x="1020" y="180" width="65" height="140" />
          <rect x="1033" y="172" width="14" height="8" />
          <rect x="1055" y="172" width="14" height="8" />

          {/* Tree 4 */}
          <circle cx="1110" cy="268" r="25" />
          <circle cx="1097" cy="272" r="19" opacity="0.7" />
          <circle cx="1123" cy="272" r="19" opacity="0.7" />
          <rect x="1105" y="268" width="10" height="52" />

          {/* Building 13 */}
          <rect x="1150" y="200" width="52" height="120" />

          {/* Building 14 */}
          <rect x="1220" y="190" width="55" height="130" />

          {/* Wind turbine */}
          <g>
            <rect x="1310" y="210" width="7" height="110" />
            <motion.g
              style={{ transformOrigin: "1313.5px 210px" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <ellipse cx="1313.5" cy="192" rx="2.5" ry="20" fill="white" />
              <ellipse
                cx="1313.5"
                cy="192"
                rx="2.5"
                ry="20"
                fill="white"
                transform="rotate(120 1313.5 210)"
              />
              <ellipse
                cx="1313.5"
                cy="192"
                rx="2.5"
                ry="20"
                fill="white"
                transform="rotate(240 1313.5 210)"
              />
            </motion.g>
            <circle cx="1313.5" cy="210" r="4" fill="white" />
          </g>

          {/* Extended buildings on far right for edge coverage */}
          <rect x="1360" y="215" width="45" height="105" />
          <rect x="1410" y="230" width="40" height="90" />
        </g>

        {/* Solid white base for seamless transition */}
        <rect x="0" y="300" width="1440" height="20" fill="white" />
      </svg>
    </div>
  );
}