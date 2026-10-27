# T03 — Material stories

Tanggal: 2026-10-27, Asia/Jakarta. Sumber: Figma `C2rhn7BP2nXA0LyByRDn09`, node `3374:270`, screenshot dan design context diperiksa pada tanggal ini.

## Mapping dan perilaku

- Section `material-story` dipasang setelah hero di `templates/index.json`.
- Hingga 12 blok story: image picker, heading, richtext description, category, optional link dan label. Blok bisa ditambah, dihapus, dan diurutkan.
- Kategori berasal dari blok yang tersedia. All menampilkan semua pilihan; kategori memilih kelompok cerita; thumbnail dan indikator memilih satu cerita. Tidak ada autoplay atau filter katalog.
- Item awal default kedua mengikuti screenshot; fallback item pertama bila posisinya tidak ada. Tiga blok menghasilkan tiga thumbnail dan tiga indikator.
- Kontrol memakai native buttons, `aria-pressed`, `aria-controls`, focus-visible, tombol panah/Home/End, dan status announcement. Pemilihan blok dari editor menampilkan story terkait serta menghapus filter.
- Custom element menginisialisasi ulang ketika section baru masuk DOM dan membersihkan listener ketika dilepas. Blok mempertahankan `shopify_attributes`.
- Tanpa JS, semua cerita tampil; kontrol interaktif disembunyikan. Kondisi kosong menampilkan pesan terjemahan.
- Desktop memakai tiga kolom dengan garis dekoratif dan card putih/blur. Mobile: heading, kategori, kartu, thumbnail, lalu teks pendukung. Mobile adalah not in Figma.

## Aset dan geometri

Tiga foto sumber 960 x 1200px didownload dari response Figma, dipakai di slot thumbnail dan card sesuai nama sumber. Table workshop adalah item awal. Render card memakai crop landscape sekitar 647 x 444px di desktop 1535px, sedangkan thumbnail berbentuk persegi. Radius card sekitar 10.66px, thumbnail 8.528px; blur 17.589px dimask bertahap untuk mendekati screenshot. Indikator aktif memakai SVG Figma asli 12.7917 x 12.7917px, bukan gambar ulang. Tidak ada URL sementara Figma di runtime. Asset callsites ada di snippet `material-story-image` serta section.

Gambar menggunakan responsive Shopify CDN URLs dan lazy loading; upload merchant diprioritaskan atas opsi gambar referensi. Preset section baru memakai placeholder, sedangkan homepage yang diminta memakai foto referensi. Hak distribusi tetap memerlukan konfirmasi sebelum rilis.

## Deviasi

- Work Sans dari font picker menggantikan Open Sauce One/Inter sesuai kebijakan proyek.
- Foreground dan control border memakai color scheme untuk kontras; garis grid dekoratif diturunkan opasitasnya. Teks 22–40% pada desain tidak disalin.
- Traceable menggantikan Tracable.
- Indikator mengikuti tiga item yang benar-benar tersedia, bukan lima indikator statis dalam desain.
- Copy penutup tentang digital passport diganti dengan narasi material agar tidak menjanjikan layanan yang tidak dibangun. Seluruh copy dapat diedit.
- Foto dan copy yang panjang memperbesar area konten; tinggi section tidak dikunci sehingga tidak memotong teks.

## Verifikasi dan batas

- Shopify CLI 4.9.4 Theme Check: `[]`.
- JavaScript syntax dan JSON parsing lulus; CSS/JS/JSON diformat dengan Prettier.
- Browser Chrome lokal: actual Liquid dirender memakai LiquidJS dengan Shopify filters/CDN disimulasikan. Skenario normal, nol item, satu item, 12 item, teks panjang, placeholder, dan tanpa JS diuji di 320, 390, 749, 990, 1535px. Hasil dicatat di `material-story-browser.json`.
- Pemeriksaan meliputi overflow, aset terbaca, pilihan awal/fallback, kategori, thumbnail, indikator, keyboard End, simulated editor block selection, kategori kosong, containment copy, dan target kontrol >=24px. Desktop serta mobile ditinjau visual.
- Ini bukan pengujian backend Shopify/Theme Editor. Add/remove/reorder, image picker/focal point, color schemes dan live preview perlu diperiksa di development theme. Lighthouse dan browser lintas platform belum dijalankan; tidak ada klaim skor performa atau pixel match font.

## Dokumentasi resmi yang diperiksa

- [Section schema](https://shopify.dev/docs/storefronts/themes/architecture/sections/section-schema)
- [Input settings](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings)
- [Theme Editor section/block events](https://shopify.dev/docs/storefronts/themes/best-practices/editor/integrate-sections-and-blocks)
- [image_tag](https://shopify.dev/docs/api/liquid/filters/image_tag)
- [Theme Store requirements](https://shopify.dev/docs/storefronts/themes/store/requirements)
