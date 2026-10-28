# Audit dan styling section dasar — 2026-10-28

Permintaan pengguna: periksa semua section, lewati yang sudah ditata, dan styling section yang masih dasar mengikuti homepage. Audit mencakup seluruh **25 file Liquid** di sections; section group JSON bukan section visual tambahan.

| Section | Keputusan |
| --- | --- |
| main-404 | Ditata: angka besar, empty page editorial dan tombol belanja |
| main-page | Ditata: heading, divider, lebar baca rich text |
| main-list-collections | Ditata: grid koleksi, square media, fallback media, pagination |
| main-blog | Ditata: story grid, media, metadata, excerpt, empty state |
| main-article | Ditata: hero media, body lebar baca, komentar dan form |
| main-search | Ditata: form, mixed results; hasil produk memakai product-card |
| main-contact | Ditata: intro/form dua kolom desktop, stack mobile |
| main-password | Ditata: shop identity, heading dan form terpusat |
| main-index | Ditata: fallback title; tidak dipasang ke template homepage aktif |
| rich-text | Ditata: komposisi heading/body dua kolom |
| newsletter | Ditata: signup editorial mandiri, tidak mengubah newsletter footer |
| featured-collection | Ditata: heading/divider dan grid yang memakai kartu existing |
| announcement-bar | Dilewati: sudah memiliki styling khusus inline |
| cart-drawer | Dilewati: cart panel/commerce sudah ditata |
| collection-collage | Dilewati: implementasi Figma khusus |
| custom-liquid | Dilewati: raw merchant Liquid sengaja tanpa komposisi tambahan |
| featured-collections | Dilewati: implementasi homepage/tab/Swiper khusus |
| footer | Dilewati: editorial footer khusus |
| header | Dilewati: navigation/header khusus |
| hero-editorial | Dilewati: hero khusus |
| journal-stories | Dilewati: journal/Swiper khusus |
| main-cart | Dilewati: existing commerce/cart styling |
| main-collection | Dilewati: heading/kartu katalog baru, termasuk perubahan yang sudah ada saat task dimulai |
| main-product | Dilewati: gallery/form/detail khusus |
| material-story | Dilewati: implementasi homepage/Swiper khusus |

Referensi homepage [3374:242](https://www.figma.com/design/C2rhn7BP2nXA0LyByRDn09/Speedtest?node-id=3374-242) dibaca ulang dengan design context/screenshot; fondasi pada `design-tokens.md` dan komponen aktual dipakai kembali. Mapping sebelum coding: container, warna/font/radius global; grid editorial untuk daftar; form sederhana dan tombol cokelat; existing product-card untuk hasil produk. Tidak mengunduh ulang atau menyisipkan aset homepage ke halaman yang tidak membutuhkannya.

`assets/section-foundation.css` berisi seluruh styling baru, scoped ke `.support-section` yang hanya dipasang pada 12 section di atas. Stylesheet dimuat dari section terkait, tidak ditambahkan ke layout/global CSS. Font, warna, radius, gap dan container berasal dari settings tema; baseline mendapat satu color_scheme setting. Tidak ada library, JS atau aset pihak ketiga baru. CSS 6,768 bytes, estimasi gzip 1,613 bytes; tidak ada klaim skor Lighthouse dari ukuran ini.

Perubahan markup pendukung: title/query di-escape, image blog/article responsif, collection list punya pagination dan fallback gambar, empty blog/collection memakai locale, password menampilkan shop.name, serta input tetap memiliki label. Native contact/customer/storefront-password/new-comment/product forms dan pagination yang ada dipertahankan. Tidak mengubah stack, storefront resources, atau menuntaskan backlog commerce/Theme Store lain.

Deviasi: tidak ada frame khusus 404/page/blog/article/search/contact/password/rich text/newsletter mandiri pada referensi homepage. Komposisi halaman, responsive breakpoints, missing media, empty/long/error/success diturunkan dari token tema sesuai scope pengguna (**not in Figma**). Font picker Work Sans dipertahankan. Tidak mengklaim halaman tambahan identik dengan frame Figma yang tidak tersedia.

Validasi: Shopify CLI 4.9.4 Theme Check `[]`; diff check bersih. Dua belas schema dan asset references diperiksa. [307/307 checks browser lokal](support-sections-browser.json) mencakup 320/749/1440px, seluruh section, normal/empty/long dan modeled form error/success: containment, label, target tombol, password required, reuse native product ID pada hasil search, empty messages dan tautan 404. Fixture dirender dari Liquid section/snippets aktual; Shopify form/pagination/media service output dimodelkan. Kontak desktop/mobile ditinjau visual sebagai spot check komposisi bersama. Focus-visible diimplementasikan; keyboard smoke check native pada link 404 dan Tab dari Name ke Email form kontak berhasil. Uji penuh keyboard/screen reader belum dilakukan.

Masih terbuka: live Theme Editor (termasuk add/reorder/edit), backend contact/newsletter/comment/password/cart, screen reader, browser/perangkat lain dan Lighthouse dengan konten toko nyata. Ini styling pass, bukan validasi fitur lengkap atau kelulusan Theme Store. Tidak ada commit/push/publish/deploy.

Sumber resmi yang dibaca: [requirements](https://shopify.dev/docs/storefronts/themes/store/requirements), [article](https://shopify.dev/docs/api/liquid/objects/article), [blog](https://shopify.dev/docs/api/liquid/objects/blog), [search](https://shopify.dev/docs/api/liquid/objects/search), [collections](https://shopify.dev/docs/api/liquid/objects/collections), [page](https://shopify.dev/docs/api/liquid/objects/page), [form](https://shopify.dev/docs/api/liquid/tags/form), [paginate](https://shopify.dev/docs/api/liquid/tags/paginate).
