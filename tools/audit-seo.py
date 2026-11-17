"""Audit local des invariants SEO (sans dépendance). Lancer : python3 tools/audit-seo.py"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import json
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.tags = []
        self.feed(text)
    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))

def check(condition, message):
    if not condition:
        raise SystemExit('ECHEC : ' + message)

html = (ROOT / 'index.html').read_text()
p = Page(html)
meta = {a.get('name', a.get('property')): a.get('content') for t, a in p.tags if t == 'meta'}
canonical = [a['href'] for t, a in p.tags if t == 'link' and a.get('rel') == 'canonical']
check(len(canonical) == 1 and canonical[0].startswith('https://') and canonical[0].endswith('/'), 'canonical HTTPS unique')
base = canonical[0]
check(sum(t == 'h1' for t, a in p.tags) == 1, 'H1 unique')
check(any(t == 'html' and a.get('lang') == 'fr' for t, a in p.tags), 'langue française')
check('<title>' in html and bool(meta.get('description')), 'titre et description')
check('noindex' not in meta.get('robots', ''), 'accueil indexable')
check(meta['og:url'] == base, 'URL Open Graph cohérente')
check(meta['description'] == meta['og:description'] == meta['twitter:description'], 'descriptions de partage cohérentes')
check(meta['og:image'] == meta['twitter:image'] and meta['og:image'].startswith(base), 'image sociale locale et absolue')
ids = [a['id'] for t, a in p.tags if 'id' in a]
check(len(ids) == len(set(ids)), 'identifiants HTML uniques')
for t, a in p.tags:
    for field in ('src', 'href', 'poster'):
        target = a.get(field, '')
        if target.startswith('#'):
            check(target[1:] in ids, 'ancre ' + target)
        elif target and not urlsplit(target).scheme and not target.startswith('/'):
            check((ROOT / target.split('#')[0]).exists(), 'ressource ' + target)
    if t == 'img':
        check('alt' in a and 'width' in a and 'height' in a, 'image avec alternative et dimensions')
    for entry in a.get('srcset', '').split(','):
        if entry.strip():
            check((ROOT / entry.strip().split()[0]).is_file(), 'variante responsive ' + entry)
graph = json.loads(re.search(r'<script type="application/ld\+json">\s*(.*?)\s*</script>', html, re.S)[1])['@graph']
entities = {e['@id']: e for e in graph}
check({'MusicGroup', 'WebPage', 'WebSite', 'ImageObject'} <= {e['@type'] for e in graph}, 'entités structurées')
for entity in graph:
    check(entity['url'].startswith(base), 'URL structurée sous le canonical')
    for value in entity.values():
        if isinstance(value, dict) and '@id' in value:
            check(value['@id'] in entities, 'référence structurée résolue')
check(entities[base + '#webpage']['description'] == meta['description'], 'description structurée cohérente')
check('noindex' in (ROOT / '404.html').read_text(), '404 non indexable')
locs = ET.parse(ROOT / 'sitemap.xml').findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')
check([n.text for n in locs] == [base], 'sitemap = accueil canonique, sans ancres ni faux URL')
check('Sitemap: ' + base + 'sitemap.xml' in (ROOT / 'robots.txt').read_text(), 'déclaration du sitemap')
json.loads((ROOT / 'site.webmanifest').read_text())
print('OK : métadonnées, canonical, sitemap, JSON-LD, ressources, ancres, images et 404.')
