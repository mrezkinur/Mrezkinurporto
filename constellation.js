/* ======================================================
   HOW I WORK — Professional Constellation
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

/* Coordinates must stay in sync with the CSS positions in css/constellation.css
   (data-i selectors). Modeled loosely on the real Cancer constellation asterism
   (Iota Cancri -> Asellus Borealis/Gamma -> Asellus Australis/Delta, the hub near
   the Beehive Cluster -> Al Tarf/Beta -> Acubens/Alpha), traced as one continuous
   path since our 7 nodes need a single cycle rather than Cancer's forked stick figure. */
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

/* Catmull-Rom -> cubic Bezier for one segment (p1 -> p2), using the points
   before/after it for tangent continuity. Because the 7 nodes form a closed
   cycle, neighbors wrap around (index -1 = last node, index 7 = first node),
   so every segment — the 6 chain links AND the loop back to node 0 — is one
   uninterrupted smooth curve with no sharp joints at the nodes. */
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
    const isLoop = (i === n - 1); // segment from the last node back to node 0
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
  // Pre-select Observation so the detail panel and cycle highlighting
  // are never empty, and screen-reader users landing on the section
  // immediately get textual context.
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
