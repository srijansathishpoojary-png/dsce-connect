export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              DSCE<span className="text-blue-400">CONNECT</span>
            </h1>
            <p className="text-xs text-slate-400">
              Report. Track. Resolve.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#how-it-works"
              className="hidden text-sm text-slate-300 transition hover:text-white md:block"
            >
              How it works
            </a>

            <a
              href="/login"
              className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium transition hover:bg-white/10"
            >
              Login
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-24 md:pb-32 md:pt-32">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
              AI-Powered Campus Issue Resolution
            </div>

            <h2 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
              Make your campus
              <span className="block text-blue-400">
                better, together.
              </span>
            </h2>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
              A single platform for students and faculty to report campus
              problems, track their complaints, and ensure that every issue
              reaches the right authority.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/login"
                className="rounded-xl bg-blue-500 px-7 py-4 text-center font-semibold text-white transition hover:bg-blue-400"
              >
                Report an Issue
              </a>

              <a
                href="#how-it-works"
                className="rounded-xl border border-white/15 px-7 py-4 text-center font-semibold text-slate-200 transition hover:bg-white/10"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-16 md:grid-cols-3">
          <Feature
            number="01"
            title="Report"
            description="Students and faculty can report campus issues with descriptions, locations, photos and other evidence."
          />

          <Feature
            number="02"
            title="Track"
            description="Every complaint receives a unique ticket ID so users can follow its progress from submission to resolution."
          />

          <Feature
            number="03"
            title="Resolve"
            description="Authorized administrators can review, assign, escalate and resolve issues through one centralized dashboard."
          />
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            How it works
          </p>

          <h3 className="mt-3 text-3xl font-bold md:text-4xl">
            From complaint to resolution.
          </h3>

          <p className="mt-5 text-slate-400">
            DSCE Connect creates a transparent path between the person
            reporting an issue and the authority responsible for resolving it.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-4">
          <Step
            number="01"
            title="Submit"
            description="Describe the issue and provide relevant details."
          />

          <Step
            number="02"
            title="AI Analysis"
            description="AI assists with category, priority and routing."
          />

          <Step
            number="03"
            title="Authority Action"
            description="The appropriate authority investigates and takes action."
          />

          <Step
            number="04"
            title="Resolution"
            description="The user tracks the outcome and receives updates."
          />
        </div>
      </section>

      {/* AI Section */}
      <section className="border-y border-white/10 bg-blue-500/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                Intelligent campus
              </p>

              <h3 className="mt-3 text-4xl font-bold">
                More than a complaint box.
              </h3>

              <p className="mt-6 leading-8 text-slate-300">
                DSCE Connect uses AI to assist administrators in understanding
                incoming issues, identifying potentially related complaints,
                recommending priority and routing issues to the appropriate
                department.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <AICard title="Smart Categorization" />
              <AICard title="Priority Recommendation" />
              <AICard title="Related Issue Detection" />
              <AICard title="Issue Summarization" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center">
        <h3 className="text-4xl font-bold">
          See a problem? Make it visible.
        </h3>

        <p className="mx-auto mt-5 max-w-xl text-slate-400">
          Report campus issues and help build a more responsive and
          accountable DSCE community.
        </p>

        <a
          href="/login"
          className="mt-8 inline-block rounded-xl bg-blue-500 px-8 py-4 font-semibold transition hover:bg-blue-400"
        >
          Get Started
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-6 py-8 text-sm text-slate-500 md:flex-row">
          <p>© 2026 DSCE Connect</p>
          <p>Report. Track. Resolve.</p>
        </div>
      </footer>
    </main>
  );
}

function Feature({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
      <p className="text-sm font-semibold text-blue-400">{number}</p>
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="mt-3 leading-7 text-slate-400">{description}</p>
    </div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 p-6">
      <div className="text-sm font-semibold text-blue-400">{number}</div>
      <h4 className="mt-4 text-lg font-semibold">{title}</h4>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        {description}
      </p>
    </div>
  );
}

function AICard({ title }: { title: string }) {
  return (
    <div className="rounded-xl border border-blue-400/10 bg-slate-950/60 p-5">
      <div className="mb-3 h-2 w-2 rounded-full bg-blue-400" />
      <p className="font-medium">{title}</p>
    </div>
  );
}