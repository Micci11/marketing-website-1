// src/content.config.ts  ← must be this exact filename
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const recipes = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',          // Matches .md and .mdx files
    base: './src/content/recipes'       // Use forward slashes!
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    coverImage: z.string().optional(),
    verdict: z.enum(['Works', 'Meh', "Don't bother"])
      .transform((val) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()),
    pubDate: z.date().optional(),
    category: z.enum([
      'High-Protein Comfort',
      'Macro-Friendly Desserts',
      'Weeknight Wins',
      'Volume Eats',
      'Sweet, Not Stupid'
    ]).optional(),  // ← Made optional to avoid "required" errors during testing
    affiliateLink: z.string().optional(),
    macros: z.object({
      protein: z.number().optional(),
      carbs: z.number().optional(),
      fat: z.number().optional(),
      calories: z.number().optional(),
    }).optional(),
  }),
});

export const collections = {
  recipes,  // ← key must match folder name "recipes"
};