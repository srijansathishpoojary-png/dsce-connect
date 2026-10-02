"use client";

import { useEffect, useMemo, useState } from "react";

type Complaint = {
  id: string;
  complainantType: "student" | "faculty";
  complainantName: string;
  complainantId: string;

  title: string;
  category: string;
  description: string;
  location: string;
  priority: string;

  status: string;
  submittedAt: string;

  assignedDepartment?: string;
  assignedAuthority?: string;
  dueDate?: string;

  escalationLevel?: number;
  escalatedTo?: string;
  escalationReason?: string;

  adminRemarks?: string;
  resolutionDetails?: string;

  updatedAt?: string;
};

const STORAGE_KEY = "dsceComplaints";

const departments = [
  "Administration",
  "Academic Department",
  "Examination Department",
  "Human Resources",
  "Accounts / Finance",
  "IT Department",
  "Infrastructure / Maintenance",
  "Student Affairs",
  "Library",
  "Hostel",
  "Transport",
  "Other",
];

const statuses = [
  "Pending",
  "Under Review",
  "Assigned",
  "In Progress",
  "Escalated",
  "Resolved",
  "Closed",
  "Rejected",
];

const priorities = [
  "Low",
  "Medium",
  "High",
  "Urgent",
];

function formatDate(date?: string) {
  if (!date) return "Not set";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(date?: string) {
  if (!date) return "Not available";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusClass(status: string) {
  switch (status) {
    case "Pending":
      return "border-yellow-400/30 bg-yellow-500/10 text-yellow-400";

    case "Under Review":
      return "border-blue-400/30 bg-blue-500/10 text-blue-400";

    case "Assigned":
      return "border-purple-400/30 bg-purple-500/10 text-purple-400";

    case "In Progress":
      return "border-cyan-400/30 bg-cyan-500/10 text-cyan-400";

    case "Escalated":
      return "border-red-400/30 bg-red-500/10 text-red-400";

    case "Resolved":
      return "border-green-400/30 bg-green-500/10 text-green-400";

    case "Closed":
      return "border-slate-500/30 bg-slate-500/10 text-slate-300";

    case "Rejected":
      return "border-red-400/30 bg-red-500/10 text-red-400";

    default:
      return "border-slate-700 bg-slate-800 text-slate-300";
  }
}

function priorityClass(priority: string) {
  switch (priority) {
    case "Urgent":
      return "text-red-400";

    case "High":
      return "text-orange-400";

    case "Medium":
      return "text-yellow-400";

    default:
      return "text-green-400";
  }
}

function isOverdue(complaint: Complaint) {
  if (!complaint.dueDate) return false;

  if (
    complaint.status === "Resolved" ||
    complaint.status === "Closed"
  ) {
    return false;
  }

  return new Date(complaint.dueDate).getTime() < Date.now();
}

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  const [selectedComplaint, setSelectedComplaint] =
    useState<Complaint | null>(null);

  const [search, setSearch] = useState("");

  const [typeFilter, setTypeFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [priorityFilter, setPriorityFilter] =
    useState("All");

  const [departmentFilter, setDepartmentFilter] =
    useState("All");

  const [showOnlyOverdue, setShowOnlyOverdue] =
    useState(false);

  const [showEscalatedOnly, setShowEscalatedOnly] =
    useState(false);

  const [adminMessage, setAdminMessage] =
    useState("");

  useEffect(() => {
    loadComplaints();
  }, []);

  function loadComplaints() {
    const stored =
      localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      setComplaints([]);
      return;
    }

    try {
      const parsed = JSON.parse(stored);

      if (Array.isArray(parsed)) {
        setComplaints(parsed);
      }
    } catch {
      setComplaints([]);
    }
  }

  function saveComplaints(updated: Complaint[]) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );

    setComplaints(updated);
  }

  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      const searchText =
        `${complaint.id} ${complaint.title} ${complaint.complainantName} ${complaint.complainantId} ${complaint.category}`
          .toLowerCase();

      if (
        search &&
        !searchText.includes(
          search.toLowerCase()
        )
      ) {
        return false;
      }

      if (
        typeFilter !== "All" &&
        complaint.complainantType !==
          typeFilter.toLowerCase()
      ) {
        return false;
      }

      if (
        statusFilter !== "All" &&
        complaint.status !== statusFilter
      ) {
        return false;
      }

      if (
        priorityFilter !== "All" &&
        complaint.priority !== priorityFilter
      ) {
        return false;
      }

      if (
        departmentFilter !== "All" &&
        complaint.assignedDepartment !==
          departmentFilter
      ) {
        return false;
      }

      if (
        showOnlyOverdue &&
        !isOverdue(complaint)
      ) {
        return false;
      }

      if (
        showEscalatedOnly &&
        complaint.status !== "Escalated"
      ) {
        return false;
      }

      return true;
    });
  }, [
    complaints,
    search,
    typeFilter,
    statusFilter,
    priorityFilter,
    departmentFilter,
    showOnlyOverdue,
    showEscalatedOnly,
  ]);

  const studentCount = complaints.filter(
    (c) =>
      c.complainantType === "student"
  ).length;

  const facultyCount = complaints.filter(
    (c) =>
      c.complainantType === "faculty"
  ).length;

  const pendingCount = complaints.filter(
    (c) =>
      c.status === "Pending" ||
      c.status === "Under Review"
  ).length;

  const activeCount = complaints.filter(
    (c) =>
      c.status === "Assigned" ||
      c.status === "In Progress"
  ).length;

  const escalatedCount = complaints.filter(
    (c) =>
      c.status === "Escalated"
  ).length;

  const resolvedCount = complaints.filter(
    (c) =>
      c.status === "Resolved" ||
      c.status === "Closed"
  ).length;

  const overdueCount = complaints.filter(
    (c) => isOverdue(c)
  ).length;

  function updateComplaint(
    id: string,
    changes: Partial<Complaint>
  ) {
    const updated = complaints.map(
      (complaint) => {
        if (complaint.id !== id) {
          return complaint;
        }

        return {
          ...complaint,
          ...changes,
          updatedAt:
            new Date().toISOString(),
        };
      }
    );

    saveComplaints(updated);

    const updatedComplaint =
      updated.find(
        (complaint) =>
          complaint.id === id
      );

    if (updatedComplaint) {
      setSelectedComplaint(
        updatedComplaint
      );
    }
  }

  function assignComplaint() {
    if (!selectedComplaint) return;

    if (
      !selectedComplaint.assignedDepartment
    ) {
      setAdminMessage(
        "Please select a department."
      );
      return;
    }

    if (
      !selectedComplaint.assignedAuthority
    ) {
      setAdminMessage(
        "Please enter the responsible authority."
      );
      return;
    }

    updateComplaint(
      selectedComplaint.id,
      {
        status:
          selectedComplaint.status ===
            "Pending" ||
          selectedComplaint.status ===
            "Under Review"
            ? "Assigned"
            : selectedComplaint.status,
      }
    );

    setAdminMessage(
      "Complaint assigned successfully."
    );
  }

  function escalateComplaint() {
    if (!selectedComplaint) return;

    if (
      !selectedComplaint.escalatedTo
    ) {
      setAdminMessage(
        "Please specify the authority to escalate to."
      );
      return;
    }

    if (
      !selectedComplaint.escalationReason
    ) {
      setAdminMessage(
        "Please provide an escalation reason."
      );
      return;
    }

    updateComplaint(
      selectedComplaint.id,
      {
        status: "Escalated",
        escalationLevel:
          (selectedComplaint.escalationLevel ||
            0) + 1,
      }
    );

    setAdminMessage(
      "Complaint escalated successfully."
    );
  }

  function markResolved() {
    if (!selectedComplaint) return;

    if (
      !selectedComplaint.resolutionDetails
    ) {
      setAdminMessage(
        "Please enter the resolution details."
      );
      return;
    }

    updateComplaint(
      selectedComplaint.id,
      {
        status: "Resolved",
      }
    );

    setAdminMessage(
      "Complaint marked as resolved."
    );
  }

  function closeComplaint() {
    if (!selectedComplaint) return;

    updateComplaint(
      selectedComplaint.id,
      {
        status: "Closed",
      }
    );

    setAdminMessage(
      "Complaint closed."
    );
  }

  function rejectComplaint() {
    if (!selectedComplaint) return;

    updateComplaint(
      selectedComplaint.id,
      {
        status: "Rejected",
      }
    );

    setAdminMessage(
      "Complaint rejected."
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* HEADER */}

      <header className="border-b border-slate-800 bg-slate-950">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-xl font-black">
              D
            </div>

            <div>

              <h1 className="font-bold">
                DSCE CONNECT
              </h1>

              <p className="text-xs text-red-400">
                Administrator Portal
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="hidden text-right sm:block">

              <p className="text-sm font-semibold">
                System Administrator
              </p>

              <p className="text-xs text-slate-500">
                Full Complaint Authority
              </p>

            </div>

            <a
              href="/"
              className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold transition hover:bg-slate-800"
            >
              Home
            </a>

          </div>

        </div>

      </header>

      {/* MAIN */}

      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* ADMIN INTRO */}

        <section className="rounded-3xl border border-red-400/20 bg-gradient-to-br from-red-950/40 via-slate-900 to-slate-900 p-7">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">
            Administration Control Centre
          </p>

          <h2 className="mt-3 text-4xl font-black">
            Complaint Management
          </h2>

          <p className="mt-3 max-w-3xl text-slate-400">
            Manage student and faculty complaints,
            assign responsible departments, monitor
            deadlines, escalate unresolved matters and
            record final resolutions.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">

            <button
              onClick={loadComplaints}
              className="rounded-xl bg-blue-600 px-6 py-3 font-bold transition hover:bg-blue-500"
            >
              ↻ Refresh Complaints
            </button>

            <button
              onClick={() => {
                setSearch("");
                setTypeFilter("All");
                setStatusFilter("All");
                setPriorityFilter("All");
                setDepartmentFilter("All");
                setShowOnlyOverdue(false);
                setShowEscalatedOnly(false);
              }}
              className="rounded-xl border border-slate-700 px-6 py-3 font-semibold transition hover:bg-slate-800"
            >
              Clear Filters
            </button>

          </div>

        </section>

        {/* STATISTICS */}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">

          <StatCard
            title="Total"
            value={complaints.length}
            icon="📋"
          />

          <StatCard
            title="Students"
            value={studentCount}
            icon="🎓"
          />

          <StatCard
            title="Faculty"
            value={facultyCount}
            icon="👨‍🏫"
          />

          <StatCard
            title="Pending"
            value={pendingCount}
            icon="⏳"
          />

          <StatCard
            title="Active"
            value={activeCount}
            icon="🔄"
          />

          <StatCard
            title="Escalated"
            value={escalatedCount}
            icon="🚨"
          />

          <StatCard
            title="Overdue"
            value={overdueCount}
            icon="⚠️"
          />

        </section>

        {/* FILTERS */}

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-5">

          <div className="flex flex-col gap-5">

            <div>

              <h3 className="font-bold">
                Search & Filter Complaints
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Admin has visibility over every student
                and faculty complaint.
              </p>

            </div>

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search complaints..."
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-400 xl:col-span-2"
              />

              <select
                value={typeFilter}
                onChange={(e) =>
                  setTypeFilter(e.target.value)
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none"
              >

                <option value="All">
                  All Users
                </option>

                <option value="Student">
                  Students
                </option>

                <option value="Faculty">
                  Faculty
                </option>

              </select>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none"
              >

                <option value="All">
                  All Statuses
                </option>

                {statuses.map(
                  (status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>
                  )
                )}

              </select>

              <select
                value={priorityFilter}
                onChange={(e) =>
                  setPriorityFilter(
                    e.target.value
                  )
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none"
              >

                <option value="All">
                  All Priorities
                </option>

                {priorities.map(
                  (priority) => (
                    <option
                      key={priority}
                      value={priority}
                    >
                      {priority}
                    </option>
                  )
                )}

              </select>

              <select
                value={departmentFilter}
                onChange={(e) =>
                  setDepartmentFilter(
                    e.target.value
                  )
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none"
              >

                <option value="All">
                  All Departments
                </option>

                {departments.map(
                  (department) => (
                    <option
                      key={department}
                      value={department}
                    >
                      {department}
                    </option>
                  )
                )}

              </select>

            </div>

            <div className="flex flex-wrap gap-3">

              <button
                onClick={() =>
                  setShowOnlyOverdue(
                    !showOnlyOverdue
                  )
                }
                className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                  showOnlyOverdue
                    ? "border-orange-400/40 bg-orange-500/10 text-orange-400"
                    : "border-slate-700 text-slate-400 hover:bg-slate-800"
                }`}
              >
                ⚠️ Overdue Only
              </button>

              <button
                onClick={() =>
                  setShowEscalatedOnly(
                    !showEscalatedOnly
                  )
                }
                className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                  showEscalatedOnly
                    ? "border-red-400/40 bg-red-500/10 text-red-400"
                    : "border-slate-700 text-slate-400 hover:bg-slate-800"
                }`}
              >
                🚨 Escalated Only
              </button>

              <span className="flex items-center px-2 text-xs text-slate-500">
                Showing{" "}
                <strong className="mx-1 text-slate-300">
                  {filteredComplaints.length}
                </strong>
                of{" "}
                <strong className="mx-1 text-slate-300">
                  {complaints.length}
                </strong>
              </span>

            </div>

          </div>

        </section>

        {/* COMPLAINTS */}

        <section className="mt-8">

          <div className="mb-5">

            <h3 className="text-2xl font-bold">
              Complaint Register
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Every complaint is managed by the
              Administrator.
            </p>

          </div>

          {filteredComplaints.length === 0 ? (

            <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900 p-12 text-center">

              <div className="text-5xl">
                📭
              </div>

              <h3 className="mt-5 text-xl font-bold">
                No complaints found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try changing your filters or wait for
                a new complaint.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {filteredComplaints.map(
                (complaint) => (

                  <article
                    key={complaint.id}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-blue-400/30"
                  >

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

                      <div className="flex-1">

                        <div className="flex flex-wrap items-center gap-2">

                          <span className="font-mono text-xs font-bold text-blue-400">
                            {complaint.id}
                          </span>

                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(
                              complaint.status
                            )}`}
                          >
                            {complaint.status}
                          </span>

                          <span
                            className={`text-xs font-bold ${priorityClass(
                              complaint.priority
                            )}`}
                          >
                            {complaint.priority}
                          </span>

                          <span className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-400">
                            {complaint.complainantType ===
                            "student"
                              ? "🎓 Student"
                              : "👨‍🏫 Faculty"}
                          </span>

                          {isOverdue(
                            complaint
                          ) && (

                            <span className="rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-400">
                              OVERDUE
                            </span>

                          )}

                        </div>

                        <h4 className="mt-3 text-xl font-bold">
                          {complaint.title}
                        </h4>

                        <p className="mt-1 text-sm text-slate-500">
                          {complaint.complainantName} •{" "}
                          {complaint.complainantId}
                        </p>

                        <p className="mt-3 line-clamp-2 text-sm text-slate-400">
                          {complaint.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">

                          <span>
                            Category:{" "}
                            <strong className="text-slate-300">
                              {complaint.category}
                            </strong>
                          </span>

                          <span>
                            Department:{" "}
                            <strong className="text-slate-300">
                              {complaint.assignedDepartment ||
                                "Unassigned"}
                            </strong>
                          </span>

                          <span>
                            Submitted:{" "}
                            <strong className="text-slate-300">
                              {formatDate(
                                complaint.submittedAt
                              )}
                            </strong>
                          </span>

                        </div>

                      </div>

                      <button
                        onClick={() =>
                          setSelectedComplaint(
                            complaint
                          )
                        }
                        className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold transition hover:bg-blue-500"
                      >
                        Manage Complaint
                      </button>

                    </div>

                  </article>

                )
              )}

            </div>

          )}

        </section>

      </div>

      {/* MANAGEMENT MODAL */}

      {selectedComplaint && (

        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">

          <div className="mx-auto my-8 max-w-5xl rounded-3xl border border-slate-700 bg-slate-950 shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-start justify-between border-b border-slate-800 p-6">

              <div>

                <div className="flex flex-wrap items-center gap-3">

                  <span className="font-mono text-sm font-bold text-blue-400">
                    {selectedComplaint.id}
                  </span>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(
                      selectedComplaint.status
                    )}`}
                  >
                    {selectedComplaint.status}
                  </span>

                </div>

                <h2 className="mt-3 text-2xl font-bold">
                  {selectedComplaint.title}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Submitted by{" "}
                  <strong className="text-slate-300">
                    {selectedComplaint.complainantName}
                  </strong>{" "}
                  (
                  {selectedComplaint.complainantType}
                  ) on{" "}
                  {formatDateTime(
                    selectedComplaint.submittedAt
                  )}
                </p>

              </div>

              <button
                onClick={() => {
                  setSelectedComplaint(null);
                  setAdminMessage("");
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-xl text-slate-400 hover:bg-slate-800"
              >
                ×
              </button>

            </div>

            <div className="grid gap-6 p-6 lg:grid-cols-2">

              {/* LEFT SIDE */}

              <div className="space-y-5">

                <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                  <h3 className="font-bold">
                    Complaint Details
                  </h3>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">

                    <Info
                      label="Complainant"
                      value={
                        selectedComplaint.complainantName
                      }
                    />

                    <Info
                      label="ID"
                      value={
                        selectedComplaint.complainantId
                      }
                    />

                    <Info
                      label="Type"
                      value={
                        selectedComplaint.complainantType ===
                        "student"
                          ? "Student"
                          : "Faculty"
                      }
                    />

                    <Info
                      label="Category"
                      value={
                        selectedComplaint.category
                      }
                    />

                    <Info
                      label="Priority"
                      value={
                        selectedComplaint.priority
                      }
                    />

                    <Info
                      label="Location"
                      value={
                        selectedComplaint.location
                      }
                    />

                  </div>

                  <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-4">

                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Description
                    </p>

                    <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-300">
                      {
                        selectedComplaint.description
                      }
                    </p>

                  </div>

                </section>

                {/* STATUS */}

                <section className="rounded-2xl border border-blue-400/20 bg-blue-500/5 p-5">

                  <h3 className="font-bold text-blue-400">
                    Complaint Status
                  </h3>

                  <label className="mt-4 block text-sm font-semibold">
                    Status
                  </label>

                  <select
                    value={
                      selectedComplaint.status
                    }
                    onChange={(e) =>
                      updateComplaint(
                        selectedComplaint.id,
                        {
                          status:
                            e.target.value,
                        }
                      )
                    }
                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-400"
                  >

                    {statuses.map(
                      (status) => (
                        <option
                          key={status}
                          value={status}
                        >
                          {status}
                        </option>
                      )
                    )}

                  </select>

                </section>

                {/* ADMIN REMARKS */}

                <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                  <h3 className="font-bold">
                    Administrative Remarks
                  </h3>

                  <textarea
                    value={
                      selectedComplaint.adminRemarks ||
                      ""
                    }
                    onChange={(e) =>
                      updateComplaint(
                        selectedComplaint.id,
                        {
                          adminRemarks:
                            e.target.value,
                        }
                      )
                    }
                    rows={5}
                    placeholder="Enter remarks for the complainant..."
                    className="mt-4 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm leading-6 outline-none focus:border-blue-400"
                  />

                </section>

              </div>

              {/* RIGHT SIDE */}

              <div className="space-y-5">

                {/* ASSIGNMENT */}

                <section className="rounded-2xl border border-purple-400/20 bg-purple-500/5 p-5">

                  <h3 className="font-bold text-purple-400">
                    Assign Complaint
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Only Admin can assign complaints to
                    departments and authorities.
                  </p>

                  <label className="mt-5 block text-sm font-semibold">
                    Concerned Department
                  </label>

                  <select
                    value={
                      selectedComplaint.assignedDepartment ||
                      ""
                    }
                    onChange={(e) =>
                      updateComplaint(
                        selectedComplaint.id,
                        {
                          assignedDepartment:
                            e.target.value,
                        }
                      )
                    }
                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-purple-400"
                  >

                    <option value="">
                      Select Department
                    </option>

                    {departments.map(
                      (department) => (
                        <option
                          key={department}
                          value={department}
                        >
                          {department}
                        </option>
                      )
                    )}

                  </select>

                  <label className="mt-4 block text-sm font-semibold">
                    Responsible Authority
                  </label>

                  <input
                    value={
                      selectedComplaint.assignedAuthority ||
                      ""
                    }
                    onChange={(e) =>
                      updateComplaint(
                        selectedComplaint.id,
                        {
                          assignedAuthority:
                            e.target.value,
                        }
                      )
                    }
                    placeholder="e.g. HOD / HR Manager / Registrar"
                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-purple-400"
                  />

                  <label className="mt-4 block text-sm font-semibold">
                    Resolution Deadline
                  </label>

                  <input
                    type="date"
                    value={
                      selectedComplaint.dueDate
                        ? selectedComplaint.dueDate.slice(
                            0,
                            10
                          )
                        : ""
                    }
                    onChange={(e) =>
                      updateComplaint(
                        selectedComplaint.id,
                        {
                          dueDate:
                            e.target.value,
                        }
                      )
                    }
                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-purple-400"
                  />

                  <button
                    onClick={assignComplaint}
                    className="mt-5 w-full rounded-xl bg-purple-600 px-5 py-3 font-bold transition hover:bg-purple-500"
                  >
                    Assign Complaint
                  </button>

                </section>

                {/* ESCALATION */}

                <section className="rounded-2xl border border-red-400/20 bg-red-500/5 p-5">

                  <h3 className="font-bold text-red-400">
                    🚨 Escalate Complaint
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Escalate matters requiring intervention
                    from a higher authority.
                  </p>

                  <label className="mt-5 block text-sm font-semibold">
                    Escalate To
                  </label>

                  <input
                    value={
                      selectedComplaint.escalatedTo ||
                      ""
                    }
                    onChange={(e) =>
                      updateComplaint(
                        selectedComplaint.id,
                        {
                          escalatedTo:
                            e.target.value,
                        }
                      )
                    }
                    placeholder="e.g. Principal / Registrar / Governing Body"
                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-red-400"
                  />

                  <label className="mt-4 block text-sm font-semibold">
                    Reason for Escalation
                  </label>

                  <textarea
                    value={
                      selectedComplaint.escalationReason ||
                      ""
                    }
                    onChange={(e) =>
                      updateComplaint(
                        selectedComplaint.id,
                        {
                          escalationReason:
                            e.target.value,
                        }
                      )
                    }
                    rows={4}
                    placeholder="Why does this matter require escalation?"
                    className="mt-2 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-red-400"
                  />

                  <button
                    onClick={escalateComplaint}
                    className="mt-5 w-full rounded-xl bg-red-600 px-5 py-3 font-bold transition hover:bg-red-500"
                  >
                    Escalate Matter
                  </button>

                </section>

                {/* RESOLUTION */}

                <section className="rounded-2xl border border-green-400/20 bg-green-500/5 p-5">

                  <h3 className="font-bold text-green-400">
                    Resolution
                  </h3>

                  <textarea
                    value={
                      selectedComplaint.resolutionDetails ||
                      ""
                    }
                    onChange={(e) =>
                      updateComplaint(
                        selectedComplaint.id,
                        {
                          resolutionDetails:
                            e.target.value,
                        }
                      )
                    }
                    rows={5}
                    placeholder="Describe the action taken and final resolution..."
                    className="mt-4 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm leading-6 outline-none focus:border-green-400"
                  />

                  <button
                    onClick={markResolved}
                    className="mt-4 w-full rounded-xl bg-green-600 px-5 py-3 font-bold transition hover:bg-green-500"
                  >
                    Mark as Resolved
                  </button>

                </section>

              </div>

            </div>

            {/* ADMIN ACTION BAR */}

            <div className="border-t border-slate-800 p-6">

              {adminMessage && (

                <div className="mb-4 rounded-xl border border-blue-400/20 bg-blue-500/10 p-4 text-sm font-medium text-blue-400">
                  {adminMessage}
                </div>

              )}

              <div className="flex flex-wrap gap-3">

                <button
                  onClick={closeComplaint}
                  className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold transition hover:bg-slate-800"
                >
                  Close Complaint
                </button>

                <button
                  onClick={rejectComplaint}
                  className="rounded-xl border border-red-400/30 px-5 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
                >
                  Reject Complaint
                </button>

                <div className="flex-1" />

                <button
                  onClick={() => {
                    setSelectedComplaint(null);
                    setAdminMessage("");
                  }}
                  className="rounded-xl bg-slate-800 px-6 py-3 text-sm font-semibold transition hover:bg-slate-700"
                >
                  Done
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

      <div className="flex items-center justify-between">

        <span className="text-2xl">
          {icon}
        </span>

        <span className="text-3xl font-black">
          {value}
        </span>

      </div>

      <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
        {title}
      </p>

    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">

      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-sm font-medium text-slate-200">
        {value}
      </p>

    </div>
  );
}