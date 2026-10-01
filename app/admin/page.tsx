"use client";

import { useEffect, useMemo, useState } from "react";

type UserType = "student" | "faculty";

type Complaint = {
  id: string;
  complainantType: UserType;
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
};

const STORAGE_KEY = "dsceComplaints";

const departments = [
  "Administration",
  "Academic Department",
  "Human Resources",
  "Finance / Accounts",
  "Examination Cell",
  "Student Affairs",
  "Infrastructure & Maintenance",
  "IT Department",
  "Library",
  "Hostel Administration",
  "Transport Department",
  "Security",
  "Disciplinary Committee",
  "Principal's Office",
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

function formatDate(dateString?: string) {
  if (!dateString) return "Not set";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(dateString?: string) {
  if (!dateString) return "Not available";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function priorityClass(priority: string) {
  switch (priority) {
    case "Urgent":
      return "border-red-400/30 bg-red-500/10 text-red-400";

    case "High":
      return "border-orange-400/30 bg-orange-500/10 text-orange-400";

    case "Medium":
      return "border-yellow-400/30 bg-yellow-500/10 text-yellow-400";

    default:
      return "border-green-400/30 bg-green-500/10 text-green-400";
  }
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
      return "border-slate-400/30 bg-slate-500/10 text-slate-300";

    case "Rejected":
      return "border-red-400/30 bg-red-500/10 text-red-400";

    default:
      return "border-slate-700 bg-slate-800 text-slate-300";
  }
}

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedComplaint, setSelectedComplaint] =
    useState<Complaint | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const [department, setDepartment] = useState("");
  const [authority, setAuthority] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [adminRemarks, setAdminRemarks] = useState("");

  const [escalatedTo, setEscalatedTo] = useState("");
  const [escalationReason, setEscalationReason] = useState("");

  const [message, setMessage] = useState("");

  /*
    Load complaints from localStorage.
  */
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      setComplaints([]);
      return;
    }

    try {
      const parsed = JSON.parse(stored);

      if (Array.isArray(parsed)) {
        setComplaints(parsed);
      }
    } catch (error) {
      console.error(
        "Unable to load complaints:",
        error
      );
    }
  }, []);

  /*
    Save complaints.
  */
  function saveComplaints(updated: Complaint[]) {
    setComplaints(updated);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );
  }

  /*
    Open complaint details.
  */
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

    setPriority(
      complaint.priority || "Medium"
    );

    setDueDate(
      complaint.dueDate || ""
    );

    setAdminRemarks(
      complaint.adminRemarks || ""
    );

    setEscalatedTo(
      complaint.escalatedTo || ""
    );

    setEscalationReason(
      complaint.escalationReason || ""
    );

    setMessage("");
  }

  /*
    Close complaint details.
  */
  function closeComplaint() {
    setSelectedComplaint(null);
    setMessage("");
  }

  /*
    Update selected complaint.
  */
  function updateComplaint() {
    if (!selectedComplaint) return;

    const updatedComplaint: Complaint = {
      ...selectedComplaint,

      assignedDepartment:
        department,

      assignedAuthority:
        authority,

      status,

      priority,

      dueDate,

      adminRemarks,
    };

    const updated = complaints.map(
      (complaint) =>
        complaint.id === selectedComplaint.id
          ? updatedComplaint
          : complaint
    );

    saveComplaints(updated);

    setSelectedComplaint(updatedComplaint);

    setMessage(
      "Complaint updated successfully."
    );
  }

  /*
    Escalate complaint.
  */
  function escalateComplaint() {
    if (!selectedComplaint) return;

    if (!escalatedTo.trim()) {
      setMessage(
        "Please enter the authority to whom this complaint should be escalated."
      );

      return;
    }

    if (!escalationReason.trim()) {
      setMessage(
        "Please enter a reason for escalation."
      );

      return;
    }

    const currentLevel =
      selectedComplaint.escalationLevel || 0;

    const updatedComplaint: Complaint = {
      ...selectedComplaint,

      status: "Escalated",

      escalationLevel:
        currentLevel + 1,

      escalatedTo,

      escalationReason,

      adminRemarks,
    };

    const updated = complaints.map(
      (complaint) =>
        complaint.id === selectedComplaint.id
          ? updatedComplaint
          : complaint
    );

    saveComplaints(updated);

    setSelectedComplaint(updatedComplaint);

    setStatus("Escalated");

    setMessage(
      "Complaint escalated successfully."
    );
  }

  /*
    Filter complaints.
  */
  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      const searchText =
        search.toLowerCase();

      const matchesSearch =
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

      const matchesPriority =
        priorityFilter === "All" ||
        complaint.priority === priorityFilter;

      const matchesType =
        typeFilter === "All" ||
        complaint.complainantType ===
          typeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesType
      );
    });
  }, [
    complaints,
    search,
    statusFilter,
    priorityFilter,
    typeFilter,
  ]);

  /*
    Dashboard statistics.
  */
  const totalComplaints =
    complaints.length;

  const pendingComplaints =
    complaints.filter(
      (complaint) =>
        complaint.status === "Pending"
    ).length;

  const inProgressComplaints =
    complaints.filter(
      (complaint) =>
        complaint.status ===
          "In Progress" ||
        complaint.status ===
          "Under Review" ||
        complaint.status ===
          "Assigned"
    ).length;

  const escalatedComplaints =
    complaints.filter(
      (complaint) =>
        complaint.status ===
        "Escalated"
    ).length;

  const resolvedComplaints =
    complaints.filter(
      (complaint) =>
        complaint.status ===
          "Resolved" ||
        complaint.status ===
          "Closed"
    ).length;

  const urgentComplaints =
    complaints.filter(
      (complaint) =>
        complaint.priority === "Urgent"
    ).length;

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* HEADER */}

      <header className="border-b border-slate-800 bg-slate-950/95">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-xl font-black">
                D
              </div>

              <div>

                <h1 className="text-xl font-bold">
                  DSCE CONNECT
                </h1>

                <p className="text-xs text-slate-500">
                  Administration Control Center
                </p>

              </div>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <span className="hidden rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-400 sm:block">
              ADMINISTRATOR
            </span>

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

        {/* PAGE TITLE */}

        <div className="mb-8">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Administration
          </p>

          <h2 className="mt-2 text-4xl font-black">
            Complaint Management
          </h2>

          <p className="mt-3 max-w-3xl text-slate-400">
            Review, assign, escalate and monitor all
            student and faculty complaints from one
            centralized administration panel.
          </p>

        </div>

        {/* STATISTICS */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">

          <StatCard
            label="Total"
            value={totalComplaints}
            icon="📋"
          />

          <StatCard
            label="Pending"
            value={pendingComplaints}
            icon="⏳"
          />

          <StatCard
            label="In Progress"
            value={inProgressComplaints}
            icon="🔄"
          />

          <StatCard
            label="Escalated"
            value={escalatedComplaints}
            icon="🚨"
          />

          <StatCard
            label="Resolved"
            value={resolvedComplaints}
            icon="✅"
          />

          <StatCard
            label="Urgent"
            value={urgentComplaints}
            icon="⚠️"
          />

        </div>

        {/* FILTERS */}

        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-5">

          <div className="flex flex-col gap-4 lg:flex-row">

            {/* SEARCH */}

            <div className="flex-1">

              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Search
              </label>

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search ticket, name, USN, category..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
              />

            </div>

            {/* STATUS */}

            <div>

              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </label>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-500"
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

            </div>

            {/* PRIORITY */}

            <div>

              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Priority
              </label>

              <select
                value={priorityFilter}
                onChange={(e) =>
                  setPriorityFilter(e.target.value)
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-500"
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

            </div>

            {/* USER TYPE */}

            <div>

              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Complainant
              </label>

              <select
                value={typeFilter}
                onChange={(e) =>
                  setTypeFilter(e.target.value)
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-500"
              >

                <option value="All">
                  Everyone
                </option>

                <option value="student">
                  Students
                </option>

                <option value="faculty">
                  Faculty
                </option>

              </select>

            </div>

          </div>

        </section>

        {/* COMPLAINT LIST */}

        <section className="mt-6">

          <div className="mb-4 flex items-center justify-between">

            <h3 className="text-xl font-bold">
              Complaints
            </h3>

            <p className="text-sm text-slate-500">
              Showing{" "}
              {filteredComplaints.length}{" "}
              of {complaints.length}
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

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                Complaints submitted by students or faculty
                will appear here automatically.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {filteredComplaints.map(
                (complaint) => (

                  <button
                    key={complaint.id}
                    onClick={() =>
                      openComplaint(complaint)
                    }
                    className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-blue-500/40 hover:bg-slate-900/80"
                  >

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                      <div className="min-w-0 flex-1">

                        <div className="flex flex-wrap items-center gap-2">

                          <span className="font-mono text-sm font-bold text-blue-400">
                            {complaint.id}
                          </span>

                          <span
                            className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClass(
                              complaint.status
                            )}`}
                          >
                            {complaint.status}
                          </span>

                          <span
                            className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${priorityClass(
                              complaint.priority
                            )}`}
                          >
                            {complaint.priority}
                          </span>

                        </div>

                        <h4 className="mt-3 truncate text-lg font-bold">
                          {complaint.title}
                        </h4>

                        <p className="mt-1 text-sm text-slate-500">
                          {complaint.category}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">

                          <span>
                            👤{" "}
                            {complaint.complainantName}
                          </span>

                          <span>
                            ID:{" "}
                            {complaint.complainantId}
                          </span>

                          <span>
                            {complaint.complainantType ===
                            "student"
                              ? "🎓 Student"
                              : "👨‍🏫 Faculty"}
                          </span>

                          <span>
                            📅{" "}
                            {formatDate(
                              complaint.submittedAt
                            )}
                          </span>

                        </div>

                      </div>

                      <div className="flex shrink-0 items-center gap-3">

                        {complaint.assignedDepartment && (
                          <div className="hidden rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-right md:block">

                            <p className="text-[10px] uppercase tracking-wider text-slate-600">
                              Assigned Department
                            </p>

                            <p className="mt-1 text-xs font-semibold text-slate-300">
                              {
                                complaint.assignedDepartment
                              }
                            </p>

                          </div>
                        )}

                        <span className="text-xl text-slate-600">
                          →
                        </span>

                      </div>

                    </div>

                  </button>

                )
              )}

            </div>

          )}

        </section>

      </div>

      {/* DETAIL MODAL */}

      {selectedComplaint && (

        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">

          <div className="mx-auto my-8 max-w-5xl rounded-3xl border border-slate-700 bg-slate-950 shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-start justify-between border-b border-slate-800 p-6">

              <div>

                <div className="flex flex-wrap items-center gap-3">

                  <span className="font-mono text-lg font-bold text-blue-400">
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

                <p className="mt-1 text-sm text-slate-500">
                  Submitted{" "}
                  {formatDateTime(
                    selectedComplaint.submittedAt
                  )}
                </p>

              </div>

              <button
                onClick={closeComplaint}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-xl text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                ×
              </button>

            </div>

            {/* MODAL CONTENT */}

            <div className="grid gap-6 p-6 lg:grid-cols-2">

              {/* LEFT: COMPLAINT */}

              <div className="space-y-5">

                <InfoBox
                  label="Complainant"
                  value={`${selectedComplaint.complainantName} (${selectedComplaint.complainantId})`}
                />

                <InfoBox
                  label="User Type"
                  value={
                    selectedComplaint.complainantType ===
                    "student"
                      ? "Student"
                      : "Faculty"
                  }
                />

                <InfoBox
                  label="Category"
                  value={
                    selectedComplaint.category
                  }
                />

                <InfoBox
                  label="Priority"
                  value={
                    selectedComplaint.priority
                  }
                />

                <InfoBox
                  label="Location"
                  value={
                    selectedComplaint.location ||
                    "Not provided"
                  }
                />

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Complaint Description
                  </p>

                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-300">
                    {
                      selectedComplaint.description
                    }
                  </p>

                </div>

                {selectedComplaint.escalatedTo && (

                  <div className="rounded-2xl border border-red-400/20 bg-red-500/5 p-5">

                    <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                      Escalation
                    </p>

                    <p className="mt-3 text-sm text-slate-300">
                      Escalated to:{" "}
                      <span className="font-semibold">
                        {
                          selectedComplaint.escalatedTo
                        }
                      </span>
                    </p>

                    <p className="mt-2 text-sm text-slate-400">
                      Reason:{" "}
                      {
                        selectedComplaint.escalationReason ||
                        "Not specified"
                      }
                    </p>

                  </div>

                )}

              </div>

              {/* RIGHT: ADMIN CONTROLS */}

              <div className="space-y-5">

                <div className="rounded-2xl border border-blue-400/20 bg-blue-500/5 p-5">

                  <h3 className="font-bold text-blue-400">
                    Administrative Action
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Only administrators should have access
                    to these controls.
                  </p>

                </div>

                {/* STATUS */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    Complaint Status
                  </label>

                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  >

                    {statuses.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}

                  </select>

                </div>

                {/* PRIORITY */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    Priority
                  </label>

                  <select
                    value={priority}
                    onChange={(e) =>
                      setPriority(e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  >

                    {priorities.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}

                  </select>

                </div>

                {/* DEPARTMENT */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    Assign Department
                  </label>

                  <select
                    value={department}
                    onChange={(e) =>
                      setDepartment(e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-blue-500"
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

                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    Responsible Authority
                  </label>

                  <input
                    value={authority}
                    onChange={(e) =>
                      setAuthority(e.target.value)
                    }
                    placeholder="Name / designation of responsible person"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />

                </div>

                {/* DUE DATE */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    Resolution Deadline
                  </label>

                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) =>
                      setDueDate(e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />

                </div>

                {/* ADMIN REMARKS */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    Administrative Remarks
                  </label>

                  <textarea
                    rows={4}
                    value={adminRemarks}
                    onChange={(e) =>
                      setAdminRemarks(e.target.value)
                    }
                    placeholder="Enter action taken, instructions or administrative remarks..."
                    className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />

                </div>

                {/* SAVE */}

                <button
                  onClick={updateComplaint}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 font-bold transition hover:from-blue-500 hover:to-cyan-400"
                >
                  Save Administrative Changes
                </button>

                {/* ESCALATION */}

                <div className="rounded-2xl border border-red-400/20 bg-red-500/5 p-5">

                  <h3 className="font-bold text-red-400">
                    Escalate Complaint
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Use this when the matter requires
                    intervention from a higher authority.
                  </p>

                  <input
                    value={escalatedTo}
                    onChange={(e) =>
                      setEscalatedTo(e.target.value)
                    }
                    placeholder="Escalate to..."
                    className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-red-400"
                  />

                  <textarea
                    rows={3}
                    value={escalationReason}
                    onChange={(e) =>
                      setEscalationReason(
                        e.target.value
                      )
                    }
                    placeholder="Reason for escalation..."
                    className="mt-3 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-red-400"
                  />

                  <button
                    onClick={
                      escalateComplaint
                    }
                    className="mt-3 w-full rounded-xl border border-red-400/30 bg-red-500/10 px-5 py-3 font-bold text-red-400 transition hover:bg-red-500/20"
                  >
                    🚨 Escalate Matter
                  </button>

                </div>

                {/* MESSAGE */}

                {message && (

                  <div className="rounded-xl border border-blue-400/20 bg-blue-500/10 p-4 text-sm text-blue-300">
                    {message}
                  </div>

                )}

              </div>

            </div>

            {/* MODAL FOOTER */}

            <div className="border-t border-slate-800 p-6">

              <button
                onClick={closeComplaint}
                className="rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold transition hover:bg-slate-800"
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

/* ------------------------------------------------ */
/* STAT CARD */
/* ------------------------------------------------ */

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

      <div className="flex items-center justify-between">

        <span className="text-2xl">
          {icon}
        </span>

        <span className="text-2xl font-black">
          {value}
        </span>

      </div>

      <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>

    </div>
  );
}

/* ------------------------------------------------ */
/* INFO BOX */
/* ------------------------------------------------ */

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">

      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-sm font-medium text-slate-200">
        {value}
      </p>

    </div>
  );
}