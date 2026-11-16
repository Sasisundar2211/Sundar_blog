/**
 * HTML bodies for lead emails. Pure: no network, no filesystem.
 * Every value that came from a visitor is escaped before it reaches markup.
 */
import type { Lead } from './lead';

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const font = "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

function shell(inner: string): string {
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f4f4f5;${font};color:#18181b">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e4e4e7;border-radius:8px">
<tr><td style="padding:28px">${inner}</td></tr></table></body></html>`;
}

/** Notification to the site owner. Rows with no value are left out. */
export function ownerEmailHtml(lead: Lead, intentLabel: string): string {
  const rows: [string, string][] = [['Intent', intentLabel]];
  if (lead.name) rows.push(['Name', lead.name]);
  rows.push([lead.contactKind === 'email' ? 'Email' : 'WhatsApp', lead.contact]);
  if (lead.page) rows.push(['Page', lead.page]);

  const body = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #e4e4e7;color:#71717a;font-size:13px;white-space:nowrap;vertical-align:top">${k}</td>` +
        `<td style="padding:8px 12px;border-bottom:1px solid #e4e4e7;font-size:14px">${escapeHtml(v)}</td></tr>`,
    )
    .join('');

  return shell(
    `<h1 style="margin:0 0 16px;font-size:18px">New lead from your site</h1>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-top:1px solid #e4e4e7">${body}</table>`,
  );
}

/** Delivery email to the visitor who asked for the guide. */
export function guideEmailHtml(lead: Lead, inviteHref: string, pdfHref: string): string {
  const hello = lead.name ? `Hi ${escapeHtml(lead.name)},` : 'Hi,';
  return shell(
    `<p style="margin:0 0 16px;font-size:15px">${hello}</p>
<p style="margin:0 0 16px;font-size:15px;line-height:1.6">Your 5-page Claude Code CLI guide is attached as a PDF. It covers the free OmniRoute model setup, the CLAUDE.md guardrails, 6 daily commands, and the 3-point proof gate. If the attachment does not open, <a href="${escapeHtml(pdfHref)}" style="color:#18181b">download it here</a>.</p>
<p style="margin:0 0 24px;font-size:15px;line-height:1.6">CommandBuild is the WhatsApp community where I share terminal workflows and answer setup questions.</p>
<a href="${escapeHtml(inviteHref)}" style="display:inline-block;background:#18181b;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 20px;border-radius:8px">Join the CommandBuild WhatsApp group</a>
<p style="margin:28px 0 0;font-size:14px;color:#71717a">Sasi Sundar<br>sasisundar.me</p>`,
  );
}
