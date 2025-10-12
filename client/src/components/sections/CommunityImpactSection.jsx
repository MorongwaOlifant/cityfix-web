import { motion } from "framer-motion";
import { Award } from "lucide-react";

export default function CommunityImpactSection() {
  return (
    <div id="dashboard" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-[#5b9138]/10 text-[#5b9138] px-5 py-3 rounded-full mb-6">
            <Award size={20} />
            <span style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.5px' }}>COMMUNITY POWERED</span>
          </div>
          <h2 className="text-[#222222] mb-5" style={{ fontSize: '42px', fontWeight: 700 }}>
            Real People. Real Results.
          </h2>
          <p className="text-[#666666] max-w-2xl mx-auto" style={{ fontSize: '18px', lineHeight: '1.7' }}>
            Every report makes a difference. See how your neighbors are transforming communities across the country.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              stat: "83%",
              label: "Response Rate",
              description: "Issues get official response within 48 hours"
            },
            {
              stat: "2.5 days",
              label: "Average Fix Time",
              description: "From report to resolution"
            },
            {
              stat: "94%",
              label: "User Satisfaction",
              description: "Citizens love making a difference"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-[32px] p-8 shadow-md hover:shadow-lg transition-all text-center border border-gray-100"
            >
              <div className="text-[#5b9138] mb-2" style={{ fontSize: '48px', fontWeight: 700 }}>
                {item.stat}
              </div>
              <h3 className="text-[#2c2c2c] mb-2">{item.label}</h3>
              <p className="text-[#333333]">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}