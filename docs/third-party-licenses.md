# Third-Party Assets and Licenses

2026-10-29 Collection collage scroll follow-up: unchanged SVG_STRING exports from Figma `C2rhn7BP2nXA0LyByRDn09`: `collage-line-vertical.svg` (3734:612, 1 × 342), `collage-line-left.svg` (3734:635, 342 × 1), `collage-line-right.svg` (3734:636, 342 × 1). Used as decorative background guides; six existing collage photos and two plus icons reused unchanged. No new runtime library. Same pending Figma commercial distribution-rights status applies before release.

2026-10-29 material-story motion: official readable `dist/ScrollTrigger.js` from the already pinned GSAP 3.15.0 npm archive, copied unchanged as `assets/vendor-gsap-scroll-trigger-3.15.0.js`. Same GSAP Standard No Charge License; original notices retained. Local lazy loading; hash/size in the motion manifest. No new image or runtime host.

2026-10-29 loading thumbnail: `assets/hero-detail-blurred.png`, unchanged 3× PNG export (442 × 442) of Figma `C2rhn7BP2nXA0LyByRDn09`, node `3722:1633`. Includes the original white frame, blur and fade; replaces the raw photo plus CSS blur for the reference card. Existing Figma commercial distribution-rights status remains pending before release. No new library.

2026-10-29 full-chair replacement: user-supplied `assets/sofa-full.png`, 515 x 573 with transparency, replaces green-sofa-front in the intro. Original file retained unchanged; native aspect ratio/contain preserve the entire chair. Same user-provided Figma asset distribution-rights status applies; no new library or generated image.

2026-10-29 hero center-sofa follow-up: user-supplied `assets/bg-header-center.png` (2303 x 1638) and `assets/green-sofa-front.png` (413 x 107), matching the updated Figma sequence `3722:1757` and center/corner frames `3725:1786`/`3725:1775`. Used unchanged; the default pre-room now references bg-header-center instead of hero-motion-pre.jpg. Same Figma commercial distribution-rights status applies. No generated images or new libraries.

2026-10-29: GSAP core and SplitText 3.15.0 from the official npm `gsap` package, distributed unminified in `assets/vendor-gsap-3.15.0.js` and `assets/vendor-gsap-split-text-3.15.0.js`. GSAP Standard No Charge License, not MIT: https://gsap.com/standard-license/. Original copyright/license notices retained. Used for the user-requested preset hero intro; no visual animation builder. Source/integrity/hashes in [motion manifest](vendor/motion-libraries.json). Loaded on demand for eligible intro only; no runtime third-party host.

2026-10-28 hero intro: `assets/hero-motion-pre.jpg` exported from user-provided Figma `C2rhn7BP2nXA0LyByRDn09`, empty-room layer `3722:1741` in motion-pre `3722:1739` (sequence `3722:1757`). Original 1280 x 960 PNG converted to JPEG quality 88, approximately 184 KB. Existing Figma commercial distribution rights remain unverified before release. Native Web Animations API; no additional library.

2026-10-28 catalog Color: five 96px PNG swatches rendered from Figma swatch SVG groups `3374:343`, `3374:346`, `3374:349` (same palette reused by `3374:353`) at the user's request and uploaded to Shopify Files. Palette sources are retained in [design tokens](design-tokens.md). Local upload duplicates were removed during documentation cleanup; Shopify Files supplies storefront data. existing Figma distribution-rights status remains unchanged. No raster AI generation, storefront library, or runtime theme asset was added for this task.

2026-10-27 motion migration: Swiper 14.3.0 and Lenis 1.3.27 added at the user's explicit request, both MIT. Distributed locally in theme assets with full license notices in JS; license copies under `docs/licenses/`. Swiper is a readable Core/Navigation/A11y/EffectFade build; Lenis uses its readable official distribution. Version, npm integrity, asset hashes, build details and performance rationale: [motion libraries](vendor/motion-libraries.md), [manifest](vendor/motion-libraries.json). No runtime CDN or new paid service.

