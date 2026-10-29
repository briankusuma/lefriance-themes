# Task aktif

Task aktif: GSAP intro dan audit kompatibilitas motion, 2026-10-29. Selesai lokal.

Mapping: loading copy → GSAP SplitText pada salinan aria-hidden; sequence/wordmark → timeline GSAP di `hero-intro.js`; baseline/mask → `hero-editorial.css`; library loader dan scroll locks → `theme-motion.js`/`layout/theme.liquid`. Tetap memakai aset frame Figma [3722:1658](https://www.figma.com/design/C2rhn7BP2nXA0LyByRDn09/Speedtest?node-id=3722-1658), dengan urutan [3722:1757](https://www.figma.com/design/C2rhn7BP2nXA0LyByRDn09/Speedtest?node-id=3722-1757). Timing ~7.9 detik mengikuti permintaan perlambatan, bukan keyframes Figma. Intro aktif tiap reload; editor/reduced motion/no-JS tetap hero akhir.

GSAP core + SplitText 3.15.0 readable/local, on demand (~47 KB gzip), dengan notices dan manifest lisensi. Wordmark naik dari garis tanpa gap. Lenis satu-satunya page scroll engine; lock bersama intro/modal/menu mencegah resume prematur. Loader Swiper menolak request async yang sudah digantikan; Material Story mengabaikan hasil filter lama. Audit semua script section tidak menemukan kebutuhan mengubah slider lain.

Validasi lokal: Theme Check tanpa temuan; browser 101/101 checks Material Story/Featured Collections/Journal/footer, 14/14 galeri produk, 30/30 integrasi GSAP–Lenis/baseline/reconnect/cleanup. Fallback intro diperiksa ulang pada 390/1440px. Tidak mengklaim kelulusan Theme Editor asli, screen reader, perangkat nyata atau Lighthouse toko.

Sumber: [GSAP context](https://gsap.com/docs/v3/GSAP/gsap.context()/), [SplitText](https://gsap.com/docs/v3/Plugins/SplitText/), [Lenis](https://github.com/darkroomengineering/lenis), [Shopify performance](https://shopify.dev/docs/storefronts/themes/best-practices/performance). Lisensi/aset: [motion libraries](vendor/motion-libraries.md).

## Isi untuk pekerjaan berikutnya

- Target: nama section, file, task ID, atau URL Figma.
- Tujuan:
- Batasan:
- Kriteria selesai:
- Status: belum dimulai.
- Hasil dan validasi: belum dikerjakan.
- Sisa pekerjaan/hambatan:

## Cara eksekusi

- Chat **eksekusi task** membaca target aktif di atas. Bila kosong/sudah selesai, jangan menjalankan backlog otomatis.
- Instruksi langsung atau link Figma dengan konteks implementasi mengalahkan target lama. Pengguna tidak wajib mengisi format ini.
- Analisis saja tidak mengizinkan implementasi. Ikuti AGENTS.md dan baca standar yang relevan.
- Setelah bekerja, perbarui hasil singkat, pemeriksaan yang benar-benar dilakukan dan sisa pekerjaan. Jangan menumpuk laporan lama, JSON hasil test, screenshot, atau salinan seluruh checklist.
- Pertahankan pekerjaan yang belum selesai. Git menyimpan riwayat perubahan; arsip dokumentasi tambahan hanya dibuat bila diminta pengguna.

## Prioritas yang belum selesai

- QA toko: Theme Editor, native forms/checkout/cart, accessibility dan Lighthouse dengan konten nyata.
- Audit fitur produk/koleksi/search/cart terhadap checklist; jangan menganggap styling sudah melengkapi seluruh fitur.
- Release: hak aset Figma, identitas/support tema, demo store dan pemeriksaan seluruh persyaratan resmi.

Prioritas ini bukan perintah untuk langsung dikerjakan. Target berikutnya tetap ditentukan pengguna.
