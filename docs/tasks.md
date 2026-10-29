# Task aktif

Task aktif: Material stories scroll sequence, 2026-10-29. Implementasi dan pemeriksaan lokal selesai; QA visual toko masih terbuka.

Figma `C2rhn7BP2nXA0LyByRDn09` node `3734:390` → section `material-story`, blok dan slider existing. Checkbox Animate on scroll; homepage aktif. SplitText heading opacity 0.25→1 mengikuti progres scroll, garis silang membuka kotak, kartu scale 0.25→1, ornament dan kontrol samping masuk terakhir. Desktop pin 4.5 viewport, scrub 1.2s. ScrollTrigger lokal dari paket GSAP 3.15.0 yang sudah digunakan; Lenis tetap pemilik RAF. Tidak mengganti data merchant/aset lama.

Figma hanya memiliki tujuh frame statis (motion inventory kosong): timing/easing diturunkan dari urutan yang disetujui. Mobile/viewport pendek dan konten panjang memakai reveal judul tanpa pin; editor/reduced motion tetap statis. Tab menyelesaikan scene untuk menjangkau kontrol. Cleanup mendukung disconnect, breakpoint dan perubahan preferensi.

Validasi: real-GSAP/VM regression checks lulus untuk fill karakter, ordering garis/kartu/sides, reverse, pin range, mobile, cleanup serta reduced-motion/editor guards. Tujuh fixture Liquid dirender dari section asli; syntax/format/diff bersih, Theme Check tanpa temuan. Ini bukan pengujian browser. Perbandingan Figma desktop/mobile, keyboard nyata, Theme Editor dan Lighthouse belum diverifikasi karena pembatasan sesi Computer Use sebelumnya. QA cart toko dari task sebelumnya juga tetap terbuka.

Sumber: [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [Shopify input settings](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings), [Theme Store requirements](https://shopify.dev/docs/storefronts/themes/store/requirements).

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
