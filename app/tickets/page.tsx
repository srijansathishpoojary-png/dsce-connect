"use client";

import { useState } from "react";

type TicketStatus =
  | "Submitted"
  | "Under Review"
  | "Assigned"
  | "In Progress"
  | "Resolved";

type Ticket = {
  id: string;
  title: string;
  category: string;
  location: string;
  priority: "Low" | "Medium" | "High" | "Emergency";
  status: TicketStatus;
  assignedTo: string;
  submitted: string;
  updated: string;
  description: string;
  adminNote: string;
};

const tickets: Ticket[] = [
  {
    id: "DSC-2026-00125",
    title: "Projector not working in Room 204",
    category: "Infrastructure",
    location: "Block A, Room 204",
    priority: "High",
    status: "In Progress",
    assignedTo: "Maintenance",
    submitted: "Today, 10:42 AM",
    updated: "Today, 12:15 PM",
    description:
      "The projector in Room 204 is not displaying anything during class.",
    adminNote:
      "Maintenance team has been assigned. Technician is checking the projector.",
  },
  {
    id: "DSC-2026-00118",
    title: "Lost student ID card",
    category: "Lost & Found",
    location: "Main Library",
    priority: "Medium",
    status: "Under Review",
    assignedTo: "Security Office",
    submitted: "Yesterday, 2:30 PM",
    updated: "Yesterday, 4:10 PM",
    description:
      "Student ID card was misplaced near the main library.",
    adminNote:
      "Security office is checking the lost and found register.",
  },
  {
    id: "DSC-2026-00105",
    title: "Classroom fan not working",
    category: "Infrastructure",
    location: "Block C, Room 101",
    priority: "Low",
    status: "Resolved",
    assignedTo: "Maintenance",
    submitted: "2 days ago",
    updated: "Yesterday",
    description:
      "One of the ceiling fans in the classroom was not working.",
    adminNote:
      "Fan has been repaired and the complaint has been marked resolved.",
  },
];

const statusSteps: TicketStatus[] = [
  "Submitted",
  "Under Review",
  "Assigned",
  "In Progress",
  "Resolved",
];

