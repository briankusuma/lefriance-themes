# Task aktif

Task aktif: green sofa-center sequence, 2026-10-29. Selesai implementasi dan validasi lokal.

Sumber: Figma [center 3725:1786](https://www.figma.com/design/C2rhn7BP2nXA0LyByRDn09/Speedtest?node-id=3725-1786), [urutan 3722:1757](https://www.figma.com/design/C2rhn7BP2nXA0LyByRDn09/Speedtest?node-id=3722-1757), corner 3725:1775.

Mapping: `hero-editorial.liquid` memakai file user `bg-header-center.png` sebagai default pre-room dan `green-sofa-front.png` pada surface. `hero-intro.js`/CSS: full green → mengecil di tengah menjadi sofa (274.995 x 70.797 pada 1535px) → bergerak kanan bawah dan berotasi 2.05° → crossfade ke hero furnished → garis dan huruf kanan-ke-kiri/navbar. Stage setelah readiness ~7.5 detik; timing diturunkan dari frame statis. Caption tetap real image load/decode + font readiness, kini termasuk aset baru, tanpa fake progress. Picker pre-room existing, no-JS/editor/reduced motion, skip/abort/cleanup tetap tersedia. Mobile aspect/minimum 96px dan posisi dijaga di dalam frame; tidak ada frame mobile Figma.

Validasi lokal: Theme Check bersih; syntax/diff dan tests resource readiness/load/error/abort lulus. Browser 390/1535px: 40/40 checks lulus; memeriksa center sebelum corner, ukuran/koordinat/rotasi Figma, crossfade setelah arrival, caption, wordmark dan cleanup. Visual center dibandingkan dengan screenshot Figma. Live Theme Editor/perangkat nyata/Lighthouse belum diuji. [Shopify asset_img_url](https://shopify.dev/docs/api/liquid/filters/asset_img_url). Provenance di [lisensi](third-party-licenses.md).

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
