import Link from 'next/link';
import { ArrowList } from './Cards';
import { ForwardIcon } from './Icons';
import { LeadForm } from './LeadForm';

/** The guide is not written yet; every promise of it names this date. */
export const guideDate = 'December 1, 2026';

/** Leak 4: a zero-risk next step for visitors not ready to commission a build. */
export function AuditStrip() {
  return (
    <Link
      href="/work?intent=audit#intake"
      className="group flex flex-wrap items-center justify-between gap-x-6 gap-y-2 rounded-2xl border border-rule px-5 py-4 transition-colors hover:border-accent/50 sm:px-6"
    >
      <span className="text-[15px] text-ink">
        <span className="font-semibold">Not ready for a full build?</span> Get a free 15-minute workflow
        bottleneck audit first.
      </span>
      <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
        Request the audit <ForwardIcon />
      </span>
    </Link>
  );
}

/** Copy A: mid-page lead magnet. */
export function GuideBanner() {
  return (
    <div className="rounded-2xl bg-raised px-6 py-10 sm:px-10">
      <h2 className="text-2xl font-semibold tracking-[-0.02em]">
        Steal my exact Claude Code CLI setup (5-page Micro-SOP)
      </h2>
      <div className="mt-4 max-w-reading space-y-1 text-[15px] leading-relaxed text-muted">
        <p>I cannot write a standalone Python backend from scratch without AI yet.</p>
        <p>
          Using a strict <code className="font-mono text-[.9em] text-ink">CLAUDE.md</code> file and terminal
          verification loop lets me ship full-stack client portals solo.
        </p>
      </div>
      <p className="mt-5 text-[15px] font-medium text-ink">Get the exact setup guide I use daily:</p>
      <ArrowList
        className="mt-3 max-w-reading text-[15px] text-muted"
        items={[
          <>My <code className="font-mono text-[.9em] text-ink">CLAUDE.md</code> repository rules template</>,
          'The 7 terminal commands I run before every commit',
          'My 4-node n8n + API lead enrichment blueprint',
        ]}
      />
      <div className="mt-6 max-w-xl">
        <LeadForm
          variant="optin"
          intent="guide"
          submitLabel="Send me the 5-page PDF"
          successMessage={`You're on the list. I'll send the PDF by ${guideDate}, with the CommandBuild WhatsApp invite.`}
        />
      </div>
      <p className="mt-4 text-sm text-faint">
        The guide is still being written: I&rsquo;ll send it by {guideDate}. Includes an invite to the free
        CommandBuild AI &amp; CLI WhatsApp group (launching {guideDate}).
      </p>
    </div>
  );
}

/** Copy B: end-of-post content upgrade. */
export function ToolkitBox() {
  return (
    <aside className="rounded-2xl bg-raised px-6 py-8 sm:px-8">
      <h2 className="text-xl font-semibold tracking-[-0.02em]">Want the runnable files behind this post?</h2>
      <p className="mt-3 text-[15px] leading-relaxed text-muted">
        I package every workflow I test into a copy-pasteable terminal guide. No fluff, no courses for sale.
      </p>
      <ArrowList
        className="mt-3 text-[15px] text-muted"
        items={[
          <>Get the <code className="font-mono text-[.9em] text-ink">CLAUDE.md</code> templates, JSON workflows, and CLI checklists in your inbox or WhatsApp.</>,
        ]}
      />
      <div className="mt-5">
        <LeadForm
          variant="optin"
          intent="toolkit"
          submitLabel="Get the free toolkit"
          successMessage={`Got it. I'll send the files for this post to you directly, by ${guideDate}.`}
        />
      </div>
    </aside>
  );
}

/** Copy C: intake that replaces mailto links. Leak 5: real capacity, no fake timers. */
export function IntakeCard() {
  return (
    <div id="intake" className="scroll-mt-24 rounded-2xl bg-raised px-6 py-10 sm:px-10">
      <h2 className="max-w-2xl text-2xl font-semibold tracking-[-0.02em]">
        Need a repetitive business workflow automated, or hiring for 2027 AI roles?
      </h2>
      <p className="mt-4 max-w-reading text-[15px] leading-relaxed text-muted">
        <span className="font-semibold text-ink">Current availability:</span> 1 solo client slot open for
        December 2026 (finishing Finance PSU Guide, a ₹30,000 build currently at 70%).
      </p>
      <div className="mt-6 max-w-2xl">
        <LeadForm
          variant="intake"
          submitLabel="Send. I reply within 12 hours"
          successMessage="Sent. I reply within 12 hours."
        />
      </div>
    </div>
  );
}

/** Leak 1: footer opt-in that replaces "Subscribe by RSS". */
export function FooterOptin() {
  return (
    <div>
      <p className="font-display text-[1.05rem] font-semibold text-ink">Join the CommandBuild CLI &amp; AI community</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Get my free 5-page Claude Code CLI setup guide and the WhatsApp group invite. Both arrive by {guideDate}.
      </p>
      <div className="mt-4">
        <LeadForm
          variant="optin"
          intent="guide"
          submitLabel="Get the free guide"
          successMessage={`You're in. The guide and WhatsApp invite arrive by ${guideDate}.`}
        />
      </div>
    </div>
  );
}
