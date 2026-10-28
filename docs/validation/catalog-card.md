# Kartu katalog — 2026-10-28

Sumber: [Figma 3716:1529](https://www.figma.com/design/C2rhn7BP2nXA0LyByRDn09/Speedtest?node-id=3716-1529). Design context dan screenshot diperiksa sebelum coding. Token referensi: media 342.177 x 376.288px (10:11), radius 10.66px, judul 21.319px, harga 14.924px, swatch 17.056px, tombol radius 12.792px dengan padding 19.188/10.66px. Runtime mengikuti token/pengaturan global font, warna, radius, image fit/ratio dan quick add yang sudah tersedia.

Mapping: `snippets/product-card.liquid` memakai variasi catalog untuk kartu tanpa flag editorial. Gambar/title tetap native; judul bergaris pemisah; harga dan swatch di kiri, form quick add atau link pilihan di kanan. Capture action hanya mengubah penempatan markup, tidak mengganti form atau ID varian. `assets/commerce.css` mengatur grid; pada lebar kartu <=280px tombol turun ke baris berikutnya. Homepage editorial mempertahankan layout sebelumnya. Tidak menambah JS, library, atau aset.

Data katalog dan native variant swatches/category palette tetap dinamis. Gambar, swatch dan divider pada Figma tidak di-hardcode sebagai screenshot/aset dekoratif: media berasal dari produk; divider adalah CSS border. Quick add hanya tersedia untuk produk default variant yang tersedia dan tidak membutuhkan selling plan; kasus lain tetap menuju detail produk. Setting quick add off tetap dihormati.

Deviasi: teks typo ADD TO CHART diperbaiki menjadi Add to cart dari locale (ditampilkan uppercase). Harga memakai muted text scheme agar terbaca, bukan hitam opacity 31%. Shopify font picker dan token/radius merchant dipertahankan. Mobile, long title, missing image, sold out dan fallback pilihan adalah state turunan yang tidak ada pada node. Swatch metadata kecil bersifat deskriptif; native swatch interaktif tetap memakai target 28px.

Validasi: Theme Check CLI 4.9.4 `[]`; git diff check bersih. [85/85 browser fixture checks](catalog-card-browser.json) pada lebar kartu 342/150px: containment, penempatan aksi, harga, native quick add ID, choose-options/sold-out, setting off, long title, missing image, swatch, ukuran target dan variasi editorial. Kartu desktop ditinjau visual di Chrome. Form output Shopify dimodelkan; backend cart, Theme Editor, screen reader dan Lighthouse belum diuji. Tidak ada publish/push atau perubahan katalog.

Sumber Shopify: [product](https://shopify.dev/docs/api/liquid/objects/product), [form](https://shopify.dev/docs/api/liquid/tags/form).
