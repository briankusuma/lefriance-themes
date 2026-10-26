# Design tokens — T00

Sumber: [homepage Figma](https://www.figma.com/design/C2rhn7BP2nXA0LyByRDn09/Speedtest?node-id=3374-242), dibaca pada 2026-10-26 melalui design context dan screenshot. `get_variable_defs` mengembalikan `{}`: tidak ada named variables yang dapat dikonfirmasi. Nilai berikut adalah properti node, bukan token resmi bernama dari desainer. Ringkasan mesin: [figma-foundation.json](figma-foundation.json).

## Warna yang diamati

| Peran visual | Nilai Figma | Referensi |
| --- | --- | --- |
| Canvas terang | `#F8F0E8` | 3374:305, 3374:388 |
| Canvas cerita gelap / tombol | `#3A322B` | 3374:270, 3374:381 |
| Footer | `#171513` | 3374:431 |
| Kartu putih / teks gelap terang | `#FFFFFF` / `#000000` | 3374:300, 3374:303 |
| Garis canvas terang | `#E5E3D3` | 3374:305, 3374:380 |
| Garis canvas gelap | `#5B5148` | 3374:271 |
| Permukaan kategori gelap | `#463D35`, border `#4E4742` | 3374:293 |
| Permukaan kartu produk | `#E7DBD0` | 3374:327 |
| Tombol tidak aktif | `#DBD2C9` | 3374:384 |
| Nomor journal tidak aktif | `#EFE6DC`, teks `#B7ACA0` | 3374:414, 3374:420 |

Figma juga menggunakan opacity putih 22%, 31%, 40%, 50%, 70% dan hitam 31%. Nilai ini dicatat untuk referensi; bukan default teks penting karena keterbacaannya perlu diperbaiki.

Implementasi global menyediakan scheme-light, scheme-dark, scheme-footer melalui `color_scheme_group`. Background mengikuti Figma; foreground dasar dipilih opak. Border UI memakai warna lebih kuat daripada garis dekoratif Figma. Section berikutnya harus membedakan border dekoratif dan batas kontrol; kontras seluruh state perlu diukur saat kontennya dibangun.

## Tipografi

| Penggunaan | Properti yang diamati | Implementasi fondasi |
| --- | --- | --- |
| Heading | Open Sauce One Medium, 51.167 px / 55.431 px, tracking -1.535 px | `--text-heading`, heading font picker |
| Body besar | Open Sauce One Medium, 19.188 px, tracking -0.5756 px | `--text-lead` |
| Caption | Open Sauce One Regular, 14.924 px, tracking -0.4477 px | `--text-caption` |
| Judul kartu | Open Sauce One Medium, 21.319 px | `--text-card` |
| Navigasi | SF Pro Display Light, 17.056 px | `--text-body` |
| Kategori | Inter Variable Regular, 17.056 px / 1.08 | Styling section T03/T05 |
| Journal/footer body | Inter Display Regular, 19.188 px / 1.4 | Styling section T06/T08 |

Fondasi menggunakan Shopify Work Sans (`work_sans_n4` body, `work_sans_n5` heading), melanjutkan keluarga font Skeleton. Ini substitusi sementara, bukan kecocokan identik; Open Sauce One/SF Pro/Inter belum dipetakan satu per satu. Font picker memungkinkan penggantian tanpa custom font. Verifikasi visual pengganti sebelum menyelesaikan section. Wordmark adalah aset logo, bukan font yang perlu dibuat ulang.

## Grid, ukuran, dan radius

| Properti desktop | Ukuran yang diamati | Keputusan fondasi |
| --- | --- | --- |
| Canvas | 1535 px lebar; frame umumnya 1091.556 px tinggi | Page width default 1535 px; tinggi section mengikuti konten |
| Margin utama | 51.167 px | Setting 51 px, CSS clamp; tidak mengunci desktop di mobile |
| Grid kolase/produk | 4 kolom × 342.177 px; gap 21.319 px | CSS Grid pada section; `--grid-gap: 1.332rem` |
| Cerita modular | 668.365 px kartu persegi; foto 647.045 × 444.510 px | Rasio kartu 1:1, foto ~1.456:1 |
| Kolase/journal | Foto 342.177 × 342.177 px | 1:1 |
| Kartu produk | 342.177 × 376.288 px | 10:11 |
| Thumbnail cerita | 84.212 px persegi | 1:1 |
| Radius kartu | 10.660 px | `--radius-card: 0.66625rem` |
| Radius thumbnail | 8.528 px | Ditentukan di section |
| Radius kategori/kontrol | 12.792 px | Input global dinormalisasi ke 13 px |
| Garis | 1.066 px | Normalisasi 1 px pada komponen nanti |
| Unit geometri berulang | 4.264 px | `--space-unit: 0.2665rem`, turunan properti, bukan variable Figma |
| Blur kartu | 17.589 px | Belum diterapkan; evaluasi biaya saat T02/T03/T08 |

Nilai rem mengasumsikan basis browser 16 px, tanpa mengunci preferensi ukuran font pengguna. Skala heading responsif minimum 2rem merupakan keputusan implementasi.

## Responsive dan state

Tidak ada frame mobile atau breakpoint yang terverifikasi dari target ini. 375, 768, dan 1535 px adalah ukuran QA proyek, bukan breakpoint Figma. Komposisi mobile, focus, error, empty, dan state lain diturunkan ketika section dikerjakan dan dicatat sebagai **not in Figma**. Fondasi tidak menyalin posisi absolut atau tinggi frame menjadi layout produksi.
