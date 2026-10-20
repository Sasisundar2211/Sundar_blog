import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';
import { ExternalIcon, ForwardIcon } from '@/components/Icons';
import { Page, PageHead, Section } from '@/components/Ledger';

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
    <Page>
      <PageHead
        size="xl"
        title={
          <>
            Clients do not pay for code complexity.{' '}
            <em className="text-accent">They pay for zero operational friction.</em>
          </>
        }
        margin={
          <ul className="space-y-1">
            <li className="text-ink">Client work since July 2026</li>
            <li>One or two builds at a time</li>
            <li>You get the repository</li>
          </ul>
        }
        intro={
          <>
            <p>
              I build software for businesses with one expensive manual problem. Client work since
              July 2026. I am a final-year engineering student. You work with me directly, and you
              get the repository.
            </p>
            <a href={`mailto:${site.email}?subject=Project%20enquiry`} className="action mt-9">
              Start a project <ForwardIcon />
            </a>
          </>
        }
      />

      <Section title="What I build">
        <dl className="grid gap-x-14 gap-y-10 md:grid-cols-2">
          {offers.map((o) => (
            <div key={o.title}>
              <dt className="font-serif text-[1.625rem] font-medium leading-tight tracking-[-0.015em]">{o.title}</dt>
              <dd className="mt-2 max-w-[42ch] text-[1.0625rem] leading-relaxed text-muted">{o.body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section
        title="Case study"
        margin={
          <>
            <p className="text-ink">Finance PSU Guide</p>
            <p>July 2026 · Live</p>
          </>
        }
      >
        <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="max-w-reading space-y-5 font-serif text-[1.375rem] leading-snug text-ink">
            <p>July 2026. A client needed a learning platform for PSU Finance Officer exams.</p>
            <p>
              The constraint: <em>paid study PDFs that students can read but cannot download.</em>
            </p>
            <p>Instead of a bloated LMS subscription, I built this. It is live.</p>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4 pt-4">
              <Link href="/projects/finance-psu-guide" className="action">
                Read the architecture <ForwardIcon />
              </Link>
              <a href="https://github.com/Sasisundar2211/finance_psu_guide" target="_blank" rel="noreferrer" className="ln inline-flex items-center gap-1 font-sans text-[1rem]">
                Repository <ExternalIcon />
              </a>
            </div>
          </div>
          <dl className="border-t border-ink">
            {caseStudy.map(([k, v]) => (
              <div key={k} className="grid gap-1 border-b border-rule py-3.5 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6">
                <dt className="font-sans text-sm font-medium text-ink">{k}</dt>
                <dd className="text-[.975rem] leading-relaxed text-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section title="How I work">
        <ol className="max-w-reading">
          {process.map(([step, body]) => (
            <li key={step} className="grid gap-1 border-b border-rule py-5 first:pt-0 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8">
              <h3 className="font-serif text-[1.375rem] italic leading-snug">{step}</h3>
              <p className="text-[1.0625rem] leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Start here">
        <p className="max-w-[24ch] font-serif text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.1] tracking-[-0.02em]">
          Send me the manual task that costs you the most hours each week.
        </p>
        <p className="mt-5 max-w-reading text-[1.0625rem] leading-relaxed text-muted">
          I reply with whether I can fix it, how, and roughly how long it takes. If I cannot, I say so.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <a href={`mailto:${site.email}?subject=Project%20enquiry`} className="action">
            Start a project <ForwardIcon />
          </a>
          <span className="font-sans text-sm text-faint">{site.email}</span>
        </div>
      </Section>
    </Page>
  );
}
