# Task aktif — homepage LE FRIANCE

## Brief

- Tanggal: 2026-10-27
- Zona waktu: Asia/Jakarta
- Status: in_progress
- Task aktif: T07 + T08
- Judul: Implementasi homepage bertahap dari Figma

### Tujuan

Membangun homepage furnitur sesuai frame April Shoot 002 // Collective sebagai section Shopify yang dapat diedit merchant. Backlog ini adalah panduan kerja, bukan formulir wajib sebelum memberi instruksi.

- **eksekusi task** tanpa target lain menjalankan Task aktif saja.
- **Buat/implementasikan section ini + link Figma**, nama section, atau ID task memilih target tersebut meskipun Task aktif masih T00. Agent mencocokkan dan memperbarui pencatatan sendiri.
- Permintaan eksplisit boleh memilih beberapa section; link homepage saja tidak otomatis memilih seluruh backlog.
- Permintaan analisis atau penyusunan dokumen tetap hanya analisis/dokumentasi. Link tanpa kata kerja mengikuti konteks yang jelas; jika maksudnya belum jelas, inspeksi dulu dan klarifikasi singkat sebelum implementasi.

T00 selesai untuk scope fondasi lokal dan dokumentasi pada 2026-10-26. Preview/editor dan QA storefront belum teruji; tetap menjadi pemeriksaan saat akses tersedia, bukan hasil yang diklaim lulus. Nama file kanonis tetap `docs/tasks.md`; sebutan "task.md" dari pengguna merujuk file ini, bukan alasan membuat duplikat.

### Referensi dan batas bukti

