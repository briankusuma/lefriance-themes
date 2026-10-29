# Task aktif

Task aktif: samakan blur thumbnail loading, 2026-10-29. Implementasi dan pemeriksaan lokal selesai; visual browser belum diverifikasi.

Figma `3722:1633` → kartu detail di `sections/hero-editorial.liquid`. Export PNG asli 3× (442 × 442) disimpan sebagai `assets/hero-detail-blurred.png`, termasuk frame putih, blur bertekstur dan fade putih. CSS menempatkan export memenuhi kartu; overlay blur hanya dipertahankan untuk upload custom/placeholder. Tidak mengubah timing reveal atau urutan intro sebelumnya.

Validasi: export diperiksa terhadap screenshot sumber; render Liquid default/tanpa JS/custom dan dimensi aset lulus. Theme Check tanpa temuan; CSS formatting dan diff bersih. Browser/Theme Editor belum diperiksa karena pembatasan sesi Computer Use sebelumnya. API: [asset_img_url](https://shopify.dev/docs/api/liquid/filters/asset_img_url). Replay intro/timing sebelumnya tetap memerlukan QA visual.

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
