import { defineConfig, passthroughImageService } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.cravesmart.recipes',
  adapter: vercel(),
  // Images are served directly from public/; do not expose unused Sharp processing.
  image: { service: passthroughImageService() },
  integrations: [tailwind(), mdx(), sitemap({ filter: (page) => !/\/supplements\/?$/.test(page) })],
});
