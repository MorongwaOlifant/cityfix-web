import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { LineChart, CheckCircle, Users, Building2 } from "lucide-react";

const StatCard = ({ icon: Icon, value, label, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-gray-50 rounded-2xl p-8 text-center shadow-2xl shadow-gray-300/40"
      style={{ boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)' }}
    >
      <div className="flex justify-center mb-4">
        <div className="rounded-full w-12 h-12 flex items-center justify-center bg-[#5b9138]/10 text-[#5b9138] mx-auto">
          <Icon size={28} strokeWidth={2.2} />
        </div>
      </div>
      <div className="text-3xl font-bold text-[#4CAF50] mb-2">{value.toLocaleString()}</div>
      <div className="text-gray-600 text-sm">{label}</div>
    </motion.div>
  );
};

export default function ImpactSection() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  return (
    <div ref={statsRef} id="real-impact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-[#222222] mb-5" style={{ fontSize: '42px', fontWeight: 700 }}>
            Making Real Impact Together
          </h2>
          <p className="text-[#666666] max-w-2xl mx-auto" style={{ fontSize: '18px', lineHeight: '1.7' }}>
            Join our growing community of citizens working to improve urban infrastructure
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={LineChart}
            value={15432}
            label="Issues Reported"
            delay={0}
          />
          <StatCard
            icon={CheckCircle}
            value={12891}
            label="Issues Resolved"
            delay={0.1}
          />
          <StatCard
            icon={Users}
            value={8542}
            label="Active Citizens"
            delay={0.2}
          />
          <StatCard
            icon={Building2}
            value={247}
            label="Cities Connected"
            delay={0.3}
          />
        </div>
      </div>
    </div>
  );
}