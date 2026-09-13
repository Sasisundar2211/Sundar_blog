import type { Metadata } from 'next';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description: 'Sasi Sundar — final-year B.Tech student in AI & Machine Learning, building developer tooling for AI systems.',
  alternates: { canonical: '/about' },
};

export default function About() {
  return (
    <div className="mx-auto max-w-wide px-5 sm:px-8">
      <div className="max-w-reading py-14">
        <h1 className="font-serif text-[2rem] font-semibold tracking-[-0.02em] sm:text-[2.5rem]">About</h1>

        <div className="prose-editorial mt-8">
          <p>
            I am Sasi Sundar. I am finishing a B.Tech in Artificial Intelligence and Machine
            Learning in July 2027, and I spend most of my time outside coursework building
            developer tooling for AI systems and writing down what breaks.
          </p>

          <h2>What I work on</h2>
          <p>
            The thread running through everything I build is verification: when a change touches
            an AI system, what evidence does a reviewer need before merging it? That question
            produced <a href="/projects/vouqis-verify">Vouqis Verify</a>, a CLI and GitHub Action
            that detects AI-related changes in a pull request, runs the repository&rsquo;s existing
            evaluation command, and posts a structured report back to the PR.
          </p>
          <p>
            Before that I built <a href="/projects/procureguard">ProcureGuard</a>, a FastAPI service
            that detects vendor price drift and explains its findings, and{' '}
            <a href="/projects/energy-star-regression">a regression pipeline</a> over the NYC Energy
            Benchmarking dataset where the interpretability layer found a data bug the metrics
            never surfaced.
          </p>

          <h2>Experience</h2>
          <p>
            In 2025 I was selected for an AI/ML internship at BITS Pilani, Hyderabad Campus, where I
            built supervised learning models in Python and scikit-learn. Earlier that year I was
            selected nationally for the Microsoft and SAP TechSaksham programme through AICTE, where
            I built a resume-ranking service in Flask and presented it to domain experts from both
            companies.
          </p>
          <p>
            I have accepted an AI and Automation internship at FTSITS Ltd and have not started yet.
            I would rather say that plainly than list it as current work.
          </p>

          <h2>How I write</h2>
          <p>
            Every technical claim on this site links to the commit or the file it rests on. That is
            an unusual thing to do and it is deliberate. I spent a long time describing my own work
            in language that sounded more impressive than the code supported, and reading my own
            repositories carefully was the correction. The rule now is simple: if I cannot point at
            the line, I do not write the sentence.
          </p>
          <p>
            I write about roughly one thing a fortnight, usually a bug I did not expect, a decision
            with a real trade-off, or something I got wrong and had to unwind.
          </p>

          <h2>What I am not</h2>
          <p>
            I have not shipped anything at production scale, run an on-call rotation, or trained a
            model larger than a scikit-learn ensemble. I have no users on any tool I have built.
            Those are gaps I am closing rather than facts I am hiding.
          </p>

          <h2>Elsewhere</h2>
          <ul>
            <li><a href={site.github} target="_blank" rel="noreferrer">GitHub</a> — everything I build is public</li>
            <li><a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
