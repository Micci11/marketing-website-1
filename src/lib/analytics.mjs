export const ANALYTICS_CONSENT_KEY = 'cravesmart-analytics-consent-v1';

export function validMeasurementId(value) {
  return /^G-[A-Z0-9]+$/.test(value ?? '');
}

export function affiliateClickParameters(link, location, measurementId) {
  const destination = new URL(link.href, location.origin);
  if (!['https:', 'http:'].includes(destination.protocol)) return null;
  const path = location.pathname;
  return {
    send_to: measurementId,
    page_path: path,
    recipe_path: path.startsWith('/recipes/') ? path : '',
    page_location: location.origin + path,
    product_label: (link.label || 'Affiliate product').slice(0, 100),
    product_id: (link.productId || destination.pathname).slice(0, 100),
    link_placement: (link.placement || 'recipe_content').slice(0, 100),
    // Exclude query strings and fragments from analytics payloads.
    link_url: destination.origin + destination.pathname,
  };
}

export function installAnalytics(win, doc, measurementId) {
  if (!validMeasurementId(measurementId)) throw new Error('A real GA4 Measurement ID is required');
  if (win.__cravesmartAnalytics) return win.__cravesmartAnalytics;
  // Never send preview traffic into the production property.
  if (!['www.cravesmart.recipes', 'cravesmart.recipes', 'localhost', '127.0.0.1'].includes(win.location.hostname)) return null;
  let consent = null;
  let configured = false;
  try { consent = win.localStorage.getItem(ANALYTICS_CONSENT_KEY); } catch { /* Choice still works for this page. */ }
  win.dataLayer = win.dataLayer || [];
  win.gtag = win.gtag || function () { win.dataLayer.push(arguments); };
  win['ga-disable-' + measurementId] = consent !== 'granted';
  win.gtag('consent', 'default', { analytics_storage: 'denied' });
  const panel = doc.querySelector('[data-analytics-consent]');
  const showPanel = (show) => { if (panel) panel.hidden = !show; };
  const pageOptions = { page_location: win.location.origin + win.location.pathname };
  try {
    const referrer = new URL(doc.referrer);
    pageOptions.page_referrer = referrer.origin + referrer.pathname;
  } catch { pageOptions.page_referrer = ''; }
  if (new URLSearchParams(win.location.search).get('analytics_debug') === '1') pageOptions.debug_mode = true;

  function configure() {
    if (configured) return;
    configured = true;
    win.gtag('js', new Date());
    win.gtag('config', measurementId, {
      ...pageOptions,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    const script = doc.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    script.dataset.cravesmartGa = 'true';
    doc.head.append(script);
  }

  function choose(value, persist = true) {
    if (!['granted', 'denied'].includes(value)) throw new Error('Invalid analytics consent choice');
    consent = value;
    win['ga-disable-' + measurementId] = value !== 'granted';
    if (persist) {
      try { win.localStorage.setItem(ANALYTICS_CONSENT_KEY, value); } catch { /* Keep the in-memory choice. */ }
    }
    win.gtag('consent', 'update', { analytics_storage: value === 'granted' ? 'granted' : 'denied' });
    if (value === 'granted') configure();
    showPanel(false);
  }

  function click(event) {
    if ((event.type === 'click' && event.button !== 0) || (event.type === 'auxclick' && event.button !== 1)) return;
    const target = event.target?.closest ? event.target : event.target?.parentElement;
    const accept = target?.closest('[data-analytics-accept]');
    const reject = target?.closest('[data-analytics-reject]');
    const settings = target?.closest('[data-analytics-settings]');
    if (accept) { choose('granted'); return; }
    if (reject) { choose('denied'); return; }
    if (settings) { showPanel(true); return; }
    if (consent !== 'granted') return;
    const anchor = target?.closest('a[data-affiliate-link]');
    if (!anchor) return;
    let placement = anchor.dataset.linkPlacement || 'recipe_content';
    if (placement === 'recipe_content') {
      const headings = [...doc.querySelectorAll('main h2, main h3, main h4')];
      const preceding = headings.filter((heading) => heading.compareDocumentPosition(anchor) & 4).at(-1);
      if (preceding) placement += ':' + preceding.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
    const parameters = affiliateClickParameters({
      href: anchor.href,
      label: anchor.dataset.productLabel || anchor.textContent.trim(),
      productId: anchor.dataset.productId,
      placement,
    }, win.location, measurementId);
    if (parameters) win.gtag('event', 'affiliate_click', { ...parameters, ...pageOptions });
    // Link navigation is never intercepted or delayed.
  }

  win.addEventListener('storage', (event) => {
    if (event.key !== ANALYTICS_CONSENT_KEY && event.key !== null) return;
    choose(event.newValue === 'granted' ? 'granted' : 'denied', false);
    if (event.newValue === null) showPanel(true);
  });
  doc.addEventListener('click', click);
  doc.addEventListener('auxclick', click);
  if (consent === 'granted') {
    win.gtag('consent', 'update', { analytics_storage: 'granted' });
    configure();
  }
  showPanel(consent !== 'granted' && consent !== 'denied');
  const controller = { choose, openSettings: () => showPanel(true) };
  win.__cravesmartAnalytics = controller;
  return controller;
}
