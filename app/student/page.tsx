"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Complaint = {
  id: string;
  title: string;
  category: string;
  location: string;
  priority: string;
  description: string;
  studentName: string;
  usn: string;
  status: string;
  createdAt: string;
};

export default function StudentDashboard() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    loadComplaints();
  }, []);

  function loadComplaints() {
    const savedComplaints = localStorage.getItem("dsceComplaints");

    if (savedComplaints) {
      setComplaints(JSON.parse(savedComplaints));
    } else {
      setComplaints([]);
    }
  }

  function getStatusClass(status: string) {
    switch (status) {
      case "Resolved":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";

      case "In Progress":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";

      case "Rejected":
        return "bg-red-500/10 text-red-400 border-red-500/30";

      default:
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
    }
  }

  function getPriorityClass(priority: string) {
    switch (priority) {
      case "Urgent":
        return "text-red-400";

      case "High":
        return "text-orange-400";

      case "Low":
        return "text-slate-400";

      default:
        return "text-yellow-400";
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* ================= HEADER ================= */}

      <header className="border-b border-slate-800 bg-[#031426]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
              DSCE CONNECT
            </p>

            <h1 className="mt-1 text-2xl font-bold">
              Student Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">

            <Link
              href="/complaint"
              className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-5 py-3 text-sm font-bold transition hover:scale-105"
            >
              + New Complaint
            </Link>

            <Link
              href="/"
              className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold transition hover:bg-slate-800"
            >
              Home
            </Link>

          </div>

        </div>
      </header>


      {/* ================= CONTENT ================= */}

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Welcome */}

        <section className="mb-8 rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-900/30 to-cyan-900/20 p-8">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Welcome
          </p>

          <h2 className="mt-2 text-3xl font-black">
            Student Portal 👋
          </h2>

          <p className="mt-3 max-w-2xl text-slate-400">
            Manage your campus complaints, track ticket
            status and stay connected with DSCE administration.
          </p>

        </section>


        {/* ================= STATISTICS ================= */}

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="Total Complaints"
            value={complaints.length}
            icon="📋"
          />

          <StatCard
            title="Pending"
            value={
              complaints.filter(
                (complaint) => complaint.status === "Pending"
              ).length
            }
            icon="⏳"
          />

          <StatCard
            title="In Progress"
            value={
              complaints.filter(
                (complaint) => complaint.status === "In Progress"
              ).length
            }
            icon="🔄"
          />

          <StatCard
            title="Resolved"
            value={
              complaints.filter(
                (complaint) => complaint.status === "Resolved"
              ).length
            }
            icon="✅"
          />

        </section>


        {/* ================= QUICK ACTIONS ================= */}

        <section className="mt-10">

          <h2 className="text-xl font-bold">
            Quick Actions
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-3">

            <Link
              href="/complaint"
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-blue-500/50"
            >
              <div className="text-3xl">
                📝
              </div>

              <h3 className="mt-4 text-lg font-bold">
                Submit Complaint
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Report a new campus issue or problem.
              </p>

              <p className="mt-4 text-sm font-semibold text-blue-400">
                Submit now →
              </p>
            </Link>


            <a
              href="#complaints"
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-cyan-500/50"
            >
              <div className="text-3xl">
                🎫
              </div>

              <h3 className="mt-4 text-lg font-bold">
                Track Complaints
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Check the status of your submitted complaints.
              </p>

              <p className="mt-4 text-sm font-semibold text-cyan-400">
                View tickets →
              </p>
            </a>


            <Link
              href="/"
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-blue-500/50"
            >
              <div className="text-3xl">
                🏠
              </div>

              <h3 className="mt-4 text-lg font-bold">
                Campus Home
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Return to the DSCE Connect homepage.
              </p>

              <p className="mt-4 text-sm font-semibold text-blue-400">
                Go home →
              </p>
            </Link>

          </div>

        </section>


        {/* ================= MY COMPLAINTS ================= */}

        <section
          id="complaints"
          className="mt-12"
        >

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                Ticket Management
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                My Complaints
              </h2>
            </div>

            <button
              onClick={loadComplaints}
              className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold transition hover:bg-slate-800"
            >
              ↻ Refresh
            </button>

          </div>


          {/* No complaints */}

          {complaints.length === 0 ? (

            <div className="mt-6 rounded-3xl border border-dashed border-slate-700 bg-slate-900/50 p-12 text-center">

              <div className="text-5xl">
                📭
              </div>

              <h3 className="mt-5 text-xl font-bold">
                No complaints yet
              </h3>

              <p className="mx-auto mt-3 max-w-md text-slate-400">
                You haven't submitted any complaints.
                If you find a campus issue, you can report it
                using the button below.
              </p>

              <Link
                href="/complaint"
                className="mt-6 inline-block rounded-xl bg-blue-500 px-6 py-3 font-semibold transition hover:bg-blue-600"
              >
                Submit Your First Complaint
              </Link>

            </div>

          ) : (

            <div className="mt-6 space-y-5">

              {complaints
                .slice()
                .reverse()
                .map((complaint) => (

                  <div
                    key={complaint.id}
                    className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500/30"
                  >

                    {/* Ticket Header */}

                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">

                      <div>

                        <div className="flex flex-wrap items-center gap-3">

                          <span className="rounded-lg bg-blue-500/10 px-3 py-1 text-sm font-bold text-blue-400">
                            {complaint.id}
                          </span>

                          <span
                            className={`rounded-lg border px-3 py-1 text-xs font-semibold ${getStatusClass(
                              complaint.status
                            )}`}
                          >
                            {complaint.status}
                          </span>

                        </div>

                        <h3 className="mt-4 text-xl font-bold">
                          {complaint.title}
                        </h3>

                      </div>

                      <div className="text-left md:text-right">

                        <p className="text-xs text-slate-500">
                          Submitted
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                          {complaint.createdAt}
                        </p>

                      </div>

                    </div>


                    {/* Details */}

                    <div className="mt-6 grid gap-4 border-t border-slate-800 pt-6 sm:grid-cols-2 lg:grid-cols-4">

                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          Category
                        </p>

                        <p className="mt-1 font-semibold">
                          {complaint.category}
                        </p>
                      </div>


                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          Location
                        </p>

                        <p className="mt-1 font-semibold">
                          {complaint.location}
                        </p>
                      </div>


                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          Priority
                        </p>

                        <p
                          className={`mt-1 font-semibold ${getPriorityClass(
                            complaint.priority
                          )}`}
                        >
                          {complaint.priority}
                        </p>
                      </div>


                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          Student
                        </p>

                        <p className="mt-1 font-semibold">
                          {complaint.studentName}
                        </p>

                      </div>

                    </div>


                    {/* Description */}

                    <div className="mt-6 rounded-2xl bg-slate-950 p-5">

                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        Description
                      </p>

                      <p className="mt-2 leading-7 text-slate-300">
                        {complaint.description}
                      </p>

                    </div>

                  </div>

                ))}

            </div>

          )}

        </section>

      </div>


      {/* ================= FOOTER ================= */}

      <footer className="mt-10 border-t border-slate-800 bg-[#031426] px-6 py-8">

        <div className="mx-auto max-w-7xl text-center text-sm text-slate-500">

          © 2026 DSCE Connect • Student Portal

        </div>

      </footer>

    </main>
  );
}


/* ================= STAT CARD ================= */

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
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="flex items-center justify-between">

        <p className="text-sm text-slate-400">
          {title}
        </p>

        <span className="text-2xl">
          {icon}
        </span>

      </div>

      <p className="mt-4 text-4xl font-black">
        {value}
      </p>

    </div>
  );
}