# APS display advertising readiness

Status checked October 27, 2026. **APS serving is not configured in this repository.**
The code in this change prepares a local placement preview only. It cannot activate ads.

## Evidence and unresolved account state

| Item | Observed state | What it does not establish |
| --- | --- | --- |
| Amazon Content Partners | Enrollment and website ownership confirmed in the October 19 email | Separate APS enrollment, approval, or ad delivery |
| APS invitation | The email dated October 21 UTC links to **Unified Ad Marketplace (UAM)** and says **Complete enrollment** | Completion of enrollment; the subject line alone is not approval |
| Later account messages | No later APS approval, integration tags, or GAM setup message found in the searched mail | Absence of an email does not prove enrollment is incomplete |
| APS portal | Account documentation redirected to an Amazon sign-in page that rejected this browser's session/client | The dashboard's current enrollment, site approval, payment, or integration status remains unknown |
| Repository and live HTML | Amazon verification meta tag plus one asynchronous AdSense loader | Neither is an APS bid request or display-ad renderer |
| `public/ads.txt` and live `/ads.txt` | One existing Google seller record | No APS seller authorization has been added |
| Existing Google setup | Latest retrieved AdSense welcome email requests profile completion; repository notes describe an unpublished ad-consent draft | Current AdSense approval, GAM availability, Auto ads settings, or consent publication cannot be inferred |

The source snapshot was master `9a2c1b6c3d1461533cb12984d44ac83de3f8cd7c`.
There were no open repository pull requests when checked. Private invitation links,
account credentials, tax details, and payment details are intentionally not stored here.

## What is needed to finish

Obtain the following from the authenticated APS/GAM accounts before implementing the
network integration. These are missing evidence/configuration, not assertions that
every account step is unfinished:

1. APS enrollment and approval status for `www.cravesmart.recipes`, including any
   pending site review or agreement. Review the actual agreement before accepting it.
2. The account's current **web UAM integration instructions**, its APS publisher ID,
   approved domain, and any account-issued slot identifiers or generated tags.
   The `amazon-publisher-verify` value is not an APS advertising publisher ID.
3. The intended **Google Ad Manager** network and exact ad-unit paths/sizes, and
   confirmation that APS's UAM order/line items have been installed and activated.
   An AdSense `ca-pub-…` ID is not a GAM network code or ad-unit path.
4. The account-issued web `ads.txt` records for APS and enabled buyers. Append verified
   records while retaining the existing Google record; never copy another publisher's
   ID or use the invitation code as a seller ID.
5. The advertising consent configuration and actual APS privacy requirements. The
   existing **analytics** consent banner does not manage APS or AdSense consent.
   Confirm the advertising message's current published status and appropriate vendor
   coverage; update the privacy page when the integration's data practices are known.
6. APS payment/tax onboarding status for receiving earnings. Complete sensitive fields
   inside Amazon, not in source code or chat. Payment readiness is distinct from
   whether a test ad renders.

Amazon's public UAM instructions describe account creation, a GAM order/line-item
push, the website JavaScript integration, and payment setup. Account-specific docs
must determine the implementation; this change does not guess a universal APS tag.

## Prepared placement

`src/components/DisplayAdSlot.astro` is inserted after the complete recipe card and
before related recipes. The local DOM ID `cravesmart-ad-recipe-end` is our own
placement name, not an issued Amazon/GAM value.

- One proposed 300×250 placement on recipe detail pages only. This is a conservative
  first placement, not a claim of maximum revenue.
- Outside ingredients, instructions, unit toggles, print buttons, and affiliate links.
- Fixed 300×250 space, a separate label, and 48px vertical margins in the preview.
- A container query hides it if the actual content width is below 300px, including a
  320px viewport with the current 16px page padding. Never request a hidden slot.
- Hidden when printing, including recipes that do not use the special print layout.
- No refresh loop, sticky overlay, new dependency, or new browser script.

Preview locally:

```sh
DISPLAY_AD_PREVIEW=true PUBLIC_GA_MEASUREMENT_ID= npm run dev -- --host 127.0.0.1
```

Open a recipe such as `/recipes/carrot-cake-cream-cheese-frosting/`. The fixture is
explicitly labeled as a preview. The AdSense loader is suppressed while this local
preview flag is active to avoid making real ad requests during layout checks.
With the flag unset, the existing AdSense behavior is preserved.