- [Brief proyek](project-brief.md), [standar teknis](theme-standards.md), dan [checklist](theme-store-checklist.md).
- [Figma homepage](https://www.figma.com/design/C2rhn7BP2nXA0LyByRDn09/Speedtest?node-id=3374-242), ukuran desktop 1535 × 6554 px.
- Metadata dan screenshot diperiksa ulang pada 2026-10-26: enam frame utama, bukan enam halaman terpisah.
- Struktur visual terverifikasi; perilaku klik, token persis, dan rancangan mobile belum diverifikasi. Usulan interaksi di bawah adalah rencana implementasi, bukan perilaku prototype yang sudah terbukti.
- Sebelum coding setiap task, baca konteks desain, screenshot detail, dan token terkait melalui akses yang tersedia sesuai AGENTS.md. Tidak perlu mengambil kode desain untuk penyusunan backlog ini.

### Batasan bersama

- Pertahankan arah visual dan aset referensi; perbaikan keterbacaan dan kebutuhan commerce dicatat sebagai deviasi.
- Desktop Figma adalah referensi visual; mobile/state yang tidak tersedia boleh diturunkan dari token dan dicatat sebagai "not in Figma".
- Tidak termasuk konfigurator furnitur, sistem digital passport, aplikasi, halaman transaksi lengkap, publish, deploy, perubahan toko live, atau commit.
- Tautan di homepage boleh memakai resource toko yang sudah tersedia; tidak membuat halaman lengkap di luar task secara diam-diam.
- Periksa dependensi terhadap kondisi kode sebenarnya. Untuk permintaan implementasi langsung, kerjakan prasyarat minimum yang memang diperlukan dan jelaskan alasannya; jangan menjalankan semua task lain hanya karena tercantum sebagai dependensi. Catat prasyarat dan pengujian yang masih terhambat.
- Kriteria selesai task aktif = kriteria khusus ID tersebut ditambah validasi relevan di AGENTS.md. Uji editor/store yang belum tersedia dicatat sebagai hambatan, bukan lulus.

### Cara memilih target dari Figma

Cocokkan file key `C2rhn7BP2nXA0LyByRDn09` dan node berikut, lalu baca rincian task terkait:

| Node | Target |
| --- | --- |
| `3374:242` | Homepage; pilih section sesuai instruksi, bukan otomatis T00–T09 |
| `3374:243`, `3646:1124` | T01 header / T02 hero; frame baru `3646:1124` dipakai pada follow-up pengguna |
| `3374:270` | T03 modular system |
| `3374:305` | T04 kolase koleksi |
| `3374:326` | T05 produk unggulan |
| `3374:388` | T06 journal |
| `3660:1302` | T06 journal, versi implementasi terbaru |
| `3660:1365` | T07 newsletter + T08 footer, versi implementasi terbaru |
| `3374:431` | T07 newsletter / T08 footer; bedakan dari instruksi |

Node anak dipetakan ke section induknya setelah inspeksi. Tautan file berbeda harus diperiksa sebagai sumber baru. Jika ada beberapa kandidat yang berdampak pada lingkup kerja, tanyakan hanya pilihan tersebut.

### Pemeriksaan standar Shopify

Rujuk [hasil review 2026-10-26](shopify-review.md). Untuk setiap ID, simpan dokumentasi resmi yang digunakan, hasil Theme Check, bukti editor/browser yang relevan, dan deviasi Figma di laporan. Plugin tidak diperlukan; gunakan dokumentasi resmi dan tooling yang tersedia. T00–T09 hanya milestone homepage; jangan menganggap halaman transaksi dan submission selesai.

### Pekerjaan (urut prioritas)

- [x] T00 — Fondasi tema dan token desain
- [ ] T01 — Header dan navigasi
- [ ] T02 — Hero editorial
- [ ] T03 — Modular system / cerita material
- [ ] T04 — Kolase koleksi
- [ ] T05 — Produk unggulan dan tab koleksi
- [ ] T06 — Journal dan cerita studio
- [ ] T07 — Newsletter
- [ ] T08 — Footer editorial
- [ ] T09 — Integrasi dan validasi homepage

## Rincian task per section

Nama file di mapping merupakan usulan; periksa struktur Skeleton saat implementasi dan gunakan ulang komponen yang sesuai.

### T00 — Fondasi tema dan token desain

- Figma: [node 3374:242](https://www.figma.com/design/C2rhn7BP2nXA0LyByRDn09/Speedtest?node-id=3374-242).
- Dependensi: Tidak ada; periksa ulang kondisi repo.
- Mapping: Fondasi global; belum merupakan section visual.

Pekerjaan:

- [x] Verifikasi sumber dan persyaratan fondasi Shopify terbaru, unduh Shopify Skeleton resmi tanpa menimpa dokumentasi atau perubahan pengguna. Review submission lengkap tetap pada milestone rilis.
- [x] Ambil design context, screenshot, dan token Figma; dokumentasikan warna, tipografi, grid, spacing, radius, rasio gambar, serta pengganti font Shopify bila diperlukan.
- [x] Siapkan layout, pengaturan global, locale, header/footer section groups, Custom Liquid, dan struktur template dasar sesuai standar. Template dasar bukan implementasi lengkap seluruh halaman toko.
- [x] Catat mapping section dan daftar aset beserta sumber/lisensinya. Jangan menyimpulkan aset Figma otomatis berlisensi untuk distribusi.
- [x] Dokumentasikan cara preview, kebutuhan development store, dan konfigurasi Theme Check tanpa menyimpan kredensial.

Kriteria selesai:

- [x] Struktur tema dari sumber Skeleton resmi tersedia dan dokumentasi yang ada tetap utuh.
- [x] Token dan mapping tercatat pada docs/design-tokens.md dan docs/section-mapping.md; nilai yang belum diketahui ditandai, bukan dikarang.
- [x] Theme Check dijalankan dan temuan relevan diselesaikan; kemampuan preview serta akses yang belum tersedia dilaporkan.

### T01 — Header dan navigasi

- Figma: [node 3646:1124](https://www.figma.com/design/C2rhn7BP2nXA0LyByRDn09/Speedtest?node-id=3646-1124), menggantikan referensi awal `3374:243` pada follow-up pengguna.
- Dependensi: T00
- Mapping: Section header dalam header group; terpisah dari hero meskipun berbagi frame.

Pekerjaan:

- [x] Bangun logo kecil, menu utama, selector negara/bahasa, dan CTA yang dapat diatur merchant.
- [x] Tambahkan akses search/cart dan komponen `<shopify-account>` desktop/mobile; rencanakan predictive search pada milestone search agar tidak mengklaim fitur lengkap dari tautan saja. Catat penyesuaian dari Figma.
- [x] Gunakan link_list dan link CTA; "Start building" hanya link yang dikonfigurasi, bukan konfigurator. Jangan membuat tujuan palsu jika link belum diisi.
- [x] Buat navigasi mobile, submenu, focus management, Escape, serta header yang tetap terbaca di atas hero maupun tanpa hero.

Kriteria selesai:

- [x] Menu desktop/mobile dapat dipakai dengan keyboard dan tidak terpotong saat label panjang — verified in local browser fixture; Shopify server integration pending.
- [ ] Logo beragam rasio dan menu kosong ditangani; pengaturan tampil langsung di Theme Editor.
- [x] Tautan memakai resource/rute toko, bukan URL demo; tambahan commerce dicatat sebagai not in Figma.

### T02 — Hero editorial

- Figma: [node 3646:1124](https://www.figma.com/design/C2rhn7BP2nXA0LyByRDn09/Speedtest?node-id=3646-1124), menggantikan referensi awal `3374:243` pada follow-up pengguna.
- Dependensi: T00, T01
- Mapping: Section hero editorial pada index; logo besar berbeda dari logo navigasi.

Pekerjaan:

- [x] Bangun foto lifestyle penuh, wordmark besar, kartu gambar kecil, dan deskripsi kiri bawah sesuai komposisi referensi.
- [x] Sediakan gambar desktop/mobile, focal point, logo/wordmark, teks, warna overlay, serta link kartu opsional sebagai pengaturan.
- [x] Pertahankan proporsi dan keterbacaan saat logo/teks berubah; gambar hero diprioritaskan untuk LCP, aset lain tidak ikut diprioritaskan.
- [x] Turunkan komposisi mobile dari token; jangan mengecilkan desktop secara keseluruhan.

Kriteria selesai:

- [ ] Foto, logo, kartu, dan teks mengikuti referensi desktop; keputusan mobile dicatat.
- [x] Tidak ada overflow pada 375, 768, dan 1535 px dalam fixture; screenshot desktop/mobile diperiksa. QA dengan font/media toko tetap terbuka.
- [ ] Gambar kosong, teks panjang, serta logo dengan rasio berbeda tidak merusak section.

### T03 — Modular system / cerita material

- Figma: [node 3374:270](https://www.figma.com/design/C2rhn7BP2nXA0LyByRDn09/Speedtest?node-id=3374-270).
- Dependensi: T00
- Mapping: Section cerita material dengan blok konten dan kategori.

Pekerjaan:

- [x] Bangun grid gelap tiga kolom, judul dua tone, kartu foto putih, thumbnail, kategori kiri, indikator, serta teks pendukung.
- [x] Sediakan blok foto, judul, deskripsi, kategori, dan link opsional; kategori bekerja pada blok konten, bukan menyamar sebagai filter katalog.
- [x] Definisikan hubungan kategori, thumbnail, dan indikator dari konten yang benar-benar tersedia. Jumlah indikator mengikuti jumlah item; jangan hard-code lima slide dari gambar.
- [x] Usulkan perilaku klik dalam mapping sebelum coding. Kategori menyaring story; thumbnail/indikator memilih item secara manual. Tidak ada konfigurator/digital passport.
- [x] Perbaiki Traceable, periksa kontras, gunakan perpindahan manual tanpa autoplay; mobile memakai urutan judul, kategori, kartu, thumbnail, lalu teks.

Kriteria selesai:

- [x] Kategori dan pemilih item menampilkan konten yang benar, termasuk kategori kosong dan satu item — browser lokal, backend tidak diperlukan.
- [x] Keyboard, selected state, area tekan, dan pembacaan teks bekerja; semua konten penting tetap dapat diakses tanpa JS — validasi DOM/keyboard lokal; screen reader manual belum diuji.
- [ ] Section mendukung add/remove/reorder blok di editor; perbedaan copy dan interaksi terdokumentasi.

### T04 — Kolase koleksi

- Figma: [node 3374:305](https://www.figma.com/design/C2rhn7BP2nXA0LyByRDn09/Speedtest?node-id=3374-305).
- Dependensi: T00
- Mapping: Section editorial collection collage dengan blok gambar dan CTA.

Pekerjaan:

- [x] Bangun heading, deskripsi, enam foto, teks editorial, serta dua CTA bertanda plus sesuai grid asimetris.
- [x] Sediakan blok gambar dan blok promosi koleksi dengan collection picker atau link; plus merupakan tautan navigasi.
- [x] Gunakan gambar responsif/image_tag untuk focal point; grid mengalir mengikuti jumlah blok. Uji focal point Shopify runtime masih terbuka.
- [x] Mobile mengikuti urutan blok; judul dan tautan berada dalam panel yang sama.

Kriteria selesai:

- [ ] Kolase sesuai referensi desktop dan CTA menuju tujuan yang dikonfigurasi.
- [x] Jumlah gambar sedikit/banyak dan deskripsi panjang tetap rapi pada browser lokal; upload campuran memerlukan uji data toko.
- [ ] Blok bisa ditambah, dihapus, dan diurutkan; gambar dekoratif tidak membuat kontrol tanpa nama.

### T05 — Produk unggulan dan tab koleksi

- Figma: [node 3374:326](https://www.figma.com/design/C2rhn7BP2nXA0LyByRDn09/Speedtest?node-id=3374-326).
- Dependensi: T00
- Mapping: Section featured collections dengan blok tab koleksi; product-card snippet dapat dipakai ulang.

Pekerjaan:

- [x] Bangun heading, deskripsi, panah, tab kategori, empat kartu produk desktop, dan tautan lihat koleksi.
- [x] Collection picker per tab; All memakai koleksi pilihan merchant. Heading/CTA mengikuti tab aktif.
- [x] Gambar, judul, URL, harga/rentang, sale, sold out, unit price dan swatch berasal dari data produk. Browser memakai fixtures; integrasi katalog toko masih terbuka.
- [x] Swatch menaut ke varian/product_url nyata, dengan nama opsi dan current state. Media terkait dibuka di halaman varian; tidak membuat preview/harga palsu di card.
- [x] Dua kolom mulai 600px, satu di bawahnya; tab scrollable. Panah hanya aktif sesuai overflow produk.
- [x] Tidak menambah quick add/wishlist/quick view; kartu membuka halaman produk.

Kriteria selesai:

- [ ] Pergantian tab, produk, CTA koleksi, dan swatch konsisten dengan data toko.
- [ ] Produk kosong, satu produk, judul panjang, tanpa swatch, sale, dan sold out ditangani.
- [ ] Harga tidak terpotong dan cukup terbaca; kartu memakai snippet bersama serta dapat dioperasikan dengan keyboard.

### T06 — Journal dan cerita studio

Referensi implementasi terbaru: [node 3660:1302](https://www.figma.com/design/C2rhn7BP2nXA0LyByRDn09/Speedtest?node-id=3660-1302), sesuai permintaan 2026-10-27. Scope lokal dibangun; editor/store QA masih terbuka.

- Figma: [node 3374:388](https://www.figma.com/design/C2rhn7BP2nXA0LyByRDn09/Speedtest?node-id=3374-388).
- Dependensi: T00
- Mapping: Section featured journal; kartu dari article picker dalam blok.

Pekerjaan:

- [ ] Bangun intro studio, heading tengah, deskripsi, nomor item, tiga kartu editorial, serta navigasi panah.
- [ ] Sediakan article picker per blok dan pengaturan intro; judul, gambar, kutipan, serta link artikel berasal dari artikel toko.
- [ ] Gunakan pola kartu gambar dan kartu teks sesuai referensi tanpa membuat copy duplikat yang tidak terkait artikel.
- [ ] Angka mengikuti jumlah blok; hubungan tombol 01–06 dengan kartu adalah usulan navigasi item, perlu dicatat dalam mapping. Jangan membuat enam konten fiktif karena angka di desain.
- [ ] Pada mobile gunakan urutan baca yang jelas; nonaktifkan kontrol yang tidak diperlukan ketika hanya ada satu item.

Kriteria selesai:

- [ ] Semua kartu membuka artikel yang dipilih; judul, kutipan, dan gambar kosong ditangani.
- [ ] Nomor dan panah menunjuk item yang benar, dengan fokus dan label yang jelas.
- [ ] Komposisi tiga kartu sesuai referensi desktop dan konten tetap bisa dibaca tanpa hover.

### T07 — Newsletter

Implementasi terbaru mengikuti `3660:1365` di footer yang sama; validasi lokal selesai, signup backend belum diuji.

- Figma: [node 3374:431](https://www.figma.com/design/C2rhn7BP2nXA0LyByRDn09/Speedtest?node-id=3374-431).
- Dependensi: T00
- Mapping: Blok newsletter di footer; bukan form duplikat pada homepage.

Pekerjaan:

- [ ] Bangun heading besar, label email, input, dan tombol submit pada baris newsletter footer.
- [ ] Gunakan formulir newsletter Shopify yang didokumentasikan; sediakan pesan validasi, error, dan sukses serta label yang terhubung ke input.
- [ ] Sediakan pengaturan heading, teks bantuan, dan label tombol; gunakan copy newsletter yang jelas menggantikan GET CONTACT dan catat deviasi.
- [ ] Pada mobile susun heading lalu form; jangan membuat form terlalu sempit atau mengandalkan placeholder sebagai label.

Kriteria selesai:

- [ ] Form berhasil diproses di development store; email invalid dan pesan sukses/error teruji.
- [ ] Input memiliki label, fokus terlihat, serta pesan dapat dipahami pembaca layar.
- [ ] Blok bisa dinonaktifkan tanpa menyisakan ruang kosong atau merusak footer.

### T08 — Footer editorial

Implementasi terbaru mengikuti `3660:1365` dan mengganti footer foundation; editor/store QA masih terbuka.

- Figma: [node 3374:431](https://www.figma.com/design/C2rhn7BP2nXA0LyByRDn09/Speedtest?node-id=3374-431).
- Dependensi: T00, T07
- Mapping: Section footer dalam footer group, menampung blok newsletter dari T07.

Pekerjaan:

- [ ] Bangun grid gelap, thumbnail, menu, ikon sosial, kartu foto studio, teks brand, dan wordmark besar.
- [ ] Sediakan footer menu, blok brand/media/social, link kebijakan dan informasi toko yang dikonfigurasi; jangan hard-code akun sosial atau kebijakan palsu.
- [ ] Integrasikan newsletter satu kali; gunakan satu sistem warna, border, dan spacing untuk seluruh footer.
- [ ] Ganti copy platform musik dengan copy furnitur yang dapat diedit. Indikator media hanya tampil jika ada lebih dari satu item dan benar-benar berfungsi.
- [ ] Wordmark mengikuti logo merchant dengan rasio bebas; cropping dekoratif tidak boleh menghilangkan satu-satunya identitas/teks penting. Susun ulang grid pada mobile.

Kriteria selesai:

- [ ] Footer tetap rapi ketika menu/social/media/newsletter kosong atau dimatikan.
- [ ] Link sosial, kebijakan, dan menu dapat dipakai dengan keyboard; ikon punya nama aksesibel.
- [ ] Tidak ada copy musik, akun palsu, atau indikator dekoratif yang menyerupai kontrol mati; editor memperbarui semua blok dengan benar.

### T09 — Integrasi dan validasi homepage

- Figma: [node 3374:242](https://www.figma.com/design/C2rhn7BP2nXA0LyByRDn09/Speedtest?node-id=3374-242).
- Dependensi: T01–T08 selesai
- Mapping: Susunan index, header/footer groups, dan laporan QA homepage.

Pekerjaan:

- [ ] Rakit urutan hero, modular system, kolase, featured collections, journal; header/footer melalui groups dan newsletter hanya di footer.
- [ ] Uji add/remove/reorder dan beberapa instance section di Theme Editor; pastikan event editor tidak menggandakan listener atau merusak state.
- [ ] Bandingkan terhadap screenshot Figma pada desktop 1535 px; uji mobile 375 px dan tablet 768 px, keyboard, reduced motion, konten panjang, dan aset kosong.
- [ ] Jalankan Theme Check dan pengukuran Lighthouse homepage dengan konten nyata; catat lingkungan, skor, dan keterbatasan. Jangan mengklaim skor collection/product jika belum diuji.
- [ ] Perbarui deviasi, lisensi, dan checklist hanya untuk bukti yang terverifikasi; catat halaman toko di luar homepage sebagai pekerjaan lanjutan.

Kriteria selesai:

- [ ] Semua task homepage selesai beserta bukti validasinya; tidak ada kontrol mati atau overflow tak disengaja.
- [ ] Theme Check bersih untuk temuan relevan; homepage memenuhi target performa/aksesibilitas proyek pada pengujian yang dicatat.
- [ ] Laporan tidak mengklaim tema siap submission: halaman collection/product/cart/search dan persyaratan lain tetap memerlukan milestone tersendiri.

### G01 — Global settings dan commerce essentials (follow-up pengguna)

- Sumber: homepage `3374:242` dan header/hero baru `3646:1124`.
- Scope eksplisit 2026-10-26: font, color, section/container width, cart dan card; perilaku commerce seperti kemampuan inti Dawn, dengan kode independen Skeleton.
- [x] Analisis per section dan mapping pengaturan global/section: [global-settings.md](global-settings.md).
- [x] Hubungkan global settings ke CSS, kartu produk, cart page/drawer, dan essentials.
- [x] Sediakan featured collection, rich text, newsletter dan announcement bar reusable; tidak merakit seluruh backlog homepage.
- [x] Cart Ajax enhancement, native fallback, empty/error, quantities, notes, discounts dan selling plans dalam markup cart.
- [x] Cart type tersedia sebagai drawer, link ke cart page, atau floating panel yang terhubung ke ikon cart dan dapat diatur dari Theme settings.
- [x] Product form berbasis blocks, varian/harga/quantity/media, accelerated checkout native dan kartu bersama untuk collection.
- [ ] Uji Theme Editor, cart/checkout/payment/subscription dan data toko nyata di development theme.
- [ ] Lighthouse home/collection/product dan perbandingan akhir Figma dengan font/media toko.
- High-variant/combined listings, filtering, predictive search, pickup/recommendations/gift card recipient dan full media QA memerlukan milestone lanjutan. G01 tidak mengklaim seluruh fitur Dawn/Theme Store selesai.

## Progres dan laporan — task aktif saja

- ID laporan: T07 + T08
- Koreksi sambungan kolase/Featured collections: border bawah kolase sebelumnya masih memakai warna border UI global yang gelap. Kini memakai ornament #E5E3D3 setebal 1.066px, senada dengan frame vertikal section berikutnya.
- Follow-up T05/T06 ornament: properti asli `3660:1345` dan `3660:1298` diperiksa; keduanya memakai stroke SOLID #E5E3D3 alpha 1 (bukan gradient footer). Frame vertikal/garis tengah serta horizontal full bleed kini memakai token ornament khusus, tebal 1.066px; setting Ornament color tersedia per section. Theme Check bersih; [36/36 pemeriksaan scoped](validation/light-ornaments-browser.json) lulus untuk warna, full width, konfigurasi warna dan overflow di 320/749/1535px. Kedua section ditinjau visual.
- Tanggal: 2026-10-27, Asia/Jakarta
- Target: `3660:1365`, diterapkan langsung ke `sections/footer.liquid` dalam footer group.
- Follow-up ornament `3660:1408`: stroke dekoratif khusus `#5B5148` (setting Ornament color), garis horizontal full bleed, frame vertikal top-to-bottom alpha fade hingga wordmark. Paint asli diperiksa lewat Figma Plugin API: stroke vertikal `#5B5148` alpha 1 ke `#C1AC99` alpha 0; photo fill hitam opacity 0.1 dengan stop CSS 39.015%–110.42%, blur CSS 17.589px dan mask transisi. Border global/UI tidak diubah. Validasi lanjutan [274/274](validation/footer-ornament-browser.json), termasuk warna/fade/overlay dan overflow; ditinjau visual di Chrome.
- Status: implementasi/validasi lokal selesai; Theme Editor, pengiriman newsletter dan Lighthouse belum diuji. Arsip T06: [laporan sebelumnya](task-history/2026-10-27-04.md).

Footer foundation diganti grid editorial gelap: thumbnail, menu bertingkat, sosial, foto studio/slider manual, copy furnitur, newsletter native dan wordmark. Pengaturan menu/payment lama dipertahankan. Schema menambah media/wordmark merchant, color scheme, copy, URL sosial, hingga enam blok foto dan satu blok newsletter yang dapat dihapus. Kebijakan berasal dari shop.policies; copyright, powered_by_link dan payment icons native tetap tersedia. URL sosial kosong tidak membuat akun/link palsu. Reference assets dapat dimatikan.

Newsletter memakai form customer, contact[email], tag newsletter, label terkait, required/email/autocomplete, error terkait input dan pesan sukses. Tidak ada submit Ajax atau daftar email eksternal. Gallery hanya memiliki indikator untuk >=2 slide; no-JS menampilkan seluruh foto. Indikator mengikuti jumlah slide, mendukung keyboard serta block selection editor.

Validasi: Shopify CLI 4.9.4 Theme Check `[]`, JS syntax/diff check bersih. **208/208** browser checks lokal di 320/749/1100/1535px: normal/empty/slides/no-JS/long/error/success. Email validity browser dan markup respons server disimulasikan; **tidak membuktikan signup backend**. [Bukti](validation/footer-editorial-browser.json). Desktop ditinjau visual.

Deviasi: font picker Work Sans, kontras diperkuat, GET CONTACT/SEND menjadi label email/Subscribe, copy musik diganti furnitur, satu foto referensi tanpa lima indikator mati, wordmark ditampilkan utuh. Mobile turunan. Hak distribusi Figma masih terbuka; development-theme QA untuk newsletter nyata, editor, logo beragam rasio, kebijakan/payment dan Lighthouse diperlukan. Temuan audit T05 tidak berubah. Tidak ada commit/push/deploy/publish.

Sumber resmi: [email consent](https://shopify.dev/docs/storefronts/themes/customer-engagement/email-consent), [form](https://shopify.dev/docs/api/liquid/tags/form), [shop](https://shopify.dev/docs/api/liquid/objects/shop).
---

## Aturan pencatatan dan eksekusi

T06 slider follow-up 2026-10-27 — node `3660:1302` diperiksa ulang dengan screenshot. Journal dilengkapi menjadi enam blok: tiga sebelumnya tetap, ditambah The finishing touch (foto), Made for everyday living (teks), A closer look at the grain (foto). Dua foto ilustratif dihasilkan dengan built-in imagegen, dipadatkan JPEG 960px (~203KB/~226KB); [prompt dan sumber](validation/journal-image-prompts.md). Image picker/artikel tetap mengungguli foto bundel; pilihan foto tersedia per blok di Theme Editor. Tidak membuat artikel atau tautan palsu.

Slider menampilkan tiga kartu desktop dengan cerita 02 di tengah saat awal. Tombol panah bergerak satu cerita; nomor, keyboard, pemilihan blok editor, scroll manual, RTL dan resize menyinkronkan indeks aktif. Padding sisi memungkinkan cerita pertama/terakhir berada di tengah. Pemusatan setelah scroll memakai JS agar resize tidak dilawan native scroll snap; tanpa JS seluruh konten tetap tampil sebagai grid. Tidak ada autoplay. Mobile 85% lebar rail adalah turunan karena frame mobile tidak disediakan. Enam nomor mengikuti desain (06 terpisah); panah previous aktif pada cerita 02 karena cerita 01 kini dapat dipusatkan, berbeda dari ilustrasi disabled Figma.

Validasi: Theme Check CLI 4.9.4 `[]`, syntax JS dan diff bersih. [240/240 browser checks](validation/journal-centered-browser.json) untuk 320/749/1535px, normal/empty/single/12-card/long/no-JS/article, termasuk pemusatan setiap kartu dan klik next. [10/10 resize/RTL/manual scroll](validation/journal-resize-rtl-browser.json). Desktop ditinjau visual; aset baru diperiksa. Live Theme Editor dan Lighthouse belum diuji; tidak ada push/deploy/publish. Dokumentasi Shopify: [article](https://shopify.dev/docs/api/liquid/objects/article), [asset_img_url](https://shopify.dev/docs/api/liquid/filters/asset_img_url).

Footer copy follow-up 2026-10-27: sesuai instruksi pengguna, `show_footer_details` dimatikan pada footer group sehingga copyright, Powered by Shopify, privacy/policy dan payment row tidak tampil. Fitur tetap tersedia melalui checkbox Show footer details, dengan `powered_by_link` asli bila diaktifkan. Wordmark referensi terpotong menjadi elemen terakhir footer. Newsletter memiliki setting Email placeholder terpisah dari Email label; konfigurasi saat ini GET CONTACT / Your Email / SEND. Native customer form dan label aksesibel dipertahankan. Theme Check CLI 4.9.4 `[]`, diff bersih, [426/426 checks lokal](validation/footer-copy-browser.json) pada 320/749/1100/1535px: copy, placeholder terpisah, detail tersembunyi, wordmark terakhir, crop, overflow dan state form. Backend signup/live Theme Editor belum diuji; belum dipublikasikan.

Follow-up footer 2026-10-27, Figma `3660:1365` dan screenshot pengguna: proporsi newsletter desktop disesuaikan, heading memakai balanced wrapping dan skala 51.167px pada lebar referensi, brand copy 19.188px/70% foreground, form rata bawah, placeholder mengikuti email label, garis input diperhalus. Garis pemisah full bleed tetap #5B5148. Wordmark referensi dibatasi tinggi sehingga bagian bawah terpotong seperti frame Figma; wordmark merchant tetap utuh. Perubahan padding input milik pengguna dipertahankan. Work Sans dan copy form merchant tetap dipakai; tidak mengklaim font identik Figma. Tidak mengubah signup backend.

Validasi: Theme Check CLI 4.9.4 `[]`, diff bersih, desktop ditinjau lokal. [322/322 checks browser](validation/footer-refinement-browser.json) pada 320/749/1100/1535px untuk normal/empty/slides/no-JS/long/error/success, termasuk overflow, gambar, crop referensi, placeholder, label dan email validity. Respons server disimulasikan; bukan pengujian signup backend. Preview development theme/Theme Editor dan Lighthouse belum diuji. Acuan [customer form](https://shopify.dev/docs/api/liquid/tags/form#form-customer). Tidak ada publikasi.

Koreksi final T05, 2026-10-27 — screenshot Admin memperjelas bahwa target adalah empat produk berbeda, bukan varian atau galeri. Read-only storefront `/collections/all` mengonfirmasi Contour Upholstered Chair, Modern Walnut Armchair, Sculpted Wood Lounge Chair, dan Walnut Accent Chair beserta URL asli. Temuan satu produk sebelumnya hanya berlaku pada koleksi `frontpage`, bukan seluruh katalog. Loop varian dan fallback galeri dihapus; section kembali satu kartu per produk. Tab All dan Chair memakai `all` dengan product_list berurutan Walnut, Sculpted, Modern, Contour; limit tampilan empat. Setting opsional Selected products memungkinkan merchant mengubah pilihan/urutan; bila kosong memakai produk koleksi. Template toko ini menyimpan pilihan handle aktual, schema tidak memiliki default khusus toko. Snippet kartu kembali memakai data produk asli.

Referensi Figma `3660:1293` dibaca ulang dengan screenshot: empat kartu, rasio 10:11, gap 21px, warna #E7DBD0, radius 10.66px; layout yang ada dipakai. Nama/harga/gambar/tautan mengikuti katalog, bukan angka atau swatch dekoratif Figma. Theme Check CLI 4.9.4 `[]`, diff bersih; [19/19 checks lokal](validation/featured-distinct-products-browser.json) pada 320/749/1535px memverifikasi empat kartu dan gambar berbeda, urutan nama Figma, empat tujuan produk, satu baris desktop serta tanpa overflow halaman. Pembuktian render memakai fixture; storefront live hanya dibaca, perubahan belum dipublikasikan. Theme Editor/live preview dan Lighthouse masih terbuka. Laporan galeri/varian di bawah adalah riwayat yang sudah digantikan koreksi ini. Acuan [product_list](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings#product_list).

Follow-up T05 berikutnya, 2026-10-27 — menggantikan pilihan thumbnail di bawah: pengguna meminta empat gambar besar berjajar, memakai varian dari produk koleksi. Section sekarang menampilkan kartu per varian dengan gambar (fallback gambar produk), judul, harga, badge ketersediaan dan URL varian asli. Jumlah kartu dibatasi setting `products_to_show`. Jika koleksi hanya satu produk Default Title dengan beberapa gambar, maksimal empat gambar menjadi kartu galeri yang membuka produk yang sama; tidak dibuat varian/nama/harga palsu. Thumbnail sebelumnya dihapus. Desktop tetap empat kolom; mobile rail responsif. Tab All tetap mengambil Homepage. Acuan: [variant](https://shopify.dev/docs/api/liquid/objects/variant).

Validasi: Theme Check CLI 4.9.4 `[]`, JS syntax dan diff bersih. Browser lokal: [16/16 galeri empat kartu](validation/featured-four-cards-browser.json), [22/22 varian](validation/featured-variant-cards-browser.json) pada 320/749/1535px, termasuk empat gambar berbeda, satu baris desktop, tautan/harga/stok varian dan overflow. Fixture bukan data toko; varian aktual belum tersedia untuk uji end-to-end. Theme Editor dan Lighthouse belum diuji. Tidak ada perubahan katalog atau publikasi.

Follow-up T05, 2026-10-27: tab All aktif saat halaman dibuka, memakai koleksi Homepage (`frontpage`) yang sudah dipilih merchant. Pemeriksaan storefront menemukan satu produk Walnut Accent Chair, empat gambar, satu varian Default Title yang sold out. Sesuai pilihan pengguna, satu kartu mendapat tombol thumbnail untuk mengganti gambar; gambar bukan varian dan tidak menggandakan produk. Layout kartu/grid T05 dipertahankan. Thumbnail adalah tambahan yang diminta pengguna, tidak ada pada frame Figma; tanpa JS tautan produk tetap tersedia. Koleksi tab lain yang dipilih merchant dipertahankan.

Validasi follow-up: Theme Check CLI 4.9.4 `[]`; 39/39 pemeriksaan browser lokal pada 320/749/1535px menggunakan fixture Liquid (jumlah kartu, empat pilihan, pergantian gambar, pressed state, tautan, touch target dan overflow). [Bukti](validation/featured-product-gallery-browser.json). Tampilan desktop ditinjau lokal; data aktual diperiksa read-only di storefront. Perubahan belum dipublikasikan; preview perubahan pada development theme, Theme Editor dan Lighthouse belum diuji. API acuan: [product.images](https://shopify.dev/docs/api/liquid/objects/product#product-images), [image_tag](https://shopify.dev/docs/api/liquid/filters/image_tag).

Aturan pemilihan target ada di [AGENTS.md](../AGENTS.md), bagian Task entry point; berlaku untuk AI mana pun. Instruksi pengguna terbaru mengatasi pilihan ID/status/tanggal lama. Standar Shopify dan kriteria verifikasi tetap berlaku.

1. Baca ulang file dan repo. Pilih target dari instruksi terbaru atau Task aktif bila tidak ada target baru. Jika task belum terdaftar, susun rincian dari target yang sudah diinspeksi; jangan mengarang fitur di luar instruksi.
2. Sebelum beralih, arsipkan laporan task sebelumnya jika sudah memiliki pekerjaan/hasil. Jangan membuat arsip kosong dari placeholder. Simpan ke `docs/task-history/YYYY-MM-DD.md`, gunakan akhiran `-02`, `-03`, dst. jika nama sudah ada. Jangan menimpa arsip atau mengklaim task belum selesai sebagai selesai.
3. Agent memperbarui Task aktif, ID laporan, dan status sendiri. Status: `draft` (lingkup belum jelas), `ready` (siap), `in_progress` (dikerjakan), `blocked` (sisa kerja memerlukan input/akses), `done` (kriteria terverifikasi). Instruksi eksplisit yang jelas tidak ditolak hanya karena status lama draft/done. Catat follow-up jika target selesai diminta diubah lagi; pertahankan bukti pekerjaan sebelumnya.
4. Tanggal brief tidak kedaluwarsa. Catat waktu pelaksanaan sebenarnya dengan zona Asia/Jakarta; jangan menuntut perubahan tanggal. Tanggal masa depan hanyalah jadwal kecuali pengguna jelas meminta mulai sekarang.
5. Pertahankan rincian/checklist task lain dan perubahan pengguna. Untuk target baru, reset hanya laporan aktif setelah arsip tersimpan. Dokumentasikan pemetaan, prasyarat minimum, asumsi, dan deviasi sebelum/selama implementasi. Jangan mengurangi kriteria lama agar tampak lulus; perubahan lingkup eksplisit pengguna dicatat beserta alasannya.
6. Centang hanya pekerjaan yang benar-benar selesai. Pemeriksaan yang tidak berlaku dibedakan dari yang belum tersedia. Lakukan pemeriksaan sesuai jenis perubahan; gunakan bukti, bukan keberadaan kode, untuk checklist Theme Store.
7. Kerjakan bagian independen ketika ada hambatan. Catat akses atau keputusan yang masih diperlukan. Jangan menandai done jika pemeriksaan wajib task belum terpenuhi.
8. Setelah selesai, lengkapi laporan dan arsipkan snapshot beserta ID serta scope yang dikerjakan. Biarkan task aktif tersedia. Jangan otomatis menjalankan task berikutnya tanpa instruksi.
9. Laporkan hasil, file utama, validasi, deviasi, dan hambatan dalam bahasa Indonesia. Jangan commit, publish, deploy, atau memasang plugin tanpa instruksi eksplisit.
