import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowList } from '@/components/Cards';
import { IntakeCard } from '@/components/Conversion';

export const metadata: Metadata = {
  title: 'Work with me',
  description:
    'Custom web platforms and business automations, built solo from the command line. Current proof: Finance PSU Guide.',
  alternates: { canonical: '/work' },
};

export default function Work() {
  return (
    <div className="mx-auto max-w-wide px-5 sm:px-8">
      <div className="max-w-reading py-16">
        <h1 className="text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Work With Me</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          Small businesses waste thousands of rupees on manual workflows that deterministic
          software solves in minutes.
        </p>

        <p className="mt-10 text-[1.0625rem] leading-relaxed text-ink/90">
          I build two things solo from the command line:
        </p>
        <ArrowList
          className="mt-5 text-[1.0625rem] text-ink/90"
          items={[
            <><strong className="font-semibold text-ink">Custom Web Platforms:</strong> Full-stack Next.js and Supabase portals with payment webhooks and view-only document protection.</>,
            <><strong className="font-semibold text-ink">Business Automations:</strong> API and n8n pipelines that scrape leads, sync CRMs, and eliminate repetitive data entry.</>,
          ]}
        />

        <p className="mt-10 text-[1.0625rem] leading-relaxed text-ink/90">
          Current proof:{' '}
          <Link href="/projects/finance-psu-guide" className="font-medium text-ink underline decoration-accent/50 underline-offset-4 hover:decoration-accent">
            Finance PSU Guide
          </Link>{' '}
          (₹30,000 solo client build, currently 70% complete).
        </p>

        <div className="mt-12">
          <IntakeCard />
        </div>
      </div>
    </div>
  );
}
