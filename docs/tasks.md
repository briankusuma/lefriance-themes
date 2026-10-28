# Task aktif

Task aktif: intro homepage dari Figma [3722:1757](https://www.figma.com/design/C2rhn7BP2nXA0LyByRDn09/Speedtest?node-id=3722-1757), 2026-10-28. Selesai implementasi dan validasi lokal.

Mapping: sequence → `hero-editorial.liquid`, `hero-editorial.css`, `hero-intro.js`; motion-pre → aset lokal `hero-motion-pre.jpg`; pilihan enable/once/image/colors → schema section. Memakai kartu/wordmark/navbar existing, tanpa library baru.

Hasil: text/progress reveal, kartu bergerak ke kiri bawah, bidang hijau menyusut ke kanan, empty room crossfade ke hero furnished, garis kemudian wordmark dan navbar turun. Default homepage aktif sekali per session; skip/Escape, cleanup, no-JS, editor dan reduced motion menampilkan hero akhir. Theme Check tanpa temuan. Browser lokal 390/1440px: 14 skenario normal/editor/disabled/no-JS/skip/reduced-motion/repeat lulus; tanpa error/overflow, scroll/inert/animasi dibersihkan. Urutan normal juga diamati pada desktop dan mobile. Timing dan mobile diturunkan dari langkah statis Figma; lihat [brief](project-brief.md). Live Theme Editor, perangkat nyata dan Lighthouse belum diuji.

Dokumentasi Shopify: [asset_img_url](https://shopify.dev/docs/api/liquid/filters/asset_img_url), [input settings](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings), [requirements](https://shopify.dev/docs/storefronts/themes/store/requirements).

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
