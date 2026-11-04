# Task aktif

Task aktif: Product recommendation cards, 2026-11-04. Perbaikan dan tes lokal selesai; Shopify/browser live belum diverifikasi.

Finding: section previously emitted no card markup until native recommendations API returned nonempty products, with silent empty/error behavior. Public product HTML inspected did not expose the current product/section, so no claim of live API diagnosis. New section renders real product-card fallback server-side: native recommendations first, merchant fallback_products next; related only can use chosen fallback_collection or collections.all (enabled by default and explicit in current product template). Excludes current product, respects limit, no fake/duplicate cards. Complementary does not use generic catalog fallback; assign native complementary or merchant fallback products.

Loader upgrades rendered fallback to native results, keeps fallback on empty/error, uses locale route, importNode and idempotent connection guard. Merchant can edit fallback products/collection/checkbox via existing section settings. Existing card/grid style reused; no new Figma layout. Empty catalog or catalog-only-current-product renders no fake section.

Validation: Theme Check zero findings, JS syntax/Prettier/diff clean. Real Liquid with existing product-card/price snippets verifies native/manual/catalog priority, image/title/price, exclusion, counts/limits, empty/disabled/chosen-collection/complementary states. Loader mock responses verify locale URL, native upgrade, empty/error fallback preservation, no duplicate init and abort/disconnect. Live native recommendations, Theme Editor, browser/mobile/a11y/Lighthouse pending. No publish/push.

Carry forward: metadata author/doc/support untuk tema lafrience masih menunggu data pengguna; native commerce additions sudah diuji lokal tetapi live APIs/checkout/editor/a11y/performance belum lulus. Hak distribusi aset Figma dan QA animasi/freeze/cart sebelumnya tetap terbuka. Tidak ada push/publish/deploy.

Sumber: [Shopify recommendations API](https://shopify.dev/docs/api/ajax/reference/product-recommendations), [recommendations object](https://shopify.dev/docs/api/liquid/objects/recommendations), [input settings](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings).

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
