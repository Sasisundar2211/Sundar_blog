import { intents, parseLead } from '@/lib/lead';
import { site } from '@/lib/site';

/**
 * Emails each lead to the site owner through Resend. Nothing is stored.
 * Needs RESEND_API_KEY on Vercel. LEAD_TO overrides the destination address.
 * Without a key the route answers 503 so the form can offer a direct email link.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const parsed = parseLead(body);
  if (!parsed.ok) return Response.json({ error: parsed.error }, { status: 400 });
  if (parsed.spam) return Response.json({ ok: true });

  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ error: 'not_configured' }, { status: 503 });

  const { lead } = parsed;
  const text = [
    `Intent: ${intents[lead.intent]}`,
    `Name: ${lead.name || '(not given)'}`,
    `${lead.contactKind === 'email' ? 'Email' : 'WhatsApp'}: ${lead.contact}`,
    `Page: ${lead.page || '(unknown)'}`,
  ].join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Site leads <onboarding@resend.dev>',
      to: [process.env.LEAD_TO || site.email],
      subject: `New lead: ${intents[lead.intent]}`,
      text,
      ...(lead.contactKind === 'email' ? { reply_to: lead.contact } : {}),
    }),
  }).catch(() => null);

  if (!res?.ok) return Response.json({ error: 'send_failed' }, { status: 502 });
  return Response.json({ ok: true });
}
