import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cravesmart.recipes',
  output: 'server',
  adapter: vercel(),
  integrations: [
    tailwind(),
    mdx(),
    sitemap()
  ],
});