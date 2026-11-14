import assert from 'node:assert/strict';
import test from 'node:test';
import { arrowLists } from './format.ts';

test('arrowLists wraps consecutive arrow lines in one Arrows list', () => {
  const out = arrowLists('Intro:\n\n-> one `code`\n-> two\n\nAfter.');
  assert.match(out, /<Arrows>\n\n- one `code`\n- two\n\n<\/Arrows>/);
  assert.ok(out.includes('After.'));
});

test('arrowLists leaves fenced code untouched', () => {
  const src = '```\n-> not a list\n```';
  assert.equal(arrowLists(src), src);
});
