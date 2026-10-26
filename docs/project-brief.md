# Brief proyek LE FRIANCE

## Arah yang sudah ditetapkan

- Produk: tema Shopify untuk merchant furnitur dengan tampilan premium dan editorial.
- Target distribusi proyek: Shopify Theme Store, mengikuti AGENTS.md.
- Fondasi yang direncanakan: Shopify Skeleton resmi; tidak menyalin Dawn, Horizon, atau tema lain.
- Bahasa laporan kerja: Indonesia. Copy pengaturan tema mengikuti standar proyek.
- Backlog dan pencatatan kerja: [tasks.md](tasks.md); instruksi pengguna terbaru boleh langsung menunjuk link Figma atau section.
- Tooling bebas penyedia AI: dokumentasi resmi Shopify menjadi acuan, plugin tidak diperlukan dan pemasangannya tidak diminta.
- Saat pindah AI/folder, pertahankan fondasi dan hasil yang sudah ada; baca file repo tanpa bergantung riwayat chat.

## Sumber desain

- File Figma: Speedtest — `C2rhn7BP2nXA0LyByRDn09`.
- Homepage: [April Shoot 002 // Collective](https://www.figma.com/design/C2rhn7BP2nXA0LyByRDn09/Speedtest?node-id=3374-242), node `3374:242`.
- Section modular system: node `3374:270` dalam homepage tersebut.
- Homepage yang diperiksa berisi hero, modular system, kolase koleksi, produk unggulan, journal, dan footer/newsletter.

## Kondisi awal yang diperiksa pada 2026-10-26

Repo baru berisi dokumentasi. Belum ada kode tema, Shopify Skeleton, aset implementasi, atau commit awal. Ini catatan kondisi awal, bukan status otomatis terkini; baca repo kembali sebelum mengerjakan task.

## Temuan analisis untuk dipertimbangkan

Temuan berikut adalah bahan perencanaan, bukan task implementasi yang otomatis disetujui:

- Perjelas akses belanja, search, cart, dan tujuan "Start building".
- Lengkapi desain collection, product, cart, search, dan state wajib.
- Tentukan susunan mobile dan perilaku tab, carousel, swatch, serta tombol `+`.
- Periksa keterbacaan teks sekunder, harga, dan teks di atas foto.
- Perbaiki "Tracable" menjadi "Traceable" dan copy footer tentang platform musik yang tidak sesuai furnitur.
- Pastikan section tetap rapi dengan logo, panjang teks, jumlah produk, dan rasio gambar yang berbeda.

## Keputusan yang masih terbuka

- Tujuan "Start building": link koleksi atau pengalaman lain.
- Frame mobile dan frame halaman selain homepage.
- Font Shopify yang sesuai desain, token final, dan lisensi aset.
- Akses development store untuk validasi Theme Editor dan alur pembelian.

Selesaikan keputusan ini hanya ketika relevan dengan task aktif. Jangan menghambat pekerjaan independen yang sudah jelas ruang lingkupnya.

## Fondasi diunduh pada 2026-10-26

Shopify Skeleton resmi sudah tersedia di root repo; sumber dan commit dicatat di [manifest](skeleton-source.json). Jangan menginisialisasi ulang. Validasi static dengan Shopify CLI 4.9.4 lulus. T00 kemudian menyiapkan template JSON, section groups, token Figma dan mapping; lihat laporan terbaru. Kelengkapan fitur Theme Store belum selesai. Lihat laporan task terbaru untuk status aktual.

## Keputusan fondasi T00

- Metadata dan preset tetap Skeleton sementara, mengikuti sumber. Identitas listing, dokumentasi merchant, dan kontak dukungan yang benar diperlukan sebelum rilis.
- Font dasar Work Sans adalah substitusi sementara. Review visual pengganti dilakukan saat section terkait dibangun; jangan mengklaim sama persis.
- Token terbaca dari properti node, karena named variables Figma kosong. Lihat [design tokens](design-tokens.md).
- Preview/editor membutuhkan akses development store; setup dijelaskan pada [development](development.md).
