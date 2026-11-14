import type { Metadata } from 'next';
import { ArrowList } from '@/components/Cards';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Bobbili Somanadh Vasudevara Sasi Sundar. Final-year B.Tech AIML student at PSCMR College of Engineering and Technology, Visakhapatnam. Complete fresher who commands AI agents from the command line.',
  alternates: { canonical: '/about' },
};

export default function About() {
  return (
    <div className="mx-auto max-w-wide px-5 sm:px-8">
      <div className="max-w-reading py-16">
        <h1 className="text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">About Me</h1>

        <div className="prose-editorial mt-10">
          <p>
            I am {site.fullName} (born December 9, 2005, age 21).
            <br />
            I am a final-year B.Tech AIML student at {site.college} in Visakhapatnam, India.
          </p>
          <p>
            I am a complete fresher with zero prior corporate experience.
            <br />
            I do not hide behind fake founder titles.
          </p>
          <p>Here is my honest technical baseline:</p>
        </div>

        <ArrowList
          className="mt-5 text-[1.0625rem] text-ink/90"
          items={[
            'I cannot write or debug standalone Python backends from scratch without AI yet.',
            'I run git workflows, local servers, and test suites directly from the command line.',
            'I command Claude Code CLI and Cursor to build full-stack web platforms and API automations.',
          ]}
        />

        <div className="prose-editorial mt-8">
          <p>
            Every day, I study Python, DSA, DevOps, Kubernetes, and multi-agent engineering to close
            my fundamentals gap.
          </p>
          <p>
            Syntax is becoming a commodity.
            <br />
            Architectural judgment and terminal verification are the moat.
          </p>
        </div>
      </div>
    </div>
  );
}
