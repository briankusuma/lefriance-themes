# Task aktif — homepage LE FRIANCE

## Brief

- Tanggal: 2026-10-26
- Zona waktu: Asia/Jakarta
- Status: in_progress
- Task aktif: T01 + T02 + G01
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

- [ ] Bangun grid gelap tiga kolom, judul dua tone, kartu foto putih, thumbnail, kategori kiri, indikator, serta teks pendukung.
- [ ] Sediakan blok foto, judul, deskripsi, kategori, dan link opsional; kategori bekerja pada blok konten, bukan menyamar sebagai filter katalog.
- [ ] Definisikan hubungan kategori, thumbnail, dan indikator dari konten yang benar-benar tersedia. Jumlah indikator mengikuti jumlah item; jangan hard-code lima slide dari gambar.
- [ ] Usulkan perilaku klik dalam mapping sebelum coding. Jika hubungan kontrol belum dapat dipastikan, catat keputusan yang perlu diklarifikasi; jangan mengarang konfigurator atau digital passport.
- [ ] Perbaiki Traceable, periksa kontras, gunakan perpindahan manual tanpa autoplay sebagai usulan implementasi; pada mobile urutkan judul, kategori, kartu, lalu teks.

Kriteria selesai:

- [ ] Kategori dan pemilih item menampilkan konten yang benar, termasuk kategori kosong dan satu item.
- [ ] Keyboard, selected state, area tekan, dan pembacaan teks bekerja; semua konten penting tetap dapat diakses tanpa JS.
- [ ] Section mendukung add/remove/reorder blok di editor; perbedaan copy dan interaksi terdokumentasi.

### T04 — Kolase koleksi

- Figma: [node 3374:305](https://www.figma.com/design/C2rhn7BP2nXA0LyByRDn09/Speedtest?node-id=3374-305).
- Dependensi: T00
- Mapping: Section editorial collection collage dengan blok gambar dan CTA.

Pekerjaan:

- [ ] Bangun heading, deskripsi, enam foto, teks editorial, serta dua CTA bertanda plus sesuai grid asimetris.
- [ ] Sediakan blok gambar dan blok promosi koleksi dengan collection picker atau link; plus diusulkan sebagai tautan koleksi, bukan modal/quick shop.
- [ ] Gunakan gambar responsif dan focal point; tentukan fallback untuk jumlah blok berbeda agar komposisi tidak bergantung pada tepat enam foto.
- [ ] Pada mobile susun konten mengikuti urutan baca; judul dan tautan tetap berdekatan dengan gambar terkait.

Kriteria selesai:

- [ ] Kolase sesuai referensi desktop dan CTA menuju tujuan yang dikonfigurasi.
- [ ] Jumlah gambar sedikit/banyak, rasio campuran, dan deskripsi panjang tetap rapi.
- [ ] Blok bisa ditambah, dihapus, dan diurutkan; gambar dekoratif tidak membuat kontrol tanpa nama.

### T05 — Produk unggulan dan tab koleksi

- Figma: [node 3374:326](https://www.figma.com/design/C2rhn7BP2nXA0LyByRDn09/Speedtest?node-id=3374-326).
- Dependensi: T00
- Mapping: Section featured collections dengan blok tab koleksi; product-card snippet dapat dipakai ulang.

Pekerjaan:

- [ ] Bangun heading, deskripsi, panah, tab kategori, empat kartu produk desktop, dan tautan lihat koleksi.
- [ ] Gunakan collection picker per tab; All adalah koleksi yang dipilih merchant, bukan gabungan otomatis seluruh toko. Heading dan CTA mengikuti tab aktif.
- [ ] Ambil gambar, judul, URL, harga, harga bervariasi, sale, sold out, unit price, dan swatch dari data produk nyata sesuai kebutuhan yang berlaku.
- [ ] Swatch dipetakan ke varian valid dan media terkait; sediakan nama opsi dan status pilihan. Jangan hard-code harga euro atau bulatan warna.
- [ ] Usulan mobile: grid dua kolom, satu kolom bila konten tidak muat; tab dapat digulir dalam wadahnya. Panah hanya aktif bila ada produk lain yang dapat ditampilkan.
- [ ] Jangan menambah quick add, wishlist, atau quick view di luar task; kartu tetap membuka halaman produk.

Kriteria selesai:

- [ ] Pergantian tab, produk, CTA koleksi, dan swatch konsisten dengan data toko.
- [ ] Produk kosong, satu produk, judul panjang, tanpa swatch, sale, dan sold out ditangani.
- [ ] Harga tidak terpotong dan cukup terbaca; kartu memakai snippet bersama serta dapat dioperasikan dengan keyboard.

### T06 — Journal dan cerita studio

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

- ID laporan: T01 + T02 + G01
- Tanggal: 2026-10-26, Asia/Jakarta
- Status: implementasi lokal dan validasi scoped selesai; verifikasi Shopify runtime/Theme Editor/performance masih terbuka. T01/T02/G01 belum dinyatakan done.
- Target langsung pengguna: `3646:1124`; homepage `3374:242` dianalisis untuk global settings. Arsip T01 lama: [2026-10-26-04](task-history/2026-10-26-04.md).

### Hasil

Header/navbar diganti mengikuti frame baru dan hero editorial terpisah dipasang pada index. Merchant dapat mengubah menu, logo, CTA, localization, hero images/wordmark/copy/card/overlay/height. Global schema diperluas untuk typography, colors, layout, cards, buttons/inputs dan cart. Kartu produk, cart drawer/page, product form serta reusable essentials sudah memakai pengaturan tersebut.

Detail analisis, pemakai setiap grup setting, dokumentasi Shopify, batas katalog dan pengujian: [global settings](global-settings.md). Cart memakai native form plus Ajax enhancement; tidak menyalin Dawn dan tidak membuat configurator dari CTA.

### Validasi

- Shopify CLI 4.9.4 [Theme Check](validation/header-hero-cart-theme-check.json).
- `node --check` pada header.js, commerce.js dan product.js.
- [Browser lokal](validation/header-hero-cart-browser.json) dan [uji presentasi cart](validation/cart-presentations-browser.json): 99 assertion lulus, lima lebar dan tiga variasi konten; cart Ajax dimock, bukan backend Shopify. Perubahan warna/overlay/font akhir diperiksa ulang sesuai catatan validasi.
- Native Chrome diperiksa untuk desktop dan susunan mobile; tidak mengklaim Theme Editor/checkout/Lighthouse lulus.
- Follow-up schema: role gradient color scheme diperbaiki agar menunjuk ke `color_background`; nilai `background_gradient` tersedia pada current dan preset untuk mencegah pesan preview Shopify tentang color schemes yang tidak terdefinisi.

### Deviasi dan pekerjaan tersisa

Work Sans tetap substitusi font Figma. Search/cart/account ditambahkan untuk commerce; mobile dan state transaksi adalah not in Figma. Readability scrim diperkuat untuk teks putih. Aset Figma digunakan sebagai opsi referensi sesuai instruksi implementasi; status hak distribusi tetap dicatat di [licenses](third-party-licenses.md).

Perlu development-theme QA untuk editor, logo beragam rasio, localization/account services, inventory/discount/subscription/checkout/payment dan Lighthouse. Full editorial T03–T08 serta fitur Theme Store lain tetap belum selesai. Tidak ada commit, push, deploy, publish, atau plugin install pada follow-up ini.

---

## Aturan pencatatan dan eksekusi

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
