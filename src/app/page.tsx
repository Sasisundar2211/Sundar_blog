import Link from 'next/link';
import { getAll } from '@/lib/content';
import { featuredProjects } from '@/lib/projects';
import { ArticleRow, ProjectRow } from '@/components/Cards';
import { Page, PageHead, Section } from '@/components/Ledger';
import { site } from '@/lib/site';
import { ForwardIcon } from '@/components/Icons';

export default function Home() {
  const posts = getAll('posts').slice(0, 3);

  return (
    <Page>
      <PageHead
        size="xl"
        title={<>I build AI evaluation tools and <em className="text-accent">client software.</em></>}
        margin={
          <ul className="space-y-1">
            <li className="text-ink">{site.name}</li>
            <li>B.Tech AI &amp; ML, Class of 2027</li>
            <li>Visakhapatnam, India</li>
            <li>UTC+5:30</li>
          </ul>
        }
        intro={
          <>
            <p>
              I&rsquo;m {site.name}, a final-year AI &amp; ML student (Class of 2027). Every project
              here links to its code.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-10 gap-y-4">
              <Link href="/projects" className="action">
                See my work <ForwardIcon />
              </Link>
              <Link href="/work" className="ln font-sans text-[1rem]">
                Work with me
              </Link>
            </div>
          </>
        }
      />

      <Section title="Selected work" href="/projects" hrefLabel="All projects">
        <ul className="-mt-7">
          {featuredProjects.map((p) => <ProjectRow key={p.slug} project={p} />)}
        </ul>
      </Section>

      <Section title="Latest writing" href="/writing" hrefLabel="All writing">
        <ul className="-mt-5">
          {posts.map((d) => <ArticleRow key={d.slug} doc={d} />)}
        </ul>
      </Section>
    </Page>
  );
}
