import test from 'node:test';
import assert from 'node:assert/strict';
import { installAnalytics, affiliateClickParameters, validMeasurementId, ANALYTICS_CONSENT_KEY, campaignParameters } from '../src/lib/analytics.mjs';

const ID = 'G-LOCALTEST01'; // Test fixture only; never production configuration.
function fixture({ consent = null, host = 'www.cravesmart.recipes', storageFails = false } = {}) {
  const calls = [], scripts = [], handlers = new Map(), windowHandlers = new Map();
  const panel = { hidden: true };
  const anchor = {
    href: 'https://www.amazon.com/dp/B01M2Y1NN8?tag=cravesmart09-20',
    dataset: { productId: 'equipVanilla', productLabel: 'Equip Prime vanilla — 30 servings', linkPlacement: 'recipe_content' },
    textContent: 'Vanilla',
  };
  const win = {
    location: { hostname: host, origin: 'https://' + host, pathname: '/recipes/high-protein-blondies', search: '?email=private@example.com&analytics_debug=1' },
    localStorage: {
      getItem: () => { if (storageFails) throw Error('Unavailable'); return consent; },
      setItem: (key, value) => { if (storageFails) throw Error('Unavailable'); assert.equal(key, ANALYTICS_CONSENT_KEY); consent = value; },
    },
    gtag: (...args) => calls.push(args),
    addEventListener: (name, fn) => windowHandlers.set(name, fn),
  };
  const doc = {
    referrer: 'https://example.com/recipes?private=value',
    querySelector: () => panel,
    querySelectorAll: () => [{ textContent: 'Protein powder', compareDocumentPosition: () => 4 }],
    createElement: () => ({ dataset: {} }),
    head: { append: (script) => scripts.push(script) },
    addEventListener: (name, fn) => { assert.ok(!handlers.has(name), 'Duplicate listener'); handlers.set(name, fn); },
  };
  const click = (type = 'click', button = 0, targetAnchor = anchor) => handlers.get(type)({
    type, button,
    target: { closest: (selector) => selector === 'a[data-affiliate-link]' ? targetAnchor : null },
    preventDefault: () => assert.fail('Navigation must never be blocked'),
  });
  const events = () => calls.filter((c) => c[0] === 'event');
  return { win, doc, calls, scripts, panel, anchor, click, events, windowHandlers };
}

