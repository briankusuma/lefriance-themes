# Development setup

Mulai di root repo. Fondasi sudah diimpor; jangan jalankan theme init lagi. Periksa [manifest sumber](skeleton-source.json), [mapping](section-mapping.md), dan [task](tasks.md).

## Tooling

Node/npm dan Shopify CLI tersedia pada mesin awal. CLI lokal 3.78.1 tidak memahami sebagian sintaks upstream; versi yang dipakai untuk validasi adalah **4.9.4**. Gunakan CLI setara saat memindahkan repo. Instalasi global tidak diubah.

```sh
npm exec --yes --package=@shopify/cli@4.9.4 -- shopify version
npm exec --yes --package=@shopify/cli@4.9.4 -- shopify theme check --output json
```

`.theme-check.yml` memakai `theme-check:recommended`, tanpa rule yang dinonaktifkan. Theme Check hanya validasi static, bukan bukti runtime atau kelulusan Theme Store.

## Preview pada development store

Diperlukan domain development store milik pengguna dan akun dengan akses Themes. Jangan taruh password/token di repo. Setelah store dan izin upload development theme tersedia:

```sh
npm exec --yes --package=@shopify/cli@4.9.4 -- shopify theme dev --store YOUR-STORE.myshopify.com
```

Perintah ini **mengunggah development theme dan mengirim perubahan selama berjalan**. Ini bukan server HTML offline. Jangan gunakan `--allow-live` atau theme ID live. T00 belum menjalankannya: domain/akses toko belum diberikan dan task mengecualikan deploy/perubahan toko live. Persetujuan upload development theme diperlukan jika belum diberikan dalam instruksi berikutnya.

CLI akan menyediakan URL preview dan Theme Editor. Saat akses tersedia, periksa semua template, section picker Custom Liquid, groups header/footer, perubahan warna/font, add/remove/reorder, multiple instances, serta error rendering. Uji form contact/password dan alur toko pada milestone terkait. Catat URL/lingkungan tanpa kredensial, hasil, dan screenshot di laporan.

## Keadaan pengujian T00

- JSON/schema/reference graph dan Theme Check diuji lokal.
- Preview Shopify, Theme Editor, visual browser, serta pengiriman form belum teruji.
- Perbandingan homepage Figma dan Lighthouse menunggu T01–T09 dengan konten nyata.
- Favicon/logo opsional dan kosong saat instalasi. Media merchant dipilih di editor; tidak ada resource khusus demo yang dimasukkan dalam default.

Sumber: [JSON templates](https://shopify.dev/docs/storefronts/themes/architecture/templates/json-templates), [section groups](https://shopify.dev/docs/storefronts/themes/architecture/section-groups), [settings](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings), [section schema](https://shopify.dev/docs/storefronts/themes/architecture/sections/section-schema), [fonts](https://shopify.dev/docs/storefronts/themes/architecture/settings/fonts), [font_modify](https://shopify.dev/docs/api/liquid/filters/font_modify), [app blocks](https://shopify.dev/docs/storefronts/themes/architecture/blocks/app-blocks), [contact form](https://shopify.dev/docs/storefronts/themes/customer-engagement/add-contact-form), dan [requirements](https://shopify.dev/docs/storefronts/themes/store/requirements). Dibaca 2026-10-26. Implementasi mandiri di atas Skeleton; tidak menyalin tema lain.
