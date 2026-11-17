# Audit référencement — 17 novembre 2026

## Changements

- Titre explicite : « Enjoy The Fall — Groupe groove rock à Toulouse | Site officiel ».
- Description cohérente entre recherche, Open Graph, Twitter et WebPage : groupe, Toulouse, concerts, vidéos et EP prévu le 10 janvier 2027.
- Autorisation des grands aperçus d’images via `max-image-preview:large`.
- Favicon PNG carré de 192 px déclaré en complément du 32 px.
- Graphe JSON-LD reliant le MusicGroup existant, le site, sa page d’accueil et son image principale. Membres, coordonnées et profils officiels conservés.
- Aucun texte visible, lien commercial, date de concert, média ou effet modifié.

## Points déjà corrects, conservés

HTML en français, un H1, sections et liens sémantiques, contenu principal disponible dans le HTML sans JavaScript, photos avec alternatives et dimensions, polices locales, lecteur YouTube à la demande, image sociale 1200 × 630, canonical HTTPS, sitemap à une URL, 404 en noindex. Pas de fausses notes, avis, billetteries ou événements structurés incomplets.

Le site reste canonique sur son URL GitHub Pages actuelle. `enjoythefall.fr` n’est pas déclaré tant que l’achat et le raccordement ne sont pas effectués. Le script `tools/configure-domain.mjs` remplace les occurrences du canonical, y compris les nouvelles entités, lors de la migration.

## Vérifications

`python3 tools/audit-seo.py` contrôle les métadonnées, la cohérence des URL, le graphe JSON-LD, les références locales et srcset, les ancres, les images, le manifest, le sitemap et le noindex de la 404. Contrôle supplémentaire : le body HTML est identique au commit précédent.

Avant modification, le site publié, le sitemap, la photo sociale et le favicon répondent HTTP 200 ; une URL inexistante répond réellement 404. Ces contrôles HTTP sont distincts du test local. Les données JSON-LD ont été contrôlées localement, sans validation dans l’outil Google Rich Results Test. Aucun nouveau score Lighthouse ou test Core Web Vitals terrain n’est revendiqué.

## À faire au raccordement du domaine

Exécuter le script de changement de domaine puis cet audit ; récupérer et conserver le CNAME créé par GitHub ; publier ; déclarer la propriété et le sitemap dans Google Search Console ; demander l’indexation de l’accueil et suivre les résultats.

La propriété WebSite prépare l’identité du site. Google ne prend pas en charge les noms de site spécifiques aux sous-répertoires : le domaine propre permettra de bénéficier de cette configuration au niveau racine. Aucune métadonnée ne garantit un classement ou un affichage enrichi.

Références :
- https://developers.google.com/search/docs/appearance/title-link
- https://developers.google.com/search/docs/appearance/site-names
- https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
