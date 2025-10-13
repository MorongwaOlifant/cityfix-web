import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "../common/Button";
import { Link, useNavigate } from "react-router-dom";

export default function ReportConfirmation() {
  const navigate = useNavigate();

  // Get report from localStorage
  const report = JSON.parse(localStorage.getItem("lastReport") || "{}");

  const handleTrackReport = () => {
    // Navigate to my reports page
    navigate("/my-reports");
  };

  const handleSubmitAnother = () => {
    // Navigate back to report issue form
    navigate("/report-issue");
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 border-2 border-dashed border-gray-300 rounded-full animate-pulse"></div>
            <div className="relative bg-white rounded-full p-4">
              <CheckCircle2 className="w-12 h-12 text-[#5b9138]" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-gray-900 mb-2" style={{ fontSize: '32px', fontWeight: 600 }}>
            Report Submitted!
          </h1>
          <p className="text-gray-600">
            Thank you for helping make our city better
          </p>
        </div>

        {/* Report Details Card */}
        <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-6 mb-6">
          <div className="flex items-start gap-3 mb-6 pb-6 border-b border-dashed border-gray-300">
            <div className="mt-1">
              <AlertCircle className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-1">Your Report</h3>
              <p className="text-gray-500" style={{ fontSize: '14px' }}>
                Reference: #{report.id}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-dashed border-gray-300">
            <div>
              <p className="text-gray-500 mb-1" style={{ fontSize: '12px' }}>
                Issue Type
              </p>
              <p className="text-gray-900">{report.category}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1" style={{ fontSize: '12px' }}>
                Location
              </p>
              <p className="text-gray-900">{report.location}</p>
            </div>
          </div>

          <div className="mb-6 pb-6 border-b border-dashed border-gray-300">
            <p className="text-gray-500 mb-1" style={{ fontSize: '12px' }}>
              Description
            </p>
            <p className="text-gray-900">{report.description}</p>
          </div>

          {/* Status Timeline */}
          <div>
            <p className="text-gray-500 mb-4" style={{ fontSize: '12px' }}>
              Current Status
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-[#5b9138] bg-[#5b9138] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <div>
                  <p className="text-gray-900">Submitted</p>
                  <p className="text-gray-500" style={{ fontSize: '12px' }}>Just now</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white"></div>
                <div>
                  <p className="text-gray-500">Under Review</p>
                  <p className="text-gray-400" style={{ fontSize: '12px' }}>Pending</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button
            onClick={handleTrackReport}
            className="flex-1 rounded-lg bg-[#1a1f29] text-white text-sm px-4 py-2 font-semibold shadow-md hover:scale-105 transition-transform duration-200 border-0"
            style={{ fontSize: '16px', fontWeight: 600 }}
          >
            Track My Report
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button
            onClick={handleSubmitAnother}
            className="flex-1 border-2 border-gray-300 text-[#166534] hover:underline bg-white hover:bg-gray-50 rounded-lg py-4 transition-all"
            style={{ fontSize: '16px', fontWeight: 600 }}
          >
            Submit Another
          </Button>
        </div>

        {/* Contact Info */}
        {report.phone && (
          <p className="text-center text-gray-600" style={{ fontSize: '14px' }}>
            We'll send updates to {report.phone}
          </p>
        )}
      </div>
    </div>
  );
}