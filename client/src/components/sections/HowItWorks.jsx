import { motion } from "framer-motion";
import { Camera, MapPin, BarChart3, CheckCircle2 } from "lucide-react";
import StepCard from "../shared/StepCard";

export function HowItWorks() {
  return (
    <div id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2
            className="text-[#222222] mb-5"
            style={{ fontSize: "42px", fontWeight: 700 }}
          >
            How CityFix Works
          </h2>
          <p
            className="text-[#666666] max-w-2xl mx-auto"
            style={{ fontSize: "18px", lineHeight: "1.7" }}
          >
            Four simple steps to make your city better. Join thousands making a
            real difference.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 justify-center items-stretch">
          <StepCard
            icon={Camera}
            title="Snap"
            description="Take a photo of the infrastructure issue you've spotted in your neighborhood."
          />
          <StepCard
            icon={MapPin}
            title="Pin"
            description="Auto-detect your location or manually select where the issue is located."
          />
          <StepCard
            icon={BarChart3}
            title="Track"
            description="Monitor real-time updates and see progress on your report dashboard."
          />
          <StepCard
            icon={CheckCircle2}
            title="Resolve"
            description="Get notified when your issue is fixed and see the positive impact you made."
          />
        </div>
      </div>
    </div>
  );
}