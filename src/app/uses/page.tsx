import type { Metadata } from 'next';
import { Page, PageHead, Section } from '@/components/Ledger';

export const metadata: Metadata = {
  title: 'Uses',
  description: 'The tools and stack Sasi Sundar actually builds with, verified against public repositories.',
  alternates: { canonical: '/uses' },
};

const groups: { heading: string; note?: string; items: [string, string][] }[] = [
  {
    heading: 'Languages',
    items: [
      ['Python 3.11+', 'Everything on the backend and all ML work.'],
      ['TypeScript', 'Anything with a browser in front of it.'],
      ['SQL', 'Learning. Not yet in a project I would point at.'],
    ],
  },
  {
    heading: 'Backend & APIs',
    items: [
      ['FastAPI', 'Pydantic contracts on every handler. First used in the ProcureGuard experiment.'],
      ['Pydantic', 'Request and response schemas. Catches the class of bug that otherwise reaches the client.'],
      ['Flask', 'The TechSaksham resume-ranking service.'],
      ['Typer', 'The Vouqis Verify CLI.'],
    ],
  },
  {
    heading: 'Machine learning',
    items: [
      ['scikit-learn', 'Model comparison, randomised search, the tuned Gradient Boosting regressor.'],
      ['pandas / NumPy', 'Cleaning and feature work.'],
      ['LIME', 'Case-level explanation. Found a data bug my metrics did not.'],
      ['PyTorch', 'Not yet. Listed here so I do not accidentally claim it elsewhere.'],
    ],
  },
  {
    heading: 'Testing & CI',
    items: [
      ['pytest', '87 test cases across 9 modules in Vouqis Verify.'],
      ['GitHub Actions', 'CI on both main repositories, and the delivery mechanism for Vouqis Verify itself.'],
      ['Docker', 'Container builds, including a non-root runtime image.'],
    ],
  },
  {
    heading: 'Frontend',
    items: [
      ['Next.js (App Router)', 'This site, the Vouqis dashboard, firmrunner.'],
      ['Tailwind CSS', 'Styling everywhere.'],
      ['Supabase', 'Persistence and auth in firmrunner.'],
      ['pdfjs-dist', 'Canvas rendering for the view-only reader in Finance PSU Guide.'],
    ],
  },
  {
    heading: 'Payments',
    items: [
      ['Razorpay', 'Checkout plus HMAC SHA-256 verified webhooks. The server grants access, never the browser.'],
    ],
  },
  {
    heading: 'Models & APIs',
    note: 'Chosen per job rather than by preference.',
    items: [
      ['Google Gemini 1.5 Flash', 'Detection reasoning where latency and cost dominate.'],
      ['OpenAI API', 'Explanation generation where the output is read by a human.'],
    ],
  },
  {
    heading: 'Everyday',
    items: [
      ['VS Code', 'Primary editor.'],
      ['Claude Code', 'The execution team. I review every diff it produces.'],
      ['Make / n8n', 'Webhook and API automations where a full app is overkill.'],
      ['Wispr Flow', 'Voice drafting. I speak first drafts and cut them down by hand.'],
      ['Git + GitHub', 'Pull requests even when working alone. The review habit is the point.'],
      ['Vercel', 'Deployment for anything with a frontend.'],
      ['PyPI', 'Distribution for the CLI.'],
    ],
  },
];

export default function Uses() {
  return (
    <Page>
      <PageHead
        title="Uses"
        margin={<p>Verified against public repositories</p>}
        intro={
          <p>
            What I actually build with. Everything listed appears in a public repository. Where I am
            still learning something, it says so, because a stack page that lists aspirations is a
            stack page nobody can trust.
          </p>
        }
      />
      {groups.map((g) => (
        <Section key={g.heading} title={g.heading} margin={g.note}>
          <dl className="max-w-[52rem]">
            {g.items.map(([name, note]) => (
              <div key={name} className="grid gap-1 border-b border-rule py-3.5 first:pt-0 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-8">
                <dt className="font-serif text-[1.25rem] leading-snug text-ink">{name}</dt>
                <dd className="text-[1rem] leading-relaxed text-muted">{note}</dd>
              </div>
            ))}
          </dl>
        </Section>
      ))}
    </Page>
  );
}
