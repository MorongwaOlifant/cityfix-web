import { useState, useEffect } from "react";
import { ArrowLeft, Search, Eye, Droplet, Construction, Lightbulb, Loader2 } from "lucide-react";
import { Button } from "../common/Button";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { apiUrl } from '../../lib/api';

const normalizeStatus = (status) => {
  const statuses = {
    Pending: 'Pending',
    Submitted: 'Pending',
    'In Progress': 'In Progress',
    Resolved: 'Resolved',
  };
  return statuses[status] || status || 'Pending';
};

export default function MyReports() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getIcon = (category) => {
    switch (category.toLowerCase()) {
      case "water leak":
        return <Droplet className="w-6 h-6 text-[#5b9138]" />;
      case "pothole":
        return <Construction className="w-6 h-6 text-gray-700" />;
      case "street light":
        return <Lightbulb className="w-6 h-6 text-yellow-600" />;
      default:
        return <Construction className="w-6 h-6 text-gray-700" />;
    }
  };

  const getStatusProgress = (status) => {
    switch (status) {
      case "Pending":
        return 33;
      case "In Progress":
        return 66;
      case "Resolved":
        return 100;
      default:
        return 0;
    }
  };

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      searchQuery === "" ||
      report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === null || normalizeStatus(report.status) === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    Pending: reports.filter((r) => normalizeStatus(r.status) === "Pending").length,
    "In Progress": reports.filter((r) => normalizeStatus(r.status) === "In Progress").length,
    Resolved: reports.filter((r) => normalizeStatus(r.status) === "Resolved").length,
  };

  // Fetch user reports on component mount
  useEffect(() => {
    const fetchUserReports = async () => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      if (!token || !user.id) {
        toast.error("Please log in to view your reports");
        navigate("/login/user");
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(apiUrl('/api/report/my-reports'), {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setReports(data.reports || []);
        } else if (response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          toast.error('Session expired. Please log in again.');
          navigate('/login/user');
        } else {
          setError(data.message || 'Failed to fetch reports');
          toast.error(data.message || 'Failed to fetch reports');
        }
      } catch (error) {
        console.error('Fetch reports error:', error);
        setError('Network error. Please try again.');
        toast.error('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserReports();
  }, [navigate]);

  const handleBack = () => {
    navigate("/");
  };

  const handleNewReport = () => {
    navigate("/report-issue");
  };

  // Note: Cancel functionality removed as backend doesn't support DELETE

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-[#5b9138] hover:text-[#4a7a2d] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <Button
              onClick={handleNewReport}
              className="bg-[#F7941E] hover:bg-[#e88410] text-white rounded-full px-5 py-2 transition-all border-0"
              style={{ fontSize: '14px', fontWeight: 600 }}
            >
              New Report
            </Button>
          </div>
          <div>
            <h1 className="text-[#222222] mb-2" style={{ fontSize: '36px', fontWeight: 700 }}>
              My Reports
            </h1>
            <p className="text-[#666666]" style={{ fontSize: '16px' }}>Track your submissions</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <button
            className={`cursor-pointer px-4 py-2 rounded-full transition-all ${
              statusFilter === null
                ? "bg-gray-900 text-white"
                : "bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400"
            }`}
            onClick={() => setStatusFilter(null)}
          >
            All Reports
          </button>
          <button
            className={`cursor-pointer px-4 py-2 rounded-full transition-all ${
              statusFilter === "Pending"
                ? "bg-gray-900 text-white"
                : "bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400"
            }`}
            onClick={() => setStatusFilter("Pending")}
          >
            {statusCounts.Pending} Pending
          </button>
          <button
            className={`cursor-pointer px-4 py-2 rounded-full transition-all ${
              statusFilter === "In Progress"
                ? "bg-gray-900 text-white"
                : "bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400"
            }`}
            onClick={() => setStatusFilter("In Progress")}
          >
            {statusCounts["In Progress"]} In Progress
          </button>
          <button
            className={`cursor-pointer px-4 py-2 rounded-full transition-all ${
              statusFilter === "Resolved"
                ? "bg-gray-900 text-white"
                : "bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400"
            }`}
            onClick={() => setStatusFilter("Resolved")}
          >
            {statusCounts.Resolved} Resolved
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by location or issue type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 bg-white border-2 border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#5b9138] focus:border-[#5b9138]"
          />
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {loading ? (
            <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-[#5b9138]" />
              <p className="text-gray-500">Loading your reports...</p>
            </div>
          ) : error ? (
            <div className="bg-white rounded-lg border-2 border-dashed border-red-300 p-12 text-center">
              <p className="text-red-500">{error}</p>
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
              <p className="text-gray-500">No reports found</p>
            </div>
          ) : (
            filteredReports.map((report) => (
              <div
                key={report._id}
                className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-6 hover:border-gray-400 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">{getIcon(report.category)}</div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-gray-900 mb-1">{report.category}</h3>
                        <p className="text-gray-500" style={{ fontSize: '12px' }}>
                          #{(report.formattedId || report._id || '').slice(-8).toUpperCase()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-sm ${
                            normalizeStatus(report.status) === "In Progress"
                              ? "bg-blue-100 text-blue-700"
                              : normalizeStatus(report.status) === "Resolved"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {normalizeStatus(report.status) === "In Progress" ? "In progress" : normalizeStatus(report.status).toLowerCase()}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-900 mb-1">{report.location}</p>
                    <p className="text-gray-600 mb-4" style={{ fontSize: '14px' }}>
                      {report.description}
                    </p>
                    <p className="text-gray-500 mb-2" style={{ fontSize: '12px' }}>
                      Submitted: {new Date(report.createdAt).toLocaleDateString()}
                    </p>

                    {/* Progress Timeline */}
                    <div className="mb-4">
                      <p className="text-gray-500 mb-2" style={{ fontSize: '12px' }}>
                        Progress
                      </p>
                      <div className="relative">
                        {/* Progress Bar */}
                        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gray-900 transition-all duration-500"
                            style={{ width: `${getStatusProgress(normalizeStatus(report.status))}%` }}
                          ></div>
                        </div>
                        {/* Status Dots */}
                        <div className="flex justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded-full border-2 ${
                                getStatusProgress(normalizeStatus(report.status)) >= 33
                                  ? "border-gray-900 bg-gray-900"
                                  : "border-gray-300 bg-white"
                              }`}
                            ></div>
                            <span className="text-gray-600" style={{ fontSize: '12px' }}>
                              Submitted
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded-full border-2 ${
                                getStatusProgress(normalizeStatus(report.status)) >= 66
                                  ? "border-gray-900 bg-gray-900"
                                  : "border-gray-300 bg-white"
                              }`}
                            ></div>
                            <span className="text-gray-600" style={{ fontSize: '12px' }}>
                              In Progress
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded-full border-2 ${
                                getStatusProgress(normalizeStatus(report.status)) >= 100
                                  ? "border-gray-900 bg-gray-900"
                                  : "border-gray-300 bg-white"
                              }`}
                            ></div>
                            <span className="text-gray-600" style={{ fontSize: '12px' }}>
                              Resolved
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        className="border border-gray-300 hover:bg-gray-50 bg-white rounded-lg px-4 py-2 transition-all"
                        style={{ fontSize: '14px', fontWeight: 600 }}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
