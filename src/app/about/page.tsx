import type { Metadata } from 'next';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'B. S. V. Sasi Sundar. Final-year B.Tech in AI & Machine Learning, Class of 2027. AI-native builder of client platforms and AI evaluation tooling.',
  alternates: { canonical: '/about' },
};

export default function About() {
  return (
    <div className="mx-auto max-w-wide px-5 sm:px-8">
      <div className="max-w-reading py-16">
        <p className="eyebrow">About</p>
        <h1 className="mt-5 font-display text-[2.2rem] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[2.8rem]">
          I am a builder. My authority is the repository, not the title.
        </h1>

        <div className="prose-editorial mt-10">
          <p>
            I am {site.fullName}. I finish a B.Tech in Artificial Intelligence and Machine
            Learning in July 2027.
          </p>
          <p>
            I am an AI-native practitioner. I direct coding agents from the terminal, wire up APIs,
            and ship with Next.js, Supabase, Make and n8n.
          </p>
          <p>
            I do not call myself a founder or a CEO. Nothing I run is incorporated or funded. I
            ship code, measure it, and publish what broke.
          </p>

          <h2>The thesis</h2>
          <blockquote>
            <p>{site.thesis}</p>
          </blockquote>
          <p>
            AI writes syntax faster than I do. It does not decide what to build, where the system
            fails, or when the output is safe to trust. That part stays with me.
          </p>
          <p>
            The hardest part of building with AI is not making it work. It is knowing when you can
            trust it.
          </p>

          <h2>What I work on</h2>
          <p>
            <strong>Client platforms, since July 2026.</strong>{' '}
            <a href="/projects/finance-psu-guide">Finance PSU Guide</a> is a live commercial
            exam-prep platform. A canvas-rendered, watermarked PDF reader. Razorpay payments
            provisioned by signed webhooks. A timed mock-test engine.
          </p>
          <p>
            <strong>Evaluation and verification.</strong>{' '}
            <a href="/projects/vouqis-verify">Vouqis Verify</a> is a CLI and GitHub Action. It
            detects AI-related changes in a pull request, runs the repository&rsquo;s eval command,
            and posts an evidence report to the PR. 87 tests across 9 modules.
          </p>
          <p>
            <strong>Build breakdowns, since 30 September 2026.</strong> CommandBuild is the page
            where I publish what I build, how it works, and what broke.
          </p>
          <p>
            <strong>Applied ML.</strong>{' '}
            <a href="/projects/energy-star-regression">A regression pipeline</a> on NYC energy data.
            R² 0.824 on 2,776 holdout rows. The interpretability layer found a data bug the metrics
            missed.
          </p>

          <h2>Experience</h2>
          <p>
            2025: AI/ML internship at BITS Pilani, Hyderabad Campus. I built supervised learning
            models in Python and scikit-learn.
          </p>
          <p>
            2025: selected nationally for the Microsoft and SAP TechSaksham programme through
            AICTE. I built a resume-ranking service in Flask and presented it to engineers from
            both companies.
          </p>
          <p>Accepted: AI and Automation internship at FTSITS Ltd.</p>

          <h2>How I write</h2>
          <p>Every technical claim on this site links to the commit or file it rests on.</p>
          <p>
            Every metric carries its denominator. &ldquo;28 out of 40 edge cases&rdquo;, never
            &ldquo;70% better&rdquo;. If I cannot point at the line, I do not write the sentence.
          </p>

          <h2>What I have not done yet</h2>
          <p>
            I have not run a system at production scale or carried a pager. I have not trained a
            model larger than a scikit-learn ensemble. Vouqis Verify has no external users yet.
            ProcureGuard was an experiment I never shipped.
          </p>
          <p>Those are gaps I am closing. I would rather state them than hide them.</p>

          <h2>What I am looking for</h2>
          <p>
            New-grad roles for 2027 in AI engineering, applied AI and software engineering. Open
            to relocation, including international offices.
          </p>

          <h2>Elsewhere</h2>
          <ul>
            <li><a href={site.github} target="_blank" rel="noreferrer">GitHub</a>: everything I build is public</li>
            <li><a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a href={site.x} target="_blank" rel="noreferrer">X</a></li>
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
