# Shopify product Color — 2026-10-28

The user requested Color metafields in Shopify Admin, then explicitly selected Figma `C2rhn7BP2nXA0LyByRDn09`, node `3660:1293` and swatch node `3374:343` as the color source. Changes were made through the logged-in Shopify Admin for `lafrience-oneweekwonders`, not through an Admin API or theme deployment.

The existing Shopify category Color metafield was reused; no duplicate custom Color definition was created. Modern Walnut Armchair and Sculpted Wood Lounge Chair were assigned their suggested Armchairs category to expose that standard field. Existing categories on Walnut Accent Chair and Contour Upholstered Chair were preserved. Other suggested category attributes were not accepted.

| Product | Saved Color entries in order | Product ID |
| --- | --- | --- |
| Walnut Accent Chair | Cream / Tan; Charcoal / Walnut | 15450350158050 |
| Sculpted Wood Lounge Chair | Olive / Tan; Caramel / Brown | 15450351567074 |
| Modern Walnut Armchair | Gray / Charcoal; Olive / Tan; Caramel / Brown | 15450351796450 |
| Contour Upholstered Chair | Olive / Tan; Caramel / Brown | 15450352156898 |

| Entry | Exact Figma fills | Shopify Color hex | Base color | Image |
| --- | --- | --- | --- | --- |
| Cream / Tan | #EAE4D3, #BC8157 | #BC8157 | Beige | cream-tan.png |
| Charcoal / Walnut | #473F3D, #97765E | #97765E | Brown | charcoal-walnut.png |
| Gray / Charcoal | #C2C2C2, #393939 | #393939 | Gray | gray-charcoal.png |
| Olive / Tan | #526142, #BC8157 | #526142 | Green | olive-tan.png |
| Caramel / Brown | #D4A887, #A36940 | #A36940 | Brown | caramel-brown.png |

Labels are descriptive names assigned for the design colors; Figma does not provide commercial color names. Each native Color entry includes both a primary hex value and a two-tone image. The image preserves the actual split-color shape, rather than flattening the design to one solid color. Five 96 x 96px transparent PNGs were rendered from the Figma SVG vector groups and uploaded to Shopify Files. Local copies are retained here for portability, not used as hard-coded runtime theme assets. Figma group sources: `3374:343`, `3374:346`, `3374:349`, and `3374:353`; the last uses the same palette as the second group. Distribution rights remain subject to the existing Figma asset rights record.

Validation: each new entry was saved through its Add Color form; all four product saves returned **Changes saved**. The selected Color lists were inspected before each save. The five PNGs were inspected locally. No variants were created or changed, and inventory, prices, images of the products themselves, or publishing settings were not edited.

Initial data-only task: category metafields were not connected to variant options, and no theme code was changed at that stage.

Follow-up on 2026-10-28: the user requested the product section connection. `snippets/product-color-metafield.liquid` now reads `product.metafields.shopify['color-pattern'].value`, preferring each entry's image over its solid color. Product cards retain native variant swatches when usable; otherwise they display the category palette. The existing global Show available color swatches setting still controls card visibility. A removable/reorderable Colors block in `main-product` renders the same palette with visible names, and the product template includes that block.

These category chips are descriptive spans, not fake buttons/variant links. No variants or inventory changes are needed for display. Their labels are exposed to assistive technology; empty entries/lists render nothing. The namespace `shopify.color-pattern` and enabled storefront access were verified read-only in Shopify Admin's actual definition. Theme Check CLI 4.9.4 returned `[]`. [42/42 browser fixture checks](../validation/product-color-metafield-browser.json) passed at 320/749/1535px for metadata, image/solid fallback, native variant precedence and URL retention, empty/invalid entries, disabled setting, empty native swatches, and the main-product Colors block. Preview on the actual store/Theme Editor and Lighthouse remain untested; no theme publish/push was performed.

Sources: [Shopify category metafields](https://help.shopify.com/en/manual/custom-data/metafields/category-metafields), [variants with metafields](https://help.shopify.com/en/manual/custom-data/metafields/add-variants-with-metafields).
