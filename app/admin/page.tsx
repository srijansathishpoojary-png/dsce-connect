"use client";

import { useState } from "react";

type Status =
  | "New"
  | "Under Review"
  | "Assigned"
  | "In Progress"
  | "Resolved";

type Priority = "Low" | "Medium" | "High" | "Emergency";

type Ticket = {
  id: string;
  title: string;
  category: string;
  submittedBy: string;
  location: string;
  priority: Priority;
  status: Status;
  assignedTo: string;
  created: string;
};

const initialTickets: Ticket[] = [
  {
    id: "DSC-2026-00125",
    title: "Projector not working in Room 204",
    category: "Infrastructure",
    submittedBy: "Student",
    location: "Block A, Room 204",
    priority: "High",
    status: "New",
    assignedTo: "Unassigned",
    created: "Today, 10:42 AM",
  },
  {
    id: "DSC-2026-00124",
    title: "Water leakage near Block B",
    category: "Infrastructure",
    submittedBy: "Faculty",
    location: "Block B, Ground Floor",
    priority: "Emergency",
    status: "Under Review",
    assignedTo: "Maintenance",
    created: "Today, 9:15 AM",
  },
  {
    id: "DSC-2026-00123",
    title: "Lost student ID card",
    category: "Lost & Found",
    submittedBy: "Student",
    location: "Main Library",
    priority: "Medium",
    status: "Assigned",
    assignedTo: "Security Office",
    created: "Today, 8:30 AM",
  },
  {
    id: "DSC-2026-00122",
    title: "Classroom fan not working",
    category: "Infrastructure",
    submittedBy: "Student",
    location: "Block C, Room 101",
    priority: "Medium",
    status: "In Progress",
    assignedTo: "Maintenance",
    created: "Yesterday",
  },
  {
    id: "DSC-2026-00121",
    title: "Issue with examination timetable",
    category: "Academic",
    submittedBy: "Student",
    location: "Academic Section",
    priority: "High",
    status: "Resolved",
    assignedTo: "Academic Office",
    created: "Yesterday",
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
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus =
      statusFilter === "All" || ticket.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" || ticket.priority === priorityFilter;

    const searchText = search.toLowerCase();

    const matchesSearch =
      ticket.id.toLowerCase().includes(searchText) ||
      ticket.title.toLowerCase().includes(searchText) ||
      ticket.category.toLowerCase().includes(searchText);

    return matchesStatus && matchesPriority && matchesSearch;
  });

  function updateTicket(ticketId: string, updates: Partial<Ticket>) {
    setTickets((currentTickets) =>
      currentTickets.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, ...updates }
          : ticket
      )
    );

    setSelectedTicket((currentTicket) =>
      currentTicket && currentTicket.id === ticketId
        ? { ...currentTicket, ...updates }
        : currentTicket
    );
  }

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

            <button
              type="button"
              className="relative rounded-full border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
            >
              🔔

              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px]">
                5
              </span>
            </button>

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

        {/* PAGE TITLE */}

        <section className="mb-10">

          <p className="text-sm font-medium text-red-400">
            ADMINISTRATION
          </p>

          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Admin Dashboard
          </h1>

          <p className="mt-3 max-w-3xl text-slate-400">
            Review complaints, assign responsible authorities,
            monitor progress and manage campus issues.
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
              (t) => t.status === "New"
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

        {/* SEARCH AND FILTERS */}

        <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">

          <div className="grid gap-4 lg:grid-cols-4">

            <div className="lg:col-span-2">

              <label className="text-xs font-medium text-slate-500">
                Search complaints
              </label>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by ticket ID, title or category..."
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-blue-400"
              />

            </div>

            <div>

              <label className="text-xs font-medium text-slate-500">
                Status
              </label>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-blue-400"
              >
                <option>All</option>
                <option>New</option>
                <option>Under Review</option>
                <option>Assigned</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>

            </div>

            <div>

              <label className="text-xs font-medium text-slate-500">
                Priority
              </label>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-blue-400"
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
                Review and manage submitted complaints.
              </p>

            </div>

            <p className="text-sm text-slate-500">
              {filteredTickets.length} result
              {filteredTickets.length !== 1 ? "s" : ""}
            </p>

          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10">

            {filteredTickets.map((ticket) => (

              <button
                key={ticket.id}
                type="button"
                onClick={() => setSelectedTicket(ticket)}
                className="block w-full border-b border-white/10 p-5 text-left transition last:border-b-0 hover:bg-white/[0.04]"
              >

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                  <div className="min-w-0">

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

                      <span>{ticket.category}</span>

                      <span>•</span>

                      <span>{ticket.submittedBy}</span>

                      <span>•</span>

                      <span>{ticket.location}</span>

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

                    <StatusBadge status={ticket.status} />

                  </div>

                </div>

              </button>

            ))}

            {filteredTickets.length === 0 && (

              <div className="p-10 text-center">

                <p className="text-lg font-medium">
                  No complaints found
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Try changing your filters or search term.
                </p>

              </div>

            )}

          </div>

        </section>

      </div>

      {/* TICKET DETAIL MODAL */}

      {selectedTicket && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 py-10">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-2xl">

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
                onClick={() => setSelectedTicket(null)}
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
                label="Submitted By"
                value={selectedTicket.submittedBy}
              />

              <Detail
                label="Location"
                value={selectedTicket.location}
              />

              <Detail
                label="Created"
                value={selectedTicket.created}
              />

            </div>

            {/* STATUS */}

            <div className="mt-8">

              <label className="text-sm font-medium">
                Update Status
              </label>

              <select
                value={selectedTicket.status}
                onChange={(e) =>
                  updateTicket(selectedTicket.id, {
                    status: e.target.value as Status,
                  })
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-blue-400"
              >

                <option>New</option>
                <option>Under Review</option>
                <option>Assigned</option>
                <option>In Progress</option>
                <option>Resolved</option>

              </select>

            </div>

            {/* ASSIGNMENT */}

            <div className="mt-6">

              <label className="text-sm font-medium">
                Assign To
              </label>

              <select
                value={selectedTicket.assignedTo}
                onChange={(e) =>
                  updateTicket(selectedTicket.id, {
                    assignedTo: e.target.value,
                    status:
                      selectedTicket.status === "New"
                        ? "Assigned"
                        : selectedTicket.status,
                  })
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-blue-400"
              >

                <option>Unassigned</option>

                {authorities.map((authority) => (
                  <option key={authority}>
                    {authority}
                  </option>
                ))}

              </select>

            </div>

            {/* ADMIN NOTE */}

            <div className="mt-6">

              <label className="text-sm font-medium">
                Admin Note
              </label>

              <textarea
                rows={4}
                placeholder="Add an internal note or action taken..."
                className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-blue-400"
              />

            </div>

            {/* CLOSE */}

            <button
              type="button"
              onClick={() => setSelectedTicket(null)}
              className="mt-8 w-full rounded-xl bg-blue-500 px-5 py-3 font-semibold transition hover:bg-blue-400"
            >
              Save & Close
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
      : status === "New"
      ? "bg-red-500/10 text-red-400"
      : status === "Assigned"
      ? "bg-purple-500/10 text-purple-400"
      : "bg-blue-500/10 text-blue-400";

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