# Task aktif

Task aktif: Footer gallery autoplay, 2026-11-03. Implementasi lokal selesai; visual browser/live editor belum diverifikasi.

Target Figma3660:1410, existing footer-gallery/Swiper. Existing square/blur/caption/active pagination treatment retained. Footer group has4 editable media blocks using only Journal defaults: journal-balance, journal-workshop, journal-finishing-generated and journal-timber-generated. Uploaded block image overrides selected reference photo; references require existing use_reference_images setting. No new image files. Images follow the latest explicit request to reuse Journal assets.

Autoplay5s, existing fade/rewind, editable Rotate photos automatically. No gallery buttons; noninteractive dots track the active slide. Pause while hovered/offscreen/hidden tab; keyboard focus pauses and Space toggles playback. Reduced motion disables autoplay; editor preview rotates until a media block is selected. Block selection still changes slide. Existing footer reveal and mobile email→heading→brand order preserved.

Fix terbaru: bundle Swiper sebelumnya tidak memuat modul Autoplay meskipun adapter mengonfigurasikannya. Entry/bundle14.3.0 rebuilt dengan Autoplay, archive SHA512 diperiksa dan manifest hash diperbarui. syncAutoplay tidak memulai ulang timer yang sudah berjalan. Caption4 blok terisi; richtext default untuk blok baru dan fallback ke image_caption section untuk caption kosong. Semua tetap editable melalui Studio photo → Caption.

Validation: actual shipped Swiper Autoplay advances6 times across4 slides with rescheduling/stop tested using controlled timers and minimal environment; no mock autoplay object for that test. Adapter visibility/focus/keyboard checks separately mocked. Caption data/schema/assets checked. Theme Check zero findings; syntax/format/diff checked. Browser visual transitions, mobile/editor and Lighthouse still pending. No deployment/push.


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
