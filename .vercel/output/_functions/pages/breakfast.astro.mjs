/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_jCYk7d1r.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_CJgjBS0v.mjs';
import { g as getCollection } from '../chunks/_astro_content_BksQjm7J.mjs';
export { renderers } from '../renderers.mjs';

const $$Breakfast = createComponent(async ($$result, $$props, $$slots) => {
  const allRecipes = await getCollection("recipes");
  const breakfastRecipes = allRecipes.map((recipe) => ({
    ...recipe,
    urlSlug: recipe.id.replace(/\.mdx?$/, "")
  })).filter((recipe) => recipe.data.mealType?.includes("Breakfast") && recipe.data.verdict === "Works").sort((a, b) => new Date(b.data.pubDate || 0).getTime() - new Date(a.data.pubDate || 0).getTime());
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Breakfast \u2013 CraveSmart", "description": "Proven viral breakfast recipes that fuel your day with great taste and smart macros." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="bg-white text-gray-900 py-16 md:py-24"> <div class="container mx-auto px-4 max-w-5xl"> <h1 class="text-5xl md:text-6xl font-heading font-bold mb-6 text-center">
Breakfast
</h1> <p class="text-xl md:text-2xl text-center mb-12 text-gray-700 max-w-3xl mx-auto">
Start your day strong with proven viral breakfast recipes that taste amazing and fit your macros.
</p> ${breakfastRecipes.length > 0 ? renderTemplate`<div class="space-y-16 md:space-y-24"> ${breakfastRecipes.map((recipe) => renderTemplate`<article class="flex flex-col md:flex-row gap-6 md:gap-12 items-start pb-16 border-b border-gray-200 last:border-0 last:pb-0"> ${recipe.data.coverImage && renderTemplate`<div class="md:w-5/12 lg:w-2/5 flex-shrink-0 rounded-xl overflow-hidden shadow-md"> <div class="recipe-image"> <img${addAttribute(recipe.data.coverImage, "src")}${addAttribute(recipe.data.title, "alt")}> </div> </div>`} <div class="flex-1"> <h3 class="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4"> <a${addAttribute(`/recipes/${recipe.urlSlug}`, "href")} class="hover:text-tiffany transition"> ${recipe.data.title} </a> </h3> <p class="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed"> ${recipe.data.description} </p> <a${addAttribute(`/recipes/${recipe.urlSlug}`, "href")} class="text-tiffany font-medium text-lg hover:underline inline-flex items-center gap-2">
Read Full Recipe →
</a> </div> </article>`)} </div>` : renderTemplate`<div class="text-center py-12"> <p class="text-xl text-gray-600">
No breakfast recipes added yet — check back soon!
</p> </div>`} </div> </section> ` })}`;
}, "C:/Users/Micci/Desktop/marketing website 1/src/pages/breakfast.astro", void 0);

const $$file = "C:/Users/Micci/Desktop/marketing website 1/src/pages/breakfast.astro";
const $$url = "/breakfast";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Breakfast,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
