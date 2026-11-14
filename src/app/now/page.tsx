import type { Metadata } from 'next';
import { ArrowList } from '@/components/Cards';

export const metadata: Metadata = {
  title: 'Now',
  description: 'What Sasi Sundar is working on right now: Finance PSU Guide, grad school prep, CommandBuild, and fundamentals.',
  alternates: { canonical: '/now' },
};

const updated = '14 November 2026';

export default function Now() {
  return (
    <div className="mx-auto max-w-wide px-5 sm:px-8">
      <div className="max-w-reading py-16">
        <h1 className="text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
          Now (Updated November 2026)
        </h1>
        <p className="mt-3 text-sm text-faint">Last updated {updated}</p>

        <p className="mt-10 text-[1.0625rem] leading-relaxed text-ink/90">
          Four priorities run my schedule right now:
        </p>
        <ArrowList
          className="mt-5 text-[1.0625rem] text-ink/90"
          items={[
            <><strong className="font-semibold text-ink">Finishing Finance PSU Guide:</strong> Taking my ₹30,000 client build from 70% to 100% delivery.</>,
            <><strong className="font-semibold text-ink">Preparing for Grad School:</strong> Starting IELTS prep in December 2026 for a Fall 2027 Master&rsquo;s in the USA.</>,
            <><strong className="font-semibold text-ink">Launching CommandBuild:</strong> Going live on December 1, 2026 with LinkedIn command-line tutorials and 5-page PDF guides.</>,
            <><strong className="font-semibold text-ink">Mastering Fundamentals:</strong> Daily terminal study in Python, DSA, DevOps, Kubernetes, and agent loop engineering.</>,
          ]}
        />
      </div>
    </div>
  );
}
