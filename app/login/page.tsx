"use client";

import { useState } from "react";

type Role = "student" | "faculty" | "admin";

const roleInfo = {
  student: {
    title: "Student Login",
    description: "Access your DSCE Connect student account.",
    placeholder: "student@dsce.edu.in",
  },
  faculty: {
    title: "Faculty / Staff Login",
    description: "Access your DSCE Connect faculty account.",
    placeholder: "faculty@dsce.edu.in",
  },
  admin: {
    title: "Administrator Login",
    description: "Authorized personnel only.",
    placeholder: "admin@dsce.edu.in",
  },
};

export default function LoginPage() {
  const [role, setRole] = useState<Role>("student");

  const currentRole = roleInfo[role];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          <div className="mb-8 text-center">
            <a href="/" className="text-2xl font-bold">
              DSCE<span className="text-blue-400">CONNECT</span>
            </a>

            <p className="mt-2 text-sm text-slate-500">
              Report. Track. Resolve.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl">

            <div className="mb-8">
              <h1 className="text-3xl font-bold">
                {currentRole.title}
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                {currentRole.description}
              </p>
            </div>

            <div className="mb-8 grid grid-cols-3 gap-2 rounded-xl bg-slate-900 p-1">

              <button
                type="button"
                onClick={() => setRole("student")}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                  role === "student"
                    ? "bg-blue-500 text-white"
                    : "text-slate-400"
                }`}
              >
                Student
              </button>

              <button
                type="button"
                onClick={() => setRole("faculty")}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                  role === "faculty"
                    ? "bg-blue-500 text-white"
                    : "text-slate-400"
                }`}
              >
                Faculty
              </button>

              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                  role === "admin"
                    ? "bg-blue-500 text-white"
                    : "text-slate-400"
                }`}
              >
                Admin
              </button>

            </div>

            <label className="block text-sm font-medium">
              College Email
            </label>

            <input
              type="email"
              placeholder={currentRole.placeholder}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-blue-400"
            />

            <label className="mt-6 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-blue-400"
            />

            <button
              type="button"
              className="mt-8 w-full rounded-xl bg-blue-500 px-5 py-3.5 font-semibold transition hover:bg-blue-400"
            >
              Sign In
            </button>

            <div className="mt-6 rounded-xl border border-blue-400/10 bg-blue-400/[0.05] p-4">
              <p className="text-xs leading-5 text-slate-400">
                Use your official DSCE credentials.
                Authentication will be connected in the next stage.
              </p>
            </div>

          </div>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-slate-500 hover:text-white"
            >
              ← Back to DSCE Connect
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}