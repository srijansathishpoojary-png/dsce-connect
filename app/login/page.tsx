"use client";

import { useState } from "react";

type Role = "student" | "faculty" | "admin";

const roleInfo = {
  student: {
    title: "Student Login",
    description: "Access your DSCE Connect student account.",
    label: "College Email",
    placeholder: "student@dsce.edu.in",
  },

  faculty: {
    title: "Faculty / Staff Login",
    description: "Access your DSCE Connect faculty account.",
    label: "Faculty ID",
    placeholder: "Enter your Faculty ID",
  },

  admin: {
    title: "Administrator Login",
    description: "Authorized personnel only.",
    label: "Admin ID",
    placeholder: "Enter your Admin ID",
  },
};

export default function LoginPage() {
  const [role, setRole] = useState<Role>("student");

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const currentRole = roleInfo[role];

  function changeRole(newRole: Role) {
    setRole(newRole);
    setIdentifier("");
    setPassword("");
  }

  function handleLogin() {
    if (!identifier.trim()) {
      alert(`Please enter your ${currentRole.label}.`);
      return;
    }

    if (!password.trim()) {
      alert("Please enter your password.");
      return;
    }

    /*
     * FACULTY LOGIN
     */

    if (role === "faculty") {
      localStorage.setItem(
        "facultyId",
        identifier.trim()
      );

      localStorage.setItem(
        "facultyName",
        identifier.trim()
      );

      window.location.assign("/faculty");
      return;
    }

    /*
     * STUDENT LOGIN
     */

    if (role === "student") {
      localStorage.setItem(
        "studentEmail",
        identifier.trim()
      );

      window.location.assign("/student");
      return;
    }

    /*
     * ADMIN LOGIN
     */

    if (role === "admin") {
      localStorage.setItem(
        "adminId",
        identifier.trim()
      );

      alert("Admin Dashboard will be added next.");
      return;
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-12">

        <div className="w-full max-w-md">

          {/* LOGO */}

          <div className="mb-8 text-center">

            <a
              href="/"
              className="text-2xl font-bold tracking-tight"
            >
              DSCE
              <span className="text-blue-400">
                CONNECT
              </span>
            </a>

            <p className="mt-2 text-sm text-slate-500">
              Report. Track. Resolve.
            </p>

          </div>

          {/* LOGIN CARD */}

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl">

            {/* HEADING */}

            <div className="mb-8">

              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
                Welcome
              </p>

              <h1 className="text-3xl font-bold">
                {currentRole.title}
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                {currentRole.description}
              </p>

            </div>

            {/* ROLE SELECTOR */}

            <div className="mb-8">

              <p className="mb-2 text-sm font-medium">
                Login as
              </p>

              <div className="grid grid-cols-3 gap-2 rounded-xl bg-slate-900 p-1">

                <button
                  type="button"
                  onClick={() =>
                    changeRole("student")
                  }
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    role === "student"
                      ? "bg-blue-500 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Student
                </button>

                <button
                  type="button"
                  onClick={() =>
                    changeRole("faculty")
                  }
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    role === "faculty"
                      ? "bg-blue-500 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Faculty
                </button>

                <button
                  type="button"
                  onClick={() =>
                    changeRole("admin")
                  }
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    role === "admin"
                      ? "bg-blue-500 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Admin
                </button>

              </div>

            </div>

            {/* IDENTIFIER */}

            <div>

              <label
                htmlFor="identifier"
                className="block text-sm font-medium"
              >
                {currentRole.label}
              </label>

              <input
                id="identifier"
                type={
                  role === "student"
                    ? "email"
                    : "text"
                }
                value={identifier}
                onChange={(e) =>
                  setIdentifier(e.target.value)
                }
                placeholder={
                  currentRole.placeholder
                }
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400"
              />

            </div>

            {/* PASSWORD */}

            <div className="mt-6">

              <div className="flex items-center justify-between">

                <label
                  htmlFor="password"
                  className="text-sm font-medium"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs text-blue-400 hover:text-blue-300"
                  onClick={() =>
                    alert(
                      "Password recovery will be added later."
                    )
                  }
                >
                  Forgot password?
                </button>

              </div>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400"
              />

            </div>

            {/* REMEMBER ME */}

            <div className="mt-5 flex items-center gap-2">

              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-white/20 bg-slate-900"
              />

              <label
                htmlFor="remember"
                className="text-sm text-slate-400"
              >
                Remember me
              </label>

            </div>

            {/* SIGN IN */}

            <button
              type="button"
              onClick={handleLogin}
              className="mt-8 w-full rounded-xl bg-blue-500 px-5 py-3.5 font-semibold transition hover:bg-blue-400 active:scale-[0.99]"
            >
              Sign In
            </button>

            {/* DEVELOPMENT NOTICE */}

            <div className="mt-6 rounded-xl border border-blue-400/10 bg-blue-400/[0.05] p-4">

              <p className="text-xs leading-5 text-slate-400">

                <span className="font-semibold text-slate-300">
                  Development mode:
                </span>{" "}
                Authentication is currently simulated.

                <br />

                Student login opens the Student Dashboard.

                <br />

                Faculty login uses the entered Faculty ID
                and opens the Faculty Dashboard.

                <br />

                Admin login will open the Admin Dashboard
                once it is implemented.

              </p>

            </div>

          </div>

          {/* BACK */}

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