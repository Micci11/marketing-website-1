import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const root = '.vercel/output/static';
const enabled = process.argv.includes('--newsletter-enabled');
const read = (path) => readFileSync(`${root}/${path}`, 'utf8');
const decode = (s) => s.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'");
const schemaFor = (html) => JSON.parse(html.match(/<script type="application\/ld\+json">([^]*?)<\/script>/)[1]);
const revised = new Map([
  ['spicy-cottage-cheese-fried-eggs', 1],
  ['high-protein-stuffed-chicken-fries', 2],
  ['high-protein-crispy-chicken-tacos', 2],
  ['high-protein-breakfast-egg-bake-meal-prep', 2],
  ['high-protein-creamy-tomato-soup', 2],
]);
const schemas = new Map();
for (const file of readdirSync('src/content/recipes').filter((f) => f.endsWith('.mdx'))) {
  const source = readFileSync(`src/content/recipes/${file}`, 'utf8');
  const slug = source.match(/^slug: "([^"]+)"/m)[1];
  const html = read(`recipes/${slug}/index.html`);
  const schema = schemaFor(html);
  schemas.set(slug, schema);
  const forms = [...html.matchAll(/<form\b[^>]*id="newsletter-signup"/g)];
  assert.equal(forms.length, enabled ? 1 : 0, `${slug}: newsletter gating and duplicate IDs`);
  assert.equal((html.match(/src="https:\/\/f.convertkit.com\/ckjs\/ck.5.js"/g) || []).length, enabled ? 1 : 0);
  if (enabled) {
    assert.ok(html.indexOf('id="newsletter-signup"') > html.indexOf('id="recipe-card"'));
    assert.match(html, /action="https:\/\/app.kit.com\/forms\/9162136\/subscriptions" method="post"/);
    assert.match(html, /data-uid="501378dd0c"/);
    assert.match(html, /<label for="newsletter-email"/);
    assert.match(html, /id="newsletter-email" name="email_address" type="email"[^>]*required/);
    assert.match(html, /Check your inbox to confirm/);
    assert.match(html, /aria-labelledby="recipe-newsletter-heading"/);
  } else {
    assert.doesNotMatch(html, /id="recipe-newsletter-heading"/);
  }
  if (!revised.has(slug)) continue;
  assert.equal(decode(html.match(/<h1\b[^>]*>\s*([^]*?)\s*<\/h1>/)[1]).trim(), schema.name);
  assert.equal(decode(html.match(/<meta name="description" content="([^"]+)"/)[1]), schema.description);
  assert.ok(html.includes(`rel="canonical" href="https://www.cravesmart.recipes/recipes/${slug}"`));
  const visibleUS = [...html.matchAll(/<span data-unit="us"[^>]*>([^]*?)<\/span>/g)].map((m) => decode(m[1]));
  assert.deepEqual(visibleUS, schema.recipeIngredient, `${slug}: displayed/schema ingredients`);
  for (const step of schema.recipeInstructions) assert.ok(decode(html).includes(step.text));
  const links = [...html.matchAll(/<a\b[^>]*data-affiliate-link[^>]*>/g)];
  assert.equal(links.length, revised.get(slug));
  assert.ok(html.indexOf('id="recipe-tools-heading"') > html.indexOf('id="recipe-card"'));
  assert.ok(html.indexOf('As an Amazon Associate') < html.indexOf('data-affiliate-link'));
  assert.match(html, /\.recipe-tools,\s*\.recipe-newsletter\s*\{\s*display:\s*none\s*!important/);
  for (const [link] of links) {
    assert.match(link, /data-link-placement="after_recipe"/);
    assert.match(link, /tag=cravesmart09-20/);
    assert.match(link, /sponsored nofollow noopener noreferrer/);
  }
  const original = execFileSync('git', ['show', `c3f1bc08ef02877abb0edda165db19043fd7cebc:src/content/recipes/${file}`], { encoding: 'utf8' });
  assert.equal(source.match(/^macros:\n(?:  .*\n)+/m)[0], original.match(/^macros:\n(?:  .*\n)+/m)[0], `${slug}: no new nutrition estimates`);
}
const optional = (slug) => read(`recipes/${slug}/index.html`).match(/<h4[^>]*>Optional<\/h4>\s*<ul[^>]*>([^]*?)<\/ul>/)[1];
assert.doesNotMatch(optional('high-protein-crispy-chicken-tacos'), /tortilla|mozzarella/i);
assert.doesNotMatch(optional('high-protein-stuffed-chicken-fries'), /mozzarella/i);
assert.match(optional('high-protein-stuffed-chicken-fries'), /breadcrumbs/);
assert.match(optional('high-protein-stuffed-chicken-fries'), /parmesan/);
assert.equal(schemas.get('high-protein-crispy-chicken-tacos').recipeYield, '6 mini tacos');
assert.equal(schemas.get('high-protein-stuffed-chicken-fries').recipeYield, '4 stuffed chicken sticks');
const bake = read('recipes/high-protein-breakfast-egg-bake-meal-prep/index.html');
assert.doesNotMatch(bake, /especially when slightly underbaked|Slightly softer centers|4–5 days/);
assert.match(bake, /Fully cook the egg bake before freezing/);
assert.match(bake, /reheat to 165°F \/ 74°C/);
const soup = read('recipes/high-protein-creamy-tomato-soup/index.html');
assert.doesNotMatch(soup, /perfect for pasta|serve over pasta|pizza base|Most high-protein sauces|restaurant-style/);
assert.match(soup, /1 cup broth/);

const publicationGroups = [
  ['2026-10-20', ['ginger-scallion-turkey-dumpling-lasagna', 'hot-honey-beef-sweet-potato-bowls', 'tiramisu-protein-overnight-oats']],
  ['2026-10-21', ['chicken-broccoli-fritters', 'korean-bbq-chicken-and-sticky-rice', 'sweet-chilli-popcorn-chicken-meal-prep', 'tzatziki-cucumber-chicken-salad']],
];
for (const [date, slugs] of publicationGroups) {
  for (const slug of slugs) assert.equal(schemas.get(slug).datePublished, `${date}T00:00:00.000Z`);
}
const directory = read('recipes/index.html');
const order = [...directory.matchAll(/<a\b[^>]*href="\/recipes\/([^"/]+)\/"/g)].map((m) => m[1]);
assert.equal(order.length, schemas.size);
assert.equal(new Set(order).size, order.length);
const dates = order.map((slug) => Date.parse(schemas.get(slug).datePublished));
assert.ok(dates.every(Number.isFinite), 'Every recipe has a publication date');
assert.deepEqual(dates, dates.toSorted((a, b) => b - a), 'Directory is newest first');
console.log(`PASS: ${schemas.size} recipes; newsletter ${enabled ? 'enabled once after each recipe' : 'absent when disabled'}, metadata/schema parity, required ingredients, safety copy, focused affiliate links, unchanged macro values and publication order.`);
