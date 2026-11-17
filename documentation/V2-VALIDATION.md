# V2 — livraison locale du 17 novembre 2026

Branche : `codex/v2-hero-parallax`. Copie isolée du dépôt fourni ; dossier d’origine et originaux préservés. Pas de push, PR ou déploiement.

## Réalisation

- Accueil photographique pleine largeur, titre et actions HTML superposés, cadrage mobile montrant les quatre membres.
- Fenêtres photo indépendantes à vitesse 0,5× sur Accueil / Live, 0,6× sur Bio ; défilement natif, calcul depuis les cadres non transformés, lectures groupées puis écritures dans requestAnimationFrame, aucune inertie ajoutée.
- Panneaux Musique et agenda en recouvrement ; lecteur interactif stable.
- Variante statique CSS avec prefers-reduced-motion et contenu HTML de repli conservé.
- Aucun ajout de bibliothèque ou changement de palette, polices, liens, métadonnées ou données d’agenda.

## Photos

Accueil et Bio : variantes AVIF/WebP existantes conservées.
Live : `assets/images/live-1500.jpg`, JPEG 1500 × 1000 optimisé depuis « Copie de IMG_1814-Modifier.jpg » : https://drive.google.com/file/d/1KxIWBT_0fqkgogLdrewACqxUYhQLkkpw/view . Photo examinée visuellement avant intégration. Les sept autres photos Drive n’ont pas été téléchargées. Original téléchargé hors du dépôt et non modifié.

## Vérifications réellement effectuées

Navigateur intégré Codex, mouvement système autorisé. Captures examinées au cours du travail, non exportées en fichiers. Vue initiale 1280 × 720 ; vue étroite effective 495 × 823 (les demandes de dimensions via l’API viewport n’ont pas été appliquées par le navigateur).

- Accueil : scroll réel 0 → 324 ; repère de calque photo −141 → −303 (−162 px), titre 331,98 → 7,98 (−324 px). Mesure avant le dernier ajustement de cadrage ; formule et rapport 0,5 conservés.
- Live : scroll 1922,5 → 2251,5 ; calque photo −236,79 → −401,29 (−164,5 px), titre 349,13 → 20,13 (−329 px). Captures avant/après examinées : panneau crème remontant sur la photo.
- Menu mobile : ouverture, sélection d’ancre et fermeture vérifiées.
- Archive : ouverture des cinq dates, contenu correct à la date du test.
- Vidéo : sélection AlamZic, chargement effectif de l’iframe YouTube sans autoplay, retour à L’Acoustic Bar supprimant l’iframe précédente.
- Console sans erreur avant activation du lecteur ; absence de débordement horizontal sur les vues observées.
- Comparaison automatisée HTML avant/après : tous les textes statiques et liens conservés, par comptage avec HTMLParser ; médias locaux présents ; `git diff --check` valide.

## Limites de validation

La matrice complète n’est pas validée : dimensions exactes 1440 × 900 / 390 × 844, paysage, zoom texte, second moteur, mouvement réduit et JavaScript désactivé restent à essayer. Les deux dernières variantes sont implémentées mais non testées dans le navigateur. Pas de vidéo enregistrée ni d’audit d’accessibilité complet. La lecture temporelle de YouTube n’a pas été testée. Les captures et mesures précèdent les derniers réglages mineurs de cadrage / regroupement des lectures ; une revue visuelle finale du propriétaire est nécessaire.

## Lancement

Depuis ce checkout : `python3 -m http.server 4173 --bind 127.0.0.1`, puis http://127.0.0.1:4173/ . Aucun build requis. Le serveur Python sert les fichiers statiques ; utiliser le serveur Node existant pour tester spécifiquement les statuts 404 et le préfixe GitHub Pages lorsque Node est installé.
