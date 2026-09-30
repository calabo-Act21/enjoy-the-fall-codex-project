# Master build prompt v2 — Enjoy The Fall official website

> Historical build brief. The production files have since moved from `site/` to the repository root for GitHub Pages. Refer to [the current guide](../README.md) for maintenance and deployment; do not rebuild the approved design.

You are a senior web designer, front-end engineer, accessibility specialist and technical SEO engineer. Build a production-ready one-page showcase website for the Toulouse rock band **Enjoy The Fall**.

The result must be credible as the band's official website and suitable to send to concert programmers, festivals, press/media and listeners.

---

## 0. Source hierarchy and working method

Before coding:

1. Inspect every provided local asset under `source-material/`.
2. Read `DESIGN-SYSTEM.md`.
3. Treat `source-material/EPK-Enjoy-The-Fall.pdf` as the primary source for factual content.
4. Inspect `https://www.royalrepublic.net/` for information architecture, rhythm, content hierarchy and interaction ideas.
5. Do **not** copy Royal Republic's copyrighted visual assets, source code, exact copy, distinctive illustrations or create a pixel-for-pixel clone.
6. Do **not** reuse the layout/components from the old Enjoy The Fall prototype. From that prototype, preserve **only its colors and its two font families** as documented in `DESIGN-SYSTEM.md`.
7. Produce a short implementation plan.
8. Build the site.
9. Run it locally.
10. Inspect rendered desktop and mobile views and iterate on obvious design/accessibility/performance issues before declaring the task complete.

If browser/screenshot tools are available, use them for visual QA.

Never invent missing factual information. Where a field is not verified, omit it or create a clearly marked TODO.

---

## 1. Technical constraints

Build a fast static site using:
- semantic HTML5;
- modern CSS;
- vanilla JavaScript only where interaction is needed;
- no React/Vue/Angular;
- no unnecessary build framework;
- no heavy animation library;
- progressive enhancement;
- responsive/mobile-first behavior.

Build the production website **inside `site/` only**.

Target structure:

```text
/site
  index.html
  styles.css
  script.js
  robots.txt
  sitemap.xml
  site.webmanifest
  404.html
  README.md
  /assets
    /images
    /icons
```

Do not overwrite the source files under `source-material/`. They are references/input material.

Keep the code understandable and maintainable by a non-expert.

---

## 2. Visual direction

Use `DESIGN-SYSTEM.md` as the visual source of truth.

Critical instruction: from the previous prototype, preserve **ONLY**:
- the neutral warm-black / warm-paper color palette;
- Bebas Neue;
- Manrope.

Do not reuse:
- the previous hero;
- ticker;
- orbit graphics;
- member cards;
- old section layout;
- old animations;
- old component styling.

Use the Enjoy The Fall logo in the header and favicon, discreetly. The logo should sign the interface rather than dominate it.

Target feeling:
- energetic;
- playful/euphoric;
- groovy;
- professional;
- editorial;
- slightly raw;
- photography-first;
- never cheesy;
- never a generic "rock band template".

---

## 3. Royal Republic reference

Use Royal Republic only as a structural/editorial reference.

Study ideas such as:
- immediate music-first impact;
- strong photographic/release-led moments;
- large, confident typography;
- very clear sections for music, concerts, videos and biography;
- direct CTAs;
- strong pacing between sections.

Translate those principles into Enjoy The Fall's own palette, typography, logo, photography and content.

Do not clone their layout exactly.

---

## 4. Verified content from the current EPK

Use these details as source-of-truth content unless explicitly overridden by the user.

### Band positioning

A concise factual basis for the site's copy:

> Enjoy The Fall is a Toulouse four-piece described in its EPK as an "assaut rock" crossing hip-hop roots and euphoric vibes. The band's sound combines groove, raw energy and melancholy, with writing designed for the stage.

The EPK cites influences including:
- Rage Against the Machine / RATM;
- The Hives;
- Queens of the Stone Age.

Use influences sparingly; do not turn the site into a list of comparisons.

### Formation / history

The current EPK states:
- project born / band formed in **2025**;
- several months of writing were shaped for the stage;
- a first residency followed;
- the band then began performing on local stages.

Important conflict handling:
- the old prototype contains a 2024 formation date;
- the current EPK says 2025;
- use **2025** in the new site and structured data unless the user explicitly changes it.

### Members

Use the full names and EPK roles where members are shown:

- **Camille Laborde** — Batterie / Chant
- **Nicolas Caillot** — Basse / Chant
- **Benoit Staub** — Guitare / Chant
- **Marc Breuillaud** — Chant

### Previous-project experience