2026-10-27 Journal follow-up: `assets/journal-finishing-generated.jpg` and `assets/journal-timber-generated.jpg` were created using the built-in imagegen tool at the user's request; illustrative AI-generated workshop scenes, not sourced third-party photography or merchant process documentation. Optimized JPEGs are 960 x 960px. Prompts and generation method: the generation prompts below. No external library or font introduced; original Figma images retain their separately recorded rights status.

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

T07/T08 pada 2026-10-27 menggunakan ulang aset identik dari node `3660:1365`: `collage-sofa.png` (`3660:1383`), `collage-console.png` (`3660:1384`), `material-story-room.png` (`3660:1397`), `le-friance-wordmark.svg` (`3660:1366`), `material-story-active.svg` (`3660:1401`). Ikon asli tambahan: `footer-facebook.svg` (`3660:1391`), `footer-x.svg` (`3660:1393`), `footer-linkedin.svg` (`3660:1395`), masing-masing slot 34.111px. Sumber response design context; hak distribusi belum dikonfirmasi sebelum rilis. Foto/wordmark dapat diganti merchant dan sosial membutuhkan URL nyata.

T06 pada 2026-10-27: node `3660:1302` menyuplai `assets/journal-balance.png` (`3660:1306`) dan `journal-workshop.png` (`3660:1308`), keduanya 960 x 1200px; `journal-icon.svg` (`3660:1317`, 34.1111 x 34.3776px), `journal-next.svg` (`3660:1341`) dan `journal-previous.svg` (`3660:1343`, slot 21.319px). Sumber response design context, disimpan lokal. Hak distribusi belum dikonfirmasi sebelum rilis; merchant dapat mengganti foto. Tidak ada library baru.

T05 pada 2026-10-27: `assets/featured-chair.svg` dari `3374:372` (34.1111px), `featured-next.svg` dari `3374:382`, dan `featured-previous.svg` dari `3374:385` (25.5833px), sumber response design context node `3374:326`. Ikon panah dipakai sebagai mask dengan warna scheme dan orientasi sesuai desain. Status hak distribusi sebelum rilis belum dikonfirmasi. Foto produk/swatches tidak dibundel; media runtime berasal dari katalog merchant. Empat foto referensi hanya disimpan sementara untuk validasi lokal, di luar theme.

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

## Generated image provenance


Generated with the built-in imagegen tool at the user's request. Illustrative workshop scenes, not photographs of the merchant's actual workers or process. Originals retained outside the repository; project copies optimized to 960 x 960px JPEG, quality 82. Existing Figma photographs unchanged. Merchant image/article selections override bundled images.

## assets/journal-finishing-generated.jpg

Prompt: Use case: photorealistic-natural. Generate ONE square editorial photograph for a premium furniture studio journal. A craftsperson in understated dark olive workwear hand-finishing a sculptural walnut chair with a linen cloth on a timber workbench in a quiet beige plaster workshop. Warm natural side daylight, muted walnut brown, oatmeal, cream, olive palette, soft organic shadows, subtle film grain, restrained magazine photography, candid realistic textures, mid-distance composition, no logos, no typography, no watermark. Consistent with tasteful Scandinavian furniture craft photography. Save a usable image asset for the website.

## assets/journal-timber-generated.jpg

Prompt: Use case photorealistic-natural. ONE square premium furniture journal editorial photograph. Close mid-distance candid scene of a craftsperson in dark brown workwear examining oak and walnut timber grain samples on a wooden workbench in a quiet beige plaster furniture workshop. Shavings, a small plane and neatly arranged wood pieces, warm natural side daylight, soft shadows, muted walnut brown oatmeal cream and subdued olive palette, tactile realistic textures, subtle film grain, restrained Scandinavian furniture magazine art direction. No logos, words, lettering or watermark. Match the warm quiet workshop photography of the preceding generated chair finishing photograph, but a distinct composition about choosing timber.
