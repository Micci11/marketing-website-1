import { l as createVNode, F as Fragment, aw as __astro_tag_component__ } from './astro/server_jCYk7d1r.mjs';
import 'clsx';

const frontmatter = {
  "title": "High-Protein Cottage Cheese Pizza",
  "slug": "high-protein-cottage-cheese-pizza",
  "description": "A viral high-protein pizza made with a cottage cheese crust. Crispy, cheesy, and packed with protein.",
  "pubDate": "2026-03-16T00:00:00.000Z",
  "mealType": ["Dinner"],
  "verdict": "Works",
  "coverImage": "/recipes/ivan-torres-MQUqbmszGGM-unsplash.jpg",
  "coverAlt": "High protein cottage cheese pizza with melted mozzarella and pepperoni",
  "prepTime": "10 mins",
  "cookTime": "25 mins",
  "totalTime": "35 mins",
  "servings": 2,
  "macros": {
    "calories": 848,
    "protein": 82,
    "carbs": 45,
    "fat": 37
  },
  "sourceNote": "Inspired by a trending viral cottage cheese pizza recipe and adapted for CraveSmart.",
  "ingredientsDry": ["¼ cup (30g) all-purpose flour", "1 tsp Italian seasoning", "½ tsp garlic powder"],
  "ingredientsWet": ["¾ cup + 2 tbsp (210g) cottage cheese, 4%", "2 large eggs"],
  "optionalIngredients": ["1 cup (110g) shredded mozzarella cheese", "½ cup (120g) pizza sauce", "Pepperoni or toppings of choice (about 20g suggested)"],
  "instructions": ["Preheat the oven to 400°F / 200°C. Line a baking tray with parchment paper.", "In a bowl, blend or whisk the cottage cheese and eggs until mostly smooth.", "Add the flour, Italian seasoning, and garlic powder and mix until a thick batter forms.", "Spread the mixture evenly onto the lined baking tray to form a pizza base.", "Bake for 15–20 minutes until the crust is set and lightly golden.", "Remove from the oven and spread pizza sauce evenly over the crust.", "Top with mozzarella and your desired toppings.", "Return to the oven and bake for another 8–10 minutes until the cheese melts.", "Slice and serve while hot."],
  "tips": ["Blend the cottage cheese first if you want a smoother crust texture.", "Spread the base thinly for a crispier pizza.", "Bake the crust fully before adding toppings to prevent sogginess."],
  "variations": ["Use part-skim mozzarella or light mozzarella to reduce fat.", "Add vegetables like mushrooms, peppers, or onions for extra volume.", "Use turkey pepperoni or grilled chicken for even more protein."],
  "storage": ["Store leftovers in an airtight container in the fridge for up to 3 days.", "Reheat in the oven or air fryer to keep the crust crisp."],
  "faq": [{
    "question": "Does the crust taste like cottage cheese?",
    "answer": "Not really. Once baked with the flour and seasoning, it tastes more like a soft, cheesy flatbread."
  }, {
    "question": "Can I make the crust thinner?",
    "answer": "Yes. Spread the batter thinner on the tray for a crispier pizza-style crust."
  }, {
    "question": "Can I air fry it?",
    "answer": "Yes, if your air fryer basket is large enough. Cook the crust first, then add toppings and finish cooking until melted."
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
      children: "This pizza gives you all the comfort of a classic slice but with a much higher protein payoff. The crust is soft on the inside with lightly crisp edges, and once loaded with toppings, it actually feels like a real pizza—not a compromise."
    }), "\n", createVNode(_components.h2, {
      id: "simple-ingredients",
      children: "Simple Ingredients"
    }), "\n", createVNode(_components.p, {
      children: "The base uses cottage cheese and eggs to create a high-protein crust without needing traditional dough. A small amount of flour helps with structure, while seasoning brings in that classic pizza flavor."
    }), "\n", createVNode(_components.h2, {
      id: "best-ways-to-enjoy-it",
      children: "Best Ways to Enjoy It"
    }), "\n", createVNode(_components.p, {
      children: "Serve this pizza hot straight from the oven for the best texture. Keep toppings simple for a classic feel or load it up with vegetables and lean protein to turn it into a full, balanced meal."
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

const url = "src/content/recipes/cottage-cheese-pizza.mdx";
const file = "C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/cottage-cheese-pizza.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/cottage-cheese-pizza.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
