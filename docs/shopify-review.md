# Review standar Shopify

Tanggal: 2026-10-26, Asia/Jakarta.

## Ruang lingkup

Review dokumentasi dan backlog homepage T00–T09 terhadap [persyaratan Theme Store resmi](https://shopify.dev/docs/storefronts/themes/store/requirements). Bagian yang diperiksa: originality, features, templates/sections/blocks, Lighthouse, accessibility, settings/defaults, fonts, assets, dan resource defaults. Tidak menyatakan seluruh checklist telah diverifikasi ulang satu per satu.

## Penyesuaian

- Default konten section/block harus membantu penggunaan setting; pisahkan dari copy demo.
- Pembatasan protokol URL berlaku pada aset, bukan tautan sumber dokumentasi.
- T01 menyebut komponen account desktop/mobile secara eksplisit; predictive search tetap menjadi pekerjaan milestone search.
- Homepage selesai belum berarti tema siap submission. Halaman transaksi dan pengujian seluruh tema tetap terbuka.

## Bukti yang harus disimpan saat implementasi

Untuk setiap task: sumber resmi beserta tanggal akses, file berubah, perintah dan hasil pemeriksaan, screenshot bila relevan, kondisi editor/store, serta hambatan. Gunakan standar proyek untuk kriteria per komponen. Jangan mencentang item hanya karena dokumen atau markup tersedia.

Pada saat review awal (sebelum pengunduhan Skeleton), belum ada kode tema untuk diuji. Theme Check, Theme Editor, Lighthouse, dan alur pembelian belum dijalankan. Seluruh item checklist implementasi tetap belum dicentang. T00 tetap ready dan belum dieksekusi.

## Keputusan tooling

Pengguna membatalkan pemasangan plugin Shopify pada 2026-10-26. Jangan memasang atau mencoba marketplace lain tanpa permintaan baru. Percobaan sebelumnya tidak berhasil memasang plugin; tidak ada validasi yang dilakukan melalui plugin.

Build mengikuti dokumentasi Shopify resmi dan alat yang tersedia. Tidak ada ketergantungan pada Codex, nama connector, atau marketplace tertentu. AI lain harus mempertahankan arsitektur dan standar proyek, menggunakan alat setara, serta mencatat bukti dan keterbatasan akses.

## Pembaruan T00

Fondasi kini diadaptasi ke template JSON/section groups. Bukti static ada pada docs/validation/ dan laporan aktif tasks.md. Review awal di atas adalah snapshot historis; status implementasi berikutnya mengikuti repo dan laporan terbaru. Pemeriksaan runtime/editor belum dilakukan.
