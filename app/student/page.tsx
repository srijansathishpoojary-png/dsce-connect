"use client";

import { useState } from "react";

const categories = [
  {
    title: "Lost & Found",
    description: "Report a lost item or submit something you found.",
    icon: "🔎",
  },
  {
    title: "Safety / Fight",
    description: "Report fights, threats, unsafe situations or emergencies.",
    icon: "🛡️",
  },
  {
    title: "Faculty Complaint",
    description: "Raise a concern regarding a faculty or staff member.",
    icon: "👨‍🏫",
  },
  {
    title: "Infrastructure",
    description: "Report issues with classrooms, labs, washrooms or facilities.",
    icon: "🏢",
  },
  {
    title: "Academic",
    description: "Report academic or examination-related problems.",
    icon: "📚",
  },
  {
    title: "Hostel",
    description: "Report hostel-related issues and concerns.",
    icon: "🏠",
  },
  {
    title: "Transport",
    description: "Report problems related to college transportation.",
    icon: "🚌",
  },
  {
    title: "Other",
    description: "Report any other college-related problem.",
    icon: "💬",
  },
];

const recentTickets = [
  {
    id: "DSC-2026-00021",
    title: "Classroom projector not working",
    category: "Infrastructure",
    status: "In Progress",
  },
  {
    id: "DSC-2026-00018",
    title: "Lost ID card",
    category: "Lost & Found",
    status: "Resolved",
  },
  {
    id: "DSC-2026-00014",
    title: "Water leakage in block",
    category: "Infrastructure",
    status: "Submitted",
  },
];

export default function StudentDashboard() {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="border-b border-white/10 bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <a href="/" className="text-xl font-bold tracking-tight">
            DSCE<span className="text-blue-400">CONNECT</span>
          </a>

          <div className="flex items-center gap-4">

            <button
              type="button"
              className="relative rounded-full border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
            >
              🔔
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px]">
                2
              </span>
            </button>

            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">Student</p>
              <p className="text-xs text-slate-500">
                student@dsce.edu.in
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-semibold">
              S
            </div>

          </div>

        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Welcome */}
        <section className="mb-10">

          <p className="text-sm font-medium text-blue-400">
            STUDENT PORTAL
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome back, Student 👋
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Report problems, track complaints and help make DSCE a better
            campus for everyone.
          </p>

        </section>

        {/* Quick Stats */}
        <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="Total Reports"
            value="12"
            description="Reports submitted"
          />

          <StatCard
            title="In Progress"
            value="3"
            description="Currently being handled"
          />

          <StatCard
            title="Resolved"
            value="8"
            description="Successfully resolved"
          />

          <StatCard
            title="Pending"
            value="1"
            description="Awaiting action"
          />

        </section>

        {/* Report Problem */}
        <section className="mb-10">

          <div className="mb-5">
            <h2 className="text-xl font-semibold">
              Report a Problem
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Choose the category that best describes your issue.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCategories(!showCategories)}
            className="mb-6 rounded-xl bg-blue-500 px-5 py-3 font-semibold transition hover:bg-blue-400"
          >
            + Report a New Problem
          </button>

          {showCategories && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {categories.map((category) => (
                <CategoryCard
                  key={category.title}
                  icon={category.icon}
                  title={category.title}
                  description={category.description}
                />
              ))}

            </div>
          )}

        </section>

        {/* Recent Tickets */}
        <section>

          <div className="mb-5 flex items-end justify-between">

            <div>
              <h2 className="text-xl font-semibold">
                My Recent Tickets
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Track the status of your submitted complaints.
              </p>
            </div>

            <button
              type="button"
              className="text-sm font-medium text-blue-400 hover:text-blue-300"
            >
              View All
            </button>

          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10">

            {recentTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="flex flex-col gap-4 border-b border-white/10 p-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
              >

                <div>

                  <p className="text-sm font-semibold">
                    {ticket.title}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                    <span>{ticket.id}</span>
                    <span>•</span>
                    <span>{ticket.category}</span>
                  </div>

                </div>

                <StatusBadge status={ticket.status} />

              </div>
            ))}

          </div>

        </section>

      </div>

    </main>
  );
}

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

function CategoryCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:-translate-y-1 hover:border-blue-400/40 hover:bg-blue-400/[0.05]"
    >

      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-2xl">
        {icon}
      </div>

      <h3 className="font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>

      <p className="mt-4 text-sm font-medium text-blue-400 opacity-0 transition group-hover:opacity-100">
        Report →
      </p>

    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
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