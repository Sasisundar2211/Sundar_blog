import type { Metadata } from 'next';
import { ArrowList } from '@/components/Cards';

export const metadata: Metadata = {
  title: 'Uses',
  description: 'The exact tools Sasi Sundar uses daily: one paid subscription and high-leverage free tiers.',
  alternates: { canonical: '/uses' },
};

export default function Uses() {
  return (
    <div className="mx-auto max-w-wide px-5 sm:px-8">
      <div className="max-w-reading py-16">
        <h1 className="text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Uses</h1>
        <p className="mt-6 text-[1.0625rem] leading-relaxed text-muted">
          My daily stack runs on one paid subscription and high-leverage free tiers:
        </p>
        <ArrowList
          className="mt-6 text-[1.0625rem] text-ink/90"
          items={[
            <><strong className="font-semibold text-ink">Voice Dictation:</strong> Wispr Flow (dictating specs and prompts at 250 WPM)</>,
            <><strong className="font-semibold text-ink">CLI Coding Agents:</strong> Claude Code Pro (sole recurring paid subscription) and Cursor</>,
            <><strong className="font-semibold text-ink">Multi-Model Workspace:</strong> GetMulti (lifetime plan), Gemini, and ChatGPT</>,
            <><strong className="font-semibold text-ink">Application Stack:</strong> Next.js, Supabase, HTML5 Canvas (pdfjs-dist), and Razorpay APIs</>,
            <><strong className="font-semibold text-ink">Automation &amp; Storage:</strong> n8n, Google Drive, Git, and GitHub</>,
          ]}
        />
      </div>
    </div>
  );
}
