# Task aktif

Task aktif: perbaiki error refresh cart drawer, 2026-10-29. Perbaikan dan pemeriksaan lokal selesai; transaksi toko/browser belum diverifikasi.

`assets/commerce.js`: refresh section memakai URL halaman aktif (beserta locale/query preview), bukan `/cart` yang tidak merender drawer menurut `layout/theme.liquid`. Bundled rendering memakai konteks yang sama. Refresh sukses membersihkan error lama; kegagalan nyata tetap ditampilkan. Mutation sukses tidak diulang ketika section gagal dirender. Tidak mengubah tampilan atau schema.

Validasi: Node VM regression checks untuk drawer dan cart page, locale/preview, null-section fallback, satu mutation dan pembersihan error lulus. Syntax/diff bersih; Theme Check tanpa temuan. Pemeriksaan jaringan toko dan browser/Theme Editor belum dilakukan. Sumber: [Cart API](https://shopify.dev/docs/api/ajax/reference/cart), [Section Rendering API](https://shopify.dev/docs/api/ajax/section-rendering).

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
