
/* ---- Sticky Header ---- */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

/* ---- Explore My Journey Modal ---- */
const JOURNEY_DATA = {
  foundation: { label: 'Foundation', title: 'Madrasah Madani Alauddin Pao-Pao', desc: '' },
  experience: { label: 'Experience', title: 'PMI', desc: 'Pengalaman organisasi selama masa sekolah.' },
  education:  { label: 'Higher Education', title: 'UIN Alauddin Makassar', desc: 'S1 Biologi &middot; 2020&ndash;2025' },
  research:   { label: 'Research', title: 'Selected Research Experience', desc: 'Riset infestasi serangga, dipresentasikan di prosiding seminar nasional Perhimpunan Entomologi Indonesia.' },
  lab:        { label: 'Professional Exposure', title: 'Laboratory', desc: '&plusmn;5 bulan praktik langsung di laboratorium selama studi.' },
  now:        { label: 'Now', title: 'Helping Family Business', desc: 'Fokus saat ini: membantu bisnis keluarga, sambil terus belajar dan berkembang di berbagai bidang.' },
  data:       { label: 'Now &middot; Learning', title: 'Data', desc: 'Continuous learning and development.' },
  biology:    { label: 'Now &middot; Learning', title: 'Biology', desc: 'Continuous learning and development.' },
  web:        { label: 'Now &middot; Learning', title: 'Web Development', desc: 'Continuous learning and development.' },
  selfdev:    { label: 'Now &middot; Discipline', title: 'Self Development', desc: 'Discipline &middot; Resilience &middot; Physical Training.' }
};
let journeyLastFocus = null;
function openJourneyModal() {
  journeyLastFocus = document.activeElement;
  const modal = document.getElementById('journey-modal');
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => modal.classList.add('open'));
  setTimeout(() => { const b = modal.querySelector('.jm-close'); if (b) b.focus(); }, 50);
}
function closeJourneyModal() {
  const modal = document.getElementById('journey-modal');
  modal.classList.remove('open');
  closeJourneyDetail();
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  setTimeout(() => {
    modal.classList.add('hidden');
    if (journeyLastFocus) journeyLastFocus.focus();
  }, 300);
}
function showJourneyDetail(key) {
  const d = JOURNEY_DATA[key];
  if (!d) return;
  document.getElementById('jm-detail-label').innerHTML = d.label;
  document.getElementById('jm-detail-title').innerHTML = d.title;
  document.getElementById('jm-detail-desc').innerHTML = d.desc;
  const panel = document.getElementById('jm-detail');
  panel.hidden = false;
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
function closeJourneyDetail() {
  const panel = document.getElementById('jm-detail');
  if (panel) panel.hidden = true;
}

/* ---- My Hobbies Modal ---- */
const HOBBIES = [
  { key: 'kyokushin', cat: 'martial', name: 'Kyokushin Karate', fav: true, label: 'Martial Arts &middot; Favorite', desc: 'Salah satu bela diri yang paling saya sukai &mdash; tertarik pada disiplin, teknik, daya tahan fisik, dan ketahanan mental.' },
  { key: 'muaythai', cat: 'martial', name: 'Muay Thai', fav: true, label: 'Martial Arts &middot; Favorite', desc: 'Salah satu bela diri yang paling saya sukai &mdash; tertarik pada teknik, kondisi fisik, disiplin, dan perkembangan tubuh.' },
  { key: 'martial-general', cat: 'martial', name: 'Martial Arts', fav: false, label: 'Martial Arts', desc: 'Ketertarikan menjelajahi berbagai bentuk bela diri, dengan Kyokushin Karate dan Muay Thai sebagai favorit.' },
  { key: 'codm', cat: 'gaming', name: 'Call of Duty: Mobile', fav: false, label: 'Competitive Gaming', desc: 'Aktivitas hiburan yang dapat mendukung fokus, pengambilan keputusan cepat, koordinasi, dan adaptasi dalam situasi kompetitif.' },
  { key: 'mlbb', cat: 'gaming', name: 'Mobile Legends', fav: false, label: 'Team Strategy', desc: 'Game strategi tim yang dapat mendukung komunikasi, koordinasi, pengambilan keputusan, dan pemikiran strategis.' },
  { key: 'weight', cat: 'training', name: 'Weight Training', fav: false, label: 'Strength &amp; Discipline', desc: 'Latihan beban sebagai bagian dari perkembangan fisik, membangun kekuatan, disiplin, dan konsistensi.' },
  { key: 'workout', cat: 'training', name: 'Workout', fav: false, label: 'Fitness &amp; Endurance', desc: 'Latihan fisik untuk menjaga kebugaran, mengembangkan daya tahan, dan membangun rutinitas latihan yang konsisten.' },
  { key: 'marvel', cat: 'movies', name: 'Marvel', fav: false, label: 'Favorite Universe', desc: 'Menikmati film dan series Marvel sebagai hiburan, dengan apresiasi pada storytelling, karakter, dan dunia sinematiknya.' },
  { key: 'moonknight', cat: 'movies', name: 'Moon Knight', fav: true, label: 'Favorite Marvel Series', desc: 'Salah satu series Marvel favorit saya.' },
  { key: 'onepiece', cat: 'movies', name: 'One Piece', fav: true, label: 'Favorite Anime', desc: 'Salah satu anime favorit saya, terutama untuk petualangan, karakter, world-building, dan tema persahabatan, keteguhan, serta keberanian.' }
];
let hobbiesLastFocus = null;
function openHobbiesModal() {
  hobbiesLastFocus = document.activeElement;
  const modal = document.getElementById('hobbies-modal');
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => modal.classList.add('open'));
  setTimeout(() => { const b = modal.querySelector('.hb-close'); if (b) b.focus(); }, 50);
}
function closeHobbiesModal() {
  const modal = document.getElementById('hobbies-modal');
  modal.classList.remove('open');
  closeHobbyDetail();
  document.getElementById('hb-items').hidden = true;
  document.querySelectorAll('.hb-category').forEach(b => b.classList.remove('active'));
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  setTimeout(() => {
    modal.classList.add('hidden');
    if (hobbiesLastFocus) hobbiesLastFocus.focus();
  }, 300);
}
function selectHobbyCategory(catKey) {
  document.querySelectorAll('.hb-category').forEach(b => b.classList.toggle('active', b.dataset.cat === catKey));
  const items = HOBBIES.filter(h => h.cat === catKey);
  const itemsWrap = document.getElementById('hb-items');
  itemsWrap.innerHTML = items.map(h =>
    '<button class="hb-item" onclick="showHobbyDetail(\'' + h.key + '\')">' +
    (h.fav ? '<i class="fas fa-star hb-item-star"></i> ' : '') + h.name + '</button>'
  ).join('');
  itemsWrap.hidden = false;
  closeHobbyDetail();
  itemsWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
function showHobbyDetail(key) {
  const h = HOBBIES.find(x => x.key === key);
  if (!h) return;
  document.getElementById('hb-detail-label').innerHTML = h.label;
  document.getElementById('hb-detail-title').textContent = h.name;
  document.getElementById('hb-detail-desc').innerHTML = h.desc;
  const panel = document.getElementById('hb-detail');
  panel.hidden = false;
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
function closeHobbyDetail() {
  const panel = document.getElementById('hb-detail');
  if (panel) panel.hidden = true;
}

/* ---- Areas of Interest Modal ---- */
let areasLastFocus = null;
function openAreasModal() {
  areasLastFocus = document.activeElement;
  const modal = document.getElementById('areas-modal');
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => modal.classList.add('open'));
  setTimeout(() => { const b = modal.querySelector('.aoi-close'); if (b) b.focus(); }, 50);
}
function closeAreasModal() {
  const modal = document.getElementById('areas-modal');
  modal.classList.remove('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  setTimeout(() => {
    modal.classList.add('hidden');
    if (areasLastFocus) areasLastFocus.focus();
  }, 300);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const jModal = document.getElementById('journey-modal');
    if (jModal && !jModal.classList.contains('hidden')) closeJourneyModal();
    const hModal = document.getElementById('hobbies-modal');
    if (hModal && !hModal.classList.contains('hidden')) closeHobbiesModal();
    const aModal = document.getElementById('areas-modal');
    if (aModal && !aModal.classList.contains('hidden')) closeAreasModal();
  }
});

