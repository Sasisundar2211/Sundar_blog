import Link from 'next/link';
import { getAll } from '@/lib/content';
import { featuredProjects } from '@/lib/projects';
import { ArticleCard, ProjectCard, SectionHeading } from '@/components/Cards';
import { site } from '@/lib/site';

export default function Home() {
  const posts = getAll('posts');
  const notes = getAll('notes');
  const featured = posts.filter((p) => p.frontmatter.featured).slice(0, 1);
  const recent = posts.filter((p) => !featured.includes(p)).slice(0, 4);

  return (
    <div className="mx-auto max-w-wide px-5 sm:px-8">
      {/* Editorial opening */}
      <section className="border-b border-rule py-16 sm:py-20">
        <p className="text-xs uppercase tracking-[.16em] text-accent">{site.tagline}</p>
        <h1 className="mt-5 max-w-3xl font-serif text-[2.1rem] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[2.9rem]">
          I build developer tooling for AI systems, and write down what breaks.
        </h1>
        <div className="mt-6 max-w-reading space-y-4 text-[1.0625rem] leading-relaxed text-muted">
          <p>
            I am a final-year B.Tech student in Artificial Intelligence and Machine Learning,
            graduating in 2027. Most of what I publish comes out of building things that then
            behave in ways I did not expect.
          </p>
          <p>
            The recurring question underneath all of it: when an AI-touching change reaches a pull
            request, what evidence does a reviewer actually need in order to say yes?
          </p>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <Link href="/writing" className="link-underline font-medium text-ink">Read the writing</Link>
          <a href={site.github} target="_blank" rel="noreferrer" className="text-muted hover:text-ink">GitHub ↗</a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className="text-muted hover:text-ink">LinkedIn ↗</a>
          <a href="/rss.xml" className="text-muted hover:text-ink">RSS</a>
        </div>
      </section>

      <div className="grid gap-16 py-14 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-20">
        <div>
          {featured.length > 0 && (
            <section className="mb-16">
              <SectionHeading title="Featured" />
              {featured.map((d) => <ArticleCard key={d.slug} doc={d} featured />)}
            </section>
          )}

          <section className="mb-16">
            <SectionHeading title="Recent writing" href="/writing" hrefLabel="All writing" />
            {recent.map((d) => <ArticleCard key={d.slug} doc={d} />)}
          </section>

          <section className="mb-16">
            <SectionHeading title="Selected projects" href="/projects" hrefLabel="All projects" />
            <div className="grid gap-5 sm:grid-cols-2">
              {featuredProjects.map((p) => <ProjectCard key={p.slug} project={p} />)}
            </div>
          </section>

          {notes.length > 0 && (
            <section>
              <SectionHeading title="From the notebook" href="/notes" hrefLabel="All notes" />
              {notes.slice(0, 3).map((d) => <ArticleCard key={d.slug} doc={d} />)}
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-10 lg:pt-1">
          <section>
            <SectionHeading title="Current focus" />
            <ul className="space-y-3 text-sm text-muted">
              <li className="border-l-2 border-accent pl-3">
                <span className="block text-ink">Verification for AI-assisted changes</span>
                Building and testing what a review-time evidence report should contain.
              </li>
              <li className="border-l-2 border-rule pl-3">
                <span className="block text-ink">Evaluation inside CI</span>
                Where an eval gate belongs in a pipeline, and what it costs.
              </li>
              <li className="border-l-2 border-rule pl-3">
                <span className="block text-ink">Interpretability as debugging</span>
                Using LIME and surrogate models to find data faults, not to satisfy a checklist.
              </li>
            </ul>
            <Link href="/now" className="mt-4 inline-block text-xs text-muted hover:text-accent">
              What I am doing now →
            </Link>
          </section>

          <section>
            <SectionHeading title="Elsewhere" />
            <ul className="space-y-2 text-sm">
              <li><a href={site.github} target="_blank" rel="noreferrer" className="text-muted hover:text-ink">github.com/Sasisundar2211</a></li>
              <li><a href={site.linkedin} target="_blank" rel="noreferrer" className="text-muted hover:text-ink">LinkedIn</a></li>
              <li><a href={`mailto:${site.email}`} className="text-muted hover:text-ink">{site.email}</a></li>
            </ul>
          </section>

          <section className="border border-rule p-5">
            <h2 className="font-serif text-base text-ink">Follow the writing</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              No newsletter yet. RSS works today and I will not move it behind an email wall.
            </p>
            <a href="/rss.xml" className="mt-3 inline-block text-sm text-accent hover:underline">
              /rss.xml
            </a>
          </section>
        </aside>
      </div>
    </div>
  );
}
