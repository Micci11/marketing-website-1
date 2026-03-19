import { l as createVNode, F as Fragment, aw as __astro_tag_component__ } from './astro/server_jCYk7d1r.mjs';
import 'clsx';

const frontmatter = {
  "title": "Popcorn Slice",
  "slug": "popcorn-slice",
  "description": "Chocolate popcorn slice with a salty sweet crunch. A high-protein no-bake snack that’s easy to make and perfect chilled.",
  "pubDate": "2026-03-18T00:00:00.000Z",
  "mealType": ["Snack", "Desserts"],
  "verdict": "Works",
  "coverImage": "/recipes/chocolate-caramel-popcorn-bars-15.jpg",
  "coverAlt": "Chocolate popcorn slice with a salty sweet crunch",
  "prepTime": "10 mins",
  "cookTime": "0 mins",
  "totalTime": "1 hr 10 mins",
  "servings": 12,
  "macros": {
    "calories": 102,
    "protein": 4,
    "carbs": 9,
    "fat": 5
  },
  "sourceNote": "Inspired by a viral popcorn slice recipe and adapted for CraveSmart.",
  "ingredientsDry": ["3½ cups (100g) lightly salted and slightly sweet popcorn", "2 tbsp (20g) PB2 original", "1 scoop (35g) salted caramel whey protein"],
  "ingredientsWet": ["3.2 oz (90g) 70% dark chocolate", "Small splash of water"],
  "optionalIngredients": ["Maldon salt"],
  "instructions": ["Blend the popcorn in a food processor until broken down, then pour it into a bowl.", "If you do not have a food processor, crush the popcorn in a zip bag using a rolling pin.", "Mix the PB2 and whey protein together.", "Add a small splash of water and stir into a thick paste.", "Fold the mixture through the popcorn until evenly coated.", "Press firmly into a lined container.", "Melt the dark chocolate in 20 to 30 second bursts until smooth.", "Pour the melted chocolate over the top.", "Finish with Maldon salt if using.", "Refrigerate for 1 to 2 hours until set.", "Slice into 12 pieces."],
  "tips": ["Press the mixture down firmly so it holds together properly.", "Keep it chilled so the slice sets cleanly.", "Use good dark chocolate because the flavor really comes through here."],
  "variations": ["Use a darker chocolate if you want a less sweet finish.", "Add extra Maldon salt on top for a stronger salty sweet contrast.", "Swap the salted caramel whey for vanilla if needed."],
  "storage": ["Store in an airtight container in the fridge for up to 5 days.", "Serve chilled for the best texture."],
  "faq": [{
    "question": "Can I make this without a food processor?",
    "answer": "Yes. Put the popcorn in a zip bag and crush it with a rolling pin until broken down."
  }, {
    "question": "Does this need to stay in the fridge?",
    "answer": "Yes. Chilling helps it set and keeps the bars firm."
  }, {
    "question": "Can I use milk chocolate instead?",
    "answer": "Yes, but it will be sweeter and the macros will change."
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
      children: "This one is crunchy, chocolatey, salty, sweet, and stupidly easy to make. It feels like a real treat, but the macros still make sense."
    }), "\n", createVNode(_components.h2, {
      id: "simple-ingredients",
      children: "Simple Ingredients"
    }), "\n", createVNode(_components.p, {
      children: "The ingredient list is short and straightforward. Popcorn gives it volume and crunch, PB2 plus whey add the protein hit, and dark chocolate pulls the whole thing together."
    }), "\n", createVNode(_components.h2, {
      id: "best-ways-to-enjoy-them",
      children: "Best Ways to Enjoy Them"
    }), "\n", createVNode(_components.p, {
      children: "These are best straight from the fridge once fully set. They work well as a quick snack, an easy dessert, or something to keep on hand when you want a treat that does not completely derail the day."
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

const url = "src/content/recipes/popcorn-slice.mdx";
const file = "C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/popcorn-slice.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/popcorn-slice.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };
