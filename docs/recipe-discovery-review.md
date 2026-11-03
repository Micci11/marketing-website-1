# Recipe clarity and discovery review

Prepared November 3, 2026 against `c3f1bc08ef02877abb0edda165db19043fd7cebc`.
This is a draft PR for review. The branch is disabled in Vercel's Git deployment configuration; merging and deploying are separate actions.

## Changes and evidence

| Area | Evidence | Change |
| --- | --- | --- |
| Cottage cheese fried eggs | Existing frontmatter lists 5 minutes prep, 5 minutes cooking and one serving; the FAQ already permits reducing or skipping chili oil. | Put the 10-minute preparation and mild option in the title/description and introduction. Clarify optional shallot and garnishes in the method. |
| Stuffed chicken fries | Existing steps divide chicken into four portions, each wrapped around one of four mozzarella sticks. The coating is optional in the method and tips. | Make mozzarella required; group egg, breadcrumbs and parmesan under the optional coating. State four chicken sticks and one per serving. Emphasize the air-fryer method and distinguish the chicken filling from potatoes. |
| Crispy chicken tacos | Existing ingredients specify six mini tortillas and mozzarella; steps require both. The seasoning list already splits 2 tbsp for chicken and 1 tbsp for sauce. | Make tortillas and mozzarella required, label salsa/garnishes optional in the method, and distinguish the seasoning amounts. State six mini tacos and one per serving. Describe the existing 35-minute air-fryer/oven recipe. |
| Egg bake | FAQ recommended underbaking before freezing; tips reinforced soft centers; storage allowed 4–5 days. | Require fully cooked centers, prompt refrigeration, 3–4 days refrigerated storage and reheating to 165°F / 74°C. Specify cooked sausage/meat additions. |
| Tomato soup | Title says soup; ingredients include 1 cup each marinara, cottage cheese and broth plus 1½ tbsp cornflour; prose described pasta sauce, dip and pizza topping. | Preserve the title, URL, quantities and method. Describe only the listed mixture and preparation; remove the conflicting serving promises and unsupported marketing claims. The intended tested use remains a question below. |
| Product recommendations | Existing catalog and audit contain the retained/selected products. The five revised pages previously contained 33 product links, including five cookware sets on eggs and ten links on tacos. | Replace these with nine links total: one on eggs and two on each other page. Put them after the complete recipe card, with an adjacent Amazon Associate disclosure, neutral purposes and the existing affiliate tracking. |
| Newsletter | `src/config/newsletter.ts` and `NewsletterSignup.astro` already implement Kit form 9162136; the public homepage displays the signup. | Reuse that component once after each recipe, under the same `PUBLIC_NEWSLETTER_ENABLED` flag. No new form, provider, list, free sample, paid subscription or account setting. Hide the new sections when printing. |

The October 26 owner-thread search audit (September 27–October 24 reporting window) prioritized eggs, chicken fries and tacos. These edits use that page-level evidence and facts already in the recipes. No fresh Search Console query export was available here, and no ranking or revenue improvement is claimed. URLs and existing numeric nutrition values remain unchanged.

The new `recipeTools` frontmatter selects up to two products from the existing catalog. The Amazon check now verifies current selections against that catalog and the rendered links, rather than requiring the historical migration's occurrence counts forever. Historical URL verification, ASIN/variant/tag checks and the original audit records are preserved.

## Verified publication dates

The directory already sorts descending by `pubDate`; its implementation and the homepage do not need rebuilding. Seven missing dates were restored from the original publication merges, not from this edit date:

