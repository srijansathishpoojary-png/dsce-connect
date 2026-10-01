"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

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

export default function ComplaintPage() {
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const id = `DSCE-${Date.now().toString().slice(-6)}`;

    const complaint: Complaint = {
      id,
      title: String(form.get("title") || ""),
      category: String(form.get("category") || ""),
      location: String(form.get("location") || ""),
      priority: String(form.get("priority") || "Medium"),
      description: String(form.get("description") || ""),
      studentName: String(form.get("studentName") || ""),
      usn: String(form.get("usn") || ""),
      status: "Pending",
      createdAt: new Date().toLocaleString(),
    };

    // Get existing complaints
    const existingComplaints: Complaint[] = JSON.parse(
      localStorage.getItem("dsceComplaints") || "[]"
    );

    // Add new complaint
    existingComplaints.push(complaint);

    // Save complaints
    localStorage.setItem(
      "dsceComplaints",
      JSON.stringify(existingComplaints)
    );

    setTicketId(id);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <Link
              href="/student"
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              ← Back to Student Dashboard
            </Link>
          </div>

          <div className="rounded-3xl border border-emerald-500/30 bg-slate-900 p-8 text-center shadow-2xl">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-3xl">
              ✓
            </div>

            <h1 className="text-3xl font-bold">
              Complaint Submitted Successfully
            </h1>

            <p className="mt-3 text-slate-400">
              Your complaint has been registered in DSCE Connect.
            </p>

            <div className="mt-8 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-6">
              <p className="text-sm text-slate-400">Your Ticket ID</p>

              <p className="mt-2 text-3xl font-bold tracking-wider text-blue-400">
                {ticketId}
              </p>
            </div>

            <p className="mt-6 text-sm text-slate-500">
              Status: Pending
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/student"
                className="rounded-xl bg-blue-500 px-6 py-3 font-semibold transition hover:bg-blue-600"
              >
                View My Complaints
              </Link>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setTicketId("");
                }}
                className="rounded-xl border border-slate-700 px-6 py-3 font-semibold transition hover:bg-slate-800"
              >
                Submit Another Complaint
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/student"
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            ← Back to Student Dashboard
          </Link>

          <div className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
              DSCE Connect
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Report a Campus Problem
            </h1>

            <p className="mt-3 max-w-2xl text-slate-400">
              Submit a complaint and the concerned faculty or administration
              team will review it.
            </p>
          </div>
        </div>

        {/* Complaint Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-8"
        >
          <div className="grid gap-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold text-slate-200"
              >
                Complaint Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                required
                placeholder="Example: Classroom projector not working"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-semibold text-slate-200"
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                required
                defaultValue=""
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
              >
                <option value="" disabled>
                  Select a category
                </option>

                <option value="Infrastructure">
                  Infrastructure
                </option>

                <option value="Classroom">
                  Classroom
                </option>

                <option value="Electrical">
                  Electrical
                </option>

                <option value="Internet">
                  Internet / Wi-Fi
                </option>

                <option value="Cleanliness">
                  Cleanliness
                </option>

                <option value="Hostel">
                  Hostel
                </option>

                <option value="Transport">
                  Transport
                </option>

                <option value="Academic">
                  Academic
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-semibold text-slate-200"
              >
                Location
              </label>

              <input
                id="location"
                name="location"
                type="text"
                required
                placeholder="Example: Block A, Room 204"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
              />
            </div>

            {/* Priority */}
            <div>
              <label
                htmlFor="priority"
                className="mb-2 block text-sm font-semibold text-slate-200"
              >
                Priority
              </label>

              <select
                id="priority"
                name="priority"
                defaultValue="Medium"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-slate-200"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                required
                rows={6}
                placeholder="Describe the problem in detail..."
                className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
              />
            </div>

            {/* Student Details */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="studentName"
                  className="mb-2 block text-sm font-semibold text-slate-200"
                >
                  Student Name
                </label>

                <input
                  id="studentName"
                  name="studentName"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="usn"
                  className="mb-2 block text-sm font-semibold text-slate-200"
                >
                  USN
                </label>

                <input
                  id="usn"
                  name="usn"
                  type="text"
                  required
                  placeholder="Example: 1DS23CS001"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-4 font-bold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.01] hover:from-blue-600 hover:to-cyan-500"
            >
              Submit Complaint 🚀
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}