# Development

Kerjakan di root repo. Skeleton sudah ada; jangan jalankan theme init. [Manifest sumber](skeleton-source.json). Jangan menyimpan token/password toko dalam repository.

## Validasi lokal

CLI 4.9.4 dipakai pada validasi proyek sebelumnya; CLI lama 3.78.1 salah membaca sebagian sintaks upstream. Gunakan versi yang sesuai dengan sintaks repo, tanpa mengganti instalasi global secara diam-diam.

```sh
npm exec --yes --package=@shopify/cli@4.9.4 -- shopify theme check --output json
```

Theme Check bukan bukti runtime atau kelulusan Theme Store. Perubahan dokumentasi saja cukup diperiksa konsistensi dan link lokalnya. Output besar/debug fixtures disimpan sementara; hasil relevan diringkas di tasks.md.

## Preview Shopify

```sh
npm exec --yes --package=@shopify/cli@4.9.4 -- shopify theme dev --store YOUR-STORE.myshopify.com
```

Perintah ini mengunggah development theme dan menyinkronkan perubahan; bukan server offline. Jalankan hanya dalam scope preview/upload yang diizinkan pengguna. Jangan memakai --allow-live atau theme ID live tanpa instruksi eksplisit.

Uji perubahan di Theme Editor, keyboard, state kosong/panjang/error, form/cart/checkout sesuai scope. Ukur Lighthouse dengan konten nyata untuk milestone release. Bedakan fixture lokal, preview toko dan backend sungguhan; jangan melaporkan pemeriksaan yang tidak dilakukan.

[Shopify CLI](https://shopify.dev/docs/api/shopify-cli/theme) · [Requirements](https://shopify.dev/docs/storefronts/themes/store/requirements)
