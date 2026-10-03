import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';
import { ExternalIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Work with me',
  description:
    'Full-stack builds, payment flows, protected content and AI automation for businesses. Scoped tight, shipped with receipts.',
  alternates: { canonical: '/work' },
};

const offers = [
  {
    title: 'Full-stack micro-apps',
    body: 'Next.js frontends, typed APIs and a database. One painful workflow, solved end to end.',
  },
  {
    title: 'Payments & provisioning',
    body: 'Razorpay checkout with HMAC-verified webhooks. Access granted by the server. Zero manual provisioning.',
  },
  {
    title: 'Protected content delivery',
    body: 'Canvas-rendered, view-only document readers with per-user watermarks and gated streaming.',
  },
  {
    title: 'AI automation & evaluation',
    body: 'LLM pipelines with schema validation, retries and a test suite. Built so you can trust the output.',
  },
];

const caseStudy = [
  ['Library', '5 books with chapter drawers and topic notes'],
  ['Reader', 'pdfjs-dist renders to an HTML5 canvas, no native download'],
  ['Anti-piracy', 'Email, phone and IP watermark on every page'],
  ['Payments', 'Razorpay with HMAC SHA-256 webhook provisioning'],
  ['Tests', 'Timed MCQs with 0.25 negative marking and review'],
];

const process = [
  ['Scope', 'One call. I write down the bottleneck, the constraint and what done means.'],
  ['Architecture', 'A short written design before any code. You approve the trade-offs.'],
  ['Build', 'Weekly demos on a live preview URL. Every change goes through a pull request.'],
  ['Verify', 'Tests on the money paths. Edge cases written down, not discovered by your users.'],
  ['Hand over', 'Repository, deployment, documentation. You own all of it.'],
];

export default function Work() {
  return (
    <div className="mx-auto max-w-wide px-5 sm:px-8">
      <header className="border-b border-rule py-16">
        <h1 className="max-w-3xl font-display text-[2.2rem] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[3rem]">
          Clients do not pay for code complexity.
          <span className="block text-muted">They pay for zero operational friction.</span>
        </h1>
        <p className="mt-6 max-w-reading text-[1.0625rem] leading-relaxed text-muted">
          I build software for businesses with one expensive manual problem. Client work since
          July 2026. I am a final-year engineering student. You work with me directly, and you
          get the repository.
        </p>
        <a
          href={`mailto:${site.email}?subject=Project%20enquiry`}
          className="mt-8 inline-block rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90"
        >
          Start a project
        </a>
      </header>

      <section className="py-16">
        <h2 className="text-xl font-semibold tracking-[-0.02em]">What I build</h2>
        <dl className="mt-6 grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {offers.map((o) => (
            <div key={o.title} className="border-t border-rule pt-5">
              <dt className="text-lg font-semibold tracking-[-0.01em]">{o.title}</dt>
              <dd className="mt-2 text-[.95rem] leading-relaxed text-muted">{o.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-t border-rule py-16">
        <h2 className="text-[1.8rem] font-semibold tracking-[-0.02em]">Case study: Finance PSU Guide</h2>
        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="space-y-4 text-[1.0625rem] leading-relaxed text-muted">
            <p>July 2026. A client needed a learning platform for PSU Finance Officer exams.</p>
            <p>
              The constraint: paid study PDFs that students can read but cannot download.
            </p>
            <p>Instead of a bloated LMS subscription, I built this. It is live.</p>
          </div>
          <dl className="divide-y divide-rule rounded-2xl bg-raised px-6 py-2">
            {caseStudy.map(([k, v]) => (
              <div key={k} className="grid gap-1 py-3 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4">
                <dt className="text-sm font-medium text-ink">{k}</dt>
                <dd className="text-sm text-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/projects/finance-psu-guide" className="font-medium text-ink underline decoration-accent/50 underline-offset-4 hover:decoration-accent">
            Read the architecture
          </Link>
          <a href="https://github.com/Sasisundar2211/finance_psu_guide" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-muted hover:text-ink">
            Repository <ExternalIcon />
          </a>
        </div>
      </section>

      <section className="border-t border-rule py-16">
        <h2 className="text-xl font-semibold tracking-[-0.02em]">How I work</h2>
        <ol className="mt-6 grid gap-px overflow-hidden rounded-xl border border-rule bg-rule sm:grid-cols-5">
          {process.map(([step, body]) => (
            <li key={step} className="bg-paper p-5">
              <h3 className="font-semibold">{step}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-rule py-16">
        <div className="rounded-2xl bg-raised p-8 sm:p-12">
          <h2 className="max-w-2xl font-display text-[1.6rem] font-semibold leading-snug tracking-[-0.02em]">
            Send me the manual task that costs you the most hours each week.
          </h2>
          <p className="mt-3 max-w-reading text-muted">
            I reply with whether I can fix it, how, and roughly how long it takes. If I cannot, I say so.
          </p>
          <a
            href={`mailto:${site.email}?subject=Project%20enquiry`}
            className="mt-6 inline-block rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90"
          >
            Start a project
          </a>
          <p className="mt-3 text-sm text-faint">{site.email}</p>
        </div>
      </section>
    </div>
  );
}
