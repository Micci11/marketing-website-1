# Affiliate click analytics

## Investigation

On 2026-10-18, live recipe HTML and the deployed master source had AdSense but no GA loader, GA configuration, affiliate event listener, or affiliate metadata. The only other remote branch was the already-merged Amazon link migration. Vercel's latest Production deployment referenced Micci11/marketing-website-1 master commit 694a4d639f823943be30695925f1fe5c42b2fca2. This is an absent implementation, not an unmerged tracking change.

## Required configuration

Set PUBLIC_GA_MEASUREMENT_ID to the intended GA4 web stream's real G-... ID in Vercel's Production environment, then rebuild/deploy. Production builds fail clearly when this ID is missing or invalid. The ID is public; do not provide an API secret or account credentials. Never deploy a fixture ID used by local tests.

Find it in Google Analytics: select the intended CraveSmart property, then Admin > Data collection and modification > Data streams > select the CraveSmart web stream > Measurement ID. Confirm the stream URL is https://www.cravesmart.recipes/.

## Behavior

Google Analytics loads only after the visitor allows analytics. Footer Analytics preferences lets them reject or change consent. Denial disables GA and custom click events; changes synchronize across tabs. Preview Vercel hosts never load the production property. Analytics and AdSense consent are separate; this does not publish or change the existing AdSense consent draft.

AmazonLink marks all catalog-backed body links. The separate Shop This Recipe links are also marked. One delegated listener records ordinary/keyboard clicks; another records middle clicks only. Neither blocks navigation. Body placement includes the nearest preceding recipe heading; frontmatter links use shop_this_recipe.

The affiliate_click event explicitly routes to the configured property and includes page_path, recipe_path, product_id, product_label, link_placement, and link_url. Query strings/fragments are removed from event URLs and page referrers; no form input is included. Public campaign labels from utm_source, utm_medium, utm_campaign, utm_content, and utm_id are forwarded explicitly to GA's built-in campaign fields on page configuration and affiliate events. Only a single value containing 1–100 letters, digits, dots, underscores, tildes or hyphens is accepted; duplicate or invalid values are omitted. Arbitrary query parameters remain excluded. Advertising personalization/Google signals are disabled in this analytics configuration. Reporting does not establish Amazon commission credit or purchases.

## Mandatory live verification

1. Confirm the intended Analytics property, stream ID, and stream URL before deploying.
2. Configure event-scoped custom dimensions product_label, product_id, link_placement under Admin > Data display > Custom definitions. Use GA's existing page-path dimension.
3. Open a real production recipe with ?analytics_debug=1 in a test browser, allow analytics, and click an actual Amazon product link. This query enables debug mode only for that visit; normal visitors omit it.
4. In the intended property, Admin > Data display > DebugView, inspect affiliate_click and verify the exact page/recipe path, product label, and placement. Also verify Reports > Realtime > Event count by Event name. A successful build, queued dataLayer command, or collect HTTP response alone is not completion.
5. Check normal and middle clicks and the other link placement, then leave debug mode by reopening the clean URL.

## Reports

Immediately: Reports > Realtime, select affiliate_click. For event parameters, use DebugView on the test visit.

Processed data: Reports > Engagement > Events > affiliate_click (some properties expose Events through another report collection). Custom dimensions may take 24–48 hours to become available.

For a useful durable report: Explore > Free form; add Page path and screen class, Product label, Link placement (optionally Product ID), Event name and Event count. Filter Event name exactly matches affiliate_click. Use page/product/placement as rows and Event count as the value. No affiliate_click key event or revenue attribution is implied.

## Current verification status

Production uses measurement ID G-F7T10TTN0Q in CraveSmart property 559430050 (web stream 16153785473). On 2026-10-18 at 12:43:33 PM America/New_York, the intended property's DebugView showed a real affiliate_click from /recipes/high-protein-blondies with product_label "Natural Force vanilla whey — 1 lb", product_id naturalForceVanillaWhey1lb and link_placement recipe_content:simple-ingredients. The Product label, Product ID and Link placement event-scoped custom dimensions are registered. This verifies the original affiliate event; campaign-attribution changes require their own post-deployment check.

Launch-day QA visits include both debug and ordinary test visits around 12:42–12:53 PM America/New_York. Historical test traffic cannot all be reliably separated. Do not describe these clicks as purchases or commissions.

The homepage newsletter form has no provider or successful submission handler, and there is no successful newsletter signup event. Do not count form_submit as a successful signup or show an invented signup metric.

Saved exploration: https://analytics.google.com/analytics/web/#/analysis/a412386024p559430050/edit/DnRdv8kxQ6q3yRabk2CkzA

Official references:
- https://developers.google.com/analytics/devguides/collection/ga4/events
- https://developers.google.com/tag-platform/security/guides/consent
- https://support.google.com/analytics/answer/9539598
- https://support.google.com/analytics/answer/7201382
- https://support.google.com/analytics/answer/14239696
- https://developers.google.com/analytics/devguides/collection/ga4/reference/config
