"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

type UserType = "student" | "faculty";

type Complaint = {
  id: string;
  complainantType: UserType;
  complainantName: string;
  complainantId: string;
  title: string;
  category: string;
  description: string;
  location: string;
  priority: string;
  status: string;
  submittedAt: string;
};

const studentComplaintCategories = [
  "Faculty",
  "Academic",
  "Examination",
  "Infrastructure",
  "Classroom",
  "Laboratory",
  "Library",
  "Hostel",
  "Food / Canteen",
  "Transport",
  "Administration",
  "Fees / Accounts",
  "Scholarship",
  "Harassment / Misconduct",
  "IT / Technical",
  "Security",
  "Cleanliness",
  "Other",
];

const facultyComplaintCategories = [
  "Salary / Payroll",
  "Students",
  "Infrastructure",
  "Academic / Department",
  "Colleagues",
  "Administration",
  "Workload",
  "Leave / Attendance",
  "Promotion / Career",
  "Research",
  "Laboratory",
  "IT / Technical",
  "Facilities",
  "Harassment / Misconduct",
  "Security",
  "Other",
];

function ComplaintForm() {
  const searchParams = useSearchParams();

  const typeFromUrl = searchParams.get("type");

  const userType: UserType =
    typeFromUrl === "faculty" ? "faculty" : "student";

  const categories =
    userType === "faculty"
      ? facultyComplaintCategories
      : studentComplaintCategories;

  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState("Medium");

  const [success, setSuccess] = useState(false);
  const [ticketId, setTicketId] = useState("");

  useEffect(() => {
    setCategory(categories[0]);
  }, [userType]);

  function generateTicketId() {
    const prefix = userType === "student" ? "STU" : "FAC";

    const number = Math.floor(
      100000 + Math.random() * 900000
    );

    return `${prefix}-${number}`;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const id = generateTicketId();

    const complaint: Complaint = {
      id,
      complainantType: userType,
      complainantName: name,
      complainantId: userId,
      title,
      category,
      description,
      location,
      priority,
      status: "Pending",
      submittedAt: new Date().toISOString(),
    };

    /*
      Store complaints locally for now.
      Later we can replace this with a real database.
    */

    const existingComplaints =
      JSON.parse(
        localStorage.getItem("dsceComplaints") || "[]"
      );

    localStorage.setItem(
      "dsceComplaints",
      JSON.stringify([
        complaint,
        ...existingComplaints,
      ])
    );

    setTicketId(id);
    setSuccess(true);

    setName("");
    setUserId("");
    setTitle("");
    setDescription("");
    setLocation("");
    setPriority("Medium");
    setCategory(categories[0]);
  }

  if (success) {
    return (
      <main className="min-h-screen bg-slate-950 text-white px-6 py-12">
        <div className="mx-auto max-w-2xl">

          <div className="rounded-3xl border border-green-400/20 bg-slate-900 p-10 text-center shadow-2xl">

            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-4xl">
              ✓
            </div>

            <h1 className="text-3xl font-bold">
              Complaint Submitted
            </h1>

            <p className="mt-3 text-slate-400">
              Your complaint has been successfully registered
              with DSCE Connect.
            </p>

            <div className="mt-8 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-6">
              <p className="text-sm text-slate-400">
                Your Ticket ID
              </p>

              <p className="mt-2 text-3xl font-bold text-blue-400">
                {ticketId}
              </p>

              <p className="mt-3 text-sm text-slate-400">
                Please save this ticket ID to track your complaint.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

              <button
                onClick={() => {
                  setSuccess(false);
                }}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500"
              >
                Submit Another Complaint
              </button>

              <a
                href={
                  userType === "student"
                    ? "/student"
                    : "/faculty"
                }
                className="rounded-xl border border-slate-700 px-6 py-3 font-semibold transition hover:bg-slate-800"
              >
                Back to Dashboard
              </a>

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

          <a
            href={
              userType === "student"
                ? "/student"
                : "/faculty"
            }
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            ← Back to Dashboard
          </a>

          <div className="mt-6">

            <div className="mb-3 inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
              {userType === "student"
                ? "Student Complaint"
                : "Faculty Complaint"}
            </div>

            <h1 className="text-4xl font-bold">
              Report a Problem
            </h1>

            <p className="mt-3 max-w-2xl text-slate-400">
              Submit your complaint through DSCE Connect.
              The administration will review, assign and
              monitor the complaint until it is resolved.
            </p>

          </div>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-8"
        >

          <div className="grid gap-6 sm:grid-cols-2">

            {/* Name */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                {userType === "student"
                  ? "Student Name"
                  : "Faculty Name"}
              </label>

              <input
                required
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder={
                  userType === "student"
                    ? "Enter your name"
                    : "Enter your name"
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            {/* ID */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                {userType === "student"
                  ? "USN / Student ID"
                  : "Employee / Faculty ID"}
              </label>

              <input
                required
                value={userId}
                onChange={(e) =>
                  setUserId(e.target.value)
                }
                placeholder={
                  userType === "student"
                    ? "Enter your USN"
                    : "Enter faculty ID"
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            {/* Complaint title */}

            <div className="sm:col-span-2">

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Complaint Title
              </label>

              <input
                required
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="Briefly describe the problem"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-blue-500"
              />

            </div>

            {/* Category */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Complaint Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
              >

                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}

              </select>

            </div>

            {/* Priority */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Priority
              </label>

              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value)
                }
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

            {/* Location */}

            <div className="sm:col-span-2">

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Location
              </label>

              <input
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                placeholder="Example: Block A, Room 204, Library..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-blue-500"
              />

            </div>

            {/* Description */}

            <div className="sm:col-span-2">

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Detailed Description
              </label>

              <textarea
                required
                rows={7}
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Explain the problem in detail..."
                className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-blue-500"
              />

            </div>

          </div>

          {/* Information */}

          <div className="mt-6 rounded-2xl border border-blue-400/10 bg-blue-500/5 p-5">

            <h3 className="font-semibold text-blue-400">
              What happens after submission?
            </h3>

            <ul className="mt-3 space-y-2 text-sm text-slate-400">

              <li>
                • Your complaint receives a unique ticket ID.
              </li>

              <li>
                • The administration reviews the complaint.
              </li>

              <li>
                • Admin can assign it to the concerned department.
              </li>

              <li>
                • Admin can escalate the matter when necessary.
              </li>

              <li>
                • You can track the complaint status.
              </li>

            </ul>

          </div>

          {/* Submit */}

          <button
            type="submit"
            className="mt-8 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 font-bold shadow-lg transition hover:scale-[1.01] hover:from-blue-500 hover:to-cyan-400"
          >
            Submit Complaint
          </button>

        </form>

      </div>

    </main>
  );
}

export default function ComplaintPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
          Loading complaint form...
        </div>
      }
    >
      <ComplaintForm />
    </Suspense>
  );
}