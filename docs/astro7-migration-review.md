# Astro 7 migration review — November 13, 2026

Prepared on `codex/astro7-security-migration` from security-review commit `248f88f`. The earlier `codex/recipe-clarity-and-discovery` branch is unchanged. This branch is explicitly deployment-disabled in `vercel.json`. No production settings, deployment, PR, or AdSense submission were made.

## Compatibility choices

- Astro 7.4.11, MDX 8.1.5, Vercel adapter 11.0.21, sitemap 3.7.4, with a committed lockfile.
- Node 22.23.5 for local validation, installed only in a temporary QA directory. `.nvmrc` records that version; `engines.node` requires >=22.23.4 and <23. The generated function still targets `nodejs22.x`. The computer's system Node was not changed.
- Retained Tailwind 3 and the existing theme/typography plugin. Replaced the Astro-5-only Tailwind integration with direct Tailwind/Autoprefixer PostCSS configuration and explicit global CSS directives. No Tailwind 4 redesign.
- Moved content configuration to the current `src/content.config.ts` location and imported Zod from `astro/zod`. Recipe source content and nutritional figures are unchanged by this migration.
- Contact credentials now use `process.env` at request time. Astro 6+ inlines `import.meta.env`, so keeping the old form would bake configuration into the build. A generated-function test proves configuration set after build/import works. It intercepts all email fetches with a fake response; no real message is sent.
- Retained the no-op image service. Images remain direct public assets; no Sharp package is in the generated function.
- Retained scoped same-major routing and selector-parser overrides. The current Vercel adapter still pins a vulnerable routing dependency without the override. No forced downgrade was accepted.

## Security result

`npm ci` and `npm audit` report **zero known vulnerabilities** for this lockfile on November 13, 2026. This supersedes the remaining dependency flags described in the earlier `dependency-security-review.md` only for this separate migration branch, not for production or the earlier review branch. An audit is not a penetration test or a guarantee against undisclosed defects.

The new built-runtime regression verifies that untrusted `x-astro-path` headers and `x_astro_path` query parameters do not redirect an unknown route into the contact API. Both return 404 and do not invoke the mocked email sender.

## Verification performed

- Clean `npm ci` under Node 22.23.5; no dependency peer/engine warnings on clean installation.
- All 22 analytics/contact/measurement tests passed.
- Production builds passed with newsletter both enabled and disabled.
- All 31 recipe discovery/schema/metadata checks, content-readiness checks, 44 affiliate-link checks, indexing checks, and seven October recipe checks passed.
- `check:security-baseline` passed; Node 22 generated function, no-op image processing, patched transitive versions.
- `check:built-runtime` passed against the actual generated Vercel handler: missing configuration 503, mocked success 303, runtime environment values, and untrusted path overrides rejected.
- Headless Chrome desktop/mobile checks passed against both the Astro development server and generated static assets plus the actual generated Vercel handler served on localhost. Covered repeated menu toggling, navigation/back, no horizontal overflow, recipe units/jump/print invocation, newsletter count, Supplements noindex/no ad script, and contact error/success presentation. No page JavaScript errors. Third-party requests blocked.
- Desktop/mobile screenshots inspected. Existing visual design retained.
- `git diff --check` passed.

## Before any publication

This is a locally validated migration candidate, not a verified Vercel deployment. Verify the hosting build uses Node >=22.23.4 (not merely an older Node 22 patch); the provider controls the deployed runtime patch. Confirm real contact sender/recipient configuration and an authorized delivery test, newsletter provider delivery, and production analytics/consent behavior. No external signup, email, analytics event, or advertising request was made in these isolated checks. Hosting route/firewall behavior still needs an authorized preview/deployment check. Existing recipe factual questions remain as documented in `content-readiness-review.md`.

References: https://docs.astro.build/en/guides/upgrade-to/v6/ and https://docs.astro.build/en/guides/upgrade-to/v7/; installed integration source and current npm registry metadata/audit.
