# Task aktif

Task aktif: scale hijau 1→0 dan sofa 0→1, 2026-10-29. Implementasi lokal; visual browser belum diverifikasi.

`hero-intro.js`/CSS memakai dua lapisan terpisah. Green plane ber-origin center dan mengecil uniform sampai scale 0; sofa mulai scale 0 dan membesar sampai 1 dengan easing/durasi sama (power2.inOut, 1.8s), bertemu di pusat yang sama. Ini mengganti blend opacity serta sisa kotak 60% sebelumnya. Tidak ada opacity fade pada swap ini. Perjalanan ke kanan baru dimulai pada center-sofa 1.8s, setelah kedua skala selesai. Alignment foto, foreground z-index, wordmark lebih dahulu, background setelah arrival dan loading caption nyata dipertahankan.

Validasi: syntax/diff dan Theme Check bersih. Konfigurasi produksi diuji dengan GSAP asli pada objek numerik: endpoint 1→0/0→1, monotonic/complementary scale, pusat yang sama, posisi tetap sebelum 1.8s lalu bergerak ke kanan lulus. Assertions resource readiness/load/error/abort tetap lulus. Ini bukan uji rendering DOM. Computer Use pada sesi sebelumnya dihentikan oleh batas akses URL; tidak ada klaim verifikasi visual/browser baru, live Theme Editor, perangkat nyata atau Lighthouse.

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
