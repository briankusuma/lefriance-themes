# Task aktif

Task aktif: Footer scroll reveal, 2026-11-02. Implementasi/validasi lokal selesai; visual browser dan live editor belum diverifikasi.

Target Figma `C2rhn7BP2nXA0LyByRDn09` / `3660:1365`. Existing footer section, newsletter/media blocks, gallery and original wordmark. Animate on scroll checkbox aktif pada footer group. Gaya diturunkan dari riwayat pengguna karena frame statis tanpa motion keyframes: ornament lines0→100% → content/gallery masked reveal → newsletter title chars opacity0.25→1 → wordmark paths rise from baseline right-to-left. Original9 SVG paths inline melalui Shopify inline_asset_content, asset2264bytes tidak diubah. Custom image/text logo memakai reveal utuh; crop reference tetap. GET CONTACT / Your Email / SEND dipertahankan; show_footer_details=false eksplisit pada group agar teks bawah tidak muncul.

GSAP/SplitText/ScrollTrigger loader yang sudah ada, scrub1.2s, natural footer scroll (tanpa pin/sticky spacer/extra scroll height/RAF). Lazy dekat viewport setelah hero. Focus link/form menyelesaikan dan menonaktifkan scrub agar input tetap terlihat tanpa memindahkan scroll. Reduced motion, selected editor, library failure/no-JS statis; deselect dapat restart, disconnect membersihkan. Gallery Swiper tidak direset oleh reveal, parent mutation observers dimatikan, init idempotent dan destroy sekali/reconnect aman. Warna/gradasi ornament existing dipertahankan.

Validasi: Theme Check CLI4.9.4 zero findings; syntax/Prettier/diff bersih. Liquid fixtures reference/custom/empty lulus,9 original paths dan newsletter attributes/crop class dipertahankan. Actual GSAP object timeline lulus line progress, sequential character fill, right-to-left rise, reverse, focus-visible fallback, reduced/custom logo dan cleanup. Rendered DOM + mock slider lulus init/editor/reconnect/single destroy. Tes ini tidak memverifikasi CSS/SVG rendering browser, native newsletter backend atau Lighthouse. Mobile/easing/scroll timing adalah adaptasi dari token dan riwayat, bukan motion keyframes Figma.

Carry forward: metadata author/doc/support untuk tema lafrience masih menunggu data pengguna; native commerce additions sudah diuji lokal tetapi live APIs/checkout/editor/a11y/performance belum lulus. Hak distribusi aset Figma dan QA animasi/freeze/cart sebelumnya tetap terbuka. Tidak ada push/publish/deploy.

Sumber: [inline_asset_content](https://shopify.dev/docs/api/liquid/filters/inline_asset_content), [checkbox schema](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings#checkbox).

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
