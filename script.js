/* ==========================================================================
   Applications of Biot–Savart's Law — Grade XII Physics slide deck
   Vanilla JS. One requestAnimationFrame loop; only the ACTIVE slide animates.
   Edit text in CONTENT, physics/defaults in NUM, colours in COL.
   ========================================================================== */
'use strict';

/* --------------------------------------------------------------------------
   1 · EDITABLE SLIDE TEXT  (every string shown on screen lives here)
   -------------------------------------------------------------------------- */
const CONTENT = {
  'nav.prev': 'Previous', 'nav.next': 'Next', 'btn.reset': 'Reset',
  'chain.current': 'Current', 'chain.field': 'Field', 'chain.force': 'Force',

  's1.school': 'National School of Sciences',
  's1.t1': 'Applications of', 's1.t2': "Biot–Savart's Law",
  's1.sub': 'Application of Electromagnetism',
  's1.presenter': 'Presented by Divya D. Sharma', 's1.grade': 'Grade XII Physics',

  's2.title': "Ørsted's Experiment, 1820",
  's2.i1': 'Hans Christian Ørsted — Danish physicist.',
  's2.i2': '1820: during a lecture demonstration,',
  's2.i3': 'a compass needle moved when current flowed in a nearby wire.',
  's2.reverse': '⇄ Reverse current',
  's2.stTag': 'THE DISCOVERY',
  's2.statement': 'A current-carrying conductor produces a magnetic field around it.',
  's2.capOff': 'No current: needle points North',
  's2.capOn': 'Current ON: needle deflects!',
  's2.capRev': 'Current reversed: deflects the other way',

  's3.title': 'The Biot–Savart Law',
  's3.p1': 'Jean-Baptiste Biot', 's3.p2': 'Félix Savart',
  's3.role': 'French physicist', 's3.year': '1820',
  's3.law': 'The magnetic field dB due to a small current element I dl at distance r is directly proportional to I, dl and sin θ, and inversely proportional to r².',
  's3.formula': 'dB = (μ₀ / 4π) · I dl sin θ / r²',
  's3.mu0': 'μ₀ = 4π × 10⁻⁷ T·m/A',
  's3.stripTitle': 'How it was found', 's3.play': '▶ Play',
  's3.st1': "After Ørsted's news, Biot and Savart studied a long straight current-carrying wire.",
  's3.st2': 'They measured a small magnetic needle oscillating at different distances from the wire.',
  's3.st3': 'The effect weakens with distance — leading to the law for each small piece of current.',
  's3.laplace': 'Pierre-Simon Laplace later helped express it in its differential form.',

  's4.title': 'Biot–Savart at Work: Field Around a Wire',
  's4.drag': '✋ drag to rotate',
  's4.b1': '1 · Pick an element', 's4.b2': '2 · Its tiny field dB', 's4.b3': '3 · Add them all',
  's4.rh': 'Right-hand thumb rule: thumb → current, curled fingers → field.',
  's4.calc': 'Live calculator', 's4.slI': 'Current I', 's4.slR': 'Distance r',
  's4.take1': 'B ∝ I — double the current, double the field',
  's4.take2': 'B ∝ 1/r — double the distance, half the field',
  's4.auto': 'Auto-rotate the 3D view',

  's5.badge': 'FUN FACT', 's5.title': 'Earth is a giant magnet',
  's5.f1': "Earth's magnetic field at the surface is only about 5 × 10⁻⁵ T = 50 μT (it varies roughly 25–65 μT).",
  's5.f2': 'Yet it deflects the solar wind and helps protect life on Earth.',
  's5.barsTitle': 'Field strength comparison',
  's5.earthLabel': 'Earth ≈ 50 μT', 's5.wireLabel': 'Our 10 A wire at 2 cm = 100 μT',
  's5.barsNote': 'not to scale of anything else',
  's5.caption': "One ordinary wire gives about twice Earth's field!",

  's6.title': 'Same Law, Three Shapes',
  's6.tabW': 'Straight wire', 's6.tabC': 'Circular coil', 's6.tabS': 'Solenoid',
  's6.fW': 'B = μ₀I / 2πr', 's6.exW': 'Example: I = 10 A, r = 2 cm → B = 100 μT',
  's6.fC': 'B = μ₀NI / 2R', 's6.exC': 'Example: N = 100, I = 2 A, R = 5 cm → B ≈ 2.5 mT',
  's6.fS': 'B ≈ μ₀nI  (n = N/L turns per metre)', 's6.exS': 'Example: n = 1000 /m, I = 2 A → B ≈ 2.5 mT',
  's6.slI': 'Current I', 's6.slR': 'Distance r', 's6.slN': 'Turns N', 's6.slNsm': 'Turns density n',
  's6.rNote': 'R is fixed at 5 cm for this coil.', 's6.sNote': 'ideal long air-core solenoid',
  's6.takeaway': 'More current + more turns = stronger field.',

  's7.title': 'Why a Soft Iron Core?',
  's7.leg1': 'random domain', 's7.leg2': 'aligned domain',
  's7.mAir': 'Air core', 's7.mIron': 'Soft iron', 's7.mSteel': 'Hard steel',
  's7.meterTitle': 'Field strength meter',
  's7.take1': "Ferromagnetic materials: their domains align with the coil's field and add their own.",
  's7.take2': 'Soft iron magnetises easily AND demagnetises easily: perfect for a crane that must release its load.',

  's8.title': 'How Electricity Lifts Tons of Metal',
  's8.st1': 'Current flows in the coil', 's8.st2': 'Coil produces a magnetic field',
  's8.st3': 'Iron core + steel load: attraction', 's8.st4': 'Lift',
  's8.release': 'Switch off → release',
  's8.formula': 'B ∝ NI',
  's8.note': 'Ideal air-core: B ≈ μ₀nI. A real lifting magnet uses an iron core, so its true field and lifting force depend on the core material and shape.',

  's9.title': 'How Electricity Becomes Music',
  's9.freq': 'Frequency', 's9.freqNote': 'slowed down so you can see it',
  's9.amp': 'Amplitude', 's9.ampNote': 'louder = bigger movement',
  's9.force': 'F = BIL (θ = 90°)', 's9.nums': 'B = 1 T, L = 5 m, I = 0.5 A → F = 2.5 N',
  's9.revNote': 'Reverse the current and the force reverses.',
  's9.chain': 'Electrical energy → mechanical vibration → sound waves',
  's9.tone': '🔊 Play tone', 's9.toneStop': '⏹ Stop tone',

  's10.title': 'One Principle. Countless Applications.',
  's10.a1n': 'Relay', 's10.a1c': 'A small current switches a large circuit',
  's10.a2n': 'Magnetic separator', 's10.a2c': 'Pulls iron out of recycling streams',
  's10.a3n': 'Electromagnetic lock', 's10.a3c': 'Held shut by current, freed without it',
  's10.a4n': 'Electric bell', 's10.a4c': 'Coil strikes, circuit breaks, repeat',
  's10.run': 'Tap to run',
  's10.banner0': 'Same physics each time:', 's10.bannerField': 'magnetic field', 's10.bannerForce': 'useful force',

  's11.title': 'One Chain. Everywhere.', 's11.magField': 'Magnetic Field',
  's11.crane': 'crane', 's11.speaker': 'speaker',
  's11.tk1': 'Electric current produces magnetic fields.',
  's11.tk2': 'Magnetic interactions give attraction and motion.',
  's11.tk3': 'The same principles power industry and daily life.',
  's11.quote': 'Some of the most extraordinary technologies around us are simply applications of the fundamental principles we learn in Physics.',
  's11.f1': 'B = μ₀I / 2πr', 's11.f2': 'dB = (μ₀/4π) · I dl sin θ / r²', 's11.f3': 'F = BIL',
  's11.questions': 'Questions?'
};

/* --------------------------------------------------------------------------
   2 · NUMERIC CONSTANTS & DEFAULTS
   -------------------------------------------------------------------------- */
const NUM = {
  MU0: 4 * Math.PI * 1e-7,          // T·m/A
  S4: { I: 10, r: 2 },              // default current (A), distance (cm)
  S6: { Iw: 10, rw: 2, Nc: 100, Ic: 2, Rc: 0.05, ns: 1000, Is: 2 },
  S9: { f: 0.6, A: 35, toneHz: 440, toneGain: 0.05 },
  EARTH_uT: 50, WIRE_uT: 100,
  NEEDLE_DEG: 45,
  MAX_DPR: 2
};

/* --------------------------------------------------------------------------
   3 · PALETTE (mirrors the CSS variables)
   -------------------------------------------------------------------------- */
const COL = {
  navy: '#0B1F3A', sec: '#38475F', blue: '#1565FF', orange: '#FF6A13',
  green: '#0F9D58', amber: '#FFC400', north: '#E5383B', south: '#1B3A6B',
  iron: '#5B6B7F', copper: '#C8742B', alu: '#B9C6D4', border: '#CFDAEA',
  greyPill: '#E7EDF6', amberInk: '#B8860B'
};