test('requires a valid web measurement ID', () => {
  for (const id of ['', '123456', 'UA-123-1', 'G-<id>']) assert.equal(validMeasurementId(id), false);
  assert.equal(validMeasurementId(ID), true);
  const f = fixture(); assert.throws(() => installAnalytics(f.win, f.doc, ''), /Measurement ID/);
});
test('unknown consent makes no GA request and sends no clicks', () => {
  const f = fixture(); installAnalytics(f.win, f.doc, ID); f.click();
  assert.equal(f.scripts.length, 0); assert.equal(f.events().length, 0); assert.equal(f.panel.hidden, false);
});
test('acceptance loads once and the click handler builds exact property/path/product/placement', () => {
  const f = fixture(); const controller = installAnalytics(f.win, f.doc, ID);
  controller.choose('granted'); controller.choose('granted');
  assert.equal(f.scripts.length, 1); assert.equal(f.scripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=' + ID);
  assert.equal(installAnalytics(f.win, f.doc, ID), controller);
  f.click(); const [command, name, params] = f.events()[0];
  assert.equal(command, 'event'); assert.equal(name, 'affiliate_click');
  assert.equal(params.send_to, ID); assert.equal(params.page_path, '/recipes/high-protein-blondies');
  assert.equal(params.recipe_path, params.page_path); assert.equal(params.product_id, 'equipVanilla');
  assert.equal(params.product_label, f.anchor.dataset.productLabel);
  assert.equal(params.link_placement, 'recipe_content:protein-powder');
  assert.equal(params.debug_mode, true); assert.equal(params.link_url, 'https://www.amazon.com/dp/B01M2Y1NN8');
  assert.equal(params.page_referrer, 'https://example.com/recipes');
  assert.ok(!JSON.stringify(params).includes('private'));
});
test('normal, keyboard and middle clicks count once; right clicks and unrelated clicks do not', () => {
  const f = fixture({ consent: 'granted' }); installAnalytics(f.win, f.doc, ID);
  f.click('click', 0); f.click('auxclick', 0); f.click('auxclick', 1); f.click('click', 1); f.click('click', 2); f.click('click', 0, null);
  assert.equal(f.events().length, 2);
});
test('explicit shop placement and label are retained', () => {
  const f = fixture({ consent: 'granted' }); installAnalytics(f.win, f.doc, ID);
  f.anchor.dataset.linkPlacement = 'shop_this_recipe'; f.click();
  assert.equal(f.events()[0][2].link_placement, 'shop_this_recipe');
});
test('reject and withdrawal disable events; choices survive unavailable storage', () => {
  const f = fixture({ storageFails: true }); const c = installAnalytics(f.win, f.doc, ID);
  c.choose('denied'); f.click(); assert.equal(f.events().length, 0); assert.equal(f.scripts.length, 0);
  c.choose('granted'); f.click(); assert.equal(f.events().length, 1);
  c.choose('denied'); f.click(); assert.equal(f.events().length, 1); assert.equal(f.win['ga-disable-' + ID], true);
  c.openSettings(); assert.equal(f.panel.hidden, false); assert.throws(() => c.choose('invalid'), /Invalid/);
});
test('preview hosts never load the production property and ordinary sessions omit debug_mode', () => {
  const f = fixture({ consent: 'granted', host: 'example-preview.vercel.app' });
  assert.equal(installAnalytics(f.win, f.doc, ID), null); assert.equal(f.scripts.length, 0);
  const live = fixture({ consent: 'granted' }); live.win.location.search = ''; installAnalytics(live.win, live.doc, ID); live.click();
  assert.ok(!('debug_mode' in live.events()[0][2]));
});
test('non-web affiliate destinations are ignored', () => {
  assert.equal(affiliateClickParameters({ href: 'javascript:alert(1)' }, fixture().win.location, ID), null);
});

test('withdrawal in another tab stops local tracking without reload', () => {
  const f = fixture({ consent: 'granted' }); installAnalytics(f.win, f.doc, ID); f.click();
  f.windowHandlers.get('storage')({ key: ANALYTICS_CONSENT_KEY, newValue: 'denied' });
  f.click(); assert.equal(f.events().length, 1); assert.equal(f.win['ga-disable-' + ID], true);
  f.windowHandlers.get('storage')({ key: ANALYTICS_CONSENT_KEY, newValue: null });
  assert.equal(f.panel.hidden, false);
});

test('public Pinterest campaign labels survive sanitized URLs on page views and affiliate clicks', () => {
  const f = fixture({ consent: 'granted' });
  f.win.location.search = '?utm_source=pinterest&utm_medium=social&utm_campaign=cravesmart_launch_20261018&utm_content=high-protein-blondies__design_a&utm_id=cs-pinterest-launch-20261018&email=private%40example.com';
  installAnalytics(f.win, f.doc, ID); f.click();
  const config = f.calls.find((c) => c[0] === 'config')[2];
  for (const params of [config, f.events()[0][2]]) {
    assert.equal(params.campaign_source, 'pinterest');
    assert.equal(params.campaign_medium, 'social');
    assert.equal(params.campaign_name, 'cravesmart_launch_20261018');
    assert.equal(params.campaign_content, 'high-protein-blondies__design_a');
    assert.equal(params.campaign_id, 'cs-pinterest-launch-20261018');
    assert.equal(params.page_location, 'https://www.cravesmart.recipes/recipes/high-protein-blondies');
    assert.ok(!JSON.stringify(params).includes('private'));
  }
});
test('campaign labels reject duplicates, email-like values, whitespace and oversized values', () => {
  assert.deepEqual(campaignParameters('?email=private%40example.com&utm_source=person%40example.com&utm_medium=social&utm_medium=email&utm_campaign=hello%20world&utm_content=' + 'x'.repeat(101)), {});
  assert.deepEqual(campaignParameters(''), {});
});
test('campaign labels do not bypass consent', () => {
  const f = fixture(); f.win.location.search = '?utm_source=pinterest&utm_medium=social';
  installAnalytics(f.win, f.doc, ID); f.click();
  assert.equal(f.scripts.length, 0); assert.equal(f.events().length, 0);
  assert.equal(f.calls.some((c) => c[0] === 'config'), false);
});
