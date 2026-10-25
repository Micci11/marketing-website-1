import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2] || '.vercel/output/static';
const read = (path) => readFileSync(join(root, path), 'utf8');
const site = 'https://www.cravesmart.recipes';
const index = read('recipes/index.html');
const sitemap = read('sitemap-0.xml');

assert.match(index, /<h1\b[^>]*>\s*All Recipes\s*<\/h1>/);
assert.ok(index.includes(`<link rel="canonical" href="${site}/recipes/"`));
assert.doesNotMatch(index, /<meta\b[^>]*\bcontent="[^"]*noindex/i);
assert.ok(sitemap.includes(`<loc>${site}/recipes/</loc>`), 'Recipe directory must be in the sitemap');
assert.match(read('index.html'), /<a\b[^>]*href="\/recipes\/"[^>]*>\s*See Recipes\s*<\/a>/);

const recipeLinks = [...index.matchAll(/<a\b[^>]*href="(\/recipes\/[^"/]+\/)"/g)].map((match) => match[1]);
assert.ok(recipeLinks.length > 0, 'Directory must contain recipe links');
assert.equal(new Set(recipeLinks).size, recipeLinks.length, 'Recipes must not be duplicated');
for (const href of recipeLinks) {
  assert.ok(existsSync(join(root, href, 'index.html')), `Missing built recipe: ${href}`);
  assert.ok(sitemap.includes(`<loc>${site}${href}</loc>`), `Recipe missing from sitemap: ${href}`);
}

// These content slugs differ from their source filenames. They must still resolve.
assert.ok(recipeLinks.includes('/recipes/high-protein-cottage-cheese-pizza/'));
assert.ok(recipeLinks.includes('/recipes/high-protein-chocolate-chip-cookie/'));
assert.ok(!recipeLinks.includes('/recipes/cottage-cheese-pizza/'));
assert.ok(!recipeLinks.includes('/recipes/high-protein-chocolate-chip-cookies/'));

console.log(`PASS: recipe directory, canonical, homepage link, sitemap, and ${recipeLinks.length} unique recipe destinations`);