`import.meta.env.DEV` is required: even `DISPLAY_AD_PREVIEW=true` in a production
build cannot enable a placeholder. The current component emits no production slot,
label, CSS, or JavaScript. There is deliberately no production APS enable switch.

## Integration and release checks once the accounts are ready

- Keep the publisher verification tag. Load each vendor library only once and
  asynchronously using the approved instructions. Astro currently performs full
  page navigation; revisit slot teardown if a client router is introduced later.
- For the documented GAM route, define only slots that fit their containers,
  register them, and coordinate the APS auction with GPT's initial ad request.
  Use a bounded timeout and a one-shot fallback so late callbacks cannot issue
  duplicate requests. Follow the current account instructions for consent and bids.
- Request the below-content slot near the viewport after required consent. Do not
  fetch ads for hidden or print-only placements, or add automatic refresh initially.
- Preserve AdSense until its settings are known. Decide explicitly whether Google
  demand will compete through GAM or use separate AdSense placements. Do not let
  Auto ads insert into or crowd the manually managed slot. No programmatic
  compatibility or live fill can be certified until the real tags/settings are tested.
- Check narrow mobile, normal mobile, desktop, print, blocked scripts, denied
  consent, no-fill, timeout, late-bid, and repeated navigation behavior. Compare
  layout shift, LCP, request count, and transferred JavaScript before/after.
- Use the providers' documented test/preview mode where available. Do not click
  live ads for testing. Verify real bid/slot requests, creative rendering, and
  APS/GAM reporting after an authorized production release. A build or loader
  HTTP response is not proof of billable impressions or revenue.

Current build guard:

```sh
# Use the real GA4 ID already configured for the site's production web stream.
npm run build
npm run check:ads
```

`check:ads` checks the intentionally inactive state across every generated HTML
page: one existing async AdSense loader, unchanged Amazon verification, no
unconfigured APS/GPT loader, no preview/empty-slot markup, and unchanged seller
records. Replace the inactive-state assertions with account-specific integration
checks as part of enabling real ads. Do not remove the checks merely to bypass a failure.

## Validation of this preparation change

- Clean production build passed with `DISPLAY_AD_PREVIEW=true`, the already-used
  production GA4 ID, and the current newsletter enabled. The preview flag still
  produced no production ad fixture.
- `npm run check:ads`: passed across all 41 generated HTML pages.
- `npm run test:analytics`: all 12 existing tests passed.
- `node scripts/check-indexing.mjs`: passed, including all 31 recipe destinations.
- Production CSS/JS asset hashes and sizes match the baseline; each recipe's HTML
  grew by one whitespace byte. No new browser dependency or vendor request was added.
- A local development HTTP render confirmed one fixture after the closed recipe
  card and before related recipes, with no AdSense/APS/GPT script loader.
- Full visual mobile/desktop/print browser QA is still outstanding: this browser
  could not access the local preview. Live fill, bidding, consent, reporting, and
  ad-related performance cannot be validated without the approved account setup.

The installed Vercel adapter requires a clean generated `.vercel/output` directory
before a repeated local build in this environment; a stale output directory caused
an `EEXIST` failure until it was removed. It also warns that the local Node 24
runtime differs from its selected Node 22 serverless runtime. Dependency upgrades
were not included in this advertising preparation change.

## Cost and scope

No ad-buying campaign, subscription, hosting migration, AWS resource, AI-bot
monetization, or crawler-policy change is part of this work. Amazon's public UAM
FAQ currently describes a 10% transaction fee taken from SSP and Amazon bid prices;
this is a revenue deduction, and the actual account agreement should be checked.

## Official references

- [Amazon UAM setup and FAQ](https://aps.amazon.com/aps/unified-ad-marketplace/index.html)
- [Google Ad Manager signup](https://support.google.com/admanager/answer/7084151)
- [AdSense/GAM account linking](https://support.google.com/admanager/answer/188529)
- [GPT loading and refresh](https://developers.google.com/publisher-tag/guides/control-ad-loading)
- [GPT layout-shift guidance](https://developers.google.com/publisher-tag/guides/minimize-layout-shift)
- [Google advertising consent requirements](https://support.google.com/adsense/answer/13554116)
