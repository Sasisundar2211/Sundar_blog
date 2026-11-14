import Link from 'next/link';
import { getAll } from '@/lib/content';
import { featuredProjects } from '@/lib/projects';
import { ArrowList, ArticleRow, ProjectRow, SectionHeading } from '@/components/Cards';
import { ExternalIcon, ForwardIcon } from '@/components/Icons';
import { site } from '@/lib/site';

export default function Home() {
  const posts = getAll('posts').slice(0, 3);

  return (
    <div className="mx-auto max-w-wide px-5 sm:px-8">
      {/* Hero: what it is, who it is for, why it matters, what to do next. */}
      <section className="pb-16 pt-8 sm:pb-20 sm:pt-20">
        <p className="text-[12px] text-muted sm:text-[13px]">
          B. S. V. Sasi Sundar · Final-Year AIML (Class of 2027) · Visakhapatnam, India
        </p>
        <h1 className="mt-3 max-w-4xl text-[1.75rem] font-semibold leading-[1.12] tracking-[-0.03em] sm:mt-4 sm:text-[2.75rem] sm:tracking-[-0.035em]">
          I ship full-stack web platforms and AI automations from the command line.
        </h1>
        <div className="mt-4 max-w-[42rem] space-y-2.5 text-[15px] leading-relaxed text-ink sm:mt-6 sm:space-y-3 sm:text-base">
          <p>
            <strong className="font-semibold">For founders &amp; businesses:</strong> I replace slow,
            manual data entry and bloated software with custom Next.js portals and n8n/API pipelines.
          </p>
          <p>
            <strong className="font-semibold">For 2027 hiring teams:</strong> I share reproducible
            terminal workflows, evaluation harnesses, and live client architecture for Applied AI,
            Forward Deployed, and SWE roles.
          </p>
        </div>
        <p className="mt-3 max-w-[42rem] text-[14px] leading-relaxed text-muted sm:mt-4 sm:text-[15px]">
          Every build here links to real code and honest progress logs (currently completing{' '}
          <Link href="/projects/finance-psu-guide" className="text-ink underline decoration-accent/50 underline-offset-4 hover:decoration-accent">
            Finance PSU Guide
          </Link>
          , a ₹30,000 solo client platform).
        </p>
        <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-paper transition hover:opacity-90 active:scale-[0.98] sm:px-5"
          >
            Hire me for a build <ForwardIcon />
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 rounded-lg border border-rule px-4 py-2.5 text-sm font-medium text-ink transition hover:border-ink/40 active:scale-[0.98] sm:px-5"
          >
            Inspect my projects &amp; code <ForwardIcon />
          </Link>
        </div>
      </section>

      {/* Work */}
      <section className="border-t border-rule py-14">
        <SectionHeading title="Selected work" href="/projects" hrefLabel="All projects" />
        <ul className="divide-y divide-rule">
          {featuredProjects.map((p) => <ProjectRow key={p.slug} project={p} />)}
        </ul>
      </section>

      {/* Writing */}
      <section className="border-t border-rule py-14">
        <SectionHeading title="Latest writing" href="/writing" hrefLabel="All writing" />
        <ul className="divide-y divide-rule">
          {posts.map((d) => <ArticleRow key={d.slug} doc={d} />)}
        </ul>
      </section>

      {/* Contact */}
      <section className="border-t border-rule py-14">
        <div className="rounded-2xl bg-raised px-6 py-10 sm:px-10">
          <h2 className="text-2xl font-semibold tracking-[-0.02em]">
            Hiring for 2027 AI roles, or need custom software built?
          </h2>
          <p className="mt-3 max-w-reading text-muted">
            I reply to every email about 2027 roles, client builds, or command-line workflows.
          </p>
          <ArrowList
            className="mt-5 max-w-reading text-[.95rem] text-muted"
            items={[
              <><span className="font-medium text-ink">Target roles:</span> Applied AI Engineer, Forward Deployed Engineer, Solutions Architect, Software Engineer</>,
              <><span className="font-medium text-ink">Publishing hub:</span> CommandBuild (launching December 1, 2026 on LinkedIn)</>,
            ]}
          />
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <a
              href={`mailto:${site.email}`}
              className="rounded-lg bg-ink px-5 py-2.5 font-medium text-paper transition hover:opacity-90 active:scale-[0.98]"
            >
              Email me
            </a>
            <a href={site.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-muted hover:text-ink">GitHub <ExternalIcon /></a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-muted hover:text-ink">LinkedIn <ExternalIcon /></a>
            <a href={site.x} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-muted hover:text-ink">X <ExternalIcon /></a>
          </div>
        </div>
      </section>
    </div>
  );
}
