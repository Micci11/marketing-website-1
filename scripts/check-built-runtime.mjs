import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
const root = '.vercel/output/functions/_render.func';
const config = JSON.parse(readFileSync(`${root}/.vc-config.json`));
const { default: app } = await import(pathToFileURL(resolve(root, config.handler)));
assert.equal(typeof app.fetch, 'function');
for (const name of ['RESEND_API_KEY', 'CONTACT_FROM_EMAIL', 'CONTACT_TO_EMAIL']) delete process.env[name];
const request = (path, headers = {}) => new Request(`http://localhost${path}`, {
  method: 'POST', headers, body: new URLSearchParams({name:'Local QA',email:'qa@example.invalid',message:'Local test only'})
});
assert.equal((await app.fetch(request('/api/contact'))).status, 503);
// These values are set after build/import, proving runtime-only configuration.
process.env.RESEND_API_KEY = 'local-test-not-a-real-key';
process.env.CONTACT_FROM_EMAIL = 'qa@example.invalid';
process.env.CONTACT_TO_EMAIL = 'inbox@example.invalid';
let sends = 0;
globalThis.fetch = async (url, options) => {
  assert.equal(String(url), 'https://api.resend.com/emails');
  assert.equal(options.method, 'POST');
  sends++;
  return new Response(JSON.stringify({id:'local-mocked-id'}), {status:200,headers:{'Content-Type':'application/json'}});
};
const sent = await app.fetch(request('/api/contact'));
assert.equal(sent.status,303);
assert.equal(sent.headers.get('location'),'/contact?success=true');
assert.equal(sends,1);
// Untrusted path overrides must not turn an unknown URL into the contact endpoint.
assert.equal((await app.fetch(request('/not-a-route',{'x-astro-path':'/api/contact'}))).status,404);
assert.equal((await app.fetch(request('/not-a-route?x_astro_path=/api/contact'))).status,404);
assert.equal(sends,1);
console.log('PASS: built Vercel handler, runtime-only contact config, mocked email success, untrusted path overrides ignored. No external requests.');
