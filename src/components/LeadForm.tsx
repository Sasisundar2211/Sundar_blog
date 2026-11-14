'use client';

import { useEffect, useId, useState } from 'react';
import { intents, type Intent } from '@/lib/lead';
import { site } from '@/lib/site';
import { ForwardIcon } from './Icons';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const choices: Intent[] = ['build', 'role', 'audit'];

const field =
  'w-full rounded-lg border border-rule bg-paper px-3.5 py-2.5 text-[15px] text-ink placeholder:text-faint focus:border-accent focus:outline-none';
const button =
  'inline-flex items-center justify-center gap-1.5 rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:opacity-90 active:scale-[0.98] disabled:opacity-60';

/**
 * "optin": one contact field for a fixed intent (guide or toolkit).
 * "intake": pick a need, then name and contact. Preselects ?intent= from the URL.
 */
export function LeadForm({
  variant,
  intent: fixedIntent = 'guide',
  submitLabel,
  successMessage,
}: {
  variant: 'optin' | 'intake';
  intent?: Intent;
  submitLabel: string;
  successMessage: string;
}) {
  const id = useId();
  const [intent, setIntent] = useState<Intent>(variant === 'intake' ? 'build' : fixedIntent);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    if (variant !== 'intake') return;
    const q = new URLSearchParams(window.location.search).get('intent');
    if (q && (choices as string[]).includes(q)) setIntent(q as Intent);
  }, [variant]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, intent, page: window.location.pathname }),
      });
      if (res.ok) return setStatus('sent');
      const body = await res.json().catch(() => ({}));
      setError(res.status === 400 && body.error ? body.error : '');
      setStatus('error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <p role="status" className="rounded-lg bg-accent/10 px-4 py-3 text-[15px] font-medium text-ink">
        {successMessage}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {variant === 'intake' && (
        <fieldset>
          <legend className="text-sm font-medium text-ink">Pick what you need</legend>
          <div className="mt-2 grid gap-2">
            {choices.map((c) => (
              <label
                key={c}
                className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3.5 py-2.5 text-[15px] transition-colors ${
                  intent === c ? 'border-accent bg-accent/[.06] text-ink' : 'border-rule text-muted hover:border-ink/30'
                }`}
              >
                <input
                  type="radio"
                  name="intent-choice"
                  value={c}
                  checked={intent === c}
                  onChange={() => setIntent(c)}
                  className="mt-1"
                />
                {intents[c]}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className={variant === 'intake' ? 'grid gap-4 sm:grid-cols-2' : 'grid gap-2'}>
        {variant === 'intake' && (
          <div className="grid gap-1.5">
            <label htmlFor={`${id}-name`} className="text-sm font-medium text-ink">Your name</label>
            <input id={`${id}-name`} name="name" autoComplete="name" maxLength={80} className={field} />
          </div>
        )}
        <div className="grid gap-1.5">
          <label htmlFor={`${id}-contact`} className="text-sm font-medium text-ink">
            {variant === 'intake' ? 'Work email or WhatsApp number' : 'Your email or WhatsApp number'}
          </label>
          <input
            id={`${id}-contact`}
            name="contact"
            required
            maxLength={120}
            inputMode="email"
            autoComplete="email"
            placeholder="you@company.com or +91 98765 43210"
            className={field}
          />
        </div>
      </div>

      {/* Honeypot: hidden from people, filled by bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-company`}>Company</label>
        <input id={`${id}-company`} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <button type="submit" disabled={status === 'sending'} className={button}>
          {status === 'sending' ? 'Sending' : submitLabel} {status !== 'sending' && <ForwardIcon />}
        </button>
        <p className="text-xs text-faint">I only use this to reply to you. No newsletter list, no sharing.</p>
      </div>

      <div aria-live="polite">
        {status === 'error' && (
          <p className="text-sm text-ink">
            {error || "That didn't send."}{' '}
            {!error && (
              <>
                Email me directly at{' '}
                <a href={`mailto:${site.email}`} className="font-medium underline decoration-accent/50 underline-offset-4">
                  {site.email}
                </a>
                .
              </>
            )}
          </p>
        )}
      </div>
    </form>
  );
}
