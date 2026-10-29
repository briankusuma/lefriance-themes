# Task aktif

Task aktif: caption reveal dan wordmark kanan ke kiri, 2026-10-29. Selesai lokal.

Caption target adalah teks di bawah thumbnail. Pengguna menegaskan tetap progres nyata: opacity 0.25–1 mengikuti image load/decode + font readiness; cache boleh langsung 100%, tanpa jeda/reveal buatan. `waitForImage()` menunggu load nyata sebelum decode; error/abort tidak dihitung sebagai siap.

Display-text frame [3722:1658](https://www.figma.com/design/C2rhn7BP2nXA0LyByRDn09/Speedtest?node-id=3722-1658) memakai SVG asli 2.2 KB melalui `inline_asset_content`, tanpa mengubah paths. Sembilan huruf diurutkan berdasarkan posisi X, kanan lebih dulu; naik dari garis dengan stagger pada fase sesudah loading. Wordmark gambar kustom tetap dipertahankan dengan mask kanan ke kiri. Struktur/schema/font lainnya tetap.

Validasi: Theme Check tanpa temuan; syntax/diff checks dan assertions resource readiness/load/error/abort lulus. Browser 390/1535px 32/32 checks: target caption, no timed reveal, arah huruf, baseline, final geometry, wrapping/overflow dan cleanup. Live Theme Editor/perangkat nyata/Lighthouse belum diuji. [Shopify inline_asset_content](https://shopify.dev/docs/api/liquid/filters/inline_asset_content), [SplitText](https://gsap.com/docs/v3/Plugins/SplitText/).

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
