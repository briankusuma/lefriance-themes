# Mapping Shopify — T00

Sumber visual: file Figma `C2rhn7BP2nXA0LyByRDn09`, frame `3374:242`. Pemetaan ini dipresentasikan sebelum coding T00. Tujuan fondasi: native Liquid/JSON/CSS, tanpa framework tambahan dan tanpa runtime plugin.

| Task | Node | Shopify target | Data merchant / status |
| --- | --- | --- | --- |
| T00 | 3374:242 | layout/theme.liquid, JSON templates, section groups, settings, locale | Fondasi; belum homepage final |
| T01 | 3374:243 | sections/header.liquid dalam header-group.json | Main menu, logo merchant, localization, CTA dan commerce actions sudah diimplementasikan lokal; validasi Shopify editor masih pending |
| T02 | 3374:243 | sections/hero-editorial.liquid (direncanakan) | Foto, wordmark, teks, focal point, link |
| T03 | 3374:270 | sections/material-stories.liquid (direncanakan) | Blok cerita/kategori/media; hubungan kontrol perlu dipastikan |
| T04 | 3374:305 | sections/collection-collage.liquid (direncanakan) | Blok foto dan promosi koleksi |
| T05 | 3374:326 | sections/featured-collections.liquid + snippets/product-card.liquid (direncanakan) | Collection picker per tab; produk/varian dari toko |
| T06 | 3374:388 | sections/featured-journal.liquid (direncanakan) | Article picker per blok; nomor mengikuti konten |
| T07 | 3374:431 | Blok newsletter lokal dalam section footer (direncanakan) | Satu form; jangan duplikasi section newsletter |
| T08 | 3374:431 | sections/footer.liquid dalam footer-group.json | Menu/social/media/newsletter; sekarang footer baseline |
| T09 | 3374:242 | templates/index.json dan QA gabungan | Dilakukan setelah komponen selesai |

Nama file section rencana belum dibuat. Jangan membuat komponen kosong hanya untuk memenuhi tabel. Newsletter mengikuti pengaturan footer yang akan dibangun T07/T08. Main-index sementara hanya menampilkan nama toko sampai hero dan section tersedia.

## Fondasi yang dibuat

- Semua template non-gift-card dipindahkan dari Liquid ke JSON dengan section main yang sesuai. Password memilih layout password; gift_card tetap Liquid.
- Markup halaman dasar berasal dari Skeleton, belum dilengkapi menjadi halaman commerce final. Main product menyediakan insertion point app/custom Liquid; pemecahan seluruh elemen produk menjadi blok adalah pekerjaan milestone product.
- Layout theme merender header/footer groups; masing-masing memakai section baseline dengan menu default. Tampilan Figma keduanya tetap T01/T08.
- Custom Liquid tersedia sebagai section dengan preset dan theme block; app/custom Liquid pada main-product dirender dari section blocks.
- CSS variables dirender dari pengaturan global. Scheme memilih background, foreground, tombol, label, dan border; pengaturan warna tidak disembunyikan dalam kode section.
- Font tetap keluarga Shopify Work Sans sementara. Metadata theme_info masih identitas upstream Skeleton sampai identitas dan kontak dukungan tema benar tersedia; preset dasar Skeleton mengikuti nama upstream dan bukan nama listing final yang sudah disetujui.

## Batas lingkup

Template contact adalah fondasi form, bukan klaim pengiriman teruji. Cart/product/search/collection/article masih baseline dan memerlukan milestone tersendiri (filter, varian, empty/error, penawaran, rich media, dan kebutuhan lain). Tidak ada konfigurator/digital passport, quick view, aplikasi, animasi, upload ke toko, atau publishing pada T00.

Assets foto/logo Figma belum diunduh untuk digunakan. Tidak ada slot foto homepage yang dirender pada T00; asset dibawa saat section terkait dikerjakan dan hak penggunaannya dikonfirmasi. Daftar sumber ada di [lisensi](third-party-licenses.md).

## Handoff T01 → T02

Header memiliki setting overlay_home (default false). Hero T02 dapat menambahkan data-header-overlay pada wrapper section pertamanya; selector hanya mengaktifkan overlay pada home page ketika marker tersebut ada dan setting diaktifkan. Uji kontras di atas foto dan menu terbuka sebelum mengklaim integrasi selesai. Tidak perlu mengubah layout/header group untuk membuat hero.

Header menggunakan native details, local assets/header.js, dan connected/disconnectedCallback agar event listener dibersihkan saat editor mengganti section. Validasi fixture tidak menggantikan pengujian editor nyata. Logo berasal dari settings.logo; pilih logo yang sesuai dengan color scheme. CTA hanya tampil jika label dan link terisi; Start building tidak membuat konfigurator.
