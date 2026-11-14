import assert from 'node:assert/strict';
import test from 'node:test';
import { parseLead } from './lead.ts';

test('accepts an email or a WhatsApp number', () => {
  const a = parseLead({ intent: 'build', contact: 'a@b.co', name: 'Ravi' });
  assert.ok(a.ok && a.lead.contactKind === 'email');
  const b = parseLead({ intent: 'guide', contact: '+91 98765 43210' });
  assert.ok(b.ok && b.lead.contactKind === 'whatsapp');
});

test('rejects unknown intents and bad contacts', () => {
  assert.equal(parseLead({ intent: 'spam', contact: 'a@b.co' }).ok, false);
  assert.equal(parseLead({ intent: 'audit', contact: 'hello' }).ok, false);
  assert.equal(parseLead(null).ok, false);
});

test('flags a filled honeypot as spam', () => {
  const r = parseLead({ intent: 'audit', contact: 'a@b.co', company: 'bot' });
  assert.ok(r.ok && r.spam);
});