/* --------------------------------------------------------------------------
   4 · SMALL UTILITIES
   -------------------------------------------------------------------------- */
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const ease = x => x * x * (3 - 2 * x);
const TAU = Math.PI * 2;

function fmt(v) { return v >= 100 ? String(Math.round(v)) : String(Math.round(v * 10) / 10); }
const SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };
function sci(v) {
  const e = Math.floor(Math.log10(v));
  let m = Math.round((v / Math.pow(10, e)) * 10) / 10;
  if (m >= 10) m /= 10;
  const es = (e < 0 ? '-' : '') + Math.abs(e);
  return m.toFixed(1) + ' × 10' + es.split('').map(ch => SUP[ch]).join('');
}

/* Canvas drawing helpers (all coordinates are stage pixels) */
function ln(c, x1, y1, x2, y2, col, w) { c.strokeStyle = col; c.lineWidth = w; c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); }
function circ(c, x, y, r, fill, stroke, w) {
  c.beginPath(); c.arc(x, y, r, 0, TAU);
  if (fill) { c.fillStyle = fill; c.fill(); }
  if (stroke) { c.strokeStyle = stroke; c.lineWidth = w || 2; c.stroke(); }
}
function tri(c, x, y, dx, dy, s, col) {
  const a = Math.atan2(dy, dx);
  c.fillStyle = col; c.beginPath();
  c.moveTo(x + Math.cos(a) * s, y + Math.sin(a) * s);
  c.lineTo(x + Math.cos(a + 2.5) * s, y + Math.sin(a + 2.5) * s);
  c.lineTo(x + Math.cos(a - 2.5) * s, y + Math.sin(a - 2.5) * s);
  c.closePath(); c.fill();
}
function arrow(c, x1, y1, x2, y2, col, w, h) { ln(c, x1, y1, x2, y2, col, w || 4); tri(c, x2, y2, x2 - x1, y2 - y1, h || 12, col); }
function txt(c, s, x, y, size, col, align, bold) {
  c.fillStyle = col; c.font = (bold === false ? '400 ' : '700 ') + size + 'px "Segoe UI",system-ui,sans-serif';
  c.textAlign = align || 'left'; c.textBaseline = 'middle'; c.fillText(s, x, y);
}
function rr(c, x, y, w, h, r) {
  c.beginPath(); c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
}

/* --------------------------------------------------------------------------
   5 · STAGE SCALING + CANVAS REGISTRY  (devicePixelRatio capped at 2)
   -------------------------------------------------------------------------- */
let SCALE = 1;
const CANVASES = [];
function CV(id, w, h) {
  const el = document.getElementById(id);
  el.style.width = w + 'px'; el.style.height = h + 'px';
  const o = { el, ctx: el.getContext('2d'), w, h };
  CANVASES.push(o); return o;
}
function sizeCanvases() {
  const r = Math.min(NUM.MAX_DPR, Math.max(1, SCALE * (window.devicePixelRatio || 1)));
  for (const o of CANVASES) {
    o.el.width = Math.round(o.w * r); o.el.height = Math.round(o.h * r);
    o.ctx.setTransform(r, 0, 0, r, 0, 0);
  }
}
function fitStage() {
  SCALE = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
  $('#stage').style.transform = 'translate(-50%,-50%) scale(' + SCALE + ')';
  sizeCanvases();
}

/* --------------------------------------------------------------------------
   6 · TEXT FILL, CHAIN TRACKERS, TOGGLES
   -------------------------------------------------------------------------- */
function fillText() { for (const el of $$('[data-fill]')) { const v = CONTENT[el.dataset.fill]; if (v !== undefined) el.textContent = v; } }

