# CraveSmart content and functionality review

Prepared November 13, 2026. This is review-branch work, not a publication or an AdSense review request.

## Repository and public-site state

- Default branch: `master` at `c3f1bc08ef02877abb0edda165db19043fd7cebc`.
- Starting review branch: `codex/recipe-clarity-and-discovery` at `386e9ed6bfed637d6177096e7fa8b8d428bf0916`.
- Preserve the November 3 changes and the branch-specific Vercel deployment-disable setting.
- October measurement/troubleshooting improvements, the recipe directory repair, owner-approved homepage/About wording and the broccoli-soup nutrition clarification were already merged. Do not treat that work as unpublished.
- Public pages inspected November 13 still showed the Supplements placeholder, soup/sauce mismatch, older egg-bake wording, Isabella bio and `hello@cravesmart.com`. Those specific public pages had not picked up the November review-branch corrections.
- The repository tree contains no `AGENTS.md`, `SKILL.md` or `.agents/skills` files. The available README is the Astro starter README.
- No PR is created by this follow-up. Earlier draft-PR creation was denied by automatic approval review and remains pending. No merge, deployment or AdSense review request is performed.

## Changes and evidence

| Area | Existing evidence | Prepared change |
| --- | --- | --- |
| Unfinished destinations | Supplements only advertised Coming Soon, with desktop/mobile navigation links. Homepage also promoted an unavailable cookbook. | Remove the Supplements navigation links and cookbook placeholder promotion. Retain the Supplements URL as a useful recipe-directory signpost, with noindex, no AdSense script and sitemap exclusion. Keep it crawlable so search engines can see noindex. |
| Public identity and contact | The author name/photo and public .com email are unverified. Existing recipe/about copy was approved in merged PR #11. | Remove the unsupported name, portrait and email; use factual brand copy and the existing contact form. Preserve the owner-approved tested/tweaked headline and paragraph. Remove the unsupported response-time promise. Footer disclosure now describes the existing Amazon affiliate relationship instead of promoting a supplement business. |
| Contact submission | The endpoint awaited Resend but did not inspect its returned error; it could redirect to success when sending failed. It also logged submitted personal information. | Validate input and configured sender/recipient, escape message HTML, inspect provider error/message ID, and redirect with 303 only on provider acceptance. Return generic errors otherwise; remove personal-data logging. Show the existing success redirect on the contact page. No email is sent by the tests. |
| Egg bake | Six eggs, 3 cups egg whites and 3 cups cottage cheese for six portions. Vegetables, sausage and shredded cheese are listed as optional. Existing steps include 10 minutes prep, about 35 minutes baking and a 10-minute rest. | Keep optional additions conditional and describe the per-container split. Use six 2-cup oven-safe containers, with manufacturer limits and no storage lids. Correct total planning time to 55 minutes including the existing rest. Preserve fully-cooked storage guidance from November 3. |
| Nutrition assumptions | The five November recipes and shortcut wings have existing figures without a complete calculation record. | Preserve every calorie/protein/carbohydrate/fat number. Add visible and schema-linked caveats specifying what is unknown. No new nutrition calculation or assumed inclusion/exclusion. |
| Shortcut wings | Original ingredients already call for 12–14 oz cooked tenders and 1/3 cup sauce; the method already defers to package directions. | Explicitly require fully cooked tenders, choose one measured sauce, distinguish optional dips, use package reheating instructions and remove a misleading universal cook/total time. Clarify two servings and storage. No invented scratch recipe, brand test or original photography claim. |
| Affiliate blocks | The 17 older recipes had long tool lists and, on several pages, unsupported first-person product/sweetener claims. The catalog already contains the selected tools. | Finish reducing these pages to one or two relevant tools after the complete recipe card: 28 links across 17 pages. Retain disclosures/tracking and use neutral purposes. Remove unsupported personal claims, including the cheesecake sweetener/brain-fog anecdote. Other 14 recipe pages retain their existing selections. |
| Optional dessert additions | Older chocolate-chip cookies and cheesecake label chips/blueberries optional but add them unconditionally. | Make those two directions conditional. Clarify the cheesecake's existing minimum two-hour chill and remove its incomplete fixed total-time value. Preserve the sweetener quantity without inventing a concentrated-liquid conversion; direct readers to their label. |
| Metric quantities | The legacy parser turned `1 1/2` into `1`, because the fractional part was looked up only as a Unicode glyph. A range such as `12 to 14 oz` converted only its upper endpoint. | Parse the fraction of a mixed number and convert both range endpoints. Keep the existing conversion factors and authored quantities. Explicit US/metric arrays in the October recipes are preserved. |

The prior soup correction follows the owner's explicit confirmation that it is soup. The existing ingredient amounts and recipe URL stay unchanged. The prior newsletter reuse, search-opportunity titles/descriptions and seven verified publication dates remain in this branch; see [the November 3 review](recipe-discovery-review.md).

