/**
 * Lead intake: shared by the browser forms and the /api/lead route.
 * Pure and isomorphic. Nothing here touches the network or the filesystem.
 */
export const intents = {
  build: 'Automate a manual business workflow (n8n / APIs / Next.js)',
  role: 'Discuss a 2027 Applied AI, Forward Deployed, or SWE role',
  audit: 'Request a free 15-minute workflow audit',
  guide: '5-page Claude Code CLI guide + CommandBuild WhatsApp invite',
  toolkit: 'Runnable files behind a post',
} as const;

export type Intent = keyof typeof intents;

export interface Lead {
  intent: Intent;
  name: string;
  contact: string;
  contactKind: 'email' | 'whatsapp';
  page: string;
}

export type ParseResult =
  | { ok: true; lead: Lead; spam: boolean }
  | { ok: false; error: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function str(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

export function parseLead(input: unknown): ParseResult {
  if (!input || typeof input !== 'object') return { ok: false, error: 'Invalid request.' };
  const raw = input as Record<string, unknown>;

  const intent = str(raw.intent, 20);
  if (!(intent in intents)) return { ok: false, error: 'Pick what you need.' };

  const contact = str(raw.contact, 120);
  const digits = contact.replace(/[\s()+-]/g, '');
  let contactKind: Lead['contactKind'];
  if (EMAIL.test(contact)) contactKind = 'email';
  else if (/^\d{8,15}$/.test(digits)) contactKind = 'whatsapp';
  else return { ok: false, error: 'Enter a valid email or WhatsApp number.' };

  return {
    ok: true,
    // A filled honeypot means a bot: accept it quietly and send nothing.
    spam: str(raw.company, 200) !== '',
    lead: {
      intent: intent as Intent,
      name: str(raw.name, 80),
      contact,
      contactKind,
      page: str(raw.page, 200),
    },
  };
}
