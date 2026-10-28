# Product detail gallery — 2026-10-28

Permintaan pengguna mengganti layout detail produk mengikuti [Figma 3713:1522](https://www.figma.com/design/C2rhn7BP2nXA0LyByRDn09/Speedtest?node-id=3713-1522). Screenshot dan struktur diperiksa: node `image-left` adalah group galeri standalone di page Showcase, bukan frame PDP lengkap. Mapping disampaikan sebelum implementasi: galeri kiri pada main product; informasi dan form yang ada di kanan desktop, menumpuk di mobile.

Token: main tile 342.177 x 376.288px, thumbnail sekitar 160 x 175.95px, rasio 10:11, gap utama 24px dan thumbnail 16px, sudut persegi, bidang gambar #E7DBD0. Implementasi memakai token color scheme `--color-card`/`--color-card-text`. Galeri mengikuti lebar container; tidak dikunci 342px. Gambar memakai contain agar rasio katalog tidak terpotong.

`sections/main-product.liquid` kini merender satu stage media dan thumbnail dua kolom dari `product.media`. Media awal mengikuti selected variant, lalu featured media produk. Tidak menyalin lima gambar kursi identik Figma ke katalog. Jumlah thumbnail mengikuti media asli, termasuk gambar utama. Section tidak membuat varian, gambar, harga atau swatch palsu.

`assets/product-detail-gallery.js` memakai helper Swiper lokal yang sudah tersedia. Thumbnail dan swipe mengubah gambar utama; Arrow keys/Home/End tersedia pada thumbnail, dengan focus terlihat dan aria-current. Media nonaktif inert; native video dijeda dan iframe pemain eksternal yang ditinggalkan dimuat ulang untuk menghentikan audio. Variasi varian di `assets/product.js` memilih media dalam galeri; fallback komponen lain tetap tersedia. Form, harga, kuantitas, accelerated checkout, metadata warna, app/custom Liquid blocks dan structured data dipertahankan.

Tidak ada dependensi atau aset gambar baru. CSS/JS khusus PDP dimuat melalui asset_url. Gambar responsif, media awal eager, thumbnail/media lainnya lazy. Tanpa JS atau bila library gagal, semua media dapat dilihat dan anchor thumbnail tetap berfungsi. Disconnect/reconnect membersihkan instance/listeners. Reduced motion mengikuti helper tema.

Validasi: Theme Check CLI 4.9.4 menghasilkan `[]`; syntax JS dan git diff check bersih. [131/131 pemeriksaan browser lokal](product-detail-gallery-browser.json) pada 320/390/1200 CSS px: thumbnail, keyboard, varian/sold out, ratio/gap, RTL, single/empty/12 media, native video/model markup, no-JS, library failure, simulated reduced motion dan reconnect. Desktop/mobile ditinjau visual di Chrome. Fixture memakai Liquid section/snippets aktual, dengan output layanan form/gambar/media Shopify dimodelkan. Bukti ini bukan uji backend atau sertifikasi Theme Store.

Deviasi dan state yang tidak tersedia: frame mobile, layout informasi pembelian, outline pilihan aktif, keyboard, media kosong/kaya dan perpindahan interaktif tidak ditentukan pada node. Susunan mobile diturunkan dari token; typography dan informasi pembelian mengikuti fondasi tema. Lebar group diskalakan responsif dan grid thumbnail mengisi lebar stage (referensi grid sekitar 6px lebih sempit). Tidak mengklaim PDP lengkap sama persis dengan Figma.

Masih terbuka: live Theme Editor/add-remove-reorder blok, gambar katalog nyata dengan rasio ekstrem, video/YouTube/Vimeo/3D asli, physical swipe, screen reader dan Lighthouse. Tidak ada commit/push/deploy/publish atau perubahan katalog.

Sumber resmi yang diperiksa: [product](https://shopify.dev/docs/api/liquid/objects/product), [media](https://shopify.dev/docs/api/liquid/objects/media), [media_tag](https://shopify.dev/docs/api/liquid/filters/media_tag), [image_url](https://shopify.dev/docs/api/liquid/filters/image_url). [Theme Store requirements](https://shopify.dev/docs/storefronts/themes/store/requirements) dibaca ulang pada milestone ini; checklist submission global tetap terbuka.
