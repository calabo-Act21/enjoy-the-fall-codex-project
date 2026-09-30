# Enjoy The Fall — site officiel

Site statique en français : HTML sémantique, CSS et JavaScript natif. Pas de compilation, de dépendance de production, de formulaire ou de traceur. Les polices Bebas Neue et Manrope sont locales, avec leurs licences OFL dans [assets/fonts](assets/fonts).

## Prévisualiser

Avec Node.js 20 ou plus récent, depuis la racine du dépôt :

```powershell
node site\tools\serve.mjs
```

Ouvrir <http://127.0.0.1:4173>. Un autre port peut être passé en argument (`node site\tools\serve.mjs 4180`). Le serveur écoute uniquement sur la machine locale. Arrêt : Ctrl+C. Il sert aussi la page 404 avec le bon statut HTTP.

## Publier

1. **Confirmer le domaine** : `https://enjoy-the-fall.example` est un placeholder réservé, pas une adresse officielle.
2. Configurer toutes les URLs SEO ensemble :

   ```powershell
   node site\tools\configure-domain.mjs https://votre-domaine.fr
   ```

   Le script remplace le domaine du canonical, des métadonnées sociales, du JSON-LD, de [robots.txt](robots.txt) et du [sitemap.xml](sitemap.xml). Il peut être réexécuté lors d'un changement de domaine.
3. Publier le **contenu** de ce dossier à la racine du domaine HTTPS sur un hébergeur statique. Aucune commande de build. Le dossier `tools` et les documents Markdown ne sont pas nécessaires à la diffusion.
4. Configurer l'hébergeur pour servir [404.html](404.html) avec un vrai statut 404, sans redirection vers l'accueil. Le site et ses liens 404 sont prévus pour la racine d'un domaine, pas un sous-dossier.
5. Vérifier les URLs publiques, le partage social, le sitemap, le lecteur YouTube et les ressources professionnelles après publication. Déclarer le sitemap dans les outils des moteurs de recherche si souhaité.
6. Activer compression Brotli/gzip et cache des médias sur l'hébergeur. Ne pas utiliser un cache HTML permanent ; après mise à jour des médias, invalider leur cache. HTTPS obligatoire. Aucune clé ou donnée secrète n'est nécessaire.

L'indexation est autorisée. Ne pas publier le placeholder. Aucune URL de streaming ou de billetterie n'a été inventée.

## Mettre à jour les contenus

### Concerts

Modifier le tableau `shows` au début de [script.js](script.js) :

```js
{ date: "2026-10-03", event: "Le Survolté Festival", city: "", note: "Sélection coup de cœur", url: "" }
```

- Date complète : `YYYY-MM-DD`. Si seul le mois est connu : `YYYY-MM`, sans inventer de jour.
- Laisser `city` et `url` vides si l'information manque. Les liens ajoutés doivent être des URLs HTTPS vérifiées.
- Les dates du jour restent à venir jusqu'à la fin de la journée **Europe/Paris**. Une entrée connue au mois près reste à venir pendant tout le mois. Le classement et le tri se font automatiquement au chargement, selon l'horloge du visiteur.
- Après la dernière date, « Nouvelles dates bientôt » apparaît. Les dates passées restent dans une archive dépliable.
- Mettre à jour aussi la liste HTML `#live-static` dans [index.html](index.html) : elle sert de version lisible sans JavaScript et de contenu explorable. Cette liste est volontairement neutre, sans statut temporel périssable.
- Aucun `MusicEvent` n'est déclaré pour Le Survolté : le lieu précis n'est pas confirmé. Ne pas ajouter un événement structuré incomplet ou une fausse billetterie.

### Vidéos

Dans [index.html](index.html), chaque `.video-option` contient :

- `href` : URL YouTube de secours ;
- `data-video-id` : identifiant YouTube vérifié (11 caractères) ;
- `data-title` : titre du live ;
- `data-image` et `img src` : miniature locale correspondante ;
- le texte visible et le lieu vérifié.

La première option est sélectionnée initialement. Si elle change, mettre à jour aussi `#video-load` et `#video-external`, visibles sans JavaScript. Préparer les miniatures WebP locales dans [assets/images](assets/images) à partir des vidéos officielles, sans substituer une image d'un autre concert.

Le script transforme les liens en boutons avec état `aria-pressed`. La sélection remplace le lecteur par une façade : elle arrête la vidéo précédente et ne lance jamais automatiquement la suivante. Le bouton central charge `youtube-nocookie.com` ; il faut ensuite lancer la lecture dans YouTube. Les liens directs restent disponibles si l'intégration est bloquée. Les vidéos de Google Drive restent des liens séparés.

### Musique, sorties et liens

- Remplacer les liens `https://push.fm/fl/enjoythefall` dans [index.html](index.html) uniquement par une adresse confirmée. Il n'y a pas de liens spécifiques Spotify/Apple Music non vérifiés.
- GO.OD est annoncé comme **prévu en janvier 2027**, et les singles comme **prévus en octobre et novembre 2026**. Pas de changement automatique en « disponible » : confirmer la sortie effective, puis modifier la section Musique, le titre et les descriptions SEO/sociales si nécessaire.
- Ne pas ajouter de jour précis ni de tracklist sans source. Aucun `MusicAlbum` n'est déclaré tant que les détails de publication ne sont pas suffisamment confirmés.

### Contact, réseaux et ressources pro

Rechercher les valeurs actuelles dans [index.html](index.html) :

- `enjoythefall31@gmail.com` (texte, `mailto`, JSON-LD) ;
- `+33675783960` (lien `tel`, JSON-LD) et le numéro affiché ;
- Benoit Staub pour le booking/presse/management ;
- les profils Facebook, Instagram et YouTube (liens et `sameAs`) ;
- l'URL Canva de l'EPK (Bio et Contact) ;
- l'URL Google Drive de la fiche technique (Contact).

Le JSON-LD `MusicGroup` se trouve dans le `<head>`. Garder les mêmes informations dans le texte et les données structurées. La date de formation est **2025**, pas 2024. L'expérience au Bataclan, au Bikini et au Taubertal concerne les **précédents projets des membres**.

### Photos, design et polices

Les dérivés AVIF/WebP conservent les photographies fournies : `hero-*` pour l'accueil, `good-*` pour GO.OD et `bio-*` pour la biographie. Le logo sert d'origine aux icônes, sans redessin ni déformation. La photo sociale fait 1200 × 630 px.

Ne pas modifier les originaux de `source-material`. Lors d'un remplacement de photo, mettre à jour `srcset`, dimensions et texte alternatif. Les tokens de couleurs et les deux piles typographiques sont définis au début de [styles.css](styles.css).

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
- JSON-LD, sitemap XML, manifest, icônes, variantes d'images et script de changement de domaine vérifiés. Le placeholder du domaine reste intentionnel jusqu'à confirmation.
- Lighthouse local : **mobile 98 / 100 / 100 / 100**, **desktop 100 / 100 / 100 / 100**, dans l'ordre performance, accessibilité, bonnes pratiques, SEO. CLS arrondi à 0 ; LCP mesuré à 2,3 s sur mobile simulé et 0,6 s sur desktop. Scores de laboratoire variables selon la machine, le réseau et l'hébergement ; activer cache et compression en production.
- Les fichiers de `source-material` sont restés inchangés.
