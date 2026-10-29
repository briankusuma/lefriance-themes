# Task aktif

Task aktif: character reveal mengikuti loading nyata, 2026-10-29. Selesai lokal.

`assets/hero-intro.js`: mengganti word/timed reveal dengan SplitText chars (dependency existing). Opacity 0.25–1 dihitung langsung dari jumlah hero image decodes dan font-readiness checks yang selesai. Tiga karakter berdekatan overlap dalam ruang progress; tanpa timer/tween/delay/scroll trigger untuk reveal. Loader lama hanya memiliki readiness lifecycle, tidak memiliki byte-level percentage. Timeout yang dapat melewati readiness dihapus. Cached assets dapat langsung selesai; decode gagal/skip/abort kembali ke hero statis. Garis loading existing mengikuti readiness yang sama; tidak ada UI baru. Motion setelah loading mempertahankan durasi transisinya.

Typography/wrapping dan accessible rich text dipertahankan; SplitText hanya menyentuh salinan aria-hidden. Reduced motion/editor/no-JS tetap statis. Validasi: syntax + Theme Check bersih; assertions opacity endpoints/order/overlap/monotonicity, readiness/failure/abort lulus. Browser 390/1535px: 32/32 checks character reveal, no elapsed-time advancement, wrapping/overflow dan cleanup lulus. Live Theme Editor, screen reader, perangkat nyata dan Lighthouse belum diuji.

Sumber: [SplitText](https://gsap.com/docs/v3/Plugins/SplitText/), [image decode](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decode), [font readiness](https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/ready).

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
