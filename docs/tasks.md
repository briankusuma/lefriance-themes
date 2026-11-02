# Task aktif

Task aktif: Catalog filter styling, 2026-11-02. Implementasi/validasi lokal selesai; visual browser dan live editor belum diverifikasi.

Target: rapikan bar filter/sort koleksi dan search sesuai screenshot masalah dan token katalog existing. CSS scoped di assets/theme-features.css: kontrol44px, font0.875rem, grup filter kompak, sorting rata kanan dengan label inline, divider#E5E3D3, input radius10.66px dan tombol brown existing. Native details/GET/filter/sorting tidak diubah; focus-visible global tetap. Mobile membungkus dua kolom filter dan sorting/tombol full width. Bar active filters kosong tidak menyisakan baris gap.

Validation: CSS formatting/diff checked; no Liquid/JSON or Shopify behavior changes. Browser visual/keyboard/mobile verification pending. Layout responsive diturunkan dari style existing sesuai permintaan pengguna, tanpa frame Figma baru.

Carry forward: metadata author/doc/support untuk tema lafrience masih menunggu data pengguna; native commerce additions sudah diuji lokal tetapi live APIs/checkout/editor/a11y/performance belum lulus. Hak distribusi aset Figma dan QA animasi/freeze/cart sebelumnya tetap terbuka. Tidak ada push/publish/deploy.

Sumber: [inline_asset_content](https://shopify.dev/docs/api/liquid/filters/inline_asset_content), [checkbox schema](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings#checkbox).

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
