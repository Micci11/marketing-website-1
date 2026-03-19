import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DVOZusaC.mjs';
import { manifest } from './manifest_DqmJTgWz.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/api/contact.astro.mjs');
const _page3 = () => import('./pages/breakfast.astro.mjs');
const _page4 = () => import('./pages/contact.astro.mjs');
const _page5 = () => import('./pages/desserts.astro.mjs');
const _page6 = () => import('./pages/dinner.astro.mjs');
const _page7 = () => import('./pages/recipes/_---slug_.astro.mjs');
const _page8 = () => import('./pages/snacks.astro.mjs');
const _page9 = () => import('./pages/supplements.astro.mjs');
const _page10 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/api/contact.ts", _page2],
    ["src/pages/breakfast.astro", _page3],
    ["src/pages/contact.astro", _page4],
    ["src/pages/desserts.astro", _page5],
    ["src/pages/dinner.astro", _page6],
    ["src/pages/recipes/[...slug].astro", _page7],
    ["src/pages/snacks.astro", _page8],
    ["src/pages/supplements.astro", _page9],
    ["src/pages/index.astro", _page10]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "cb916a7b-48e9-4b60-be7d-80fe11685781",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
