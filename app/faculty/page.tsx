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
  const [selectedComplaint, setSelectedComplaint] =
    useState<Complaint | null>(null);

  const [showForm, setShowForm] = useState(false);

  const [facultyName, setFacultyName] = useState("Faculty");
  const [facultyId, setFacultyId] = useState("Faculty");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState("Medium");

  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("facultyName");
    const savedId = localStorage.getItem("facultyId");

    if (savedName) {
      setFacultyName(savedName);
    }

    if (savedId) {
      setFacultyId(savedId);
    }

    loadComplaints();
  }, []);

  function loadComplaints() {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      setComplaints([]);
      return;
    }

    try {
      const parsed = JSON.parse(stored);

      if (Array.isArray(parsed)) {
        setComplaints(parsed);
      } else {
        setComplaints([]);
      }
    } catch {
      setComplaints([]);
    }
  }

  /*
   * IMPORTANT:
   *
   * Faculty members can ONLY see their own complaints.
   *
   * Student complaints are never shown here.
   *
   * If no faculty ID has been established, we show
   * nothing rather than accidentally exposing all
   * faculty complaints.
   */
  const myComplaints = useMemo(() => {
    if (!facultyId || facultyId === "Faculty") {
      return [];
    }

    return complaints.filter(
      (complaint) =>
        complaint.complainantType === "faculty" &&
        complaint.complainantId === facultyId
    );
  }, [complaints, facultyId]);

  const pendingCount = myComplaints.filter(
    (complaint) => complaint.status === "Pending"
  ).length;

  const activeCount = myComplaints.filter(
    (complaint) =>
      complaint.status === "Under Review" ||
      complaint.status === "Assigned" ||
      complaint.status === "In Progress"
  ).length;

  const escalatedCount = myComplaints.filter(
    (complaint) => complaint.status === "Escalated"
  ).length;

  const resolvedCount = myComplaints.filter(
    (complaint) =>
      complaint.status === "Resolved" ||
      complaint.status === "Closed"
  ).length;

  function submitComplaint() {
    if (!title.trim()) {
      setSubmitMessage("Please enter a complaint title.");
      return;
    }

    if (!description.trim()) {
      setSubmitMessage("Please describe your complaint.");
      return;
    }

    if (!facultyId || facultyId === "Faculty") {
      setSubmitMessage(
        "Faculty identity could not be verified. Please log in again."
      );
      return;
    }

    const now = new Date().toISOString();

    const newComplaint: Complaint = {
      id: `CMP-${Date.now()}`,

      complainantType: "faculty",

      complainantName: facultyName || "Faculty",

      complainantId: facultyId,

      title: title.trim(),

      category,

      description: description.trim(),

      location: location.trim() || "Not provided",

      priority,

      status: "Pending",

      submittedAt: now,

      assignedDepartment: "",

      assignedAuthority: "",

      dueDate: "",

      escalationLevel: 0,

      escalatedTo: "",

      escalationReason: "",

      adminRemarks: "",

      resolutionDetails: "",

      updatedAt: now,
    };

    const stored = localStorage.getItem(STORAGE_KEY);

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

    const updated = [newComplaint, ...existing];

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );

    setComplaints(updated);

    setTitle("");
    setCategory(categories[0]);
    setDescription("");
    setLocation("");
    setPriority("Medium");

    setSubmitMessage(
      "Complaint submitted successfully."
    );

    setTimeout(() => {
      setSubmitMessage("");
      setShowForm(false);
    }, 1800);
  }

  function refreshComplaints() {
    loadComplaints();
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

              <p className="text-xs text-blue-400">
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
                {facultyId}
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

        <section className="rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-950/50 via-slate-900 to-slate-900 p-7">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Faculty Dashboard
          </p>

          <h2 className="mt-3 text-4xl font-black">
            Welcome, {facultyName}
          </h2>

          <p className="mt-3 max-w-3xl text-slate-400">
            Submit workplace complaints, raise concerns,
            and track administrative action taken by
            DSCE administration.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">

            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="rounded-xl bg-blue-600 px-6 py-3 font-bold transition hover:bg-blue-500"
            >
              + Submit New Complaint
            </button>

            <button
              type="button"
              onClick={refreshComplaints}
              className="rounded-xl border border-slate-700 px-6 py-3 font-semibold transition hover:bg-slate-800"
            >
              ↻ Refresh
            </button>

          </div>

        </section>

        {/* STATISTICS */}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

          <StatCard
            title="Total"
            value={myComplaints.length}
            icon="📋"
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
            title="Resolved"
            value={resolvedCount}
            icon="✅"
          />

        </section>

        {/* COMPLAINTS HEADER */}

        <div className="mt-8">

          <h3 className="text-2xl font-bold">
            My Complaints
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Only complaints submitted by your faculty
            account are shown here.
          </p>

        </div>

        {/* COMPLAINT LIST */}

        <section className="mt-5 space-y-4">

          {myComplaints.length === 0 ? (

            <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900 p-12 text-center">

              <div className="text-5xl">
                📭
              </div>

              <h3 className="mt-5 text-xl font-bold">
                No complaints yet
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Submit a complaint whenever you need
                administrative assistance.
              </p>

              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold transition hover:bg-blue-500"
              >
                Submit Your First Complaint
              </button>

            </div>

          ) : (

            myComplaints.map((complaint) => (

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

                    </div>

                    <h4 className="mt-3 text-xl font-bold">
                      {complaint.title}
                    </h4>

                    <p className="mt-2 text-sm text-slate-500">
                      {complaint.category} • Submitted{" "}
                      {formatDate(complaint.submittedAt)}
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
                            ? formatDate(complaint.dueDate)
                            : "Not set"
                        }
                      />

                    </div>

                  </div>

                  <div className="flex items-center">

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedComplaint(complaint)
                      }
                      className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold transition hover:bg-blue-500 lg:w-auto"
                    >
                      View Details
                    </button>

                  </div>

                </div>

              </article>

            ))

          )}

        </section>

      </div>

      {/* NEW COMPLAINT MODAL */}

      {showForm && (

        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">

          <div className="mx-auto my-8 max-w-2xl rounded-3xl border border-slate-700 bg-slate-950 shadow-2xl">

            <div className="flex items-start justify-between border-b border-slate-800 p-6">

              <div>

                <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                  New Faculty Complaint
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Submit a Complaint
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Your complaint will be sent to DSCE
                  administration for review and necessary
                  action.
                </p>

              </div>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setSubmitMessage("");
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-xl text-slate-400 hover:bg-slate-800"
              >
                ×
              </button>

            </div>

            <div className="space-y-5 p-6">

              {/* TITLE */}

              <div>

                <label
                  htmlFor="faculty-title"
                  className="mb-2 block text-sm font-semibold"
                >
                  Complaint Title
                </label>

                <input
                  id="faculty-title"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="Enter a short title"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-blue-400"
                />

              </div>

              {/* CATEGORY */}

              <div>

                <label
                  htmlFor="faculty-category"
                  className="mb-2 block text-sm font-semibold"
                >
                  Complaint Category
                </label>

                <select
                  id="faculty-category"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-blue-400"
                >

                  {categories.map((item) => (

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

                <label
                  htmlFor="faculty-priority"
                  className="mb-2 block text-sm font-semibold"
                >
                  Priority
                </label>

                <select
                  id="faculty-priority"
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-blue-400"
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

              {/* LOCATION */}

              <div>

                <label
                  htmlFor="faculty-location"
                  className="mb-2 block text-sm font-semibold"
                >
                  Location
                </label>

                <input
                  id="faculty-location"
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                  placeholder="Where did the issue occur?"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-blue-400"
                />

              </div>

              {/* DESCRIPTION */}

              <div>

                <label
                  htmlFor="faculty-description"
                  className="mb-2 block text-sm font-semibold"
                >
                  Description
                </label>

                <textarea
                  id="faculty-description"
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  rows={7}
                  placeholder="Explain the issue in detail..."
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm leading-6 outline-none focus:border-blue-400"
                />

              </div>

              {submitMessage && (

                <div className="rounded-xl border border-blue-400/20 bg-blue-500/10 p-4 text-sm font-medium text-blue-400">
                  {submitMessage}
                </div>

              )}

              <button
                type="button"
                onClick={submitComplaint}
                className="w-full rounded-xl bg-blue-600 px-5 py-3.5 font-bold transition hover:bg-blue-500"
              >
                Submit Complaint
              </button>

            </div>

          </div>

        </div>

      )}

      {/* DETAILS MODAL */}

      {selectedComplaint && (

        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">

          <div className="mx-auto my-8 max-w-4xl rounded-3xl border border-slate-700 bg-slate-950 shadow-2xl">

            {/* HEADER */}

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
                type="button"
                onClick={() =>
                  setSelectedComplaint(null)
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-xl text-slate-400 hover:bg-slate-800"
              >
                ×
              </button>

            </div>

            <div className="space-y-6 p-6">

              {/* ORIGINAL COMPLAINT */}

              <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                <h3 className="font-bold">
                  Your Complaint
                </h3>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">

                  <Info
                    label="Category"
                    value={selectedComplaint.category}
                  />

                  <Info
                    label="Priority"
                    value={selectedComplaint.priority}
                  />

                  <Info
                    label="Location"
                    value={selectedComplaint.location}
                  />

                  <Info
                    label="Submitted"
                    value={formatDateTime(
                      selectedComplaint.submittedAt
                    )}
                  />

                  <Info
                    label="Last Updated"
                    value={
                      selectedComplaint.updatedAt
                        ? formatDateTime(
                            selectedComplaint.updatedAt
                          )
                        : "Not updated"
                    }
                  />

                </div>

                <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-4">

                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Description
                  </p>

                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-300">
                    {selectedComplaint.description}
                  </p>

                </div>

              </section>

              {/* ADMINISTRATIVE UPDATE */}

              <section className="rounded-2xl border border-blue-400/20 bg-blue-500/5 p-5">

                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">

                  <div>

                    <h3 className="text-lg font-bold text-blue-400">
                      Administrative Update
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      This information can only be changed
                      by DSCE administration.
                    </p>

                  </div>

                  <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                    Read Only
                  </span>

                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                  <Info
                    label="Current Status"
                    value={selectedComplaint.status}
                  />

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
                      selectedComplaint.escalationLevel || 0
                    )}
                  />

                </div>

              </section>

              {/* ESCALATION */}

              {selectedComplaint.status === "Escalated" && (

                <section className="rounded-2xl border border-red-400/20 bg-red-500/5 p-5">

                  <h3 className="font-bold text-red-400">
                    🚨 Complaint Escalated
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Your complaint has been escalated by
                    the administration for further
                    intervention.
                  </p>

                  {selectedComplaint.escalatedTo && (

                    <div className="mt-4">

                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Escalated To
                      </p>

                      <p className="mt-1 font-semibold">
                        {selectedComplaint.escalatedTo}
                      </p>

                    </div>

                  )}

                  {selectedComplaint.escalationReason && (

                    <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-4">

                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Reason
                      </p>

                      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                        {selectedComplaint.escalationReason}
                      </p>

                    </div>

                  )}

                </section>

              )}

              {/* ADMIN REMARKS */}

              <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                <div className="flex items-center justify-between gap-3">

                  <h3 className="font-bold">
                    Administrative Remarks
                  </h3>

                  <span className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Admin Only
                  </span>

                </div>

                {selectedComplaint.adminRemarks ? (

                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-400">
                    {selectedComplaint.adminRemarks}
                  </p>

                ) : (

                  <p className="mt-3 text-sm text-slate-600">
                    No administrative remarks have been
                    added yet.
                  </p>

                )}

              </section>

              {/* RESOLUTION */}

              <section className="rounded-2xl border border-green-400/20 bg-green-500/5 p-5">

                <div className="flex items-center justify-between gap-3">

                  <h3 className="font-bold text-green-400">
                    Resolution
                  </h3>

                  <span className="rounded-full border border-green-400/20 bg-green-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-green-400">
                    Admin Controlled
                  </span>

                </div>

                {selectedComplaint.resolutionDetails ? (

                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-400">
                    {selectedComplaint.resolutionDetails}
                  </p>

                ) : (

                  <p className="mt-3 text-sm text-slate-600">
                    The complaint has not been resolved
                    yet.
                  </p>

                )}

              </section>

            </div>

            {/* FOOTER */}

            <div className="flex justify-between border-t border-slate-800 p-6">

              <p className="hidden items-center text-xs text-slate-600 sm:flex">
                Faculty accounts cannot modify administrative
                actions.
              </p>

              <button
                type="button"
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

      <p className="mt-2 whitespace-pre-wrap text-sm font-medium text-slate-200">
        {value}
      </p>

    </div>
  );
}