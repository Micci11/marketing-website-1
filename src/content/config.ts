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
    coverAlt: z.string().optional(),

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

    prepTime: z.string().optional(),
    cookTime: z.string().optional(),
    totalTime: z.string().optional(),
    servings: z.number().optional(),

    sourceNote: z.string().optional(),

    ingredientsDry: z.array(z.string()).optional(),
    ingredientsWet: z.array(z.string()).optional(),
    optionalIngredients: z.array(z.string()).optional(),
    instructions: z.array(z.string()).optional(),
    tips: z.array(z.string()).optional(),
    variations: z.array(z.string()).optional(),
    storage: z.array(z.string()).optional(),

    faq: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ).optional(),

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