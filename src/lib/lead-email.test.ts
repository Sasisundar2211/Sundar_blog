import assert from 'node:assert/strict';
import test from 'node:test';
import { guideEmailHtml, ownerEmailHtml } from './lead-email.ts';

const base = { intent: 'guide' as const, contact: 'a@b.co', contactKind: 'email' as const, page: '/' };

test('owner email omits the Name row when no name was given', () => {
  const html = ownerEmailHtml({ ...base, name: '' }, 'Guide');
  assert.ok(!html.includes('>Name<'));
  assert.ok(!html.includes('not given'));
  assert.ok(html.includes('>Email<'));
});

test('owner email keeps the Name row and escapes visitor input', () => {
  const html = ownerEmailHtml({ ...base, name: '<b>Ravi</b>' }, 'Guide');
  assert.ok(html.includes('>Name<'));
  assert.ok(html.includes('&lt;b&gt;Ravi&lt;/b&gt;'));
  assert.ok(!html.includes('<b>Ravi'));
});

test('guide email carries the invite link', () => {
  const html = guideEmailHtml({ ...base, name: '' }, 'https://chat.whatsapp.com/x', 'https://sasisundar.me/g.pdf');
  assert.ok(html.includes('href="https://chat.whatsapp.com/x"'));
  assert.ok(html.startsWith('<!doctype html>'));
});
