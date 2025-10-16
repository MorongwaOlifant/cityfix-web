import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  LayoutDashboard,
  FileText,
  Users,
  TrendingUp,
} from "lucide-react";

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
      pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
      "in-progress": "bg-blue-100 text-blue-700 border-blue-200",
      resolved: "bg-green-100 text-green-700 border-green-200",
      rejected: "bg-red-100 text-red-700 border-red-200",
    };

    return (
      <Badge className={`${variants[status]} border`} variant="outline">
        {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
      </Badge>
    );
  };

  const stats = [
    {
      title: "Total Reports",
      value: issues.length.toString(),
      icon: FileText,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "Pending",
      value: issues.filter((i) => i.status === "pending").length.toString(),
      icon: Clock,
      color: "text-yellow-500",
      bg: "bg-yellow-50",
    },
    {
      title: "In Progress",
      value: issues.filter((i) => i.status === "in-progress").length.toString(),
      icon: TrendingUp,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "Resolved",
      value: issues.filter((i) => i.status === "resolved").length.toString(),
      icon: CheckCircle,
      color: "text-green-500",
      bg: "bg-green-50",
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
            <div className="flex flex-wrap gap-4 mb-8">
              {stats.map((stat) => (
                <div key={stat.title} className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between w-full max-w-xs">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <h2 className="text-2xl font-semibold">{stat.value}</h2>
                  </div>
                  <div className={`${stat.bg} p-2 rounded-lg`}>
                    <stat.icon className={`${stat.color} w-5 h-5`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <Card className="mb-6 border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Filter Reports</CardTitle>
                <CardDescription>Search and filter issue reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      placeholder="Search by location, category, or ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 rounded-lg"
                    />
                  </div>
                  <div className="flex items-center">
                    <Filter className="mr-2 text-gray-400" size={18} />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Table */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>
                  Showing {filteredIssues.length} of {issues.length} reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Reporter</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredIssues.map((issue) => (
                        <TableRow key={issue.id} className="hover:bg-gray-50">
                          <TableCell>
                            <span className="text-gray-700">{issue.id}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className="text-gray-900">{issue.category}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-gray-600">{issue.location}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-gray-600 line-clamp-2 max-w-xs">
                              {issue.description}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="text-gray-600">{issue.reporter}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-gray-600">{issue.date}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(issue.status)}
                              {getStatusBadge(issue.status)}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}