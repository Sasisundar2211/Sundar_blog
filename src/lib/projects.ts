/**
 * Every field below is verified against the public repository as of 17 Aug 2026.
 * Nothing here is aspirational. If a number cannot be reproduced by cloning the
 * repo and running the stated command, it does not belong in this file.
 */
export interface Project {
  slug: string;
  name: string;
  status: 'Active' | 'Complete' | 'Archived';
  /** One line for list rows. */
  tagline: string;
  summary: string;
  why: string;
  architecture: string[];
  decisions: { title: string; body: string }[];
  lessons: string[];
  stack: string[];
  facts: { label: string; value: string }[];
  repo: string;
  demo?: string;
  featured?: boolean;
  /** Card label. Client builds render it in the accent colour. */
  label?: string;
  client?: boolean;
}

export const projects: Project[] = [
  {
    slug: 'finance-psu-guide',
    tagline: 'Live exam-prep platform for a client. Protected reader, payments, mock tests.',
    name: 'Finance PSU Guide',
    status: 'Active',
    featured: true,
    client: true,
    label: 'Client build · Live',
    summary:
      'A commercial exam-preparation platform for PSU Finance Officer exams (AAI, Coal India, NTPC, BHEL). A book-style study library, a view-only PDF reader with per-user watermarks, Razorpay checkout with webhook provisioning, and a timed mock-test engine.',
    why:
      'My first client build, started July 2026. The client needed students to read paid study material without being able to download it. Off-the-shelf LMS products either expose the raw PDF or lock the client into a subscription they did not want. The real problem was narrower: serve a document, prove who opened it, and grant access only after a verified payment.',
    architecture: [
      'Next.js App Router frontend organised as a digital bookshelf: Accounting, Auditing, Financial Management, GST and the Companies Act, each expanding into chapters and topic notes.',
      'Source PDFs stay in private storage with no public URL. A streaming endpoint checks the session and an active enrollment before it sends a single byte.',
      'pdfjs-dist renders each page onto an HTML5 canvas, so the browser never receives a document it can save or print through its native toolbar.',
      'A translucent diagonal watermark carrying the reader\'s email, phone number and IP is drawn onto every rendered page.',
      'Context menu, save, print and inspector shortcuts are intercepted on the reader route.',
      'Razorpay checkout on the client. A server webhook verifies the HMAC SHA-256 signature, marks the order paid and creates a 3, 6 or 12-month enrollment.',
      'A timed MCQ engine with an answered / flagged / unvisited palette, auto-submit on timeout, and scoring with a 0.25 mark deduction per wrong answer.',
    ],
    decisions: [
      {
        title: 'The webhook is the source of truth, not the browser',
        body:
          'The checkout modal reports success in the browser, and a browser can lie or lose its connection. Access is granted only when the server receives a Razorpay webhook whose HMAC signature verifies. The client callback updates the UI. It never writes an enrollment.',
      },
      {
        title: 'Canvas rendering instead of an embedded PDF',
        body:
          'An iframe or object tag hands the browser the whole file and a download button. Rendering pages to a canvas means the client only ever holds pixels for the page on screen. It costs render time on large documents. That trade is acceptable for study notes.',
      },
      {
        title: 'Watermarks are the real control',
        body:
          'View-only on the web is deterrence, not DRM. Anyone can photograph a screen. The keyboard locks stop casual copying. The per-user watermark is what makes a leaked page traceable to one account, and that is what changes behaviour.',
      },
    ],
    lessons: [
      'Clients do not pay for code complexity. They pay for zero manual provisioning and zero leaked files.',
      'Every payment flow needs one place that decides whether money arrived. Two places means a support ticket.',
      'Naming the limit of a protection scheme up front builds more trust with a client than overselling it.',
    ],
    stack: ['Next.js', 'TypeScript', 'pdfjs-dist', 'Razorpay', 'Webhooks', 'Tailwind CSS'],
    facts: [
      { label: 'Engagement', value: 'Commercial client' },
      { label: 'Started', value: 'July 2026' },
      { label: 'Exams covered', value: 'AAI, Coal India, NTPC, BHEL' },
      { label: 'Study books', value: '5' },
      { label: 'Access tiers', value: '3, 6, 12 months' },
      { label: 'Status', value: 'Live' },
    ],
    repo: 'https://github.com/Sasisundar2211/finance_psu_guide',
  },
  {
    slug: 'vouqis-verify',
    tagline: 'CLI and GitHub Action that checks AI changes in pull requests.',
    name: 'Vouqis Verify',
    status: 'Active',
    featured: true,
    summary:
      'A CLI and composite GitHub Action that verifies AI-related changes inside a pull request. It detects changes on configured AI paths, runs the evaluation command the repository already has, and posts a structured review report back to the PR.',
    why:
      'Reviewing AI-generated code by reading it does not scale, and the parts of a codebase that touch prompts, agents, evals and model configuration are exactly the parts where a diff tells you least about behaviour. I wanted to know whether evidence for a change could be assembled automatically at review time rather than argued about after deploy.',
    architecture: [
      'A Python CLI (`vouqis`) published to PyPI, with subcommands for init, verify, doctor and JSON output.',
      'A git-diff layer that classifies changed paths against a configurable set of AI-relevant globs (prompts, agents, evals, models, RAG, tools).',
      'A runner that shells out to the evaluation command declared in `vouqis.yml`, defaulting to pytest.',
      'A report renderer producing a structured review package, posted to the pull request through the GitHub REST comments endpoint.',
      'A composite GitHub Action that installs the CLI and runs it, so adoption costs four lines of workflow YAML.',
      'A separate Next.js dashboard package in the same monorepo.',
    ],
    decisions: [
      {
        title: 'A composite Action, not a GitHub App',
        body:
          'A GitHub App would give richer permissions, a proper installation flow and webhook events. It also requires a registered App, a private key, JWT exchange and a server to receive webhooks. For a tool with no users, that is infrastructure serving a hypothetical. The composite Action authenticates with the token the workflow already has and needs nothing hosted. I want to be precise about this: there is no GitHub App in this project, and the README used to imply otherwise.',
      },
      {
        title: 'Run the evaluation the repo already has',
        body:
          'The tool does not define its own eval format. It runs whatever command the repository declares and treats the exit code and output as evidence. Inventing a competing eval standard would have been the fastest way to guarantee nobody adopts it.',
      },
      {
        title: 'Fail loudly on an unusable diff',
        body:
          'GitHub Actions clones shallow by default, so early versions could not distinguish "no AI paths changed" from "the diff could not be computed". Both produced an empty change set and both reported success. A verification tool that reports green when it could not do its job is worse than no tool at all.',
      },
    ],
    lessons: [
      'The hardest part was not detection. It was deciding what an honest "pass" means when the underlying signal is missing.',
      'Shallow clones are the default in CI and they silently change the semantics of every git operation you depend on.',
      'Writing the architecture docs before the dashboard forced the scope down considerably.',
    ],
    stack: ['Python', 'Typer', 'pytest', 'GitHub Actions', 'PyPI', 'Next.js', 'TypeScript'],
    facts: [
      { label: 'Commits', value: '12' },
      { label: 'Tests', value: '87 across 9 modules' },
      { label: 'Published versions', value: '0.1.1, 0.1.2' },
      { label: 'Licence', value: 'MIT' },
      { label: 'Users', value: 'None yet' },
    ],
    repo: 'https://github.com/Sasisundar2211/VouqisVerify',
    demo: 'https://vouqis.tech',
  },
  {
    slug: 'energy-star-regression',
    tagline: 'Regression pipeline. Interpretability found a bug the metrics missed.',
    name: 'NYC Energy Star Score Predictor',
    status: 'Complete',
    featured: true,
    summary:
      'A regression pipeline over the NYC 2016 Energy Benchmarking dataset. Five model families compared under cross-validation, the winner tuned by randomised search, then interpreted with LIME and a surrogate tree.',
    why:
      'Most student ML projects stop at model.fit() and a printed accuracy score. I wanted to build the second half properly: comparison, tuning, held-out evaluation, and interpretation. The interpretation is what found a bug the metrics never surfaced.',
    architecture: [
      'Cleaning stage reducing 9,535 raw records to 9,253 usable rows across 43 input features.',
      'A 70/30 train and holdout split with a fixed random seed.',
      'Five regression families compared under 5-fold shuffled K-fold cross-validation.',
      'A 40-trial randomised hyperparameter search over the winning family.',
      'Interpretation layer: cumulative feature importance, a depth-3 surrogate decision tree, and three LIME case studies.',
      'Metrics and tuned parameters persisted to a `model_meta.json` artifact rather than printed to a notebook cell.',
    ],
    decisions: [
      {
        title: 'Persist metrics to an artifact, not a notebook cell',
        body:
          'A number that exists only in notebook output is a number you cannot cite later. Writing the final metrics and best parameters to `model_meta.json` meant every figure quoted anywhere else about this project can be checked against a file in the repository.',
      },
      {
        title: 'Interpretation as debugging, not decoration',
        body:
          'The feature list revealed two columns for one borough, differing only by a trailing space in the source data. One-hot encoding an unstripped categorical had split that borough across two features. The cross-validation score never flinched. The interpretability layer is the only reason I found it.',
      },
    ],
    lessons: [
      'Interpretability tools earn their place as debugging instruments long before they become an ethics requirement.',
      'A metric with no stored baseline is a metric you cannot defend in a conversation.',
      'Comparing five model families costs an afternoon and removes all argument about the choice.',
    ],
    stack: ['Python', 'scikit-learn', 'pandas', 'LIME', 'matplotlib'],
    facts: [
      { label: 'Records', value: '9,535 raw / 9,253 cleaned' },
      { label: 'Train / holdout', value: '6,477 / 2,776' },
      { label: 'Input features', value: '43' },
      { label: 'Holdout MAE', value: '8.6064' },
      { label: 'Holdout R²', value: '0.824' },
    ],
    repo: 'https://github.com/Sasisundar2211/ml-project_implementation',
  },
  {
    slug: 'firmrunner',
    tagline: 'Next.js and Supabase app. My full-stack practice ground.',
    name: 'firmrunner',
    status: 'Active',
    summary:
      'A Next.js and TypeScript application with a Supabase backend and typed server routes, deployed on Vercel.',
    why:
      'Most of my work is Python. firmrunner is where I keep my TypeScript and full-stack practice current, because AI tooling that nobody can use through a browser stays a script.',
    architecture: [
      'Next.js App Router with TypeScript throughout.',
      'Supabase for persistence and auth.',
      'Typed API route handlers.',
      'Tailwind CSS, ESLint, deployed on Vercel.',
    ],
    decisions: [
      {
        title: 'Typed end to end',
        body:
          'Types are declared once and shared between the server routes and the client rather than duplicated. The cost is a small amount of setup; the benefit is that a schema change breaks the build instead of production.',
      },
    ],
    lessons: [
      'A project without a README is a project a reader closes.',
      'Supabase removes enough backend work that the remaining difficulty is entirely in the data model.',
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Vercel'],
    facts: [{ label: 'Status', value: 'In progress' }],
    repo: 'https://github.com/Sasisundar2211/firmrunner',
  },
  {
    slug: 'procureguard',
    tagline: 'Early FastAPI experiment. Never shipped.',
    name: 'ProcureGuard',
    status: 'Archived',
    label: 'Experiment',
    summary:
      'An early experiment, not shipped and not maintained. A FastAPI service that detects vendor price drift and contract non-compliance, ranks suppliers from CSV input, and generates business-readable explanations using Gemini and the OpenAI API.',
    why:
      'Procurement data is a good testbed for a question I keep returning to: when a system flags something, what evidence does a human need in order to act on it? A drift score on its own gets ignored. A drift score with a generated explanation and a ranked alternative is a decision.',
    architecture: [
      'FastAPI application exposing seven handlers: health, detection start, detection status, leaks, traffic simulation, vendor ranking, and ranking explanation.',
      'Asynchronous detection dispatch using FastAPI BackgroundTasks with an in-memory task store, polled by a status endpoint.',
      'Pydantic schemas for every request and response contract.',
      'Gemini 1.5 Flash for detection reasoning; the OpenAI API for vendor ranking explanations.',
      'A two-stage Docker build: node:18-slim compiles the React frontend, python:3.11-slim serves it from the API. A second Dockerfile runs the service as a non-root user.',
      'pytest suite and a GitHub Actions workflow.',
    ],
    decisions: [
      {
        title: 'Async dispatch with an in-memory task store',
        body:
          'Detection was too slow to answer inside a request, so POST starts a job and GET polls its status. Two of the seven endpoints exist only to support this. The store is in-memory, which means a process restart loses every in-flight task. That is acceptable for a single-instance prototype and unacceptable the moment there is more than one replica. Naming the limit is more useful than pretending it is a queue.',
      },
      {
        title: 'Two LLMs for two different jobs',
        body:
          'Gemini 1.5 Flash handles detection reasoning where latency and cost matter more than prose quality. The OpenAI API generates the ranking explanations a human actually reads. Splitting them was cheaper than making one model do both well.',
      },
      {
        title: 'Deleting the duplicate implementation',
        body:
          'For months the repository contained a second, parallel implementation under a separate directory that nothing in the live API referenced. It made the project look larger and made it considerably harder to read. Removing it was the single best commit in the repo.',
      },
    ],
    lessons: [
      'A prototype that names its own failure boundary reads as more competent than one that claims none.',
      'Two implementations of the same idea in one repository is not optionality, it is confusion.',
      'The licence file matters. This repo carried a content licence over source code until I actually read it.',
    ],
    stack: ['Python', 'FastAPI', 'Pydantic', 'Docker', 'pytest', 'React', 'Gemini', 'OpenAI API'],
    facts: [
      { label: 'Status', value: 'Experiment' },
      { label: 'Commits', value: '32' },
      { label: 'API handlers', value: '7' },
      { label: 'Docker stages', value: '2' },
      { label: 'Licence', value: 'MIT' },
    ],
    repo: 'https://github.com/Sasisundar2211/Autonomous-Procurement-AI-System',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
