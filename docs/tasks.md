# Task aktif

Task aktif: sinkronisasi sofa, garis, wordmark dan background final, 2026-10-29. Selesai lokal.

`hero-intro.js` memakai fase bersama: center-sofa 1.8s memulai garis (0.5s), perjalanan ke kanan bawah (2s) dan crossfade background final (2s). Wordmark kanan-ke-kiri mulai 2.3s, navbar 2.4s. Sofa-settled/room-ready, seluruh huruf, navbar dan crossfade selesai bersama pada 3.8s. Garis memudar menjelang akhir. Semua waktu dihitung setelah real asset readiness; caption loading tetap tanpa timed reveal. Green surface tetap transparan ketika sofa terbentuk di tengah.

Validasi: browser 390/1535px 28/28 checks sinkronisasi center/line, crossfade selama movement, arah huruf, state lengkap saat arrival dan cleanup/scroll unlock lulus. Assertions loading/load/error/abort, syntax/diff dan Theme Check bersih. Live Theme Editor/perangkat nyata/Lighthouse belum diuji.

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
