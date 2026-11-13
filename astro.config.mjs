import { defineConfig, passthroughImageService } from 'astro/config';
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.cravesmart.recipes',
  adapter: vercel(),
  // Images are served directly from public/; do not expose unused Sharp processing.
  image: { service: passthroughImageService() },
  vite: { css: { postcss: { plugins: [tailwind(), autoprefixer()] } } },
  integrations: [ mdx(), sitemap({ filter: (page) => !/\/supplements\/?$/.test(page) })],
});
