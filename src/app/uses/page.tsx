import type { Metadata } from 'next';

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
    <div className="mx-auto max-w-wide px-5 sm:px-8">
      <div className="max-w-reading py-14">
        <h1 className="text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Uses</h1>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted">
          What I actually build with. Everything listed appears in a public repository. Where I am
          still learning something, it says so, because a stack page that lists aspirations is a
          stack page nobody can trust.
        </p>

        <div className="mt-12 space-y-10">
          {groups.map((g) => (
            <section key={g.heading}>
              <h2 className="border-b border-rule pb-2 text-lg font-semibold tracking-[-0.01em]">
                {g.heading}
              </h2>
              {g.note && <p className="mt-3 text-sm italic text-faint">{g.note}</p>}
              <dl className="mt-4 space-y-3">
                {g.items.map(([name, note]) => (
                  <div key={name} className="grid gap-1 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-4">
                    <dt className="font-medium text-ink">{name}</dt>
                    <dd className="text-[.95rem] leading-relaxed text-muted">{note}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
