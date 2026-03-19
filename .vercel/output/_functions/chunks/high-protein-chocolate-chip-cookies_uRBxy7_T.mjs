import { l as createVNode, F as Fragment, aw as __astro_tag_component__ } from './astro/server_jCYk7d1r.mjs';
import 'clsx';

const frontmatter = {
  "title": "High-Protein Chocolate Chip Cookies",
  "slug": "high-protein-chocolate-chip-cookie",
  "description": "Soft center, crisp edges, and a real chocolate hit. A high-protein chocolate chip cookie recipe with a lighter macro-friendly version and classic flavor.",
  "pubDate": "2026-03-17T00:00:00.000Z",
  "mealType": ["Desserts"],
  "verdict": "Works",
  "coverImage": "/recipes/ifrah-akhter-lY4-xXL3szE-unsplash.jpg",
  "coverAlt": "Soft chocolate chip cookies with melted chocolate",
  "prepTime": "15 mins",
  "cookTime": "18 mins",
  "totalTime": "1 hr 30 mins",
  "servings": 10,
  "macros": {
    "calories": 140,
    "protein": 7,
    "carbs": 11,
    "fat": 7
  },
  "sourceNote": "Inspired by a viral recipe and rebuilt for better macros and consistency.",
  "ingredientsWet": ["⅔ cup (160g) low-fat cottage cheese", "1 tbsp vanilla extract", "¼ cup (80ml) sugar-free maple syrup", "¼ cup (56g) light butter, melted", "¼ cup (50g) brown monkfruit sweetener", "1 large egg"],
  "ingredientsDry": ["¾ cup (95g) all-purpose flour", "1 scoop (30g) vanilla protein powder", "½ tsp baking soda", "½ tsp baking powder", "½ tsp salt"],
  "optionalIngredients": ["½ cup (80g) dark chocolate chips"],
  "instructions": ["Blend the cottage cheese, vanilla, and maple syrup until completely smooth.", "In a separate bowl, whisk the melted butter and sweetener together for about 1 minute.", "Add the egg and blended cottage cheese mixture, then mix for 30 seconds.", "Add the flour, protein powder, baking soda, baking powder, and salt. Mix until just combined.", "Fold in the chocolate chips.", "Chill the dough for 60 minutes (this step is essential).", "Preheat the oven to 325°F / 165°C.", "Scoop into 10 cookies and place on a lined baking tray.", "Bake for 16–18 minutes until lightly golden.", "Let cool before eating so the texture sets properly."],
  "tips": ["Chilling the dough is key for structure and texture.", "Do not overmix once flour is added.", "Shape the cookies right after baking if needed."],
  "variations": ["Use whey-casein blend protein for better texture.", "Swap chocolate chips for chopped dark chocolate.", "Add flaky salt on top for a bakery-style finish."],
  "storage": ["Store in an airtight container for up to 4 days.", "Reheat briefly for a softer texture."],
  "faq": [{
    "question": "Why use cottage cheese?",
    "answer": "It adds moisture and protein without needing extra fat."
  }, {
    "question": "Can I skip chilling?",
    "answer": "Not recommended. The cookies will spread too much."
  }, {
    "question": "Do they taste high-protein?",
    "answer": "No. The texture and flavor stay very close to classic cookies."
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
      children: "These cookies have a soft center, crisp edges, and a real chocolate flavor without feeling like a “protein dessert.” They strike a balance between indulgent and macro-friendly, making them easy to fit into everyday eating."
    }), "\n", createVNode(_components.h2, {
      id: "simple-ingredients",
      children: "Simple Ingredients"
    }), "\n", createVNode(_components.p, {
      children: "This recipe uses cottage cheese to add moisture and protein while keeping the fat lower than traditional cookies. A mix of flour and protein powder creates structure, while sweetener and maple syrup keep the texture soft and balanced."
    }), "\n", createVNode(_components.h2, {
      id: "best-ways-to-enjoy-them",
      children: "Best Ways to Enjoy Them"
    }), "\n", createVNode(_components.p, {
      children: "Enjoy these cookies fresh once cooled for the best texture, or reheat briefly for a warm, softer center. They work well as a dessert, snack, or post-workout treat when you want something sweet that still supports your macros."
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

const url = "src/content/recipes/high-protein-chocolate-chip-cookies.mdx";
const file = "C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/high-protein-chocolate-chip-cookies.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/high-protein-chocolate-chip-cookies.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
