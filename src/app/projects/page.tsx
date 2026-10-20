import type { Metadata } from 'next';
import { projects } from '@/lib/projects';
import { ProjectRow } from '@/components/Cards';
import { Page, PageHead } from '@/components/Ledger';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Public engineering work: AI change verification tooling, a FastAPI procurement service, and a regression pipeline with interpretability. Every figure is reproducible from the repository.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsIndex() {
  return (
    <Page>
      <PageHead
        title="Projects"
        margin={<p>{projects.length} entries, all public</p>}
        intro={
          <p>
            Everything here is public and every number is reproducible by cloning the repository. Where
            a project has a limitation that matters, it is written on the page rather than left for you
            to discover.
          </p>
        }
      />
      <ul className="border-t-2 border-ink">
        {projects.map((p) => <ProjectRow key={p.slug} project={p} />)}
      </ul>
    </Page>
  );
}
