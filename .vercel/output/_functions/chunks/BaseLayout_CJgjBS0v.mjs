import { c as createComponent, m as maybeRenderHead, a as renderTemplate, r as renderComponent, d as createAstro, b as addAttribute, h as renderHead, i as renderSlot } from './astro/server_jCYk7d1r.mjs';
import 'piccolore';
/* empty css                         */
import 'clsx';

const $$Logo = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<a href="/" class="flex items-center gap-3"> <!-- Your new emblem --> <img src="/placeholders/JMW5p01.svg" alt="CraveSmart Emblem" class="w-10 h-10 md:w-12 md:h-12"> <!-- Optional: Keep text if you want fallback --> <!-- <span class="font-playlist-script text-4xl md:text-5xl font-bold text-gray-900">CraveSmart</span> --> </a>`;
}, "C:/Users/Micci/Desktop/marketing website 1/src/components/Logo.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md shadow-sm"> <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6 py-5 flex items-center justify-between"> <!-- Left: Logo --> <a href="/" class="flex items-center gap-3 shrink-0 -ml-6 sm:-ml-8 lg:-ml-12 group"> ${renderComponent($$result, "Logo", $$Logo, { "class": "w-10 h-10 md:w-11 md:h-11 flex-shrink-0 transition-transform duration-300 group-hover:scale-105" })} <span class="font-heading text-2xl md:text-3xl font-bold text-gray-900 whitespace-nowrap group-hover:text-tiffany transition-colors">
CraveSmart
</span> </a> <!-- Center: Navigation --> <nav class="hidden md:flex items-center gap-8 lg:gap-10 text-base font-medium text-gray-700"> <a class="nav-link" href="/">Home</a> <a class="nav-link" href="/breakfast">Breakfast</a> <a class="nav-link" href="/dinner">Dinner</a> <a class="nav-link" href="/snacks">Snacks</a> <a class="nav-link" href="/desserts">Desserts</a> <a class="nav-link" href="/supplements">Supplements</a> <a class="nav-link" href="/contact">Contact</a> <a class="nav-link" href="/about">About</a> </nav> <!-- Right: Instagram CTA --> <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 text-gray-700 shrink-0 group"> ${renderComponent($$result, "Logo", $$Logo, { "class": "w-8 h-8 md:w-9 md:h-9 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" })} <span class="font-medium hidden lg:block group-hover:text-tiffany transition-colors">
@yourusername
</span> </a> </div> </header>`;
}, "C:/Users/Micci/Desktop/marketing website 1/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="w-full bg-hero-bg/40 text-gray-900 mt-auto border-t border-gray-200/60"> <div class="container mx-auto px-4 py-8 max-w-7xl text-sm"> <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-center md:text-left"> <div> <p class="font-bold text-base md:text-lg">
© ${(/* @__PURE__ */ new Date()).getFullYear()} CraveSmart
</p> <p class="mt-1 opacity-90 text-xs md:text-sm">
CraveSmart – Indulgence that behaves. Macro-aware cravings, no guilt, no nonsense.
</p> </div> <div class="opacity-90 text-xs md:text-sm max-w-2xl"> <p>
As an affiliate and Supliful brand owner, I earn from qualifying purchases—at no extra cost to you. Some links may be affiliate or tracking links.
</p> <p class="mt-1">
We optimize so you can indulge smarter.
</p> </div> </div> </div> </footer>`;
}, "C:/Users/Micci/Desktop/marketing website 1/src/components/Footer.astro", void 0);

const $$Astro = createAstro("https://cravesmart.recipes");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const siteUrl = "https://cravesmart.recipes";
  const {
    title = "CraveSmart \u2013 Cravings, Optimized.",
    description = "Macro-aware indulgences that still satisfy. Eat what you want. Plan what it costs.",
    image,
    canonical
  } = Astro2.props;
  const canonicalUrl = canonical ? new URL(canonical, siteUrl).toString() : Astro2.url ? new URL(Astro2.url.pathname, siteUrl).toString() : siteUrl;
  const imageUrl = image ? new URL(image, siteUrl).toString() : new URL("/og-default.jpg", siteUrl).toString();
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><link rel="canonical"${addAttribute(canonicalUrl, "href")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:type" content="article"><meta property="og:url"${addAttribute(canonicalUrl, "content")}><meta property="og:image"${addAttribute(imageUrl, "content")}><meta property="og:site_name" content="CraveSmart"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(imageUrl, "content")}><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-gray-50 font-sans antialiased flex flex-col min-h-screen"> ${renderComponent($$result, "Header", $$Header, {})} <main class="flex-grow"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "C:/Users/Micci/Desktop/marketing website 1/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
