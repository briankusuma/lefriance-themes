# Task aktif

Task aktif: Footer scroll reveal, 2026-11-02. Implementasi/validasi lokal selesai; visual browser dan live editor belum diverifikasi.

Target: existing footer `3660:1365`, simplified per latest instruction. When footer top reaches90% of viewport, play automatically on entry; reset when scrolling up past the start and replay on re-entry: ornament lines0→100% over1.4s, then content/gallery/newsletter rise from below. Wordmark now moves as one HTML wrapper instead of SVG paths, retaining original geometry and bottom crop. No scrub, pin, extra scroll height, new assets or dependencies; existing core-only GSAP/ScrollTrigger loader, no SplitText. Focus completes playback; editor selection/reduced motion/failure/no-JS stay static. Gallery state and newsletter settings unchanged.

Validation: actual GSAP timeline test verifies lines finish before content starts, whole wordmark reaches visible final state, untouched SVG paths, reset/restart state, no scrub/pin, focus completion and reduced/custom fallback. Actual matchMedia regression and rendered DOM lifecycle tests pass. Theme Check result recorded in checklist. Browser rendering, mobile/editor/native newsletter and Lighthouse remain unverified. Timing follows the current user instruction; Figma frame has no motion keyframes.

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
