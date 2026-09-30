"use client";

export default function StudentDashboard() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* HEADER */}

      <header className="border-b border-white/10 bg-slate-950">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <a
            href="/"
            className="text-xl font-bold tracking-tight"
          >
            DSCE<span className="text-blue-400">CONNECT</span>
          </a>

          <div className="flex items-center gap-4">

            <a
              href="/login"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Logout
            </a>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-semibold">
              S
            </div>

          </div>

        </div>

      </header>

      {/* MAIN */}

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* WELCOME */}

        <section className="mb-10">

          <p className="text-sm font-medium text-blue-400">
            STUDENT PORTAL
          </p>

          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Welcome back, Student
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Report campus problems, track your complaints and stay
            updated on their progress.
          </p>

        </section>

        {/* QUICK ACTIONS */}

        <section className="mb-10">

          <h2 className="mb-5 text-xl font-semibold">
            Quick Actions
          </h2>

          <div className="grid gap-5 md:grid-cols-3">

            {/* REPORT PROBLEM */}

            <a
              href="/complaint"
              className="group rounded-2xl border border-blue-400/20 bg-blue-400/[0.05] p-6 transition hover:border-blue-400/50 hover:bg-blue-400/[0.08]"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 text-xl">
                +
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Report a Problem
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Submit a new complaint about infrastructure,
                academics, transport, hostel or other campus issues.
              </p>

              <p className="mt-5 text-sm font-medium text-blue-400">
                Submit Complaint →
              </p>

            </a>

            {/* MY COMPLAINTS */}

            <a
              href="/student/tickets"
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.06]"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20 text-xl">
                🎫
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                My Complaints
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                View your submitted complaints and track their
                current status and progress.
              </p>

              <p className="mt-5 text-sm font-medium text-purple-400">
                View Tickets →
              </p>

            </a>

            {/* NOTIFICATIONS */}

            <a
              href="#notifications"
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.06]"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/20 text-xl">
                🔔
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Notifications
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Check updates and responses related to your
                complaints.
              </p>

              <p className="mt-5 text-sm font-medium text-yellow-400">
                View Updates →
              </p>

            </a>

          </div>

        </section>

        {/* STATISTICS */}

        <section className="mb-10">

          <h2 className="mb-5 text-xl font-semibold">
            Complaint Overview
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <StatCard
              number="3"
              title="Total Complaints"
              description="All submitted complaints"
            />

            <StatCard
              number="1"
              title="In Progress"
              description="Currently being handled"
            />

            <StatCard
              number="1"
              title="Under Review"
              description="Awaiting action"
            />

            <StatCard
              number="1"
              title="Resolved"
              description="Successfully completed"
            />

          </div>

        </section>

        {/* RECENT COMPLAINTS */}

        <section className="mb-10">

          <div className="mb-5 flex items-end justify-between">

            <div>

              <h2 className="text-xl font-semibold">
                Recent Complaints
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your latest submitted complaints.
              </p>

            </div>

            <a
              href="/student/tickets"
              className="text-sm font-medium text-blue-400 hover:text-blue-300"
            >
              View All →
            </a>

          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10">

            {/* TICKET 1 */}

            <a
              href="/student/tickets"
              className="block border-b border-white/10 p-5 transition hover:bg-white/[0.04]"
            >

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="text-xs font-medium text-blue-400">
                    DSC-2026-00125
                  </p>

                  <h3 className="mt-2 font-semibold">
                    Projector not working in Room 204
                  </h3>

                  <p className="mt-2 text-xs text-slate-500">
                    Infrastructure • Block A, Room 204
                  </p>

                </div>

                <StatusBadge status="In Progress" />

              </div>

            </a>

            {/* TICKET 2 */}

            <a
              href="/student/tickets"
              className="block border-b border-white/10 p-5 transition hover:bg-white/[0.04]"
            >

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="text-xs font-medium text-blue-400">
                    DSC-2026-00118
                  </p>

                  <h3 className="mt-2 font-semibold">
                    Lost student ID card
                  </h3>

                  <p className="mt-2 text-xs text-slate-500">
                    Lost & Found • Main Library
                  </p>

                </div>

                <StatusBadge status="Under Review" />

              </div>

            </a>

            {/* TICKET 3 */}

            <a
              href="/student/tickets"
              className="block p-5 transition hover:bg-white/[0.04]"
            >

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="text-xs font-medium text-blue-400">
                    DSC-2026-00105
                  </p>

                  <h3 className="mt-2 font-semibold">
                    Classroom fan not working
                  </h3>

                  <p className="mt-2 text-xs text-slate-500">
                    Infrastructure • Block C, Room 101
                  </p>

                </div>

                <StatusBadge status="Resolved" />

              </div>

            </a>

          </div>

        </section>

        {/* INFORMATION */}

        <section
          id="notifications"
          className="rounded-2xl border border-blue-400/10 bg-blue-400/[0.04] p-6 sm:p-8"
        >

          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 text-xl">
              ℹ️
            </div>

            <div>

              <h2 className="text-lg font-semibold">
                How DSCE Connect works
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Submit your campus issue through the complaint form.
                Once submitted, you will receive a unique ticket ID.
                You can use the ticket tracking page to follow its
                progress from submission to resolution.
              </p>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}


/* STAT CARD */

function StatCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

      <p className="text-3xl font-bold">
        {number}
      </p>

      <p className="mt-2 text-sm font-medium">
        {title}
      </p>

      <p className="mt-1 text-xs text-slate-600">
        {description}
      </p>

    </div>
  );
}


/* STATUS BADGE */

function StatusBadge({
  status,
}: {
  status: "Submitted" | "Under Review" | "Assigned" | "In Progress" | "Resolved";
}) {
  const style =
    status === "Resolved"
      ? "bg-green-500/10 text-green-400"
      : status === "In Progress"
      ? "bg-yellow-500/10 text-yellow-400"
      : status === "Under Review"
      ? "bg-blue-500/10 text-blue-400"
      : status === "Assigned"
      ? "bg-purple-500/10 text-purple-400"
      : "bg-slate-500/10 text-slate-400";

  return (
    <span
      className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ${style}`}
    >
      {status}
    </span>
  );
}