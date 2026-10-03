import type { Metadata } from 'next';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Sasi Sundar.',
  alternates: { canonical: '/contact' },
};

export default function Contact() {
  return (
    <div className="mx-auto max-w-wide px-5 sm:px-8">
      <div className="max-w-reading py-14">
        <h1 className="text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Contact</h1>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted">
          Three things get a fast reply: a 2027 role, a client project with one clear bottleneck, or
          a place where I got something wrong. For project enquiries, see{' '}
          <a href="/work" className="text-ink underline decoration-accent/50 underline-offset-4 hover:decoration-accent">work with me</a>.
        </p>

        <dl className="mt-10 space-y-5">
          <div className="grid gap-1 border-b border-rule pb-4 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4">
            <dt className="text-xs uppercase tracking-wider text-faint">Email</dt>
            <dd><a href={`mailto:${site.email}`} className="text-ink underline decoration-accent/50 underline-offset-4 hover:decoration-accent">{site.email}</a></dd>
          </div>
          <div className="grid gap-1 border-b border-rule pb-4 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4">
            <dt className="text-xs uppercase tracking-wider text-faint">GitHub</dt>
            <dd><a href={site.github} target="_blank" rel="noreferrer" className="text-ink underline decoration-accent/50 underline-offset-4 hover:decoration-accent">Sasisundar2211</a></dd>
          </div>
          <div className="grid gap-1 border-b border-rule pb-4 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4">
            <dt className="text-xs uppercase tracking-wider text-faint">LinkedIn</dt>
            <dd><a href={site.linkedin} target="_blank" rel="noreferrer" className="text-ink underline decoration-accent/50 underline-offset-4 hover:decoration-accent">sasi-sundar</a></dd>
          </div>
          <div className="grid gap-1 border-b border-rule pb-4 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4">
            <dt className="text-xs uppercase tracking-wider text-faint">X</dt>
            <dd><a href={site.x} target="_blank" rel="noreferrer" className="text-ink underline decoration-accent/50 underline-offset-4 hover:decoration-accent">@SasiSundar09</a></dd>
          </div>
          <div className="grid gap-1 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4">
            <dt className="text-xs uppercase tracking-wider text-faint">Based in</dt>
            <dd className="text-muted">{site.location}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