/* ---- Hamburger ---- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}));

/* ---- Scroll Reveal ---- */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 80);
  });
}, { threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));


/* ---- Skills Depth Map: click a track to reveal its evidence ---- */
function toggleDepthDetail(btn) {
  const card = btn.closest('.skill-item');
  if (!card) return;
  const isOpen = card.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}


/* ---- Active nav ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
  navLinks.forEach(l => { l.style.opacity = l.getAttribute('href') === '#' + cur ? '1' : ''; });
});

/* ---- Portfolio Thumbnails — Canvas-generated PNG-quality images ---- */
function drawBiologyThumb() {
  const canvas = document.getElementById('thumb1');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;

  // Background gradient
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#0D2818');
  bg.addColorStop(1, '#1A5C35');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Decorative circles
  const glow = ctx.createRadialGradient(480, 40, 0, 480, 40, 120);
  glow.addColorStop(0, 'rgba(201,168,76,0.12)');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.beginPath(); ctx.arc(480, 40, 120, 0, Math.PI*2); ctx.fill();

  // Molecule structure - circles connected by lines
  const nodes = [
    {x: 180, y: 110, r: 22}, {x: 240, y: 70, r: 16}, {x: 300, y: 105, r: 20},
    {x: 255, y: 150, r: 14}, {x: 330, y: 160, r: 18}, {x: 200, y: 170, r: 12}
  ];
  const edges = [[0,1],[1,2],[2,3],[3,0],[2,4],[3,5],[0,5]];
  ctx.strokeStyle = 'rgba(201,168,76,0.4)';
  ctx.lineWidth = 1.5;
  edges.forEach(([a,b]) => {
    ctx.beginPath();
    ctx.moveTo(nodes[a].x, nodes[a].y);
    ctx.lineTo(nodes[b].x, nodes[b].y);
    ctx.stroke();
  });
  nodes.forEach((n, i) => {
    const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
    g.addColorStop(0, i % 2 === 0 ? 'rgba(201,168,76,0.8)' : 'rgba(46,139,87,0.8)');
    g.addColorStop(1, 'rgba(14,45,26,0.4)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = i % 2 === 0 ? 'rgba(201,168,76,0.6)' : 'rgba(46,139,87,0.6)';
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  // DNA helix
  for (let i = 0; i < 60; i++) {
    const t = i / 60 * Math.PI * 4;
    const x = 440 + Math.sin(t) * 28;
    const y = 10 + i * (210/60);
    const r = 3 + Math.abs(Math.sin(t)) * 2;
    ctx.fillStyle = i % 6 < 3 ? 'rgba(201,168,76,0.7)' : 'rgba(46,139,87,0.7)';
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.fill();
  }
  // Helix connecting lines
  ctx.strokeStyle = 'rgba(255,255,255,0.1)';
  ctx.lineWidth = 0.8;
  for (let i = 0; i < 10; i++) {
    const t1 = (i / 10) * Math.PI * 4;
    const t2 = t1 + Math.PI;
    const y = 10 + (i / 10) * 210;
    ctx.beginPath();
    ctx.moveTo(440 + Math.sin(t1)*28, y);
    ctx.lineTo(440 + Math.sin(t2)*28, y + 10);
    ctx.stroke();
  }

  // Label
  ctx.fillStyle = 'rgba(201,168,76,0.5)';
  ctx.font = '600 10px monospace';
  ctx.fillText('BIOLOGY · RESEARCH · ENTOMOLOGY', 28, 207);

  // Title text
  ctx.fillStyle = 'rgba(245,240,232,0.9)';
  ctx.font = 'bold 22px Georgia, serif';
  ctx.fillText('Artikel Sains', 30, 48);
  ctx.fillStyle = 'rgba(245,240,232,0.45)';
  ctx.font = '500 12px sans-serif';
  ctx.fillText('Infestasi Serangga · PEI · Seminar Nasional', 30, 68);
}

function drawWebThumb() {
  const canvas = document.getElementById('thumb2');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;

  // Background
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#0A5C36');
  bg.addColorStop(1, '#0E9558');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Glow
  const glow = ctx.createRadialGradient(500, 180, 0, 500, 180, 120);
  glow.addColorStop(0, 'rgba(201,168,76,0.1)');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.beginPath(); ctx.arc(500, 180, 120, 0, Math.PI*2); ctx.fill();

  // Browser window
  const bx = 80, by = 28, bw = 310, bh = 164;
  ctx.fillStyle = 'rgba(255,255,255,0.1)';
  roundRect(ctx, bx, by, bw, bh, 12);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 1.5;
  roundRect(ctx, bx, by, bw, bh, 12);
  ctx.stroke();

  // Browser bar
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  roundRect(ctx, bx, by, bw, 30, {tl:12, tr:12, bl:0, br:0});
  ctx.fill();

  // Traffic lights
  [[100,43,'#ff5f57'],[116,43,'#ffbd2e'],[132,43,'#28ca41']].forEach(([x,y,c]) => {
    ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI*2); ctx.fill();
  });

  // URL bar
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  roundRect(ctx, 148, 36, 164, 14, 7); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.font = '8px monospace'; ctx.fillText('rezki.web', 220, 47);

  // Content area
  ctx.fillStyle = 'rgba(10,45,26,0.5)';
  ctx.fillRect(bx+10, by+36, bw-20, 18);
  // Nav items
  ctx.fillStyle = 'rgba(201,168,76,0.8)';
  roundRect(ctx, bx+18, by+40, 40, 8, 4); ctx.fill();
  ['About','Skills','Projects'].forEach((t,i) => {
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    roundRect(ctx, bx+70+i*46, by+40, 30, 8, 4); ctx.fill();
  });

  // Hero section
  ctx.fillStyle = 'rgba(10,45,26,0.35)';
  ctx.fillRect(bx+10, by+60, bw-20, 60);
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.font = 'bold 11px Georgia, serif'; ctx.fillText('Muhammad Rezki Nur', bx+18, by+78);
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.font = '8px sans-serif'; ctx.fillText('Biologist & Research Assistant', bx+18, by+92);
  ctx.fillStyle = 'rgba(201,168,76,0.9)';
  roundRect(ctx, bx+18, by+100, 54, 12, 6); ctx.fill();
  ctx.fillStyle = 'rgba(14,45,26,1)';
  ctx.font = 'bold 7px sans-serif'; ctx.fillText('Portfolio ▶', bx+24, by+109);

  // Avatar circle
  const avG = ctx.createRadialGradient(330, by+88, 0, 330, by+88, 24);
  avG.addColorStop(0, 'rgba(201,168,76,0.3)');
  avG.addColorStop(1, 'rgba(201,168,76,0.1)');
  ctx.fillStyle = avG;
  ctx.strokeStyle = 'rgba(201,168,76,0.5)'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(330, by+88, 24, 0, Math.PI*2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = 'rgba(201,168,76,0.6)';
  ctx.beginPath(); ctx.arc(330, by+82, 10, 0, Math.PI*2); ctx.fill();

  // Cards row
  [bx+10, bx+104, bx+198].forEach(cx => {
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 1;
    roundRect(ctx, cx, by+126, 88, 30, 4); ctx.fill(); ctx.stroke();
  });

  // Tech tags
  [['HTML','rgba(201,168,76,0.15)','rgba(201,168,76,0.4)','#C9A84C'],
   ['CSS','rgba(46,204,113,0.12)','rgba(46,204,113,0.4)','#2ecc71'],
   ['JS','rgba(255,255,255,0.08)','rgba(255,255,255,0.25)','rgba(255,255,255,0.8)']
  ].forEach(([t,bg,bc,tc], i) => {
    ctx.fillStyle = bg; ctx.strokeStyle = bc; ctx.lineWidth = 1;
    roundRect(ctx, 420, 78+i*28, 60, 20, 10); ctx.fill(); ctx.stroke();
    ctx.fillStyle = tc; ctx.font = 'bold 9px monospace';
    ctx.fillText(t, 440, 92+i*28);
  });

  // Label
  ctx.fillStyle = 'rgba(201,168,76,0.5)';
  ctx.font = '600 10px monospace';
  ctx.fillText('UI/UX DESIGN · FRONTEND DEV', 28, 207);

  // Title
  ctx.fillStyle = 'rgba(245,240,232,0.9)';
  ctx.font = 'bold 22px Georgia, serif';
  ctx.fillText('Web Portfolio', 30, 200);
}

function roundRect(ctx, x, y, w, h, r) {
  if (typeof r === 'number') r = {tl:r, tr:r, bl:r, br:r};
  ctx.beginPath();
  ctx.moveTo(x + r.tl, y);
  ctx.lineTo(x + w - r.tr, y);
  ctx.quadraticCurveTo(x+w, y, x+w, y+r.tr);
  ctx.lineTo(x+w, y+h-r.br);
  ctx.quadraticCurveTo(x+w, y+h, x+w-r.br, y+h);
  ctx.lineTo(x+r.bl, y+h);
  ctx.quadraticCurveTo(x, y+h, x, y+h-r.bl);
  ctx.lineTo(x, y+r.tl);
  ctx.quadraticCurveTo(x, y, x+r.tl, y);
  ctx.closePath();
}

window.addEventListener('load', () => {
  drawBiologyThumb();
  drawWebThumb();
});

/* ---- WELCOME SCREEN ---- */
function enterPortfolio() {
  const btn = document.getElementById('vm-enter-btn');
  if (btn) btn.disabled = true;
  document.getElementById('visitor-overlay').classList.add('hidden');

  // Auto-play the existing background Music Player (triggered by this click = user interaction).
  // UI state is handled by the 'play'/'pause'/'error' listeners on #bgMusic itself (see syncMusicUI),
  // so this only needs to request playback — it never assumes success.
  if (music && music.paused) {
    music.play().catch(() => { console.warn('Audio autoplay blocked oleh browser.'); });
  }
}

function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ======================================================
   SECURITY MODULE — Input Validation, Sanitisation,
   XSS / SQLi Protection, Upload Blocking
   ====================================================== */
const Security = (() => {
  // ── Sanitise: escape HTML entities to prevent XSS ──
  function sanitize(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#x27;').replace(/\//g,'&#x2F;')
      .replace(/`/g,'&#x60;').replace(/=/g,'&#x3D;');
  }

  // ── Strip potential SQL injection patterns (client-side hint; enforce server-side too) ──
  function stripSQLi(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/('|--|;|\/\*|\*\/|xp_|exec\s|select\s|insert\s|drop\s|delete\s|update\s|union\s|char\s*\(|0x[0-9a-f]+)/gi, '');
  }

  // ── Validate email format ──
  function isValidEmail(email) {
    return /^[^\s@]{1,64}@[^\s@]{1,253}\.[^\s@]{2,}$/.test(email);
  }

  // ── Validate name (letters, spaces, hyphens, max 80 chars) ──
  function isValidName(name) {
    return /^[a-zA-Z0-9\s\-'.]{1,80}$/.test(name);
  }

  // ── Safe text: sanitize + strip SQLi ──
  function safeText(str) {
    return sanitize(stripSQLi(str.trim()));
  }

  // ── Block dangerous file types on any file input ──
  const BLOCKED_EXTS = /\.(exe|bat|cmd|sh|ps1|vbs|js|mjs|cjs|php|py|rb|pl|asp|aspx|jsp|html|htm|xml|svg|swf|jar|msi|dmg|app|dll|so|dylib)$/i;
  function isUnsafeFile(filename) {
    return BLOCKED_EXTS.test(filename);
  }

  // ── Rate-limit helper for form submission (max 3 sends per 5 min) ──
  const _submitLog = [];
  function canSubmit() {
    const now = Date.now();
    while (_submitLog.length && now - _submitLog[0] > 300000) _submitLog.shift();
    if (_submitLog.length >= 3) return false;
    _submitLog.push(now);
    return true;
  }

  // ── Validate contact form fields (returns error string or null) ──
  function validateContactForm(name, email, subject, message) {
    if (!name || !email || !subject || !message) return '⚠️ Harap isi semua kolom terlebih dahulu.';
    if (name.length > 80)    return '⚠️ Nama terlalu panjang (maks. 80 karakter).';
    if (!isValidName(name))  return '⚠️ Nama mengandung karakter tidak diizinkan.';
    if (!isValidEmail(email))return '⚠️ Format email tidak valid.';
    if (email.length > 254)  return '⚠️ Email terlalu panjang.';
    if (subject.length > 150)return '⚠️ Subjek terlalu panjang (maks. 150 karakter).';
    if (message.length > 2000)return '⚠️ Pesan terlalu panjang (maks. 2000 karakter).';
    return null;
  }

  return { sanitize, safeText, isValidEmail, isValidName, isUnsafeFile, canSubmit, validateContactForm };
})();

/* ---- EmailJS ---- */
const EMAILJS_PUBLIC_KEY  = '6LX3NGDjCB5nemXGy';
const EMAILJS_SERVICE_ID  = 'service_abc123';
const EMAILJS_TEMPLATE_ID = 'template_abc123';
emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

function handleSend(btn) {
  const name    = document.getElementById('contact-name').value.trim();
  const email   = document.getElementById('contact-email').value.trim();
  const subject = document.getElementById('contact-subject').value.trim();
  const message = document.getElementById('contact-message').value.trim();
  const status  = document.getElementById('form-status');

  // Validate
  const err = Security.validateContactForm(name, email, subject, message);
  if (err) {
    status.style.cssText = 'display:block;background:rgba(239,68,68,.12);color:#f87171;border:1px solid rgba(239,68,68,.25);padding:12px 16px;border-radius:8px;font-size:.85rem;font-weight:600;';
    status.textContent = err;
    return;
  }

  // Rate limiting
  if (!Security.canSubmit()) {
    status.style.cssText = 'display:block;background:rgba(239,68,68,.12);color:#f87171;border:1px solid rgba(239,68,68,.25);padding:12px 16px;border-radius:8px;font-size:.85rem;font-weight:600;';
    status.textContent = '⏳ Terlalu banyak permintaan. Harap tunggu beberapa menit.';
    return;
  }

  // Sanitize before sending
  const safeName    = Security.safeText(name);
  const safeEmail   = Security.safeText(email);
  const safeSubject = Security.safeText(subject);
  const safeMessage = Security.safeText(message);

  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
  btn.disabled = true;
  status.style.display = 'none';

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    from_name: safeName, from_email: safeEmail,
    subject: safeSubject, message: safeMessage,
    to_name: 'Muhammad Rezki Nur',
  }).then(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Terkirim!';
    btn.style.background = '#22c55e';
    status.style.cssText = 'display:block;background:rgba(34,197,94,.12);color:#4ade80;border:1px solid rgba(34,197,94,.25);padding:12px 16px;border-radius:8px;font-size:.85rem;font-weight:600;';
    status.textContent = '✅ Pesan kamu sudah sampai — terima kasih sudah menyapa.';
    ['contact-name','contact-email','contact-subject','contact-message'].forEach(id => document.getElementById(id).value = '');
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Pesan';
      btn.style.background = ''; btn.disabled = false;
    }, 4000);
  }).catch(() => {
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Pesan';
    btn.disabled = false;
    status.style.cssText = 'display:block;background:rgba(239,68,68,.12);color:#f87171;border:1px solid rgba(239,68,68,.25);padding:12px 16px;border-radius:8px;font-size:.85rem;font-weight:600;';
    // Sembunyikan error teknis — tampilkan pesan umum saja
    status.textContent = '❌ Pengiriman belum berhasil. Coba lagi sebentar, atau hubungi saya langsung lewat email di atas.';
  });
}

/* ---- Music ----
   Source of truth = music.paused (the real <audio> state), not a separate boolean
   that can drift out of sync if play() fails. UI updates live in syncMusicUI(),
   bound to the audio element's own events, so Play/Pause/Enter-Portfolio/autoplay-block
   all converge on the same, always-correct button/label state. */
const music      = document.getElementById('bgMusic');
const musicBtn   = document.getElementById('music-btn');
const musicLabel = document.getElementById('music-label');

function syncMusicUI() {
  if (!music || !musicBtn || !musicLabel) return;
  const isPlaying = !music.paused && !music.ended;
  musicBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-music"></i>';
  musicLabel.style.display = isPlaying ? 'block' : 'none';
}

if (music) {
  music.addEventListener('play', syncMusicUI);
  music.addEventListener('pause', syncMusicUI);
  music.addEventListener('ended', syncMusicUI);
  music.addEventListener('error', () => {
    // Fires on 404 / unsupported format / decode / network errors.
    // Never breaks the page — Music Player just stays in its normal "off" state.
    console.warn('Audio gagal dimuat (file tidak ditemukan, format tidak didukung, atau network error). Website tetap berjalan normal.');
    syncMusicUI();
  });
  syncMusicUI(); // correct initial state on page load, before any interaction
}

function toggleMusic() {
  if (!music) return;
  if (music.paused) {
    music.play().catch(() => {
      console.warn('Audio autoplay blocked oleh browser.');
      syncMusicUI();
    });
  } else {
    music.pause();
  }
  // No manual UI writes here — the 'play'/'pause' event listeners above
  // update the button/label only once the audio's real state has changed.
}

/* ---- Content Protection (deterrence only — not absolute security) ----
   Scope: reduce casual copying of portfolio images and casual view-source
   attempts. Does NOT block: form inputs/textareas, keyboard navigation,
   text selection/copy of page content, scrolling, or mobile touch.
   A determined visitor can still access DevTools via the browser menu —
   this is deterrence, not a guarantee (see security report). */
(function () {
  // Prevent right-click / drag on <img> elements only (not the whole page,
  // so contact info / bio text remain normally selectable and copyable).
  document.addEventListener('contextmenu', (e) => {
    if (e.target && e.target.tagName === 'IMG') e.preventDefault();
  });
  document.addEventListener('dragstart', (e) => {
    if (e.target && e.target.tagName === 'IMG') e.preventDefault();
  });

  // Light deterrence for common "view source / inspect" shortcuts.
  // Skipped entirely while focus is in a form field, so typing/shortcuts
  // inside the contact form are never affected.
  document.addEventListener('keydown', (e) => {
    const tag = (document.activeElement && document.activeElement.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    const key = e.key ? e.key.toUpperCase() : '';
    const blockCombo =
      key === 'F12' ||
      (e.ctrlKey && e.shiftKey && (key === 'I' || key === 'J' || key === 'C')) ||
      (e.ctrlKey && (key === 'U' || key === 'S'));

    if (blockCombo) e.preventDefault();
  });
})();
