import { useState } from "react";
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
} from "lucide-react";
import ReportFilter from "../common/ReportFilter";

const mockIssues = [
  {
    id: "ISS-001",
    category: "Pothole",
    location: "Main St & 5th Ave",
    description: "Large pothole causing traffic issues",
    status: "pending",
    date: "2025-10-08",
    reporter: "John Doe",
  },
  {
    id: "ISS-002",
    category: "Water Leak",
    location: "Oak Street 234",
    description: "Water main break flooding the street",
    status: "in-progress",
    date: "2025-10-07",
    reporter: "Jane Smith",
  },
  {
    id: "ISS-003",
    category: "Street Light",
    location: "Park Ave & 12th St",
    description: "Street light not working for 3 days",
    status: "resolved",
    date: "2025-10-06",
    reporter: "Mike Johnson",
  },
  {
    id: "ISS-004",
    category: "Electricity",
    location: "Elm Street District",
    description: "Power outage affecting 20+ homes",
    status: "in-progress",
    date: "2025-10-08",
    reporter: "Sarah Williams",
  },
  {
    id: "ISS-005",
    category: "Drainage",
    location: "River Road 456",
    description: "Blocked drainage causing flooding",
    status: "pending",
    date: "2025-10-08",
    reporter: "Tom Brown",
  },
  {
    id: "ISS-006",
    category: "Graffiti",
    location: "City Hall Wall",
    description: "Vandalism on public property",
    status: "rejected",
    date: "2025-10-05",
    reporter: "Anna Davis",
  },
];

export function AdminDashboard() {
  const [issues, setIssues] = useState(mockIssues);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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

  const stats = [
    {
      title: "Total Reports",
      value: issues.length.toString(),
      icon: FileText,
      color: "text-blue-500",
      bg: "bg-blue-100",
    },
    {
      title: "Pending",
      value: issues.filter((i) => i.status === "pending").length.toString(),
      icon: Clock,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
    {
      title: "In Progress",
      value: issues.filter((i) => i.status === "in-progress").length.toString(),
      icon: TrendingUp,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Resolved",
      value: issues.filter((i) => i.status === "resolved").length.toString(),
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
    },
  ];

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
            <div className="flex w-full justify-between gap-6 mb-6">
              {stats.map((stat) => (
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
                      <TableRow key={issue.id} className="hover:bg-gray-50">
                        <TableCell className="px-4 py-3">
                          <span className="text-gray-700 text-sm">{issue.id}</span>
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
                          <span className="text-gray-600 text-sm">{issue.reporter}</span>
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          <span className="text-gray-600 text-sm">{issue.date}</span>
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