## Exact unresolved facts

1. **Chicken fries:** Did the incomplete November 4 correction mean that the egg, 1/4 cup breadcrumbs and 2 tbsp parmesan coating is required? Was that coating, and was cooking spray, included in the original per-stick nutrition? The follow-up question was unanswered. Do not reinterpret the fragment as an answer. Mozzarella remains required, as already supported by the four-stick method; coating status and numeric nutrition remain unchanged in this follow-up.
2. **Nutrition:** Confirm brands/quantities counted for egg-bake vegetables, sausage and shredded cheese; taco tortillas, cheese, full yogurt/mayo sauce and toppings; soup marinara, cottage cheese, broth and toppings; fried-eggs shallot, chives and extra oil; and wings tender brand/weight, sauce and dips. The page caveats make the current limits explicit.
3. **Cheesecake sweetener:** Which original sweetener and concentration correspond to the listed 2 tbsp? No product-specific liquid equivalence is verified or supplied.
4. **Author/contact facts:** Confirm the public author name, approved portrait/biography and any email address to publish. The factual brand pages and existing contact form do not require an invented replacement. Actual contact delivery and current environment configuration have not been tested.
5. **Newsletter:** A prior Kit notice reported a verified sending domain, but no post-verification Authentication-Results header or inbox/spam result is available. Prior DNS/network errors and a mailbox rate limit do not prove missing authentication. No DNS, account, subscription, permissions or paid-service changes were made.
6. **Original recipe evidence:** This work improves clarity using existing facts. It does not supply new cooking trials, product comparisons or original process photos. Any further claims of specific firsthand results need actual records.
7. **AdSense:** The reported status is Needs attention / Low value content; ads.txt is Authorized. Google did not identify specific offending pages. These changes address concrete reader-facing issues, but cannot establish which pages caused the decision or guarantee approval.

## Validation status

The selected execution environment failed during provisioning. It has no usable shell, filesystem, Node/Astro runtime or browser for this follow-up. No current production build or browser run is claimed.

Completed using the connector-accessible source and the tool's JavaScript runtime:

- Seven contact-helper test cases passed with an injected mock sender: provider acceptance, returned error, missing message ID, thrown error, invalid fields, missing configuration and HTML escaping.
- Three measurement test cases passed, including execution of the actual template converter with TypeScript annotations removed: mixed fractions, existing numeric formats, and real mixed-fraction/range conversions.
- Source checks verify unchanged recipe slugs, publication dates, servings and numeric macro blocks; catalog-backed affiliate selections; one or two tools per revised page; no unmoved affiliate blocks on those pages; valid quoted frontmatter strings; JavaScript syntax of added/changed modules (imports stubbed); sitemap-filter behavior; and the retained branch deployment-disable setting.
- These source/mock checks are not substitutes for Astro compilation, rendering, Node's test runner, browser interaction or real email delivery.

Run all applicable checks in a working checkout before publication:

```sh
npm ci
npm run test:contact
npm run test:measurements
npm run test:analytics
PUBLIC_GA_MEASUREMENT_ID=G-F7T10TTN0Q PUBLIC_NEWSLETTER_ENABLED=true ASTRO_TELEMETRY_DISABLED=1 npm run build
node scripts/check-recipe-discovery.mjs --newsletter-enabled
npm run check:content
npm run check:amazon
node scripts/check-indexing.mjs
node scripts/check-oct23-recipes.mjs
PUBLIC_GA_MEASUREMENT_ID=G-F7T10TTN0Q PUBLIC_NEWSLETTER_ENABLED=false ASTRO_TELEMETRY_DISABLED=1 npm run build
node scripts/check-recipe-discovery.mjs
npm run check:content
git diff --check
```

The historical `check-recipe-revisions.mjs` includes a migration-only assertion that the original 17 recipes are byte-for-byte unchanged since an October commit. It is not a current full-site regression check for this authorized revision. The discovery, affiliate, indexing and October 23 checks above cover current supported expectations.

Browser checks still required: mobile/desktop navigation and layout; Supplements noindex/no ads; jump and print; mixed fractions/ranges in metric mode; optional ingredients and nutrition notes; contact success/error presentation; newsletter on/off behavior. Block third-party requests during local QA. Any real message/signup delivery test needs separate authorization.

## References

- [AdSense content guidance](https://support.google.com/adsense/answer/7299563?hl=en)
- [Google noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
- [Astro sitemap filtering](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- [Resend Node.js response handling](https://resend.com/docs/send-with-nodejs)
- [FoodSafety.gov minimum internal temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures)

Readiness: prepared for code/content review on the existing branch. Full build/browser verification, the factual clarifications above, PR authorization and publication authorization remain outstanding. Do not request an AdSense review until authorized publication and live verification have occurred.
