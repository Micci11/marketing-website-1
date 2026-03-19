import { l as createVNode, F as Fragment, aw as __astro_tag_component__ } from './astro/server_jCYk7d1r.mjs';
import 'clsx';

const frontmatter = {
  "title": "Easy Boneless Wings",
  "slug": "easy-boneless-wings",
  "description": "Crispy boneless wings made fast using store-bought chicken tenders. Toss them in your favorite sauce for an easy weeknight meal.",
  "pubDate": "2026-03-16T00:00:00.000Z",
  "mealType": ["Dinner", "Snack"],
  "verdict": "Works",
  "coverImage": "/recipes/peter-pham-v5yVy3IhSRU-unsplash.jpg",
  "coverAlt": "Crispy boneless wings tossed in sauce",
  "prepTime": "5 mins",
  "cookTime": "15 mins",
  "totalTime": "20 mins",
  "servings": 2,
  "macros": {
    "calories": 520,
    "protein": 42,
    "carbs": 28,
    "fat": 26
  },
  "sourceNote": "Inspired by viral wing recipes but simplified using store-bought chicken tenders for a fast meal.",
  "ingredientsDry": ["Pinch of salt (optional)", "Pinch of black pepper (optional)"],
  "ingredientsWet": ["12–14 oz (340–400g) cooked chicken tenders, store-bought", "⅓ cup (80ml) sauce of choice"],
  "optionalIngredients": ["Sweet chili sauce (Whole Foods brand recommended)", "Buffalo sauce", "BBQ sauce", "Ranch or blue cheese dressing", "Green onions or sesame seeds for garnish"],
  "instructions": ["Preheat the oven or air fryer according to the chicken tender package directions.", "Cook the chicken tenders until hot and crispy.", "Slice the tenders into bite-sized pieces to resemble boneless wings.", "Place the chicken in a bowl and toss with your sauce of choice.", "Serve immediately while hot."],
  "tips": ["Air frying the tenders gives the crispiest texture.", "Toss the chicken in sauce right before serving so it stays crispy.", "Cutting the tenders into chunks makes them feel more like classic boneless wings."],
  "variations": ["Buffalo wings: toss the chicken in buffalo sauce and serve with ranch or blue cheese.", "BBQ wings: coat with your favorite BBQ sauce.", "Asian-style wings: toss the chicken in sweet chili sauce."],
  "storage": ["Store leftover chicken in an airtight container in the fridge for up to 3 days.", "Reheat in an air fryer or oven to restore crispiness."],
  "faq": [{
    "question": "Why use store-bought chicken tenders?",
    "answer": "This recipe is designed to be extremely quick. Using pre-cooked tenders skips breading and frying while still delivering crispy boneless wings."
  }, {
    "question": "What sauce works best?",
    "answer": "Any wing sauce works. Sweet chili sauce creates an easy Asian-style version."
  }, {
    "question": "Can I turn this into a meal?",
    "answer": "Yes. If you're going for an Asian-style version with sweet chili sauce, serving the wings over rice works really well."
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
      children: "These boneless wings are crispy, saucy, and ridiculously easy to make. They give you that takeout-style comfort food without the time or mess of frying from scratch."
    }), "\n", createVNode(_components.h2, {
      id: "simple-ingredients",
      children: "Simple Ingredients"
    }), "\n", createVNode(_components.p, {
      children: "This recipe keeps things simple by using store-bought chicken tenders as the base. You skip breading and frying, but still get a crispy result that works perfectly with any sauce."
    }), "\n", createVNode(_components.h2, {
      id: "best-ways-to-enjoy-them",
      children: "Best Ways to Enjoy Them"
    }), "\n", createVNode(_components.p, {
      children: "Serve these wings hot and freshly tossed in sauce for the best texture. Pair them with a dipping sauce like ranch or blue cheese, or turn them into a full meal by serving over rice or alongside fries."
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

const url = "src/content/recipes/easy-boneless-wings.mdx";
const file = "C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/easy-boneless-wings.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/easy-boneless-wings.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
