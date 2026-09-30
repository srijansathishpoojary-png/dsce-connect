import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020d1d] text-white">

      {/* ================= HEADER ================= */}

      <header className="border-b border-slate-800 bg-[#031426]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* Logo + College Name */}
          <Link href="/" className="flex items-center gap-4">

            <div className="relative h-16 w-16 shrink-0">
              <Image
                src="/dsce-logo.png"
                alt="DSCE Logo"
                fill
                priority
                className="object-contain"
              />
            </div>

            <div>
              <h1 className="text-sm font-bold leading-tight sm:text-base">
                DAYANANDA SAGAR COLLEGE
                <br />
                OF ENGINEERING
              </h1>

              <p className="mt-1 text-xs text-slate-400">
                BANGALORE • ESTD 1979
              </p>
            </div>

          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 md:flex">

            <a
              href="#home"
              className="text-sm font-medium text-blue-400"
            >
              Home
            </a>

            <a
              href="#about"
              className="text-sm font-medium text-slate-300 hover:text-blue-400"
            >
              About
            </a>

            <a
              href="#features"
              className="text-sm font-medium text-slate-300 hover:text-blue-400"
            >
              Features
            </a>

            <a
              href="#contact"
              className="text-sm font-medium text-slate-300 hover:text-blue-400"
            >
              Contact
            </a>

          </nav>

          {/* Login Buttons */}
          <div className="flex items-center gap-3">

            <Link
              href="/login"
              className="rounded-xl border border-blue-500 px-5 py-2.5 text-sm font-semibold transition hover:bg-blue-500/10"
            >
              Login
            </Link>

            <Link
              href="/login"
              className="hidden rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-5 py-2.5 text-sm font-bold transition hover:scale-105 sm:block"
            >
              Get Started
            </Link>

          </div>

        </div>
      </header>


      {/* ================= HERO ================= */}

      <section
        id="home"
        className="relative overflow-hidden"
      >

        {/* Background Glow */}
        <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto grid min-h-[calc(100vh-90px)] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2">

          {/* ================= LEFT CONTENT ================= */}

          <div>

            <p className="mb-5 text-sm font-bold uppercase tracking-[0.3em] text-blue-400">
              DAYANANDA SAGAR COLLEGE OF ENGINEERING
            </p>

            <h2 className="text-6xl font-black tracking-tight sm:text-7xl">
              DSCE
            </h2>

            <h2 className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-6xl font-black tracking-tight text-transparent sm:text-7xl">
              CONNECT
            </h2>

            <p className="mt-8 text-2xl font-bold sm:text-3xl">
              One Campus.
              <br />
              One{" "}
              <span className="text-blue-400">
                Connected
              </span>{" "}
              Platform.
            </p>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Report campus issues, track complaints,
              connect with faculty and communicate with
              administration through one simple platform.
            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="/complaint"
                className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-7 py-4 font-bold shadow-lg shadow-blue-500/20 transition hover:scale-105"
              >
                🚀 Report a Problem
              </Link>

              <Link
                href="/login"
                className="rounded-xl border border-blue-500 px-7 py-4 font-bold transition hover:bg-blue-500/10"
              >
                Login →
              </Link>

            </div>

            {/* Statistics */}

            <div className="mt-12 flex flex-wrap gap-10">

              <div>
                <p className="text-3xl font-bold text-blue-400">
                  24/7
                </p>
                <p className="text-sm text-slate-400">
                  Campus Access
                </p>
              </div>

              <div>
                <p className="text-3xl font-bold text-cyan-400">
                  3
                </p>
                <p className="text-sm text-slate-400">
                  User Roles
                </p>
              </div>

              <div>
                <p className="text-3xl font-bold text-blue-400">
                  1
                </p>
                <p className="text-sm text-slate-400">
                  Connected Platform
                </p>
              </div>

            </div>

          </div>


          {/* ================= RIGHT CARD ================= */}

          <div className="relative">

            <div className="rounded-3xl border border-blue-500/40 bg-gradient-to-br from-blue-900/40 to-slate-950 p-3 shadow-2xl shadow-blue-500/10">

              <div className="flex min-h-[500px] flex-col items-center justify-center rounded-2xl border border-blue-400/20 bg-[#06172d] p-10 text-center">

                {/* DSCE LOGO */}

                <div className="relative h-56 w-56">

                  <Image
                    src="/dsce-logo.png"
                    alt="Dayananda Sagar College of Engineering"
                    fill
                    priority
                    className="object-contain"
                  />

                </div>

                <h3 className="mt-8 text-3xl font-bold">
                  A Better Connected Campus
                </h3>

                <p className="mt-3 text-slate-400">
                  Students • Faculty • Administration
                </p>

                {/* Role Cards */}

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


      {/* ================= ABOUT ================= */}

      <section
        id="about"
        className="border-t border-slate-800 bg-[#031426] px-6 py-24"
      >

        <div className="mx-auto max-w-7xl">

          <p className="font-bold uppercase tracking-[0.25em] text-blue-400">
            About DSCE Connect
          </p>

          <h2 className="mt-4 text-4xl font-black sm:text-5xl">
            Making campus communication{" "}
            <span className="text-blue-400">
              simpler.
            </span>
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            DSCE Connect is a unified platform designed
            to connect students, faculty and administration.
            Report problems, track complaints and stay
            connected with your campus from one place.
          </p>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

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
              description="Students can quickly report campus problems and submit complaints."
            />

            <FeatureCard
              icon="🎫"
              title="Track Tickets"
              description="Track the status and progress of submitted complaints."
            />

            <FeatureCard
              icon="👨‍🏫"
              title="Faculty Portal"
              description="Faculty members can view and manage relevant campus issues."
            />

            <FeatureCard
              icon="⚙️"
              title="Admin Control"
              description="Administration can monitor complaints and manage campus issues."
            />

          </div>

        </div>

      </section>


      {/* ================= CALL TO ACTION ================= */}

      <section className="border-t border-slate-800 bg-gradient-to-r from-blue-900/30 to-cyan-900/20 px-6 py-24">

        <div className="mx-auto max-w-4xl text-center">

          <h2 className="text-4xl font-black sm:text-5xl">
            Ready to connect with your campus?
          </h2>

          <p className="mt-5 text-lg text-slate-300">
            Join DSCE Connect and make campus communication
            faster, simpler and more organized.
          </p>

          <Link
            href="/login"
            className="mt-8 inline-block rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-4 font-bold shadow-lg shadow-blue-500/20 transition hover:scale-105"
          >
            Get Started →
          </Link>

        </div>

      </section>


      {/* ================= CONTACT ================= */}

      <section
        id="contact"
        className="border-t border-slate-800 bg-[#031426] px-6 py-20"
      >

        <div className="mx-auto max-w-7xl text-center">

          <p className="font-bold uppercase tracking-[0.25em] text-blue-400">
            DSCE Connect
          </p>

          <h2 className="mt-4 text-3xl font-black">
            One Campus. One Connected Platform.
          </h2>

          <p className="mt-4 text-slate-400">
            Students • Faculty • Administration
          </p>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="border-t border-slate-800 px-6 py-8">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center text-sm text-slate-500 md:flex-row">

          <p>
            © 2026 DSCE Connect
          </p>

          <p>
            Dayananda Sagar College of Engineering
          </p>

        </div>

      </footer>

    </main>
  );
}


/* ================= FEATURE CARD ================= */

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