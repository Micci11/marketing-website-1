import assert from 'node:assert/strict';
import {readFileSync, readdirSync, statSync} from 'node:fs';

const root=process.argv[2] || '.vercel/output/static';
const targets=[
 ['carrot-cake-cream-cheese-frosting',18,6,'desserts',9,160,13,15,5],
 ['salted-date-caramel-protein-shake',13,5,'breakfast',1,490,52,51,11],
 ['roasted-broccoli-feta-protein-soup',14,6,'dinner',null],
 ['cheesy-chicken-broccoli-pesto-bake',10,7,'dinner',4,590,55,58,16],
 ['chocolate-chip-protein-cookies',16,8,'snacks',12,123,10,14,4],
 ['crispy-buffalo-chicken-rice-paper-hot-pockets',9,7,'dinner',3,460,59,31,10],
 ['pumpkin-spice-protein-pancakes',16,7,'breakfast',1,445,48,45,12],
];
const decode=s=>s.replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const sitemap=readFileSync(root+'/sitemap-0.xml','utf8');
const seen=new Set();
for(const file of readdirSync('src/content/recipes')){
 const source=readFileSync('src/content/recipes/'+file,'utf8');
 const slug=source.match(/^slug:\s*"([^"]+)"/m)?.[1];
 assert.ok(slug && !seen.has(slug),'Missing or duplicate slug: '+file);seen.add(slug);
}
for(const [slug,ingredients,steps,category,servings,kcal,protein,carbs,fat] of targets){
 const html=readFileSync(`${root}/recipes/${slug}/index.html`,'utf8');
 const source=readFileSync(`src/content/recipes/${slug}.mdx`,'utf8');
 const schema=JSON.parse(html.match(/<script type="application\/ld\+json">([^]*?)<\/script>/)[1]);
 assert.equal(schema.datePublished,'2026-10-23T00:00:00.000Z');
 const units={};
 for(const unit of ['us','metric']) units[unit]=[...html.matchAll(new RegExp(`<span data-unit="${unit}"[^>]*>([^]*?)<\\/span>`,'g'))].map(m=>decode(m[1]));
 assert.equal(units.us.length,ingredients+steps,slug);assert.equal(units.metric.length,ingredients+steps,slug);
 assert.deepEqual(schema.recipeIngredient,units.metric.slice(0,ingredients));
 assert.deepEqual(schema.recipeInstructions.map(s=>s.text),units.metric.slice(ingredients));
 assert.ok(units.us.some((v,i)=>v!==units.metric[i]),slug+' unit toggle changes order');
 if(servings){
  assert.deepEqual([schema.nutrition.calories,schema.nutrition.proteinContent,schema.nutrition.carbohydrateContent,schema.nutrition.fatContent],[kcal+' calories',protein+' g',carbs+' g',fat+' g']);
  assert.ok(schema.nutrition.description && schema.nutrition.servingSize);
 }else{
  assert.ok(!schema.nutrition,'Soup has no verified per-serving macros');
  assert.equal(schema.recipeYield,'about 4 generous servings, estimated');
  assert.ok(html.includes('Nutrition per serving has not been confirmed.'));
 }
 assert.ok(!/review notes|see the review note|Inspiration|317 calories|Nando|third-party certification|generated placeholder/i.test(source));
 assert.ok(sitemap.includes(`/recipes/${slug}/`));
 assert.ok(readFileSync(`${root}/${category}/index.html`,'utf8').includes(`/recipes/${slug}`));
 const cover=source.match(/^coverImage: "([^"]+)"/m)[1];
 assert.ok(statSync('public'+cover).size<350000,'Optimized image size');
 assert.ok(html.includes(`src="${cover}"`));
 const links=[...html.matchAll(/<a\b[^>]*data-affiliate-link[^>]*>/g)];
 for(const [a] of links){assert.ok(a.includes('tag=cravesmart09-20')&&a.includes('sponsored')&&a.includes('nofollow'));}
 if(links.length)assert.ok(html.indexOf('As an Amazon Associate')<html.indexOf('data-affiliate-link'));
 if(slug.startsWith('carrot')){
  assert.ok(units.metric.includes('For the cake: 50 g / 1.75 oz oat flour labeled gluten-free, plus 50 g / 1.75 oz rice flour'));
  assert.match(schema.nutrition.description,/Original all-oat.*Not recalculated/);
 }
 if(slug.startsWith('crispy-buffalo'))assert.ok(units.metric.some(s=>s.includes('80 ml / 2.7 US fl oz RedHot Buffalo sauce')));
 console.log('PASS:',slug,'schema, units, nutrition caveats, image, category and sitemap');
}
console.log('PASS: all seven October 23 recipes; unique slugs:',seen.size);
