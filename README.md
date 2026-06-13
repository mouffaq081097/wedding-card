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
| `rsvp` | RSVP note + the **Google Apps Script endpoint** for the form (see below) |
| `countdownTarget` | The wedding date/time the top countdown counts down to (ISO 8601 with timezone, e.g. `2026-07-11T19:00:00+04:00` for Sharjah) |
| `foot` | Closing blessing |
| `monogram` | The letter shown on the wax seal (default `و` = "and") |

> ⚠️ **Please double‑check the Arabic spelling of your names** in
> `names.ar` — I used my best transliteration of *Ousaima* (`أُسَيْمَة`) and
> *Mouffaq* (`مُوَفَّق`) as placeholders. Correct them to exactly how you
> write them.

### ⏳ The countdown

A small glass countdown sits at the top of the screen **while the envelope is
still closed** (it fades away the moment the envelope opens). It counts down to
`WEDDING.countdownTarget` in `script.js`. Use a full ISO‑8601 timestamp **with a
timezone offset** so it shows the same moment for every guest, wherever they
are — the default `2026-07-11T19:00:00+04:00` is 7:00 PM Sharjah time. When the
moment arrives it switches to a celebratory line.

### 📨 RSVP — email + private attendance list (one‑time setup)

The RSVP form (name · number of guests · companions) emails you on every
submission **and** records each reply in a private Google Sheet that only you
can see. Because this is a static site, that bit runs on a free
**Google Apps Script** web app. Set it up once:

1. Create a new **Google Sheet** in your Google Drive (this becomes your private
   attendance list — it is never shown on the public page).
2. In the sheet: **Extensions → Apps Script**. Delete any sample code and paste:

   ```js
   function doPost(e) {
     var lock = LockService.getScriptLock();
     lock.waitLock(30000);
     try {
       var data = JSON.parse(e.postData.contents);
       var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
       if (sheet.getLastRow() === 0) {
         sheet.appendRow(['التاريخ', 'الاسم', 'عدد الحضور', 'المرافقون']);
       }
       sheet.appendRow([new Date(), data.name, data.guests, data.companions]);
       MailApp.sendEmail({
         to: 'mouffaq.dalloul@gmail.com',
         subject: 'تأكيد حضور جديد: ' + data.name,
         body: 'الاسم: ' + data.name +
               '\nعدد الحضور: ' + data.guests +
               '\nالمرافقون: ' + (data.companions || '-') +
               '\nوقت التأكيد: ' + new Date()
       });
       return ContentService.createTextOutput(JSON.stringify({ ok: true }))
         .setMimeType(ContentService.MimeType.JSON);
     } catch (err) {
       return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
         .setMimeType(ContentService.MimeType.JSON);
     } finally {
       lock.releaseLock();
     }
   }
   ```

3. **Deploy → New deployment → Web app.** Set **Execute as: Me** and
   **Who has access: Anyone**. Authorise it when Google prompts (the email/sheet
   run under *your* account, which is why only you can see the list).
4. Copy the deployment **Web app URL** (it ends in `/exec`) and paste it into
   `WEDDING.rsvp.endpoint` in `script.js`.

That's it — confirmations now land in your inbox and in the sheet. Until the URL
is set, the form stays visible and politely says RSVP isn't active yet.

### Changing the colours

The whole palette lives in CSS custom properties at the top of `styles.css`
(`:root { --night-1, --gold-1, --ivory … }`). Adjust those to reskin the
entire card.

## 📁 Structure

```
index.html   markup, SVG texture filters & reusable ornaments, font links
styles.css   theme tokens, textures, 3D envelope, animations, invitation layout
script.js    WEDDING content config + engine (render, particles, sound, countdown, RSVP, open/close)
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
