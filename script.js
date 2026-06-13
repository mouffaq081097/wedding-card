/* =================================================================
   Ousaima & Mouffaq — Wedding Invitation
   ----------------------------------------------------------------
   HOW TO PERSONALISE:  Edit the WEDDING object just below.
   Everything the guest sees comes from here. Anything marked
   « EDIT » is placeholder text — replace it with your real details.
   ================================================================= */

const WEDDING = {
  /* --- العروسان --- */
  names: {
    ar: { bride: "أُسَيْمَة الفَرَّا", groom: "مُوَفَّق دَلُّول" },
  },
  monogram: "و", // يظهر على ختم الشمع والظرف ("و" = حرف العطف)

  /* --- سطر الافتتاح / العائلتان --- */
  bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  eyebrow: "بِقُلوبٍ مَلَؤُها البَهجَةُ والسُّرورُ، يَتَشَرَّفُ آلُ دَلُّول وآلُ فَرَّا بِدَعوَتِكُم لِحُضورِ حَفلِ زَفافِ نَجلِهِمُ الشّابِّ:",

  /* --- الآية (الروم ٣٠:٢١ — آية الزواج) --- */
  quote: {
    ar: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    ref: "سورة الروم ٣٠:٢١",
  },

  /* --- الموعد --- */
  date: { ar: "السَّبتُ ١١ يوليو ٢٠٢٦م" },
  time: { ar: "تَبدَأُ مَراسِمُ الفَرَحِ في تَمامِ السّاعَةِ السّابِعَةِ مَساءً" },

  /* --- المكان --- */
  venue: {
    name: { ar: "قاعَةُ الأَفراحِ — فُندُقُ أُكسِيدِنتال الشّارِقَة" },
    address: "Occidental Sharjah",
    mapUrl: "https://maps.google.com/?q=Occidental+Sharjah+Hotel",
  },

  /* --- برنامج اليوم --- */ // « عدّل »
  schedule: [
    { t: "٤:٣٠ م", ar: "وصول الضيوف" },
    { t: "٥:٠٠ م", ar: "عقد القران" },
    { t: "٦:٣٠ م", ar: "استقبال وصور" },
    { t: "٨:٠٠ م", ar: "العشاء والاحتفال" },
  ],

  /* --- الزيّ --- */ // « عدّل »
  dress: { ar: "ملابس رسمية" },

  /* --- تأكيد الحضور --- */
  rsvp: {
    noteAr: "يُرجى التَّكَرُّمُ بِتَأكيدِ قَبولِ الدَّعوَةِ عَبرَ إِرسالِ رِسالَةٍ تَأكيدِيَّةٍ إِلِكتُرونِيَّةٍ عَبرَ الرَّقم",
    contact: "…….",
    href: "#",
  },

  /* --- دعاء الختام --- */
  foot: { ar: "بِحُضورِكُم يَكتَمِلُ فَرَحُنا ومَسَرَّتُنا.. دامَت دِيارُكُم عامِرَةً بِالأَفراحِ، مَعَ التَّأكيدِ على أَنَّ جَنَّةَ الأَطفالِ بُيوتُهُم" },
};

