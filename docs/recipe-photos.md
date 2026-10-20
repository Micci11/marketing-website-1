# Replacing recipe photos

Recipe images are ordinary files in `public/recipes`. Each recipe's MDX frontmatter
sets `coverImage` and `coverAlt`; the existing recipe pages and cards read those
fields directly.

| Recipe | Image file | Recipe file |
| --- | --- | --- |
| Hot-Honey Beef & Sweet-Potato Bowls | `public/recipes/hot-honey-beef-sweet-potato-bowls.png` | `src/content/recipes/hot-honey-beef-sweet-potato-bowls.mdx` |
| Ginger-Scallion Turkey Dumpling Lasagna | `public/recipes/ginger-scallion-turkey-dumpling-lasagna.png` | `src/content/recipes/ginger-scallion-turkey-dumpling-lasagna.mdx` |
| Tiramisu Protein Overnight Oats | `public/recipes/tiramisu-protein-overnight-oats.png` | `src/content/recipes/tiramisu-protein-overnight-oats.mdx` |

1. Export your replacement photo in its actual image format. To keep the current
   paths, export it as PNG and replace the corresponding file above.
2. If you prefer JPEG or WebP, save a new file in `public/recipes` and update
   `coverImage` in the recipe file, for example:

   ```yaml
   coverImage: "/recipes/tiramisu-protein-overnight-oats.jpg"
   coverAlt: "Coffee overnight oats topped with vanilla cream and cocoa"
   ```

   Do not rename a JPEG to `.png`; the extension should match the file format.
3. Update `coverAlt` to describe the new photo. The image fields need no special
   labels, badges, captions, or component changes.
4. Run `PUBLIC_GA_MEASUREMENT_ID= npm run dev -- --host 127.0.0.1` and check the recipe page and its category
   page at desktop and phone widths. Check that card crops keep the food visible.
   The empty measurement ID keeps local previews out of production Analytics.
   Run `PUBLIC_GA_MEASUREMENT_ID=G-F7T10TTN0Q npm run build` before preparing
   a publication change; production builds require the Analytics configuration.

The current three PNGs are 1536 × 1024. Similar landscape framing works with the
existing card crops. Keep an uncropped original outside the repository if you
want to adjust framing later.

Replacing a file or running the local build does not publish it. Publication
requires an approved Git/Vercel action.
