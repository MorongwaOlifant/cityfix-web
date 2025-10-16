import { useState } from "react";
import { Search, Filter } from "lucide-react";

const statuses = ['All Statuses', 'Pending', 'In Progress', 'Resolved', 'Rejected'];

export default function ReportFilter({ onSearchChange, onStatusChange, initialSearch = "", initialStatus = "All Statuses" }) {
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);
    // Convert display value back to filter value
    const filterValue = newStatus === "All Statuses" ? "all" : newStatus.toLowerCase().replace(" ", "-");
    onStatusChange?.(filterValue);
  };

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearchTerm(newSearch);
    onSearchChange?.(newSearch);
  };

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-xl">
      <div className="relative w-[60%]">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          placeholder="Search by location, category, or ID..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 h-10 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="relative w-[35%]">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10">
          <Filter className="w-4 h-4" />
        </span>
        <select
          className="w-full pl-10 pr-8 py-2 h-10 bg-gray-100 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedStatus}
          onChange={handleStatusChange}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.5rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.5em 1.5em',
            paddingRight: '2.5rem'
          }}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}