/* =================================================================
   Below this line is the engine — you normally don't need to edit it.
   ================================================================= */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- small helpers ---------- */
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  let i = 0;
  const reveal = (html) => `<div class="inv-reveal" style="--i:${i++}">${html}</div>`;

  /* ---------- 1. Render the invitation content ---------- */
  function renderInvitation() {
    const W = WEDDING;
    const dividerSVG = `<span class="inv-divider__orn" aria-hidden="true" style="display:block;width:100%;height:100%;background-color:var(--gold-0);-webkit-mask:url('divider.png') center/contain no-repeat;mask:url('divider.png') center/contain no-repeat;"></span>`;
    const parts = [];

    parts.push(reveal(`<div class="inv-bismillah">${esc(W.bismillah)}</div>`));

    parts.push(reveal(
      `<div class="inv-quote">
         <p class="inv-quote__ar">${esc(W.quote.ar)}</p>
         <span class="inv-quote__ref">— ${esc(W.quote.ref)} —</span>
       </div>`
    ));

    parts.push(`<div class="inv-divider">${dividerSVG}</div>`);

    parts.push(reveal(
      `<div class="inv-eyebrow inv-eyebrow--ar">${esc(W.eyebrow)}</div>`
    ));

    parts.push(reveal(
      `<div class="inv-couples">
         <div class="inv-couple"><span class="inv-couple__name">${esc(W.names.ar.groom)}</span></div>
         <div class="inv-couple"><span class="inv-couple__name">${esc(W.names.ar.bride)}</span></div>
       </div>`
    ));

    parts.push(`<div class="inv-divider">${dividerSVG}</div>`);

    // التاريخ والوقت
    parts.push(reveal(
      `<div class="inv-block">
         <div class="inv-label">اليَوم</div>
         <div class="inv-date inv-date--inline"><span class="ar">${esc(W.date.ar)} <span class="inv-dt-sep">·</span> ${esc(W.time.ar)}</span></div>
       </div>`
    ));

    // المكان
    parts.push(reveal(
      `<div class="inv-block">
         <div class="inv-label">المَكان</div>
         <div class="inv-venue inv-venue--inline"><span class="ar">${esc(W.venue.name.ar)} <span class="inv-dt-sep">·</span> ${esc(W.venue.address)}</span></div>
         <div class="inv-actions">
           <a class="inv-btn inv-btn--ghost" href="${esc(W.venue.mapUrl)}" target="_blank" rel="noopener">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
             عرض الموقع
           </a>
         </div>
       </div>`
    ));

    parts.push(`<div class="inv-divider">${dividerSVG}</div>`);

    // تأكيد الحضور
    parts.push(reveal(
      `<div class="inv-block">
         <div class="inv-label">يُرجى تَأكيدُ الحُضور</div>
         <div class="inv-actions">
           <a class="inv-btn" href="${esc(W.rsvp.href)}" dir="ltr">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 6h16v12H4z"/><path d="M4 7l8 6 8-6"/></svg>
             ${esc(W.rsvp.contact)}
           </a>
         </div>
         <p class="inv-rsvp-note"><span class="ar">${esc(W.rsvp.noteAr)}</span></p>
       </div>`
    ));

    parts.push(reveal(
      `<div class="inv-foot">${esc(W.foot.ar)}</div>`
    ));

    $("#invitationScroll").innerHTML = parts.join("");

    // مزامنة العنوان مع أسماء العروسين
    document.title = `${W.names.ar.bride} و ${W.names.ar.groom} — دعوة زفاف`;
  }

  /* ---------- 2. Particle field (floating gold motes) ---------- */
  const Particles = (() => {
    const canvas = $("#particles");
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, dpr = 1, motes = [], raf = 0, running = false;
    const GOLD = ["255,244,207", "231,205,132", "201,162,77", "247,231,168"];
    const BASE = reduceMotion ? 26 : 70;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = Math.floor(innerWidth * dpr);
      h = canvas.height = Math.floor(innerHeight * dpr);
      canvas.style.width = innerWidth + "px";
      canvas.style.height = innerHeight + "px";
    }

    function mote(burst) {
      const depth = Math.random();              // 0 far … 1 near
      const size = (0.6 + depth * 2.6) * dpr;
      return {
        x: Math.random() * w,
        y: burst ? h * 0.5 : Math.random() * h,
        z: depth,
        r: size,
        vx: (Math.random() - 0.5) * 0.18 * dpr * (burst ? 8 : 1),
        vy: (burst ? -(0.6 + Math.random() * 1.8) : -(0.05 + depth * 0.22)) * dpr,
        a: 0.05 + depth * 0.5,
        tw: Math.random() * Math.PI * 2,        // twinkle phase
        tws: 0.5 + Math.random() * 1.5,
        c: GOLD[(Math.random() * GOLD.length) | 0],
        life: burst ? 1 : Infinity,
        decay: burst ? 0.004 + Math.random() * 0.006 : 0,
      };
    }

    function seed() { motes = Array.from({ length: BASE }, () => mote(false)); }

    function burst(n = 60) {
      if (reduceMotion) return;
      for (let k = 0; k < n; k++) motes.push(mote(true));
    }

    function step() {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (let k = motes.length - 1; k >= 0; k--) {
        const m = motes[k];
        m.x += m.vx; m.y += m.vy; m.tw += 0.02 * m.tws;
        if (m.decay) { m.life -= m.decay; m.vy += 0.004 * dpr; }
        // wrap the ambient field
        if (m.life === Infinity) {
          if (m.y < -10) m.y = h + 10;
          if (m.x < -10) m.x = w + 10; else if (m.x > w + 10) m.x = -10;
        } else if (m.life <= 0) { motes.splice(k, 1); continue; }

        const tw = 0.6 + 0.4 * Math.sin(m.tw);
        const alpha = m.a * tw * (m.life === Infinity ? 1 : m.life);
        const r = m.r;
        const grad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, r * 3.2);
        grad.addColorStop(0, `rgba(${m.c},${alpha})`);
        grad.addColorStop(0.4, `rgba(${m.c},${alpha * 0.35})`);
        grad.addColorStop(1, `rgba(${m.c},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(m.x, m.y, r * 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(step);
    }

    function start() { if (running) return; running = true; resize(); seed(); step(); }
    function stop() { running = false; cancelAnimationFrame(raf); }

    addEventListener("resize", () => { if (running) resize(); }, { passive: true });
    return { start, stop, burst };
  })();

  /* ---------- 4. Sound (synthesised — no audio files) ---------- */
  const Sound = (() => {
    let ctx = null, master = null, enabled = false, twinkleTimer = 0;
    function ensure() {
      if (ctx) return;
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.0;
      master.connect(ctx.destination);
    }
    function note(freq, t0, dur, type = "sine", peak = 0.18) {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(peak, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      o.connect(g); g.connect(master);
      o.start(t0); o.stop(t0 + dur + 0.05);
    }
    function chimeOpen() {
      if (!enabled || !ctx) return;
      const t = ctx.currentTime;
      // shimmering pentatonic arpeggio
      const seq = [523.25, 659.25, 783.99, 1046.5, 1318.5];
      seq.forEach((f, k) => note(f, t + k * 0.085, 1.6, "triangle", 0.12));
      // soft low swell
      note(130.81, t, 2.4, "sine", 0.10);
      note(196.0, t + 0.04, 2.2, "sine", 0.07);
    }
    function twinkle() {
      if (!enabled || !ctx) return;
      const t = ctx.currentTime;
      const f = [1046.5, 1318.5, 1567.98, 2093][(Math.random() * 4) | 0];
      note(f, t, 1.1, "sine", 0.04);
    }
    function setEnabled(on) {
      enabled = on;
      ensure();
      if (!ctx) return;
      if (on) {
        if (ctx.state === "suspended") ctx.resume();
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.linearRampToValueAtTime(0.9, ctx.currentTime + 0.3);
        note(880, ctx.currentTime, 0.5, "sine", 0.06); // soft confirm
        clearInterval(twinkleTimer);
        twinkleTimer = setInterval(() => { if (Math.random() < 0.5) twinkle(); }, 2600);
      } else {
        master.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
        clearInterval(twinkleTimer);
      }
    }
    return { setEnabled, chimeOpen, isEnabled: () => enabled };
  })();

  /* ---------- 5. Open / close choreography ---------- */
  const body = document.body;
  const envelope = $("#envelope");
  const invitation = $("#invitation");
  let state = "closed"; // closed | opening | open
  let timers = [];
  const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };

  function open() {
    if (state !== "closed") return;
    state = "opening";
    body.classList.add("is-opening");
    envelope.setAttribute("aria-expanded", "true");
    Particles.burst(reduceMotion ? 0 : 30);
    Sound.chimeOpen();

    // stage-1 motions (~1.05–1.15s) + a short beat so the fully-risen letter
    // is seen before the scene cross-fades to the full invitation
    const t1 = reduceMotion ? 200 : 1500;
    timers.push(setTimeout(() => {
      body.classList.add("is-open");
      body.classList.add("is-reading");
      invitation.setAttribute("aria-hidden", "false");
      Particles.burst(reduceMotion ? 0 : 70);
      state = "open";
      // move focus into the invitation for accessibility
      timers.push(setTimeout(() => { try { invitation.focus({ preventScroll: true }); } catch (e) {} }, 200));
    }, t1));
  }

  function reseal() {
    if (state !== "open") return;
    clearTimers();
    body.classList.remove("is-open", "is-reading");
    invitation.setAttribute("aria-hidden", "true");
    invitation.scrollTop = 0;
    // reset the staggered reveals so they replay next time
    i_reset();
    timers.push(setTimeout(() => {
      body.classList.remove("is-opening");
      envelope.setAttribute("aria-expanded", "false");
      state = "closed";
      try { envelope.focus({ preventScroll: true }); } catch (e) {}
    }, 650));
  }

  // re-render to reset reveal indices/animations
  function i_reset() { i = 0; renderInvitation(); }

  envelope.addEventListener("click", open);
  $("#replay").addEventListener("click", reseal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && state === "open") reseal();
  });

  /* ---------- 6. Sound toggle ---------- */
  const soundBtn = $("#soundToggle");
  soundBtn.addEventListener("click", () => {
    const on = !(soundBtn.getAttribute("aria-pressed") === "true");
    soundBtn.setAttribute("aria-pressed", String(on));
    Sound.setEnabled(on);
  });

  /* ---------- init ---------- */
  renderInvitation();
  Particles.start();
})();
