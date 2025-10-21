import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  LayoutDashboard,
  FileText,
  Users,
  TrendingUp,
  Loader2,
} from "lucide-react";
import ReportFilter from "../common/ReportFilter";
import { toast } from 'react-toastify';

export function AdminDashboard() {
  const [issues, setIssues] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filteredIssues = issues.filter((issue) => {
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
    const matchesSearch =
      issue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="text-yellow-500" size={18} />;
      case "in-progress":
        return <AlertCircle className="text-blue-500" size={18} />;
      case "resolved":
        return <CheckCircle className="text-green-500" size={18} />;
      case "rejected":
        return <XCircle className="text-red-500" size={18} />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-700",
      "in-progress": "bg-blue-100 text-blue-700",
      resolved: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
    };

    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full ${variants[status]}`}>
        {getStatusIcon(status)}
        {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
      </span>
    );
  };

  const statsArray = [
    {
      title: "Total Reports",
      value: stats.total.toString(),
      icon: FileText,
      color: "text-blue-500",
      bg: "bg-blue-100",
    },
    {
      title: "Pending",
      value: stats.pending.toString(),
      icon: Clock,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
    {
      title: "In Progress",
      value: stats.inProgress.toString(),
      icon: TrendingUp,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Resolved",
      value: stats.resolved.toString(),
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
    },
  ];

  // Fetch reports and stats on component mount
  useEffect(() => {
    const fetchReports = async () => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      if (!token || user.role !== 'admin') {
        toast.error("Admin access required");
        return;
      }

      try {
        setLoading(true);

        // Fetch reports
        const reportsResponse = await fetch('http://localhost:5001/api/reports', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        // Fetch stats
        const statsResponse = await fetch('http://localhost:5001/api/reports/stats', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (reportsResponse.ok) {
          const reportsData = await reportsResponse.json();
          setIssues(reportsData.data || []);
        } else {
          setError('Failed to fetch reports');
          toast.error('Failed to fetch reports');
        }

        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats({
            total: statsData.data.total,
            pending: statsData.data.pending,
            inProgress: statsData.data.inProgress,
            resolved: statsData.data.resolved,
          });
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Network error. Please try again.');
        toast.error('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:bg-white lg:pt-20">
          <div className="flex flex-col flex-1 overflow-y-auto px-4 py-6">
            <nav className="space-y-2">
              <a
                href="#"
                className="flex items-center px-4 py-3 text-gray-900 bg-[#78AB46]/10 rounded-lg"
              >
                <LayoutDashboard className="mr-3" size={20} />
                Dashboard
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FileText className="mr-3" size={20} />
                All Reports
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Users className="mr-3" size={20} />
                Users
              </a>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:pl-64 flex-1">
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage and track all reported infrastructure issues</p>
            </div>

            {/* Stats Grid */}
            {loading ? (
              <div className="flex w-full justify-center gap-6 mb-6">
                <Loader2 className="w-8 h-8 animate-spin text-[#5b9138]" />
              </div>
            ) : (
             <div className="flex w-full justify-between gap-6 mb-6">
               {statsArray.map((stat) => (
                 <div key={stat.title} className="w-1/4 min-h-[120px] p-5 bg-white rounded-xl shadow-sm flex items-center justify-between">
                   <div className="flex flex-col gap-y-2">
                     <p className="text-base font-medium text-muted-foreground">{stat.title}</p>
                     <p className="text-3xl font-bold">{stat.value}</p>
                   </div>
                   <div className={`${stat.bg} p-3 rounded-lg`}>
                     <stat.icon className={`${stat.color} w-8 h-8`} />
                   </div>
                 </div>
               ))}
             </div>
           )}

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm mt-6 mb-4 p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filter Reports</h3>
                <p className="text-sm text-gray-600">Search and filter issue reports</p>
              </div>
              <ReportFilter
                onSearchChange={setSearchTerm}
                onStatusChange={setStatusFilter}
                initialSearch={searchTerm}
                initialStatus={statusFilter === "all" ? "All Statuses" : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1).replace("-", " ")}
              />
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
                <p className="text-sm text-gray-600">
                  Showing {filteredIssues.length} of {issues.length} reports
                </p>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="px-4 py-3 text-left">ID</TableHead>
                      <TableHead className="px-4 py-3 text-left">Category</TableHead>
                      <TableHead className="px-4 py-3 text-left">Location</TableHead>
                      <TableHead className="px-4 py-3 text-left">Description</TableHead>
                      <TableHead className="px-4 py-3 text-left">Reporter</TableHead>
                      <TableHead className="px-4 py-3 text-left">Date</TableHead>
                      <TableHead className="px-4 py-3 text-left">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredIssues.map((issue) => (
                      <TableRow key={issue._id} className="hover:bg-gray-50">
                        <TableCell className="px-4 py-3">
                          <span className="text-gray-700 text-sm">{issue.formattedId || issue._id.slice(-6).toUpperCase()}</span>
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          <div className="flex items-center">
                            <span className="text-gray-900 text-sm font-medium">{issue.category}</span>
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          <span className="text-gray-600 text-sm">{issue.location}</span>
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          <span className="text-gray-600 line-clamp-2 max-w-xs text-sm">
                            {issue.description}
                          </span>
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          <span className="text-gray-600 text-sm">{issue.user?.name || 'Unknown'}</span>
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          <span className="text-gray-600 text-sm">{new Date(issue.createdAt).toLocaleDateString()}</span>
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          <div className={`inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full ${
                            issue.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                            issue.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                            issue.status === 'resolved' ? 'bg-green-100 text-green-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                            {getStatusIcon(issue.status)}
                            {issue.status.charAt(0).toUpperCase() + issue.status.slice(1).replace("-", " ")}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}