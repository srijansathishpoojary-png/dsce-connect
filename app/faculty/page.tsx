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
};

const STORAGE_KEY = "dsceComplaints";

const facultyCategories = [
  "Salary / Payroll",
  "Students",
  "Infrastructure",
  "Colleagues",
  "Administration",
  "Academic",
  "Human Resources",
  "Workplace",
  "Examination",
  "Leave / Attendance",
  "IT / Technology",
  "Other",
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

export default function FacultyDashboard() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  const [facultyName, setFacultyName] =
    useState("Faculty Member");

  const [facultyId, setFacultyId] =
    useState("");

  const [selectedComplaint, setSelectedComplaint] =
    useState<Complaint | null>(null);

  const [showForm, setShowForm] =
    useState(false);

  const [title, setTitle] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [priority, setPriority] =
    useState("Medium");

  const [formMessage, setFormMessage] =
    useState("");

  useEffect(() => {
    const savedName =
      localStorage.getItem("facultyName");

    const savedId =
      localStorage.getItem("facultyId");

    if (savedName) {
      setFacultyName(savedName);
    }

    if (savedId) {
      setFacultyId(savedId);
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

  const myComplaints = useMemo(() => {
    if (!facultyId) {
      return [];
    }

    return complaints.filter(
      (complaint) =>
        complaint.complainantType ===
          "faculty" &&
        complaint.complainantId === facultyId
    );
  }, [complaints, facultyId]);

  const totalComplaints =
    myComplaints.length;

  const pendingComplaints =
    myComplaints.filter(
      (complaint) =>
        complaint.status === "Pending"
    ).length;

  const activeComplaints =
    myComplaints.filter(
      (complaint) =>
        complaint.status ===
          "Under Review" ||
        complaint.status ===
          "Assigned" ||
        complaint.status ===
          "In Progress" ||
        complaint.status ===
          "Escalated"
    ).length;

  const resolvedComplaints =
    myComplaints.filter(
      (complaint) =>
        complaint.status ===
          "Resolved" ||
        complaint.status ===
          "Closed"
    ).length;

  function submitComplaint() {
    setFormMessage("");

    if (!facultyId) {
      setFormMessage(
        "Faculty ID could not be identified. Please login again."
      );
      return;
    }

    if (!title.trim()) {
      setFormMessage(
        "Please enter a complaint title."
      );
      return;
    }

    if (!category) {
      setFormMessage(
        "Please select a complaint category."
      );
      return;
    }

    if (!description.trim()) {
      setFormMessage(
        "Please describe your complaint."
      );
      return;
    }

    const newComplaint: Complaint = {
      id: `FAC-${Date.now()}`,

      complainantType: "faculty",

      complainantName: facultyName,

      complainantId: facultyId,

      title: title.trim(),

      category,

      description: description.trim(),

      location: location.trim(),

      priority,

      status: "Pending",

      submittedAt:
        new Date().toISOString(),
    };

    const stored =
      localStorage.getItem(STORAGE_KEY);

    let existing: Complaint[] = [];

    if (stored) {
      try {
        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          existing = parsed;
        }
      } catch {
        existing = [];
      }
    }

    const updated = [
      ...existing,
      newComplaint,
    ];

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );

    setComplaints(updated);

    setTitle("");
    setCategory("");
    setDescription("");
    setLocation("");
    setPriority("Medium");

    setFormMessage(
      `Complaint submitted successfully. Ticket ID: ${newComplaint.id}`
    );

    setTimeout(() => {
      setShowForm(false);
      setFormMessage("");
    }, 1800);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* HEADER */}

      <header className="border-b border-slate-800 bg-slate-950">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 text-xl font-black">
              D
            </div>

            <div>

              <h1 className="font-bold">
                DSCE CONNECT
              </h1>

              <p className="text-xs text-slate-500">
                Faculty Portal
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="hidden text-right sm:block">

              <p className="text-sm font-semibold">
                {facultyName}
              </p>

              <p className="text-xs text-slate-500">
                {facultyId || "Faculty"}
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

        {/* WELCOME */}

        <section className="rounded-3xl border border-purple-400/20 bg-gradient-to-br from-purple-950/50 via-slate-900 to-slate-900 p-7">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-400">
            Faculty Dashboard
          </p>

          <h2 className="mt-3 text-4xl font-black">
            Welcome, {facultyName}
          </h2>

          <p className="mt-3 max-w-3xl text-slate-400">
            Report workplace, academic, student,
            infrastructure, salary and other concerns.
            Track the progress of every complaint submitted
            by you.
          </p>

          <button
            onClick={() => {
              setShowForm(true);
              setFormMessage("");
            }}
            className="mt-6 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 font-bold transition hover:from-purple-500 hover:to-blue-400"
          >
            + Submit Faculty Complaint
          </button>

        </section>

        {/* STATISTICS */}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <DashboardCard
            title="My Complaints"
            value={totalComplaints}
            icon="📋"
          />

          <DashboardCard
            title="Pending"
            value={pendingComplaints}
            icon="⏳"
          />

          <DashboardCard
            title="Active"
            value={activeComplaints}
            icon="🔄"
          />

          <DashboardCard
            title="Resolved"
            value={resolvedComplaints}
            icon="✅"
          />

        </section>

        {/* PERMISSION NOTICE */}

        <div className="mt-6 rounded-2xl border border-blue-400/10 bg-blue-500/5 p-5">

          <p className="text-sm font-semibold text-blue-400">
            🔒 Faculty Access
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            You can submit and track your own complaints.
            Complaint assignment, escalation, status
            management and administrative action are
            handled exclusively by the administration.
          </p>

        </div>

        {/* COMPLAINT LIST */}

        <section className="mt-8">

          <div className="mb-5">

            <h3 className="text-2xl font-bold">
              My Complaints
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Only complaints submitted by you are
              displayed here.
            </p>

          </div>

          {myComplaints.length === 0 ? (

            <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900 p-12 text-center">

              <div className="text-5xl">
                📭
              </div>

              <h3 className="mt-5 text-xl font-bold">
                No complaints yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                You haven't submitted any complaints yet.
              </p>

              <button
                onClick={() => setShowForm(true)}
                className="mt-6 rounded-xl bg-purple-600 px-6 py-3 font-semibold transition hover:bg-purple-500"
              >
                Submit a Complaint
              </button>

            </div>

          ) : (

            <div className="space-y-4">

              {myComplaints.map(
                (complaint) => (

                  <button
                    key={complaint.id}
                    onClick={() =>
                      setSelectedComplaint(
                        complaint
                      )
                    }
                    className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-purple-500/40"
                  >

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-3">

                          <span className="font-mono text-sm font-bold text-purple-400">
                            {complaint.id}
                          </span>

                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(
                              complaint.status
                            )}`}
                          >
                            {complaint.status}
                          </span>

                        </div>

                        <h4 className="mt-3 text-lg font-bold">
                          {complaint.title}
                        </h4>

                        <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-500">

                          <span>
                            Category:{" "}
                            {complaint.category}
                          </span>

                          <span>
                            Submitted:{" "}
                            {formatDate(
                              complaint.submittedAt
                            )}
                          </span>

                        </div>

                      </div>

                      <div className="flex shrink-0 items-center gap-5">

                        <div className="text-right">

                          <p className="text-xs text-slate-600">
                            Priority
                          </p>

                          <p
                            className={`mt-1 text-sm font-bold ${priorityClass(
                              complaint.priority
                            )}`}
                          >
                            {complaint.priority}
                          </p>

                        </div>

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

      {/* NEW COMPLAINT MODAL */}

      {showForm && (

        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">

          <div className="mx-auto my-8 max-w-2xl rounded-3xl border border-slate-700 bg-slate-950 shadow-2xl">

            <div className="flex items-start justify-between border-b border-slate-800 p-6">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                  Faculty Complaint
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Submit a Complaint
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Your complaint will be reviewed and
                  managed by the administration.
                </p>

              </div>

              <button
                onClick={() =>
                  setShowForm(false)
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-xl text-slate-400 hover:bg-slate-800"
              >
                ×
              </button>

            </div>

            <div className="space-y-5 p-6">

              {/* TITLE */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Complaint Title
                </label>

                <input
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="Briefly describe your issue"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-purple-400"
                />

              </div>

              {/* CATEGORY */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Complaint Category
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-purple-400"
                >

                  <option value="">
                    Select category
                  </option>

                  {facultyCategories.map(
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

              {/* PRIORITY */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Priority
                </label>

                <select
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-purple-400"
                >

                  {priorities.map(
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

              {/* LOCATION */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Location
                </label>

                <input
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                  placeholder="Block / room / department / other location"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-purple-400"
                />

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Complaint Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  rows={6}
                  placeholder="Explain the issue in detail..."
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm leading-6 outline-none focus:border-purple-400"
                />

              </div>

              {/* MESSAGE */}

              {formMessage && (

                <div className="rounded-xl border border-blue-400/20 bg-blue-500/10 p-4 text-sm text-blue-300">
                  {formMessage}
                </div>

              )}

              {/* SUBMIT */}

              <button
                onClick={submitComplaint}
                className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-5 py-3.5 font-bold transition hover:from-purple-500 hover:to-blue-400"
              >
                Submit Complaint
              </button>

            </div>

          </div>

        </div>

      )}

      {/* COMPLAINT DETAILS MODAL */}

      {selectedComplaint && (

        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">

          <div className="mx-auto my-8 max-w-3xl rounded-3xl border border-slate-700 bg-slate-950 shadow-2xl">

            <div className="flex items-start justify-between border-b border-slate-800 p-6">

              <div>

                <span className="font-mono text-sm font-bold text-purple-400">
                  {selectedComplaint.id}
                </span>

                <h2 className="mt-3 text-2xl font-bold">
                  {selectedComplaint.title}
                </h2>

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

            <div className="space-y-5 p-6">

              {/* STATUS */}

              <div className="rounded-2xl border border-blue-400/20 bg-blue-500/5 p-5">

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Current Status
                </p>

                <span
                  className={`mt-3 inline-flex rounded-full border px-4 py-2 text-sm font-bold ${statusClass(
                    selectedComplaint.status
                  )}`}
                >
                  {selectedComplaint.status}
                </span>

              </div>

              {/* DETAILS */}

              <div className="grid gap-4 sm:grid-cols-2">

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

              {/* DESCRIPTION */}

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Complaint Description
                </p>

                <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-300">
                  {selectedComplaint.description}
                </p>

              </div>

              {/* ADMINISTRATION */}

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                <h3 className="font-bold">
                  Administrative Information
                </h3>

                <div className="mt-4 space-y-4">

                  <Info
                    label="Assigned Department"
                    value={
                      selectedComplaint.assignedDepartment ||
                      "Not assigned yet"
                    }
                  />

                  <Info
                    label="Responsible Authority"
                    value={
                      selectedComplaint.assignedAuthority ||
                      "Not assigned yet"
                    }
                  />

                  <Info
                    label="Resolution Deadline"
                    value={
                      selectedComplaint.dueDate
                        ? formatDate(
                            selectedComplaint.dueDate
                          )
                        : "Not set"
                    }
                  />

                </div>

              </div>

              {/* ESCALATION */}

              {selectedComplaint.status ===
                "Escalated" && (

                <div className="rounded-2xl border border-red-400/20 bg-red-500/5 p-5">

                  <h3 className="font-bold text-red-400">
                    🚨 Complaint Escalated
                  </h3>

                  <p className="mt-3 text-sm text-slate-400">
                    This matter has been escalated by
                    the administration.
                  </p>

                  {selectedComplaint.escalatedTo && (

                    <p className="mt-3 text-sm text-slate-300">
                      Escalated to:{" "}
                      <span className="font-semibold">
                        {
                          selectedComplaint.escalatedTo
                        }
                      </span>
                    </p>

                  )}

                </div>

              )}

              {/* ADMIN REMARKS */}

              {selectedComplaint.adminRemarks && (

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Administrative Remarks
                  </p>

                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-300">
                    {
                      selectedComplaint.adminRemarks
                    }
                  </p>

                </div>

              )}

              {/* RESOLUTION */}

              {selectedComplaint.resolutionDetails && (

                <div className="rounded-2xl border border-green-400/20 bg-green-500/5 p-5">

                  <p className="text-xs font-semibold uppercase tracking-wider text-green-400">
                    Resolution
                  </p>

                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-300">
                    {
                      selectedComplaint.resolutionDetails
                    }
                  </p>

                </div>

              )}

            </div>

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

function DashboardCard({
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
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">

      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-sm font-medium text-slate-200">
        {value}
      </p>

    </div>
  );
}