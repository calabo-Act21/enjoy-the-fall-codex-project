# Enjoy The Fall — site officiel

Site statique en français : HTML sémantique, CSS et JavaScript natif. Pas de compilation, de dépendance de production, de formulaire ou de traceur. Les polices Bebas Neue et Manrope sont locales, avec leurs licences OFL dans [assets/fonts](../assets/fonts).

## Organisation du dépôt

- À la racine : [index.html](../index.html), CSS, JavaScript, page 404, métadonnées et [assets](../assets).
- [tools](../tools) : serveur local et configuration de l'URL de publication.
- [documentation](.) : ce guide et les informations à confirmer.
- [briefs](briefs) : prompts et consignes historiques de construction. Leurs mentions de `site/` décrivent l'ancienne organisation, remplacée par la racine pour GitHub Pages. Ne pas relancer la construction initiale : le design est validé.
- [source-material](../source-material) : originaux conservés sans modification.

## Prévisualiser

Avec Node.js 20 ou plus récent, depuis la racine du dépôt :

```powershell
node tools\serve.mjs
```

Ouvrir <http://127.0.0.1:4173>. Un autre port peut être passé en argument (`node tools\serve.mjs 4180`). Le serveur écoute uniquement sur la machine locale. Arrêt : Ctrl+C. Il sert aussi la page 404 avec le bon statut HTTP et permet de tester le chemin Pages sur <http://127.0.0.1:4173/enjoy-the-fall-codex-project/>.

## Publier sur GitHub Pages

1. Envoyer cette réorganisation sur la branche à publier.
2. Dans GitHub : **Settings → Pages → Build and deployment → Deploy from a branch**.
3. Choisir la branche contenant ces fichiers, puis le dossier **`/ (root)`**, et enregistrer.
4. Attendre la fin du déploiement Pages. L'URL préparée est <https://calabo-act21.github.io/enjoy-the-fall-codex-project/>. La réorganisation locale ne configure pas elle-même les paramètres distants.
5. Le fichier [.nojekyll](../.nojekyll) désactive le traitement Jekyll : HTML/CSS/JS sont servis tels quels.
6. Vérifier l'accueil, les médias et une URL inexistante après publication. GitHub Pages sert [404.html](../404.html) avec un statut 404 ; sa base URL garantit que les styles et le retour à l'accueil fonctionnent même depuis un chemin imbriqué.

Les assets de l'accueil restent relatifs et le manifest utilise `./`. Canonical, partage social, JSON-LD et sitemap sont configurés pour l'URL Pages ci-dessus. Aucun domaine personnalisé n'a été inventé et aucun fichier CNAME n'est ajouté.

**À savoir :** avec une publication depuis la racine et sans Jekyll, les dossiers de documentation et les sources sont également accessibles sur le site. Ne pas y stocker de données confidentielles. Le fichier `robots.txt` d'un site de projet est sous le chemin du dépôt : les robots cherchent normalement ce fichier à la racine du domaine. Déclarer directement le sitemap dans Search Console si nécessaire.

### Changer d'URL ou utiliser un domaine personnalisé

Depuis la racine du dépôt :

```powershell
node tools\configure-domain.mjs https://calabo-act21.github.io/enjoy-the-fall-codex-project/
```

Ou, une fois le domaine personnalisé confirmé :

```powershell
node tools\configure-domain.mjs https://votre-domaine.fr/
```

Le script met à jour le canonical, les métadonnées sociales, le JSON-LD, [robots.txt](../robots.txt), [sitemap.xml](../sitemap.xml) et la base de la page 404. Il accepte une URL HTTPS avec ou sans chemin de projet. Redémarrer le serveur local après changement pour qu'il prenne en compte le nouveau chemin.

Configurer ensuite le domaine et le DNS dans GitHub Pages si nécessaire. Sur un autre hébergeur statique, publier les fichiers web à la racine ou sous le chemin configuré, servir une vraie 404 et activer cache/compression. Aucune compilation ni dépendance de production.

## Mettre à jour les contenus

### Concerts

Modifier le tableau `shows` au début de [script.js](../script.js) :

```js
{ date: "2026-10-03", event: "Le Survolté Festival", city: "", note: "", url: "https://lesurvoltefestival.org/", urlLabel: "Site du festival" }
```

- Date complète : `YYYY-MM-DD`. Si seul le mois est connu : `YYYY-MM`, sans inventer de jour.
- Laisser `city` et `url` vides si l'information manque. Les liens ajoutés doivent être des URLs HTTPS vérifiées.
- `urlLabel` permet de nommer le lien affiché à droite de la date (par exemple « Site du festival »). Laisser `note` vide pour ne pas afficher d'encadré de précision.
- Les dates du jour restent à venir jusqu'à la fin de la journée **Europe/Paris**. Une entrée connue au mois près reste à venir pendant tout le mois. Le classement et le tri se font automatiquement au chargement, selon l'horloge du visiteur.
- Après la dernière date, « Nouvelles dates bientôt » apparaît. Les dates passées restent dans une archive dépliable.
- Mettre à jour aussi la liste HTML `#live-static` dans [index.html](../index.html) : elle sert de version lisible sans JavaScript et de contenu explorable. Cette liste est volontairement neutre, sans statut temporel périssable.
- Aucun `MusicEvent` n'est déclaré pour Le Survolté : le lieu précis n'est pas confirmé. Ne pas ajouter un événement structuré incomplet ou une fausse billetterie.

### Vidéos

Dans [index.html](../index.html), chaque `.video-option` contient :

