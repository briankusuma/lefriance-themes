# Task aktif

Task aktif: Journal motion refinement and hero reload position, 2026-11-02. Implementasi lokal selesai; QA browser toko tetap terbuka.

Target Journal: Figma `3778:1837`, line step `3776:1469`, final spacing `3776:1651`, file `C2rhn7BP2nXA0LyByRDn09`. Existing Journal section/blocks/Swiper, Animate on scroll. Urutan: full brown → inset panel → kotak nomor pertama, radius 10.66px konstan dengan width/height (bukan scale) → fill nomor sesuai story count → nomor naik; garis atas 0→100% → nomor menyebar/tag → teks, garis bawah 0→100%, dan band cokelat muncul bersama → garis sisi → band membungkus tiga kartu dengan padding40px, lebih lebar/tinggi dari rail/gambar → foto terlihat saat band masih besar → band berubah ukuran/posisi sampai tepat ke kartu tengah → handoff slider → gap/caption/panah final. Empat garis terpisah; bukan reveal grid serentak.

Native sticky 1100svh/minimal 100svh, scrub 1.2s seperti scene lain; rentang scroll diperpanjang untuk memberi ruang pada urutan baru. Geometry hanya setup/refresh. Tidak ada pin/reparenting/library/aset/ticker baru. Desktop >=990px dan tinggi >=700px dengan minimal lima story; reduced motion/mobile/overflow/selected editor/fewer stories statis. Swiper dan keyboard aktif setelah pembukaan; editor/reconnect cleanup dipertahankan. Figma tanpa authored keyframes: timing/easing diturunkan dari urutan pengguna. Final spacing tetap divider 24.552/55.957svh, caption offset3.125svh, kartu342.177px pada1535x1091.556, gap21px, arrow gutter1.066rem.

Hero: pada navigation type reload dengan intro aktif, history.scrollRestoration manual mencegah browser memulihkan posisi lama setelah scrollTo awal; native window dan Lenis kembali ke0 saat setup dan load/pageshow selama intro. Listener di-abort saat finish, policy semula dikembalikan pada pagehide. Handler reset mengabaikan pageshow.persisted. Editor/reduced motion tidak menjalankan policy ini; caption2.4s/readiness/hold tetap.

Validasi: Theme Check CLI4.9.4 tanpa temuan; syntax/Prettier/diff bersih. Actual GSAP object tests lulus radius konstan, urutan top/bottom/sides, fill, sinkronisasi heading/band, bottom-line/text synchronization, oversized padded band/photos-before-contraction, band-card position/size match, reverse/cleanup/fallback, tanpa per-frame Swiper update. Liquid0/1/6/12-story render dan DOM dengan mock slider adapter lulus; hero VM lifecycle lulus reload/native+Lenis reset/late load/pageshow/persisted/restore history/editor/reduced checks, caption replay regression lulus. Ini bukan browser rendering, scroll profiling atau live Theme Editor QA. Visual dan performa browser belum diverifikasi karena akses browser sesi sebelumnya dibatasi.

Sumber: [Shopify checkbox](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings#checkbox), [scrollRestoration](https://developer.mozilla.org/en-US/docs/Web/API/History/scrollRestoration), [pageshow](https://developer.mozilla.org/en-US/docs/Web/API/Window/pageshow_event).

QA Featured collections (gap26px/media10:11), freeze/material-story/collage/cart sebelumnya masih terbuka.

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
