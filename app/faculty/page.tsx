"use client";

import { useState } from "react";

const facultyTickets = [
  {
    id: "DSC-2026-00112",
    title: "Laboratory computer systems not functioning",
    category: "Infrastructure",
    status: "In Progress",
    priority: "High",
  },
  {
    id: "DSC-2026-00108",
    title: "Issue with classroom allocation",
    category: "Academic",
    status: "Under Review",
    priority: "Medium",
  },
  {
    id: "DSC-2026-00097",
    title: "Water leakage near faculty room",
    category: "Infrastructure",
    status: "Resolved",
    priority: "Low",
  },
];

const assignedIssues = [
  {
    id: "DSC-2026-00115",
    title: "Projector replacement request",
    submittedBy: "Student",
    priority: "High",
  },
  {
    id: "DSC-2026-00110",
    title: "Classroom fan malfunction",
    submittedBy: "Student",
    priority: "Medium",
  },
];

export default function FacultyDashboard() {
  const [showReportOptions, setShowReportOptions] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="border-b border-white/10 bg-slate-950/95">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <a
            href="/"
            className="text-xl font-bold tracking-tight"
          >
            DSCE<span className="text-blue-400">CONNECT</span>
          </a>

          <div className="flex items-center gap-4">

            {/* Notifications */}
            <button
              type="button"
              className="relative rounded-full border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
            >
              🔔

              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px]">
                3
              </span>
            </button>

            {/* User */}
            <div className="hidden text-right sm:block">

              <p className="text-sm font-medium">
                Faculty
              </p>

              <p className="text-xs text-slate-500">
                faculty@dsce.edu.in
              </p>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 font-semibold">
              F
            </div>

          </div>

        </div>

      </header>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Welcome */}
        <section className="mb-10">

          <p className="text-sm font-medium text-purple-400">
            FACULTY PORTAL
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome back, Faculty 👋
          </h1>

          <p className="mt-3 max-w-3xl text-slate-400">
            Report college-related problems, monitor submitted complaints,
            and respond to issues that require your attention.
          </p>

        </section>

        {/* Statistics */}
        <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="My Reports"
            value="7"
            description="Problems reported by you"
          />

          <StatCard
            title="Open Reports"
            value="2"
            description="Awaiting resolution"
          />

          <StatCard
            title="Assigned to Me"
            value="4"
            description="Issues requiring attention"
          />

          <StatCard
            title="Resolved"
            value="5"
            description="Successfully resolved"
          />

        </section>

        {/* Actions */}
        <section className="mb-10">

          <div className="mb-5">

            <h2 className="text-xl font-semibold">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage your reports and faculty responsibilities.
            </p>

          </div>

          <div className="grid gap-4 md:grid-cols-3">

            {/* Report */}
            <button
              type="button"
              onClick={() => setShowReportOptions(!showReportOptions)}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left transition hover:-translate-y-1 hover:border-purple-400/40 hover:bg-purple-400/[0.05]"
            >

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-400/10 text-2xl">
                📝
              </div>

              <h3 className="font-semibold">
                Report a Problem
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Submit a complaint or report an issue faced on campus.
              </p>

            </button>

            {/* Assigned */}
            <button
              type="button"
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left transition hover:-translate-y-1 hover:border-blue-400/40 hover:bg-blue-400/[0.05]"
            >

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-400/10 text-2xl">
                📋
              </div>

              <h3 className="font-semibold">
                Assigned Issues
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                View complaints and tasks that require your attention.
              </p>

            </button>

            {/* Reports */}
            <button
              type="button"
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left transition hover:-translate-y-1 hover:border-green-400/40 hover:bg-green-400/[0.05]"
            >

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-400/10 text-2xl">
                📊
              </div>

              <h3 className="font-semibold">
                My Reports
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Track complaints and issues submitted by you.
              </p>

            </button>

          </div>

          {showReportOptions && (
            <div className="mt-5 rounded-2xl border border-purple-400/20 bg-purple-400/[0.04] p-5">

              <p className="mb-4 text-sm font-medium">
                Start a new complaint
              </p>

              <a
                href="/complaint"
                className="inline-block rounded-xl bg-purple-500 px-5 py-3 text-sm font-semibold transition hover:bg-purple-400"
              >
                Continue to Complaint Form →
              </a>

            </div>
          )}

        </section>

        {/* Assigned Issues */}
        <section className="mb-10">

          <div className="mb-5">

            <h2 className="text-xl font-semibold">
              Issues Assigned to Me
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Complaints requiring your attention or response.
            </p>

          </div>

          <div className="grid gap-4 lg:grid-cols-2">

            {assignedIssues.map((issue) => (

              <div
                key={issue.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <p className="text-xs text-slate-500">
                      {issue.id}
                    </p>

                    <h3 className="mt-2 font-semibold">
                      {issue.title}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      Submitted by: {issue.submittedBy}
                    </p>

                  </div>

                  <PriorityBadge priority={issue.priority} />

                </div>

                <button
                  type="button"
                  className="mt-5 w-full rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium transition hover:bg-white/5"
                >
                  View Issue
                </button>

              </div>

            ))}

          </div>

        </section>

        {/* My Recent Reports */}
        <section>

          <div className="mb-5 flex items-end justify-between">

            <div>

              <h2 className="text-xl font-semibold">
                My Recent Reports
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Complaints submitted by you.
              </p>

            </div>

            <button
              type="button"
              className="text-sm font-medium text-purple-400 hover:text-purple-300"
            >
              View All
            </button>

          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10">

            {facultyTickets.map((ticket) => (

              <div
                key={ticket.id}
                className="flex flex-col gap-4 border-b border-white/10 p-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
              >

                <div>

                  <p className="text-sm font-semibold">
                    {ticket.title}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">

                    <span>
                      {ticket.id}
                    </span>

                    <span>•</span>

                    <span>
                      {ticket.category}
                    </span>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <PriorityBadge priority={ticket.priority} />

                  <StatusBadge status={ticket.status} />

                </div>

              </div>

            ))}

          </div>

        </section>

      </div>

    </main>
  );
}

/* Statistics Card */

function StatCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-600">
        {description}
      </p>

    </div>
  );
}

/* Status Badge */

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const statusStyle =
    status === "Resolved"
      ? "bg-green-500/10 text-green-400"
      : status === "In Progress"
      ? "bg-yellow-500/10 text-yellow-400"
      : "bg-blue-500/10 text-blue-400";

  return (
    <span
      className={`w-fit rounded-full px-3 py-1.5 text-xs font-medium ${statusStyle}`}
    >
      {status}
    </span>
  );
}

/* Priority Badge */

function PriorityBadge({
  priority,
}: {
  priority: string;
}) {
  const priorityStyle =
    priority === "High"
      ? "bg-red-500/10 text-red-400"
      : priority === "Medium"
      ? "bg-yellow-500/10 text-yellow-400"
      : "bg-green-500/10 text-green-400";

  return (
    <span
      className={`w-fit rounded-full px-3 py-1.5 text-xs font-medium ${priorityStyle}`}
    >
      {priority}
    </span>
  );
}