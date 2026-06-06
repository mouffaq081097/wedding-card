# Ousaima & Mouffaq — Interactive Wedding Invitation

An animated, bilingual (Arabic + English) wedding invitation web app.
The guest sees a textured wax‑sealed envelope resting on a midnight‑blue
arabesque night. Tapping the **wax seal** opens the envelope in 3D — the
flap lifts to reveal a gold‑lined interior, the card rises, and the full
invitation unfolds with the couple's names, the marriage verse, the date,
venue, schedule, dress code and RSVP.

**Theme:** Midnight Blue & Arabesque · **Couple:** Ousaima & Mouffaq

---

## ✨ What's inside

- **Realistic materials, no images** — paper fibre + grain and the glossy,
  molten, embossed **wax seal** are all generated with **SVG filters**
  (`feTurbulence`, `feDisplacementMap`, `feSpecular/DiffuseLighting`), so they
  stay crisp at any size and weigh almost nothing.
- **True 3D envelope** — CSS 3D transforms (`preserve-3d`, `perspective`):
  the envelope floats, follows your pointer with parallax, then rotates and
  opens. The flap is genuinely two‑sided (cream outside, gold arabesque liner
  inside).
- **Living background** — layered night‑sky gradient, drifting gold geometric
  lattice, a breathing glow, vignette and a fine film‑grain.
- **Particle field on `<canvas>`** — floating gold motes with depth/twinkle,
  plus a celebratory burst on open (DPR‑aware, capped for performance).
- **Choreographed reveal** — staggered, eased entrance for every block of the
  invitation.
- **Synthesised chime** — a soft shimmer plays on open via the Web Audio API
  (no audio files). Off by default; toggle with the speaker button.
- **Bilingual & RTL‑correct** — Arabic calligraphy (Amiri / Aref Ruqaa / Reem
  Kufi) paired with elegant English (Cinzel / Cormorant Garamond / Great Vibes).
- **Accessible** — keyboard operable, `Esc` to close, focus management,
  `aria` states, and full `prefers-reduced-motion` support.

## ▶️ Viewing it

It's a static site — no build step. Either:

```bash
# option A: just open the file
open index.html          # macOS  (or double‑click it)

# option B: run a tiny local server (recommended, so fonts/canvas behave)
python3 -m http.server 8000
# then visit http://localhost:8000
```

> Fonts load from Google Fonts, so the first view needs an internet
> connection. Without it, the layout still works using elegant serif
> fallbacks.

## 🖋️ Personalising it (the important part)

**Open `script.js` and edit the `WEDDING` object at the very top.** Every
piece of text the guest sees comes from there. Fields marked `« EDIT »` are
placeholders — replace them with your real details:

| Field | What it controls |
|---|---|
| `names` | English + **Arabic** spelling of your names |
| `bismillah`, `eyebrowEn/Ar` | Opening line / "together with their families" |
| `quote` | The verse/quote (currently Qur'an 30:21) and its reference |
| `date`, `time` | When — English and Arabic |
| `venue` | Name (EN/AR), address, and the **Google Maps link** |
| `schedule[]` | The order of the day (time, event, Arabic) |
| `dress` | Dress code |
| `rsvp` | RSVP note, contact, and the button link (`tel:` / `mailto:` / URL) |
| `foot` | Closing blessing |
| `monogram` | The letter shown on the wax seal (default `و` = "and") |

> ⚠️ **Please double‑check the Arabic spelling of your names** in
> `names.ar` — I used my best transliteration of *Ousaima* (`أُسَيْمَة`) and
> *Mouffaq* (`مُوَفَّق`) as placeholders. Correct them to exactly how you
> write them.

### Changing the colours

The whole palette lives in CSS custom properties at the top of `styles.css`
(`:root { --night-1, --gold-1, --ivory … }`). Adjust those to reskin the
entire card.

## 📁 Structure

```
index.html   markup, SVG texture filters & reusable ornaments, font links
styles.css   theme tokens, textures, 3D envelope, animations, invitation layout
script.js    WEDDING content config + engine (render, particles, sound, open/close)
```

## 🌐 Browser support

Modern evergreen browsers (Chrome, Edge, Safari, Firefox) on desktop and
mobile. Uses CSS 3D transforms, `background-clip:text`, SVG filters, Canvas
and the Web Audio API.

## 🙏 Credits

- Verse: **Qur'an 30:21** (Sūrat ar‑Rūm) — the classic marriage verse.
- Typefaces via Google Fonts: Amiri, Aref Ruqaa, Reem Kufi, Cinzel,
  Cormorant Garamond, Great Vibes.
- Textures, ornaments, animation and code: hand‑built for this invitation.

*Made with love for Ousaima & Mouffaq.* 💛