The EPK states that the members' **previous projects** brought them to major stages including:
- Taubertal Festival;
- Bataclan;
- Bikini;

and included support experience such as Last Train at Connexion in 2015.

If used in the Bio, phrase this carefully so it cannot be read as a claim that Enjoy The Fall itself played all those stages.

### Release plan

- First EP: **GO.OD**
- Planned EP release: **January 2027**
- Singles planned: **October 2026 and November 2026**

Do not describe GO.OD as already released unless the live data/build date or user-provided information confirms that it is available.

### Music / smart link

Use this verified "PLAY" / music hub URL:

`https://push.fm/fl/enjoythefall`

This can be used as the main "Écouter" CTA.

### Official profiles

Use canonical/clean versions where possible:

- Facebook:
  `https://www.facebook.com/profile.php?id=61582403791190`
- Instagram:
  `https://www.instagram.com/enjoy_the_fall_/`
- YouTube:
  `https://www.youtube.com/@EnjoyTheFall.31`

### Contact / booking

Public professional contact:

- Booking / Presse / Management: **Benoit Staub**
- Phone: **+33 6 75 78 39 60**
- Email: **enjoythefall31@gmail.com**

Use:
- `mailto:enjoythefall31@gmail.com`
- `tel:+33675783960`

### Technical rider

Verified technical-rider link:

`https://drive.google.com/file/d/1iUn2sh9PlJyh_9b2dCdLDOD0JUlmlmHV/view?usp=drive_link`

Expose it in the Contact / Booking section as "Fiche technique" or "Technical rider".

### Public EPK

Public EPK URL:

`https://www.canva.com/design/DAHS1Ci-k8A/EWjfq9eXTHCa2ak3pogOVA/view`

Expose it as a professional resource where appropriate, e.g. "Voir l'EPK".

---

## 5. Information architecture

Create a compact sticky/minimal header with:
- small Enjoy The Fall logo;
- navigation anchors: Musique, Live, Vidéos, Bio, Contact;
- one compact CTA such as `Écouter` or `Booking` if it fits without clutter.

Recommended page flow:

**HERO → MUSIQUE / GO.OD → LIVE → VIDÉOS → BIO → CONTACT**

No separate generic "Le son" section is required unless it materially improves the composition. The Hero, release section and Bio should already communicate the identity.

---

## 6. HERO

Asset:

`P1028141_1_DxO.jpg`

Goal: make the band understandable in roughly three seconds.

Requirements:
- meaningful H1 containing `Enjoy The Fall`;
- concise positioning label such as `Groove Rock · Toulouse`;
- a very short statement rooted in the EPK;
- primary CTA: `Écouter` linking to `https://push.fm/fl/enjoythefall`;
- secondary CTA: `Voir les dates` or `Booking`;
- photo must dominate;
- do not cover faces with large text;
- crop intelligently on mobile.

Possible copy direction, to refine editorially rather than copy mechanically:

`Un assaut rock entre groove, énergie brute, mélancolie et racines hip-hop.`

Keep it short.

---

## 7. MUSIQUE / GO.OD

Main visual asset:

`P1028186_4_DxO.jpg`

Treat it as the supplied GO.OD release visual/artwork for this site.

Content:
- `GO.OD`
- `Premier EP`
- `Janvier 2027`
- note that singles are planned for October and November 2026;
- concise description of the release / sound without fabricating track titles or claims;
- main music CTA to the verified smart link:
  `https://push.fm/fl/enjoythefall`

Important temporal behavior:
- do not say "Disponible maintenant" before the release is actually available;
- if the site is built/updated after the release and the smart link confirms availability, copy may be updated accordingly;
- otherwise use language such as `Premier EP — Janvier 2027`, `Bientôt`, or `Écouter Enjoy The Fall`.

Do not invent a tracklist.

If platform-specific URLs can be resolved safely from the smart-link page, add Spotify/Apple Music/Deezer/etc. buttons. Otherwise use one clean universal `Écouter` smart-link CTA rather than fake platform URLs.

---

## 8. LIVE

Build a clean, scan-friendly date list.

Use a simple JS data structure so a non-expert can update events, for example:

```js
const shows = [
  {
    date: "2026-10-03",
    event: "Le Survolté Festival",
    city: "",
    note: "Sélection coup de cœur",
    url: "",
    status: "upcoming"
  }
];
```

Seed the known EPK history correctly.

### Known EPK live history

2025:
- Residency at **AlamZic**, Bagnères-de-Bigorre — November 2025.

