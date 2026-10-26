# LE FRIANCE

Tema Shopify furnitur berbasis Shopify Skeleton resmi. Fondasi T00 tersedia; tampilan homepage T01–T08 dan kelengkapan commerce belum selesai.

Mulai dari [AGENTS.md](AGENTS.md), [panduan docs](docs/README.md), dan [task aktif](docs/tasks.md). Jangan menginisialisasi ulang Skeleton.

## Fondasi

- Sumber: https://github.com/Shopify/skeleton-theme
- Commit: `a7a655e79b21e68316c228dc7e437b0b32550888`; perubahan lokal dicatat di [manifest](docs/skeleton-source.json).
- [Lisensi sumber](LICENSE.md) dipertahankan.
- Template non-gift-card sudah memakai JSON dan section utama; header/footer melalui section groups. Gift card tetap Liquid.
- Pengaturan font, color schemes, layout, logo/favicon dan Custom Liquid tersedia sebagai fondasi.
- Metadata/preset masih identitas Skeleton; ganti bersama kontak dukungan yang benar sebelum rilis, bukan URL/email palsu.

## Pengembangan

```sh
npm exec --yes --package=@shopify/cli@4.9.4 -- shopify theme check --output json
```

Lihat [setup development](docs/development.md), [token desain](docs/design-tokens.md), dan [mapping section](docs/section-mapping.md). CLI 3.78.1 lokal terlalu lama untuk sebagian sintaks upstream. CLI global tidak diubah.

Preview memerlukan akses development store dan mengunggah development theme. Belum ada preview, upload, publikasi, atau pengujian Theme Editor. Halaman product/cart/collection/search masih baseline, bukan implementasi lengkap atau bukti siap Theme Store.
