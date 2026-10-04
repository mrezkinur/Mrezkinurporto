
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

/* ---- CV Mini (hologram) — dibuka dari tombol Hero ---- */
let cvMiniLastFocus = null;
let cvMiniHideTimer = null;
let cvMiniIsOpen = false;
function openCvMini() {
  const modal = document.getElementById('cvmini-modal');
  if (!modal || cvMiniIsOpen) return;
  cvMiniIsOpen = true;
  clearTimeout(cvMiniHideTimer);
  cvMiniLastFocus = document.activeElement;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  const trigger = document.getElementById('cvMiniTrigger');
  if (trigger) trigger.setAttribute('aria-expanded', 'true');
  const scroller = modal.querySelector('.cvm-scroll');
  if (scroller) scroller.scrollTop = 0;
  requestAnimationFrame(() => modal.classList.add('open'));
  setTimeout(() => { const b = modal.querySelector('.cvm-close'); if (b) b.focus(); }, 50);
}
function closeCvMini() {
  const modal = document.getElementById('cvmini-modal');
  if (!modal || !cvMiniIsOpen) return;
  cvMiniIsOpen = false;
  modal.classList.remove('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  const trigger = document.getElementById('cvMiniTrigger');
  if (trigger) trigger.setAttribute('aria-expanded', 'false');
  cvMiniHideTimer = setTimeout(() => {
    modal.classList.add('hidden');
    if (cvMiniLastFocus && cvMiniLastFocus.focus) cvMiniLastFocus.focus({ preventScroll: true });
  }, 320);
}
document.addEventListener('keydown', (e) => {
  if (!cvMiniIsOpen) return;
  if (e.key === 'Escape') { closeCvMini(); return; }
  if (e.key !== 'Tab') return;
  /* Focus trap sederhana: Tab tetap berputar di dalam modal selama terbuka */
  const modal = document.getElementById('cvmini-modal');
  const focusables = modal.querySelectorAll('button, a[href], [tabindex="0"]');
  if (!focusables.length) return;
  const first = focusables[0], last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  else if (!modal.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
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
/* Cache offset harus ikut diperbarui saat tinggi halaman berubah setelah load awal
   (daftar sertifikat dirender belakangan, gambar/font selesai dimuat, dsb.); kalau tidak,
   penanda menu aktif bisa meleset ke section di bawahnya. */
window.addEventListener('load', cacheSectionOffsets);
if ('ResizeObserver' in window) {
  new ResizeObserver(cacheSectionOffsets).observe(document.body);
}

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
   sudah digantikan Security.sanitize() di bawah serta certEscapeHtml() lebih jauh ke bawah) juga dihapus dengan alasan sama. ---- */

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
