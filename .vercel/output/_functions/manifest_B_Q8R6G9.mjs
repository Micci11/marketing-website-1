import 'piccolore';
import { j as decodeKey } from './chunks/astro/server_jCYk7d1r.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_B-mszlqa.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Micci/Desktop/marketing%20website%201/","cacheDir":"file:///C:/Users/Micci/Desktop/marketing%20website%201/node_modules/.astro/","outDir":"file:///C:/Users/Micci/Desktop/marketing%20website%201/dist/","srcDir":"file:///C:/Users/Micci/Desktop/marketing%20website%201/src/","publicDir":"file:///C:/Users/Micci/Desktop/marketing%20website%201/public/","buildClientDir":"file:///C:/Users/Micci/Desktop/marketing%20website%201/dist/client/","buildServerDir":"file:///C:/Users/Micci/Desktop/marketing%20website%201/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"breakfast/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/breakfast","isIndex":false,"type":"page","pattern":"^\\/breakfast\\/?$","segments":[[{"content":"breakfast","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/breakfast.astro","pathname":"/breakfast","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"desserts/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/desserts","isIndex":false,"type":"page","pattern":"^\\/desserts\\/?$","segments":[[{"content":"desserts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/desserts.astro","pathname":"/desserts","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"dinner/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/dinner","isIndex":false,"type":"page","pattern":"^\\/dinner\\/?$","segments":[[{"content":"dinner","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dinner.astro","pathname":"/dinner","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"snacks/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/snacks","isIndex":false,"type":"page","pattern":"^\\/snacks\\/?$","segments":[[{"content":"snacks","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/snacks.astro","pathname":"/snacks","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"supplements/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/supplements","isIndex":false,"type":"page","pattern":"^\\/supplements\\/?$","segments":[[{"content":"supplements","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/supplements.astro","pathname":"/supplements","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/contact","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/contact\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/contact.ts","pathname":"/api/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://cravesmart.recipes","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["C:/Users/Micci/Desktop/marketing website 1/src/pages/breakfast.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/breakfast@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["C:/Users/Micci/Desktop/marketing website 1/src/pages/desserts.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/desserts@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Micci/Desktop/marketing website 1/src/pages/dinner.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/dinner@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Micci/Desktop/marketing website 1/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Micci/Desktop/marketing website 1/src/pages/recipes/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/recipes/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Micci/Desktop/marketing website 1/src/pages/snacks.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/snacks@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Micci/Desktop/marketing website 1/src/pages/about.astro",{"propagation":"none","containsHead":true}],["C:/Users/Micci/Desktop/marketing website 1/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["C:/Users/Micci/Desktop/marketing website 1/src/pages/supplements.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/api/contact@_@ts":"pages/api/contact.astro.mjs","\u0000@astro-page:src/pages/breakfast@_@astro":"pages/breakfast.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/desserts@_@astro":"pages/desserts.astro.mjs","\u0000@astro-page:src/pages/dinner@_@astro":"pages/dinner.astro.mjs","\u0000@astro-page:src/pages/recipes/[...slug]@_@astro":"pages/recipes/_---slug_.astro.mjs","\u0000@astro-page:src/pages/snacks@_@astro":"pages/snacks.astro.mjs","\u0000@astro-page:src/pages/supplements@_@astro":"pages/supplements.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_B_Q8R6G9.mjs","C:/Users/Micci/Desktop/marketing website 1/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_c3u3ot1n.mjs","C:\\Users\\Micci\\Desktop\\marketing website 1\\.astro\\content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","C:\\Users\\Micci\\Desktop\\marketing website 1\\.astro\\content-modules.mjs":"chunks/content-modules_CsQTZWVU.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_BcCyr-To.mjs","C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/cottage-cheese-pizza.mdx?astroPropagatedAssets":"chunks/cottage-cheese-pizza_Dmr-TQjg.mjs","C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/easy-boneless-wings.mdx?astroPropagatedAssets":"chunks/easy-boneless-wings_1HU6sU-w.mjs","C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/high-protein-blondies.mdx?astroPropagatedAssets":"chunks/high-protein-blondies_CAm8a_hh.mjs","C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/high-protein-chocolate-chip-cookies.mdx?astroPropagatedAssets":"chunks/high-protein-chocolate-chip-cookies_Q7VPn5oM.mjs","C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/high-protein-brownies.mdx?astroPropagatedAssets":"chunks/high-protein-brownies_DZ9s7KoA.mjs","C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/popcorn-slice.mdx?astroPropagatedAssets":"chunks/popcorn-slice_DrWVodod.mjs","C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/high-protein-chicken-calzone.mdx?astroPropagatedAssets":"chunks/high-protein-chicken-calzone_BjsQiRVf.mjs","C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/high-protein-tortilla.mdx?astroPropagatedAssets":"chunks/high-protein-tortilla_Mr4gvVNw.mjs","C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/high-protein-egg-salad.mdx?astroPropagatedAssets":"chunks/high-protein-egg-salad_Z490bUgd.mjs","C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/cottage-cheese-pizza.mdx":"chunks/cottage-cheese-pizza_DOmi1H3w.mjs","C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/easy-boneless-wings.mdx":"chunks/easy-boneless-wings_8K7n_tyy.mjs","C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/high-protein-blondies.mdx":"chunks/high-protein-blondies_1FRzZI4o.mjs","C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/high-protein-chocolate-chip-cookies.mdx":"chunks/high-protein-chocolate-chip-cookies_uRBxy7_T.mjs","C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/high-protein-brownies.mdx":"chunks/high-protein-brownies_nSmwKNa_.mjs","C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/popcorn-slice.mdx":"chunks/popcorn-slice_DhmwTxg4.mjs","C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/high-protein-chicken-calzone.mdx":"chunks/high-protein-chicken-calzone_CdrXK8XH.mjs","C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/high-protein-tortilla.mdx":"chunks/high-protein-tortilla_U6nbK8NY.mjs","C:/Users/Micci/Desktop/marketing website 1/src/content/recipes/high-protein-egg-salad.mdx":"chunks/high-protein-egg-salad_CqgX-UlA.mjs","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/about.BYSQsxXH.css","/robots.txt","/placeholders/767048-1783313511.jpg","/placeholders/brooke-lark-C1fMH2Vej8A-unsplash.jpg","/placeholders/delicious-food_837074-560-4055507335.jpg","/placeholders/digital cook book 1.JPG","/placeholders/girl for websoite.jpg","/placeholders/Healthy-Food-icon-Graphics-14304903-1-399078297.jpg","/placeholders/image.png","/placeholders/JMW5p01.svg","/placeholders/kelvin-han-a-niLBbZF4o-unsplash.jpg","/placeholders/madie-hamilton-Q9yr-cvJr30-unsplash.jpg","/placeholders/newfont.jpg","/placeholders/rachel-park-hrlvr2ZlUNk-unsplash.jpg","/recipes/anna-przepiorka-LjtviHokbr4-unsplash.jpg","/recipes/bahareh-moradian-6jOG00umfag-unsplash.jpg","/recipes/chocolate-caramel-popcorn-bars-15.jpg","/recipes/Easy-Blondies-Main.jpg","/recipes/fernando-andrade-tsFV9YbJTnk-unsplash.jpg","/recipes/Green-Goddess-Egg-Salad-4.jpg","/recipes/ifrah-akhter-lY4-xXL3szE-unsplash.jpg","/recipes/ivan-torres-MQUqbmszGGM-unsplash.jpg","/recipes/peter-pham-v5yVy3IhSRU-unsplash.jpg","/about/index.html","/breakfast/index.html","/contact/index.html","/desserts/index.html","/dinner/index.html","/snacks/index.html","/supplements/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"ms2533rhnrLCqFb032CkukyOrgcbZOl3Nkhb5k4noRg="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
