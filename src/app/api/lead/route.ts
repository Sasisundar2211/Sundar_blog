import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { intents, parseLead } from '@/lib/lead';
import { guideEmailHtml, ownerEmailHtml } from '@/lib/lead-email';
import { site } from '@/lib/site';

/**
 * Emails each lead through Resend. Nothing is stored.
 * - Owner notification goes to LEAD_TO or site.email.
 * - Guide signups with an email also get the PDF attached and the CommandBuild invite.
 * Env: RESEND_API_KEY (required), RESEND_FROM_EMAIL (sender on a domain verified in Resend),
 * COMMANDBUILD_WHATSAPP_URL (invite link). Without a key the route answers 503.
 */
const PDF_PATH = 'public/guides/claude-code-cli-guide.pdf';
const PDF_URL = `${site.url}/guides/claude-code-cli-guide.pdf`;

async function send(key: string, payload: Record<string, unknown>): Promise<boolean> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => null);
  if (!res?.ok) console.error('resend send failed', res?.status, await res?.text().catch(() => ''));
  return Boolean(res?.ok);
}

async function pdfBase64(): Promise<string | null> {
  try {
    return (await readFile(path.join(process.cwd(), PDF_PATH))).toString('base64');
  } catch (err) {
    console.error('guide pdf missing at runtime', err);
    return null;
  }
}

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
  const from = process.env.RESEND_FROM_EMAIL || 'Sasi Sundar <hello@sasisundar.me>';
  const isEmail = lead.contactKind === 'email';

  const owner = send(key, {
    from,
    to: [process.env.LEAD_TO || site.email],
    subject: `New lead: ${intents[lead.intent]}`,
    html: ownerEmailHtml(lead, intents[lead.intent]),
    ...(isEmail ? { reply_to: lead.contact } : {}),
  });

  const visitor =
    lead.intent === 'guide' && isEmail
      ? pdfBase64().then((pdf) =>
          send(key, {
            from,
            to: [lead.contact],
            subject: 'Your Claude Code CLI guide',
            html: guideEmailHtml(
              lead,
              process.env.COMMANDBUILD_WHATSAPP_URL || `mailto:${site.email}?subject=CommandBuild%20invite`,
              PDF_URL,
            ),
            reply_to: site.email,
            ...(pdf ? { attachments: [{ filename: 'Claude-Code-CLI-Guide-Sasi-Sundar.pdf', content: pdf }] } : {}),
          }),
        )
      : Promise.resolve(true);

  const [ownerOk] = await Promise.all([owner, visitor]);
  // The form hands the PDF over on screen, so only a lost owner notification is an error.
  if (!ownerOk) return Response.json({ error: 'send_failed' }, { status: 502 });
  return Response.json({ ok: true });
}