export default function StudentTicketsPage() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(
    tickets[0]
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* HEADER */}

      <header className="border-b border-white/10">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <a
            href="/"
            className="text-xl font-bold tracking-tight"
          >
            DSCE<span className="text-blue-400">CONNECT</span>
          </a>

          <div className="flex items-center gap-4">

            <a
              href="/student"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              ← Dashboard
            </a>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-semibold">
              S
            </div>

          </div>

        </div>

      </header>

      {/* MAIN */}

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* TITLE */}

        <section className="mb-10">

          <p className="text-sm font-medium text-blue-400">
            STUDENT PORTAL
          </p>

          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            My Complaints
          </h1>

          <p className="mt-3 text-slate-400">
            Track your submitted complaints and view the latest updates.
          </p>

        </section>

        {/* CONTENT */}

        <div className="grid gap-6 lg:grid-cols-[350px_1fr]">

          {/* TICKET LIST */}

          <section>

            <div className="mb-4 flex items-center justify-between">

              <h2 className="text-lg font-semibold">
                Your Tickets
              </h2>

              <span className="text-xs text-slate-500">
                {tickets.length} tickets
              </span>

            </div>

            <div className="space-y-3">

              {tickets.map((ticket) => (

                <button
                  key={ticket.id}
                  type="button"
                  onClick={() => setSelectedTicket(ticket)}
                  className={`w-full rounded-2xl border p-5 text-left transition ${
                    selectedTicket?.id === ticket.id
                      ? "border-blue-400/50 bg-blue-400/[0.06]"
                      : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
                  }`}
                >

                  <div className="flex items-start justify-between gap-3">

                    <div className="min-w-0">

                      <p className="text-xs text-blue-400">
                        {ticket.id}
                      </p>

                      <h3 className="mt-2 font-semibold">
                        {ticket.title}
                      </h3>

                    </div>

                    <PriorityBadge
                      priority={ticket.priority}
                    />

                  </div>

                  <div className="mt-4 flex items-center justify-between">

                    <span className="text-xs text-slate-500">
                      {ticket.category}
                    </span>

                    <StatusBadge
                      status={ticket.status}
                    />

                  </div>

                </button>

              ))}

            </div>

            <a
              href="/complaint"
              className="mt-5 block rounded-xl bg-blue-500 px-5 py-3 text-center text-sm font-semibold transition hover:bg-blue-400"
            >
              + Report a New Problem
            </a>

          </section>

          {/* TICKET DETAILS */}

          {selectedTicket && (

            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">

              {/* Ticket heading */}

              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                <div>

                  <p className="text-sm font-medium text-blue-400">
                    {selectedTicket.id}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    {selectedTicket.title}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Last updated: {selectedTicket.updated}
                  </p>

                </div>

                <PriorityBadge
                  priority={selectedTicket.priority}
                />

              </div>

              {/* STATUS TIMELINE */}

              <div className="mt-10">

                <h3 className="text-sm font-semibold">
                  Complaint Progress
                </h3>

                <div className="mt-6">

                  {statusSteps.map((step, index) => {

                    const currentIndex =
                      statusSteps.indexOf(selectedTicket.status);

                    const completed = index <= currentIndex;

                    const isCurrent =
                      step === selectedTicket.status;

                    return (
                      <div
                        key={step}
                        className="flex"
                      >

                        {/* Timeline line */}

                        <div className="mr-4 flex flex-col items-center">

                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold ${
                              completed
                                ? "border-blue-400 bg-blue-500 text-white"
                                : "border-white/10 bg-slate-900 text-slate-600"
                            }`}
                          >
                            {completed ? "✓" : index + 1}
                          </div>

                          {index < statusSteps.length - 1 && (
                            <div
                              className={`h-10 w-px ${
                                index < currentIndex
                                  ? "bg-blue-400"
                                  : "bg-white/10"
                              }`}
                            />
                          )}

                        </div>

                        {/* Step text */}

                        <div className="pb-8">

                          <p
                            className={`text-sm font-medium ${
                              isCurrent
                                ? "text-blue-400"
                                : completed
                                ? "text-white"
                                : "text-slate-600"
                            }`}
                          >
                            {step}
                          </p>

                          {isCurrent && (
                            <p className="mt-1 text-xs text-slate-500">
                              Current status
                            </p>
                          )}

                        </div>

                      </div>
                    );
                  })}

                </div>

              </div>

              {/* INFORMATION */}

              <div className="mt-4 grid gap-4 sm:grid-cols-2">

                <InfoBox
                  label="Category"
                  value={selectedTicket.category}
                />

                <InfoBox
                  label="Location"
                  value={selectedTicket.location}
                />

                <InfoBox
                  label="Assigned To"
                  value={selectedTicket.assignedTo}
                />

                <InfoBox
                  label="Submitted"
                  value={selectedTicket.submitted}
                />

              </div>

              {/* DESCRIPTION */}

              <div className="mt-6 rounded-xl border border-white/10 bg-slate-900/50 p-5">

                <p className="text-xs font-medium text-slate-500">
                  YOUR COMPLAINT
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {selectedTicket.description}
                </p>

              </div>

              {/* ADMIN UPDATE */}

              <div className="mt-4 rounded-xl border border-blue-400/10 bg-blue-400/[0.04] p-5">

                <p className="text-xs font-medium text-blue-400">
                  LATEST ADMIN UPDATE
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {selectedTicket.adminNote}
                </p>

              </div>

            </section>

          )}

        </div>

      </div>

    </main>
  );
}


/* STATUS BADGE */

function StatusBadge({
  status,
}: {
  status: TicketStatus;
}) {
  const style =
    status === "Resolved"
      ? "bg-green-500/10 text-green-400"
      : status === "In Progress"
      ? "bg-yellow-500/10 text-yellow-400"
      : status === "Assigned"
      ? "bg-purple-500/10 text-purple-400"
      : status === "Under Review"
      ? "bg-blue-500/10 text-blue-400"
      : "bg-slate-500/10 text-slate-400";

  return (
    <span
      className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium ${style}`}
    >
      {status}
    </span>
  );
}


/* PRIORITY BADGE */

function PriorityBadge({
  priority,
}: {
  priority: Ticket["priority"];
}) {
  const style =
    priority === "Emergency"
      ? "bg-red-500/10 text-red-400"
      : priority === "High"
      ? "bg-orange-500/10 text-orange-400"
      : priority === "Medium"
      ? "bg-yellow-500/10 text-yellow-400"
      : "bg-green-500/10 text-green-400";

  return (
    <span
      className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium ${style}`}
    >
      {priority}
    </span>
  );
}


/* INFO BOX */

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">

      <p className="text-xs text-slate-600">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-200">
        {value}
      </p>

    </div>
  );
}