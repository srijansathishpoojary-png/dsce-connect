"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  addComplaint,
  generateTicketId,
} from "../lib/complaintStore";
import {
  studentComplaintCategories,
  facultyComplaintCategories,
} from "../lib/complaintCategories";
import { Complaint, Priority, UserType } from "../lib/complaints";

export default function ComplaintPage() {
  const searchParams = useSearchParams();

  const requestedType = searchParams.get("type");

  const userType: UserType =
    requestedType === "faculty" ? "faculty" : "student";

  const categories =
    userType === "student"
      ? studentComplaintCategories
      : facultyComplaintCategories;

  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const complaint: Complaint = {
      id: generateTicketId(userType),

      complainantType: userType,

      complainantName: String(
        form.get("complainantName") || ""
      ),

      complainantId: String(
        form.get("complainantId") || ""
      ),

      title: String(form.get("title") || ""),

      category: String(
        form.get("category") || ""
      ),

      description: String(
        form.get("description") || ""
      ),

      location: String(
        form.get("location") || ""
      ),

      priority: (form.get("priority") ||
        "Medium") as Priority,

      status: "Pending",

      assignedDepartment: "",

      assignedAuthority: "",

      submittedAt: new Date().toISOString(),

      dueDate: "",

      escalationLevel: 0,

      escalatedTo: "",

      escalatedAt: "",

      escalationReason: "",

      adminRemarks: "",

      resolutionDetails: "",

      resolvedAt: "",
    };

    addComplaint(complaint);

    setTicketId(complaint.id);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-2xl">

          <Link
            href={
              userType === "student"
                ? "/student"
                : "/faculty"
            }
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            ← Back to Dashboard
          </Link>

          <div className="mt-8 rounded-3xl border border-emerald-500/30 bg-slate-900 p-8 text-center shadow-2xl">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-3xl">
              ✓
            </div>

            <h1 className="mt-6 text-3xl font-bold">
              Complaint Submitted
            </h1>

            <p className="mt-3 text-slate-400">
              Your complaint has been successfully registered
              with DSCE Connect.
            </p>

            <div className="mt-8 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-6">

              <p className="text-sm text-slate-400">
                Your Ticket ID
              </p>

              <p className="mt-2 text-3xl font-black tracking-wider text-blue-400">
                {ticketId}
              </p>

            </div>

            <div className="mt-6 rounded-xl bg-slate-950 p-4 text-sm text-slate-400">
              Status:{" "}
              <span className="font-semibold text-blue-400">
                Pending
              </span>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

              <Link
                href={
                  userType === "student"
                    ? "/student"
                    : "/faculty"
                }
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
                Submit Another
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

        <Link
          href={
            userType === "student"
              ? "/student"
              : "/faculty"
          }
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          ← Back to Dashboard
        </Link>

        {/* Header */}

        <div className="mt-8">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
            DSCE CONNECT
          </p>

          <h1 className="mt-2 text-4xl font-black">
            {userType === "student"
              ? "Submit Student Complaint"
              : "Submit Faculty Complaint"}
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            {userType === "student"
              ? "Report an issue concerning academics, faculty, infrastructure, administration or other campus services."
              : "Report an issue concerning salary, students, infrastructure, colleagues, administration or other workplace matters."}
          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-8"
        >

          <div className="grid gap-6">

            {/* Complainant */}

            <div className="grid gap-6 sm:grid-cols-2">

              <div>

                <label
                  htmlFor="complainantName"
                  className="mb-2 block text-sm font-semibold"
                >
                  {userType === "student"
                    ? "Student Name"
                    : "Faculty Name"}
                </label>

                <input
                  id="complainantName"
                  name="complainantName"
                  required
                  placeholder={
                    userType === "student"
                      ? "Enter your name"
                      : "Enter your name"
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none placeholder:text-slate-600 focus:border-blue-500"
                />

              </div>

              <div>

                <label
                  htmlFor="complainantId"
                  className="mb-2 block text-sm font-semibold"
                >
                  {userType === "student"
                    ? "USN"
                    : "Employee ID"}
                </label>

                <input
                  id="complainantId"
                  name="complainantId"
                  required
                  placeholder={
                    userType === "student"
                      ? "Example: 1DS23CS001"
                      : "Example: FAC001"
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none placeholder:text-slate-600 focus:border-blue-500"
                />

              </div>

            </div>

            {/* Title */}

            <div>

              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold"
              >
                Complaint Title
              </label>

              <input
                id="title"
                name="title"
                required
                placeholder="Briefly describe the issue"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none placeholder:text-slate-600 focus:border-blue-500"
              />

            </div>

            {/* Category */}

            <div>

              <label
                htmlFor="category"
                className="mb-2 block text-sm font-semibold"
              >
                Complaint Category
              </label>

              <select
                id="category"
                name="category"
                required
                defaultValue=""
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
              >

                <option value="" disabled>
                  Select category
                </option>

                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}

              </select>

            </div>

            {/* Location */}

            <div>

              <label
                htmlFor="location"
                className="mb-2 block text-sm font-semibold"
              >
                Location
              </label>

              <input
                id="location"
                name="location"
                required
                placeholder="Example: Block A, Room 204"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none placeholder:text-slate-600 focus:border-blue-500"
              />

            </div>

            {/* Priority */}

            <div>

              <label
                htmlFor="priority"
                className="mb-2 block text-sm font-semibold"
              >
                Priority
              </label>

              <select
                id="priority"
                name="priority"
                defaultValue="Medium"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
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

                <option value="Urgent">
                  Urgent
                </option>

              </select>

            </div>

            {/* Description */}

            <div>

              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold"
              >
                Detailed Description
              </label>

              <textarea
                id="description"
                name="description"
                required
                rows={7}
                placeholder="Describe the issue clearly. Include relevant details that may help the administration take action."
                className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 leading-7 outline-none placeholder:text-slate-600 focus:border-blue-500"
              />

            </div>

            {/* Notice */}

            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">

              <p className="font-semibold text-blue-400">
                Privacy Notice
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Your complaint will be accessible to authorized
                DSCE Connect administrators for review and necessary
                action. Other students or faculty members will not
                have access to your complaint.
              </p>

            </div>

            {/* Submit */}

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-4 font-bold shadow-lg shadow-blue-500/20 transition hover:scale-[1.01]"
            >
              Submit Complaint
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}