import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2] || '.vercel/output/static';
const read = (path) => readFileSync(join(root, path), 'utf8');
const home = read('index.html');
const about = read('about/index.html');
const contact = read('contact/index.html');
const supplements = read('supplements/index.html');
const sitemap = read('sitemap-0.xml');

assert.match(supplements, /<meta name="robots" content="noindex, follow"/);
assert.doesNotMatch(supplements, /adsbygoogle\.js|Coming Soon/i);
assert.match(supplements, /href="\/recipes\/"/);
assert.doesNotMatch(sitemap, /<loc>https:\/\/www\.cravesmart\.recipes\/supplements\/?<\/loc>/);
for (const html of [home, about, contact, supplements]) {
  assert.doesNotMatch(html, /href="\/supplements\/?"/);
  assert.doesNotMatch(html, /Isabella|hello@cravesmart\.com|Supliful brand owner/);
}
assert.doesNotMatch(home, /Your Next Favorite Cookbook|Cookbook Coming Soon|girl for websoite/i);
assert.doesNotMatch(about, /placeholders\/image\.png/);
assert.match(home, /High-protein, macro-friendly recipes, tested and tweaked so you don’t have to/);
assert.match(home, /href="\/recipes\/"/);
assert.match(about, /Nutrition figures are estimates/);
assert.match(contact, /<form action="\/api\/contact" method="POST"/);
assert.match(contact, /id="contact-success"[^>]*role="status"/);
assert.doesNotMatch(contact, /24–48 hours|mailto:hello@cravesmart\.com/);
assert.doesNotMatch(read('robots.txt'), /Disallow:\s*\/supplements/);

let qualified = 0;
for (const file of readdirSync('src/content/recipes').filter((f) => f.endsWith('.mdx'))) {
  const source = readFileSync(`src/content/recipes/${file}`, 'utf8');
  const slug = source.match(/^slug: "([^"]+)"/m)[1];
  const noteMatch = source.match(/^nutritionNote: ("(?:[^"\\]|\\.)*")$/m);
  if (!noteMatch || !/original (?:nutrition )?estimate/i.test(noteMatch[1])) continue;
  const note = JSON.parse(noteMatch[1]);
  const html = read(`recipes/${slug}/index.html`);
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([^]*?)<\/script>/)[1]);
  assert.equal(schema.nutrition.description, note, `${slug}: nutrition caveat in schema`);
  const visible = html.replace(/<script\b[^>]*>[^]*?<\/script>/g, '').replaceAll('&#39;', "'").replaceAll('&amp;', '&');
  assert.ok(visible.includes(note), `${slug}: nutrition caveat visible to readers`);
  qualified++;
}
assert.ok(qualified >= 6, 'The six recipes with unresolved calculation assumptions retain visible notes');
console.log(`PASS: retired Supplements discovery and ads, honest site identity, contact form markup, preserved homepage copy, and ${qualified} visible nutrition caveats.`);