const CHAIN_ICONS = {
  current: '<svg viewBox="0 0 24 24"><path d="M13 2 L5 14 h6 l-2 8 L19 9 h-6 Z" fill="currentColor"/></svg>',
  field: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="12" cy="12" r="3.5" fill="currentColor"/></svg>',
  force: '<svg viewBox="0 0 24 24"><path d="M3 12 h14 M13 6 l6 6 -6 6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};
function buildChains() {
  const cls = { current: 'on-blue', field: 'on-orange', force: 'on-green' };
  for (const ch of $$('.chain')) {
    const on = (ch.closest('.slide').dataset.chain || '').split(',');
    ch.innerHTML = ['current', 'field', 'force'].map((k, i) =>
      (i ? '<span class="chain-arrow">→</span>' : '') +
      '<span class="chain-pill ' + (on.includes(k) ? cls[k] : '') + '">' + CHAIN_ICONS[k] + CONTENT['chain.' + k] + '</span>'
    ).join('');
  }
}
function bindToggle(btn, cb, initial) {
  const set = v => { btn.classList.toggle('on', v); btn.setAttribute('aria-checked', String(v)); btn.querySelector('.tg-txt').textContent = v ? 'ON' : 'OFF'; };
  btn._set = set; set(!!initial);
  btn.addEventListener('click', () => { const v = !btn.classList.contains('on'); set(v); if (cb) cb(v); });
}
function setToggle(btn, v) { if (btn._set) btn._set(v); }

/* --------------------------------------------------------------------------
   7 · SLIDE 1 — COVER  (calm wire + rotating field rings)
   -------------------------------------------------------------------------- */
const S1 = {
  sel: '#s1', cv: null, off: 0,
  init() { this.cv = CV('cv1', 1920, 960); },
  start() { this.off = 0; },
  update(dt, t) {
    const c = this.cv.ctx, w = this.cv.w; c.clearRect(0, 0, w, 960);
    const wy = 800;
    ln(c, 0, wy, w, wy, COL.copper, 8);
    this.off = (this.off + dt * 140) % 160;
    for (let x = this.off - 160; x < w + 160; x += 160) circ(c, x, wy, 9, COL.blue);
    const cx = 1560;
    for (let i = 0; i < 4; i++) {
      const R = 64 + i * 42;
      c.strokeStyle = 'rgba(255,106,19,' + (0.55 - i * 0.09) + ')'; c.lineWidth = 4;
      c.setLineDash([16, 12]); c.lineDashOffset = -t * 30 * (i % 2 ? 1 : -1);
      c.beginPath(); c.ellipse(cx, wy, R, R * 0.32, 0, 0, TAU); c.stroke(); c.setLineDash([]);
      for (const a0 of [0, Math.PI]) {
        const a = a0 + t * 0.4;
        tri(c, cx + R * Math.cos(a), wy + R * 0.32 * Math.sin(a), -Math.sin(a), 0.32 * Math.cos(a), 9, COL.orange);
      }
    }
    txt(c, 'current →', 120, wy - 34, 26, COL.blue);
    txt(c, 'field rings', cx, wy - 214, 26, COL.orange, 'center');
  }
};

/* --------------------------------------------------------------------------
   8 · SLIDE 2 — ØRSTED  (spring-loaded compass needle)
   -------------------------------------------------------------------------- */
const S2 = {
  sel: '#s2', cv: null, on: false, dir: 1, a: 0, v: 0, dotOff: 0,
  init() {
    this.cv = CV('cv2', 1036, 720);
    this.tg = $('#tg2'); this.capEl = $('#cap2');
    bindToggle(this.tg, on => { this.on = on; this.cap(); });
    $('#rev2').addEventListener('click', () => { this.dir *= -1; this.cap(); });
    $('#reset2').addEventListener('click', () => this.reset());
  },
  reset() { this.on = false; this.dir = 1; this.a = 0; this.v = 0; setToggle(this.tg, false); this.cap(); },
  start() { this.reset(); },
  cap() {
    const e = this.capEl; e.classList.remove('live', 'rev');
    if (!this.on) e.textContent = CONTENT['s2.capOff'];
    else if (this.dir > 0) { e.textContent = CONTENT['s2.capOn']; e.classList.add('live'); }
    else { e.textContent = CONTENT['s2.capRev']; e.classList.add('rev'); }
  },
  update(dt) {
    const tgt = this.on ? this.dir * NUM.NEEDLE_DEG * Math.PI / 180 : 0;
    this.v += (30 * (tgt - this.a) - 7 * this.v) * dt;   // damped spring → soft overshoot
    this.a += this.v * dt;
    if (this.on) this.dotOff = (this.dotOff + this.dir * 130 * dt + 900) % 900;
    this.draw();
  },
  draw() {
    const c = this.cv.ctx; c.clearRect(0, 0, 1036, 720);
    const cx = 518, cy = 330, R = 185;
    txt(c, 'Top-down view', 24, 28, 26, COL.sec);
    circ(c, cx, cy, R, '#FFFFFF', COL.border, 3);
    circ(c, cx, cy, R - 26, null, '#E3EAF4', 2);
    for (let i = 0; i < 8; i++) {
      const a = i * Math.PI / 4;
      ln(c, cx + Math.sin(a) * (R - 26), cy - Math.cos(a) * (R - 26), cx + Math.sin(a) * (R - 12), cy - Math.cos(a) * (R - 12), COL.sec, 3);
    }
    txt(c, 'N', cx, cy - R - 22, 30, COL.north, 'center');
    txt(c, 'S', cx, cy + R + 24, 28, COL.sec, 'center');
    txt(c, 'E', cx + R + 24, cy, 28, COL.sec, 'center');
    txt(c, 'W', cx - R - 24, cy, 28, COL.sec, 'center');
    if (this.on) {
      const start = -Math.PI / 2, end = start + this.a;
      c.strokeStyle = COL.green; c.lineWidth = 3; c.setLineDash([8, 7]);
      c.beginPath(); c.arc(cx, cy, R + 16, start, end, this.a < 0); c.stroke(); c.setLineDash([]);
      const mid = start + this.a / 2;
      txt(c, '≈ 45°', cx + Math.cos(mid) * (R + 46), cy + Math.sin(mid) * (R + 46), 26, COL.green, 'center');
    }
    /* needle */
    c.save(); c.translate(cx, cy); c.rotate(this.a);
    c.fillStyle = COL.north; c.beginPath(); c.moveTo(0, -150); c.lineTo(13, 0); c.lineTo(-13, 0); c.closePath(); c.fill();
    c.fillStyle = COL.south; c.beginPath(); c.moveTo(0, 150); c.lineTo(13, 0); c.lineTo(-13, 0); c.closePath(); c.fill();
    txt(c, 'N', 0, -118, 26, '#FFFFFF', 'center');
    c.restore();
    circ(c, cx, cy, 10, COL.amber, COL.navy, 3);
    /* wire runs N–S above the needle */
    ln(c, cx, 120, cx, 606, COL.copper, 10);
    ln(c, cx, 40, cx, 60, COL.copper, 10);
    ln(c, cx, 668, cx, 700, COL.copper, 10);
    circ(c, cx, 60, 7, COL.navy); circ(c, cx, 120, 7, COL.navy);
    ln(c, cx, 120, cx + (this.on ? 0 : 46), 64, COL.navy, 8);
    txt(c, 'Switch', cx + 70, 86, 26, COL.sec);
    txt(c, 'wire (N–S)', cx + 70, 200, 26, COL.copper);
    ln(c, cx, 606, cx, 630, COL.copper, 10); ln(c, cx, 650, cx, 668, COL.copper, 10);
    ln(c, cx - 34, 630, cx + 34, 630, COL.navy, 7);
    ln(c, cx - 18, 650, cx + 18, 650, COL.navy, 7);
    txt(c, '+', cx + 48, 628, 28, COL.navy); txt(c, '−', cx + 48, 654, 28, COL.navy);
    txt(c, 'Battery', cx + 70, 640, 26, COL.sec);
    if (this.on) {
      for (let i = 0; i < 6; i++) circ(c, cx, 130 + ((i * 80 + this.dotOff) % 470), 8, COL.blue);
      txt(c, this.dir > 0 ? 'current ↓' : 'current ↑', cx - R - 60, 560, 26, COL.blue, 'right');
    }
  }
};

/* --------------------------------------------------------------------------
   9 · SLIDE 3 — WHO & WHEN  (sequential story strip)
   -------------------------------------------------------------------------- */
const S3 = {
  sel: '#s3', t: 0, steps: [],
  init() {
    this.steps = [$('#step3-1'), $('#step3-2'), $('#step3-3')];
    $('#play3').addEventListener('click', () => this.play());
    $('#reset3').addEventListener('click', () => this.play());
  },
  play() { this.t = 0; this.steps.forEach(s => s.classList.remove('lit')); },
  start() { this.play(); },
  update(dt) {
    this.t += dt;
    const th = [0.5, 1.7, 2.9];
    this.steps.forEach((s, i) => { if (this.t > th[i]) s.classList.add('lit'); });
  }
};

/* --------------------------------------------------------------------------
   10 · SLIDE 4 — BIOT–SAVART IN 3D  (Canvas 2D + own projection)
   -------------------------------------------------------------------------- */
const S4 = {
  sel: '#s4', cv: null, yaw: 0.6, pitch: 0.35, auto: true, step: 0, anim: 0,
  I: NUM.S4.I, r: NUM.S4.r, drag: null,
  init() {
    this.cv = CV('cv4', 1076, 592);
    const el = this.cv.el;
    el.addEventListener('pointerdown', e => { this.drag = { x: e.clientX, y: e.clientY }; el.setPointerCapture(e.pointerId); e.preventDefault(); });
    el.addEventListener('pointermove', e => {
      if (!this.drag) return;
      this.yaw += (e.clientX - this.drag.x) / SCALE * 0.008;
      this.pitch = clamp(this.pitch + (e.clientY - this.drag.y) / SCALE * 0.006, -0.15, 1.1);
      this.drag = { x: e.clientX, y: e.clientY };
    });
    const up = () => { this.drag = null; };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    this.tg = $('#tgAuto4');
    bindToggle(this.tg, on => { this.auto = on; }, true);
    [1, 2, 3].forEach(i => $('#step4-' + i).addEventListener('click', () => this.setStep(i)));
    $('#slI4').addEventListener('input', e => { this.I = +e.target.value; this.calc(); });
    $('#slR4').addEventListener('input', e => { this.r = +e.target.value; this.calc(); });
    $('#reset4').addEventListener('click', () => this.reset());
  },
  setStep(i) {
    this.step = i; if (i === 3) this.anim = 0;
    [1, 2, 3].forEach(k => $('#step4-' + k).classList.toggle('active', k === i));
    $('#rh4').classList.toggle('show', i === 3);
  },
  reset() {
    this.yaw = 0.6; this.pitch = 0.35; this.auto = true; setToggle(this.tg, true);
    this.I = NUM.S4.I; this.r = NUM.S4.r;
    $('#slI4').value = this.I; $('#slR4').value = this.r;
    this.setStep(0); this.calc();
  },
  start() { this.reset(); },
  stop() { this.drag = null; },
  calc() {
    const B = 2e-7 * this.I / (this.r / 100);   // B = μ₀I / 2πr
    $('#valI4').textContent = 'I = ' + this.I + ' A';
    $('#valR4').textContent = 'r = ' + this.r + ' cm';
    $('#chip4').textContent = 'B = ' + fmt(B * 1e6) + ' μT (' + sci(B) + ' T)';
    $('#sub4').textContent = 'B = (4π×10⁻⁷ × ' + this.I + ') / (2π × ' + (this.r / 100).toFixed(2) + ')';
  },
  proj(p) {
    const cy = Math.cos(this.yaw), sy = Math.sin(this.yaw), cp = Math.cos(this.pitch), sp = Math.sin(this.pitch);
    const x = p[0] * cy + p[2] * sy, z1 = -p[0] * sy + p[2] * cy;
    const y = p[1] * cp - z1 * sp, z = p[1] * sp + z1 * cp;
    const s = 900 / (900 + z);
    return { x: 538 + x * s, y: 306 - y * s, z, s };
  },
  update(dt, t) {
    if (this.auto && !this.drag) this.yaw += dt * 0.3;
    if (this.step === 3) this.anim += dt;
    this.draw(t);
  },
  draw(t) {
    const c = this.cv.ctx; c.clearRect(0, 0, 1076, 592);
    const rw = 40 + this.r * 20, P = [rw, 60, 0];
    const items = [];
    const push = (z, fn) => items.push({ z, fn });
    /* wire */
    for (let y = -270; y < 270; y += 45) {
      const a = this.proj([0, y, 0]), b = this.proj([0, y + 45, 0]);
      push((a.z + b.z) / 2, () => ln(c, a.x, a.y, b.x, b.y, COL.copper, 8));
    }
    /* current elements I dl */
    const elems = []; for (let y = -250; y <= 250; y += 50) elems.push(y);
    for (const y of elems) {
      const a = this.proj([0, y - 16, 0]), b = this.proj([0, y + 16, 0]);
      push((a.z + b.z) / 2, () => arrow(c, a.x, a.y, b.x, b.y, COL.blue, 5, 11));
    }
    /* circular field lines (step 3) */
    const grow = this.step === 3 ? clamp(this.anim - 1.1, 0, 1) : 0;
    if (grow > 0) {
      const rings = [[60, rw], [60, rw * 0.62], [60, rw * 1.38], [-120, rw], [180, rw]];
      for (const [ry, R0] of rings) {
        const R = R0 * ease(grow), N = 40;
        for (let i = 0; i < N; i++) {
          const a1 = i / N * TAU, a2 = (i + 1) / N * TAU;
          const p1 = this.proj([R * Math.cos(a1), ry, R * Math.sin(a1)]);
          const p2 = this.proj([R * Math.cos(a2), ry, R * Math.sin(a2)]);
          push((p1.z + p2.z) / 2, () => ln(c, p1.x, p1.y, p2.x, p2.y, 'rgba(255,106,19,.85)', 3.5));
        }
        for (let k = 0; k < 3; k++) {
          const a = t * 0.5 + k * 2.094;
          const p = this.proj([R * Math.cos(a), ry, R * Math.sin(a)]);
          const q = this.proj([R * Math.cos(a) + Math.sin(a) * 12, ry, R * Math.sin(a) - Math.cos(a) * 12]);
          push(p.z - 0.1, () => tri(c, p.x, p.y, q.x - p.x, q.y - p.y, 8, COL.orange));
        }
      }
    }
    const pp = this.proj(P);
    push(pp.z, () => circ(c, pp.x, pp.y, 9, COL.navy));
    items.sort((a, b) => b.z - a.z);           // painter's algorithm
    for (const it of items) it.fn();
    /* overlays / labels */
    const top = this.proj([0, 292, 0]);
    txt(c, 'I', top.x + 16, top.y, 28, COL.blue);
    txt(c, 'P', pp.x + 16, pp.y - 14, 28, COL.navy);
    if (this.step >= 1) {
      const pe = this.proj([0, 50, 0]);
      circ(c, pe.x, pe.y, 20, null, COL.amber, 4);
      c.setLineDash([9, 7]); ln(c, pe.x, pe.y, pp.x, pp.y, COL.navy, 3.5); c.setLineDash([]);
      txt(c, 'r', (pe.x + pp.x) / 2, (pe.y + pp.y) / 2 - 16, 28, COL.navy, 'center');
      txt(c, 'I dl', pe.x - 26, pe.y, 26, COL.blue, 'right');
      const rl = Math.hypot(rw, 10), rx = rw / rl, ry2 = 10 / rl;
      let prev = null;
      for (let i = 0; i <= 12; i++) {
        const u = i / 12; let vx = rx * u, vy = 1 - u + ry2 * u;
        const L = Math.hypot(vx, vy);
        const p = this.proj([vx / L * 46, 50 + vy / L * 46, 0]);
        if (prev) ln(c, prev.x, prev.y, p.x, p.y, COL.amber, 4);
        prev = p;
      }
      let mx = rx, my = 1 + ry2; const mL = Math.hypot(mx, my);
      const pm = this.proj([mx / mL * 58, 50 + my / mL * 58, 0]);
      txt(c, 'θ', pm.x + 12, pm.y - 8, 28, COL.amberInk);
    }
    if (this.step === 2 || (this.step === 3 && this.anim > 1.1)) {
      const q = this.proj([P[0], P[1], P[2] - 70]);
      arrow(c, pp.x, pp.y, q.x, q.y, COL.orange, 6, 14);
      txt(c, 'dB', q.x + 14, q.y, 28, COL.orange);
    }
    if (this.step === 3 && this.anim <= 1.1) {
      for (let i = 0; i < elems.length; i++) {
        const e = ease(clamp(this.anim * 1.3 - i * 0.05, 0, 1));
        const pos = [P[0] * e, elems[i] + (P[1] - elems[i]) * e, 0];
        const a = this.proj(pos), b = this.proj([pos[0], pos[1], pos[2] - 30]);
        arrow(c, a.x, a.y, b.x, b.y, 'rgba(255,106,19,.9)', 4, 9);
      }
    }
  }
};

/* --------------------------------------------------------------------------
   11 · SLIDE 5 — EARTH'S MAGNETIC SHIELD
   -------------------------------------------------------------------------- */
const S5 = {
  sel: '#s5', cv: null, parts: [],
  init() { this.cv = CV('cv5', 1036, 676); $('#reset5').addEventListener('click', () => this.reset()); },
  spawn(any) { return { x: any ? Math.random() * 1036 : -10, y: 60 + Math.random() * 556, vx: 100 + Math.random() * 70, vy: 0 }; },
  reset() {
    this.parts = []; for (let i = 0; i < 90; i++) this.parts.push(this.spawn(true));
    const be = $('#barEarth'), bw = $('#barWire');
    be.style.width = '0'; bw.style.width = '0';
    requestAnimationFrame(() => requestAnimationFrame(() => { be.style.width = '240px'; bw.style.width = '480px'; }));
  },
  start() { this.reset(); },
  update(dt, t) {
    const ex = 640, ey = 338;
    for (const p of this.parts) {
      const dx = p.x - ex, dy = p.y - ey, d = Math.hypot(dx, dy) || 1;
      if (d < 300) { const f = (300 - d) / 300; p.vx += dx / d * f * 420 * dt; p.vy += dy / d * f * 420 * dt; }
      else p.vy *= (1 - dt * 0.8);
      if (d < 108) { p.x = ex + dx / d * 108; p.y = ey + dy / d * 108; p.vx = Math.abs(p.vx) * 0.6 + 40; p.vy += dy / d * 60; }
      p.x += p.vx * dt; p.y += p.vy * dt;
      if (p.x > 1050 || p.y < -20 || p.y > 700) Object.assign(p, this.spawn(false));
    }
    this.draw(t);
  },
  draw(t) {
    const c = this.cv.ctx; c.clearRect(0, 0, 1036, 676);
    const ex = 640, ey = 338;
    circ(c, 80, ey, 58, COL.amber);
    for (let i = 0; i < 12; i++) {
      const a = i * Math.PI / 6 + t * 0.2;
      ln(c, 80 + Math.cos(a) * 66, ey + Math.sin(a) * 66, 80 + Math.cos(a) * 84, ey + Math.sin(a) * 84, '#E0A800', 5);
    }
    txt(c, 'Sun', 80, ey + 110, 26, COL.sec, 'center');
    c.strokeStyle = COL.border; c.lineWidth = 3; c.setLineDash([10, 8]);
    c.beginPath(); c.ellipse(ex, ey, 268, 206, 0, 0, TAU); c.stroke(); c.setLineDash([]);
    c.strokeStyle = COL.orange; c.lineWidth = 3.5;
    for (const s of [1.15, 1.55, 2.0]) for (const side of [-1, 1]) {
      c.beginPath(); c.moveTo(ex, ey - 74);
      c.bezierCurveTo(ex + side * 120 * s, ey - 150 * s, ex + side * 150 * s, ey + 150 * s, ex, ey + 74);
      c.stroke();
    }
    tri(c, ex + 165, ey - 150, 0.3, 1, 8, COL.orange);
    circ(c, ex, ey, 72, '#1E6FD9');
    c.fillStyle = COL.green;
    c.beginPath(); c.ellipse(ex - 22, ey - 18, 26, 16, 0.5, 0, TAU); c.fill();
    c.beginPath(); c.ellipse(ex + 24, ey + 22, 22, 14, -0.4, 0, TAU); c.fill();
    circ(c, ex, ey, 72, null, COL.navy, 3);
    txt(c, 'Earth', ex, ey + 100, 26, COL.navy, 'center');
    for (const p of this.parts) { ln(c, p.x - 10, p.y, p.x, p.y, 'rgba(255,196,0,.5)', 3); circ(c, p.x, p.y, 4.5, COL.amber); }
    txt(c, 'solar wind →', 180, 80, 26, COL.amberInk);
    txt(c, 'magnetic shield', ex, 60, 26, COL.orange, 'center');
  }
};

/* --------------------------------------------------------------------------
   12 · SLIDE 6 — THREE SHAPES, THREE RESULTS
   -------------------------------------------------------------------------- */
const S6 = {
  sel: '#s6', cv: null, shape: 'w', flow: 0,
  Iw: NUM.S6.Iw, rw: NUM.S6.rw, Nc: NUM.S6.Nc, Ic: NUM.S6.Ic, ns: NUM.S6.ns, Is: NUM.S6.Is,
  init() {
    this.cv = CV('cv6', 996, 536);
    this.tabs = { w: $('#tab6-w'), c: $('#tab6-c'), s: $('#tab6-s') };
    for (const k in this.tabs) this.tabs[k].addEventListener('click', () => this.setShape(k));
    $('#slI6w').addEventListener('input', e => { this.Iw = +e.target.value; this.calc(); });
    $('#slR6w').addEventListener('input', e => { this.rw = +e.target.value; this.calc(); });
    $('#slN6c').addEventListener('input', e => { this.Nc = +e.target.value; this.calc(); });
    $('#slI6c').addEventListener('input', e => { this.Ic = +e.target.value; this.calc(); });
    $('#slN6s').addEventListener('input', e => { this.ns = +e.target.value; this.calc(); });
    $('#slI6s').addEventListener('input', e => { this.Is = +e.target.value; this.calc(); });
    $('#reset6').addEventListener('click', () => this.reset());
  },
  setShape(k) {
    this.shape = k;
    for (const j in this.tabs) this.tabs[j].classList.toggle('active', j === k);
    ['w', 'c', 's'].forEach(j => $('#pan6-' + j).classList.toggle('hidden', j !== k));
  },
  reset() {
    this.Iw = NUM.S6.Iw; this.rw = NUM.S6.rw; this.Nc = NUM.S6.Nc; this.Ic = NUM.S6.Ic; this.ns = NUM.S6.ns; this.Is = NUM.S6.Is;
    $('#slI6w').value = this.Iw; $('#slR6w').value = this.rw;
    $('#slN6c').value = this.Nc; $('#slI6c').value = this.Ic;
    $('#slN6s').value = this.ns; $('#slI6s').value = this.Is;
    this.setShape('w'); this.calc();
  },
  start() { this.reset(); },
  calc() {
    $('#valI6w').textContent = 'I = ' + this.Iw + ' A';
    $('#valR6w').textContent = 'r = ' + this.rw + ' cm';
    $('#chip6w').textContent = 'B = ' + fmt(20 * this.Iw / this.rw) + ' μT';
    $('#valN6c').textContent = 'N = ' + this.Nc;
    $('#valI6c').textContent = 'I = ' + this.Ic + ' A';
    $('#chip6c').textContent = 'B ≈ ' + (NUM.MU0 * this.Nc * this.Ic / (2 * NUM.S6.Rc) * 1000).toFixed(1) + ' mT';
    $('#valN6s').textContent = 'n = ' + this.ns + ' /m';
    $('#valI6s').textContent = 'I = ' + this.Is + ' A';
    $('#chip6s').textContent = 'B ≈ ' + (NUM.MU0 * this.ns * this.Is * 1000).toFixed(1) + ' mT';
  },
  update(dt, t) { this.flow -= dt * 60; this.draw(t); },
  draw() {
    const c = this.cv.ctx; c.clearRect(0, 0, 996, 536);
    const cx = 498, cy = 268;
    const flowLine = (x1, y1, x2, y2) => {
      c.strokeStyle = COL.orange; c.lineWidth = 3.5; c.setLineDash([16, 10]); c.lineDashOffset = this.flow;
      c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); c.setLineDash([]);
    };
    if (this.shape === 'w') {
      ln(c, cx, 60, cx, 476, COL.copper, 10);
      arrow(c, cx, 150, cx, 92, COL.blue, 6, 12);
      txt(c, 'I', cx + 22, 100, 28, COL.blue);
      for (let i = 0; i < 4; i++) {
        const R = 70 + i * 46;
        c.strokeStyle = 'rgba(255,106,19,' + (0.9 - i * 0.14) + ')'; c.lineWidth = 3.5;
        c.setLineDash([14, 10]); c.lineDashOffset = this.flow;
        c.beginPath(); c.ellipse(cx, cy, R, R * 0.34, 0, 0, TAU); c.stroke(); c.setLineDash([]);
        const a = this.flow * 0.015 + i;
        tri(c, cx + R * Math.cos(a), cy + R * 0.34 * Math.sin(a), -Math.sin(a), 0.34 * Math.cos(a), 8, COL.orange);
      }
      c.setLineDash([8, 6]); ln(c, cx, cy, cx + 162, cy, COL.navy, 3); c.setLineDash([]);
      txt(c, 'r', cx + 84, cy - 18, 28, COL.navy, 'center');
      txt(c, 'field circles around the wire', cx, 510, 26, COL.sec, 'center');
    } else if (this.shape === 'c') {
      for (const o of [-10, 0, 10]) circ(c, cx + o, cy, 150, null, o === 0 ? COL.copper : 'rgba(200,116,43,.4)', o === 0 ? 10 : 5);
      for (let k = -2; k <= 2; k++) {
        const y = cy + k * 36;
        flowLine(180, y, 814, y);
        tri(c, 660, y, 1, 0, 8, COL.orange);
      }
      txt(c, 'B at the centre', cx, 80, 28, COL.orange, 'center');
      txt(c, 'N turns of wire', cx, 470, 26, COL.sec, 'center');
    } else {
      for (let i = 0; i < 8; i++) {
        c.strokeStyle = COL.copper; c.lineWidth = 6;
        c.beginPath(); c.ellipse(280 + i * 62, cy, 26, 92, 0, 0, TAU); c.stroke();
      }
      for (const y of [232, 256, 280, 304]) { flowLine(260, y, 748, y); tri(c, 700, y, 1, 0, 8, COL.orange); }
      c.strokeStyle = 'rgba(255,106,19,.5)'; c.lineWidth = 3; c.setLineDash([14, 10]); c.lineDashOffset = this.flow;
      c.beginPath(); c.moveTo(748, 176); c.bezierCurveTo(640, 60, 360, 60, 260, 176); c.stroke();
      c.beginPath(); c.moveTo(748, 360); c.bezierCurveTo(640, 476, 360, 476, 260, 360); c.stroke();
      c.setLineDash([]);
      txt(c, 'inside: strong & uniform →', cx, 508, 26, COL.sec, 'center');
    }
  }
};

