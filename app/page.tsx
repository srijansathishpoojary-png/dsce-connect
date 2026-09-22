"use client";

import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020d1c] text-white">

      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-50 border-b border-blue-400/20 bg-[#031326]/95 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* LOGO + COLLEGE NAME */}

          <div className="flex items-center gap-4">

            <Image
              src="/dsce-logo.png"
              alt="Dayananda Sagar College of Engineering"
              width={68}
              height={68}
              className="h-14 w-14 object-contain"
            />

            <div className="hidden border-r border-white/30 pr-6 sm:block">

              <h1 className="text-sm font-bold leading-tight">
                DAYANANDA SAGAR COLLEGE
                <br />
                OF ENGINEERING
              </h1>

              <p className="mt-1 text-[10px] tracking-wider text-slate-400">
                BANGALORE &nbsp; • &nbsp; ESTD 1979
              </p>

            </div>

            <div className="hidden md:block">

              <span className="text-xl font-bold">
                DSCE{" "}
                <span className="text-blue-400">
                  CONNECT
                </span>
              </span>

            </div>

          </div>

          {/* NAVIGATION */}

          <nav className="hidden items-center gap-8 lg:flex">

            <a
              href="/"
              className="border-b-2 border-blue-400 pb-2 text-sm font-medium text-blue-400"
            >
              Home
            </a>

            <a
              href="#about"
              className="text-sm text-slate-300 transition hover:text-white"
            >
              About
            </a>

            <a
              href="#features"
              className="text-sm text-slate-300 transition hover:text-white"
            >
              Features
            </a>

            <a
              href="#contact"
              className="text-sm text-slate-300 transition hover:text-white"
            >
              Contact
            </a>

          </nav>

          {/* HEADER BUTTONS */}

          <div className="flex items-center gap-3">

            <a
              href="/login"
              className="rounded-xl border border-blue-400/60 px-5 py-2.5 text-sm font-medium transition hover:bg-blue-400/10"
            >
              Login
            </a>

            <a
              href="/login"
              className="hidden rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-5 py-2.5 text-sm font-semibold shadow-lg shadow-blue-500/20 transition hover:scale-105 sm:block"
            >
              Get Started
            </a>

          </div>

        </div>

      </header>


      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden">

        {/* Background glow */}

        <div className="absolute left-0 top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">

          {/* LEFT */}

          <div className="relative z-10">

            <Image
              src="/dsce-logo.png"
              alt="DSCE Logo"
              width={150}
              height={150}
              className="mb-8 h-28 w-28 object-contain sm:h-36 sm:w-36"
            />

            <p className="mb-3 text-sm font-semibold tracking-[0.25em] text-blue-400">
              DAYANANDA SAGAR COLLEGE OF ENGINEERING
            </p>

            <h2 className="text-5xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl">

              DSCE{" "}

              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                CONNECT
              </span>

            </h2>

            <h3 className="mt-6 text-2xl font-bold sm:text-3xl">

              One Campus. One{" "}

              <span className="text-blue-400">
                Connected
              </span>{" "}

              Platform.

            </h3>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">

              Report campus issues. Track complaints.
              Connect students, faculty and administration
              through one simple platform.

            </p>

            {/* HERO BUTTONS */}

            <div className="mt-8 flex flex-wrap gap-4">

              <a
                href="/complaint"
                className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-7 py-4 font-semibold shadow-xl shadow-blue-500/20 transition hover:-translate-y-1"
              >
                🚀 Report a Problem
              </a>

              <a
                href="/login"
                className="rounded-xl border border-blue-400/60 px-7 py-4 font-semibold transition hover:bg-blue-400/10"
              >
                → Login
              </a>

            </div>

          </div>


          {/* RIGHT VISUAL */}

          <div className="relative">

            <div className="absolute -inset-5 rounded-[3rem] bg-blue-500/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-blue-400/30 bg-gradient-to-br from-blue-950 to-slate-900 p-2 shadow-2xl shadow-blue-900/40">

              <div className="flex min-h-[430px] items-center justify-center rounded-[1.6rem] bg-gradient-to-br from-blue-900/80 via-[#06172b] to-[#020b18]">

                <div className="text-center">

                  <Image
                    src="/dsce-logo.png"
                    alt="DSCE"
                    width={220}
                    height={220}
                    className="mx-auto h-48 w-48 object-contain drop-shadow-[0_0_35px_rgba(59,130,246,0.35)]"
                  />

                  <p className="mt-5 text-xl font-semibold">
                    A Better Connected Campus
                  </p>

                  <p className="mt-2 text-sm text-slate-400">
                    Students • Faculty • Administration
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section
        id="features"
        className="border-y border-blue-400/10 bg-[#031326]/80 py-20"
      >

        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-12 text-center">

            <p className="text-sm font-semibold tracking-[0.2em] text-blue-400">
              EVERYTHING CONNECTED
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Built for a Better Campus
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              One platform for reporting problems, tracking
              progress and connecting the entire DSCE community.
            </p>

          </div>


          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

            <FeatureCard
              icon="📋"
              title="Report Issues"
              description="Quickly submit complaints about campus facilities, academic concerns or other problems."
            />

            <FeatureCard
              icon="🔎"
              title="Track Progress"
              description="Get updates on your complaints and see the current status at every stage."
            />

            <FeatureCard
              icon="👥"
              title="Connect Community"
              description="Bring together students, faculty and administration for a better campus."
            />

            <FeatureCard
              icon="🛡️"
              title="Better Campus"
              description="Work together to create a safer, cleaner and more connected DSCE."
            />

          </div>

        </div>

      </section>


      {/* ================= STATS ================= */}

      <section className="border-b border-blue-400/10 py-16">

        <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4">

          <Stat
            number="3000+"
            label="Students"
            icon="👥"
          />

          <Stat
            number="200+"
            label="Faculty Members"
            icon="🎓"
          />

          <Stat
            number="50+"
            label="Administration Staff"
            icon="🏢"
          />

          <Stat
            number="1"
            label="DSCE Family"
            icon="⭐"
          />

        </div>

      </section>


      {/* ================= ABOUT ================= */}

      <section
        id="about"
        className="relative overflow-hidden py-24"
      >

        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

          <div>

            <p className="text-sm font-semibold tracking-[0.2em] text-blue-400">
              DAYANANDA SAGAR COLLEGE OF ENGINEERING
            </p>

            <h2 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">

              A Connected Campus
              <br />

              for a{" "}

              <span className="text-blue-400">
                Brighter Future
              </span>

            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">

              DSCE Connect is more than just a platform.
              It is a bridge that keeps our campus community
              connected, informed and empowered.

            </p>


            <div className="mt-10 grid grid-cols-2 gap-4">

              <MiniFeature
                icon="🎓"
                text="Quality Education"
              />

              <MiniFeature
                icon="💡"
                text="Innovation"
              />

              <MiniFeature
                icon="👥"
                text="Community"
              />

              <MiniFeature
                icon="🌱"
                text="Sustainability"
              />

            </div>

          </div>


          <div className="relative">

            <div className="absolute -inset-5 rounded-[3rem] bg-blue-500/10 blur-3xl" />

            <div className="relative flex min-h-[350px] items-center justify-center overflow-hidden rounded-[2rem] border border-blue-400/20 bg-gradient-to-br from-blue-950 to-slate-900">

              <Image
                src="/dsce-logo.png"
                alt="DSCE Campus"
                width={280}
                height={280}
                className="h-64 w-64 object-contain opacity-90"
              />

            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="px-6 pb-24">

        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-r from-blue-950 to-cyan-950/40 px-6 py-14 text-center shadow-2xl shadow-blue-950/30 sm:px-12">

          <p className="text-sm font-semibold tracking-[0.2em] text-blue-400">
            YOUR CAMPUS. YOUR VOICE.
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Help Make DSCE Better
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            See something that needs attention?
            Report it and help us build a better campus together.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <a
              href="/complaint"
              className="rounded-xl bg-blue-500 px-7 py-3.5 font-semibold transition hover:bg-blue-400"
            >
              Report a Problem
            </a>

            <a
              href="/login"
              className="rounded-xl border border-white/20 px-7 py-3.5 font-semibold transition hover:bg-white/10"
            >
              Login to DSCE Connect
            </a>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer
        id="contact"
        className="border-t border-blue-400/10 bg-[#010a15]"
      >

        <div className="mx-auto max-w-7xl px-6 py-12">

          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">

            <div className="flex items-center gap-4">

              <Image
                src="/dsce-logo.png"
                alt="DSCE"
                width={70}
                height={70}
                className="h-14 w-14 object-contain"
              />

              <div>

                <p className="font-bold">
                  DSCE{" "}
                  <span className="text-blue-400">
                    CONNECT
                  </span>
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  One Campus. One Connected Platform.
                </p>

              </div>

            </div>


            <div className="flex gap-7 text-sm text-slate-400">

              <a
                href="/"
                className="transition hover:text-white"
              >
                Home
              </a>

              <a
                href="#about"
                className="transition hover:text-white"
              >
                About
              </a>

              <a
                href="#features"
                className="transition hover:text-white"
              >
                Features
              </a>

              <a
                href="#contact"
                className="transition hover:text-white"
              >
                Contact
              </a>

            </div>

            <p className="text-sm text-slate-400">
              ♡ Together for a Better Campus
            </p>

          </div>

          <div className="mt-10 border-t border-white/5 pt-6 text-center text-xs text-slate-600">

            © 2026 DSCE Connect. Dayananda Sagar College
            of Engineering, Bangalore.

          </div>

        </div>

      </footer>

    </main>
  );
}


/* ================= COMPONENTS ================= */

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
    <div className="group rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-950/50 to-slate-950/50 p-6 transition duration-300 hover:-translate-y-2 hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-950/30">

      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-2xl transition group-hover:bg-blue-500/20">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-bold">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-400">
        {description}
      </p>

      <div className="mt-5 text-2xl text-blue-400 transition group-hover:translate-x-2">
        →
      </div>

    </div>
  );
}


function Stat({
  number,
  label,
  icon,
}: {
  number: string;
  label: string;
  icon: string;
}) {
  return (
    <div className="text-center">

      <div className="text-2xl">
        {icon}
      </div>

      <p className="mt-3 text-3xl font-extrabold text-white">
        {number}
      </p>

      <p className="mt-1 text-sm text-slate-500">
        {label}
      </p>

    </div>
  );
}


function MiniFeature({
  icon,
  text,
}: {
  icon: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4">

      <span className="text-xl">
        {icon}
      </span>

      <span className="text-sm text-slate-300">
        {text}
      </span>

    </div>
  );
}