"use client";

import { useEffect, useState } from "react";

type Status =
  | "Submitted"
  | "Under Review"
  | "Assigned"
  | "In Progress"
  | "Resolved";

type Priority = "Low" | "Medium" | "High" | "Emergency";

type Ticket = {
  id: string;
  title: string;
  category: string;
  location: string;
  priority: Priority;
  description: string;
  status: Status;
  assignedTo: string;
  submitted: string;
  updated: string;
  adminNote: string;
};

const sampleTickets: Ticket[] = [
  {
    id: "DSC-2026-00125",
    title: "Projector not working in Room 204",
    category: "Infrastructure",
    location: "Block A, Room 204",
    priority: "High",
    description:
      "The projector in Room 204 is not displaying anything during class.",
    status: "In Progress",
    assignedTo: "Maintenance",
    submitted: "Today, 10:42 AM",
    updated: "Today, 12:15 PM",
    adminNote:
      "Maintenance team has been assigned. Technician is checking the projector.",
  },
  {
    id: "DSC-2026-00124",
    title: "Water leakage near Block B",
    category: "Infrastructure",
    location: "Block B, Ground Floor",
    priority: "Emergency",
    description:
      "Water leakage has been reported near the ground floor.",
    status: "Under Review",
    assignedTo: "Unassigned",
    submitted: "Today, 9:15 AM",
    updated: "Today, 9:15 AM",
    adminNote: "Complaint is currently being reviewed.",
  },
];

const authorities = [
  "Maintenance",
  "Security Office",
  "Academic Office",
  "Faculty Coordinator",
  "Hostel Administration",
  "Transport Department",
  "Student Affairs",
];