/* --------------------------------------------------------------------------
   13 · SLIDE 7 — SOFT IRON CORE  (40 magnetic domains)
   -------------------------------------------------------------------------- */
const S7 = {
  sel: '#s7', cv: null, on: false, mat: 'iron', doms: [], meter: 0.07, meterTgt: 0.07,
  init() {
    this.cv = CV('cv7', 1056, 536);
    for (let i = 0; i < 8; i++) for (let j = 0; j < 5; j++)
      this.doms.push({ x: 284 + i * 66, y: 224 + j * 34, a: Math.random() * TAU, v: 0, tgt: Math.random() * TAU });
    this.tg = $('#tg7');
    bindToggle(this.tg, on => { this.on = on; this.targets(); });
    $$('#mat7 .seg-btn').forEach(b => b.addEventListener('click', () => {
      this.mat = b.dataset.mat;
      $$('#mat7 .seg-btn').forEach(x => x.classList.toggle('active', x === b));
      this.targets();
    }));
    $('#reset7').addEventListener('click', () => this.reset());
  },
  targets() {
    for (const d of this.doms) {
      if (this.mat === 'air') continue;
      if (this.on) d.tgt = (Math.random() - 0.5) * 0.16;
      else if (this.mat === 'iron') d.tgt = Math.random() * TAU;
      else d.tgt = d.a;                       // hard steel keeps its alignment
    }
    this.meterTgt = this.mat === 'air' ? 0.07 : this.on ? (this.mat === 'iron' ? 0.95 : 0.9) : (this.mat === 'iron' ? 0.07 : 0.78);
    $('#meterTxt7').textContent =
      this.mat === 'air' ? '1× (no core)' :
      this.on ? 'hundreds to thousands × (illustrative)' :
      this.mat === 'iron' ? '≈ 1× — field collapses' : 'still magnetised!';
  },
  reset() {
    this.on = false; this.mat = 'iron'; setToggle(this.tg, false);
    $$('#mat7 .seg-btn').forEach(x => x.classList.toggle('active', x.dataset.mat === 'iron'));
    for (const d of this.doms) { d.a = Math.random() * TAU; d.v = 0; }
    this.targets();
  },
  start() { this.reset(); },
  update(dt, t) {
    if (this.mat !== 'air') for (const d of this.doms) {
      let diff = d.tgt - d.a; diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      d.v += (22 * diff - 8 * d.v) * dt; d.a += d.v * dt;
    }
    this.meter += (this.meterTgt - this.meter) * Math.min(1, dt * 5);
    $('#meter7').style.width = (this.meter * 100).toFixed(1) + '%';
    this.draw(t);
  },
  draw(t) {
    const c = this.cv.ctx; c.clearRect(0, 0, 1056, 536);
    const on = this.on;
    txt(c, 'coil cross-section (⊗ top, ⊙ bottom)', 528, 96, 26, COL.sec, 'center');
    for (let i = 0; i < 12; i++) {
      const x = 228 + i * 54;
      circ(c, x, 150, 16, '#FFFFFF', on ? COL.blue : COL.border, 3);
      ln(c, x - 7, 143, x + 7, 157, on ? COL.blue : COL.sec, 3);
      ln(c, x - 7, 157, x + 7, 143, on ? COL.blue : COL.sec, 3);
      circ(c, x, 430, 16, '#FFFFFF', on ? COL.blue : COL.border, 3);
      circ(c, x, 430, 4.5, on ? COL.blue : COL.sec);
    }
    const fill = this.mat === 'air' ? 'rgba(185,198,212,.18)' : this.mat === 'iron' ? '#DDE3EB' : '#B9C2CE';
    rr(c, 250, 200, 560, 180, 14); c.fillStyle = fill; c.fill();
    c.strokeStyle = this.mat === 'air' ? COL.border : COL.iron; c.lineWidth = 3;
    if (this.mat === 'air') c.setLineDash([10, 8]);
    c.stroke(); c.setLineDash([]);
    txt(c, this.mat === 'air' ? 'AIR CORE' : this.mat === 'iron' ? 'SOFT IRON' : 'HARD STEEL', 528, 186, 26, COL.iron, 'center');
    const n = this.mat === 'air' ? 3 : on ? 9 : this.mat === 'iron' ? 2 : 7;
    const alpha = this.mat === 'air' ? 0.3 : on ? 0.85 : this.mat === 'iron' ? 0.25 : 0.6;
    c.strokeStyle = 'rgba(255,106,19,' + alpha + ')'; c.lineWidth = 3.5;
    c.setLineDash([16, 10]); c.lineDashOffset = on ? -t * 90 : -t * 20;
    for (let i = 0; i < n; i++) {
      const y = 214 + (i + 0.5) * (152 / n);
      c.beginPath(); c.moveTo(120, y); c.lineTo(936, y); c.stroke();
    }
    c.setLineDash([]);
    for (let i = 0; i < n; i++) tri(c, 936, 214 + (i + 0.5) * (152 / n), 1, 0, 8, 'rgba(255,106,19,' + alpha + ')');
    if (this.mat !== 'air') for (const d of this.doms) {
      const aligned = Math.abs(Math.atan2(Math.sin(d.a), Math.cos(d.a))) < 0.4;
      const col = aligned ? COL.orange : COL.iron;
      const dx = Math.cos(d.a) * 13, dy = Math.sin(d.a) * 13;
      ln(c, d.x - dx, d.y - dy, d.x + dx, d.y + dy, col, 4);
      tri(c, d.x + dx, d.y + dy, dx, dy, 6, col);
    }
    txt(c, 'field lines →', 120, 478, 26, COL.orange);
  }
};

