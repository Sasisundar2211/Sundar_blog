import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Now',
  description: 'What Sasi Sundar is currently building, reading and thinking about.',
  alternates: { canonical: '/now' },
};

const updated = '17 August 2026';

export default function Now() {
  return (
    <div className="mx-auto max-w-wide px-5 sm:px-8">
      <div className="max-w-reading py-14">
        <h1 className="font-serif text-[2rem] font-semibold tracking-[-0.02em] sm:text-[2.5rem]">Now</h1>
        <p className="mt-3 text-sm text-faint">Last updated {updated}</p>

        <div className="prose-editorial mt-8">
          <h2>Building</h2>
          <p>
            Vouqis Verify. The current work is on making the evidence report useful rather than
            merely present: what a reviewer needs to see, in what order, and what the tool should
            say when it cannot gather the evidence at all.
          </p>

          <h2>Fixing</h2>
          <p>
            A duplicate one-hot column in my NYC energy regression, caused by an unstripped
            whitespace in the borough field. The cross-validation score never noticed. Re-running
            the pipeline and storing the baseline metric alongside the tuned one.
          </p>

          <h2>Learning</h2>
          <ul>
            <li>Evaluation design for non-deterministic systems, and where a gate belongs in CI</li>
            <li>MLOps fundamentals: model registries, reproducible pipelines, drift monitoring</li>
            <li>Enough TypeScript and Next.js to make the tooling usable by people who do not live in a terminal</li>
          </ul>

          <h2>Reading</h2>
          <p>
            Working through practical evaluation writing rather than frontier research: how teams
            actually decide an LLM feature is ready, and what they measure when accuracy is the
            wrong frame.
          </p>

          <h2>Looking for</h2>
          <p>
            AI Engineer, Applied AI Engineer, ML Engineer and Developer Tools Engineer roles for
            2027. Available in Bangalore and Hyderabad, open to relocation. I work from India on
            UTC+5:30 with daily overlap into European hours.
          </p>
        </div>
      </div>
    </div>
  );
}
