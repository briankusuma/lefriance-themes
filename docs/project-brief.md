# Brief proyek LE FRIANCE

Tema Shopify orisinal untuk merchant furnitur, berbasis Skeleton resmi yang sudah diadaptasi. Target Shopify Theme Store. Jangan init ulang atau menyalin Dawn/Horizon. Sumber desain: Figma `C2rhn7BP2nXA0LyByRDn09`. Instruksi chat terbaru menentukan scope; bahasa laporan Indonesia.

## Kondisi kerja

- Homepage, header/footer, galeri produk, kartu katalog, heading koleksi dan styling section dasar sudah diimplementasikan lokal. Periksa kode aktual sebelum mengubahnya.
- Shopify Liquid/JSON, native CSS/JS; library Swiper dan Lenis di-host dalam assets. Font memakai Shopify font picker (Work Sans), bukan font custom Open Sauce One.
- Settings global ada di config/settings_schema.json; markup settings/CSS tokens ada di snippets/css-variables.liquid. Baca file ini saat mengubah setting, jangan menduplikasi schema dalam dokumentasi.
- Hero intro `3722:1757`: GSAP core 3.15.0, locally hosted and loaded on demand; native grapheme spans are reused for caption fill without a second SplitText pass; green #6C7C69, centered detail/text fill → separate green plane scales uniformly 1→0 while sofa-full scales 0→1 about the same center over 1.8s; only then does the sofa travel → line appears at the center stage → sofa moves down/right upright in front of the wordmark, growing to match the background chair while the wordmark and navbar reveal; furnished-room crossfade begins only after corner arrival. Editable in Editorial hero → Intro animation. Replays on every reload with no session-storage or once setting; disabled in editor/reduced motion. Final frame 3722:1658 uses the desktop design proportions (1535 x 1092), full-width editorial content and zero overlay in the home template. Post-load motion (~5.8 seconds after actual asset readiness) and mobile rectangle placement are derived because Figma supplies static steps, not keyframes/mobile frames. The aria-hidden caption is prepared before GSAP; its visual character fill intentionally waits 0.35s then runs for 2.4s on every load, per the latest user request for a slower visible replay. Actual asset readiness is tracked separately by the existing line. Header motion waits for both readiness and text completion, then holds for 0.8s. Default pre-room is the user-provided `bg-header-center.png`; centered/corner sofa uses `sofa-full.png` (frames 3725:1786/1775). Center width remains 274.995px at 1535px with the 515:573 image ratio (96px minimum on mobile). Final alignment follows frame 3726:1797 (left 1092, top 507.89, 343 x 382), projected through the rendered photo's object-fit, crop and zoom; mobile follows the same photograph crop instead of clamping the cutout into view. No rounded clipping. The loading line represents resource-readiness milestones, not byte-level network progress; no fake percentage is introduced. Cached resources may finish immediately, while the decorative caption still fills over its full visual duration. The caption below the thumbnail is the reveal target; image readiness waits for load before decode. The reference wordmark uses its unchanged inline SVG (9 original paths, 2.2 KB) so letters rise from the baseline right to left. Custom image wordmarks use a right-to-left image mask. No SVG path morphing. Lenis owns page scroll with shared intro/modal/menu locks; GSAP has no separate Lenis RAF.
- Loading thumbnail memakai export PNG 3× `hero-detail-blurred.png` dari Figma `3722:1633`, termasuk frame putih/blur/fade; tanpa overlay blur CSS tambahan. Upload gambar custom tetap memakai overlay sebelumnya.
- Material stories `3734:390`: native sticky stage (550svh host, 100svh stage) with a reversible ScrollTrigger scrub over the remaining 4.5 viewports, no GSAP pin/spacer/reparenting. Title fills → horizontal/cross lines → card scale 0→0.25→1 with the same shared opening progress as all four box lines → outer grid → individually masked bottom-up side-item reveals. Use explicit scaleX/scaleY quickSetters: the compound scale alias does not expand correctly in the pinned GSAP CSSPlugin quickSetter path. SplitText/ScrollTrigger load only near the viewport after intro completion; no per-image global refresh or refresh→Lenis-resize callback. Initialization is idempotent. Full scene from 750px; mobile title-only is derived, not supplied in Figma. Editor selection/reduced motion use static content. No Figma keyframes: timing derived from seven static steps. Long card content scrolls internally. The Page Unresponsive report still needs live-browser profiling/confirmation; local regression checks do not establish its measured cause.
- Collection collage `3734:526`: five scroll steps via native sticky (500svh host/100svh stage), existing GSAP/ScrollTrigger, scrub 1.2s. Centered intro → promotions → final heading/description/promotion positions → directional photo translations clipped only by the fixed outer cell (no moving clip-path), with symmetric power2.inOut easing. Frame 3734:594 lines are reference origins only and are not rendered: desk/table move left from the right edge, sofa/console rise from below, shelf/chair drop from above. No pin or DOM reparenting; starts near viewport after hero. Editable Animate on scroll checkbox. Full scene >=990px with eight blocks/two promotions; mobile, alternate counts, overflowing promotion copy, reduced motion and selected editor sections retain natural grid. Figma supplies static frames only; timing is derived. Browser visual QA pending.
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
| 3374:305, 3734:526 | sections/collection-collage.liquid |
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
