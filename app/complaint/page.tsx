"use client";

import { FormEvent, useState } from "react";

type Complaint = {
  id: string;
  title: string;
  category: string;
  location: string;
  priority: "Low" | "Medium" | "High" | "Emergency";
  description: string;
  status: "Submitted";
  assignedTo: string;
  submitted: string;
  updated: string;
  adminNote: string;
};

export default function ComplaintPage() {
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const [form, setForm] = useState({
    category: "",
    title: "",
    description: "",
    location: "",
    priority: "Medium",
    confidential: false,
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value, type } = e.target;

    setForm((current) => ({
      ...current,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  }

  function generateTicketId() {
    const randomNumber = Math.floor(10000 + Math.random() * 90000);

    return `DSC-${new Date().getFullYear()}-${randomNumber}`;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newTicketId = generateTicketId();

    const now = new Date();

    const newComplaint: Complaint = {
      id: newTicketId,
      title: form.title,
      category: form.category,
      location: form.location,
      priority: form.priority as Complaint["priority"],
      description: form.description,
      status: "Submitted",
      assignedTo: "Unassigned",
      submitted: now.toLocaleString(),
      updated: now.toLocaleString(),
      adminNote: "Your complaint has been successfully submitted.",
    };

    /*
      Store the new complaint in browser storage.
      This is temporary. Later we will replace this
      with a real database.
    */

    const existingComplaints =
      JSON.parse(
        localStorage.getItem("dsce_complaints") || "[]"
      ) as Complaint[];

    localStorage.setItem(
      "dsce_complaints",
      JSON.stringify([
        newComplaint,
        ...existingComplaints,
      ])
    );

    setTicketId(newTicketId);
    setSubmitted(true);
  }

  if (submitted) {
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

            <a
              href="/student"
              className="text-sm text-slate-400 hover:text-white"
            >
              ← Student Dashboard
            </a>

          </div>

        </header>

        {/* SUCCESS */}

        <div className="mx-auto flex min-h-[80vh] max-w-2xl items-center justify-center px-6">

          <div className="w-full rounded-3xl border border-green-400/20 bg-green-400/[0.04] p-8 text-center sm:p-12">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-4xl">
              ✓
            </div>

            <p className="mt-6 text-sm font-medium text-green-400">
              COMPLAINT SUBMITTED
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Your complaint has been submitted
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-slate-400">
              Your complaint has been successfully recorded.
              Keep your ticket ID to track its progress.
            </p>

            {/* TICKET ID */}

            <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900 p-6">

              <p className="text-xs font-medium text-slate-500">
                YOUR TICKET ID
              </p>

              <p className="mt-3 text-2xl font-bold tracking-wider text-blue-400">
                {ticketId}
              </p>

            </div>

            {/* ACTIONS */}

            <div className="mt-8 grid gap-3 sm:grid-cols-2">

              <a
                href="/student/tickets"
                className="rounded-xl bg-blue-500 px-5 py-3 font-semibold transition hover:bg-blue-400"
              >
                Track My Complaint
              </a>

              <a
                href="/student"
                className="rounded-xl border border-white/10 px-5 py-3 font-semibold transition hover:bg-white/[0.05]"
              >
                Student Dashboard
              </a>

            </div>

          </div>

        </div>

      </main>
    );
  }

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

          <a
            href="/student"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            ← Student Dashboard
          </a>

        </div>

      </header>

      {/* MAIN */}

      <div className="mx-auto max-w-3xl px-6 py-10">

        {/* TITLE */}

        <section className="mb-10">

          <p className="text-sm font-medium text-blue-400">
            STUDENT PORTAL
          </p>

          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Report a Problem
          </h1>

          <p className="mt-3 text-slate-400">
            Tell us about the issue you are facing on campus.
            Your complaint will be reviewed by the appropriate
            authority.
          </p>

        </section>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
        >

          {/* CATEGORY */}

          <div className="mb-6">

            <label
              htmlFor="category"
              className="text-sm font-medium"
            >
              Complaint Category
            </label>

            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-blue-400"
            >

              <option value="">
                Select a category
              </option>

              <option value="Infrastructure">
                Infrastructure
              </option>

              <option value="Academic">
                Academic
              </option>

              <option value="Hostel">
                Hostel
              </option>

              <option value="Transport">
                Transport
              </option>

              <option value="Library">
                Library
              </option>

              <option value="Lost & Found">
                Lost & Found
              </option>

              <option value="Security">
                Security
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>

          {/* TITLE */}

          <div className="mb-6">

            <label
              htmlFor="title"
              className="text-sm font-medium"
            >
              Complaint Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Briefly describe the problem"
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-blue-400"
            />

          </div>

          {/* DESCRIPTION */}

          <div className="mb-6">

            <label
              htmlFor="description"
              className="text-sm font-medium"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Explain the problem in detail..."
              className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-blue-400"
            />

          </div>

          {/* LOCATION */}

          <div className="mb-6">

            <label
              htmlFor="location"
              className="text-sm font-medium"
            >
              Location
            </label>

            <input
              id="location"
              name="location"
              type="text"
              value={form.location}
              onChange={handleChange}
              required
              placeholder="Example: Block A, Room 204"
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-blue-400"
            />

          </div>

          {/* PRIORITY */}

          <div className="mb-6">

            <label
              htmlFor="priority"
              className="text-sm font-medium"
            >
              Priority
            </label>

            <select
              id="priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-blue-400"
            >

              <option value="Low">
                Low
              </option>

              <option value="Medium">
                Medium
              </option>

              <option value="High">
                High
              </option>

              <option value="Emergency">
                Emergency
              </option>

            </select>

          </div>

          {/* CONFIDENTIAL */}

          <div className="mb-8 rounded-xl border border-white/10 bg-slate-900/50 p-4">

            <label className="flex cursor-pointer items-start gap-3">

              <input
                type="checkbox"
                name="confidential"
                checked={form.confidential}
                onChange={handleChange}
                className="mt-1 h-4 w-4"
              />

              <span>

                <span className="block text-sm font-medium">
                  Request confidential handling
                </span>

                <span className="mt-1 block text-xs leading-5 text-slate-500">
                  Ask the administration to handle the complaint
                  with additional privacy.
                </span>

              </span>

            </label>

          </div>

          {/* SUBMIT */}

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-500 px-5 py-3.5 font-semibold transition hover:bg-blue-400"
          >
            Submit Complaint
          </button>

          <p className="mt-4 text-center text-xs text-slate-600">
            You will receive a unique ticket ID after submission.
          </p>

        </form>

      </div>

    </main>
  );
}