| Publication date | Recipes | Source |
| --- | --- | --- |
| October 20, 2026 | Ginger-Scallion Turkey Dumpling Lasagna; Hot-Honey Beef & Sweet-Potato Bowls; Tiramisu Protein Overnight Oats | [PR #4](https://github.com/Micci11/marketing-website-1/pull/4), merged `2026-10-20T17:40:01Z`; commit `10b29a6b55050d864c1b29716f0ba9077b764867` |
| October 21, 2026 | Chicken Broccoli Fritters; Korean BBQ Chicken and Sticky Rice; Sweet Chilli Popcorn Chicken Meal Prep; Tzatziki Cucumber Chicken Salad | [PR #5](https://github.com/Micci11/marketing-website-1/pull/5), merged `2026-10-21T17:13:30Z`; commit `cd2c061b0b65832dc99c50cba8222e01573b71c2` |

These are the verified publication-merge dates. An exact hosting deployment timestamp is not asserted. The October 23 recipes remain ahead of them, and the March recipes follow them.

## Food-handling references

- [FoodSafety.gov minimum internal temperatures](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures): poultry and casseroles containing poultry reach 165°F / 74°C; meat-free egg dishes reach 160°F / 71°C; leftovers reheat to 165°F / 74°C.
- [FDA egg safety](https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety): fully cook egg dishes, refrigerate cooked egg leftovers promptly and use within 3–4 days.

These safety endpoints clarify doneness; they do not establish that a particular appliance timing was newly tested. Existing times are retained as approximate guidance.

## Remaining decisions and verification

1. **Tomato recipe:** With exactly 1 cup marinara, 1 cup cottage cheese, 1 cup broth and 1½ tbsp cornflour, was the tested result served as a bowl of soup or as pasta sauce? The repository has contradictory prose and no firsthand record resolving that distinction. The draft keeps the existing soup title and limits the copy to the ingredients and method. Confirm the intended consistency before adding serving/texture promises or changing quantities.
2. **Existing nutrition estimates:** Do the taco figures include the entire yogurt/mayo sauce, and which tortilla/cheese brands and toppings? Do the chicken-fries figures include the optional egg, breadcrumb/parmesan coating and cooking spray? The existing yield and portion counts support one taco/stick per serving, but the calculation assumptions are not recorded. The draft preserves the numbers, qualifies them as approximate and makes no inclusion/exclusion claims. Egg-bake optional-addition nutrition also remains unverified.
3. **Newsletter delivery:** A Kit notice dated October 22 reports that a Verified Sending Domain was set up. The prior conversation still lacked a verified inbox-placement result. Current DNS/header verification could not be completed: the environment refused DNS resolution and public DNS-over-HTTPS requests, and the subsequent mailbox search hit a provider rate limit. This does not establish missing DNS records or a current authentication failure. Obtain an existing post-verification CraveSmart email's Authentication-Results header and inbox/spam location, or perform a separately authorized delivery test. Do not change DNS or account settings based on these environmental errors.

Kit's [sending-domain documentation](https://help.kit.com/en/articles/2502558-verify-your-domain-to-optimize-your-deliverability) explains SPF, DKIM and DMARC authentication; its [spam guidance](https://help.kit.com/en/articles/3372365-why-are-my-emails-going-to-spam) explains that authentication alone does not establish inbox placement. No live subscription or test email was created in this work. The recipe signup is prepared in this draft; inbox placement remains unverified.

## Validation

Use the existing public GA4 measurement ID for local production builds. Never add an API credential to this test configuration.

```sh
PUBLIC_GA_MEASUREMENT_ID=G-F7T10TTN0Q PUBLIC_NEWSLETTER_ENABLED=true ASTRO_TELEMETRY_DISABLED=1 npm run build
node scripts/check-recipe-discovery.mjs --newsletter-enabled
npm run check:amazon
npm run test:analytics
node scripts/check-indexing.mjs
node scripts/check-oct23-recipes.mjs
PUBLIC_GA_MEASUREMENT_ID=G-F7T10TTN0Q PUBLIC_NEWSLETTER_ENABLED=false ASTRO_TELEMETRY_DISABLED=1 npm run build
node scripts/check-recipe-discovery.mjs
git diff --check
```

Both production builds and all commands above passed. The affiliate audit checked 112 rendered links against the existing 44-product verified catalog; all 12 analytics tests and the seven October 23 recipe checks passed.

The new discovery check covers all 31 rendered recipe pages, form gating/uniqueness, metadata and recipe-schema parity, required/optional ingredients, corrected safety copy, unchanged numeric macros, focused affiliate links and newest-first directory order.

Local browser checks cover the five revised pages at 390px and 1440px, horizontal overflow, jump-to-recipe links, US/Metric controls, email-field validation and print hiding. Third-party requests are blocked during browser QA; these checks do not validate Kit delivery. The existing adapter warns that local Node 24 differs from its Vercel Node 22 function runtime; the production build completes.
