# Brief proyek LE FRIANCE

Tema Shopify orisinal untuk merchant furnitur, berbasis Skeleton resmi yang sudah diadaptasi. Target Shopify Theme Store. Jangan init ulang atau menyalin Dawn/Horizon. Sumber desain: Figma `C2rhn7BP2nXA0LyByRDn09`. Instruksi chat terbaru menentukan scope; bahasa laporan Indonesia.

## Kondisi kerja

- Homepage, header/footer, galeri produk, kartu katalog, heading koleksi dan styling section dasar sudah diimplementasikan lokal. Periksa kode aktual sebelum mengubahnya.
- Shopify Liquid/JSON, native CSS/JS; library Swiper dan Lenis di-host dalam assets. Font memakai Shopify font picker (Work Sans), bukan font custom Open Sauce One.
- Settings global ada di config/settings_schema.json; markup settings/CSS tokens ada di snippets/css-variables.liquid. Baca file ini saat mengubah setting, jangan menduplikasi schema dalam dokumentasi.
- Hero intro `3722:1757`: GSAP core + SplitText 3.15.0, locally hosted and loaded on demand; green #6C7C69, centered detail/text fill → green surface shrinks at the center into sofa-full, its solid fill fading to transparent as the texture appears → line appears at the center stage → sofa moves down/right (2.05°) while the wordmark and navbar reveal; furnished-room crossfade begins only after corner arrival. Editable in Editorial hero → Intro animation. Replays on every reload by default; disabled in editor/reduced motion. Final frame 3722:1658 uses the desktop design proportions (1535 x 1092), full-width editorial content and zero overlay in the home template. Post-load motion (~5.8 seconds after actual asset readiness) and mobile rectangle placement are derived because Figma supplies static steps, not keyframes/mobile frames. The aria-hidden caption is segmented and bound immediately, before the lazy GSAP dependency is ready; SplitText takes over without resetting progress. Character opacity advances from 0.25–1 from completed hero image decodes, document.fonts.ready and animation-engine readiness. Default pre-room is the user-provided `bg-header-center.png`; centered/corner sofa uses `sofa-full.png` (frames 3725:1786/1775). Full-chair width retains the existing 274.995px slot at 1535px; height follows its 515:573 image ratio, with contain and no rounded clipping; mobile keeps the aspect ratio with a 96px minimum, derived because no mobile frame is supplied. This is resource-readiness progress, not byte-level network progress; no timed reveal, minimum loading duration or timeout-driven completion. Cached assets can finish immediately (reconfirmed by the user). The caption below the thumbnail is the reveal target; image readiness waits for load before decode. The reference wordmark uses its unchanged inline SVG (9 original paths, 2.2 KB) so letters rise from the baseline right to left. Custom image wordmarks use a right-to-left image mask. No SVG path morphing. Lenis owns page scroll with shared intro/modal/menu locks; GSAP has no separate Lenis RAF.
- Mobile navbar: brand/cart/hamburger; search/account dan localization ada dalam menu fullscreen dengan scroll-lock/focus handling. Layout mobile ini mengikuti permintaan pengguna, bukan frame mobile Figma.
- Header/footer memakai section groups. Cart drawer/page/popover memakai logic dan snippets commerce yang sama. Lenis nonaktif pada editor/reduced motion.
- Gallery produk memakai Swiper, thumbnail dua kolom, sinkron dengan gambar varian. Blok title/colors/price/variant picker/quantity/buy/tax/description dapat diurutkan/dihapus.
- Swatch kategori membaca `product.metafields.shopify['color-pattern'].value`: gambar didahulukan, lalu warna solid. Native variant swatches mendapat prioritas pada kartu. Metadata warna bersifat deskriptif, bukan varian/stok.

## Peta desain ke kode

| Referensi Figma | Target aktual |
| --- | --- |
| [Homepage 3374:242](https://www.figma.com/design/C2rhn7BP2nXA0LyByRDn09/Speedtest?node-id=3374-242) | templates/index.json |
| 3646:1124 | sections/header.liquid, sections/hero-editorial.liquid |
| 3646:1128 | Detail hero |
| 3374:270 | sections/material-story.liquid |
| 3374:305 | sections/collection-collage.liquid |
| 3374:326, 3660:1293 | sections/featured-collections.liquid, snippets/product-card.liquid |
| 3660:1302 | sections/journal-stories.liquid |
| 3660:1365, 3660:1408 | sections/footer.liquid, ornament footer |
| 3713:1522 | Galeri sections/main-product.liquid |
| 3716:1529 | Kartu katalog snippets/product-card.liquid |
| 3717:1596 | Header sections/main-collection.liquid |

Nama file aktual mengalahkan rencana lama. Homepage editorial dan kartu katalog memiliki variasi layout berbeda.

## Keputusan desain yang harus dipertahankan

- Media/harga/warna/URL produk mengikuti data merchant; jangan membuat varian atau swatch palsu untuk meniru Figma.
- Mobile, focus, empty/error/success dan halaman pendukung diturunkan dari token saat frame khusus tidak tersedia; catat sebagai not in Figma.
- Kontras teks boleh diperkuat; font picker tetap wajib. Garis ornament terang #E5E3D3 berbeda dari border UI. Ornament footer #5B5148 memiliki fade alpha; jangan menyamakannya dengan border input.
- Footer newsletter memakai GET CONTACT / Your Email / SEND yang editable. Detail policy/copyright/payment bisa diaktifkan melalui setting; konfigurasi merchant saat ini menyembunyikannya. Wordmark referensi terpotong sesuai desain.
- Journal: kartu aktif cokelat dengan teks di dalam; tetangga berupa foto, slider loop. Foto AI adalah ilustrasi, bukan dokumentasi workshop merchant.
- Styling section pendukung ada di assets/section-foundation.css dan scoped ke support-section. Section homepage/custom Liquid yang sudah ada tidak didesain ulang oleh styling pass tersebut.

## Validasi dan pekerjaan yang masih terbuka

Validasi lokal terakhir (2026-10-28): Theme Check CLI 4.9.4 bersih; browser fixture mencakup responsive layout, pilihan varian, slider, form markup dan state dasar. Ini riwayat hasil lokal, bukan pemeriksaan terbaru atau kelulusan toko.

Live Theme Editor, backend form/checkout, screen reader, perangkat/browser lain dan Lighthouse dengan konten nyata belum dinyatakan lulus. Gunakan [checklist](theme-store-checklist.md) sebagai daftar gate; jangan menutup item berdasarkan keberadaan kode. Hak distribusi aset Figma, identitas listing/support, serta fitur commerce yang masih kurang perlu diverifikasi sebelum rilis. Tidak ada otorisasi publish/push/deploy tersirat.

[Standar](theme-standards.md) · [Token](design-tokens.md) · [Development](development.md) · [Lisensi](third-party-licenses.md)
