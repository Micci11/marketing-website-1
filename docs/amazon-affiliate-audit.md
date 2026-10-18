# Amazon affiliate migration audit

Checked on 2026-10-18. All 120 links in 17 recipe files were migrated from 37 real amzn.to redirects. Each replacement returned HTTP 200, an Amazon product title and the expected selected ASIN, with the new tag retained in the final URL. No unverified replacement links remain in this audit. This verifies public destinations and URL attribution; it does not verify commission credit in the Associates account or guarantee future stock/availability.

## Configuration and maintenance

- Change the tracking ID only in `src/lib/amazon.mjs`.
- Product ASINs, labels, and observed variant/offer parameters live in `src/data/amazon-products.json`.
- Recipes use `<AmazonLink product="catalogKey" />`; the shared component supplies sponsored/nofollow links.
- Run `npm run build`, then `npm run check:amazon` to check every generated recipe link and reject stale short links or tags.
- Raw one-time evidence and original occurrence locations are in `docs/amazon-affiliate-audit.json`; those observed URLs are an audit snapshot, not runtime configuration.

## Destination details

The old Vitamix short link used a different third-party tag; it was migrated along with the old CraveSmart tag. Old link IDs and search/referral parameters were removed. Observed `th`, `psc`, seller and language parameters were retained.

Two original URL ASINs rendered different selected child ASINs. The replacements pin the actual selected child: CAROTE brown 21-piece `B0FQ42KD14` → `B0H343M1NQ`, and Equip chocolate 30 servings `B0CP3WZYG8` → `B013MRPPL6`. The vanilla short link led to a landing page, but the replacement directly verified the same original vanilla ASIN `B01M2Y1NN8`.

The Ninja air fryer description was corrected from Max XL to the actual AF150AMZ XL model without substituting its product.

| Original short code | Catalog key | Verified ASIN | Links |
|---|---|---|---:|
| 3NKO2fu | caroteCeramic21Piece | B0GHQ45SRL | 5 |
| 3NLLYUv | nakedCaseinUnflavored1lb | B0787TJJNQ | 3 |
| 3NXBq4S | hexclad16Piece | B0CVCTPFTR | 5 |
| 3O18qJt | usaPan8Inch | B0029JMMRE | 3 |
| 3PIuKIh | ninjaProfessionalDuo | B0BMGSZMW9 | 5 |
| 3PnXdDl | parchment70SqFt | B001T6JTMY | 6 |
| 3Ptp8BO | alphaTortillaPress8Inch | B0D7QX6CDN | 1 |
| 40YKkC6 | turelarImmersionBlender | B0CPLVLFK2 | 2 |
| 41x4rHC | luvanGlassBowls | B072MQH8B8 | 8 |
| 41xnly4 | fullstar2In1 | B0C1T6J3CS | 3 |
| 41yeBaZ | naturalForceVanillaWhey1lb | B00NGT4M7Y | 3 |
| 47m1j4S | finedine6PieceBowls | B01HTYH8YA | 8 |
| 47mRQdA | farberwareRollingPin | B005D6GFFA | 3 |
| 47mp8JQ | homureCookieScoops | B08LVY3F83 | 1 |
| 47nj5os | oxo9InchTongs | B00004OCK0 | 4 |
| 47ntH6P | ninjaKitchenSystemProPlus | B0CKTY2QT4 | 2 |
| 4877cTI | kitchenaidPizzaWheel | B07YP2VL68 | 1 |
| 4bItRa1 | caroteStainless21PieceBrown | B0H343M1NQ | 5 |
| 4bzemCF | cuisinart2QtSaucepan | B00008CM6C | 1 |
| 4c2pCaJ | pyrex2Cup3Pack | B075WCTKP3 | 1 |
| 4c6viAt | ganizaFoodProcessor | B0BRMM85HG | 1 |
| 4rTzAjq | monkDrops | B07CQLG4P7 | 1 |
| 4rUFMry | nordicWare8InchPan | B06XT59LF6 | 3 |
| 4rYCxPz | duseu2CupMoldsBlue | B0G1YDRHRG | 1 |
| 4sA7BGJ | equipChocolate | B013MRPPL6 | 3 |
| 4sBNxno | fullstar14In1 | B0DNZRSCMS | 3 |
| 4sFwHEg | equipVanilla | B01M2Y1NN8 | 3 |
| 4sxjVaB | brevilleJouleOven | B0BYFTZT3H | 4 |
| 4t8Mrzi | sweese8OzRamekinsWhite | B0DN5LRJCK | 1 |
| 4t8lZWw | ninjaXlAirFryer | B08QKTXT1N | 4 |
| 4t94kxU | hexclad10Piece | B0CVCV8XDT | 5 |
| 4tcZeAU | carote44PieceBlack | B0FTRQD63S | 5 |
| 4uHTCzY | equipSaltedCaramel | B0CG36P4YC | 3 |
| 4uI6vdk | lakantoClassicAllulose1lb | B0CFSL5L2M | 1 |
| 4uNl7Iy | vitamixE310Black | B0758JHZM3 | 6 |
| 4uQtfYN | souperCubes2Cup2PackBlueberry | B0D1669N8C | 2 |
| 4uShTDo | nordicWareHalfSheet2Pack | B0049C2S32 | 4 |

## Deployment boundary

This review branch is explicitly disabled in `vercel.json` under `git.deploymentEnabled` so pushing it does not create a preview deployment. Production/master behavior is unchanged. No merge or deployment is authorized.

The existing AdSense integration is preserved. The previously deferred dependency updates and unpublished AdSense consent message are outside this affiliate migration. No additional improvement requirements were present in the available thread.
