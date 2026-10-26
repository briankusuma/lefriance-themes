# Dokumentasi LE FRIANCE

## Memberi pekerjaan

Kamu bisa memakai salah satu cara berikut tanpa menyiapkan format khusus:

- **eksekusi task** — jalankan Task aktif di [tasks.md](tasks.md).
- **Implementasikan modular system ini: [link Figma section]** — agent memilih section terkait, memperbarui task, dan mengerjakan prasyarat minimumnya.
- **Kerjakan T05** atau **perbaiki footer ini: [link]** — pilih target langsung, termasuk follow-up pada section yang pernah selesai.
- **Analisis section ini: [link]** — hanya analisis, tidak mengubahnya menjadi implementasi.

Edit Markdown jika ingin menetapkan batasan atau kriteria sendiri; memilih ID dan mengganti status secara manual tidak wajib. Instruksi terbaru di chat menentukan target. Agent tidak menjalankan seluruh backlog hanya karena menerima link homepage. Lihat aturan pemilihan target di [AGENTS.md](../AGENTS.md).

Agent mencatat progres, waktu pelaksanaan Asia/Jakarta, hasil pemeriksaan, dan hambatan. Laporan yang sudah berisi pekerjaan diarsipkan sebelum beralih; task selesai diarsipkan otomatis ke `docs/task-history/` tanpa menimpa file. Task lintas hari bisa dilanjutkan. Jangan hapus laporan sendiri sebelum arsip tersimpan.

## Dipakai AI lain atau dipindah folder

Baca [AGENTS.md](../AGENTS.md), [project-brief.md](project-brief.md), task terkait, lalu [theme-standards.md](theme-standards.md). Baca checklist sesuai scope. Semua referensi lokal relatif terhadap repo; tidak bergantung riwayat chat atau path komputer asal.

Pertahankan arsitektur Shopify Liquid/JSON, native CSS/JS, dan fondasi yang sudah ada. Jangan menginisialisasi ulang atau mengganti stack karena berpindah AI. Gunakan tool yang tersedia untuk membaca Figma dan shopify.dev; plugin bukan prasyarat dan tidak boleh dipasang tanpa permintaan baru. Jika akses kurang, catat pemeriksaan yang terhambat tanpa mengarang hasil.

Snapshot kondisi dan review bertanggal adalah catatan historis; inspeksi repo dan baca persyaratan resmi yang relevan saat mulai milestone. Perubahan pedoman dilakukan hanya jika diminta, diperlukan oleh perubahan persyaratan resmi yang terverifikasi, atau ada pertentangan nyata yang harus diperbaiki; jelaskan alasannya.

## Peta dokumen

| Dokumen | Fungsi |
| --- | --- |
| [../AGENTS.md](../AGENTS.md) | Aturan utama dan pemicu eksekusi task |
| [tasks.md](tasks.md) | Task aktif yang kamu edit setiap hari |
| [project-brief.md](project-brief.md) | Konteks proyek dan sumber desain |
| [development.md](development.md) | Tooling, preview, kebutuhan akses, dan sumber resmi |
| [design-tokens.md](design-tokens.md) | Properti Figma, token fondasi, dan keputusan responsif |
| [section-mapping.md](section-mapping.md) | Mapping Figma ke file/komponen Shopify |
| [theme-standards.md](theme-standards.md) | Standar implementasi teknis |
| [shopify-review.md](shopify-review.md) | Hasil review sumber resmi, batas bukti, dan keputusan tooling |
| [theme-store-checklist.md](theme-store-checklist.md) | Verifikasi kesiapan Theme Store |
| [figma-deviations.md](figma-deviations.md) | Penyimpangan desain yang disengaja beserta alasannya |
| [third-party-licenses.md](third-party-licenses.md) | Sumber dan lisensi aset yang benar-benar digunakan |

Checklist Theme Store bukan daftar pekerjaan harian. Centang hanya persyaratan yang benar-benar telah diverifikasi sesuai jenis pemeriksaannya.
