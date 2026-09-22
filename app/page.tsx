"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020f21] text-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#020f21]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          
          {/* LOGO + COLLEGE NAME */}
          <Link href="/" className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0">
              <Image
                src="/dsce-logo.png"
                alt="DSCE Logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="hidden border-r border-slate-600 pr-6 sm:block">
              <h1 className="text-sm font-bold leading-tight sm:text-base">
                DAYANANDA SAGAR COLLEGE
                <br />
                OF ENGINEERING
              </h1>

              <p className="mt-1 text-xs text-slate-400">
                BANGALORE&nbsp;&nbsp;•&nbsp;&nbsp; ESTD 1979
              </p>
            </div>

            <div className="hidden text-xl font-bold md:block">
              DSCE{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                CONNECT
              </span>
            </div>
          </Link>

          {/* NAVIGATION */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#home"
              className="border-b-2 border-blue-400 pb-2 text-blue-400"
            >
              Home
            </a>

            <a
              href="#about"
              className="text-slate-300 transition hover:text-blue-400"
            >
              About
            </a>

            <a
              href="#features"
              className="text-slate-300 transition hover:text-blue-400"
            >
              Features
            </a>

            <a
              href="#contact"
              className="text-slate-300 transition hover:text-blue-400"
            >
              Contact
            </a>
          </nav>

          {/* BUTTONS */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-xl border border-blue-500/70 px-5 py-3 font-semibold transition hover:bg-blue-500/10"
            >
              Login
            </Link>

            <Link
              href="/login"
              className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute left-0 top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute right-0 top-32 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto grid min-h-[calc(100vh-90px)] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-10">
          
          {/* LEFT SIDE */}
          <div>
            <div className="mb-6 flex items-center gap-4 lg:hidden">
              <div className="relative h-20 w-20">
                <Image
                  src="/dsce-logo.png"
                  alt="DSCE Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-blue-400">
              Dayananda Sagar College of Engineering
            </p>

            <h2 className="text-6xl font-black leading-none sm:text-7xl">
              DSCE
            </h2>

            <h3 className="mt-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-6xl font-black leading-none text-transparent sm:text-7xl">
              CONNECT
            </h3>

            <h4 className="mt-8 text-2xl font-bold leading-tight sm:text-3xl">
              One Campus. One{" "}
              <span className="text-blue-400">Connected</span> Platform.
            </h4>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Report campus issues, track complaints, connect with faculty,
              communicate with administration and stay connected with your
              campus through one simple platform.
            </p>

            {/* CTA BUTTONS */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/complaint"
                className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-7 py-4 font-bold shadow-xl shadow-blue-500/20 transition hover:scale-105"
              >
                🚀 Report a Problem
              </Link>

              <Link
                href="/login"
                className="rounded-xl border border-blue-500 px-7 py-4 font-bold transition hover:bg-blue-500/10"
              >
                → Login
              </Link>
            </div>

            {/* SMALL STATS */}
            <div className="mt-12 flex flex-wrap gap-8">
              <div>
                <p className="text-3xl font-bold text-blue-400">24/7</p>
                <p className="text-sm text-slate-400">
                  Campus Access
                </p>
              </div>

              <div>
                <p className="text-3xl font-bold text-cyan-400">3</p>
                <p className="text-sm text-slate-400">
                  User Roles
                </p>
              </div>

              <div>
                <p className="text-3xl font-bold text-blue-400">1</p>
                <p className="text-sm text-slate-400">
                  Connected Platform
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE CARD */}
          <div className="relative">
            <div className="rounded-[2rem] border border-blue-500/40 bg-gradient-to-br from-blue-900/50 to-slate-950/80 p-3 shadow-2xl shadow-blue-500/10">
              <div className="flex min-h-[480px] flex-col items-center justify-center rounded-[1.6rem] border border-blue-400/20 bg-[#06172d] p-10 text-center">
                
                {/* LOGO */}
                <div className="relative mb-8 h-40 w-40">
                  <Image
                    src="/dsce-logo.png"
                    alt="DSCE Logo"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>

                <h3 className="text-3xl font-bold">
                  A Better Connected Campus
                </h3>

                <p className="mt-4 text-slate-400">
                  Students • Faculty • Administration
                </p>

                <div className="mt-8 grid w-full max-w-md grid-cols-3 gap-3">
                  <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">
                    <div className="text-2xl">🎓</div>
                    <p className="mt-2 text-sm font-semibold">
                      Students
                    </p>
                  </div>

                  <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-4">
                    <div className="text-2xl">👨‍🏫</div>
                    <p className="mt-2 text-sm font-semibold">
                      Faculty
                    </p>
                  </div>

                  <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">
                    <div className="text-2xl">🏢</div>
                    <p className="mt-2 text-sm font-semibold">
                      Admin
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="border-t border-slate-800 bg-[#031426] px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-bold uppercase tracking-[0.25em] text-blue-400">
              About DSCE Connect
            </p>

            <h2 className="mt-4 text-4xl font-black sm:text-5xl">
              Making campus communication{" "}
              <span className="text-blue-400">simpler.</span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              DSCE Connect provides a central platform where students,
              faculty and administration can communicate, report problems,
              track complaints and manage campus-related activities.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="border-t border-slate-800 px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-bold uppercase tracking-[0.25em] text-blue-400">
              Platform Features
            </p>

            <h2 className="mt-4 text-4xl font-black sm:text-5xl">
              Everything connected in one place
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            
            <FeatureCard
              icon="📝"
              title="Report Complaints"
              description="Students can easily report campus problems and submit complaints."
            />

            <FeatureCard
              icon="🎫"
              title="Track Tickets"
              description="Track complaint status and follow the progress of submitted issues."
            />

            <FeatureCard
              icon="👨‍🏫"
              title="Faculty Portal"
              description="Faculty members can view and manage relevant campus issues."
            />

            <FeatureCard
              icon="⚙️"
              title="Admin Control"
              description="Administration can monitor complaints and manage the platform."
            />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="border-t border-slate-800 bg-[#031426] px-6 py-20"
      >
        <div className="mx-auto max-w-7xl text-center">
          <p className="font-bold uppercase tracking-[0.25em] text-blue-400">
            Contact
          </p>

          <h2 className="mt-4 text-4xl font-black">
            Stay connected with DSCE
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-400">
            DSCE Connect is designed to make communication between students,
            faculty and administration easier and more efficient.
          </p>

          <Link
            href="/login"
            className="mt-8 inline-block rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-4 font-bold transition hover:scale-105"
          >
            Get Started →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center text-sm text-slate-500 md:flex-row">
          <p>
            © 2026 DSCE Connect. Dayananda Sagar College of Engineering.
          </p>

          <p>
            One Campus. One Connected Platform.
          </p>
        </div>
      </footer>
    </main>
  );
}

/* FEATURE CARD */
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-slate-800 bg-[#06172d] p-7 transition duration-300 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 text-2xl">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-bold">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-400">
        {description}
      </p>
    </div>
  );
}