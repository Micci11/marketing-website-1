import { l as createVNode, F as Fragment, aw as __astro_tag_component__ } from './astro/server_jCYk7d1r.mjs';
import 'clsx';

const frontmatter = {
  "title": "High-Protein Brownies",
  "slug": "high-protein-brownies",
  "description": "Fudgy high-protein brownies inspired by a trending Instagram recipe. Easy to make, macro-friendly, and perfect chilled.",
  "pubDate": "2026-03-11T00:00:00.000Z",
  "mealType": ["Desserts"],
  "verdict": "Works",
  "coverImage": "/recipes/anna-przepiorka-LjtviHokbr4-unsplash.jpg",
  "coverAlt": "Stack of fudgy high-protein brownies",
  "prepTime": "10 mins",
  "cookTime": "15 mins",
  "totalTime": "25 mins",
  "servings": 9,
  "macros": {
    "calories": 99,
    "protein": 11,
    "carbs": 8,
    "fat": 2
  },
  "sourceNote": "Inspired by a trending Instagram recipe and adapted for CraveSmart.",
  "ingredientsDry": ["⅔ cup (80g) plain flour", "3 tbsp (20g) cocoa powder", "½ cup (65g) chocolate protein powder", "2 tsp (10g) sweetener of choice", "Pinch of Himalayan salt"],
  "ingredientsWet": ["⅔ cup (150ml) egg whites", "2 large eggs", "½ cup (100g) cottage cheese", "1½ tbsp (20g) applesauce", "1 tbsp + 1 tsp (20ml) maple syrup", "1 tsp (5ml) vanilla extract"],
  "optionalIngredients": ["Chocolate chips, if desired"],
  "instructions": ["Preheat the oven to 350°F / 180°C. Line a small baking tray or pan with parchment paper.", "In a medium bowl, whisk together the flour, cocoa powder, chocolate protein powder, sweetener, and salt.", "Add the egg whites, eggs, cottage cheese, applesauce, maple syrup, and vanilla to a blender. Blend for about 10 seconds, just until smooth.", "Pour the wet mixture into the dry ingredients and fold until a thick brownie batter forms.", "Spread the batter into the lined pan. Add chocolate chips on top if using.", "Bake for 12 to 15 minutes, depending on how fudgy you want the center.", "Cool completely before slicing. For the best texture, chill the brownies in the fridge before serving."],
  "tips": ["Do not overblend the wet ingredients or the batter can get too loose.", "Let them cool fully before cutting so they set properly.", "These taste even better cold, straight from the fridge."],
  "variations": ["Use vanilla protein powder for a lighter chocolate flavor.", "Add chocolate chips or chopped walnuts for extra texture.", "Swap maple syrup for sugar-free syrup if you want to lower the sugar."],
  "storage": ["Store in an airtight container in the fridge for up to 4 days.", "These are best served chilled."],
  "faq": [{
    "question": "Do these brownies taste like cottage cheese?",
    "answer": "Not really. Once blended into the wet ingredients, the cottage cheese mostly disappears and adds moisture plus protein."
  }, {
    "question": "Can I use whey protein?",
    "answer": "Yes, but different protein powders absorb moisture differently, so you may need to adjust slightly if the batter seems too thick or thin."
  }, {
    "question": "Can I freeze them?",
    "answer": "Yes. Slice first, then freeze in a sealed container with parchment between layers."
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
      children: "These brownies are rich, fudgy, and chocolatey while still being surprisingly macro-friendly. They deliver that classic dessert texture without feeling heavy, making them an easy go-to when you want something sweet that still fits your goals."
    }), "\n", createVNode(_components.h2, {
      id: "simple-ingredients",
      children: "Simple Ingredients"
    }), "\n", createVNode(_components.p, {
      children: "This recipe uses a mix of cocoa powder and chocolate protein powder to create deep chocolate flavor while boosting protein. Cottage cheese and egg whites add moisture and structure without relying on high fat, keeping the brownies soft and balanced."
    }), "\n", createVNode(_components.h2, {
      id: "best-ways-to-enjoy-them",
      children: "Best Ways to Enjoy Them"
    }), "\n", createVNode(_components.p, {
      children: "These brownies are best once fully cooled or chilled, which helps them firm up and develop a fudgier texture. Enjoy them as a dessert, snack, or post-workout treat, and pair them with coffee or a glass of milk for the full experience."
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

const url = "src/content/recipes/high-protein-brownies.mdx";
const file = "C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/high-protein-brownies.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/high-protein-brownies.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
