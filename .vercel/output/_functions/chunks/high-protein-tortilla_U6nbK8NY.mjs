import { l as createVNode, F as Fragment, aw as __astro_tag_component__ } from './astro/server_jCYk7d1r.mjs';
import 'clsx';

const frontmatter = {
  "title": "High-Protein Tortilla",
  "slug": "high-protein-tortilla",
  "description": "Easy homemade high-protein tortillas made with flour and faba bean protein powder. Soft, flexible, and perfect for wraps, tacos, or serving with curry.",
  "pubDate": "2026-03-16T00:00:00.000Z",
  "mealType": ["Snack", "Dinner"],
  "verdict": "Works",
  "coverImage": "/recipes/fernando-andrade-tsFV9YbJTnk-unsplash.jpg",
  "coverAlt": "Stack of soft high-protein tortillas",
  "prepTime": "10 mins",
  "cookTime": "5 mins",
  "totalTime": "35 mins",
  "servings": 8,
  "macros": {
    "calories": 121,
    "protein": 10.5,
    "carbs": 13,
    "fat": 2.1
  },
  "sourceNote": "Inspired by viral high-protein flatbread recipes and adapted into a simple tortilla format for CraveSmart.",
  "ingredientsDry": ["1 cup (125g) plain flour", "1 cup (125g) faba bean protein powder", "Pinch of sea salt"],
  "ingredientsWet": ["⅓ cup + 1 tbsp (100ml) warm water", "2 tsp (10ml) ghee"],
  "optionalIngredients": ["Extra flour for rolling", "Butter or ghee for serving"],
  "instructions": ["In a bowl, mix the plain flour and faba bean protein powder thoroughly so the protein distributes evenly.", "Add the ghee, salt, and warm water gradually while mixing until a firm dough forms.", "Knead the dough for 5–8 minutes until smooth.", "Cover the dough and let it rest for 20–30 minutes so the protein and flour hydrate properly.", "Divide the dough into 8 equal balls.", "Roll each ball into a thin tortilla using a rolling pin, lightly dusting with flour if needed.", "Heat a dry skillet or pan over medium-high heat.", "Cook each tortilla for about 20–30 seconds per side until bubbles form and light browning appears.", "Stack the tortillas immediately in a clean towel to trap steam and keep them soft."],
  "tips": ["Resting the dough is essential. It allows the protein powder to hydrate and prevents tough tortillas.", "Keep the pan hot so the tortillas cook quickly and stay soft.", "Stacking them in a towel helps them steam and remain flexible."],
  "variations": ["Add garlic powder or chili powder to the dough for extra flavor.", "Use the tortillas for tacos, wraps, or burritos.", "Serve alongside curry or stews instead of traditional flatbread."],
  "storage": ["Store tortillas in an airtight container in the fridge for up to 4 days.", "Reheat briefly in a pan or microwave to soften."],
  "faq": [{
    "question": "Why is resting the dough important?",
    "answer": "Protein powders absorb water more slowly than flour. Resting the dough allows everything to hydrate evenly so the tortillas stay soft instead of dry."
  }, {
    "question": "Can I freeze these tortillas?",
    "answer": "Yes. Stack them with parchment between each tortilla and freeze for up to 2 months."
  }, {
    "question": "What can I use them for?",
    "answer": "They work great as taco shells, wraps, burritos, or even as a high-protein side for curries."
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
      children: "These tortillas are soft, flexible, and surprisingly high in protein without feeling dense or dry. They work just like regular tortillas but give you a much better macro profile, making them perfect for everyday meals."
    }), "\n", createVNode(_components.h2, {
      id: "simple-ingredients",
      children: "Simple Ingredients"
    }), "\n", createVNode(_components.p, {
      children: "This recipe keeps things minimal. The combination of plain flour and faba bean protein powder creates structure while still keeping the tortillas soft. Ghee adds a bit of richness, and water brings everything together into a workable dough."
    }), "\n", createVNode(_components.h2, {
      id: "best-ways-to-enjoy-them",
      children: "Best Ways to Enjoy Them"
    }), "\n", createVNode(_components.p, {
      children: "Use these tortillas for tacos, wraps, or burritos, or serve them alongside curries and stews as a high-protein alternative to flatbread. They also work great for meal prep since they store well and reheat easily."
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

const url = "src/content/recipes/high-protein-tortilla.mdx";
const file = "C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/high-protein-tortilla.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/high-protein-tortilla.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
