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

const departments = [
  "Administration",
  "Academic Department",
  "Human Resources",
  "Examination Cell",
  "Student Affairs",
  "Infrastructure",
  "IT Department",
  "Accounts / Finance",
  "Library",
  "Hostel",
  "Transport",
  "Security",
  "Other",
];

const authorities = [
  "Principal",
  "Vice Principal",
  "Dean",
  "Head of Department",
  "HR Manager",
  "Examination Controller",
  "Student Welfare Officer",
  "Finance Officer",
  "IT Head",
  "Administrative Officer",
  "Infrastructure Officer",
  "Other",
];

const escalationAuthorities = [
  "Principal",
  "Vice Principal",
  "Dean",
  "Head of Department",
  "HR Manager",
  "Examination Controller",
  "Student Welfare Officer",
  "Administrative Officer",
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

  const [adminName, setAdminName] =
    useState("Administrator");

  const [selectedComplaint, setSelectedComplaint] =
    useState<Complaint | null>(null);

  const [search, setSearch] = useState("");

  const [filterType, setFilterType] =
    useState("All");

  const [filterStatus, setFilterStatus] =
    useState("All");

  const [filterPriority, setFilterPriority] =
    useState("All");

  const [assignedDepartment, setAssignedDepartment] =
    useState("");

  const [assignedAuthority, setAssignedAuthority] =
    useState("");

  const [dueDate, setDueDate] =
    useState("");

  const [status, setStatus] =
    useState("Pending");

  const [adminRemarks, setAdminRemarks] =
    useState("");

  const [resolutionDetails, setResolutionDetails] =
    useState("");

  const [escalatedTo, setEscalatedTo] =
    useState("");

  const [escalationReason, setEscalationReason] =
    useState("");

  const [saveMessage, setSaveMessage] =
    useState("");

  useEffect(() => {
    const savedAdmin =
      localStorage.getItem("adminName");

    if (savedAdmin) {
      setAdminName(savedAdmin);
    }

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
        search.toLowerCase().trim();

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

      const matchesType =
        filterType === "All" ||
        complaint.complainantType ===
          filterType;

      const matchesStatus =
        filterStatus === "All" ||
        complaint.status === filterStatus;

      const matchesPriority =
        filterPriority === "All" ||
        complaint.priority === filterPriority;

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    complaints,
    search,
    filterType,
    filterStatus,
    filterPriority,
  ]);

  const totalComplaints =
    complaints.length;

  const studentComplaints =
    complaints.filter(
      (complaint) =>
        complaint.complainantType ===
        "student"
    ).length;

  const facultyComplaints =
    complaints.filter(
      (complaint) =>
        complaint.complainantType ===
        "faculty"
    ).length;

  const pendingComplaints =
    complaints.filter(
      (complaint) =>
        complaint.status === "Pending"
    ).length;

  const activeComplaints =
    complaints.filter(
      (complaint) =>
        complaint.status ===
          "Under Review" ||
        complaint.status ===
          "Assigned" ||
        complaint.status ===
          "In Progress"
    ).length;

  const escalatedComplaints =
    complaints.filter(
      (complaint) =>
        complaint.status === "Escalated"
    ).length;

  const resolvedComplaints =
    complaints.filter(
      (complaint) =>
        complaint.status === "Resolved" ||
        complaint.status === "Closed"
    ).length;

  function openComplaint(
    complaint: Complaint
  ) {
    setSelectedComplaint(complaint);

    setAssignedDepartment(
      complaint.assignedDepartment || ""
    );

    setAssignedAuthority(
      complaint.assignedAuthority || ""
    );

    setDueDate(
      complaint.dueDate || ""
    );

    setStatus(
      complaint.status || "Pending"
    );

    setAdminRemarks(
      complaint.adminRemarks || ""
    );

    setResolutionDetails(
      complaint.resolutionDetails || ""
    );

    setEscalatedTo(
      complaint.escalatedTo || ""
    );

    setEscalationReason(
      complaint.escalationReason || ""
    );

    setSaveMessage("");
  }

  function saveChanges() {
    if (!selectedComplaint) {
      return;
    }

    const updatedComplaint: Complaint = {
      ...selectedComplaint,

      assignedDepartment:
        assignedDepartment.trim(),

      assignedAuthority:
        assignedAuthority.trim(),

      dueDate,

      status,

      adminRemarks:
        adminRemarks.trim(),

      resolutionDetails:
        resolutionDetails.trim(),

      escalatedTo:
        status === "Escalated"
          ? escalatedTo.trim()
          : selectedComplaint.escalatedTo,

      escalationReason:
        status === "Escalated"
          ? escalationReason.trim()
          : selectedComplaint.escalationReason,

      updatedAt:
        new Date().toISOString(),
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

    setComplaints(updatedComplaints);

    setSelectedComplaint(
      updatedComplaint
    );

    setSaveMessage(
      "Complaint updated successfully."
    );

    setTimeout(() => {
      setSaveMessage("");
    }, 2500);
  }

  function escalateComplaint() {
    if (!selectedComplaint) {
      return;
    }

    if (!escalatedTo) {
      setSaveMessage(
        "Please select an authority for escalation."
      );
      return;
    }

    if (!escalationReason.trim()) {
      setSaveMessage(
        "Please provide a reason for escalation."
      );
      return;
    }

    setStatus("Escalated");

    const updatedComplaint: Complaint = {
      ...selectedComplaint,

      status: "Escalated",

      escalationLevel:
        (selectedComplaint.escalationLevel || 0) +
        1,

      escalatedTo:
        escalatedTo.trim(),

      escalationReason:
        escalationReason.trim(),

      assignedDepartment:
        assignedDepartment.trim(),

      assignedAuthority:
        assignedAuthority.trim(),

      dueDate,

      adminRemarks:
        adminRemarks.trim(),

      updatedAt:
        new Date().toISOString(),
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

    setComplaints(updatedComplaints);

    setSelectedComplaint(
      updatedComplaint
    );

    setSaveMessage(
      "Complaint escalated successfully."
    );

    setTimeout(() => {
      setSaveMessage("");
    }, 2500);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* HEADER */}

      <header className="border-b border-slate-800 bg-slate-950">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-orange-500 text-xl font-black">
              A
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

          <div className="flex items-center gap-4">

            <div className="hidden text-right sm:block">

              <p className="text-sm font-semibold">
                {adminName}
              </p>

              <p className="text-xs text-slate-500">
                Administrator
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

        {/* TITLE */}

        <section className="rounded-3xl border border-red-400/20 bg-gradient-to-br from-red-950/40 via-slate-900 to-slate-900 p-7">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">
            Administrator Dashboard
          </p>

          <h2 className="mt-3 text-4xl font-black">
            Complaint Management Centre
          </h2>

          <p className="mt-3 max-w-4xl text-slate-400">
            Review, assign, escalate, monitor and resolve
            complaints submitted by students and faculty.
            Administration has complete authority over the
            complaint lifecycle.
          </p>

        </section>

        {/* STATISTICS */}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="Total Complaints"
            value={totalComplaints}
            icon="📋"
          />

          <StatCard
            title="Student Complaints"
            value={studentComplaints}
            icon="🎓"
          />

          <StatCard
            title="Faculty Complaints"
            value={facultyComplaints}
            icon="👨‍🏫"
          />

          <StatCard
            title="Pending"
            value={pendingComplaints}
            icon="⏳"
          />

          <StatCard
            title="Active"
            value={activeComplaints}
            icon="🔄"
          />

          <StatCard
            title="Escalated"
            value={escalatedComplaints}
            icon="🚨"
          />

          <StatCard
            title="Resolved / Closed"
            value={resolvedComplaints}
            icon="✅"
          />

        </section>

        {/* ADMIN AUTHORITY */}

        <section className="mt-6 rounded-2xl border border-red-400/20 bg-red-500/5 p-5">

          <h3 className="font-bold text-red-400">
            🔐 Administrative Authority
          </h3>

          <div className="mt-4 grid gap-3 text-sm text-slate-400 sm:grid-cols-2 lg:grid-cols-3">

            <p>✓ View student complaints</p>

            <p>✓ View faculty complaints</p>

            <p>✓ Assign departments</p>

            <p>✓ Assign responsible authorities</p>

            <p>✓ Set resolution deadlines</p>

            <p>✓ Change complaint status</p>

            <p>✓ Escalate complaints</p>

            <p>✓ Add administrative remarks</p>

            <p>✓ Record resolution details</p>

          </div>

        </section>

        {/* FILTERS */}

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-5">

          <div className="grid gap-4 lg:grid-cols-4">

            <div className="lg:col-span-1">

              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Search
              </label>

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search complaints..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-red-400"
              />

            </div>

            <FilterSelect
              label="Complainant"
              value={filterType}
              onChange={setFilterType}
              options={[
                "All",
                "student",
                "faculty",
              ]}
            />

            <FilterSelect
              label="Status"
              value={filterStatus}
              onChange={setFilterStatus}
              options={[
                "All",
                ...statuses,
              ]}
            />

            <FilterSelect
              label="Priority"
              value={filterPriority}
              onChange={setFilterPriority}
              options={[
                "All",
                "Low",
                "Medium",
                "High",
                "Urgent",
              ]}
            />

          </div>

        </section>

        {/* COMPLAINT TABLE */}

        <section className="mt-8">

          <div className="mb-5 flex items-end justify-between">

            <div>

              <h3 className="text-2xl font-bold">
                Complaint Register
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {filteredComplaints.length} complaint
                {filteredComplaints.length === 1
                  ? ""
                  : "s"} displayed
              </p>

            </div>

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
                complaints to be submitted.
              </p>

            </div>

          ) : (

            <div className="overflow-hidden rounded-2xl border border-slate-800">

              <div className="overflow-x-auto">

                <table className="w-full min-w-[1000px]">

                  <thead className="bg-slate-900">

                    <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wider text-slate-500">

                      <th className="px-5 py-4">
                        Complaint
                      </th>

                      <th className="px-5 py-4">
                        Complainant
                      </th>

                      <th className="px-5 py-4">
                        Category
                      </th>

                      <th className="px-5 py-4">
                        Priority
                      </th>

                      <th className="px-5 py-4">
                        Status
                      </th>

                      <th className="px-5 py-4">
                        Department
                      </th>

                      <th className="px-5 py-4">
                        Action
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {filteredComplaints.map(
                      (complaint) => (

                        <tr
                          key={complaint.id}
                          className="border-b border-slate-800 bg-slate-950 transition hover:bg-slate-900"
                        >

                          <td className="px-5 py-5">

                            <p className="font-mono text-xs font-bold text-red-400">
                              {complaint.id}
                            </p>

                            <p className="mt-2 max-w-xs font-semibold">
                              {complaint.title}
                            </p>

                            <p className="mt-1 text-xs text-slate-600">
                              {formatDate(
                                complaint.submittedAt
                              )}
                            </p>

                          </td>

                          <td className="px-5 py-5">

                            <span
                              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
                                complaint.complainantType ===
                                "student"
                                  ? "border-blue-400/20 bg-blue-500/10 text-blue-400"
                                  : "border-purple-400/20 bg-purple-500/10 text-purple-400"
                              }`}
                            >
                              {complaint.complainantType ===
                              "student"
                                ? "Student"
                                : "Faculty"}
                            </span>

                            <p className="mt-2 text-sm font-medium">
                              {complaint.complainantName}
                            </p>

                            <p className="text-xs text-slate-600">
                              {complaint.complainantId}
                            </p>

                          </td>

                          <td className="px-5 py-5 text-sm text-slate-400">
                            {complaint.category}
                          </td>

                          <td className="px-5 py-5">

                            <span
                              className={`text-sm font-bold ${priorityClass(
                                complaint.priority
                              )}`}
                            >
                              {complaint.priority}
                            </span>

                          </td>

                          <td className="px-5 py-5">

                            <span
                              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(
                                complaint.status
                              )}`}
                            >
                              {complaint.status}
                            </span>

                          </td>

                          <td className="px-5 py-5 text-sm text-slate-400">

                            {complaint.assignedDepartment ||
                              "Not assigned"}

                          </td>

                          <td className="px-5 py-5">

                            <button
                              onClick={() =>
                                openComplaint(
                                  complaint
                                )
                              }
                              className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold transition hover:bg-red-500"
                            >
                              Manage
                            </button>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>

          )}

        </section>

      </div>

      {/* MANAGEMENT MODAL */}

      {selectedComplaint && (

        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">

          <div className="mx-auto my-8 max-w-4xl rounded-3xl border border-slate-700 bg-slate-950 shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-start justify-between border-b border-slate-800 p-6">

              <div>

                <div className="flex flex-wrap items-center gap-3">

                  <span className="font-mono text-sm font-bold text-red-400">
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
                  <span className="text-slate-300">
                    {
                      selectedComplaint.complainantName
                    }
                  </span>{" "}
                  (
                  {
                    selectedComplaint.complainantType
                  }
                  )
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

            {/* MODAL CONTENT */}

            <div className="space-y-6 p-6">

              {/* ORIGINAL COMPLAINT */}

              <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                <h3 className="font-bold">
                  Complaint Details
                </h3>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">

                  <Info
                    label="Complaint Category"
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
                    label="Submitted"
                    value={formatDateTime(
                      selectedComplaint.submittedAt
                    )}
                  />

                  <Info
                    label="Location"
                    value={
                      selectedComplaint.location ||
                      "Not provided"
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

              <section className="rounded-2xl border border-red-400/20 bg-red-500/5 p-5">

                <div>

                  <h3 className="text-lg font-bold text-red-400">
                    Administrative Action
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    These fields are controlled exclusively
                    by the administration.
                  </p>

                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">

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
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-red-400"
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
                      value={
                        assignedDepartment
                      }
                      onChange={(e) =>
                        setAssignedDepartment(
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-red-400"
                    >

                      <option value="">
                        Select department
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

                  {/* AUTHORITY */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold">
                      Responsible Authority
                    </label>

                    <select
                      value={
                        assignedAuthority
                      }
                      onChange={(e) =>
                        setAssignedAuthority(
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-red-400"
                    >

                      <option value="">
                        Select authority
                      </option>

                      {authorities.map(
                        (authority) => (
                          <option
                            key={authority}
                            value={authority}
                          >
                            {authority}
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
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-red-400"
                    />

                  </div>

                </div>

                {/* ADMIN REMARKS */}

                <div className="mt-5">

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
                    rows={4}
                    placeholder="Record actions taken, instructions, observations or remarks..."
                    className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm leading-6 outline-none focus:border-red-400"
                  />

                </div>

                {/* RESOLUTION */}

                <div className="mt-5">

                  <label className="mb-2 block text-sm font-semibold">
                    Resolution Details
                  </label>

                  <textarea
                    value={
                      resolutionDetails
                    }
                    onChange={(e) =>
                      setResolutionDetails(
                        e.target.value
                      )
                    }
                    rows={4}
                    placeholder="Describe the final action/resolution..."
                    className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm leading-6 outline-none focus:border-red-400"
                  />

                </div>

                {/* SAVE */}

                <button
                  onClick={saveChanges}
                  className="mt-5 rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500"
                >
                  Save Administrative Changes
                </button>

              </section>

              {/* ESCALATION */}

              <section className="rounded-2xl border border-orange-400/20 bg-orange-500/5 p-5">

                <h3 className="font-bold text-orange-400">
                  🚨 Escalate Complaint
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Escalate the matter when it requires
                  intervention from a higher authority.
                </p>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">

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
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-orange-400"
                    >

                      <option value="">
                        Select authority
                      </option>

                      {escalationAuthorities.map(
                        (authority) => (
                          <option
                            key={authority}
                            value={authority}
                          >
                            {authority}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  <div>

                    <label className="mb-2 block text-sm font-semibold">
                      Escalation Reason
                    </label>

                    <textarea
                      value={
                        escalationReason
                      }
                      onChange={(e) =>
                        setEscalationReason(
                          e.target.value
                        )
                      }
                      rows={3}
                      placeholder="Why does this complaint require escalation?"
                      className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-orange-400"
                    />

                  </div>

                </div>

                <button
                  onClick={
                    escalateComplaint
                  }
                  className="mt-5 rounded-xl bg-orange-600 px-6 py-3 font-bold transition hover:bg-orange-500"
                >
                  Escalate Complaint
                </button>

              </section>

              {/* MESSAGE */}

              {saveMessage && (

                <div className="rounded-xl border border-green-400/20 bg-green-500/10 p-4 text-sm font-medium text-green-400">
                  {saveMessage}
                </div>

              )}

            </div>

            {/* FOOTER */}

            <div className="border-t border-slate-800 p-6">

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

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>

      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-red-400"
      >

        {options.map((option) => (

          <option
            key={option}
            value={option}
          >
            {option === "student"
              ? "Student"
              : option === "faculty"
              ? "Faculty"
              : option}
          </option>

        ))}

      </select>

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