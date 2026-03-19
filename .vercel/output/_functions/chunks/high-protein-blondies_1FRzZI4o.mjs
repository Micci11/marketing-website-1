import { l as createVNode, F as Fragment, aw as __astro_tag_component__ } from './astro/server_jCYk7d1r.mjs';
import 'clsx';

const frontmatter = {
  "title": "High-Protein Blondies",
  "slug": "high-protein-blondies",
  "description": "Soft, gooey high-protein blondies with a buttery vanilla flavor. Easy to make, macro-friendly, and even better chilled.",
  "pubDate": "2026-03-17T00:00:00.000Z",
  "mealType": ["Desserts"],
  "verdict": "Works",
  "coverImage": "/recipes/Easy-Blondies-Main.jpg",
  "coverAlt": "Stack of gooey high-protein blondies",
  "prepTime": "10 mins",
  "cookTime": "15 mins",
  "totalTime": "25 mins",
  "servings": 9,
  "macros": {
    "calories": 109,
    "protein": 11,
    "carbs": 9,
    "fat": 3
  },
  "sourceNote": "Inspired by a viral blondie recipe and adapted for CraveSmart.",
  "ingredientsDry": ["¾ cup + 1 tbsp (100g) plain flour", "½ cup (65g) vanilla whey protein isolate", "½ cup (65g) vanilla casein protein powder", "2 tsp (10g) sweetener of choice", "Pinch of Himalayan salt"],
  "ingredientsWet": ["⅔ cup (150ml) egg whites", "2 large eggs", "½ cup (100g) high-protein Greek yogurt, 0% fat", "1½ tbsp (20g) applesauce", "1 tbsp + 1 tsp (20ml) maple syrup", "1½ tbsp (20g) light butter"],
  "optionalIngredients": ["White chocolate chunks", "Melted Biscoff"],
  "instructions": ["Preheat the oven to 350°F / 180°C. Line a small baking tray or pan with parchment paper.", "In a medium bowl, whisk together the flour, whey protein, casein protein, sweetener, and salt until evenly combined.", "Add the egg whites, eggs, Greek yogurt, applesauce, maple syrup, and light butter to a blender. Blend for about 10 seconds until smooth.", "Pour the wet mixture into the dry ingredients and fold until a thick blondie batter forms.", "Spread the batter into the lined pan.", "Add white chocolate chunks or melted Biscoff on top if using.", "Bake for 12 to 15 minutes, depending on how gooey you want the center.", "Cool completely before slicing. For the best texture, chill in the fridge before serving."],
  "tips": ["Do not overmix once the wet and dry ingredients are combined.", "Casein helps the blondies stay soft and gooey.", "These taste best chilled after they’ve fully set."],
  "variations": ["Add white chocolate chips for a sweeter blondie.", "Swirl in a little Biscoff for a richer dessert.", "Use vanilla bean paste for an even stronger vanilla flavor."],
  "storage": ["Store in an airtight container in the fridge for up to 4 days.", "These are best served cold."],
  "faq": [{
    "question": "Why use both whey and casein?",
    "answer": "Whey adds protein, while casein helps create a softer, thicker blondie texture."
  }, {
    "question": "Can I skip the optional toppings?",
    "answer": "Yes. The blondies are designed to work without them, and the listed macros do not include those extras."
  }, {
    "question": "Are these better warm or cold?",
    "answer": "They’re best cold from the fridge once they’ve fully set."
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
    "slug": "best-ways-to-enjoy-them",
    "text": "Best Ways to Enjoy Them"
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
      children: "These high-protein blondies are soft, gooey, and packed with vanilla flavor. If brownies are the brooding cousin, these are the better-behaved blonde sibling that still knows how to party."
    }), "\n", createVNode(_components.h2, {
      id: "simple-ingredients",
      children: "Simple Ingredients"
    }), "\n", createVNode(_components.p, {
      children: "The ingredient list is straightforward and built for texture. Whey and casein boost the protein, Greek yogurt keeps them moist, and a little butter plus maple syrup makes them taste like an actual dessert instead of edible drywall."
    }), "\n", createVNode(_components.h2, {
      id: "best-ways-to-enjoy-them",
      children: "Best Ways to Enjoy Them"
    }), "\n", createVNode(_components.p, {
      children: "These blondies are best straight from the fridge. Eat them as-is, add white chocolate if you want a sweeter version, or drizzle a little Biscoff on top when you’re feeling reckless."
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

const url = "src/content/recipes/high-protein-blondies.mdx";
const file = "C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/high-protein-blondies.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/high-protein-blondies.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
