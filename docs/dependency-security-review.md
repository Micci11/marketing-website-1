# Dependency security follow-up — November 13, 2026

This is review-branch work only. Nothing has been merged, deployed, or submitted for AdSense review.

## Compatible fixes

Updated the lockfile within existing declared semver ranges (no `--force`). Notable updates include Astro 5.16.9 → 5.18.2, Vercel adapter 8.0.4 → 8.2.11, PostCSS 8.5.6 → 8.5.32, and Resend 6.9.4 → 6.38.0. This also removes the old critical `tar` advisory from the installed dependency tree.

Two narrowly scoped, same-major overrides repair pinned transitive dependencies: `@vercel/routing-utils` uses `path-to-regexp` 6.3.0; `@tailwindcss/typography` uses `postcss-selector-parser` 6.1.6. The application's build and route/content checks pass with these overrides.

The site uses direct HTML images from `public/`, not Astro image transformations. It now explicitly uses Astro's documented no-op image service. The compiled server function does not contain the Sharp package. This removes the application's unused Sharp processing path without changing its existing image URLs. The `_image` route can still exist, but its configured service performs no decoding/transformation. Do not reintroduce Sharp or add untrusted image processing before upgrading.

## Remaining exposure and uncertainty

The npm audit count fell from 32 (2 critical) to **11: 1 critical, 3 high, 4 moderate, 3 low**. Counts are package findings, not eleven proven exploitable website vulnerabilities.

- **Astro/Sharp AVIF decoding:** The critical advisory requires processing an attacker-controlled AVIF image. No image uploads, remote-image allowlist, or `astro:assets` transformations are used in this application. The new no-op service and absence of Sharp from the generated server function mitigate this processing path. Astro remains version-flagged; this is not a complete upstream patch.
- **Vercel path override:** Adapter versions below 10.0.2 retain a header/query path-override advisory. This application has no private/admin routes or route-based authentication; the only authored dynamic endpoint is the public contact form. Thus no protected destination was identified, but the underlying adapter issue remains and platform firewall/rate-limit interactions were not tested. Do not claim it is fixed.
- **Astro XSS/server-island/base-path advisories:** Source inspection found no server islands, dynamic `define:vars`, View Transition directives, configured base path, or user-authored MDX. Recipe MDX is repository-controlled and prerendered. Contact input is validated and escaped before email composition. These facts limit the corresponding attack surfaces but are not a penetration test or guarantee.
- **Zod/zod-to-ts:** Zod is used to validate repository-owned content at build time, not arbitrary public request collections. Its advisory remains pending a compatible framework migration.
- **glob/minimatch/nft:** Build tracing of repository files, rather than a user-facing glob API. Untrusted repositories/archive builds remain out of scope.
- **esbuild:** Remaining advisory concerns its Windows development server. Validation was on macOS; deployment is a Node server function. Never expose the development server publicly.

No exploit payloads or destructive security tests were sent to the live site. No compromise is alleged.

## Why a forced major upgrade was not applied

The current npm registry reports Astro 7.4.11 as the patched target. It requires Node >=22.23.4, while the available Node 22 validation runtime is 22.22.0. The installed Tailwind integration declares Astro 3/4/5 compatibility only. A safe upgrade therefore needs deliberate framework/integration changes (including CSS integration compatibility), updated Node runtime, Vercel adapter migration, and full server-rendering/deployment validation. `npm audit fix --force` can also propose surprising dependency downgrades, so it was not used.

Next: plan a separate tested Astro 7/compatible integrations migration. Preserve the existing content fixes and do not mix a blind major upgrade with publication.

## Verification

- Node 22.22.0: 22 analytics/contact/measurement tests pass.
- Production build passes with newsletter enabled and disabled.
- Recipe discovery, content readiness, Amazon-link checks, indexing, and all seven October recipe checks pass.
- `node scripts/check-security-baseline.mjs` verifies the no-op service, patched transitive versions, absence of Sharp in the generated server function, and Node 22 function configuration.
- Local Chrome regression checks pass: desktop/mobile layout, repeated menu toggles and navigation/back, recipe units/jump/print invocation, Supplements noindex/no ads, newsletter placement, and contact success/error presentation. Third-party traffic is blocked; no real email or signup is sent.
- `git diff --check` passes. No publication performed.

## Primary references

- https://github.com/advisories/GHSA-26w7-cxv4-gfx2
- https://github.com/advisories/GHSA-mr6q-rp88-fx84
- https://docs.astro.build/en/guides/images/#configure-no-op-passthrough-service
- https://docs.astro.build/en/guides/upgrade-to/v6/
- npm registry metadata for Astro and the installed integrations; `npm audit` run November 13, 2026.
