# Task aktif

Task aktif: Journal active-number reverse, 2026-11-03. Perbaikan dan regresi lokal selesai; browser belum diverifikasi.

Target: angka Journal tidak hilang saat reverse dan brown plane mengecil ke nomor slide aktif (04/06/dll), bukan posisi tetap/default. assets/journal-stories.js: fill/ink dirender melalui quickSetters dari state scalar reversible dan activeIndex, sehingga cached CSS custom property tidak mewariskan warna putih ke kotak terang. Sequential fill dimulai dari active item lalu mengikuti urutan melingkar. Plane collapse memakai dynamic fromTo ke posisi nomor aktif; perubahan selection menginvalidasi collapse/visibility tanpa restart timeline/Swiper. Pilihan slide dan scroll playhead dipertahankan.

Validasi: actual GSAP object timeline regression menguji active02 awal, pindah04/06/01/04, reverse sampai collapse/full plane, fill/ink semua angka terbaca dan posisi plane tepat nomor aktif. Existing card-neighbor/gap21px/final/reverse/fallback/cleanup checks pass. Syntax/Prettier/diff bersih; Theme Check result dicatat di checklist. Tes bukan CSS rendering/scroll browser; visual desktop/mobile/editor masih perlu konfirmasi.

Carry forward: metadata author/doc/support untuk tema lafrience masih menunggu data pengguna; native commerce additions sudah diuji lokal tetapi live APIs/checkout/editor/a11y/performance belum lulus. Hak distribusi aset Figma dan QA animasi/freeze/cart sebelumnya tetap terbuka. Tidak ada push/publish/deploy.

Sumber: [Shopify app blocks dan wrapper](https://shopify.dev/docs/storefronts/themes/architecture/blocks/app-blocks).

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
