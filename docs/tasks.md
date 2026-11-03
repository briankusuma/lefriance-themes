# Task aktif

Task aktif: Footer gallery autoplay, 2026-11-03. Implementasi lokal selesai; visual browser/live editor belum diverifikasi.

Target Figma3660:1410, existing footer-gallery/Swiper. Existing square/blur/caption/active pagination treatment retained. Footer group now has5 editable media blocks reusing material-story-room, journal-workshop, journal-balance, journal-finishing-generated and journal-timber-generated. Uploaded block image overrides selected reference photo; references require existing use_reference_images setting. No new image files. Original design photo remains first; additional photos follow user's explicit reuse instruction.

Autoplay5s, existing fade/rewind, editable Rotate photos automatically. Pause/play control; pause while hovered/offscreen/hidden tab, stop on focus until explicit play, reduced motion/editor manual only. Block selection still changes slide. Existing footer reveal and mobile email→heading→brand order preserved.

Validation: Theme Check zero findings; JS syntax, Prettier and git diff clean. VM test with mocked Swiper covers5-slide autoplay configuration, visibility, pause/play, reduced motion, focus, selected slide and cleanup. Asset files/dimensions verified. Prior Liquid/DOM harness unavailable because temporary linkedom dependency was removed; no fresh DOM-render pass claimed. Desktop/mobile visual, native Swiper rendering and Theme Editor tests remain pending. Figma static frame has no timing;5s interval derived.

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
