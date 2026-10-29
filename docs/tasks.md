# Task aktif

Task aktif: ganti green-sofa-front dengan sofa-full, 2026-10-29. Selesai lokal.

`hero-editorial.liquid` memakai aset user `sofa-full.png` (515 x 573, alpha). `hero-intro.js` mempertahankan anchor/timing tetapi menghitung tinggi dari metadata rasio gambar; radius akhir 0. CSS contain menjaga seluruh kaki/sandaran tidak terpotong. Display-text tetap lebih dahulu, final background hanya berganti setelah sofa tiba di kanan. Ini follow-up aset dari pengguna; proporsi baru bukan strip lama Figma.

Validasi: syntax/diff dan Theme Check bersih; 28/28 browser checks mobile/desktop lulus, mencakup sumber/aspect/contain/no clipping, posisi dalam frame, timing wordmark sebelum background dan cleanup. Live Theme Editor/perangkat nyata/Lighthouse belum diuji. [Shopify asset_img_url](https://shopify.dev/docs/api/liquid/filters/asset_img_url).

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
