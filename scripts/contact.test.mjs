import test from 'node:test';
import assert from 'node:assert/strict';
import { processContactForm } from '../src/lib/contact.mjs';

const valid = (overrides = {}) => new Map(Object.entries({
  name: 'Reader',
  email: 'reader@example.test',
  message: 'A recipe question',
  ...overrides,
}));
const config = { from: 'sender@example.test', to: 'owner@example.test' };

test('provider acceptance redirects only after receiving a message ID', async () => {
  let payload;
  const result = await processContactForm(valid(), {
    ...config, send: async (value) => { payload = value; return { data: { id: 'mock-id' }, error: null }; },
  });
  assert.equal(result.status, 303);
  assert.equal(result.location, '/contact?success=true');
  assert.equal(payload.from, config.from);
  assert.equal(payload.to, config.to);
  assert.equal(payload.replyTo, 'reader@example.test');
});

test('a provider error never produces a success redirect', async () => {
  const result = await processContactForm(valid(), { ...config, send: async () => ({ data: null, error: { message: 'Rejected' } }) });
  assert.equal(result.status, 502);
  assert.equal(result.location, undefined);
});

test('a response without a message ID is not accepted as success', async () => {
  const result = await processContactForm(valid(), { ...config, send: async () => ({ data: {}, error: null }) });
  assert.equal(result.status, 502);
  assert.equal(result.location, undefined);
});

test('a provider exception returns a retry message', async () => {
  const result = await processContactForm(valid(), { ...config, send: async () => { throw new Error('Network failure'); } });
  assert.equal(result.status, 500);
  assert.match(result.body, /try again later/i);
  assert.equal(result.location, undefined);
});

test('missing or invalid fields do not call the sender', async () => {
  let sends = 0;
  for (const fields of [{ name: ' ' }, { email: 'invalid' }, { message: '' }, { name: { file: true } }]) {
    const result = await processContactForm(valid(fields), { ...config, send: async () => { sends++; } });
    assert.equal(result.status, 400);
  }
  assert.equal(sends, 0);
});

test('missing sender configuration does not call the sender', async () => {
  let sends = 0;
  for (const fields of [{ from: '' }, { to: '' }]) {
    const result = await processContactForm(valid(), { ...config, ...fields, send: async () => { sends++; } });
    assert.equal(result.status, 503);
  }
  assert.equal(sends, 0);
});

test('message HTML is escaped and line breaks are preserved', async () => {
  let payload;
  await processContactForm(valid({ name: '<Reader>', message: '<script>alert("x")</script>\nA & B' }), {
    ...config, send: async (value) => { payload = value; return { data: { id: 'mock-id' } }; },
  });
  assert.doesNotMatch(payload.html, /<script>|<Reader>/);
  assert.match(payload.html, /&lt;Reader&gt;/);
  assert.match(payload.html, /&lt;script&gt;/);
  assert.match(payload.html, /<br\/>A &amp; B/);
});
