/**
 * Every field below is verified against the public repository as of 17 Aug 2026.
 * Nothing here is aspirational. If a number cannot be reproduced by cloning the
 * repo and running the stated command, it does not belong in this file.
 */
export interface Project {
  slug: string;
  name: string;
  status: 'Active' | 'Complete' | 'Archived';
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
}

export const projects: Project[] = [
  {
    slug: 'vouqis-verify',
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
    slug: 'procureguard',
    name: 'ProcureGuard',
    status: 'Complete',
    featured: true,
    summary:
      'A FastAPI service that detects vendor price drift and contract non-compliance, ranks suppliers from CSV input, and generates business-readable explanations using Gemini and the OpenAI API.',
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
      { label: 'Commits', value: '32' },
      { label: 'API handlers', value: '7' },
      { label: 'Docker stages', value: '2' },
      { label: 'Licence', value: 'MIT' },
    ],
    repo: 'https://github.com/Sasisundar2211/Autonomous-Procurement-AI-System',
  },
  {
    slug: 'energy-star-regression',
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
];

export const featuredProjects = projects.filter((p) => p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
