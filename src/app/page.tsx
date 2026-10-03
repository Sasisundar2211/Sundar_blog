import Link from 'next/link';
import { getAll } from '@/lib/content';
import { featuredProjects } from '@/lib/projects';
import { ArticleRow, ProjectRow, SectionHeading } from '@/components/Cards';
import { site } from '@/lib/site';
import { ExternalIcon } from '@/components/Icons';

export default function Home() {
  const posts = getAll('posts').slice(0, 3);

  return (
    <div className="mx-auto max-w-wide px-5 sm:px-8">
      {/* Hero: who, what, where to go next. Readable in two seconds. */}
      <section className="pb-20 pt-16 sm:pb-24 sm:pt-24">
        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
          I build AI evaluation tools and client software.
        </h1>
        <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-muted">
          I&rsquo;m {site.name}, a final-year AI &amp; ML student (Class of 2027). Every project
          here links to its code.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:opacity-90 active:scale-[0.98]"
          >
            See my work
          </Link>
          <Link
            href="/work"
            className="rounded-lg border border-rule px-5 py-2.5 text-sm font-medium text-ink transition hover:border-ink/40 active:scale-[0.98]"
          >
            Work with me
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
          <h2 className="text-2xl font-semibold tracking-[-0.02em]">Hiring for 2027, or need software built?</h2>
          <p className="mt-3 max-w-reading text-muted">
            I reply to every email about a role or a project.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <a
              href={`mailto:${site.email}`}
              className="rounded-lg bg-ink px-5 py-2.5 font-medium text-paper transition hover:opacity-90 active:scale-[0.98]"
            >
              Email me
            </a>
            <a href={site.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-muted hover:text-ink">GitHub <ExternalIcon /></a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-muted hover:text-ink">LinkedIn <ExternalIcon /></a>
          </div>
        </div>
      </section>
    </div>
  );
}
