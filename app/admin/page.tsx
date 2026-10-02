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

const categories = [
  "Salary / Payroll",
  "Students",
  "Infrastructure",
  "Colleagues",
  "Administration",
  "Workload",
  "Academic",
  "Examination",
  "IT / Technical",
  "Leave / Attendance",
  "HR / Service",
  "Other",
];

const priorities = ["Low", "Medium", "High", "Urgent"];

const departments = [
  "Administration",
  "Human Resources",
  "Accounts / Finance",
  "Academic Department",
  "Examination Cell",
  "Infrastructure / Maintenance",
  "IT Department",
  "Student Affairs",
  "Library",
  "Transport",
  "Security",
  "Principal's Office",
  "Management",
];

const authorities = [
  "Principal",
  "Vice Principal",
  "Dean",
  "Head of Department",
  "HR Manager",
  "Accounts Officer",
  "Exam Controller",
  "IT Administrator",
  "Administrative Officer",
  "Student Affairs Officer",
  "Infrastructure Officer",
  "Management Representative",
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

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  const [selectedComplaint, setSelectedComplaint] =
    useState<Complaint | null>(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [typeFilter, setTypeFilter] =
    useState("All");

  const [priorityFilter, setPriorityFilter] =
    useState("All");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [department, setDepartment] =
    useState("");

  const [authority, setAuthority] =
    useState("");

  const [status, setStatus] =
    useState("Pending");

  const [dueDate, setDueDate] =
    useState("");

  const [escalatedTo, setEscalatedTo] =
    useState("");

  const [escalationReason, setEscalationReason] =
    useState("");

  const [adminRemarks, setAdminRemarks] =
    useState("");

  const [resolutionDetails, setResolutionDetails] =
    useState("");

  const [updateMessage, setUpdateMessage] =
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

  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      const searchText =
        search.trim().toLowerCase();

      const matchesSearch =
        !searchText ||
        complaint.id
          .toLowerCase()
          .includes(searchText) ||
        complaint.title
          .toLowerCase()
          .includes(searchText) ||
        complaint.complainantName
          .toLowerCase()
          .includes(searchText) ||
        complaint.complainantId
          .toLowerCase()
          .includes(searchText) ||
        complaint.category
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        complaint.status === statusFilter;

      const matchesType =
        typeFilter === "All" ||
        complaint.complainantType ===
          typeFilter.toLowerCase();

      const matchesPriority =
        priorityFilter === "All" ||
        complaint.priority === priorityFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        complaint.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesPriority &&
        matchesCategory
      );
    });
  }, [
    complaints,
    search,
    statusFilter,
    typeFilter,
    priorityFilter,
    categoryFilter,
  ]);

  const totalCount = complaints.length;

  const studentCount =
    complaints.filter(
      (complaint) =>
        complaint.complainantType ===
        "student"
    ).length;

  const facultyCount =
    complaints.filter(
      (complaint) =>
        complaint.complainantType ===
        "faculty"
    ).length;

  const pendingCount =
    complaints.filter(
      (complaint) =>
        complaint.status === "Pending"
    ).length;

  const activeCount =
    complaints.filter(
      (complaint) =>
        complaint.status ===
          "Under Review" ||
        complaint.status === "Assigned" ||
        complaint.status === "In Progress"
    ).length;

  const escalatedCount =
    complaints.filter(
      (complaint) =>
        complaint.status === "Escalated"
    ).length;

  const resolvedCount =
    complaints.filter(
      (complaint) =>
        complaint.status === "Resolved" ||
        complaint.status === "Closed"
    ).length;

  const urgentCount =
    complaints.filter(
      (complaint) =>
        complaint.priority === "Urgent"
    ).length;

  function openComplaint(complaint: Complaint) {
    setSelectedComplaint(complaint);

    setDepartment(
      complaint.assignedDepartment || ""
    );

    setAuthority(
      complaint.assignedAuthority || ""
    );

    setStatus(
      complaint.status || "Pending"
    );

    setDueDate(
      complaint.dueDate || ""
    );

    setEscalatedTo(
      complaint.escalatedTo || ""
    );

    setEscalationReason(
      complaint.escalationReason || ""
    );

    setAdminRemarks(
      complaint.adminRemarks || ""
    );

    setResolutionDetails(
      complaint.resolutionDetails || ""
    );

    setUpdateMessage("");
  }

  function updateComplaint() {
    if (!selectedComplaint) return;

    const now =
      new Date().toISOString();

    let nextEscalationLevel =
      selectedComplaint.escalationLevel || 0;

    if (
      status === "Escalated" &&
      selectedComplaint.status !==
        "Escalated"
    ) {
      nextEscalationLevel += 1;
    }

    const updatedComplaint: Complaint = {
      ...selectedComplaint,

      assignedDepartment:
        department,

      assignedAuthority:
        authority,

      status,

      dueDate,

      escalatedTo:
        status === "Escalated"
          ? escalatedTo
          : selectedComplaint.escalatedTo,

      escalationReason:
        status === "Escalated"
          ? escalationReason
          : selectedComplaint.escalationReason,

      escalationLevel:
        nextEscalationLevel,

      adminRemarks,

      resolutionDetails,

      updatedAt: now,
    };

    const updatedComplaints =
      complaints.map((complaint) =>
        complaint.id ===
        selectedComplaint.id
          ? updatedComplaint
          : complaint
      );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedComplaints)
    );

    setComplaints(
      updatedComplaints
    );

    setSelectedComplaint(
      updatedComplaint
    );

    setUpdateMessage(
      "Complaint updated successfully."
    );

    setTimeout(() => {
      setUpdateMessage("");
    }, 2500);
  }

  function clearFilters() {
    setSearch("");
    setStatusFilter("All");
    setTypeFilter("All");
    setPriorityFilter("All");
    setCategoryFilter("All");
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
                Administration Portal
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="hidden text-right sm:block">

              <p className="text-sm font-semibold">
                Administrator
              </p>

              <p className="text-xs text-slate-500">
                Full Complaint Management Access
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

      {/* CONTENT */}

      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* WELCOME */}

        <section className="rounded-3xl border border-red-400/20 bg-gradient-to-br from-red-950/30 via-slate-900 to-slate-900 p-7">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">
            Administrator Dashboard
          </p>

          <h2 className="mt-3 text-4xl font-black">
            Complaint Management Centre
          </h2>

          <p className="mt-3 max-w-4xl text-slate-400">
            Review every student and faculty complaint,
            assign responsibility, escalate matters,
            monitor deadlines and ensure timely resolution.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">

            <button
              onClick={loadComplaints}
              className="rounded-xl border border-slate-700 px-6 py-3 font-semibold transition hover:bg-slate-800"
            >
              ↻ Refresh Complaints
            </button>

          </div>

        </section>

        {/* STATISTICS */}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">

          <StatCard
            title="Total"
            value={totalCount}
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
            title="Urgent"
            value={urgentCount}
            icon="⚠️"
          />

          <StatCard
            title="Resolved"
            value={resolvedCount}
            icon="✅"
          />

        </section>

        {/* SEARCH AND FILTERS */}

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-5">

          <div className="flex flex-col gap-4">

            <div>

              <h3 className="text-xl font-bold">
                Complaint Management
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Search, filter and manage all complaints.
              </p>

            </div>

            <div className="grid gap-3 lg:grid-cols-2">

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search by complaint ID, title, name, ID or category..."
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-400"
              />

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-400"
              >
                <option value="All">
                  All Statuses
                </option>

                {statuses.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>

              <select
                value={typeFilter}
                onChange={(e) =>
                  setTypeFilter(
                    e.target.value
                  )
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-400"
              >
                <option value="All">
                  All Complainants
                </option>

                <option value="Student">
                  Students
                </option>

                <option value="Faculty">
                  Faculty
                </option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) =>
                  setPriorityFilter(
                    e.target.value
                  )
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-400"
              >
                <option value="All">
                  All Priorities
                </option>

                {priorities.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>

              <select
                value={categoryFilter}
                onChange={(e) =>
                  setCategoryFilter(
                    e.target.value
                  )
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-400"
              >
                <option value="All">
                  All Categories
                </option>

                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>

              <button
                onClick={clearFilters}
                className="rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold transition hover:bg-slate-800"
              >
                Clear Filters
              </button>

            </div>

          </div>

        </section>

        {/* RESULTS */}

        <div className="mt-6 flex items-center justify-between">

          <div>

            <h3 className="text-2xl font-bold">
              Complaints
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Showing {filteredComplaints.length} of{" "}
              {complaints.length} complaints
            </p>

          </div>

        </div>

        {/* COMPLAINT LIST */}

        <section className="mt-5 space-y-4">

          {filteredComplaints.length === 0 ? (

            <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900 p-12 text-center">

              <div className="text-5xl">
                📭
              </div>

              <h3 className="mt-5 text-xl font-bold">
                No complaints found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try changing your search or filters.
              </p>

            </div>

          ) : (

            filteredComplaints.map(
              (complaint) => (

                <article
                  key={complaint.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-blue-400/30"
                >

                  <div className="flex flex-col justify-between gap-5 lg:flex-row">

                    <div className="flex-1">

                      <div className="flex flex-wrap items-center gap-3">

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
                          {complaint.priority} Priority
                        </span>

                        <span className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-400">

                          {complaint.complainantType ===
                          "student"
                            ? "🎓 Student"
                            : "👨‍🏫 Faculty"}

                        </span>

                      </div>

                      <h4 className="mt-3 text-xl font-bold">
                        {complaint.title}
                      </h4>

                      <p className="mt-2 text-sm text-slate-500">

                        {complaint.category} •{" "}
                        {complaint.complainantName} •{" "}
                        {complaint.complainantId}

                      </p>

                      <p className="mt-3 text-xs text-slate-600">
                        Submitted{" "}
                        {formatDateTime(
                          complaint.submittedAt
                        )}
                      </p>

                      <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-400">
                        {complaint.description}
                      </p>

                      <div className="mt-5 grid gap-3 sm:grid-cols-3">

                        <MiniInfo
                          label="Department"
                          value={
                            complaint.assignedDepartment ||
                            "Not assigned"
                          }
                        />

                        <MiniInfo
                          label="Authority"
                          value={
                            complaint.assignedAuthority ||
                            "Not assigned"
                          }
                        />

                        <MiniInfo
                          label="Deadline"
                          value={
                            complaint.dueDate
                              ? formatDate(
                                  complaint.dueDate
                                )
                              : "Not set"
                          }
                        />

                      </div>

                    </div>

                    <div className="flex items-center">

                      <button
                        onClick={() =>
                          openComplaint(
                            complaint
                          )
                        }
                        className="w-full rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold transition hover:bg-blue-500 lg:w-auto"
                      >
                        Manage Complaint
                      </button>

                    </div>

                  </div>

                </article>

              )
            )

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
                  Submitted{" "}
                  {formatDateTime(
                    selectedComplaint.submittedAt
                  )}
                </p>

              </div>

              <button
                onClick={() =>
                  setSelectedComplaint(null)
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-xl text-slate-400 hover:bg-slate-800"
              >
                ×
              </button>

            </div>

            <div className="space-y-6 p-6">

              {/* COMPLAINANT */}

              <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                <h3 className="text-lg font-bold">
                  Complainant Information
                </h3>

                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

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
                    label="Name"
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
                    label="Category"
                    value={
                      selectedComplaint.category
                    }
                  />

                </div>

              </section>

              {/* ORIGINAL COMPLAINT */}

              <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                <h3 className="text-lg font-bold">
                  Complaint Details
                </h3>

                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

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

                  <Info
                    label="Submitted"
                    value={
                      formatDateTime(
                        selectedComplaint.submittedAt
                      )
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

              {/* ADMIN ACTION */}

              <section className="rounded-2xl border border-blue-400/20 bg-blue-500/5 p-6">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                    Administrator Authority
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    Administrative Action
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Assign responsibility, set deadlines,
                    change status and take necessary action.
                  </p>

                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">

                  {/* STATUS */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold">
                      Complaint Status
                    </label>

                    <select
                      value={status}
                      onChange={(e) =>
                        setStatus(
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-400"
                    >

                      {statuses.map(
                        (item) => (
                          <option
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  {/* DEPARTMENT */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold">
                      Assign Department
                    </label>

                    <select
                      value={department}
                      onChange={(e) =>
                        setDepartment(
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-400"
                    >

                      <option value="">
                        Select Department
                      </option>

                      {departments.map(
                        (item) => (
                          <option
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  {/* AUTHORITY */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold">
                      Responsible Authority
                    </label>

                    <select
                      value={authority}
                      onChange={(e) =>
                        setAuthority(
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-400"
                    >

                      <option value="">
                        Select Authority
                      </option>

                      {authorities.map(
                        (item) => (
                          <option
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  {/* DEADLINE */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold">
                      Resolution Deadline
                    </label>

                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) =>
                        setDueDate(
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-400"
                    />

                  </div>

                </div>

                {/* ESCALATION */}

                <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-500/5 p-5">

                  <div>

                    <h4 className="font-bold text-red-400">
                      🚨 Escalation
                    </h4>

                    <p className="mt-1 text-sm text-slate-500">
                      Use this when the matter requires
                      intervention from a higher authority.
                    </p>

                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">

                    <div>

                      <label className="mb-2 block text-sm font-semibold">
                        Escalate To
                      </label>

                      <select
                        value={escalatedTo}
                        onChange={(e) =>
                          setEscalatedTo(
                            e.target.value
                          )
                        }
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-red-400"
                      >

                        <option value="">
                          Select Higher Authority
                        </option>

                        {authorities.map(
                          (item) => (
                            <option
                              key={item}
                              value={item}
                            >
                              {item}
                            </option>
                          )
                        )}

                      </select>

                    </div>

                    <div>

                      <label className="mb-2 block text-sm font-semibold">
                        Escalation Reason
                      </label>

                      <input
                        value={escalationReason}
                        onChange={(e) =>
                          setEscalationReason(
                            e.target.value
                          )
                        }
                        placeholder="Why is this being escalated?"
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-red-400"
                      />

                    </div>

                  </div>

                </div>

                {/* REMARKS */}

                <div className="mt-6">

                  <label className="mb-2 block text-sm font-semibold">
                    Administrative Remarks
                  </label>

                  <textarea
                    value={adminRemarks}
                    onChange={(e) =>
                      setAdminRemarks(
                        e.target.value
                      )
                    }
                    rows={5}
                    placeholder="Add instructions, observations or administrative remarks..."
                    className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm leading-6 outline-none focus:border-blue-400"
                  />

                </div>

                {/* RESOLUTION */}

                <div className="mt-5">

                  <label className="mb-2 block text-sm font-semibold">
                    Resolution Details
                  </label>

                  <textarea
                    value={resolutionDetails}
                    onChange={(e) =>
                      setResolutionDetails(
                        e.target.value
                      )
                    }
                    rows={5}
                    placeholder="Describe the action taken or resolution provided..."
                    className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm leading-6 outline-none focus:border-green-400"
                  />

                </div>

                {updateMessage && (

                  <div className="mt-5 rounded-xl border border-green-400/20 bg-green-500/10 p-4 text-sm font-semibold text-green-400">
                    {updateMessage}
                  </div>

                )}

                <button
                  onClick={updateComplaint}
                  className="mt-6 w-full rounded-xl bg-blue-600 px-6 py-4 font-bold transition hover:bg-blue-500"
                >
                  Save Administrative Action
                </button>

              </section>

              {/* CURRENT STATUS */}

              <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                <h3 className="font-bold">
                  Current Administrative Record
                </h3>

                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                  <Info
                    label="Status"
                    value={
                      selectedComplaint.status
                    }
                  />

                  <Info
                    label="Department"
                    value={
                      selectedComplaint.assignedDepartment ||
                      "Not assigned"
                    }
                  />

                  <Info
                    label="Authority"
                    value={
                      selectedComplaint.assignedAuthority ||
                      "Not assigned"
                    }
                  />

                  <Info
                    label="Deadline"
                    value={
                      selectedComplaint.dueDate
                        ? formatDate(
                            selectedComplaint.dueDate
                          )
                        : "Not set"
                    }
                  />

                  <Info
                    label="Escalated To"
                    value={
                      selectedComplaint.escalatedTo ||
                      "Not escalated"
                    }
                  />

                  <Info
                    label="Escalation Level"
                    value={String(
                      selectedComplaint.escalationLevel ||
                        0
                    )}
                  />

                </div>

                {selectedComplaint.updatedAt && (

                  <p className="mt-4 text-xs text-slate-600">
                    Last administrative update:{" "}
                    {formatDateTime(
                      selectedComplaint.updatedAt
                    )}
                  </p>

                )}

              </section>

            </div>

            {/* FOOTER */}

            <div className="flex justify-end border-t border-slate-800 p-6">

              <button
                onClick={() =>
                  setSelectedComplaint(null)
                }
                className="rounded-xl border border-slate-700 px-6 py-3 font-semibold transition hover:bg-slate-800"
              >
                Close
              </button>

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
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">

      <div className="flex items-center justify-between gap-2">

        <span className="text-xl">
          {icon}
        </span>

        <span className="text-2xl font-black">
          {value}
        </span>

      </div>

      <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        {title}
      </p>

    </div>
  );
}

function MiniInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">

      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
        {label}
      </p>

      <p className="mt-1 truncate text-xs font-medium text-slate-300">
        {value}
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