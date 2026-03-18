import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const recipes = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/recipes'
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    description: z.string(),

    coverImage: z.string().optional(),
    coverAlt: z.string().optional(),

    verdict: z.enum(['Works', 'Testing', 'Archived']).default('Works'),

    pubDate: z.coerce.date().optional(),

    mealType: z.array(
      z.enum([
        'Breakfast',
        'Lunch',
        'Dinner',
        'Snack',
        'Desserts'
      ])
    ).optional(),

    tags: z.array(z.string()).optional(),

    featured: z.boolean().optional(),
    homepageSpotlight: z.boolean().optional(),
    homepagePriority: z.number().optional(),

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