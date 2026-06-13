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
  time: { ar: "تَبدَأُ مَراسِمُ الفَرَحِ في تَمامِ السّاعَةِ الثّامِنَةِ مَساءً" },

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

  /* --- ملاحظة الأطفال --- */
  childrenNote: { ar: "الحَفلُ مُخَصَّصٌ لِلبالِغينَ فقط — لا يُسمَحُ بِإِحضارِ الأطفال" },

  /* --- تأكيد الحضور --- */
  rsvp: {
    // رابط Google Apps Script Web App (/exec) — يرسل بريداً ويسجّل في Google Sheet خاصة
    endpoint: "https://script.google.com/macros/s/AKfycbwbzTwuyjWcEKRGiJhn7CYoSUS8IB1I3ECWnLHh1QNpZYQE01sw2gAhuykMM0HzPJWF/exec",
    noteAr: "يُرجى التَّكَرُّمُ بِتَأكيدِ قَبولِ الدَّعوَةِ؛ وفي حالِ الاعتِذارِ يُرجى التَّكَرُّمُ بِالإعلامِ قبلَ ١٠ أيّامٍ مِن مَوعِدِ الحَفل",
  },

  /* --- موعد الزفاف للعدّ التنازلي (توقيت الشارقة UTC+4) --- */
  countdownTarget: "2026-07-11T20:00:00+04:00",

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
         <div class="inv-date inv-date--stack">
           <span class="inv-line inv-line--lead">${esc(W.date.ar)}</span>
           <span class="inv-line inv-line--sub">${esc(W.time.ar)}</span>
         </div>
       </div>`
    ));

    // المكان
    parts.push(reveal(
      `<div class="inv-block">
         <div class="inv-label">المَكان</div>
         <div class="inv-venue inv-venue--stack">
           <span class="inv-line inv-line--lead">${esc(W.venue.name.ar)}</span>
           <span class="inv-line inv-line--sub" dir="ltr">${esc(W.venue.address)}</span>
         </div>
         <div class="inv-actions">
           <a class="inv-btn inv-btn--ghost" href="${esc(W.venue.mapUrl)}" target="_blank" rel="noopener">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
             عرض الموقع
           </a>
         </div>
       </div>`
    ));

    parts.push(`<div class="inv-divider">${dividerSVG}</div>`);

    // تأكيد الحضور — يبدأ بزرّ واحد، ثم تظهر الحقول تدريجياً
    parts.push(reveal(
      `<div class="inv-block">
         <div class="inv-label">تَأكيدُ الحُضور</div>
         <p class="inv-rsvp-note"><span class="ar">${esc(W.rsvp.noteAr)}</span></p>

         <!-- الزرّ الأوّل: يفتح النموذج -->
         <div class="inv-actions" id="rsvpTriggerWrap">
           <button class="inv-btn rsvp-btn" type="button" id="rsvpTrigger">أكِّد حُضورَك</button>
         </div>

         <!-- النموذج يظهر بعد الضغط على الزرّ -->
         <form class="rsvp-form" id="rsvpForm" novalidate hidden>
           <div class="rsvp-field">
             <label class="rsvp-label" for="rsvpName">الاسمُ الكَريم</label>
             <input class="rsvp-input" id="rsvpName" name="name" type="text" required
                    autocomplete="name" placeholder="اكتُب اسمَك هنا" />
           </div>
           <div class="rsvp-field">
             <label class="rsvp-label" for="rsvpGuests">عَدَدُ الحُضور (متضمّناً مرافِقيك)</label>
             <input class="rsvp-input" id="rsvpGuests" name="guests" type="number"
                    min="1" max="20" step="1" inputmode="numeric" value="1" />
           </div>
           <div class="rsvp-field rsvp-field--companions" id="rsvpCompanionsField" hidden>
             <label class="rsvp-label" for="rsvpCompanions">أسماءُ المُرافِقين</label>
             <textarea class="rsvp-input rsvp-textarea" id="rsvpCompanions" name="companions"
                       rows="2" placeholder="أسماءُ مَن سيَحضُرون معك"></textarea>
           </div>
           <div class="inv-actions">
             <button class="inv-btn rsvp-btn" type="submit" id="rsvpSubmit">إرسالُ التَّأكيد</button>
           </div>
           <p class="rsvp-status" id="rsvpStatus" role="status" aria-live="polite"></p>
         </form>
       </div>`
    ));

    if (W.childrenNote) {
      parts.push(reveal(
        `<p class="inv-notice">${esc(W.childrenNote.ar)}</p>`
      ));
    }

    parts.push(reveal(
      `<div class="inv-foot">${esc(W.foot.ar)}</div>`
    ));

    $("#invitationScroll").innerHTML = parts.join("");

    // ربط معالج إرسال النموذج (يُعاد البناء عند إعادة الختم، فنعيد الربط في كل مرّة)
    wireRsvpForm();

    // مزامنة العنوان مع أسماء العروسين
    document.title = `${W.names.ar.bride} و ${W.names.ar.groom} — دعوة زفاف`;
  }

  /* ---------- RSVP form submission (email + private Google Sheet) ---------- */
  function wireRsvpForm() {
    const form = $("#rsvpForm");
    if (!form) return;
    const trigger = $("#rsvpTrigger");
    const triggerWrap = $("#rsvpTriggerWrap");
    const statusEl = $("#rsvpStatus");
    const nameEl = $("#rsvpName");
    const guestsEl = $("#rsvpGuests");
    const companionsField = $("#rsvpCompanionsField");
    const companionsEl = $("#rsvpCompanions");
    const submitBtn = $("#rsvpSubmit");

    const setStatus = (msg, kind) => {
      statusEl.textContent = msg;
      statusEl.className = "rsvp-status is-shown" + (kind ? " is-" + kind : "");
    };

    // 1) الزرّ الأوّل يكشف النموذج (الاسم + عدد الحضور)
    trigger.addEventListener("click", () => {
      triggerWrap.hidden = true;
      form.hidden = false;
      try { nameEl.focus({ preventScroll: true }); } catch (e) {}
    });

    // 2) حقل أسماء المرافقين يظهر فقط عند إدخال أكثر من حاضر واحد
    const syncCompanions = () => {
      const n = parseInt(guestsEl.value, 10);
      companionsField.hidden = !(n > 1);
    };
    guestsEl.addEventListener("input", syncCompanions);
    guestsEl.addEventListener("change", syncCompanions);

    // 3) الإرسال
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = (nameEl.value || "").trim();
      if (!name) {
        nameEl.classList.add("is-invalid");
        nameEl.focus();
        setStatus("الرجاء إدخال الاسم الكريم", "err");
        return;
      }
      nameEl.classList.remove("is-invalid");

      const endpoint = WEDDING.rsvp.endpoint;
      if (!endpoint || endpoint.indexOf("PASTE_YOUR") === 0) {
        setStatus("لم يُفعّل تأكيد الحضور بعد — يُرجى المحاولة لاحقاً", "err");
        return;
      }

      const guests = parseInt(guestsEl.value, 10) || 1;
      const payload = {
        name,
        guests: String(guests),
        // المرافقون يُرسَلون فقط عند وجود أكثر من حاضر واحد
        companions: guests > 1 ? (companionsEl.value || "").trim() : "",
      };

      submitBtn.disabled = true;
      setStatus("…جارٍ الإرسال", "pending");

      try {
        await fetch(endpoint, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
        });
        // مع no-cors تكون الاستجابة معتمة؛ نجاح متفائل (السطر والبريد يُكتبان في الخادم)
        setStatus("تمّ تأكيد حضوركم، شكراً لكم 🤍", "ok");
        form.reset();
        companionsField.hidden = true;
        Particles.burst(reduceMotion ? 0 : 36);
      } catch (err) {
        setStatus("تعذّر الإرسال، تأكّد من اتصالك وحاول مجدداً", "err");
      } finally {
        submitBtn.disabled = false;
      }
    });

    // إزالة حالة الخطأ بمجرّد أن يبدأ الضيف بالكتابة
    nameEl.addEventListener("input", () => nameEl.classList.remove("is-invalid"));
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

  /* ---------- 4. Sound (synth chime + looping background music) ---------- */
  const Sound = (() => {
    let ctx = null, master = null, enabled = false, twinkleTimer = 0;
    const music = $("#bgMusic");
    if (music) music.volume = 0.4; // soft, sits behind the experience
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
      // background music — handled even if Web Audio isn't available
      if (music) {
        if (on) { const p = music.play(); if (p && p.catch) p.catch(() => {}); }
        else { music.pause(); }
      }
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
    // retry playback after a user gesture (when autoplay-on-load was blocked)
    function resume() {
      if (enabled && music && music.paused) {
        const p = music.play(); if (p && p.catch) p.catch(() => {});
      }
      if (ctx && ctx.state === "suspended") ctx.resume();
    }
    return { setEnabled, chimeOpen, resume, isEnabled: () => enabled };
  })();

  /* ---------- 4b. Countdown to the wedding (Sharjah time) ---------- */
  const Countdown = (() => {
    const root = $("#countdown");
    if (!root) return { start() {} };
    const elDays = $("#cdDays"), elHours = $("#cdHours"),
          elMins = $("#cdMins"), elSecs = $("#cdSecs");
    const titleEl = root.querySelector(".countdown__title");
    const target = new Date(WEDDING.countdownTarget).getTime();
    let timer = 0;

    // Western digits → Arabic-Indic, with optional zero-padding
    const toAr = (n, pad) => {
      let s = String(Math.max(0, n));
      if (pad) s = s.padStart(pad, "0");
      return s.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
    };

    function tick() {
      const diff = target - Date.now();
      if (diff <= 0) {
        root.classList.add("is-day");
        if (titleEl) titleEl.textContent = "نحتفلُ اليوم 🤍";
        clearInterval(timer);
        return;
      }
      const s = Math.floor(diff / 1000);
      const days = Math.floor(s / 86400);
      const hours = Math.floor((s % 86400) / 3600);
      const mins = Math.floor((s % 3600) / 60);
      const secs = s % 60;
      if (elDays) elDays.textContent = toAr(days);
      if (elHours) elHours.textContent = toAr(hours, 2);
      if (elMins) elMins.textContent = toAr(mins, 2);
      if (elSecs) elSecs.textContent = toAr(secs, 2);
    }

    function start() {
      if (isNaN(target)) { root.style.display = "none"; return; }
      tick();
      timer = setInterval(tick, 1000);
    }
    return { start };
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
  $("#hint").addEventListener("click", open); // the cue itself opens too
  $("#replay").addEventListener("click", reseal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && state === "open") reseal();
  });

  // Swipe DOWN on the open invitation to reseal (iOS bottom-sheet dismiss pattern)
  let _swipeY0 = 0;
  invitation.addEventListener("touchstart", (e) => {
    _swipeY0 = e.touches[0].clientY;
  }, { passive: true });
  invitation.addEventListener("touchend", (e) => {
    if (state !== "open") return;
    const dy = e.changedTouches[0].clientY - _swipeY0;
    if (dy > 90 && invitation.scrollTop === 0) reseal();
  }, { passive: true });

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
  Countdown.start();

  // Start the background music on load. Browsers block autoplay-with-sound until
  // the user interacts, so we attempt it now and, if blocked, resume on the very
  // first gesture (tap / touch / key). The speaker button can mute it anytime.
  soundBtn.setAttribute("aria-pressed", "true");
  Sound.setEnabled(true);
  const kickMusic = () => { Sound.resume(); };
  ["pointerdown", "touchstart", "keydown"].forEach((ev) =>
    addEventListener(ev, kickMusic, { once: true, passive: true }));
})();