2026:
- **L'Acoustic Bar**, Montauban — 25 April 2026.
- **L'Engrenage**, Balma — 7 May 2026.
- **Little O'Clock**, Toulouse — 25 June 2026.
- **Le Survolté Festival** — 3 October 2026 — `sélection coup de cœur`.

Rules:
- determine upcoming vs past from the actual current/build date where possible;
- do not invent a city for Le Survolté if it is not verified;
- no fake ticket URL;
- if no future event remains, show a polished `Nouvelles dates bientôt` state;
- optionally include a compact `Dates passées` archive, but keep the emphasis on upcoming shows.

For structured data, only create `MusicEvent` when date/location fields are complete enough to be factual.

---

## 9. VIDÉOS

Create:
- one responsive 16:9 YouTube player;
- a row/grid of thumbnail buttons beneath it;
- clicking a thumbnail switches the main video without a page reload;
- keyboard-accessible controls;
- useful accessible labels;
- lazy-load YouTube / use a performance-conscious facade if practical.

Verified EPK video links:

1. Acoustic Bar:
   `https://youtu.be/vGwLCD93alA`
   YouTube ID: `vGwLCD93alA`

2. AlamZic:
   `https://youtu.be/pKaZUr1MH4o`
   YouTube ID: `pKaZUr1MH4o`

The EPK also links a Little O'Clock video hosted on Google Drive:
`https://drive.google.com/file/d/1Fb_n5sF4XN5fqZ201elufba-UGAQQYAk/view?usp=drive_link`

Because the requested player is YouTube-based, use the two verified YouTube videos as the initial switcher content. Do not pretend the Google Drive video is a YouTube ID.

If additional videos are added, use only verified videos from the official channel:
`https://www.youtube.com/@EnjoyTheFall.31`

Do not autoplay audio/video.

---

## 10. BIO

Asset:

`P1028131_1_DxO (1).jpg`

Write a concise professional bio grounded in the EPK.

Recommended content structure:

1. identity:
   - Toulouse four-piece;
   - formed/born in 2025 according to current EPK;
   - rock + hip-hop roots;
   - groove, raw energy, melancholy and euphoric edge;

2. stage orientation:
   - months of writing shaped for live performance;
   - first residency at AlamZic;
   - local live development;

3. experience:
   - members bring prior-project stage experience including Taubertal Festival, Bataclan and Bikini;
   - phrase this explicitly as experience from **previous projects**.

4. optional compact member list:
   - Camille Laborde — Batterie / Chant
   - Nicolas Caillot — Basse / Chant
   - Benoit Staub — Guitare / Chant
   - Marc Breuillaud — Chant

Do not fabricate press quotes or audience statistics.

---

## 11. CONTACT / BOOKING

Make this section genuinely useful to a programmer, festival or press contact.

Include:

**Booking / Presse / Management**  
Benoit Staub

Email:
`enjoythefall31@gmail.com`

Phone:
`+33 6 75 78 39 60`

Social links:
- Facebook
- Instagram
- YouTube

Professional resources:
- `Voir l'EPK`
- `Fiche technique`

Music:
- `Écouter`

Use clear button/link labels. Use `mailto:` and `tel:` correctly.

Do not hide contact information behind a JavaScript form. A contact form is unnecessary unless specifically requested.

Finish with a restrained footer.

---

## 12. SEO — production requirements

Implement modern technical and on-page SEO appropriate for an official artist website.

### Core metadata

Create a natural French title, for example:

`Enjoy The Fall — Groupe Groove Rock à Toulouse | GO.OD`

Do not keyword-stuff.

Create a concise French meta description based on verified facts, mentioning where natural:
- Enjoy The Fall;
- Toulouse;
- rock / groove;
- hip-hop roots;
- GO.OD;
- live.

Add:
- canonical URL;
- robots directive;
- Open Graph title/description/url/type/image;
- Twitter/X large-card metadata;
- correct favicon;
- web manifest;
- `theme-color`.

Use one configurable production domain or a clearly marked placeholder until the real domain is confirmed.

### Semantic HTML

- exactly one meaningful H1;
- logical H2/H3 hierarchy;
- crawlable text describing the band, location, music, release and live activity;
- descriptive link text;
- useful image alt text;
- avoid important textual content rendered only by JavaScript.

### Structured data

Add valid JSON-LD for `MusicGroup`.

Verified fields may include:
- name: Enjoy The Fall;
- foundingLocation: Toulouse, France;
- foundingDate: `2025` according to current EPK;
- genre: use a restrained factual list such as `Rock`, `Groove Rock`, `Rap Rock` only if consistent with site copy;
- members with full names and EPK roles;
- official `sameAs` links:
  - Facebook;
  - Instagram;
  - YouTube.

