# Recipe clarity and discovery review

Prepared November 3, 2026 against `c3f1bc08ef02877abb0edda165db19043fd7cebc`.
These changes are prepared for review and intended for a draft PR. The branch is disabled in Vercel's Git deployment configuration; merging and deploying are separate actions.

## Changes and evidence

| Area | Evidence | Change |
| --- | --- | --- |
| Cottage cheese fried eggs | Existing frontmatter lists 5 minutes prep, 5 minutes cooking and one serving; the FAQ already permits reducing or skipping chili oil. | Put the 10-minute preparation and mild option in the title/description and introduction. Clarify optional shallot and garnishes in the method. |
| Stuffed chicken fries | Existing steps divide chicken into four portions, each wrapped around one of four mozzarella sticks. The coating is optional in the method and tips. | Make mozzarella required; group egg, breadcrumbs and parmesan under the optional coating. State four chicken sticks and one per serving. Emphasize the air-fryer method and distinguish the chicken filling from potatoes. |
| Crispy chicken tacos | Existing ingredients specify six mini tortillas and mozzarella; steps require both. The seasoning list already splits 2 tbsp for chicken and 1 tbsp for sauce. | Make tortillas and mozzarella required, label salsa/garnishes optional in the method, and distinguish the seasoning amounts. State six mini tacos and one per serving. Describe the existing 35-minute air-fryer/oven recipe. |
| Egg bake | FAQ recommended underbaking before freezing; tips reinforced soft centers; storage allowed 4–5 days. | Require fully cooked centers, prompt refrigeration, 3–4 days refrigerated storage and reheating to 165°F / 74°C. Specify cooked sausage/meat additions. |
| Tomato soup | Micci confirmed on November 3 that the intended dish is soup. Ingredients include 1 cup each marinara, cottage cheese and broth plus 1½ tbsp cornflour; older prose described pasta sauce, dip and pizza topping. | Align the introduction, image description and cooking language with soup. Preserve the title, URL, quantities and preparation; remove the conflicting serving promises and unsupported marketing claims. The soup/sauce distinction is resolved. |
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

## Owner clarification and optional ingredients

On November 3, Micci answered “Soup” when asked whether the tomato recipe was intended as soup or pasta sauce. That resolves the intended dish; it does not provide new nutrition-calculation assumptions. The recipe remains soup with its existing quantities and numeric nutrition values.

The optional additions in the prepared recipes are:

| Recipe | Optional additions |
| --- | --- |
| Tomato soup | Chopped fresh chilli. Parmesan is also suggested under Variations as a finishing addition, without a quantity. |
| Crispy chicken tacos | Fresh salsa (tomato, red onion, cilantro and lime juice), cilantro garnish, parmesan garnish, lime wedges, and cooking spray or light butter. Tortillas and mozzarella are required. |
| Stuffed chicken fries | The coating: 1 beaten egg, ¼ cup breadcrumbs and 2 tbsp parmesan; plus cooking spray. The 3 oz mozzarella filling is required. |
| Egg bake | 3 cups mixed fajita vegetables, 6 fully cooked chicken sausage links, and 6 servings fat-free shredded cheese. |
| Cottage cheese fried eggs | ½ small shallot and chopped chives; extra chili oil for topping is also optional. The listed ½ tbsp chili oil is part of the main recipe, with a mild variation that reduces or skips it. |

These are ingredient-list and variation distinctions, not claims that the original nutrition calculation included or excluded those additions.

## Remaining decisions and verification

1. **Existing nutrition estimates:** For tomato soup, which cottage cheese, marinara and broth were used, and were chilli or the parmesan variation counted? Do the taco figures include the entire yogurt/mayo sauce, and which tortilla/cheese brands and toppings? Do the chicken-fries figures include the optional egg, breadcrumb/parmesan coating and cooking spray? Were the egg-bake vegetables, sausage and cheese included, and were the fried-eggs optional toppings included? The existing yield and portion counts support one taco/stick per serving, but the calculation assumptions are not recorded. The draft preserves the numbers, qualifies the taco/fries estimates as approximate and makes no inclusion/exclusion claims. No nutrition values have been recalculated.
2. **Newsletter delivery:** A Kit notice dated October 22 reports that a Verified Sending Domain was set up. The prior conversation still lacked a verified inbox-placement result. Current DNS/header verification could not be completed: the environment refused DNS resolution and public DNS-over-HTTPS requests, and the subsequent mailbox search hit a provider rate limit. This does not establish missing DNS records or a current authentication failure. Obtain an existing post-verification CraveSmart email's Authentication-Results header and inbox/spam location, or perform a separately authorized delivery test. Do not change DNS or account settings based on these environmental errors.

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

After the owner confirmed the soup wording, the production build with newsletter enabled, `node scripts/check-recipe-discovery.mjs --newsletter-enabled` and `git diff --check` passed again. The follow-up changes only soup copy and these review notes; draft-PR creation remains pending and was not attempted.
