import { l as createVNode, F as Fragment, aw as __astro_tag_component__ } from './astro/server_jCYk7d1r.mjs';
import 'clsx';

const frontmatter = {
  "title": "High-Protein Egg Salad",
  "slug": "high-protein-egg-salad",
  "description": "A high-protein, high-volume egg salad packed with nutrients. Creamy, flavorful, and perfect for a quick healthy meal.",
  "pubDate": "2026-03-17T00:00:00.000Z",
  "mealType": ["Snack", "Dinner"],
  "verdict": "Works",
  "coverImage": "/recipes/Green-Goddess-Egg-Salad-4.jpg",
  "coverAlt": "Creamy high-protein egg salad served with lettuce",
  "prepTime": "10 mins",
  "cookTime": "8 mins",
  "totalTime": "18 mins",
  "servings": 2,
  "macros": {
    "calories": 270,
    "protein": 22,
    "carbs": 10,
    "fat": 15
  },
  "sourceNote": "Inspired by @shredhappens and adapted for CraveSmart.",
  "ingredientsDry": ["1 tsp (3g) onion powder", "Salt and pepper to taste"],
  "ingredientsWet": ["5 medium eggs (250g)", "½ cup (75g) green peas", "¼–⅓ red onion (40g), finely diced", "2 tbsp (30g) mayonnaise", "5 tbsp (75g) 0% Greek yogurt", "1 tbsp (15g) Dijon or whole grain mustard"],
  "optionalIngredients": ["2 tbsp (8g) fresh herbs (parsley, chives, or dill)", "Cos lettuce, capsicum, or peppers for serving"],
  "instructions": ["Boil the eggs for 7½ to 8 minutes.", "Transfer immediately to an ice bath, then peel and halve.", "Mash the green peas in a bowl.", "Finely dice the red onion.", "Add the eggs, peas, onion, mayonnaise, Greek yogurt, and mustard to a large bowl.", "Season with onion powder, salt, and pepper.", "Mix and mash to your desired texture.", "Serve immediately or chill before serving."],
  "tips": ["Use an ice bath to stop cooking and keep the yolks creamy.", "Adjust the mash level depending on whether you want chunky or smooth.", "Let it chill for 30 minutes for even better flavor."],
  "variations": ["Add chopped celery for extra crunch.", "Use avocado instead of some mayo for a healthier fat source.", "Add chili flakes or hot sauce for heat."],
  "storage": ["Store in an airtight container in the fridge for up to 3 days.", "Do not freeze."],
  "faq": [{
    "question": "Is this good for meal prep?",
    "answer": "Yes. It stores well for a few days and is perfect for quick meals or snacks."
  }, {
    "question": "Can I lower the calories?",
    "answer": "Reduce the mayonnaise and replace more of it with Greek yogurt."
  }, {
    "question": "How should I serve it?",
    "answer": "Serve with lettuce cups, peppers, or on toast depending on your macros."
  }]
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "why-youll-love-this-recipe",
    "text": "Why You’ll Love This Recipe"
  }, {
    "depth": 2,
    "slug": "simple-ingredients",
    "text": "Simple Ingredients"
  }, {
    "depth": 2,
    "slug": "best-ways-to-enjoy-it",
    "text": "Best Ways to Enjoy It"
  }, {
    "depth": 2,
    "slug": "inspiration",
    "text": "Inspiration"
  }];
}
function _createMdxContent(props) {
  const _components = {
    h2: "h2",
    p: "p",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h2, {
      id: "why-youll-love-this-recipe",
      children: "Why You’ll Love This Recipe"
    }), "\n", createVNode(_components.p, {
      children: "This egg salad is creamy, filling, and packed with protein without feeling heavy. It hits that comfort-food vibe but keeps the macros in check, making it perfect for quick meals, snacks, or meal prep."
    }), "\n", createVNode(_components.h2, {
      id: "simple-ingredients",
      children: "Simple Ingredients"
    }), "\n", createVNode(_components.p, {
      children: "This recipe uses a mix of whole eggs, Greek yogurt, and a small amount of mayonnaise to create a creamy texture without overloading on fat. Green peas add volume and a slight sweetness, while mustard and onion bring sharpness and balance."
    }), "\n", createVNode(_components.h2, {
      id: "best-ways-to-enjoy-it",
      children: "Best Ways to Enjoy It"
    }), "\n", createVNode(_components.p, {
      children: "Serve this egg salad in lettuce cups for a lighter option, on toast for a more filling meal, or alongside sliced peppers and vegetables for a high-volume snack. It also works great as a meal prep option since the flavor improves slightly after chilling."
    }), "\n", createVNode(_components.h2, {
      id: "inspiration",
      children: "Inspiration"
    }), "\n", createVNode(_components.p, {
      children: "At CraveSmart, we take viral recipes and rebuild them with smarter macros, cleaner ingredients, and clear step-by-step instructions so they actually work in real kitchens."
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}

const url = "src/content/recipes/high-protein-egg-salad.mdx";
const file = "C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/high-protein-egg-salad.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/high-protein-egg-salad.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
