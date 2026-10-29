# Task aktif

Task aktif: perbaiki caption awal dan hilangkan solid hijau saat sofa di tengah, 2026-10-29. Selesai lokal.

Penyebab caption terlambat: setup sebelumnya menunggu GSAP/SplitText sebelum mengamati readiness aset. Sekarang salinan caption aria-hidden dipersiapkan langsung dengan DOM/grapheme segmentation native; SplitText mengambil alih setelah library siap tanpa reset progress. Gambar load/decode, font readiness dan engine readiness menggerakkan opacity 0.25–1 serta garis existing. Tidak ada timed reveal/minimum duration/fake progress; cache tetap boleh selesai langsung sesuai konfirmasi pengguna.

Warna surface hijau memudar menjadi transparan bersamaan dengan opacity `green-sofa-front` naik (1.35–1.8 detik setelah readiness), sehingga ketika mencapai tengah hanya sofa terlihat. Tetap transparan saat bergerak ke kanan bawah. Urutan, foto baru dan wordmark kanan-ke-kiri tetap.

Validasi: Theme Check/syntax/diff bersih; assertions progress/load/error/abort lulus. Browser 390/1535px 30/30 checks: caption sebelum engine, progress tetap saat pending, no reset saat handoff, full fill hanya setelah readiness, background transparan di center/corner, wrapping, cleanup dan scroll/header recovery. Live Theme Editor/perangkat nyata/Lighthouse belum diuji.

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
