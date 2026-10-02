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
  resolvedAt?: string;
};

const STORAGE_KEY = "dsceComplaints";

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

export default function StudentDashboard() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  const [studentName, setStudentName] =
    useState("Student");

  const [studentId, setStudentId] =
    useState("");

  const [selectedComplaint, setSelectedComplaint] =
    useState<Complaint | null>(null);

  /*
    Load student information.

    If your login page already stores the
    student's details in localStorage, this
    will automatically use them.
  */
  useEffect(() => {
    const savedName =
      localStorage.getItem("studentName");

    const savedId =
      localStorage.getItem("studentId");

    if (savedName) {
      setStudentName(savedName);
    }

    if (savedId) {
      setStudentId(savedId);
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

  /*
    IMPORTANT:
    Only complaints belonging to this student
    are displayed.
  */
  const myComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      if (complaint.complainantType !== "student") {
        return false;
      }

      /*
        If a student ID is available,
        use it to identify the student.
      */
      if (studentId) {
        return (
          complaint.complainantId === studentId
        );
      }

      /*
        If no ID is stored yet, show nothing
        rather than exposing another student's
        complaints.
      */
      return false;
    });
  }, [complaints, studentId]);

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
                Student Portal
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="hidden text-right sm:block">

              <p className="text-sm font-semibold">
                {studentName}
              </p>

              <p className="text-xs text-slate-500">
                {studentId || "Student"}
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

        <section className="rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-950/60 via-slate-900 to-slate-900 p-7">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Student Dashboard
          </p>

          <h2 className="mt-3 text-4xl font-black">
            Welcome, {studentName}
          </h2>

          <p className="mt-3 max-w-2xl text-slate-400">
            Submit complaints, monitor their progress and
            stay updated on actions taken by the
            administration.
          </p>

          <div className="mt-6">

            <a
              href="/complaint?type=student"
              className="inline-flex rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-bold transition hover:from-blue-500 hover:to-cyan-400"
            >
              + Submit New Complaint
            </a>

          </div>

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

        {/* COMPLAINTS */}

        <section className="mt-8">

          <div className="mb-5 flex items-center justify-between">

            <div>

              <h3 className="text-2xl font-bold">
                My Complaints
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Only complaints submitted by you are
                displayed here.
              </p>

            </div>

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
                If you have an issue, you can report it
                using the button below.
              </p>

              <a
                href="/complaint?type=student"
                className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500"
              >
                Submit a Complaint
              </a>

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
                    className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-blue-500/40"
                  >

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                      <div className="min-w-0">

                        <div className="flex flex-wrap items-center gap-3">

                          <span className="font-mono text-sm font-bold text-blue-400">
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

      {/* COMPLAINT DETAILS */}

      {selectedComplaint && (

        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">

          <div className="mx-auto my-8 max-w-3xl rounded-3xl border border-slate-700 bg-slate-950 shadow-2xl">

            <div className="flex items-start justify-between border-b border-slate-800 p-6">

              <div>

                <span className="font-mono text-sm font-bold text-blue-400">
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

              {/* BASIC DETAILS */}

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
                  value={formatDate(
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
                    Complaint Escalated
                  </h3>

                  <p className="mt-3 text-sm text-slate-400">
                    This complaint has been escalated
                    by the administration for further
                    action.
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