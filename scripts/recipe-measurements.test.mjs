import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseFraction } from '../src/lib/recipe-measurements.mjs';

test('mixed fractions preserve the fractional amount', () => {
  assert.equal(parseFraction('1 1/2'), 1.5);
  assert.equal(parseFraction('1 1/4'), 1.25);
  assert.equal(parseFraction('2 3/4'), 2.75);
});
test('existing fractions, decimals and whole numbers still convert', () => {
  for (const [input, expected] of [['1/2', 0.5], ['½', 0.5], ['1 ½', 1.5], ['⅔', 2 / 3], ['0.5', 0.5], ['2', 2]]) {
    assert.equal(parseFraction(input), expected);
  }
});
test('the template converts real recipe mixed fractions using the shared parser', () => {
  const template = readFileSync('src/pages/recipes/[...slug].astro', 'utf8');
  assert.match(template, /import { parseFraction } from '..\/..\/lib\/recipe-measurements.mjs'/);
  // Execute the actual converter with its formatting helpers, without rendering Astro.
  const start = template.indexOf('function ozToG(');
  const end = template.indexOf('export async function getStaticPaths()');
  const converter = new Function('parseFraction',
    template.slice(start, end).replace(/: (?:number|string)/g, '') + '\nreturn convertIngredientToMetric;'
  )(parseFraction);
  assert.equal(converter('1 1/2 tbsp cornflour'), '23ml cornflour');
  assert.equal(converter('1 1/2 tbsp light butter'), '23ml light butter');
  assert.equal(converter('1 1/2 cups cottage cheese'), '360ml cottage cheese');
  assert.equal(converter('1 1/2 oz cheese'), '43g cheese');
  assert.equal(converter('12 to 14 oz cooked chicken tenders'), '340g to 397g cooked chicken tenders');
  assert.equal(converter('3/4–1 cup cottage cheese'), '180ml to 240ml cottage cheese');
  assert.equal(converter('1 1/2-2 tbsp oil'), '23ml to 30ml oil');
});
