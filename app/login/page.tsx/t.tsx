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

          {/* Logo */}
          <div className="mb-8 text-center">
            <a
              href="/"
              className="text-2xl font-bold tracking-tight"
            >
              DSCE<span className="text-blue-400">CONNECT</span>
            </a>

            <p className="mt-2 text-sm text-slate-500">
              Report. Track. Resolve.
            </p>
          </div>

          {/* Login Card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl">

            {/* Heading */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold">
                {currentRole.title}
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {currentRole.description}
              </p>
            </div>

            {/* Role Selector */}
            <div className="mb-8 grid grid-cols-3 gap-2 rounded-xl bg-slate-900 p-1">

              <RoleButton
                active={role === "student"}
                onClick={() => setRole("student")}
              >
                Student
              </RoleButton>

              <RoleButton
                active={role === "faculty"}
                onClick={() => setRole("faculty")}
              >
                Faculty
              </RoleButton>

              <RoleButton
                active={role === "admin"}
                onClick={() => setRole("admin")}
              >
                Admin
              </RoleButton>

            </div>

            {/* Email */}
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-200"
            >
              College Email
            </label>

            <input
              id="email"
              type="email"
              placeholder={currentRole.placeholder}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400"
            />

            {/* Password */}
            <label
              htmlFor="password"
              className="mt-6 block text-sm font-medium text-slate-200"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400"
            />

            {/* Login Button */}
            <button
              type="button"
              className="mt-8 w-full rounded-xl bg-blue-500 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-400"
            >
              Sign in
            </button>

            {/* Information Box */}
            <div className="mt-6 rounded-xl border border-blue-400/10 bg-blue-400/[0.05] p-4">
              <p className="text-xs leading-5 text-slate-400">
                Use your official DSCE credentials. Secure authentication
                will be connected in the next development stage.
              </p>
            </div>

          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-slate-500 transition hover:text-white"
            >
              ← Back to DSCE Connect
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}

function RoleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
        active
          ? "bg-blue-500 text-white"
          : "text-slate-400 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}