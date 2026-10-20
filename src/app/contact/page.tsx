import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { Page, PageHead, ledgerGrid } from '@/components/Ledger';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Sasi Sundar.',
  alternates: { canonical: '/contact' },
};

const channels = [
  ['Email', `mailto:${site.email}`, site.email],
  ['GitHub', site.github, 'Sasisundar2211'],
  ['LinkedIn', site.linkedin, 'sasi-sundar'],
  ['X', site.x, '@SasiSundar09'],
] as const;

export default function Contact() {
  return (
    <Page>
      <PageHead
        title="Contact"
        margin={<p>{site.location}</p>}
        intro={
          <p>
            Three things get a fast reply: a 2027 role, a client project with one clear bottleneck, or
            a place where I got something wrong. For project enquiries, see{' '}
            <a href="/work" className="ln">work with me</a>.
          </p>
        }
      />
      <dl className="border-t-2 border-ink">
        {channels.map(([label, href, text]) => (
          <div key={label} className={`${ledgerGrid} items-baseline border-b border-rule py-6`}>
            <dt className="font-sans text-sm text-faint">{label}</dt>
            <dd className="min-w-0">
              <a
                href={href}
                {...(href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noreferrer' })}
                className="break-all font-serif text-[clamp(1.5rem,3.6vw,2.5rem)] leading-tight tracking-[-0.015em] text-ink underline decoration-rule decoration-1 underline-offset-[8px] transition-colors hover:text-accent hover:decoration-accent"
              >
                {text}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </Page>
  );
}
