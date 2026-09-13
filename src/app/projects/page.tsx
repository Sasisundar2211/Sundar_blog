import type { Metadata } from 'next';
import { projects } from '@/lib/projects';
import { ProjectCard } from '@/components/Cards';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Public engineering work: AI change verification tooling, a FastAPI procurement service, and a regression pipeline with interpretability. Every figure is reproducible from the repository.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsIndex() {
  return (
    <div className="mx-auto max-w-wide px-5 sm:px-8">
      <header className="border-b border-rule py-14">
        <h1 className="font-serif text-[2rem] font-semibold tracking-[-0.02em] sm:text-[2.5rem]">Projects</h1>
        <p className="mt-4 max-w-reading text-[1.0625rem] leading-relaxed text-muted">
          Everything here is public and every number is reproducible by cloning the repository. Where
          a project has a limitation that matters, it is written on the page rather than left for you
          to discover.
        </p>
      </header>
      <div className="grid gap-5 py-10 sm:grid-cols-2">
        {projects.map((p) => <ProjectCard key={p.slug} project={p} />)}
      </div>
    </div>
  );
}
