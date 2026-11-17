# Fond vidéo — 17 novembre 2026

Source : CLIP_7AM_FINAL.mp4 (1080 × 1920, 25 i/s, 44,20 s), fourni sur Drive : https://drive.google.com/file/d/1b5JR-8niS2ybZK2R0oJRPqExv9LP3OYH/view . Original conservé hors du dépôt.

Deux dérivés locaux H.264 / yuv420p, sans piste audio, 25 i/s, faststart :

- `assets/videos/hero-loop-desktop.mp4` : 1280 × 720, environ 2,3 Mo ; recadrage source 1080 × 608 à x=0 / y=740.
- `assets/videos/hero-loop-mobile.mp4` : 720 × 800, environ 1,6 Mo ; recadrage source 1080 × 1200 à x=0 / y=640.

Durée : 10 secondes. Extrait source 0,8 → 11,6 s ; les 0,8 premières secondes sont fondues dans les 0,8 dernières, puis le cycle reprend au point correspondant. Pas de lecture inversée. Posters JPEG dérivés du premier frame, pour le chargement et le repli statique.

Le script sélectionne le fichier selon le breakpoint 599 px. Lecture muette en ligne, boucle, commande pause/reprise ; pause hors écran et onglet masqué. Si la réduction du mouvement est demandée, aucun fichier vidéo n’est assigné et le poster demeure visible. Si le lancement automatique est refusé, la commande permet de réessayer. Sans JavaScript, le poster reste présent.

Le conteneur `.scene-image` d’origine garde son déplacement en parallaxe. L’ancienne photo d’accueil (`hero-*`) est réutilisée dans Bio, avec ses variantes responsive et son texte alternatif. Cadrage entier sur fond photographique flouté pour préserver les quatre visages. Les sections Musique, Live, Vidéos, la liste des membres, Contact et le footer ont été comparés à HEAD avant modification : HTML identique.

Vérifications réalisées dans le navigateur intégré : lecture mobile réellement active (durée 10 s, temps de lecture progressant, muted=true), pause/reprise, arrêt hors écran, absence d’erreur console, absence de débordement horizontal dans la vue observée, affichage des quatre visages dans Bio. Scroll réel 0 → 288 px : calque vidéo 72 → −72 (−144 px), titre 416,5 → 128,5 (−288 px). Le rapport 0,5 est conservé. Le recadrage desktop a été examiné sur son poster ; la matrice desktop/mobile complète, les modes mouvement réduit et JavaScript désactivé n’ont pas été testés graphiquement. `git diff --check` valide.

Prévisualisation depuis le checkout :

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Puis ouvrir http://127.0.0.1:4173/ . Aucun build ni dépendance d’exécution ajouté. Les anciens fichiers photo Bio sont conservés sur disque. Pas de publication.


## Ajustements de cadrage

Plafond retiré du dérivé mobile ; dérivé desktop centré plus bas dans la source pour privilégier les visages. La hauteur du média desktop correspond désormais à la fenêtre héro, évitant l’agrandissement supplémentaire de 50 %.

Concerts : réserve de mouvement ramenée de 50 % à 25 % de chaque côté. Au centre du passage, les deux visages sont visibles. Groupe : cadre au ratio 1,35, remplissage `cover`, réserve de 12 %, suppression du fond flouté et des bandes. Un décalage focal préserve le haut de la photo au milieu du passage ; la translation est bornée à la réserve réelle, mesurée sans arrondi.

Vérifications de cette révision : mobile étroit 319 × 826 dans le navigateur intégré, lecture vidéo active, visages Concerts visibles au centre, cadre Groupe entièrement couvert à deux positions de scroll et défilement inverse. Poster desktop examiné ; les deux MP4 décodés intégralement avec succès, durée 10 s inchangée. La matrice desktop complète reste non testée dans cette session. HTML et contenus inchangés. Test sur port 4180 pour éviter le serveur 4173 déjà actif.
