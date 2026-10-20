import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Now',
  description: 'What Sasi Sundar is building, fixing and learning right now.',
  alternates: { canonical: '/now' },
};

import { Page, PageHead, ledgerGrid } from '@/components/Ledger';

const updated = '2 October 2026';

export default function Now() {
  return (
    <Page>
      <PageHead title="What I am doing this month" margin={<p>Last updated {updated}</p>} />
      <div className={`${ledgerGrid} border-t-2 border-ink pt-10`}>
        <div aria-hidden />
        <div className="prose-editorial max-w-reading [&>h2:first-child]:mt-0">
          <h2>Running</h2>
          <p>
            Finance PSU Guide. A live client platform since July 2026. Improving the protected
            reader, the Razorpay webhook path and the mock-test engine.
          </p>

          <h2>Publishing</h2>
          <p>
            CommandBuild. Day 1 was 30 September 2026. Build breakdowns with the repository,
            the terminal log and the failure modes attached.
          </p>

          <h2>Building</h2>
          <p>
            Vouqis Verify. Making the evidence report useful, not just present. What a reviewer
            needs to see, in what order, and what the tool says when it cannot gather evidence.
          </p>
          <p>
            Next: reproducible eval benchmarks with the run count printed beside every number.
          </p>

          <h2>Learning</h2>
          <ul>
            <li>Agent orchestration: when to let a coding agent run, and where to stop it</li>
            <li>Evaluation design for non-deterministic systems</li>
            <li>Token economics: prompt caching and context pruning</li>
          </ul>

          <h2>Looking for</h2>
          <p>
            New-grad roles for 2027: AI engineering, applied AI and software engineering. Open
            to relocation. I work from India on UTC+5:30 with daily overlap into European hours.
          </p>
          <p>
            Client work: one or two focused builds alongside study. See{' '}
            <a href="/work">work with me</a>.
          </p>
        </div>
      </div>
    </Page>
  );
}
