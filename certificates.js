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
  /* ---- Ditambahkan: belum ada link akses permanen.
     `file` sementara diisi nama file lokal apa adanya — GANTI ke link
     akses pilihanmu (Drive/Credly/dsb.) sebelum publish. ---- */
  {
    title: 'Pemakalah, Seminar Nasional "Peran Perlindungan Tanaman dalam Mendukung Program Swasembada Pangan"',
    issuer: '',
    date: '',
    category: 'seminar',
    image: '',
    file: 'https://drive.google.com/file/d/1vzRF7QIHGi7URIApjzuQPUvZtfaK4OYm/view?usp=drive_link',
    download: ''
  },
  {
    title: 'Program Intensifikasi Bahasa Asing (PIBA)',
    issuer: '',
    date: '',
    category: 'training',
    image: '',
    file: 'sertifikat_piba.pdf',
    download: ''
  },
  {
    title: 'Pelatihan TOEFL bagi Calon Alumni',
    issuer: '',
    date: '',
    category: 'training',
    image: '',
    file: 'https://drive.google.com/file/d/1xP52iBq_bWZsVpGe3ze5ttPG8Mmdx-pY/view?usp=drive_link',
    download: ''
  },
  {
    title: 'Praktik Kerja Lapangan (PKL)',
    issuer: '',
    date: '',
    category: 'training',
    image: '',
    file: 'https://drive.google.com/file/d/1u6v1uodCLH4aLDg3hKNKQUc-aqIcAuaT/view?usp=drive_link',
    download: ''
  },
  {
    title: "Program Baca Tulis Al-Qur'an (BTQ)",
    issuer: '',
    date: '',
    category: 'training',
    image: '',
    file: 'https://drive.google.com/file/d/1TXLYE_NX-31jdALc8QWPFkwjvwcmucNm/view?usp=drive_link',
    download: ''
  },
  {
    title: 'Kuliah Kerja Nyata (KKN) Reguler Angkatan Ke-74',
    issuer: '',
    date: '',
    category: 'training',
    image: '',
    file: 'https://drive.google.com/file/d/1jRbea-q9kGOHEaMk1a8WbCoEO7QZPB2g/view?usp=drive_link',
    download: ''
  }
];

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str == null ? '' : String(str);
  return div.innerHTML;
}

/* ---- Scroll Reveal (same behavior as js/script.js) ---- */
const certsRevealObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 80);
  });
}, { threshold: .1 });

/* ---- Certificate category labels ----
   Only these two categories are shown, per the two-category structure
   requested. A cert whose category doesn't match either key is skipped
   (not guessed into a bucket) and logged below for the site owner to fix. */
const CERT_CATEGORY_LABELS = {
  training: 'Sertifikat Pelatihan',
  seminar: 'Sertifikat Seminar'
};
const CERT_CATEGORY_ORDER = ['training', 'seminar'];

function renderCertRow(cert) {
  const metaParts = [];
  if (cert.issuer) metaParts.push(escapeHtml(cert.issuer));
  if (cert.date) metaParts.push(escapeHtml(cert.date));
  const meta = metaParts.length
    ? `<p class="cert-meta">${metaParts.join(' &middot; ')}</p>`
    : '';

  const viewLink = cert.file
    ? `<a href="${escapeHtml(cert.file)}" target="_blank" rel="noopener noreferrer" class="cert-action" aria-label="View certificate: ${escapeHtml(cert.title)} (opens in a new tab)">View Certificate <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>`
    : '';

  const downloadLink = cert.download
    ? `<a href="${escapeHtml(cert.download)}" download class="cert-action cert-action-secondary" aria-label="Download certificate: ${escapeHtml(cert.title)}">Download <i class="fas fa-download" aria-hidden="true"></i></a>`
    : '';

  return `
      <li class="cert-list-item">
        <div class="cert-info">
          <p class="cert-title">${escapeHtml(cert.title)}</p>
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
        <h2 class="certs-category-title">${escapeHtml(CERT_CATEGORY_LABELS[categoryKey])}</h2>
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
        `[certificates.js] "${cert.title}" dilewati: category harus "training" atau "seminar" (dapat: ${JSON.stringify(cert.category)}).`
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

/* ---- Sticky Header (mirrors js/script.js behavior) ---- */
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });
}

/* ---- Hamburger / Mobile Menu (mirrors js/script.js behavior) ---- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
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
}

/* ---- Reveal for static page content (hero). Certificate categories are
   already observed individually above as they're rendered. ---- */
document.querySelectorAll('.reveal:not(.certs-category)').forEach(el => certsRevealObs.observe(el));
