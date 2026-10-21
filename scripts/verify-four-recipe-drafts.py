from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, parse_qs
import hashlib
import json
import re
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[1]
BUILD = ROOT / ".vercel/output/static"
SPEC = json.loads(r'''{"sweet-chilli-popcorn-chicken-meal-prep":{"yield":"4 servings","servingSize":"1 of 4 servings","macros":[496,50,64,3],"pairs":23,"sha256":"fb46592a1a1758a9017773d2f39b8b1062a7b6f17f29be21d9fd8b9d1606a793","reel":"DROmCZokxvk","tokens":["800 g","40 g","10 g","90 mL","60 mL","80 mL","200 g DRY"]},"korean-bbq-chicken-and-sticky-rice":{"yield":"4 servings","servingSize":"1 of 4 servings","macros":[655,50,57,25],"pairs":14,"sha256":"f451d87811d2a427e424baa19783fab49aaae7e46d33f615e783c40ad16396bb","reel":"DUE0zZ_k6ge","tokens":["1,000 g","60 g","30 g","250 g DRY","20 mL","15 g"]},"chicken-broccoli-fritters":{"yield":"8 large fritters","servingSize":"1 fritter","macros":[137,21,2,5],"pairs":13,"sha256":"eb5a531d35f77bc2d55d14814c1c5eaa524c4fb25e29ecfd1830c69c0a117d84","reel":"DL_2vKxTgVe","tokens":["500 g","150 g","3 eggs","100 g Coles","3 mL"]},"tzatziki-cucumber-chicken-salad":{"yield":"1 serving","servingSize":"1 serving","macros":[294,40,16,8],"pairs":13,"sha256":"37e5f110a40638e2b0e7fb6b74b0f9825a85d6b624f61d71599c848a749b3942","reel":"DTcNyR5ky0K","tokens":["200 g","100 g","150 g","1 garlic clove","15 mL","5 g everything","1 tsp MSG","5 g wholegrain"]}}''')

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.schema_text = None
        self.schemas = []
        self.links = []
        self.units = {"us": 0, "metric": 0}
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "script" and a.get("type") == "application/ld+json":
            self.schema_text = ""
        if tag == "a":
            self.links.append(a)
        if a.get("data-unit") in self.units:
            self.units[a["data-unit"]] += 1
    def handle_data(self, text):
        if self.schema_text is not None:
            self.schema_text += text
    def handle_endtag(self, tag):
        if tag == "script" and self.schema_text is not None:
            self.schemas.append(json.loads(self.schema_text))
            self.schema_text = None

results = []
for slug, expected in SPEC.items():
    html = (BUILD / "recipes" / slug / "index.html").read_text()
    page = Page()
    page.feed(html)
    recipe = next(s for s in page.schemas if s.get("@type") == "Recipe")
    assert recipe["recipeYield"] == expected["yield"], slug
    assert recipe["nutrition"]["servingSize"] == expected["servingSize"], slug
    for key, amount, unit in zip(["calories", "proteinContent", "carbohydrateContent", "fatContent"], expected["macros"], ["calories", "g", "g", "g"]):
        assert recipe["nutrition"][key] == f"{amount} {unit}", (slug, key)
    assert "datePublished" not in recipe
    assert not any(key in recipe for key in ["prepTime", "cookTime", "totalTime"]), "Unspecified timing must not become schema fact"
    ingredients = "\n".join(recipe["recipeIngredient"])
    for token in expected["tokens"]:
        assert token in ingredients, (slug, token)
    assert page.units == {"us":expected["pairs"], "metric":expected["pairs"]}
    assert html.count('data-unit-button="us"') == 1 and html.count('data-unit-button="metric"') == 1
    links = [a for a in page.links if "amazon.com" in a.get("href", "")]
    assert len(links) == 2, slug
    for a in links:
        assert parse_qs(urlsplit(a["href"]).query)["tag"] == ["cravesmart09-20"]
        assert "data-affiliate-link" in a and a.get("data-product-label") and a.get("data-link-placement")
        assert {"sponsored","nofollow","noopener"}.issubset(set(a["rel"].split()))
    assert "As an Amazon Associate" in html
    assert expected["reel"] in html and "fsis.usda.gov" in html
    image = ROOT / "public/recipes" / f"{slug}.png"
    assert hashlib.sha256(image.read_bytes()).hexdigest() == expected["sha256"], slug
    assert image.read_bytes() == (BUILD / "recipes" / f"{slug}.png").read_bytes()
    assert 'data-analytics-measurement-id="G-F7T10TTN0Q"' in html
    assert html.count("adsbygoogle.js?client=ca-pub-4657643096944710") == 1
    assert 'href="/dinner"' in html
    assert slug in (BUILD / "dinner/index.html").read_text()
    for href in [a.get("href", "") for a in page.links]:
        if href.startswith("/") and not href.startswith("//"):
            path = urlsplit(href).path.strip("/")
            assert (BUILD / path).is_file() or (BUILD / path / "index.html").is_file(), (slug, "broken internal link", href)
    results.append({"slug":slug, "status":"PASS", "unitPairs":expected["pairs"], "affiliateLinks":2, "yield":expected["yield"], "nutritionBasis":expected["servingSize"]})

git = shutil.which("git")
assert git, "git must be available on PATH"
baseline = "10b29a6b55050d864c1b29716f0ba9077b764867"
existing = subprocess.check_output([git,"ls-tree","-r","--name-only",baseline,"--","src/content/recipes"],cwd=ROOT,text=True).splitlines()
assert len(existing) == 20
for file in existing:
    assert (ROOT/file).read_bytes() == subprocess.check_output([git,"show",f"{baseline}:{file}"],cwd=ROOT), file
for file in ["src/pages/index.astro", "src/pages/privacy.astro", "src/pages/api/contact.ts", "src/lib/analytics.mjs"]:
    assert (ROOT/file).read_bytes() == subprocess.check_output([git,"show",f"{baseline}:{file}"],cwd=ROOT), file
print(json.dumps({"status":"PASS","newRecipeChecks":results,"existingRecipeFilesUnchanged":len(existing),"newsletterFilesChanged":False},indent=2))

