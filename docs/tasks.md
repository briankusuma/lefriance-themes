# Task aktif

Task aktif: Journal scroll animation, 2026-11-02. Implementasi lokal selesai; QA visual browser toko masih terbuka.

Target: Figma `C2rhn7BP2nXA0LyByRDn09` / `3778:1837`, sesuai urutan eksplisit pengguna. Mapping: section `journal-stories`, story blocks, kontrol nomor dan Swiper yang sudah ada; checkbox Animate on scroll aktif di home. Cokelat penuh → panel inset → kotak nomor pertama → fill berurutan mengikuti jumlah story (01–06 di home) → nomor naik/menyebar, kembali menandai story aktif → grid/tag → heading/description reveal → bidang cokelat lebar menyusut ke kartu tengah → tiga kartu muncul rapat → gap/caption/panah final. Scene mengikuti scroll dan dapat dibalik; final memakai loop Swiper biasa.

Spacing follow-up `3776:1651`: dividers 24.552/55.957svh, label offset 3.125svh, caption height 3.33rem, 21px card gaps and 1.066rem arrow gutters. Panah dipusatkan pada gambar, bukan caption+gambar. Pada referensi 1535 x 1091.556, formula memberi nomor y197.21, label y644.91, media y698.21, kartu342.177px. Stage dapat tumbuh pada viewport pendek agar spacing tidak mematikan scene. Numerical formulas/GSAP/DOM/Prettier/diff lulus; CSS browser belum diverifikasi.

Motion follow-up: garis horizontal memakai scaleX 0→1, garis vertikal scaleY 0→1 melalui satu custom property, tanpa fade seluruh grid. Kotak cokelat mulai membuka scaleY bersamaan dengan heading pada posisi timeline yang sama (1.6 unit scroll, bukan timer). Tes GSAP memeriksa progres garis tengah dan sinkronisasi awal band/teks; DOM/syntax/diff lulus, visual browser belum diuji.

Native sticky 800svh/minimal 100svh, scrub 1.2s; GSAP/ScrollTrigger lokal yang sudah ada, tanpa pin/reparenting/ticker/aset/library baru. Geometry hanya setup/refresh, parent mutation observers Swiper dimatikan. Lazy dekat viewport setelah hero. Scene desktop >=990px dan tinggi >=700px, minimal lima story; mobile/short viewport/reduced motion/overflow/editor selection/library failure statis (adaptasi karena Figma hanya frame desktop statis). Keyboard Tab menyelesaikan scene agar kontrol dapat dijangkau. Init idempotent, editor deselect dapat restart, destroy/reconnect dibersihkan.

Validasi: Theme Check CLI 4.9.4 tanpa temuan; syntax/Prettier/diff bersih. Actual GSAP timeline dengan object fixtures lulus urutan/forward/reverse/cleanup/fallback dan tanpa Swiper update per frame. Liquid render 0/1/6/12 story lulus. DOM lokal dengan mock slider adapter lulus selected story, ARIA/inert image/text, editor selection, init/reconnect/destroy. Tes itu tidak memverifikasi CSS rendering atau engine Swiper browser. Visual desktop/mobile, keyboard nyata, Theme Editor live dan Lighthouse belum diverifikasi karena akses browser sesi sebelumnya dibatasi. Figma tidak mengembalikan motion keyframes; timing/easing mengikuti urutan pengguna, bukan nilai keyframe yang terukur.

Follow-up Featured collections sebelumnya: gap tab 26px dan media 10:11 (`3768:984`) dipertahankan; QA browser-nya tetap terbuka. QA freeze/material-story/collage/cart sebelumnya juga belum ditutup.

Sumber: [Shopify checkbox](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings#checkbox), [Theme Store requirements](https://shopify.dev/docs/storefronts/themes/store/requirements).

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