/* --------------------------------------------------------------------------
   14 · SLIDE 8 — ELECTROMAGNETIC CRANE
   -------------------------------------------------------------------------- */
const S8 = {
  sel: '#s8', cv: null, on: false, lifted: false, my: 300, dotOff: 0, pieces: [],
  init() {
    this.cv = CV('cv8', 1146, 700);
    const homes = [[470, 586], [548, 592], [626, 588], [704, 592], [782, 586]];
    this.pieces = homes.map((h, i) => ({
      hx: h[0], hy: h[1], x: h[0], y: h[1], vy: 0, mode: 'home',
      off: [(i - 2) * 34, 86 + (i % 2) * 6], rot: (i * 0.7) % 1 - 0.5
    }));
    this.tg = $('#tg8');
    bindToggle(this.tg, on => { this.on = on; if (on) this.attach(); else this.drop(); this.steps(); });
    $('#lift8').addEventListener('click', () => { this.lifted = !this.lifted; this.liftBtn(); this.steps(); });
    $('#reset8').addEventListener('click', () => this.reset());
    this.liftBtn();
  },
  liftBtn() { $('#lift8').textContent = this.lifted ? 'Lower ▼' : 'Lift ▲'; },
  attach() { for (const p of this.pieces) p.mode = 'attach'; },
  drop() { for (const p of this.pieces) if (p.mode !== 'home') { p.mode = 'fall'; p.vy = 0; } },
  reset() {
    this.on = false; this.lifted = false; this.my = 300; setToggle(this.tg, false); this.liftBtn();
    for (const p of this.pieces) { p.mode = 'home'; p.x = p.hx; p.y = p.hy; p.vy = 0; }
    this.steps();
  },
  start() { this.reset(); },
  steps() {
    const lvl = !this.on ? 0 : this.lifted ? 4 : this.pieces.some(p => p.mode === 'done') ? 3 : 2;
    $$('#steps8 li').forEach((li, i) => li.classList.toggle('lit', i < lvl));
  },
  update(dt, t) {
    this.my += ((this.lifted ? 150 : 300) - this.my) * Math.min(1, dt * 3);
    if (this.on) this.dotOff = (this.dotOff + dt * 120) % 86;
    let changed = false;
    for (const p of this.pieces) {
      if (p.mode === 'attach') {
        const tx = 700 + p.off[0], ty = this.my + p.off[1];
        p.x += (tx - p.x) * Math.min(1, dt * 6); p.y += (ty - p.y) * Math.min(1, dt * 6);
        if (Math.hypot(tx - p.x, ty - p.y) < 3) { p.mode = 'done'; changed = true; }
      } else if (p.mode === 'done') { p.x = 700 + p.off[0]; p.y = this.my + p.off[1]; }
      else if (p.mode === 'fall') {
        p.vy += 1400 * dt; p.y += p.vy * dt; p.x += (p.hx - p.x) * Math.min(1, dt * 3);
        if (p.y >= p.hy) { p.y = p.hy; p.x = p.hx; p.vy = 0; p.mode = 'home'; changed = true; }
      }
    }
    if (changed) this.steps();
    this.draw();
  },
  draw() {
    const c = this.cv.ctx; c.clearRect(0, 0, 1146, 700);
    ln(c, 0, 620, 1146, 620, COL.border, 4);
    c.fillStyle = COL.iron; c.fillRect(96, 60, 34, 560); c.fillRect(96, 60, 640, 22);
    for (let i = 0; i < 8; i++) ln(c, 130 + i * 80, 82, 170 + i * 80, 60, COL.iron, 4);
    ln(c, 700, 82, 700, this.my, COL.navy, 4);
    rr(c, 620, this.my, 160, 70, 10); c.fillStyle = COL.iron; c.fill(); c.strokeStyle = COL.navy; c.lineWidth = 3; c.stroke();
    for (let i = 0; i < 5; i++) { rr(c, 632 + i * 28, this.my - 8, 18, 86, 6); c.fillStyle = COL.copper; c.fill(); }
    txt(c, 'soft iron core + coil', 700, this.my - 26, 26, COL.iron, 'center');
    if (this.on) {
      for (let i = 0; i < 5; i++) circ(c, 641 + i * 28, this.my - 8 + ((this.dotOff + i * 17) % 86), 5, COL.blue);
      c.strokeStyle = COL.orange; c.lineWidth = 3.5;
      for (let i = 0; i < 3; i++) { c.beginPath(); c.arc(700, this.my + 70, 34 + i * 22, 0, Math.PI); c.stroke(); }
      txt(c, 'field ON', 810, this.my + 40, 26, COL.orange);
    } else txt(c, 'field OFF', 810, this.my + 40, 26, COL.sec);
    for (const p of this.pieces) {
      c.save(); c.translate(p.x, p.y); c.rotate(p.mode === 'done' ? 0 : p.rot);
      rr(c, -24, -14, 48, 28, 5); c.fillStyle = COL.iron; c.fill(); c.strokeStyle = COL.navy; c.lineWidth = 2; c.stroke();
      c.restore();
    }
    txt(c, 'steel scrap', 626, 648, 26, COL.iron, 'center');
    rr(c, 880, 560, 44, 56, 8); c.fillStyle = COL.alu; c.fill(); c.strokeStyle = COL.sec; c.lineWidth = 2; c.stroke();
    txt(c, 'Al', 902, 588, 26, COL.navy, 'center');
    rr(c, 960, 584, 56, 30, 6); c.fillStyle = COL.copper; c.fill();
    txt(c, 'Cu', 988, 599, 26, '#FFFFFF', 'center');
    txt(c, 'Only iron and steel are attracted', 900, 520, 26, COL.sec, 'center');
  }
};

