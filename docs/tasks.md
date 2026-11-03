# Task aktif

Task aktif: Journal card page scrolling, 2026-11-03. Perbaikan lokal selesai; browser belum diverifikasi.

Kartu teks Journal bukan nested scroll container: assets/theme-motion.css memakai overflow:clip, dan data-lenis-prevent dihapus dari face kartu di sections/journal-stories.liquid. Wheel/touch tidak lagi dialihkan ke scroll lokal kartu. Desain, ukuran kartu, perpindahan Swiper dan animasi section tetap. Konten yang melampaui face tetap terpotong, sehingga caption merchant perlu muat dalam kartu.

Validasi: Theme Check zero findings, CSS format/diff bersih. Pemeriksaan kode memastikan tidak ada overflow:auto/data-lenis-prevent pada face Journal. Perilaku wheel/touch di browser belum diuji langsung.

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
