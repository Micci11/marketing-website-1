import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// Verify the intentionally inactive APS state. Replace these assertions with
// account-specific integration checks when an approved renderer is introduced.
const root = process.argv[2] || '.vercel/output/static';
const expectedAdsense = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4657643096944710';
const expectedVerification = 'amzn-publisher-aE1aGBeME6B7SI8vfcVrDg';
const expectedSeller = 'google.com, pub-4657643096944710, DIRECT, f08c47fec0942fa0';

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? htmlFiles(path) : path.endsWith('.html') ? [path] : [];
  });
}

const files = htmlFiles(root);
assert.ok(files.length > 0, 'Build the site before checking display ads');

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const scripts = [...html.matchAll(/<script\b[^>]*>/gi)].map(([tag]) => tag);
  const adsense = scripts.filter((tag) => tag.includes('/pagead/js/adsbygoogle.js'));
  assert.equal(adsense.length, 1, `${file}: preserve exactly one AdSense loader`);
  assert.ok(adsense[0].includes(`src="${expectedAdsense}"`), `${file}: wrong AdSense publisher`);
  assert.match(adsense[0], /\basync(?:\s|=|>)/, `${file}: AdSense must remain asynchronous`);
  assert.match(adsense[0], /crossorigin="anonymous"/, `${file}: preserve crossorigin`);

  const verification = [...html.matchAll(/<meta\b[^>]*name="amazon-publisher-verify"[^>]*>/gi)];
  assert.equal(verification.length, 1, `${file}: preserve one Amazon verification tag`);
  assert.ok(verification[0][0].includes(`content="${expectedVerification}"`), `${file}: changed verification`);

  assert.doesNotMatch(html, /data-display-ad-preview|id="cravesmart-ad-recipe-end"|class="display-ad-container"/, `${file}: no empty production slot or layout fixture`);
  assert.doesNotMatch(html, /\bapstag\b|amazon-adsystem\.com|securepubads\.g\.doubleclick\.net\/tag\/js\/gpt\.js/, `${file}: no unconfigured APS/GPT requests`);
}

assert.equal(readFileSync(join(root, 'ads.txt'), 'utf8').trim(), expectedSeller,
  'Preserve the known Google seller; add APS sellers only from the account-issued ads.txt instructions');

console.log(`PASS: ${files.length} production pages preserve AdSense and verification; no APS/GPT requests, preview markup, or invented sellers`);
