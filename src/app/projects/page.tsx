import type { Metadata } from 'next';
import { projects } from '@/lib/projects';
import { ProjectRow } from '@/components/Cards';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Client builds, automations and open source work, each with its current status: in development, paused, or reproducible.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsIndex() {
  return (
    <div className="mx-auto max-w-wide px-5 sm:px-8">
      <header className="border-b border-rule py-14">
        <h1 className="text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Projects</h1>
        <p className="mt-4 max-w-reading text-[1.0625rem] leading-relaxed text-muted">
          Each project states where it stands: in development, paused, or reproducible. Where the
          code is public, the page links to it.
        </p>
      </header>
      <ul className="divide-y divide-rule py-6">
        {projects.map((p) => <ProjectRow key={p.slug} project={p} />)}
      </ul>
    </div>
  );
}
