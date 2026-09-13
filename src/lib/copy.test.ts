import assert from 'node:assert/strict';
import test from 'node:test';
import { copyText } from './copy.ts';

test('copyText reports clipboard success and failure', async () => {
  assert.equal(await copyText('ok', async () => {}), true);
  assert.equal(await copyText('no', async () => { throw new Error('denied'); }), false);
});
