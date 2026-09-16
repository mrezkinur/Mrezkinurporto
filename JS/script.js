
/* ---- Header Sticky ---- */
/* Perf: dibatasi rAF + passive supaya tidak pernah menghambat scroll compositing
   native dan tidak berjalan lebih dari sekali per frame render. */
const header = document.getElementById('header');
let headerScrollTicking = false;
function updateHeaderScrolled() {
  header.classList.toggle('scrolled', window.scrollY > 20);
  headerScrollTicking = false;
}
window.addEventListener('scroll', () => {
  if (headerScrollTicking) return;
  headerScrollTicking = true;
  requestAnimationFrame(updateHeaderScrolled);
}, { passive: true });

/* ---- Modal Explore My Journey ---- */
const JOURNEY_DATA = {
  foundation: { label: 'Foundation', title: 'Madrasah Madani Alauddin Pao-Pao', desc: '' },
  experience: { label: 'Experience', title: 'PMI', desc: 'Pengalaman organisasi selama masa sekolah.' },
  education:  { label: 'Higher Education', title: 'UIN Alauddin Makassar', desc: 'S1 Biologi &middot; 2020&ndash;2025' },
  research:   { label: 'Research', title: 'Selected Research Experience', desc: 'Riset infestasi serangga, dipresentasikan di prosiding seminar nasional Perhimpunan Entomologi Indonesia.' },
  lab:        { label: 'Professional Exposure', title: 'Laboratory', desc: '&plusmn;5 bulan praktik langsung di laboratorium selama studi.' },
  now:        { label: 'Now', title: 'Helping Family Business', desc: 'Fokus saat ini: membantu bisnis keluarga, sambil terus belajar dan berkembang di berbagai bidang.' },
  data:       { label: 'Now &middot; Learning', title: 'Data', desc: 'Terus dipelajari sebagai bagian dari rutinitas belajar saat ini.' },
  biology:    { label: 'Now &middot; Learning', title: 'Biology', desc: 'Bidang sendiri yang tetap dijaga meski sudah tidak di bangku kuliah.' },
  web:        { label: 'Now &middot; Learning', title: 'Web Development', desc: 'Arah baru yang sedang ditekuni sambil jalan.' },
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

/* ---- Section About — Ganti Foto Profil ---- */
const ABOUT_PHOTOS = [
  { src: 'assets/profile/profile-s1.png', alt: 'Muhammad Rezki Nur' },
  { src: 'assets/profile/profile-red.png', alt: 'Muhammad Rezki Nur' },
  { src: 'assets/profile/profile-black.png', alt: 'Muhammad Rezki Nur' },
  { src: 'assets/profile/profile-blue.png', alt: 'Muhammad Rezki Nur' }
];
let aboutPhotoIndex = 0;
function switchAboutPhoto() {
  const img = document.getElementById('aboutProfilePhoto');
  const countEl = document.getElementById('aboutPhotoSwitchCount');
  const btn = document.getElementById('aboutPhotoSwitchBtn');
  if (!img) return;
  const nextIndex = (aboutPhotoIndex + 1) % ABOUT_PHOTOS.length;
  const next = ABOUT_PHOTOS[nextIndex];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const commitSwitch = () => {
    aboutPhotoIndex = nextIndex;
    const applyPhoto = () => { img.src = next.src; img.alt = next.alt; };
    if (reduceMotion) {
      applyPhoto();
    } else {
      img.classList.add('is-switching');
      setTimeout(() => {
        applyPhoto();
        img.classList.remove('is-switching');
      }, 220);
    }
    const pos = (aboutPhotoIndex + 1) + ' / ' + ABOUT_PHOTOS.length;
    if (countEl) countEl.textContent = pos;
    if (btn) btn.setAttribute('aria-label', 'Ganti foto profil — saat ini foto ' + pos);
  };
  /* Preload native sebelum commit: jika foto berikutnya gagal dimuat,
     foto yang sedang tampil tetap dipertahankan dan tidak ada yang crash. */
  const preload = new Image();
  preload.onload = commitSwitch;
  preload.onerror = () => {
    console.warn('[aboutPhoto] Gagal memuat: ' + next.src + ' — foto sebelumnya dipertahankan.');
  };
  preload.src = next.src;
}
const aboutPhotoSwitchBtn = document.getElementById('aboutPhotoSwitchBtn');
if (aboutPhotoSwitchBtn) aboutPhotoSwitchBtn.addEventListener('click', switchAboutPhoto);

/* ---- Modal Areas of Interest ---- */
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


/* ---- Skills Depth Map: klik track untuk menampilkan buktinya ---- */
function toggleDepthDetail(btn) {
  const card = btn.closest('.skill-item');
  if (!card) return;
  const isOpen = card.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

/* ---- Nav aktif ---- */
/* Perf: handler versi lama membaca s.offsetTop untuk setiap section di dalam
   listener scroll, sehingga memaksa layout recalculation sinkron pada setiap
   event scroll native — ini penyebab utama Hero scroll jank/stutter.
   Perbaikan: cache offsetTop tiap section sekali saja (dihitung ulang saat
   resize, agar breakpoint responsive tetap akurat), lalu handler scroll hanya
   membaca window.scrollY (yang tidak pernah memaksa layout) dan dibatasi
   rAF + passive sehingga berjalan maksimal sekali per frame dan tidak pernah
   menghambat scroll native. Style link nav hanya ditulis saat section aktif
   benar-benar berubah, bukan di setiap tick scroll. */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
let sectionOffsets = [];
function cacheSectionOffsets() {
  sectionOffsets = Array.from(sections).map(s => ({ id: s.id, top: s.offsetTop }));
}
cacheSectionOffsets();
window.addEventListener('resize', cacheSectionOffsets, { passive: true });

let activeNavSection = null;
let navScrollTicking = false;
function updateActiveNav() {
  let cur = '';
  const y = window.scrollY;
  sectionOffsets.forEach(s => { if (y >= s.top - 100) cur = s.id; });
  if (cur !== activeNavSection) {
    activeNavSection = cur;
    navLinks.forEach(l => { l.style.opacity = l.getAttribute('href') === '#' + cur ? '1' : ''; });
  }
  navScrollTicking = false;
}
window.addEventListener('scroll', () => {
  if (navScrollTicking) return;
  navScrollTicking = true;
  requestAnimationFrame(updateActiveNav);
}, { passive: true });

/* ---- DIHAPUS (kode dead, ditemukan saat audit): sistem thumbnail berbasis
   canvas (drawBiologyThumb/drawWebThumb/roundRect + listener window 'load'
   yang memanggilnya) dulu dipakai untuk menggambar dua thumbnail kartu
   Portfolio ke <canvas id="thumb1"/"thumb2">. Markup sekarang memakai
   thumbnail <img> biasa, jadi elemen canvas tersebut sudah tidak ada lagi
   di index.html — function-function ini tetap berjalan di setiap page load,
   tidak menemukan apa pun lewat getElementById, lalu langsung return. Tidak
   ada perilaku terlihat yang perlu dipertahankan, jadi seluruh blok dihapus
   daripada diterjemahkan.
   escapeHtml() (helper escape HTML sisa yang tidak pernah dipanggil —
   sudah digantikan Security.sanitize() di bawah serta escapeHtmlCS() /
   certEscapeHtml() lebih jauh ke bawah) juga dihapus dengan alasan sama. ---- */

/* ======================================================
   MODUL SECURITY — Validasi Input, Sanitasi,
   Proteksi XSS / SQLi
   ====================================================== */
const Security = (() => {
  // ── Sanitasi: escape entity HTML untuk mencegah XSS ──
  function sanitize(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#x27;').replace(/\//g,'&#x2F;')
      .replace(/`/g,'&#x60;').replace(/=/g,'&#x3D;');
  }

  // ── Hilangkan pola SQL injection yang mencurigakan (hanya bantuan di sisi client; wajib tetap divalidasi di server) ──
  function stripSQLi(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/('|--|;|\/\*|\*\/|xp_|exec\s|select\s|insert\s|drop\s|delete\s|update\s|union\s|char\s*\(|0x[0-9a-f]+)/gi, '');
  }

  // ── Validasi format email ──
  function isValidEmail(email) {
    return /^[^\s@]{1,64}@[^\s@]{1,253}\.[^\s@]{2,}$/.test(email);
  }

  // ── Validasi nama (huruf, spasi, tanda hubung, maks. 80 karakter) ──
  function isValidName(name) {
    return /^[a-zA-Z0-9\s\-'.]{1,80}$/.test(name);
  }

  // ── Safe text: sanitasi + hilangkan pola SQLi ──
  function safeText(str) {
    return sanitize(stripSQLi(str.trim()));
  }

  // ── Helper rate-limit untuk pengiriman form (maks. 3 kali kirim per 5 menit) ──
  const _submitLog = [];
  function canSubmit() {
    const now = Date.now();
    while (_submitLog.length && now - _submitLog[0] > 300000) _submitLog.shift();
    if (_submitLog.length >= 3) return false;
    _submitLog.push(now);
    return true;
  }

  // ── Validasi field form kontak (mengembalikan string error atau null) ──
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

  return { sanitize, safeText, isValidEmail, isValidName, canSubmit, validateContactForm };
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

  // Validasi
  const err = Security.validateContactForm(name, email, subject, message);
  if (err) {
    status.style.cssText = 'display:block;background:rgba(239,68,68,.12);color:#f87171;border:1px solid rgba(239,68,68,.25);padding:12px 16px;border-radius:8px;font-size:.85rem;font-weight:600;';
    status.textContent = err;
    return;
  }

  // Pembatasan rate
  if (!Security.canSubmit()) {
    status.style.cssText = 'display:block;background:rgba(239,68,68,.12);color:#f87171;border:1px solid rgba(239,68,68,.25);padding:12px 16px;border-radius:8px;font-size:.85rem;font-weight:600;';
    status.textContent = '⏳ Terlalu banyak permintaan. Harap tunggu beberapa menit.';
    return;
  }

  // Sanitasi sebelum dikirim
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
    status.style.cssText = 'display:block;background:rgba(34,197,94,.12);color:#779EC5;border:1px solid rgba(34,197,94,.25);padding:12px 16px;border-radius:8px;font-size:.85rem;font-weight:600;';
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

/* ---- Content Protection (hanya sebagai pencegah — bukan keamanan mutlak) ----
   Cakupan: mengurangi percobaan copy-paste gambar portfolio dan percobaan
   view-source biasa. TIDAK memblokir: input/textarea form, navigasi keyboard,
   seleksi/copy teks konten halaman, scroll, atau touch di mobile.
   Pengunjung yang memang berniat tetap bisa mengakses DevTools lewat menu
   browser — ini pencegah, bukan garansi (lihat laporan keamanan). */
(function () {
  // Cegah klik-kanan / drag hanya pada elemen <img> (bukan seluruh halaman,
  // agar info kontak / teks bio tetap bisa diseleksi dan disalin seperti biasa).
  document.addEventListener('contextmenu', (e) => {
    if (e.target && e.target.tagName === 'IMG') e.preventDefault();
  });
  document.addEventListener('dragstart', (e) => {
    if (e.target && e.target.tagName === 'IMG') e.preventDefault();
  });

  // Pencegah ringan untuk shortcut "view source / inspect" yang umum dipakai.
  // Dilewati sepenuhnya saat fokus berada di form field, jadi mengetik/shortcut
  // di dalam form kontak tidak pernah terpengaruh.
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

/* ---- Stat Hero: jumlah proyek disinkronkan otomatis dari DOM Portfolio ---- */
(function () {
  const statEl = document.getElementById('stat-project-count');
  const count = document.querySelectorAll('.portfolio-grid .p-card').length;
  if (statEl && count > 0) statEl.textContent = count + '+';
})();

/* ---- Job Status Indicator: titik berkedip di sebelah tombol Hero "CV Universal" ---- */
function toggleJobStatusTip(e) {
  e.preventDefault();
  e.stopPropagation();
  const tip = document.getElementById('jobStatusTip');
  if (tip) tip.classList.toggle('show');
}
document.addEventListener('click', (e) => {
  const tip = document.getElementById('jobStatusTip');
  const dot = document.querySelector('.job-status-dot');
  if (!tip || !dot) return;
  if (!dot.contains(e.target) && !tip.contains(e.target)) {
    tip.classList.remove('show');
  }
});


/* ======================================================
   DIGABUNGKAN DARI: JS/constellation.js (proses konsolidasi)
   ====================================================== */
/* ======================================================
   HOW I WORK — Constellation Profesional
   ====================================================== */

/* ---- Data ----
   Urutan array = urutan siklus (index 0..6).
   Node terakhir (index 6) selalu terhubung balik ke index 0 (loop).
*/
const constellationSkills = [
  {
    num: '01', title: 'Observation', subtitle: 'Ketelitian Mengamati', primary: true,
    short: 'Kemampuan memperhatikan detail, kondisi, dan informasi sebelum mengambil kesimpulan atau tindakan.',
    inWork: 'Diterapkan setiap hari karna sudah kebiasaan memperhatikan detail kecil, diperoleh selama perkulihaan dengan dasar pemikiran "observasi adalah hal terpenting untuk memastikan segala hal dalam kehidupan".'
  },
  {
    num: '02', title: 'Analytical Thinking', subtitle: 'Berpikir Analitis', primary: false,
    short: 'Kemampuan mengolah informasi secara terstruktur untuk memahami situasi dan menemukan hubungan antarhal.',
    inWork: 'Digunakan untuk memecah data atau permasalahan menjadi bagian-bagian yang lebih mudah dipahami sebelum menentukan langkah.'
  },
  {
    num: '03', title: 'Problem Solving', subtitle: 'Pemecahan Masalah', primary: true,
    short: 'Kemampuan menggunakan pemahaman dan analisis untuk mencari pendekatan yang tepat terhadap suatu masalah.',
    inWork: 'Muncul saat mencari solusi paling tepat, dalam tantangan di lapangan dan laboratorium.'
  },
  {
    num: '04', title: 'Discipline', subtitle: 'Disiplin', primary: false,
    short: 'Kemampuan menjaga konsistensi dalam proses, pekerjaan, pembelajaran, dan penyelesaian tugas.',
    inWork: 'Terlihat dari konsistensi menyelesaikan proses belajar, pekerjaan sampai tuntas dan latihan fisik setiap hari. "bukan hanya bersemangat di awal".'
  },
  {
    num: '05', title: 'Responsibility', subtitle: 'Tanggung Jawab', primary: false,
    short: 'Kemampuan menjaga kepercayaan terhadap pekerjaan, proses, dan hasil yang menjadi tanggung jawab.',
    inWork: 'Diwujudkan dengan menjaga kualitas dan hasil kerja tetap dapat dipertanggungjawabkan, di peroleh dari pengalaman magang dan PKL serta KKN.'
  },
  {
    num: '06', title: 'Adaptability', subtitle: 'Kemampuan Beradaptasi', primary: false,
    short: 'Kemampuan menyesuaikan diri terhadap kondisi, lingkungan, tantangan, dan kebutuhan baru.',
    inWork: 'Terbukti dengan menyelesaikan akademik Biologi dengan struggle anak ke-2 dan tetap melakukan latihan fisik. adapun karna mampu mengerjakan penelitian lapangan dan laboratorium, pencapaian terbesar bisa beradaptasi penelitian lapangan di gunung latimojong.'
  },
  {
    num: '07', title: 'Continuous Learning', subtitle: 'Pembelajaran Berkelanjutan', primary: true,
    short: 'Kemauan untuk terus belajar, mengembangkan kemampuan, dan memperbaiki cara kerja.',
    inWork: 'Dijalankan lewat kebiasaan mempelajari hal baru dan sertifikasi, modal untuk terus memperbaiki cara mengamati dan bekerja.'
  }
];

/* Koordinat ini harus tetap sinkron dengan posisi CSS (selector data-i) di
   bagian "HOW I WORK — Professional Constellation" pada CSS/style.css.
   Polanya mengacu secara longgar pada asterisma konstelasi Cancer yang asli
   (Iota Cancri -> Asellus Borealis/Gamma -> Asellus Australis/Delta, titik pusat
   di dekat Beehive Cluster -> Al Tarf/Beta -> Acubens/Alpha), digambar sebagai
   satu jalur menyambung karena 7 node kita butuh satu siklus tertutup, bukan
   bentuk cabang seperti pada Cancer aslinya. */
const constellationCoords = {
  desktop: [
    { x: 71, y: 4  }, { x: 64, y: 30 }, { x: 66, y: 52 }, { x: 34, y: 78 },
    { x: 4,  y: 96 }, { x: 52, y: 100 }, { x: 94, y: 82 }
  ],
  mobile: [
    { x: 58, y: 4  }, { x: 38, y: 20 }, { x: 52, y: 38 }, { x: 18, y: 56 },
    { x: 10, y: 76 }, { x: 42, y: 90 }, { x: 82, y: 70 }
  ]
};

function escapeHtmlCS(str) {
  const div = document.createElement('div');
  div.textContent = str == null ? '' : String(str);
  return div.innerHTML;
}

/* Catmull-Rom -> cubic Bezier untuk satu segmen (p1 -> p2), memakai titik
   sebelum/setelahnya agar arah kurva (tangent) tetap menyambung. Karena 7 node
   membentuk siklus tertutup, tetangga node "membungkus" (index -1 = node
   terakhir, index 7 = node pertama), sehingga setiap segmen — 6 sambungan
   rantai DAN loop balik ke node 0 — menjadi satu kurva halus tanpa sambungan
   tajam di titik node. */
function catmullRomSegment(p0, p1, p2, p3) {
  const c1x = p1.x + (p2.x - p0.x) / 6;
  const c1y = p1.y + (p2.y - p0.y) / 6;
  const c2x = p2.x - (p3.x - p1.x) / 6;
  const c2y = p2.y - (p3.y - p1.y) / 6;
  return `M${p1.x},${p1.y} C${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`;
}

function buildConstellationPaths(coords) {
  const n = coords.length;
  let html = '';
  for (let i = 0; i < n; i++) {
    const to = (i + 1) % n;
    const p0 = coords[(i - 1 + n) % n];
    const p1 = coords[i];
    const p2 = coords[to];
    const p3 = coords[(i + 2) % n];
    const isLoop = (i === n - 1); // segmen dari node terakhir kembali ke node 0
    const cls = isLoop ? 'constellation-loop' : 'constellation-link';
    html += `<path class="${cls}" data-from="${i}" data-to="${to}" d="${catmullRomSegment(p0, p1, p2, p3)}"></path>`;
  }
  return html;
}

function renderConstellation() {
  const nodesWrap = document.getElementById('constellationNodes');
  const linesDesktop = document.getElementById('constellationLinesDesktop');
  const linesMobile = document.getElementById('constellationLinesMobile');
  const descList = document.getElementById('constellationDesc');
  if (!nodesWrap || !linesDesktop || !linesMobile) return;

  nodesWrap.innerHTML = constellationSkills.map((s, i) => `
    <button type="button" class="constellation-node${s.primary ? ' is-primary' : ''}" data-i="${i}"
            aria-pressed="false" aria-describedby="cs-desc-${i}">
      <span class="constellation-dot" aria-hidden="true"></span>
      <span class="constellation-label">${escapeHtmlCS(s.title)}</span>
    </button>
  `).join('');

  linesDesktop.innerHTML = buildConstellationPaths(constellationCoords.desktop);
  linesMobile.innerHTML = buildConstellationPaths(constellationCoords.mobile);

  if (descList) {
    descList.innerHTML = constellationSkills.map((s, i) =>
      `<p id="cs-desc-${i}">${escapeHtmlCS(s.title)} — ${escapeHtmlCS(s.short)}</p>`
    ).join('');
  }
}

function setConstellationActive(index) {
  const canvas = document.getElementById('constellationCanvas');
  const nodes = document.querySelectorAll('.constellation-node');
  const links = document.querySelectorAll('.constellation-link, .constellation-loop');
  const detail = document.getElementById('constellationDetail');
  if (!canvas || !detail) return;

  const total = constellationSkills.length;
  const prev = (index - 1 + total) % total;
  const next = (index + 1) % total;

  canvas.classList.add('has-active');
  nodes.forEach(n => {
    const i = Number(n.dataset.i);
    n.classList.toggle('is-active', i === index);
    n.classList.toggle('is-related', i === prev || i === next);
    n.setAttribute('aria-pressed', i === index ? 'true' : 'false');
  });
  links.forEach(l => {
    const from = Number(l.dataset.from), to = Number(l.dataset.to);
    const touches = (from === index || to === index);
    l.classList.toggle('is-highlighted', touches);
  });

  const s = constellationSkills[index];
  detail.innerHTML = `
    <div class="constellation-detail-num">${escapeHtmlCS(s.num)} / 07</div>
    <div class="constellation-detail-title">${escapeHtmlCS(s.title)}<span>${escapeHtmlCS(s.subtitle)}</span></div>
    <p class="constellation-detail-text">${escapeHtmlCS(s.short)}</p>
    <p class="constellation-detail-text"><strong>How it appears in my work:</strong> ${escapeHtmlCS(s.inWork)}</p>
  `;
}

function initConstellation() {
  renderConstellation();
  // Pilih Observation sejak awal agar panel detail dan highlight siklus
  // tidak pernah kosong, dan pengguna screen-reader yang masuk ke section
  // ini langsung mendapat konteks teks.
  setConstellationActive(0);

  document.getElementById('constellationNodes').addEventListener('click', (e) => {
    const btn = e.target.closest('.constellation-node');
    if (!btn) return;
    setConstellationActive(Number(btn.dataset.i));
  });
}

if (document.getElementById('constellationCanvas')) {
  initConstellation();
}


/* ======================================================
   DIGABUNGKAN DARI: JS/certificates.js (proses konsolidasi)
   Penyesuaian yang dilakukan murni agar aman digabung ke satu
   scope global (tidak ada perubahan perilaku pada render sertifikat):
   - escapeHtml() diganti nama jadi certEscapeHtml() agar tidak
     mendeklarasikan ulang escapeHtml() yang sudah ada di atas
   - wiring header/hamburger/mobile-menu yang duplikat dihapus
     (sudah ditangani sekali secara global di atas)
   - registrasi reveal duplikat untuk konten statis dihapus
     (sudah tercakup oleh satu revealObs di atas)
   ====================================================== */
/* ======================================================
   CERTIFICATE ARCHIVE
   ====================================================== */

/* ---- Data ----
   Tambahkan sertifikat baru dengan menambahkan objek ke array ini.
   Field:
     title    (wajib)    nama sertifikat/pelatihan, apa adanya.
     issuer   (opsional) penerbit. Kosongkan '' jika belum dikonfirmasi
                          — baris ini otomatis disembunyikan jika kosong.
     date     (opsional) tahun/tanggal. Kosongkan '' jika belum dikonfirmasi.
     category (wajib)    'training' -> masuk grup "Sertifikat Pelatihan"
                          'seminar'  -> masuk grup "Sertifikat Seminar"
                          Isi berdasarkan data yang benar-benar diketahui.
                          Jika ragu, JANGAN menebak — sertifikat dengan
                          category kosong/tidak dikenali akan dilewati saat
                          render (lihat console warning) alih-alih ditampilkan
                          di kategori yang salah.
     image    (opsional) tidak dipakai lagi oleh tampilan list, aman dibiarkan.
     file     (wajib)    tautan untuk tombol "View Certificate"
                          (bisa file lokal atau URL eksternal).
     download (opsional) path file lokal untuk tombol "Download".
                          Hanya isi jika file tersebut benar-benar ada
                          di project. Kosongkan '' untuk menyembunyikan
                          tombol Download.
*/
const certificates = [
  {
    title: 'Microsoft excel',
    issuer: '',
    date: '',
    category: 'training',
    image: '',
    file: 'https://drive.google.com/file/d/1kyl-VNpe3Hh4Emc3N0cUKenM2G-GjERl/view',
    download: ''
  },
  {
    title: 'Data Fundamental',
    issuer: '',
    date: '',
    category: 'training',
    image: '',
    file: 'https://www.credly.com/badges/18bc6c2c-077a-45d3-8973-5886af5ef05e',
    download: ''
  },
  {
    title: 'Web Development Fundamentals',
    issuer: '',
    date: '',
    category: 'training',
    image: '',
    file: 'https://www.credly.com/badges/05327364-9165-45ae-8ce4-f859c281f025',
    download: ''
  },
  {
    title: 'AI Literacy',
    issuer: '',
    date: '',
    category: 'training',
    image: '',
    file: 'https://www.credly.com/badges/521a42bb-8dc2-4fcc-8c6a-6ace0d141b2b',
    download: ''
  },
  {
    title: 'Claude: AI Fluency',
    issuer: '',
    date: '',
    category: 'training',
    image: '',
    file: 'https://drive.google.com/file/d/1XxhGqsVERvv851Oz8E0oXrK9iEeRbNHy/view?usp=drive_link',
    download: ''
  },
  {
    title: 'Canva Design School',
    issuer: '',
    date: '',
    category: 'training',
    image: '',
    file: 'https://drive.google.com/file/d/17cSpojtGwZS-fYJ10m84b4Ho7ACZ_z22/view?usp=drive_link',
    download: ''
  },
  
 
];

function certEscapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str == null ? '' : String(str);
  return div.innerHTML;
}

/* ---- Scroll Reveal (perilaku sama seperti revealObs di atas) ---- */
const certsRevealObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 80);
  });
}, { threshold: .1 });

/* ---- Label kategori sertifikat ----
   Hanya dua kategori ini yang ditampilkan, sesuai struktur dua kategori
   yang diminta. Sertifikat dengan category yang tidak cocok dengan salah
   satu key akan dilewati (tidak ditebak masuk ke kategori mana pun) dan
   dicatat di console warning di bawah supaya pemilik situs bisa memperbaikinya. */
const CERT_CATEGORY_LABELS = {
  training: 'Sertifikat Pelatihan',
  seminar: 'Sertifikat Seminar'
};
const CERT_CATEGORY_ORDER = ['training', 'seminar'];

function renderCertRow(cert) {
  const metaParts = [];
  if (cert.issuer) metaParts.push(certEscapeHtml(cert.issuer));
  if (cert.date) metaParts.push(certEscapeHtml(cert.date));
  const meta = metaParts.length
    ? `<p class="cert-meta">${metaParts.join(' &middot; ')}</p>`
    : '';

  const viewLink = cert.file
    ? `<a href="${certEscapeHtml(cert.file)}" target="_blank" rel="noopener noreferrer" class="cert-action" aria-label="View certificate: ${certEscapeHtml(cert.title)} (opens in a new tab)">View Certificate <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>`
    : '';

  const downloadLink = cert.download
    ? `<a href="${certEscapeHtml(cert.download)}" download class="cert-action cert-action-secondary" aria-label="Download certificate: ${certEscapeHtml(cert.title)}">Download <i class="fas fa-download" aria-hidden="true"></i></a>`
    : '';

  return `
      <li class="cert-list-item">
        <div class="cert-info">
          <p class="cert-title">${certEscapeHtml(cert.title)}</p>
          ${meta}
        </div>
        <div class="cert-actions">${viewLink}${downloadLink}</div>
      </li>`;
}

function renderCategory(categoryKey, items) {
  const count = items.length === 1 ? '1 certificate' : `${items.length} certificates`;
  const rows = items.map(renderCertRow).join('');
  return `
    <div class="certs-category reveal">
      <div class="certs-category-header">
        <h2 class="certs-category-title">${certEscapeHtml(CERT_CATEGORY_LABELS[categoryKey])}</h2>
        <span class="certs-category-count">${count}</span>
      </div>
      <ul class="cert-list">${rows}</ul>
    </div>`;
}

/* ---- Render Certificate Directory (grouped list) ---- */
function renderCertificates() {
  const container = document.getElementById('certsGrid');
  const empty = document.getElementById('certsEmpty');
  if (!container) return;

  if (!certificates.length) {
    if (empty) empty.hidden = false;
    return;
  }

  const groups = { training: [], seminar: [] };
  certificates.forEach(cert => {
    if (groups[cert.category]) {
      groups[cert.category].push(cert);
    } else {
      console.warn(
        `[certificates] "${cert.title}" dilewati: category harus "training" atau "seminar" (dapat: ${JSON.stringify(cert.category)}).`
      );
    }
  });

  const nonEmptyCategories = CERT_CATEGORY_ORDER.filter(key => groups[key].length);

  if (!nonEmptyCategories.length) {
    if (empty) empty.hidden = false;
    return;
  }
  if (empty) empty.hidden = true;

  const html = nonEmptyCategories.map(key => renderCategory(key, groups[key])).join('');
  container.insertAdjacentHTML('afterbegin', html);
  container.querySelectorAll('.certs-category.reveal').forEach(el => certsRevealObs.observe(el));
}
renderCertificates();

/* ---- Catatan: elemen "reveal" statis pada certs-hero sudah otomatis
   tertangkap oleh revealObs milik script.js di bagian atas (karena sudah
   ada di DOM saat page load); hanya baris .certs-category yang dirender
   secara dinamis di atas yang perlu observe call eksplisit sendiri, dan itu
   sudah dilakukan di dalam renderCertificates(). ---- */
