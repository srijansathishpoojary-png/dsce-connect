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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const currentRole = roleInfo[role];

  function handleLogin() {
    setError("");

    /*
     * Basic validation
     */
    if (!email.trim()) {
      setError("Please enter your college email.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    /*
     * Create an ID from the email.
     *
     * Example:
     * 1ds24cs001@dsce.edu.in
     *
     * becomes:
     * 1DS24CS001
     */
    const userId = email
      .split("@")[0]
      .trim()
      .toUpperCase();

    /*
     * Store the currently logged-in user.
     *
     * The dashboards will use these values.
     */
    localStorage.setItem("loggedInRole", role);
    localStorage.setItem("loggedInEmail", email);
    localStorage.setItem("loggedInUserId", userId);

    /*
     * Store role-specific information.
     */
    if (role === "student") {
      localStorage.setItem("studentName", userId);
      localStorage.setItem("studentId", userId);

      window.location.assign("/student");
      return;
    }

    if (role === "faculty") {
      localStorage.setItem("facultyName", userId);
      localStorage.setItem("facultyId", userId);

      window.location.assign("/faculty");
      return;
    }

    if (role === "admin") {
      localStorage.setItem("adminName", userId);
      localStorage.setItem("adminId", userId);

      window.location.assign("/admin");
      return;
    }
  }

  function changeRole(newRole: Role) {
    setRole(newRole);
    setError("");
    setEmail("");
    setPassword("");
  }

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
              DSCE
              <span className="text-blue-400">
                CONNECT
              </span>
            </a>

            <p className="mt-2 text-sm text-slate-500">
              Report. Track. Resolve.
            </p>

          </div>

          {/* Login Card */}

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl">

            {/* Heading */}

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

            {/* Role Selector */}

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

            {/* Email */}

            <div>

              <label
                htmlFor="email"
                className="block text-sm font-medium"
              >
                College Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
                placeholder={currentRole.placeholder}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400"
              />

            </div>

            {/* Password */}

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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
                placeholder="Enter your password"
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400"
              />

            </div>

            {/* Remember Me */}

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

            {/* Error */}

            {error && (

              <div className="mt-5 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>

            )}

            {/* Sign In */}

            <button
              type="button"
              onClick={handleLogin}
              className="mt-8 w-full rounded-xl bg-blue-500 px-5 py-3.5 font-semibold transition hover:bg-blue-400 active:scale-[0.99]"
            >
              Sign In
            </button>

            {/* Development Notice */}

            <div className="mt-6 rounded-xl border border-blue-400/10 bg-blue-400/[0.05] p-4">

              <p className="text-xs leading-5 text-slate-400">

                <span className="font-semibold text-slate-300">
                  Development mode:
                </span>{" "}
                Authentication is currently simulated.

                <br />

                Your selected role and user ID are stored
                locally so the dashboards can identify the
                currently logged-in user.

              </p>

            </div>

          </div>

          {/* Back */}

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