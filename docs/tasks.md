# Task aktif

Task aktif: Shopify audit remediation, 2026-11-02. Perbaikan kode dan validasi lokal selesai; metadata author/URL serta QA toko masih terbuka.

Scope dari audit: native GET filtering/sorting koleksi dan search; predictive search dengan keyboard/abort/error fallback; related/complementary recommendations memakai API Shopify dan section editable; pickup block memakai variant section endpoint; native product swatches; unit price dari selected variant pada kartu; gift recipient properties/date/timezone/validation dan suppression accelerated saat recipient aktif; QR gift card160px melalui library platform Shopify; komentar success; Follow on Shop setting footer; native account tampak pada header desktop/mobile. Nama theme_info menjadi `lafrience` sesuai jawaban pengguna. Author serta URL dokumentasi/support belum diberikan (pertanyaan lanjutan masih menunggu); nilai lama belum diganti dengan identitas/URL rekaan. Ini masih gate sebelum rilis.

High-variant: >250 memuat hanya selected variant JSON dan menggunakan option_values IDs + Section Rendering API, termasuk product_url pada combined listings. Seluruh product section diimpor kembali supaya option availability, harga, form, pickup dan media mengikuti server. Recipient values dipertahankan; fokus dikembalikan ke opsi. Request dibatalkan bila diganti/unload. Saat gagal, ID dikosongkan, add/wallet dinonaktifkan dan tombol retry disediakan agar tidak membeli variant lama. <=250 mempertahankan jalur JSON lokal; 250 tetap memakai separate options. No-JS high variant memakai link option_values. Pickup/recommendations native tidak membutuhkan app runtime baru.

Validasi: Theme Check CLI4.9.4 zero findings; semua theme JSON parse, syntax19 JS bersih; changed JS/CSS Prettier dan diff bersih. LiquidJS fixtures dengan adapter filter/form Shopify lulus produk low/high (selected ID tidak ada pada250 awal), swatch image/color, unit price/range, filter/sort/q/decimal state, pickup locations, recipient fields, article success, mixed predictive results/recommendations. DOM emulation dengan mocked APIs lulus low variant change/pickup event, remote section replacement/id/locale/failure/retry, recipient enable/date/required/wallet toggle, predictive keyboard/error/abort, recommendations intent dan QR160px. Ini bukan uji server Shopify, visual browser atau native checkout.

Fitur baru tidak memiliki frame Figma khusus; layout diturunkan dari token homepage/commerce. Account mobile ditampilkan juga di header untuk persyaratan Shopify, sedangkan menu tetap menyediakan link account. Follow on Shop warna platform tidak diubah. Template produk default menyertakan pickup dan dua recommendation sections; merchant dapat mengatur ulang/remove. Konfigurasi filter, complementary products, lokasi pickup, Shop eligibility dan data katalog perlu diverifikasi pada toko.

Sisa: live Theme Editor/backend form/checkout/keyboard/screen reader/cross-browser dan Lighthouse, hak distribusi aset Figma, author/doc/support metadata. Ukuran aset besar adalah risiko optimasi yang belum diukur; tidak ada konversi/desain ulang aset atau klaim skor performa. QA animasi Journal/Featured collections/hero dan freeze/cart sebelumnya tetap terbuka. Tidak ada push/publish/deploy.

Sumber: [Shopify requirements](https://shopify.dev/docs/storefronts/themes/store/requirements), [filtering](https://shopify.dev/docs/storefronts/themes/navigation-search/filtering/storefront-filtering), [high variants](https://shopify.dev/docs/storefronts/themes/product-merchandising/variants/support-high-variant-products), [pickup](https://shopify.dev/docs/storefronts/themes/delivery-fulfillment/pickup-availability), [gift recipient](https://shopify.dev/docs/storefronts/themes/product-merchandising/gift-cards), [gift card QR](https://shopify.dev/docs/storefronts/themes/architecture/templates/gift-card-liquid).

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