export default function AdminDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [search, setSearch] = useState("");

  /* LOAD TICKETS */

  useEffect(() => {
    const saved = localStorage.getItem("dsce_complaints");

    if (saved) {
      try {
        const studentTickets = JSON.parse(saved) as Ticket[];

        setTickets([...studentTickets, ...sampleTickets]);
      } catch {
        setTickets(sampleTickets);
      }
    } else {
      setTickets(sampleTickets);
    }
  }, []);

  /* SAVE UPDATED TICKETS */

  function saveTickets(updatedTickets: Ticket[]) {
    setTickets(updatedTickets);

    const sampleIds = new Set(
      sampleTickets.map((ticket) => ticket.id)
    );

    const studentTickets = updatedTickets.filter(
      (ticket) => !sampleIds.has(ticket.id)
    );

    localStorage.setItem(
      "dsce_complaints",
      JSON.stringify(studentTickets)
    );
  }

  /* UPDATE TICKET */

  function updateTicket(
    ticketId: string,
    updates: Partial<Ticket>
  ) {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === ticketId
        ? {
            ...ticket,
            ...updates,
            updated: new Date().toLocaleString(),
          }
        : ticket
    );

    saveTickets(updatedTickets);

    const updatedTicket = updatedTickets.find(
      (ticket) => ticket.id === ticketId
    );

    if (updatedTicket) {
      setSelectedTicket(updatedTicket);
    }
  }

  /* FILTER */

  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus =
      statusFilter === "All" ||
      ticket.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" ||
      ticket.priority === priorityFilter;

    const searchText = search.toLowerCase();

    const matchesSearch =
      ticket.id.toLowerCase().includes(searchText) ||
      ticket.title.toLowerCase().includes(searchText) ||
      ticket.category.toLowerCase().includes(searchText);

    return (
      matchesStatus &&
      matchesPriority &&
      matchesSearch
    );
  });

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
              href="/login"
              className="text-sm text-slate-400 hover:text-white"
            >
              Logout
            </a>

            <div className="hidden text-right sm:block">

              <p className="text-sm font-medium">
                Administrator
              </p>

              <p className="text-xs text-slate-500">
                admin@dsce.edu.in
              </p>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 font-semibold">
              A
            </div>

          </div>

        </div>

      </header>

      {/* MAIN */}

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* TITLE */}

        <section className="mb-10">

          <p className="text-sm font-medium text-red-400">
            ADMINISTRATION
          </p>

          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Admin Dashboard
          </h1>

          <p className="mt-3 max-w-3xl text-slate-400">
            Review complaints, assign authorities and monitor
            campus issues.
          </p>

        </section>

        {/* STATISTICS */}

        <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

          <StatCard
            title="Total"
            value={tickets.length.toString()}
            description="All complaints"
          />

          <StatCard
            title="New"
            value={tickets.filter(
              (t) => t.status === "Submitted"
            ).length.toString()}
            description="Need review"
          />

          <StatCard
            title="In Progress"
            value={tickets.filter(
              (t) => t.status === "In Progress"
            ).length.toString()}
            description="Being handled"
          />

          <StatCard
            title="High Priority"
            value={tickets.filter(
              (t) =>
                t.priority === "High" ||
                t.priority === "Emergency"
            ).length.toString()}
            description="Require attention"
          />

          <StatCard
            title="Resolved"
            value={tickets.filter(
              (t) => t.status === "Resolved"
            ).length.toString()}
            description="Completed"
          />

        </section>

        {/* FILTERS */}

        <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">

          <div className="grid gap-4 lg:grid-cols-4">

            <div className="lg:col-span-2">

              <label className="text-xs text-slate-500">
                Search complaints
              </label>

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search by ticket ID, title or category..."
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-blue-400"
              />

            </div>

            <div>

              <label className="text-xs text-slate-500">
                Status
              </label>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none"
              >

                <option>All</option>
                <option>Submitted</option>
                <option>Under Review</option>
                <option>Assigned</option>
                <option>In Progress</option>
                <option>Resolved</option>

              </select>

            </div>

            <div>

              <label className="text-xs text-slate-500">
                Priority
              </label>

              <select
                value={priorityFilter}
                onChange={(e) =>
                  setPriorityFilter(e.target.value)
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none"
              >

                <option>All</option>
                <option>Emergency</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>

              </select>

            </div>

          </div>

        </section>

        {/* COMPLAINT QUEUE */}

        <section>

          <div className="mb-5 flex items-end justify-between">

            <div>

              <h2 className="text-xl font-semibold">
                Complaint Queue
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Complaints submitted by students and campus users.
              </p>

            </div>

            <p className="text-sm text-slate-500">
              {filteredTickets.length} result
              {filteredTickets.length !== 1
                ? "s"
                : ""}
            </p>

          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10">

            {filteredTickets.map((ticket) => (

              <button
                key={ticket.id}
                type="button"
                onClick={() =>
                  setSelectedTicket(ticket)
                }
                className="block w-full border-b border-white/10 p-5 text-left transition last:border-b-0 hover:bg-white/[0.04]"
              >

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                  <div>

                    <div className="flex flex-wrap items-center gap-2">

                      <span className="text-xs font-medium text-blue-400">
                        {ticket.id}
                      </span>

                      <PriorityBadge
                        priority={ticket.priority}
                      />

                    </div>

                    <h3 className="mt-2 font-semibold">
                      {ticket.title}
                    </h3>

                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">

                      <span>
                        {ticket.category}
                      </span>

                      <span>•</span>

                      <span>
                        {ticket.location}
                      </span>

                    </div>

                  </div>

                  <div className="flex items-center gap-4">

                    <div className="text-right">

                      <p className="text-xs text-slate-600">
                        Assigned to
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        {ticket.assignedTo}
                      </p>

                    </div>

                    <StatusBadge
                      status={ticket.status}
                    />

                  </div>

                </div>

              </button>

            ))}

            {filteredTickets.length === 0 && (

              <div className="p-12 text-center">

                <p className="text-lg font-medium">
                  No complaints found
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Try changing the search or filters.
                </p>

              </div>

            )}

          </div>

        </section>

      </div>

      {/* DETAIL MODAL */}

      {selectedTicket && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 py-8">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-medium text-blue-400">
                  {selectedTicket.id}
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {selectedTicket.title}
                </h2>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedTicket(null)
                }
                className="rounded-lg px-3 py-2 text-slate-400 hover:bg-white/5 hover:text-white"
              >
                ✕
              </button>

            </div>

            {/* DETAILS */}

            <div className="mt-8 grid gap-4 sm:grid-cols-2">

              <Detail
                label="Category"
                value={selectedTicket.category}
              />

              <Detail
                label="Location"
                value={selectedTicket.location}
              />

              <Detail
                label="Priority"
                value={selectedTicket.priority}
              />

              <Detail
                label="Submitted"
                value={selectedTicket.submitted}
              />

            </div>

            {/* DESCRIPTION */}

            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-5">

              <p className="text-xs font-medium text-slate-500">
                COMPLAINT DESCRIPTION
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {selectedTicket.description}
              </p>

            </div>

            {/* STATUS */}

            <div className="mt-6">

              <label className="text-sm font-medium">
                Complaint Status
              </label>

              <select
                value={selectedTicket.status}
                onChange={(e) =>
                  updateTicket(
                    selectedTicket.id,
                    {
                      status:
                        e.target.value as Status,
                    }
                  )
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-blue-400"
              >

                <option>Submitted</option>
                <option>Under Review</option>
                <option>Assigned</option>
                <option>In Progress</option>
                <option>Resolved</option>

              </select>

            </div>

            {/* ASSIGN */}

            <div className="mt-6">

              <label className="text-sm font-medium">
                Assign Authority
              </label>

              <select
                value={selectedTicket.assignedTo}
                onChange={(e) => {

                  const newAuthority =
                    e.target.value;

                  updateTicket(
                    selectedTicket.id,
                    {
                      assignedTo:
                        newAuthority,
                      status:
                        newAuthority !==
                          "Unassigned" &&
                        selectedTicket.status ===
                          "Submitted"
                          ? "Assigned"
                          : selectedTicket.status,
                    }
                  );

                }}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-blue-400"
              >

                <option>
                  Unassigned
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

            {/* ADMIN NOTE */}

            <div className="mt-6">

              <label className="text-sm font-medium">
                Admin Update
              </label>

              <textarea
                value={selectedTicket.adminNote}
                onChange={(e) =>
                  setSelectedTicket({
                    ...selectedTicket,
                    adminNote: e.target.value,
                  })
                }
                rows={4}
                placeholder="Write an update for the student..."
                className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-blue-400"
              />

            </div>

            {/* SAVE NOTE */}

            <button
              type="button"
              onClick={() =>
                updateTicket(
                  selectedTicket.id,
                  {
                    adminNote:
                      selectedTicket.adminNote,
                  }
                )
              }
              className="mt-4 w-full rounded-xl bg-blue-500 px-5 py-3 font-semibold transition hover:bg-blue-400"
            >
              Save Admin Update
            </button>

            <button
              type="button"
              onClick={() =>
                setSelectedTicket(null)
              }
              className="mt-3 w-full rounded-xl border border-white/10 px-5 py-3 text-sm font-medium transition hover:bg-white/[0.05]"
            >
              Close

            </button>

          </div>

        </div>

      )}

    </main>
  );
}


/* STAT CARD */

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


/* STATUS BADGE */

function StatusBadge({
  status,
}: {
  status: Status;
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
      className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ${style}`}
    >
      {status}
    </span>
  );
}


/* PRIORITY BADGE */

function PriorityBadge({
  priority,
}: {
  priority: Priority;
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


/* DETAIL BOX */

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">

      <p className="text-xs text-slate-600">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium">
        {value}
      </p>

    </div>
  );
}