- `href` : URL YouTube de secours ;
- `data-video-id` : identifiant YouTube vérifié (11 caractères) ;
- `data-title` : titre du live ;
- `data-image` et `img src` : miniature locale correspondante ;
- le texte visible et le lieu vérifié.

La première option est sélectionnée initialement. Si elle change, mettre à jour aussi `#video-load` et `#video-external`, visibles sans JavaScript. Préparer les miniatures WebP locales dans [assets/images](../assets/images) à partir des vidéos officielles, sans substituer une image d'un autre concert.

Le script transforme les liens en boutons avec état `aria-pressed`. La sélection remplace le lecteur par une façade : elle arrête la vidéo précédente et ne lance jamais automatiquement la suivante. Le bouton central charge `youtube-nocookie.com` ; il faut ensuite lancer la lecture dans YouTube. Les liens directs restent disponibles si l'intégration est bloquée.

### Musique, sorties et liens

- Remplacer les liens `https://push.fm/fl/enjoythefall` dans [index.html](../index.html) uniquement par une adresse confirmée. Il n'y a pas de liens spécifiques Spotify/Apple Music non vérifiés.
- GO.OD est annoncé comme **prévu en janvier 2027**, et les singles comme **prévus en octobre et novembre 2026**. Pas de changement automatique en « disponible » : confirmer la sortie effective, puis modifier la section Musique, le titre et les descriptions SEO/sociales si nécessaire.
- Ne pas ajouter de jour précis ni de tracklist sans source. Aucun `MusicAlbum` n'est déclaré tant que les détails de publication ne sont pas suffisamment confirmés.

### Contact, réseaux et ressources pro

Rechercher les valeurs actuelles dans [index.html](../index.html) :

- `enjoythefall31@gmail.com` (texte, `mailto`, JSON-LD) ;
- `+33675783960` (lien `tel`, JSON-LD) et le numéro affiché ;
- Benoit Staub pour le booking/presse/management ;
- les profils Facebook, Instagram et YouTube (liens et `sameAs`) ;
- l'URL Canva de l'EPK (Bio et Contact) ;
- l'URL Google Drive de la fiche technique (Contact).

Le JSON-LD `MusicGroup` se trouve dans le `<head>`. Garder les mêmes informations dans le texte et les données structurées. La date de formation est **2025**, pas 2024. L'expérience au Bataclan, au Bikini et au Taubertal concerne les **précédents projets des membres**.

### Photos, design et polices

Les dérivés AVIF/WebP conservent les photographies fournies : `hero-*` pour l'accueil, `good-*` pour GO.OD et `bio-*` pour la biographie. Le logo sert d'origine aux icônes, sans redessin ni déformation. La photo sociale fait 1200 × 630 px.

Ne pas modifier les originaux de `source-material`. Lors d'un remplacement de photo, mettre à jour `srcset`, dimensions et texte alternatif. Les tokens de couleurs et les deux piles typographiques sont définis au début de [styles.css](../styles.css).

## Vérification après modification

- Tester 360, 768 et 1440 px, ainsi que le zoom texte : aucun débordement ni visage masqué.
- Parcourir au clavier : lien d'évitement, menu, Échap, liens, archive, sélecteur et lecteur vidéo. Vérifier le focus visible.
- Désactiver JavaScript : navigation, contact, dates et liens vidéo restent utilisables.
- Tester l'agenda avant/après une date, les liens internes et externes, `mailto` et `tel`.
- Contrôler la console, les images, le manifest, le JSON-LD, le canonical et le sitemap. Les URLs SEO doivent toutes utiliser le domaine confirmé.
- Respecter la préférence de réduction des mouvements et ne pas ajouter de lecture automatique.

Les informations encore à confirmer sont regroupées dans [CONTENT_TODO.md](CONTENT_TODO.md).

## Contrôles de livraison — 30 septembre 2026

- Rendu inspecté à 360, 768 et 1440 px ; débordement également testé à 320 et 1920 px.
- Tests Playwright : liens d'ancrage, menu mobile et Échap, focus clavier, agenda aux limites de jour/mois dans le fuseau de Paris, état sans prochaine date, réduction des mouvements, fonctionnement sans JavaScript et vraie réponse 404.
- Aucune violation détectée par axe sur les critères automatisables WCAG 2.2 A/AA aux trois tailles principales ; HTML des deux pages validé. Ces audits automatisés ne constituent pas une certification exhaustive.
- Les deux lecteurs YouTube ont été chargés et **réellement lus** ; le temps de lecture progresse. Changement de vidéo, arrêt du lecteur précédent et absence d'autoplay vérifiés. Aucun appel tiers avant activation du lecteur.
- Liens externes du site ouverts dans un navigateur : réponses HTTP 200 ; YouTube peut afficher son écran de consentement selon le contexte. L'EPK Canva et la fiche technique Google Drive sont accessibles avec leurs titres attendus.
- JSON-LD, sitemap XML, manifest, icônes, variantes d'images et script de changement de domaine vérifiés. L'URL de publication est désormais configurée pour GitHub Pages.
- Lighthouse local : **mobile 98 / 100 / 100 / 100**, **desktop 100 / 100 / 100 / 100**, dans l'ordre performance, accessibilité, bonnes pratiques, SEO. CLS arrondi à 0 ; LCP mesuré à 2,3 s sur mobile simulé et 0,6 s sur desktop. Scores de laboratoire variables selon la machine, le réseau et l'hébergement ; activer cache et compression en production.
- Les fichiers de `source-material` sont restés inchangés.
