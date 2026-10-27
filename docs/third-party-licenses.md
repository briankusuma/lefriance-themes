# Third-Party Assets and Licenses

Record every third-party asset (fonts, icons, external libraries, images) used in the theme, along with source and license details.

| Asset | Type | Source / Author | License | Notes |
| --- | --- | --- | --- | --- |
| Shopify Skeleton | Theme source and bundled assets | [Shopify/skeleton-theme](https://github.com/Shopify/skeleton-theme), commit `a7a655e79b21e68316c228dc7e437b0b32550888` | Shopify license; see [LICENSE.md](../LICENSE.md) | Shopify use/distribution restrictions apply; copyright and permission notice retained. File hashes in [manifest](skeleton-source.json). |

## Aset Figma yang digunakan dalam follow-up 2026-10-26

Diunduh dari design context frame `3646:1124` yang diminta pengguna, tanpa menggambar ulang. Untuk implementasi lokal; hak distribusi komersial belum didokumentasikan dan perlu dikonfirmasi sebelum rilis. Opsi referensi dapat dimatikan/diganti upload merchant.

| File | Node sumber | Pemakaian |
| --- | --- | --- |
| `assets/hero-furniture.png` | `3646:1159` | Hero reference image; original 2400 × 1817, responsive CDN variants melalui asset_img_url |
| `assets/hero-detail.png` | Kartu `3646:1128` | Hero detail reference; original 960 × 1200 |
| `assets/le-friance-wordmark.svg` | `3646:1134` | Display wordmark |
| `assets/le-friance-symbol.svg` | `3646:1147` | Header brand symbol |
| `assets/icon-globe.svg` | Region `3646:1141` | Globe inline; ID export dihapus untuk mencegah duplikasi DOM, fill mengikuti currentColor |

Nomor anak media/ikon harus dicocokkan kembali bila Figma diubah; frame dan aset yang diunduh adalah sumber utama. Arsip Open Sauce One yang diberikan pengguna diperiksa dan memuat SIL Open Font License 1.1, tetapi font tidak disalin ke theme karena custom font tidak diterima Shopify Theme Store. Shopify font picker tetap digunakan. Tidak ada library runtime pihak ketiga tambahan.

## Aset Figma lainnya yang direncanakan

T04 pada 2026-10-27: enam PNG 960 x 1200px dari node `3374:305`, disimpan sebagai `assets/collage-desk.png` (`3374:311`), `collage-sofa.png` (`3374:308`), `collage-console.png` (`3374:309`), `collage-shelf.png` (`3374:310`), `collage-chair.png` (`3374:306`), `collage-table.png` (`3374:307`), serta SVG 29.8472px `collage-plus-table.svg` (`3374:317`) dan `collage-plus-chair.svg` (`3374:321`). Aset asli diunduh melalui response design context; SVG dipakai sebagai mask agar warna mengikuti scheme. Hak distribusi belum dikonfirmasi sebelum rilis. Tidak ada library tambahan.

T03 pada 2026-10-27 menggunakan aset asli node `3374:270`: `assets/material-story-chair.png` (`3374:287`), `material-story-table.png` (`3374:288`/`3374:301`), `material-story-room.png` (`3374:289`), serta `material-story-active.svg` (`3374:279`). Ketiga foto asli 960 x 1200px; SVG 12.7917 x 12.7917px. Sumber adalah URL aset response design context, disimpan lokal dan dirender melalui Shopify asset filters. Status hak distribusi sama dengan aset Figma sebelumnya: belum dikonfirmasi sebelum rilis. Tidak ada library baru.

| Asset | Referensi node | Status hak penggunaan | Rencana |
| --- | --- | --- | --- |
| Foto proses/material | 3374:287–289, 3374:301 | Belum dikonfirmasi | T03 dan media footer T08 |
| Foto kolase dan thumbnail | 3374:306–311, 3374:449–450 | Belum dikonfirmasi | T04/T08 |
| Foto produk dan swatch | 3374:327–330, 3374:343–352, 3374:376–379 | Belum dikonfirmasi | T05; media produksi dari katalog merchant |
| Foto journal | 3374:392, 3374:394 | Belum dikonfirmasi | T06; media dari artikel merchant |
| Ikon dan indikator Figma | Kontrol di tiap section | Belum dikonfirmasi | Inventaris detail saat section dikerjakan |

T00 hanya membaca desain; follow-up T01/T02 kemudian menggunakan aset yang dicatat pada tabel pertama. Keberadaan file di Figma bukan izin distribusi. Font custom tidak dibundel; font fondasi dipilih dari Shopify font picker. Ikon cart/account yang sudah ada tetap dari Skeleton dan tercakup lisensi sumber.
