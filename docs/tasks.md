# Task aktif

Task aktif: replay setiap reload dan perlambat isi caption, 2026-10-29. Implementasi dan pemeriksaan logika selesai; visual browser belum diverifikasi.

`hero-intro.js` menghapus sessionStorage/introOnce gate. `hero-editorial.liquid`/schema dan home JSON menghapus intro_once, sehingga setting lama tidak bisa melewatkan replay. Caption native mulai pada opacity 0.25; setelah engine siap, GSAP menunggu 0.35s lalu mengisi karakter selama 2.4s setiap load. Ini durasi visual yang kini diminta pengguna, mengganti batasan timed-reveal sebelumnya. Garis existing tetap mengikuti readiness aset sebenarnya. Header menunggu Promise.all(asset readiness, text completion), lalu hold 0.8s; cached assets tidak membuat caption langsung penuh. Skip/abort membunuh caption timeline, menyelesaikan pending gate dan membersihkan context/split/scroll lock.

Validasi: syntax/diff dan Theme Check bersih. GSAP asli/VM checks: inisialisasi berulang tetap berjalan meski dataset introOnce lama true; readiness cache tidak mengubah opacity karakter; fill 2.4s, asset+caption gate, hold 0.8s, urutan skala dan readiness/error/abort lulus. Ini bukan uji rendering/browser. Visual/Theme Editor/perangkat/Lighthouse belum diverifikasi karena sesi Computer Use sebelumnya dibatasi URL. [Shopify input settings](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings).

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
