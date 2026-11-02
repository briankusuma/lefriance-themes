# Task aktif

Task aktif: Featured collections scroll animation, 2026-11-02. Implementasi dan validasi lokal selesai; QA browser toko masih terbuka.

Follow-up `3768:927`/`3768:984`: gap tab ke kartu desktop 26px; tinggi media mengikuti rasio Figma 10:11 (342.177 x 376.288px), tanpa batas tinggi viewport. Track tab definitif, stage minimal 100svh dapat tumbuh untuk layar pendek, details mengambil ruang tersisa, wrapper Swiper tinggi auto untuk menghindari siklus percentage sizing. Margin kompensasi padding rail Swiper dihapus. CSS saja; tes GSAP/DOM, Prettier dan diff lokal lulus. Tes itu tidak memverifikasi rendering browser; QA visual tetap terbuka. Gap antarkartu tetap.

Target: Figma `C2rhn7BP2nXA0LyByRDn09` / `3768:1192`, follow-up Featured collections. Mapping: existing section/collection blocks/product-card/Swiper, checkbox Animate on scroll aktif pada home. Urutan: kosong → horizontal/vertical 0–100% membentuk silang → dua garis dari center membuka ke posisi sepertiga lalu tepi → horizontal naik lalu kembali ke pembatas header → header/details/tab reveal → dua kartu kiri masuk ke kanan dan dua kanan masuk ke kiri hingga empat berjajar. Native sticky 600svh/minimal 100svh, ScrollTrigger scrub 1.2s, reversible; tanpa pin/reparenting atau library/aset baru. Data produk, tab awal dan link tetap dari merchant.

Swiper tidak lagi mengamati style parent agar tween tidak memicu update setiap frame; ResizeObserver dan update saat ganti tab tetap digunakan. Init idempotent, pending/disconnect cleanup, selected-editor content visible, Tab menyelesaikan adegan untuk akses kontrol. Scene lazy dekat viewport setelah hero selesai. Frame desktop statis tanpa motion keyframes: easing/durasi diturunkan dari urutan yang diminta. Mobile/viewport pendek, konten kosong/meluap dan reduced motion memakai layout biasa (adaptasi not in Figma).

Validasi: real-GSAP/VM tests lulus untuk blank/cross/dua tahap columns, header/tab/card ordering, reverse, cleanup, overflow/empty/reduced/mobile/editor fallback, dan tidak ada Swiper update per frame. Rendered DOM (slider adapter mock) lulus untuk tabs/ARIA/hidden panels, satu init, editor select/deselect/reconnect, empat garis dan destroy semua Swipers. Lima fixture Liquid memakai snippet product-card asli: normal/empty/one tab/eight products/long heading. Syntax/Prettier/diff bersih; Theme Check tanpa temuan. Ini bukan pengujian browser/CSS rendering. Visual desktop/mobile, keyboard nyata, Theme Editor live dan Lighthouse belum diverifikasi karena akses browser sesi sebelumnya dibatasi. QA freeze/material-story/collage/cart sebelumnya tetap terbuka.

Sumber: [Shopify checkbox](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings#checkbox), [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [Theme Store requirements](https://shopify.dev/docs/storefronts/themes/store/requirements).

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
