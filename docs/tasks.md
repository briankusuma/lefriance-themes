# Task aktif

Task aktif: Collection collage — perbaiki slide saat scroll turun, 2026-10-29. Implementasi dan pemeriksaan lokal selesai; QA visual toko masih terbuka.

Follow-up: moving clip-path pada photo dihapus (clipPath none); cukup outer image cell overflow:hidden sebagai batas reveal. Translation 100%→0 tetap memakai arah Figma, dengan power2.inOut yang simetris. Ini menghilangkan overlap dua batas bergerak yang menyembunyikan awal gerak. Tes GSAP memulai masing-masing dari enam reveal dari progres 0, memeriksa gerak awal dan posisi yang sama saat kembali dari akhir; lulus. Browser toko belum diamati langsung.

Target: Figma `C2rhn7BP2nXA0LyByRDn09` / `3734:526`, follow-up section Collection collage (T04). Mapping: section dan blok image/promotion existing; checkbox Animate on scroll aktif di home. Follow-up frame `3734:594`: garis hanya acuan gerak dan tidak dirender. Setelah intro/promosi berpindah, desk dan detail meja slide ke kiri dari batas kanan; sofa/console naik dari bawah; shelf/kursi turun dari atas. Reveal memakai mask dan clipping tiap cell, dengan stagger mengikuti scroll. Tidak ada jeda untuk menampilkan guide lines. Native sticky 500svh/100svh + ScrollTrigger scrub 1.2s, reversible, tanpa pin/reparenting. SVG guide, variabel inline, pseudo-elements dan tween garis dihapus; foto/ikon lama digunakan ulang. Loader menerima opsi core-only sehingga collage tidak memerlukan SplitText. Tidak ada library baru.

Batas desain: motion inventory Figma kosong, timing/easing diturunkan dari lima frame statis. Font mengikuti Shopify picker yang sudah disepakati. Full scene >=990px untuk delapan blok/dua promosi; mobile, jumlah blok lain dan copy promosi yang meluap memakai grid normal (not in Figma). Editor selection/reduced motion menampilkan konten penuh; Tab menyelesaikan scene agar link dapat dijangkau.

Validasi: real-GSAP/VM tests untuk tahap center/promotion/spread/directional photo masks, reverse, cleanup, mobile/block-count/reduced/editor guards lulus. DOM aktual dari Liquid diuji dengan LinkeDOM: enam wrapper foto, dua link, alt, nesting, single-init, editor events dan reconnect lulus. Enam fixture Liquid (normal/few/many/empty/long/upload) dirender. Aset PNG 960×1200 dan SVG nonempty diverifikasi. Syntax/format/diff serta Theme Check bersih; loader regression test lulus. Ini bukan verifikasi browser/CSS layout. Visual desktop/mobile, live Theme Editor, keyboard nyata dan Lighthouse belum diverifikasi karena akses browser sesi sebelumnya dibatasi. Laporan freeze toko serta QA material-story/cart sebelumnya tetap membutuhkan konfirmasi browser; tidak dinyatakan selesai.

Sumber: [Shopify input settings](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings), [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [Theme Store requirements](https://shopify.dev/docs/storefronts/themes/store/requirements).

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