Important:
- do not reintroduce the old prototype's `2024-10` founding date;
- do not add unverifiable awards;
- do not describe previous-project venues as Enjoy The Fall performances.

For GO.OD:
- add `MusicAlbum` / music-release structured data only when the release date/details are sufficiently factual and appropriate;
- planned release: January 2027;
- do not claim an exact day unless supplied.

For concerts:
- use `MusicEvent` only for sufficiently complete confirmed events;
- do not add fake ticket URLs or fake venues.

### Crawlability

Create:
- `robots.txt`;
- `sitemap.xml`;
- canonical handling;
- readable `404.html`.

Do not block indexing accidentally.

---

## 13. Performance / Core Web Vitals

Aim for excellent Lighthouse results without gaming the score.

- no layout shifts from images;
- specify image dimensions/aspect ratios;
- generate optimized AVIF/WebP variants when tooling allows;
- use responsive `srcset`/`sizes`;
- do not lazy-load the LCP hero image;
- lazy-load below-the-fold imagery;
- avoid loading YouTube until needed where practical;
- minimize JS;
- defer non-critical JS;
- avoid large dependencies;
- avoid third-party trackers by default;
- use `font-display: swap` behavior;
- preload only truly critical assets.

---

## 14. Accessibility

Target WCAG 2.2 AA in practical implementation:
- keyboard navigation;
- visible focus states;
- skip link;
- adequate contrast;
- accessible mobile menu;
- correct link/button semantics;
- useful ARIA only where necessary;
- reduced-motion support;
- no autoplay;
- YouTube switcher usable with keyboard and screen readers.

---

## 15. Responsive behavior

Test at minimum:
- ~360px mobile;
- ~768px tablet;
- ~1440px desktop.

Requirements:
- no horizontal overflow;
- intentional responsive typography;
- sensible photo crops;
- comfortable touch targets;
- contact/live information remains readable on small screens.

---

## 16. Motion / interaction

Motion must be subtle and purposeful:
- restrained reveal transitions are acceptable;
- understated hover/focus transitions;
- no scroll-jacking;
- no excessive parallax;
- no cursor gimmicks;
- respect `prefers-reduced-motion`.

The site should feel alive mainly through:
- photography;
- typography;
- pacing;
- composition;
- live/video content.

---

## 17. Supplied assets

Use:
- `source-material/assets/logo-original.webp` — logo / favicon source;
- `source-material/assets/P1028141_1_DxO.jpg` — HERO;
- `source-material/assets/P1028186_4_DxO.jpg` — MUSIQUE / GO.OD;
- `source-material/assets/P1028131_1_DxO (1).jpg` — BIO;
- `source-material/EPK-Enjoy-The-Fall.pdf` — factual/content source of truth;
- `source-material/old-prototype/` — old prototype, to be consulted **only** for verification of the legacy palette/fonts if needed;
- `DESIGN-SYSTEM.md` — visual source of truth.

Do not substitute AI-generated band photographs for supplied photography.

---

## 18. Content integrity rules

Never fabricate:
- concert dates;
- ticket links;
- track titles;
- streaming platform URLs;
- press quotes;
- audience figures;
- awards;
- release-day dates;
- contact details;
- venue locations;
- past-stage claims.

If a factual field is missing, omit it or put it into `CONTENT_TODO.md`.

Keep a strict distinction between:
- Enjoy The Fall's own history;
- the members' experience from previous projects.

---

## 19. Quality checks before completion

Before finishing:
- verify every internal anchor;
- verify every external URL;
- check email and phone links;
- check mobile navigation;
- check video switching;
- check keyboard focus;
- check alt text;
- check console for errors;
- validate JSON-LD syntax;
- verify the formation year is 2025, not the old prototype's 2024;
- verify GO.OD is not incorrectly described as already released;
- verify the 2026 live dates are classified correctly relative to the current date;
- check sitemap/robots domain placeholders;
- inspect desktop and mobile screenshots;
- run Lighthouse or equivalent if available;
- fix obvious performance/accessibility issues.

Create a short `README.md` explaining how to update:
- live dates;
- video IDs;
- smart/streaming links;
- release status/date;
- contact details;
- social profiles;
- technical rider link;
- deployment.

---

## 20. Definition of done

The final website must:
- feel like an intentional official artist website;
- make Enjoy The Fall understandable immediately;
- foreground GO.OD, live activity and video;
- be credible for bookers/festivals/press;
- be deployable as static HTML/CSS/JS;
- be responsive;
- accessible;
- fast;
- SEO-ready;
- easy to update;
- clearly original to Enjoy The Fall.