/* --------------------------------------------------------------------------
   15 · SLIDE 9 — DYNAMIC LOUDSPEAKER  (+ optional Web Audio tone)
   -------------------------------------------------------------------------- */
const S9 = {
  sel: '#s9', cv: null, f: NUM.S9.f, A: NUM.S9.A, ph: 0,
  actx: null, osc: null, gain: null, playing: false,
  init() {
    this.cv = CV('cv9', 1146, 700);
    $('#slF9').addEventListener('input', e => { this.f = +e.target.value; this.labels(); });
    $('#slA9').addEventListener('input', e => { this.A = +e.target.value; this.labels(); });
    $('#tone9').addEventListener('click', () => this.toggleTone());
    $('#reset9').addEventListener('click', () => this.reset());
    const cc = $('#tone9').parentElement;      // keep tone + reset on one touch row
    cc.style.flexDirection = 'row'; cc.style.flexWrap = 'wrap';
    this.labels(); this.toneBtn();
  },
  labels() { $('#valF9').textContent = this.f.toFixed(1) + ' Hz'; $('#valA9').textContent = this.A + ' px'; },
  reset() {
    this.f = NUM.S9.f; this.A = NUM.S9.A; this.ph = 0;
    $('#slF9').value = this.f; $('#slA9').value = this.A;
    this.stopTone(); this.labels();
  },
  start() { this.reset(); },
  stop() { this.stopTone(); },                 // audio never survives a slide change
  toggleTone() { this.playing ? this.stopTone() : this.startTone(); },
  startTone() {
    try {
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
      this.actx = this.actx || new AC();
      if (this.actx.state === 'suspended') this.actx.resume();
      this.osc = this.actx.createOscillator(); this.gain = this.actx.createGain();
      this.osc.type = 'sine'; this.osc.frequency.value = NUM.S9.toneHz; this.gain.gain.value = 0;
      this.osc.connect(this.gain); this.gain.connect(this.actx.destination); this.osc.start();
      this.gain.gain.linearRampToValueAtTime(NUM.S9.toneGain, this.actx.currentTime + 0.15);
      this.playing = true; this.toneBtn();
    } catch (e) { /* audio unavailable — animation still works */ }
  },
  stopTone() {
    if (this.osc) {
      try {
        this.gain.gain.linearRampToValueAtTime(0, this.actx.currentTime + 0.1);
        this.osc.stop(this.actx.currentTime + 0.12);
      } catch (e) {}
      this.osc = null;
    }
    this.playing = false; this.toneBtn();
  },
  toneBtn() {
    const b = $('#tone9');
    b.textContent = this.playing ? CONTENT['s9.toneStop'] : CONTENT['s9.tone'];
    b.classList.toggle('playing', this.playing);
  },
  update(dt) { this.ph += TAU * this.f * dt; this.draw(); },
  draw() {
    const c = this.cv.ctx; c.clearRect(0, 0, 1146, 700);
    const s = Math.sin(this.ph), dx = this.A * s, sign = s >= 0 ? 1 : -1;
    /* permanent magnet */
    c.fillStyle = COL.north; rr(c, 120, 140, 180, 90, 8); c.fill();
    c.fillStyle = COL.south; rr(c, 120, 330, 180, 90, 8); c.fill();
    c.fillStyle = COL.iron; c.fillRect(120, 230, 140, 100);
    txt(c, 'N', 210, 185, 32, '#FFFFFF', 'center');
    txt(c, 'S', 210, 375, 32, '#FFFFFF', 'center');
    txt(c, 'permanent magnet', 210, 450, 26, COL.sec, 'center');
    /* voice coil with dot/cross current symbols */
    const cx = 262 + dx;
    rr(c, cx, 235, 46, 90, 6); c.strokeStyle = COL.copper; c.lineWidth = 5; c.stroke();
    for (const [sx, sy] of [[cx + 12, 250], [cx + 34, 250], [cx + 12, 310], [cx + 34, 310]]) {
      if (sign > 0) { circ(c, sx, sy, 7, null, COL.blue, 3); circ(c, sx, sy, 2.5, COL.blue); }
      else { ln(c, sx - 6, sy - 6, sx + 6, sy + 6, COL.blue, 3); ln(c, sx - 6, sy + 6, sx + 6, sy - 6, COL.blue, 3); }
    }
    txt(c, 'voice coil', cx + 23, 120, 26, COL.copper, 'center');
    ln(c, cx + 23, 132, cx + 23, 232, COL.border, 2);
    /* cone */
    c.fillStyle = 'rgba(185,198,212,.55)'; c.strokeStyle = COL.navy; c.lineWidth = 3;
    c.beginPath(); c.moveTo(cx + 46, 245); c.lineTo(cx + 46, 315); c.lineTo(560 + dx, 405); c.lineTo(560 + dx, 155);
    c.closePath(); c.fill(); c.stroke();
    txt(c, 'cone', 480 + dx, 132, 26, COL.navy, 'center');
    /* force on the coil */
    const fx = cx + 23;
    arrow(c, fx, 280, fx + sign * 80, 280, COL.green, 6, 14);
    txt(c, 'F', fx + sign * 95, 262, 28, COL.green, 'center');
    txt(c, 'F = BIL (θ = 90°)', 330, 466, 26, COL.green, 'center');
    /* air columns — travelling compression / rarefaction */
    for (let i = 0; i < 9; i++) {
      const bx = 640 + i * 56, d = this.A * 0.6 * Math.sin(this.ph - (bx - 640) * 0.012);
      for (let j = 0; j < 9; j++) circ(c, bx + d, 180 + j * 27.5, 4.5, COL.navy);
    }
    txt(c, 'air: compressions & rarefactions →', 860, 450, 26, COL.sec, 'center');
    /* AC waveform with synchronised marker */
    ln(c, 120, 580, 1120, 580, COL.border, 3);
    c.strokeStyle = COL.blue; c.lineWidth = 4; c.beginPath();
    for (let x = 120; x <= 1120; x += 4) {
      const y = 580 - 44 * Math.sin(4 * Math.PI * (x - 120) / 1000);
      x === 120 ? c.moveTo(x, y) : c.lineTo(x, y);
    }
    c.stroke();
    const xm = 120 + ((this.ph % (4 * Math.PI)) / (4 * Math.PI)) * 1000;
    circ(c, xm, 580 - 44 * Math.sin(this.ph), 10, COL.amber, COL.navy, 3);
    txt(c, 'AC current — slowed down so you can see it', 120, 500, 26, COL.blue);
    txt(c, 'time →', 1120, 640, 26, COL.sec, 'right');
  }
};

