import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { AMAZON_ASSOCIATE_ID, amazonProducts, getAmazonUrl } from '../src/lib/amazon.mjs';

const audit = JSON.parse(readFileSync(new URL('../docs/amazon-affiliate-audit.json', import.meta.url), 'utf8'));
const sourceRoot = resolve('src/content/recipes');
const outputRoot = resolve(process.argv[2] ?? '.vercel/output/static');
const walk = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? walk(path) : [path];
});
const expectedByRecipe = new Map();
for (const record of audit.products) {
  assert.ok(record.verified, `Unverified product: ${record.product}`);
  const url = new URL(getAmazonUrl(record.product));
  assert.equal(url.href, record.url, `URL differs from network-verified evidence: ${record.product}`);
  assert.equal(url.hostname, 'www.amazon.com');
  assert.equal(url.pathname, `/dp/${record.selectedAsin}`);
  assert.deepEqual(url.searchParams.getAll('tag'), [AMAZON_ASSOCIATE_ID]);
  assert.ok(!url.searchParams.has('linkId'), 'Obsolete link attribution must not survive');
  for (const reference of record.occurrences) {
    const expected = expectedByRecipe.get(reference.file) ?? [];
    expected.push(record.product);
    expectedByRecipe.set(reference.file, expected);
  }
}
assert.equal(Object.keys(amazonProducts).length, audit.products.length);
assert.throws(() => getAmazonUrl('nonexistent-product'), /Unknown Amazon product/);
assert.throws(() => getAmazonUrl('toString'), /Unknown Amazon product/);
let sourceCount = 0;
for (const path of walk(sourceRoot).filter((p) => p.endsWith('.mdx'))) {
  const text = readFileSync(path, 'utf8');
  assert.ok(!/https?:\/\/(?:amzn\.to|(?:[^/]+\.)?amazon\.[^/]+)/i.test(text), `Uncentralized Amazon URL: ${path}`);
  const ids = [...text.matchAll(/<AmazonLink product="([^"]+)"/g)].map((m) => m[1]);
  const relative = path.slice(resolve('.').length + 1);
  assert.deepEqual(ids.toSorted(), (expectedByRecipe.get(relative) ?? []).toSorted(), `Product/count changed: ${relative}`);
  const slug = text.match(/^slug:\s*"([^"]+)"/m)?.[1];
  assert.ok(slug, `Missing slug: ${relative}`);
  const html = readFileSync(join(outputRoot, 'recipes', slug, 'index.html'), 'utf8');
  const amazonAnchors = [...html.matchAll(/<a\b[^>]*href="([^"]*(?:amazon\.|amzn\.to)[^"]*)"[^>]*>/gi)];
  assert.equal(amazonAnchors.length, ids.length, `Rendered links missing/duplicated: ${slug}`);
  const hrefs = amazonAnchors.map((m) => m[1].replaceAll('&amp;', '&'));
  assert.deepEqual(hrefs.toSorted(), ids.map(getAmazonUrl).toSorted(), `Wrong rendered product/variant/tag: ${slug}`);
  for (const [anchor, href] of amazonAnchors) {
    assert.ok(anchor.includes('sponsored') && anchor.includes('nofollow') && anchor.includes('noopener'), `Missing affiliate rel: ${href}`);
  }
  sourceCount += ids.length;
}
for (const path of walk(outputRoot).filter((p) => p.endsWith('.html'))) {
  const html = readFileSync(path, 'utf8');
  assert.ok(!/amzn\.to|cravesmart0b-20|mobile0e3fb8b-20/.test(html), `Old attribution in output: ${path}`);
}
assert.equal(sourceCount, audit.products.reduce((n, p) => n + p.occurrences.length, 0));
console.log(`PASS: ${sourceCount} rendered affiliate links, ${audit.products.length} verified products, ${expectedByRecipe.size} recipes; exact ASINs, variant parameters and centralized tag.`);
