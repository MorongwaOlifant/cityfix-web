import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  Bell,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  Image as ImageIcon,
  LayoutDashboard,
  Loader2,
  Search,
  TrendingUp,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { toast } from "react-toastify";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { apiUrl } from "../../lib/api";

const LAST_SEEN_REPORT_KEY = "cityfixAdminLastSeenReportAt";

const normalizeStatus = (status) => {
  const statuses = {
    Pending: "pending",
    Submitted: "pending",
    "In Progress": "in-progress",
    Resolved: "resolved",
  };
  return statuses[status] || String(status || "").toLowerCase();
};

const statusLabel = (status) => {
  const normalized = normalizeStatus(status);
  if (normalized === "in-progress") return "In Progress";
  if (normalized === "resolved") return "Resolved";
  return "Pending";
};

const displayId = (report) => (report?.formattedId || report?._id || report?.id || "").slice(-6).toUpperCase();

const formatDate = (date) => {
  if (!date) return "Never";
  return new Date(date).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const formatDateTime = (date) => {
  if (!date) return "Not available";
  return new Date(date).toLocaleString("en-ZA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function AdminDashboard() {
  const [activeView, setActiveView] = useState("dashboard");
  const [reports, setReports] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(false);
  const [updatingReportId, setUpdatingReportId] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const knownLatestReportRef = useRef("");

  const token = localStorage.getItem("token");

  const fetchReports = useCallback(async ({ silent = false } = {}) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!token || user.role !== "admin") {
      toast.error("Admin access required");
      setLoading(false);
      return;
    }

    try {
      if (!silent) setLoading(true);
      const response = await fetch(apiUrl("/api/report/admin/reports"), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.error("Session expired. Please log in again.");
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch reports");
      }

      const data = await response.json();
      const nextReports = data.reports || [];
      setReports(nextReports);

      const newestCreatedAt = nextReports[0]?.createdAt || "";
      const lastSeen = localStorage.getItem(LAST_SEEN_REPORT_KEY);
      if (!lastSeen && newestCreatedAt) {
        localStorage.setItem(LAST_SEEN_REPORT_KEY, newestCreatedAt);
      }

      const effectiveLastSeen = lastSeen || newestCreatedAt;
      setUnreadCount(nextReports.filter((report) => new Date(report.createdAt) > new Date(effectiveLastSeen)).length);

      if (silent && knownLatestReportRef.current && newestCreatedAt && new Date(newestCreatedAt) > new Date(knownLatestReportRef.current)) {
        toast.info("New issue report received");
      }
      knownLatestReportRef.current = newestCreatedAt || knownLatestReportRef.current;
    } catch (error) {
      console.error("Fetch reports error:", error);
      if (!silent) toast.error("Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchUsers = useCallback(async () => {
    if (!token) return;

    try {
      setUsersLoading(true);
      const response = await fetch(apiUrl("/api/admin/users"), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsersList(data.users || []);
    } catch (error) {
      console.error("Fetch users error:", error);
      toast.error("Failed to fetch users");
    } finally {
      setUsersLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchReports();
    const intervalId = window.setInterval(() => fetchReports({ silent: true }), 30000);
    return () => window.clearInterval(intervalId);
  }, [fetchReports]);

  useEffect(() => {
    if (activeView === "users") {
      fetchUsers();
    }
  }, [activeView, fetchUsers]);

  const markReportsSeen = () => {
    const newestCreatedAt = reports[0]?.createdAt;
    if (newestCreatedAt) {
      localStorage.setItem(LAST_SEEN_REPORT_KEY, newestCreatedAt);
    }
    setUnreadCount(0);
  };

  const showAllReports = () => {
    setActiveView("reports");
    markReportsSeen();
  };

  const stats = useMemo(() => {
    const pending = reports.filter((report) => normalizeStatus(report.status) === "pending").length;
    const inProgress = reports.filter((report) => normalizeStatus(report.status) === "in-progress").length;
    const resolved = reports.filter((report) => normalizeStatus(report.status) === "resolved").length;

    return {
      total: reports.length,
      pending,
      inProgress,
      resolved,
    };
  }, [reports]);

  const filteredReports = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    return reports.filter((report) => {
      const normalizedStatus = normalizeStatus(report.status);
      const reporter = report.user?.fullName || report.user?.name || report.user?.email || "";
      const matchesStatus = statusFilter === "all" || normalizedStatus === statusFilter;
      const matchesSearch =
        !search ||
        displayId(report).toLowerCase().includes(search) ||
        report.category.toLowerCase().includes(search) ||
        report.location.toLowerCase().includes(search) ||
        report.description.toLowerCase().includes(search) ||
        reporter.toLowerCase().includes(search);

      return matchesStatus && matchesSearch;
    });
  }, [reports, searchTerm, statusFilter]);

  const updateReportStatus = async (report, status) => {
    try {
      setUpdatingReportId(report.id || report._id);
      const response = await fetch(apiUrl(`/api/report/admin/reports/${report.id || report._id}/status`), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update report");
      }

      setReports((currentReports) =>
        currentReports.map((item) => ((item.id || item._id) === (report.id || report._id) ? { ...item, ...data.report } : item)),
      );
      setSelectedReport((currentReport) =>
        currentReport && (currentReport.id || currentReport._id) === (report.id || report._id)
          ? { ...currentReport, ...data.report }
          : currentReport,
      );
      toast.success(status === "Resolved" ? "Report fulfilled and marked resolved" : "Report status updated");
    } catch (error) {
      console.error("Status update error:", error);
      toast.error(error.message || "Failed to update report");
    } finally {
      setUpdatingReportId("");
    }
  };

  const getStatusIcon = (status) => {
    const normalized = normalizeStatus(status);
    if (normalized === "resolved") return <CheckCircle size={16} />;
    if (normalized === "in-progress") return <TrendingUp size={16} />;
    return <Clock size={16} />;
  };

  const getStatusBadge = (status) => {
    const normalized = normalizeStatus(status);
    const styles = {
      pending: "bg-yellow-100 text-yellow-700",
      "in-progress": "bg-blue-100 text-blue-700",
      resolved: "bg-green-100 text-green-700",
    };

    return (
      <span className={`inline-flex min-w-[112px] items-center justify-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${styles[normalized] || styles.pending}`}>
        {getStatusIcon(status)}
        {statusLabel(status)}
      </span>
    );
  };

  const statsArray = [
    { title: "Total Reports", value: stats.total, icon: FileText, color: "text-blue-500", bg: "bg-blue-100" },
    { title: "Pending", value: stats.pending, icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100" },
    { title: "In Progress", value: stats.inProgress, icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Resolved", value: stats.resolved, icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
  ];

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "reports", label: "All Reports", icon: FileText, badge: unreadCount },
    { id: "users", label: "Users", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-white lg:pt-20">
          <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 py-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => (item.id === "reports" ? showAllReports() : setActiveView(item.id))}
                className={`flex min-h-12 items-center justify-between rounded-lg px-4 py-3 text-left transition-colors ${
                  activeView === item.id ? "bg-[#78AB46]/10 text-gray-900" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className="flex items-center">
                  <item.icon className="mr-3" size={20} />
                  {item.label}
                </span>
                {item.badge > 0 && (
                  <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white">{item.badge}</span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 lg:pl-64">
          <div className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
                <p className="mt-1 text-sm text-gray-600">Manage reports, residents, status updates, and fulfilment.</p>
              </div>
              <button
                type="button"
                onClick={showAllReports}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50"
              >
                <Bell size={18} />
                {unreadCount > 0 ? `${unreadCount} new report${unreadCount === 1 ? "" : "s"}` : "No new reports"}
              </button>
            </div>

            {loading ? (
              <div className="flex min-h-[360px] items-center justify-center">
                <Loader2 className="h-9 w-9 animate-spin text-[#5b9138]" />
              </div>
            ) : (
              <>
                {activeView === "dashboard" && (
                  <DashboardView
                    statsArray={statsArray}
                    reports={reports}
                    unreadCount={unreadCount}
                    onReviewNew={showAllReports}
                    onOpenReport={setSelectedReport}
                    getStatusBadge={getStatusBadge}
                  />
                )}

                {activeView === "reports" && (
                  <ReportsView
                    reports={filteredReports}
                    totalReports={reports.length}
                    searchTerm={searchTerm}
                    statusFilter={statusFilter}
                    setSearchTerm={setSearchTerm}
                    setStatusFilter={setStatusFilter}
                    onOpenReport={setSelectedReport}
                    getStatusBadge={getStatusBadge}
                    onUpdateStatus={updateReportStatus}
                    updatingReportId={updatingReportId}
                  />
                )}

                {activeView === "users" && (
                  <UsersView usersList={usersList} loading={usersLoading} />
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {selectedReport && (
        <ReportDetailDrawer
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          onUpdateStatus={updateReportStatus}
          updating={updatingReportId === (selectedReport.id || selectedReport._id)}
          getStatusBadge={getStatusBadge}
        />
      )}
    </div>
  );
}

function DashboardView({ statsArray, reports, unreadCount, onReviewNew, onOpenReport, getStatusBadge }) {
  const recentReports = reports.slice(0, 5);

  return (
    <div className="space-y-6">
      {unreadCount > 0 && (
        <div className="flex flex-col gap-3 rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-amber-900">
            <AlertCircle size={20} />
            <span className="font-medium">{unreadCount} new report{unreadCount === 1 ? "" : "s"} need review.</span>
          </div>
          <button type="button" onClick={onReviewNew} className="rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700">
            Review reports
          </button>
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {statsArray.map((stat) => (
          <div key={stat.title} className="min-h-[120px] rounded-lg bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="mt-3 text-3xl font-bold text-gray-950">{stat.value}</p>
              </div>
              <div className={`${stat.bg} rounded-lg p-3`}>
                <stat.icon className={`${stat.color} h-8 w-8`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <ReportsTable
        title="Recent Reports"
        subtitle={`Showing ${recentReports.length} of ${reports.length} reports`}
        reports={recentReports}
        onOpenReport={onOpenReport}
        getStatusBadge={getStatusBadge}
      />
    </div>
  );
}

function ReportsView({ reports, totalReports, searchTerm, statusFilter, setSearchTerm, setStatusFilter, onOpenReport, getStatusBadge, onUpdateStatus, updatingReportId }) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">All Reports</h2>
          <p className="mt-1 text-sm text-gray-600">Search, inspect images, and update fulfilment status.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
          <label className="relative block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by ID, location, category, reporter, or description"
              className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 pl-10 pr-4 text-sm outline-none focus:border-[#5b9138] focus:ring-2 focus:ring-[#5b9138]/20"
            />
          </label>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="h-11 rounded-md border border-gray-300 bg-gray-50 px-3 text-sm outline-none focus:border-[#5b9138] focus:ring-2 focus:ring-[#5b9138]/20"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      <ReportsTable
        title="Report Register"
        subtitle={`Showing ${reports.length} of ${totalReports} reports`}
        reports={reports}
        onOpenReport={onOpenReport}
        getStatusBadge={getStatusBadge}
        onUpdateStatus={onUpdateStatus}
        updatingReportId={updatingReportId}
        showActions
      />
    </div>
  );
}

function ReportsTable({ title, subtitle, reports, onOpenReport, getStatusBadge, onUpdateStatus, updatingReportId, showActions = false }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-3">ID</TableHead>
              <TableHead className="px-4 py-3">Category</TableHead>
              <TableHead className="px-4 py-3">Location</TableHead>
              <TableHead className="px-4 py-3">Reporter</TableHead>
              <TableHead className="px-4 py-3">Image</TableHead>
              <TableHead className="px-4 py-3">Date</TableHead>
              <TableHead className="px-4 py-3">Status</TableHead>
              <TableHead className="px-4 py-3 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => {
              const reportId = report.id || report._id;
              const updating = updatingReportId === reportId;
              return (
                <TableRow key={reportId} className="hover:bg-gray-50">
                  <TableCell className="px-4 py-3">
                    <button type="button" onClick={() => onOpenReport(report)} className="font-medium text-[#315f21] hover:underline">
                      {displayId(report)}
                    </button>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-900">{report.category}</TableCell>
                  <TableCell className="max-w-[280px] px-4 py-3 text-gray-600">
                    <span className="block truncate">{report.location}</span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-600">{report.user?.fullName || report.user?.name || "Unknown"}</TableCell>
                  <TableCell className="px-4 py-3">
                    {report.imageUrl ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                        <ImageIcon size={14} />
                        Yes
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">None</span>
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-600">{formatDate(report.createdAt)}</TableCell>
                  <TableCell className="px-4 py-3">{getStatusBadge(report.status)}</TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenReport(report)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                        title="View report details"
                      >
                        <Eye size={16} />
                      </button>
                      {showActions && normalizeStatus(report.status) !== "resolved" && (
                        <button
                          type="button"
                          disabled={updating}
                          onClick={() => onUpdateStatus(report, "Resolved")}
                          className="min-h-9 rounded-md bg-[#5b9138] px-3 text-sm font-semibold text-white hover:bg-[#4a7a2d] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {updating ? "Saving" : "Fulfil"}
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            {reports.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="px-4 py-10 text-center text-gray-500">
                  No reports match the current filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function UsersView({ usersList, loading }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Users</h2>
        <p className="mt-1 text-sm text-gray-600">Residents and admins using CityFix, with report activity.</p>
      </div>

      {loading ? (
        <div className="flex min-h-[240px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#5b9138]" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 py-3">User</TableHead>
                <TableHead className="px-4 py-3">Role</TableHead>
                <TableHead className="px-4 py-3">Reports</TableHead>
                <TableHead className="px-4 py-3">Pending</TableHead>
                <TableHead className="px-4 py-3">Resolved</TableHead>
                <TableHead className="px-4 py-3">Last Report</TableHead>
                <TableHead className="px-4 py-3">Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersList.map((user) => (
                <TableRow key={user.id || user._id}>
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#78AB46]/10 text-[#315f21]">
                        <UserRound size={18} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.fullName || user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${user.role === "admin" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}>
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 font-medium text-gray-900">{user.reportCount}</TableCell>
                  <TableCell className="px-4 py-3 text-yellow-700">{user.pendingCount}</TableCell>
                  <TableCell className="px-4 py-3 text-green-700">{user.resolvedCount}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-600">{formatDate(user.lastReportAt)}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-600">{formatDate(user.createdAt)}</TableCell>
                </TableRow>
              ))}
              {usersList.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="px-4 py-10 text-center text-gray-500">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function ReportDetailDrawer({ report, onClose, onUpdateStatus, updating, getStatusBadge }) {
  const isResolved = normalizeStatus(report.status) === "resolved";

  return (
    <div className="fixed inset-0 z-50">
      <button type="button" aria-label="Close report details" className="absolute inset-0 bg-black/30" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <div>
            <p className="text-sm text-gray-500">Report {displayId(report)}</p>
            <h2 className="text-lg font-semibold text-gray-900">{report.category}</h2>
          </div>
          <button type="button" onClick={onClose} className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-6 px-6 py-6">
          <div className="flex flex-wrap items-center gap-3">
            {getStatusBadge(report.status)}
            <span className="text-sm text-gray-500">Submitted {formatDateTime(report.createdAt)}</span>
          </div>

          {report.imageUrl ? (
            <img src={report.imageUrl} alt={`${report.category} at ${report.location}`} className="max-h-[360px] w-full rounded-lg border border-gray-200 object-contain bg-gray-50" />
          ) : (
            <div className="flex min-h-[180px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-gray-500">
              <ImageIcon size={28} />
              <p className="mt-2 text-sm">No image uploaded for this report.</p>
            </div>
          )}

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Location</h3>
            <p className="mt-2 text-gray-900">{report.location}</p>
          </section>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Description</h3>
            <p className="mt-2 whitespace-pre-wrap leading-7 text-gray-900">{report.description}</p>
          </section>

          <section className="grid gap-4 rounded-lg bg-gray-50 p-4 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-gray-500">Reporter</h3>
              <p className="mt-1 text-gray-900">{report.user?.fullName || report.user?.name || "Unknown"}</p>
              {report.user?.email && <p className="mt-1 text-sm text-gray-500">{report.user.email}</p>}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500">Resolved</h3>
              <p className="mt-1 text-gray-900">{report.resolvedAt ? formatDateTime(report.resolvedAt) : "Not yet fulfilled"}</p>
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">Status Actions</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <button
                type="button"
                disabled={updating}
                onClick={() => onUpdateStatus(report, "Pending")}
                className="min-h-11 rounded-md border border-yellow-300 bg-yellow-50 px-3 text-sm font-semibold text-yellow-800 hover:bg-yellow-100 disabled:opacity-60"
              >
                Pending
              </button>
              <button
                type="button"
                disabled={updating}
                onClick={() => onUpdateStatus(report, "In Progress")}
                className="min-h-11 rounded-md border border-blue-300 bg-blue-50 px-3 text-sm font-semibold text-blue-800 hover:bg-blue-100 disabled:opacity-60"
              >
                In Progress
              </button>
              <button
                type="button"
                disabled={updating || isResolved}
                onClick={() => onUpdateStatus(report, "Resolved")}
                className="min-h-11 rounded-md bg-[#5b9138] px-3 text-sm font-semibold text-white hover:bg-[#4a7a2d] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isResolved ? "Fulfilled" : "Fulfil"}
              </button>
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
}