/* --------------------------------------------------------------------------
   16 · SLIDE 10 — FOUR MORE APPLICATIONS  (four mini canvas demos)
   -------------------------------------------------------------------------- */
const S10 = {
  sel: '#s10', cvs: {}, t: { a: 0, b: 0, c: 0, d: 0 }, items: [], spawn: 0,
  init() {
    this.cvs = { a: CV('cv10a', 400, 250), b: CV('cv10b', 400, 250), c: CV('cv10c', 400, 250), d: CV('cv10d', 400, 250) };
    ['a', 'b', 'c', 'd'].forEach(k => $('#run10' + k).addEventListener('click', e => {
      this.t[k] = 0; if (k === 'b') this.items = [];
      const b = e.currentTarget; b.classList.remove('pulse'); void b.offsetWidth; b.classList.add('pulse');
    }));
    $('#reset10').addEventListener('click', () => this.reset());
  },
  reset() { this.t = { a: 0, b: 0, c: 0, d: 0 }; this.items = []; this.spawn = 0; },
  start() { this.reset(); },
  update(dt) {
    for (const k in this.t) this.t[k] += dt;
    /* conveyor items for the separator */
    this.spawn -= dt;
    if (this.spawn <= 0 && this.items.length < 8) {
      this.spawn = 1.1;
      const types = ['iron', 'plastic', 'alu'];
      this.items.push({ type: types[Math.floor(this.t.b / 1.1) % 3], x: 20, y: 140, stage: 0, a: Math.PI, vy: 0, age: 0 });
    }
    for (const it of this.items) {
      it.age += dt;
      if (it.stage === 0) { it.x += 60 * dt; if (it.x >= 288) { it.stage = it.type === 'iron' ? 1 : 2; it.vy = 0; } }
      else if (it.stage === 1) {
        it.a -= dt * 2.4; it.x = 320 + 34 * Math.cos(it.a); it.y = 140 - 34 * Math.sin(it.a);
        if (it.a <= 0) { it.stage = 3; it.vy = 0; }
      }
      else if (it.stage === 2) { it.vy += 500 * dt; it.y += it.vy * dt; it.x += 40 * dt; if (it.y >= 192) { it.y = 192; it.stage = 4; } }
      else if (it.stage === 3) { it.vy += 500 * dt; it.y += it.vy * dt; if (it.y >= 192) { it.y = 192; it.stage = 4; } }
    }
    this.items = this.items.filter(it => it.age < 6);
    this.relay(this.cvs.a.ctx, this.t.a);
    this.sep(this.cvs.b.ctx, this.t.b);
    this.lock(this.cvs.c.ctx, this.t.c);
    this.bell(this.cvs.d.ctx, this.t.d);
  },
  relay(c, t) {
    c.clearRect(0, 0, 400, 250);
    const p = t % 4, on = p > 1 && p < 3;
    ln(c, 30, 200, 30, 80, COL.sec, 3); ln(c, 30, 80, 70, 80, COL.sec, 3);
    circ(c, 70, 80, 4, COL.navy); circ(c, 110, 80, 4, COL.navy);
    ln(c, 70, 80, on ? 110 : 100, on ? 80 : 60, COL.navy, 4);
    ln(c, 110, 80, 150, 80, COL.sec, 3); ln(c, 150, 80, 150, 120, COL.sec, 3);
    rr(c, 120, 120, 60, 50, 6); c.fillStyle = on ? COL.copper : '#D8C0A8'; c.fill(); c.strokeStyle = COL.navy; c.lineWidth = 2; c.stroke();
    txt(c, 'coil', 150, 196, 26, COL.sec, 'center');
    ln(c, 150, 170, 150, 200, COL.sec, 3); ln(c, 30, 200, 150, 200, COL.sec, 3);
    circ(c, 90, 200, 10, '#FFFFFF', COL.navy, 3); txt(c, '+', 90, 200, 26, COL.navy, 'center');
    const ang = on ? 0.22 : 0;
    c.save(); c.translate(190, 110); c.rotate(ang); ln(c, 0, 0, 70, 0, COL.iron, 7); c.restore();
    circ(c, 190, 110, 6, COL.navy);
    circ(c, 260, 110 + Math.sin(ang) * 70, 5, on ? COL.green : COL.sec); circ(c, 260, 132, 5, COL.sec);
    ln(c, 260, 132, 260, 170, COL.sec, 3); ln(c, 260, 170, 330, 170, COL.sec, 3);
    circ(c, 330, 140, 22, on ? COL.amber : '#FFFFFF', COL.navy, 3);
    if (on) for (let i = 0; i < 8; i++) {
      const a = i * Math.PI / 4;
      ln(c, 330 + Math.cos(a) * 28, 140 + Math.sin(a) * 28, 330 + Math.cos(a) * 38, 140 + Math.sin(a) * 38, '#E0A800', 3);
    }
    txt(c, 'lamp', 330, 182, 26, COL.sec, 'center');
    ln(c, 330, 162, 330, 210, COL.sec, 3); ln(c, 260, 210, 330, 210, COL.sec, 3); ln(c, 260, 170, 260, 210, COL.sec, 3);
    txt(c, on ? 'ON' : 'OFF', 40, 40, 26, on ? COL.blue : COL.sec);
  },
  sep(c, t) {
    c.clearRect(0, 0, 400, 250);
    ln(c, 20, 150, 300, 150, COL.iron, 8);
    c.setLineDash([10, 10]); c.lineDashOffset = -t * 60; ln(c, 20, 150, 300, 150, '#FFFFFF', 3); c.setLineDash([]);
    circ(c, 320, 140, 30, COL.orange); txt(c, 'N', 320, 140, 26, '#FFFFFF', 'center');
    rr(c, 250, 196, 60, 28, 4); c.strokeStyle = COL.sec; c.lineWidth = 3; c.stroke();
    txt(c, 'rest', 280, 236, 26, COL.sec, 'center');
    rr(c, 345, 196, 50, 28, 4); c.strokeStyle = COL.orange; c.stroke();
    txt(c, 'iron', 370, 236, 26, COL.orange, 'center');
    for (const it of this.items) {
      if (it.type === 'iron') { c.fillStyle = COL.iron; c.fillRect(it.x - 8, it.y - 8, 16, 16); }
      else if (it.type === 'plastic') {
        c.fillStyle = COL.amber; c.beginPath(); c.moveTo(it.x, it.y - 9); c.lineTo(it.x + 9, it.y + 7); c.lineTo(it.x - 9, it.y + 7); c.closePath(); c.fill();
      } else circ(c, it.x, it.y, 8, COL.alu, COL.sec, 2);
    }
    txt(c, 'magnetic drum', 320, 84, 26, COL.orange, 'center');
  },
  lock(c, t) {
    c.clearRect(0, 0, 400, 250);
    const p = t % 5, on = p < 2.5, open = on ? 0 : ease(clamp((p - 2.5) / 0.7, 0, 1));
    c.strokeStyle = COL.iron; c.lineWidth = 6; c.strokeRect(70, 40, 220, 180);
    rr(c, 250, 52, 34, 50, 4); c.fillStyle = on ? COL.blue : COL.alu; c.fill();
    const dw = 150 * Math.cos(open * 1.15);
    c.fillStyle = '#DCE6F2'; c.strokeStyle = COL.navy; c.lineWidth = 3;
    c.beginPath(); c.moveTo(76, 46); c.lineTo(76 + dw, 46 - open * 14); c.lineTo(76 + dw, 214 + open * 14); c.lineTo(76, 214);
    c.closePath(); c.fill(); c.stroke();
    circ(c, 76 + dw - 14, 130, 5, COL.navy);
    rr(c, 120, 6, 160, 30, 8); c.fillStyle = on ? COL.green : COL.greyPill; c.fill();
    txt(c, on ? 'LOCKED' : 'RELEASED', 200, 21, 26, on ? '#FFFFFF' : COL.sec, 'center');
  },
  bell(c, t) {
    c.clearRect(0, 0, 400, 250);
    const p = t % 1.2, en = p < 0.5;
    rr(c, 50, 110, 50, 60, 6); c.fillStyle = en ? COL.copper : '#D8C0A8'; c.fill(); c.strokeStyle = COL.navy; c.lineWidth = 2; c.stroke();
    txt(c, 'coil', 75, 196, 26, COL.sec, 'center');
    const hx = en ? 262 : 236;
    ln(c, 130, 100, hx, 100, COL.iron, 7); circ(c, hx, 100, 12, COL.navy); circ(c, 130, 100, 6, COL.navy);
    const strike = en && p > 0.42;
    circ(c, 300, 100, 38, strike ? COL.amber : '#F2D98A', COL.navy, 3);
    if (strike) {
      c.strokeStyle = COL.orange; c.lineWidth = 3;
      for (const r of [46, 56]) { c.beginPath(); c.arc(300, 100, r, -0.6, 0.6); c.stroke(); }
      txt(c, 'ding!', 300, 40, 26, COL.orange, 'center');
    }
    circ(c, 150, 70, 5, COL.sec); circ(c, 150, en ? 84 : 78, 5, en ? COL.orange : COL.green);
    txt(c, en ? 'circuit broken' : 'contact closed', 200, 232, 26, en ? COL.orange : COL.green, 'center');
    rr(c, 20, 20, 70, 34, 8); c.fillStyle = en ? COL.blue : '#FFFFFF'; c.fill(); c.strokeStyle = COL.blue; c.lineWidth = 3; c.stroke();
    txt(c, 'press', 55, 37, 26, en ? '#FFFFFF' : COL.blue, 'center');
  }
};

