# Task aktif

Task aktif: jeda setelah caption selesai sebelum header, 2026-10-29. Selesai lokal; visual browser belum diverifikasi.

Setelah seluruh readiness selesai, `hero-intro.js` memastikan caption/garis 100%, lalu memberi jeda GSAP 0.6s melalui delay/restart(includeDelay). Baru setelah itu seluruh transisi sofa/header berjalan. Progress caption tetap dari readiness nyata; jeda ini merupakan hold setelah selesai yang diminta pengguna, bukan persentase/jeda loading palsu. Skip/abort tetap membersihkan timeline melalui mekanisme existing.

Validasi: syntax/diff dan Theme Check bersih; test GSAP asli memastikan motion belum berjalan pada +0.3s dan berjalan setelah +0.6s. Assertions readiness dan opposite-scale tetap lulus. Visual browser belum diuji karena pembatasan akses Computer Use pada sesi sebelumnya; tidak ada klaim uji browser/Theme Editor/Lighthouse baru. [GSAP restart includeDelay](https://gsap.com/docs/v3/GSAP/Timeline/restart()/).

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
