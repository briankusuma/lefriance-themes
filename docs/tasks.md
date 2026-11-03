# Task aktif

Task aktif: Wide-screen layout consistency, 2026-11-03. Perbaikan kode dan tes lokal selesai; visual browser belum diverifikasi.

Scope: audit shared layout and section styles (31 Liquid section files including groups/endpoints), focus on screenshots Material story/Collection collage/Featured collections/Journal. Shared width token follows existing page/container/margins; header and page-shell now also respect container maximum. Full-width backgrounds remain; no merchant width settings overwritten. Four scroll scenes use a bounded desktop frame height derived from existing1433:1092 content/canvas proportions and center vertically on taller viewports. Existing scroll range/sticky/no-pin/Lenis/Swiper behavior retained.

Fixes: Material card width derives from bounded content, not unrestricted43.54vw; collage cells derive from same content width, not viewport, so4 columns remain square; custom collage host explicitly display:block. Journal initial brown plane uses dynamic fromTo geometry after refresh rather than cached initial set size. Material title/footer initial offsets also refresh through fromTo. Static/mobile sections retain existing grid/breakpoints; support pages/header share the global width limit. Footer, product, commerce and app markup not redesigned.

Validation: all local non-vendor CSS parsed; geometry model63 viewport/settings combinations (990 through3840px, container960/1440/1920, page1280/1535/1800) keeps cards/grid within content and stage within viewport. Actual GSAP Journal/Featured regression tests pass; Journal resize1535→2940 recalculates initial plane and reverse state. JS syntax/Prettier/diff pass; Theme Check CLI4.9.4 zero findings. These are CSS syntax/numeric/VM checks, not browser screenshots or Lighthouse. Live desktop/mobile visual, Theme Editor resize, keyboard and performance remain pending. No new Figma frame; wide-screen behavior derived from existing tokens and user screenshots.

Prior scoped work: Apps wrapper implementation retained; no real third-party app installed or tested.

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
