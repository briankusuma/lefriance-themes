# Task aktif

Task aktif: sofa di depan text dan cocok dengan kursi background, 2026-10-29. Selesai lokal.

Referensi [3726:1797](https://www.figma.com/design/C2rhn7BP2nXA0LyByRDn09/Speedtest?node-id=3726-1797): kursi utuh left 1092/top 507.89, 343 x 382 dalam frame 1535 x 1092; tanpa rotasi strip sebelumnya. `hero-intro.js` menaikkan surface ke z-index 4 di center-sofa, di depan content/wordmark (3); loading hijau awal tetap di belakang caption. Kursi membesar selama movement dan endpoint diproyeksikan dari region kursi pada source photo melalui ukuran, crop/object-position dan zoom yang sebenarnya. Mobile mengikuti crop foto, bukan dipaksa tetap utuh di viewport. Tidak ada aset baru/diubah.

Display-text tetap muncul dahulu dan background final baru crossfade setelah arrival. Readiness caption dan cleanup/scroll locks tetap. Validasi lokal: syntax/diff, assertions readiness/load/error/abort dan Theme Check bersih. 27/27 browser checks mobile/desktop lulus, mencakup z-order, endpoint frame Figma, pertumbuhan ukuran, crop/zoom, foto belum muncul sebelum alignment dan cleanup. Live Theme Editor/perangkat nyata/Lighthouse belum diuji.

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
