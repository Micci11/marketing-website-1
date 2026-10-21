import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync,writeFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const targets=[
 ['sweet-chilli-popcorn-chicken-meal-prep',18,5,4,496,50,64,3],
 ['korean-bbq-chicken-and-sticky-rice',10,4,4,655,50,57,25],
 ['chicken-broccoli-fritters',9,4,8,137,21,2,5],
 ['tzatziki-cucumber-chicken-salad',8,4,1,294,40,16,8],
 ['hot-honey-beef-sweet-potato-bowls',13,5,2,565,48,63,14],
 ['ginger-scallion-turkey-dumpling-lasagna',14,7,4,440,39,39,15],
 ['tiramisu-protein-overnight-oats',7,4,2,375,32,50,5]
];
const root='.vercel/output/static';
const git=process.env.GIT_BINARY || 'git';
const decode=s=>s.replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const results=[];
for(const [slug,ingredients,steps,servings,kcal,protein,carbs,fat] of targets){
 const file='src/content/recipes/'+slug+'.mdx', source=readFileSync(file,'utf8');
 const html=readFileSync(root+'/recipes/'+slug+'/index.html','utf8');
 const schema=JSON.parse(html.match(/<script type="application\/ld\+json">([^]*?)<\/script>/)[1]);
 const metric=[...html.matchAll(/<span data-unit="metric"[^>]*>([^]*?)<\/span>/g)].map(m=>decode(m[1]));
 const us=[...html.matchAll(/<span data-unit="us"[^>]*>([^]*?)<\/span>/g)].map(m=>decode(m[1]));
 assert.equal(schema.recipeIngredient.length,ingredients,slug+' ingredient count');
 assert.equal(schema.recipeInstructions.length,steps,slug+' method count');
 assert.equal(metric.length,ingredients+steps);assert.equal(us.length,metric.length);
 assert.deepEqual(metric.slice(0,ingredients),schema.recipeIngredient);
 assert.deepEqual(metric.slice(ingredients),schema.recipeInstructions.map(x=>x.text));
 assert.deepEqual([schema.nutrition.calories,schema.nutrition.proteinContent,schema.nutrition.carbohydrateContent,schema.nutrition.fatContent],[kcal+' calories',protein+' g',carbs+' g',fat+' g']);
 assert.ok(schema.nutrition.servingSize);
 for(const label of ['Active Time','Total Time','Servings','Ingredients','Instructions','Variations','Storage','Allergens:','A Few Helpful Tips','You May Also Like'])assert.ok(html.includes(label),slug+': '+label);
 assert.equal((html.match(/Approximate times\./g)||[]).length,1);
 assert.ok(!/Inspiration|Source Note|sourceNote:|editorial safety|source recipe|original caption|spray duration|No dip recipe|promising clean restaurant|even for breakfast|instagram\.com/i.test(source));
 assert.ok(!/<h[1-6][^>]*>\s*<\/h[1-6]>/.test(html));
 const anchors=[...html.matchAll(/<a\b[^>]*data-affiliate-link[^>]*>/g)];
 assert.equal(anchors.length,2);
 for(const [anchor] of anchors){assert.ok(anchor.includes('tag=cravesmart09-20'));for(const attr of ['data-product-label','data-link-placement','sponsored','nofollow'])assert.ok(anchor.includes(attr));}
 assert.ok(html.indexOf('As an Amazon Associate')<html.indexOf('data-affiliate-link'));
 assert.ok(html.includes('data-print-recipe="true"'));
 assert.ok(html.includes('href="#recipe-card"')&&html.includes('onclick="window.print()"'));
 assert.ok(html.includes('data-analytics-measurement-id="G-F7T10TTN0Q"'));
 assert.equal((html.match(/adsbygoogle.js\?client=ca-pub-4657643096944710/g)||[]).length,1);
 assert.ok(!/MSG/i.test(html),slug+' added MSG');
 for(const line of metric.slice(0,ingredients)){
  if(/\b(?:g|kg)\b/.test(line))assert.match(line,/\b(?:oz|lb)\b/,line);
  if(/\bmL\b/.test(line))assert.match(line,/\b(?:tsp|tbsp|teaspoon|cup)\b/,line);
 }
 for(const line of us.slice(0,ingredients)){
  if(/\b(?:oz|lb)\b/.test(line))assert.match(line,/\b(?:g|kg)\b/,line);
  if(/\b(?:tsp|tbsp|teaspoon|cup)\b/.test(line))assert.match(line,/\bmL\b/,line);
 }
 const cover=source.match(/^coverImage: "([^"]+)"/m)[1];assert.ok(existsSync('public'+cover));
 const old=execFileSync(git,['show','e22997c:'+file],{encoding:'utf8'});
 for(const field of ['title','slug','coverImage','coverAlt','servings'])assert.equal(source.match(new RegExp('^'+field+':.*$','m'))[0],old.match(new RegExp('^'+field+':.*$','m'))[0],slug+' preserve '+field);
 if(slug==='tiramisu-protein-overnight-oats')assert.equal(schema.totalTime,'PT490M');
 else if(slug==='tzatziki-cucumber-chicken-salad')assert.equal(schema.totalTime,'PT10M');
 else assert.ok(!('totalTime' in schema),'Do not serialize planning ranges as exact times.');
 if(slug==='chicken-broccoli-fritters'){assert.equal(schema.recipeYield,'8 large fritters');assert.equal(schema.nutrition.servingSize,'1 fritter');assert.ok(us.some(x=>x.includes('0.6 US teaspoon (3 mL)')));}
 if(slug==='tzatziki-cucumber-chicken-salad'){assert.ok(metric.includes('100 g (3.5 oz) plain natural Greek yogurt'));assert.ok(us.includes('3.5 oz (100 g) plain natural Greek yogurt'));}
 if(slug==='korean-bbq-chicken-and-sticky-rice')assert.ok(html.includes('Contains sesame when made with the listed Mingle Korean BBQ seasoning'));
 results.push({slug,liveUrl:'https://www.cravesmart.recipes/recipes/'+slug+'/',localUrl:'http://127.0.0.1:4326/recipes/'+slug+'/',buildChecks:'passed',ingredientCount:ingredients,instructionCount:steps,affiliateLinks:2});
}
const home=readFileSync(root+'/index.html','utf8');assert.ok(home.includes('https://app.kit.com/forms/9162136/subscriptions'));
for(const file of readdirSync('src/content/recipes').filter(f=>f.endsWith('.mdx')&&!targets.some(([slug])=>f===slug+'.mdx'))){
 const original=execFileSync(git,['show','e22997c:src/content/recipes/'+file],{encoding:'utf8'});
 assert.equal(readFileSync('src/content/recipes/'+file,'utf8'),original,file+' unchanged');
}
writeFileSync('.vercel/seven-recipe-checks.json',JSON.stringify({checkedAt:new Date().toISOString(),status:'local only',results},null,2)+'\n');
console.log('PASS: all seven rendered recipes, schema/card parity, units, yields, estimated nutrition, allergies, affiliate metadata, tracking and newsletter preserved; original 17 recipe files unchanged.');
