// Local browser QA only. No network requests or real subscriptions are allowed.
// Build with PUBLIC_NEWSLETTER_ENABLED=true, then pass a local copy of ck.5.js.
import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile, copyFile } from 'node:fs/promises';
import { basename } from 'node:path';

const vendorPath = process.argv[2];
assert.ok(vendorPath, 'Pass a local copy of the public Kit embed script.');
const built = '.vercel/output/static';
const out = '.vercel/newsletter-test';
const html = await readFile(`${built}/index.html`, 'utf8');
const form = html.match(/<form\b[^>]*id="newsletter-signup"[\s\S]*?<\/form>/)?.[0];
assert.ok(form, 'Build with PUBLIC_NEWSLETTER_ENABLED=true first.');
assert.match(form, /action="https:\/\/app\.kit\.com\/forms\/9162136\/subscriptions"/);
assert.match(form, /method="post"/);
assert.match(form, /name="email_address"/);
assert.match(form, /required/);
assert.match(form, /data-uid="501378dd0c"/);
assert.doesNotMatch(html, /newsletter_signup/);
assert.match(await readFile(`${built}/privacy/index.html`, 'utf8'), /newsletter provider/);
await mkdir(out, { recursive: true });
await copyFile(vendorPath, `${out}/kit-embed.js`);
const cssPaths = [...html.matchAll(/href="(\/_astro\/[^" ]+\.css)"/g)].map(m => m[1]);
for (const path of cssPaths) await copyFile(`${built}${path}`, `${out}/${basename(path)}`);
const styles = [...html.matchAll(/<style[^>]*>[\s\S]*?<\/style>/g)].map(m => m[0]).join('');
const localForm = form.replace('https://app.kit.com/forms/9162136/subscriptions', '/mock-subscription');
const feedback = html.match(/<script\b[^>]*data-newsletter-feedback[^>]*>([\s\S]*?)<\/script>/)?.[1];
assert.ok(feedback, 'Expected accessible newsletter feedback script.');
await writeFile(`${out}/feedback.js`, feedback);
const scenarios = ['success', 'validation', 'server', 'network', 'no-script'];
for (const scenario of scenarios) {
  await writeFile(`${out}/${scenario}.html`, `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'none'; img-src 'self'; form-action 'none'; base-uri 'none'"><title>Local newsletter QA: ${scenario}</title>${cssPaths.map(p => `<link rel="stylesheet" href="/${basename(p)}">`).join('')}${styles}</head><body data-scenario="${scenario}" style="background:#f4f0e8;color:#111827;padding:24px"><aside style="padding:16px;background:white"><strong>LOCAL MOCK — ${scenario}</strong><p>No subscriber is created. All network and native form submissions are blocked.</p><nav>${scenarios.map(s => `<a style="margin-right:20px;text-decoration:underline" href="/${s}.html">${s}</a>`).join('')}</nav><p id="mock-request-count">Mock subscription requests: 0</p></aside><main class="mx-auto max-w-xl py-10 text-center"><h1 class="text-3xl font-bold mb-4">Never Miss a Recipe</h1><p class="mb-8">Get new viral recipes delivered straight to your inbox.</p>${localForm}</main><script src="/mock.js"></script><script src="/feedback.js"></script>${scenario === 'no-script' ? '' : '<script src="/kit-embed.js" defer></script>'}</body></html>`);
}
await writeFile(`${out}/mock.js`, `
let requests = 0;
window.fetch = async (input, init = {}) => {
  const url = new URL(String(input), location.href);
  if (url.pathname.endsWith('/visit')) return new Response('{}', {status:200});
  if (url.origin !== location.origin || url.pathname !== '/mock-subscription' || init.method !== 'POST') throw new Error('Unexpected request blocked');
  if (init.body.get('email_address') !== 'newsletter-test@example.test') throw new Error('Use the reserved local fixture email');
  document.getElementById('mock-request-count').textContent = 'Mock subscription requests: ' + (++requests);
  await new Promise(resolve => setTimeout(resolve, 750));
  switch (document.body.dataset.scenario) {
    case 'network': throw new TypeError('Network request failed');
    case 'server': return new Response('', {status:503, statusText:'Please try again later.'});
    case 'validation': return new Response(JSON.stringify({status:'error', errors:{messages:['Please enter a valid email address.'], fields:['email_address']}}), {status:200});
    default: return new Response(JSON.stringify({status:'success'}), {status:200});
  }
};
`);
console.log(`PASS: built form target, method, email field, identifiers and privacy disclosure. Fixture ready in ${out}. Serve on 127.0.0.1 only. Use newsletter-test@example.test.`);
