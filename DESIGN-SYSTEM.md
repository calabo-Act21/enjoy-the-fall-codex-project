# Enjoy The Fall — Design System v2

> Source hierarchy:
> 1. This file defines the visual system.
> 2. The current Enjoy The Fall EPK is the factual/content source of truth.
> 3. The previous site prototype is used **only** to preserve its color palette and its two font families.
> 4. The Royal Republic website may inspire editorial rhythm and information architecture, but must never be cloned.

## 1. Brand direction

Enjoy The Fall should feel:
- rock, direct and energetic;
- groovy and physical;
- playful/euphoric without becoming goofy;
- slightly raw and editorial rather than corporate;
- professional enough for bookers, festivals, press and media;
- photography-first, with the music and live energy as the primary content.

The EPK describes the band as an "assaut rock" crossing hip-hop roots with euphoric vibes, with a sound combining groove, raw energy and melancholy. Use that as a tone reference for copy and art direction.

Avoid:
- generic "music template" aesthetics;
- neon cyberpunk / EDM visuals;
- over-designed grunge textures;
- excessive logo repetition;
- excessive animation;
- corporate SaaS-style cards;
- visual clichés such as flames, skulls, distressed overlays everywhere.

## 2. Color tokens

These are the exact colors retained from the previous prototype.

```css
:root {
  --color-ink: #0f0f0e;
  --color-ink-soft: #1a1a18;

  --color-bone: #d2ccc0;
  --color-paper: #e8e2d8;
  --color-paper-deep: #cbc4b8;

  --color-muted: #716d66;

  --color-line-dark: rgba(15, 15, 14, 0.22);
  --color-line-light: rgba(210, 204, 192, 0.28);
}
```

### Usage rules

- `--color-ink`: principal dark background and principal text on light backgrounds.
- `--color-ink-soft`: subtle alternate dark surface / hover.
- `--color-bone`: warm off-white for text on dark backgrounds and selected accents.
- `--color-paper`: principal light background.
- `--color-paper-deep`: secondary light surface for alternating sections.
- `--color-muted`: secondary copy and metadata on light backgrounds.
- `--color-line-dark` / `--color-line-light`: borders and separators only.

Do not introduce a permanent saturated UI accent color. Real content assets such as photography, release artwork and platform marks may contain their own colors.

## 3. Typography

### Display / headings

**Bebas Neue**
- Google Fonts family: `Bebas Neue`
- CSS fallback: `"Bebas Neue", Impact, sans-serif`
- Use for H1/H2, short statements, dates, section titles and selected navigation treatments.
- Best for short phrases and strong editorial moments.
- Do not use for paragraphs.

### Body / UI

**Manrope**
- Google Fonts family: `Manrope`
- Weights: 400, 500, 600, 700, 800
- CSS fallback: `"Manrope", system-ui, sans-serif`
- Use for paragraphs, navigation, buttons, event information, captions and contact information.

### Font import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

### Typography principles

- Strong contrast between oversized Bebas Neue display type and compact, readable Manrope.
- Body text should remain highly readable; do not overuse uppercase Manrope.
- Letter-spacing may be used for short labels/metadata, not for long copy.
- Keep comfortable desktop line lengths.
- Use responsive `clamp()` values where useful.
- Create a new type scale for the new site. Do not copy the previous prototype's scale.

## 4. Editorial tone

Public-facing copy should be concise, concrete and energetic.

Preferred vocabulary/themes supported by the EPK:
- assaut rock;
- racines hip-hop;
- groove;
- énergie brute;
- mélancolie;
- vibes euphoriques;
- écriture taillée pour la scène;
- live / scène / mouvement.

The site may use "Groove Rock · Toulouse" as a compact positioning label.

Avoid exaggerated claims such as:
- "the next big thing";
- "explosive phenomenon";
- fake press quotes;
- fake audience numbers;
- awards or support slots not present in verified sources.

When referring to major stages such as Taubertal Festival, Bataclan and Bikini, make it explicit that these were reached through **members' previous projects**, not by Enjoy The Fall itself.

## 5. Factual source of truth

Use the current EPK for factual band information.

Verified EPK facts to keep consistent across the site:
- Toulouse-based four-piece.
- The EPK states the project was formed / born in **2025**.
- Members:
  - Camille Laborde — drums / vocals;
  - Nicolas Caillot — bass / vocals;
  - Benoit Staub — guitar / vocals;
  - Marc Breuillaud — vocals.
- First EP: **GO.OD**, planned for **January 2027**.
- Singles planned for **October and November 2026**.
- Booking / press / management contact: **Benoit Staub**.
- Main contact email: **enjoythefall31@gmail.com**.
- Main social profiles and links are supplied in the master prompt.

Important: the older prototype contains a 2024 formation date. Do not reuse it automatically. The current EPK says 2025; treat the EPK as the current source unless the user explicitly corrects it.

## 6. Logo

Primary source asset: `source-material/assets/logo-original.webp`.

Rules:
- use sparingly;
- header logo should be small and secondary to photography and content;
- derive favicon/app-icon assets from the logo where technically appropriate;
- preserve aspect ratio;
- never stretch or redraw the mark;
- do not use the logo repeatedly as a decorative watermark;
- ensure adequate contrast against its background;
- if a transparent production version is available, prefer it.

## 7. Photography

Supplied production images:
- Hero: `source-material/assets/P1028141_1_DxO.jpg`
- Music / GO.OD: `source-material/assets/P1028186_4_DxO.jpg`
- Bio: `source-material/assets/P1028131_1_DxO (1).jpg`

Rules:
- do not generatively alter people or photographic content;
- responsive cropping is allowed, but preserve faces and the photographic intention;
- use deliberate `object-position`;
- specify dimensions/aspect ratios to avoid layout shift;
- generate AVIF/WebP derivatives where useful, while keeping original source files;
- avoid heavy filters that erase the character of the images;
- do not place large text directly over faces.

The EPK also contains live and press photography. Do not extract/reuse EPK images unless they are separately supplied or the user explicitly requests it.

## 8. Components and visual rhythm

The new site should be driven by:
- large photography;
- oversized editorial headings;
- clean horizontal rules / borders;
- clear release, live and video modules;
- generous whitespace;
- strong alternation between dark and warm-paper surfaces;
- compact metadata.

Components should feel bespoke to a band website rather than like generic cards.

Do **not** inherit components from the previous prototype.

## 9. Accessibility and implementation

- WCAG-conscious contrast.
- Visible keyboard focus.
- Semantic heading order.
- Useful `alt` text; decorative images use empty alt text.
- Respect `prefers-reduced-motion`.
- No interaction should depend solely on hover.
- CSS custom properties should be the single source of truth for colors and font stacks.
- Touch targets should be comfortable on mobile.
- No autoplaying audio or video.

## 10. Explicit non-goals

Do **not** inherit from the previous prototype:
- its layout;
- its section order;
- its orbit/logo decorations;
- its ticker;
- its cards;
- its old hero composition;
- its spacing values;
- its animations;
- its component styling.

The new site may take structural/editorial inspiration from Royal Republic, but it must remain an original Enjoy The Fall website rather than a visual clone.
