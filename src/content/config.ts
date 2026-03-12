import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const recipes = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/recipes'
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    coverImage: z.string().optional(),
    verdict: z.enum(['Works', 'Meh', "Don't bother"])
      .transform((val) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()),
    pubDate: z.date().optional(),
    category: z.enum([
      'Breakfast',
      'Dinner',
      'Snack',
      'Desserts',
      'High-Protein Comfort',
      'Macro-Friendly Desserts',
      'Weeknight Wins',
      'Volume Eats',
      'Sweet, Not Stupid'
    ]).optional(),
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
  recipes,
};