/* --------------------------------------------------------------------------
   17 · SLIDE 11 — CLOSING  (CSS-driven pulse sequence, no per-frame work)
   -------------------------------------------------------------------------- */
const S11 = { sel: '#s11', init() {}, start() {} };

/* --------------------------------------------------------------------------
   18 · SLIDE MANAGER, NAVIGATION, SINGLE rAF LOOP
   -------------------------------------------------------------------------- */
const SLIDES = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11];
let cur = 0, clock = 0, last = performance.now();

function buildDots() {
  $('#dots').innerHTML = SLIDES.map(() => '<span class="dot"></span>').join('');
}
function updateNav() {
  $('#btnPrev').disabled = cur === 0;
  $('#btnNext').disabled = cur === SLIDES.length - 1;
  $('#counter').textContent = (cur + 1) + ' / ' + SLIDES.length;
  $$('#dots .dot').forEach((d, i) => d.classList.toggle('on', i === cur));
}
function show(n, dir, instant) {
  if (n < 0 || n >= SLIDES.length) return;
  const old = SLIDES[cur];
  if (!instant && n !== cur) {
    if (old.stop) old.stop();
    old.el.classList.remove('active');
    old.el.classList.add(dir > 0 ? 'exit-left' : 'exit-right');
    setTimeout(() => old.el.classList.remove('exit-left', 'exit-right'), 340);
  } else {
    old.el.classList.remove('active');
  }
  cur = n; clock = 0;
  const s = SLIDES[cur];
  s.el.classList.add('active');
  if (!instant) {
    s.el.classList.add(dir > 0 ? 'enter-right' : 'enter-left');
    requestAnimationFrame(() => requestAnimationFrame(() => s.el.classList.remove('enter-right', 'enter-left')));
  }
  if (s.start) s.start();          // every animation restarts cleanly on entry
  updateNav();
}
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000); last = now; clock += dt;
  const s = SLIDES[cur];
  if (s.update) s.update(dt, clock);   // only the active slide animates
  requestAnimationFrame(frame);
}

/* --------------------------------------------------------------------------
   19 · LAYOUT FITTING  (guarantees no overflow on the fixed 1920×1080 stage)
   -------------------------------------------------------------------------- */
function tuneLayout() {
  $('#s2 .grid-s2').style.gridTemplateColumns = '720px 1fr';
  $('#s7 .grid-s7').style.height = '596px';
  $('#s7 .takeaway-duo').style.marginTop = '12px';
  $$('#s7 .takeaway-card').forEach(c => { c.style.padding = '12px 18px'; });
  $$('#s3 .person-card').forEach(c => { c.style.padding = '14px 18px'; });
  $$('#s3 .avatar').forEach(a => { a.style.width = '88px'; a.style.height = '88px'; });
  $$('#s3 .person-name').forEach(n => { n.style.fontSize = '32px'; });
  $$('#s3 .chip-year').forEach(ch => { ch.style.fontSize = '30px'; ch.style.padding = '4px 14px'; ch.style.marginTop = '4px'; });
}
function autoFit() {
  for (const col of $$('.col-left,.col-right,.calc-panel,.people-col,.law-col')) {
    let guard = 0;
    while (col.scrollHeight > col.clientHeight + 1 && guard < 6) {
      guard++;
      for (const card of col.querySelectorAll(':scope > .card, :scope > .statement-box, :scope > .formula-box')) {
        const cs = getComputedStyle(card);
        card.style.paddingTop = Math.max(10, parseFloat(cs.paddingTop) - 4) + 'px';
        card.style.paddingBottom = Math.max(10, parseFloat(cs.paddingBottom) - 4) + 'px';
      }
      const g = parseFloat(getComputedStyle(col).gap) || 0;
      if (g > 8) col.style.gap = (g - 3) + 'px';
    }
  }
}

/* --------------------------------------------------------------------------
   20 · BOOT
   -------------------------------------------------------------------------- */
function boot() {
  fillText(); buildChains(); buildDots();
  for (const s of SLIDES) { s.el = $(s.sel); if (s.init) s.init(); }
  tuneLayout(); fitStage(); autoFit();
  $('#btnPrev').addEventListener('click', () => show(cur - 1, -1));
  $('#btnNext').addEventListener('click', () => show(cur + 1, 1));
  window.addEventListener('keydown', e => {
    if (e.target && e.target.tagName === 'INPUT') return;   // let sliders keep their arrow keys
    if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); show(cur + 1, 1); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); show(cur - 1, -1); }
  });
  window.addEventListener('resize', fitStage);
  show(0, 0, true);
  requestAnimationFrame(frame);
}
document.addEventListener('DOMContentLoaded', boot);