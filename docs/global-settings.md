# Global settings dan fondasi commerce

Pembaruan 2026-10-26. Permintaan pengguna: ganti header/navbar dari [frame 3646:1124](https://www.figma.com/design/C2rhn7BP2nXA0LyByRDn09/Speedtest?node-id=3646-1124), siapkan schema merchant, dan analisis [homepage 3374:242](https://www.figma.com/design/C2rhn7BP2nXA0LyByRDn09/Speedtest?node-id=3374-242) untuk fondasi global dan commerce. Implementasi independen di atas Skeleton; tidak menggunakan kode Dawn.

## Hasil analisis homepage

Frame pertama adalah hero lengkap, bukan navbar saja: foto 1535 × 1092, navbar pada x51/y16, wordmark pada x51/y66 berukuran sekitar 1433 × 404, serta kartu detail kiri bawah. Header tetap di header group; hero menjadi section index sehingga merchant dapat memindah/menghapusnya tanpa kehilangan navigasi.

| Bagian Figma | Kebutuhan global | Batas section |
| --- | --- | --- |
| Hero / navbar `3646:1124` | Font navigasi, margin, lebar konten, logo | Foto desktop/mobile, wordmark, zoom, tinggi, overlay, copy dan kartu detail milik hero; menu/logo/CTA/localization milik header |
| Modular system `3374:270` | Skema gelap, heading, caption, spacing, radius | Kategori dan konten material tetap task T03 |
| Collage `3374:305` | Container, grid gap, heading/body | Komposisi asimetris dan blok media tetap T04 |
| Products `3374:326` | Rasio/fit/radius kartu, harga, badge, swatch, font | Snippet kartu dan featured collection dasar tersedia; desain tab/panah T05 belum dibuat |
| Journal `3374:388` | Font, gap, warna, container | Pemilihan artikel dan navigasi editorial tetap T06 |
| Footer `3374:431` | Skema footer, kontras, spacing | Newsletter generik tersedia sebagai essential; komposisi newsletter/footer Figma T07/T08 belum selesai |

Tidak semua properti Figma menjadi setting global. Tinggi hero, logo besar, dan komposisi media adalah pengaturan section; satu perubahan global tidak seharusnya mengubah susunan editorial seluruh halaman.

## Pengaturan yang sudah terhubung

`config/settings_schema.json` mempertahankan ID lama agar konfigurasi existing tidak hilang. `snippets/css-variables.liquid` mengeluarkan token; guard font kosong tetap ada.

| Grup | Pengaturan | Pemakai |
| --- | --- | --- |
| Typography | Body, heading, navigation font pickers; ukuran body/heading/navigation/caption; line height; tracking | Foundation, header, hero copy, kartu, commerce |
| Layout | Page maximum, section full/contained, container width, margin desktop/mobile, section spacing, grid gap | `.section-shell`, `.container`, `.section-content`, product grid; hero memakai tinggi tersendiri |
| Colors | Background/gradient/text, button/label, border, muted, card background/text, tiga skema awal | Global default dan section color scheme. Role solid dan gradient mengikuti tipe setting Shopify; card foreground/background dipasangkan |
| Buttons and inputs | Radius tombol/input, ketebalan border | Kontrol native; brand accelerated checkout tidak diubah |
| Product cards | Radius, ratio, fit, alignment, vendor, secondary image, badge, swatch, quick add, currency code | `product-card` di collection dan featured collection |
| Cart | Drawer/cart page/floating panel, skema, lebar drawer/panel, jarak panel, notes, vendor, accelerated checkout, continue link | `cart-drawer`, `main-cart`, shared `cart-content`, `commerce.js` |

Font Figma Open Sauce One/SF Pro menggunakan substitusi sementara Work Sans dari Shopify font library. Tidak membundel custom font. Merchant dapat menggantinya melalui font picker.

## Merchant editing

- Header: menu utama/account, logo override/global logo, lebar logo, simbol referensi opsional, warna, overlay, CTA label/link, localization, lebar dan padding. CTA ditampilkan hanya jika label dan tujuan terisi.
- Hero: gambar desktop/mobile dengan focal point Shopify, zoom, wordmark upload/fallback heading, opsi aset referensi, copy, warna teks, tinggi desktop/mobile, overlay, kartu gambar/link. Menambahkan instance baru memakai placeholder, bukan otomatis foto demo.
- Essentials yang dapat ditambahkan: Editorial hero, Featured collection, Rich text, Newsletter; Announcement bar hanya di header group. Section Custom Liquid existing tetap tersedia.
- Product: title, form pembelian, description, Custom Liquid dan app block dapat diurutkan. Accelerated checkout aktif default pada form. Collection memakai kartu bersama dan pagination.
- Default index hanya merakit hero baru. Tidak memasukkan koleksi/produk fiktif atau menyelesaikan editorial T03–T08 secara diam-diam.
- Newsletter essential adalah opsi reusable; saat T07/T08 dikerjakan, gunakan satu form di lokasi yang dipilih merchant, jangan otomatis menduplikasinya.

## Perilaku commerce

Cart page, drawer, dan floating panel memakai markup bersama, harga/final totals/discounts dari server Shopify. `Cart type` tersedia di Theme settings. Mode page membiarkan ikon menuju route cart; drawer membuka panel penuh dari kanan; floating panel selalu membuka kartu di bawah ikon cart, termasuk setelah quick add dari bagian lain halaman, dan menyesuaikan posisinya dari ukuran header aktual. Form POST, quantity, note, remove link, checkout dan product variant select tersedia tanpa JS. Untuk meninjau harga/availability varian tanpa JS tersedia form GET "Review variant".

Enhancement drawer/floating panel memakai route toko yang locale-aware dan Ajax Cart API dengan bundled section rendering. Keduanya memakai dialog native untuk Escape, focus containment dan focus restore; floating panel memakai backdrop transparan serta menutup saat area luar diklik. Add membuka presentasi yang dipilih, quantity/remove/update merender ulang semua baris dan total, badge diperbarui, error diumumkan, kontrol dipulihkan setelah error. Respons section `null` memicu pembacaan ulang section tanpa mengulangi mutasi add. Refresh lama tidak boleh menimpa respons terbaru. Checkout tetap form native. Accelerated checkout ditampilkan pada cart page, bukan diduplikasi di panel. Pada route cart, panel tidak dirender sehingga form note hanya memiliki satu instance.

Kartu menampilkan price range, compare-at, unit price, sale/sold out dan swatch yang benar-benar tersedia. Quick add hanya untuk produk satu varian yang tersedia tanpa selling plan wajib; lainnya membuka produk. Ini perluasan scope eksplisit terbaru tentang cards/commerce, bukan penyelesaian desain tab T05.

Product form memperbarui harga/status/jumlah/media dan URL varian; selling plans mengikuti alokasi varian. Pilihan opsi terpisah merupakan progressive enhancement untuk katalog yang datanya termuat (<250 varian). Katalog besar/combined listings memerlukan milestone opsi berbasis section rendering; jangan mengklaim dukungan high-variant lengkap. Pickup, recommendations, gift-card recipient, filtering/sorting, predictive search, featured product lengkap, dan rich media lintas perangkat masih pekerjaan terpisah. Ini belum seluruh fitur Dawn atau sertifikasi Theme Store.

## Validasi dan batasnya

- [Theme Check](validation/header-hero-cart-theme-check.json): Shopify CLI 4.9.4; lihat hasil aktual, bukan catatan historis.
- [Browser fixture](validation/header-hero-cart-browser.json), [uji presentasi cart](validation/cart-presentations-browser.json), dan [metode/batas](validation/header-hero-cart-notes.md): 99 assertion lulus pada Chrome lokal; normal/empty/long, lebar 320/375/768/1100/1535, mobile Escape, overlay, overflow, ID, tiga mode cart, cart empty/add/quantity/update/remove/422/null section, locale route, focus, product availability/price/quantity/URL/reconnect.
- Fixture merender Liquid aktual memakai LiquidJS dengan mock object/filter/form Shopify dan mock Ajax responses. Bukan Shopify server dan bukan bukti payment, subscription checkout, persediaan nyata, atau Theme Editor lulus.
- Komposisi desktop dan mobile diperiksa di browser. Frame mobile tidak tersedia; susunan mobile merupakan turunan token, bukan pixel match Figma.
- Aset upload memakai `image_url`/`image_tag` responsif dan focal point. Foto referensi asset memakai `asset_img_url` dengan srcset; CDN resizing/format, Lighthouse dengan konten toko, dan contrast foto merchant belum terukur pada Shopify.
- Perlu development-theme QA: add/remove/reorder/reload section, logo bermacam rasio, country/language submit, akun Shopify, selling plan, unit price, discounts, pembayaran accelerated/native checkout dan Lighthouse home/collection/product. Tidak ada deploy/publish/push dalam pekerjaan ini.

## Acuan Shopify resmi

- [Settings input](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings), [image_tag dan focal points](https://shopify.dev/docs/api/liquid/filters/image_tag), [asset_img_url](https://shopify.dev/docs/api/liquid/filters/asset_img_url).
- [Ajax Cart API](https://shopify.dev/docs/api/ajax/reference/cart), [cart template](https://shopify.dev/docs/storefronts/themes/architecture/templates/cart), [cart](https://shopify.dev/docs/api/liquid/objects/cart), [line_item](https://shopify.dev/docs/api/liquid/objects/line_item), [routes](https://shopify.dev/docs/api/liquid/objects/routes).
- [Product template](https://shopify.dev/docs/storefronts/themes/architecture/templates/product/overview), [variant](https://shopify.dev/docs/api/liquid/objects/variant), [option value](https://shopify.dev/docs/api/liquid/objects/product_option_value), [selling plan allocation](https://shopify.dev/docs/api/liquid/objects/selling_plan_allocation), [unit pricing](https://shopify.dev/docs/api/liquid/filters/unit_price_with_measurement), [media_tag](https://shopify.dev/docs/api/liquid/filters/media_tag).
- [Accelerated checkout](https://shopify.dev/docs/storefronts/themes/pricing-payments/accelerated-checkout), [Theme Store requirements](https://shopify.dev/docs/storefronts/themes/store/requirements). Review scope ini tidak mengesahkan kesiapan submission.
