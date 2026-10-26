# T01 verification

2026-10-26. Local implementation completed; Shopify editor and server integration remain unverified.

- Theme Check 4.9.4 returned [] (zero offenses); node --check assets/header.js passed.
- Local renderer used LiquidJS with real header/menu/localization templates and production CSS/JS. Only Shopify-specific form/image/asset/translation helpers were mocked; no backend requests were sent.
- Chrome ran 188 passing assertions over 320/375/768/1100/1535 px: normal, empty, long text, empty menu with CTA; overflow, IDs, selector markup/labels, disclosures, Escape/focus, outside focus, reconnect, and basic no-JS fallback.
- Native Chrome interaction additionally opened the mobile menu and closed it with Escape; focus returned to Menu. Desktop and mobile fixture screenshots were visually inspected in-session, not saved as repository artifacts.
- Existing Shopify preview showed `font_url can only be used with a font drop` before changes. Local guards now skip invalid font filters and use a CSS fallback; regression covers absent fonts, unresolved string values, and unavailable variants. Remote deployment/root cause has not been verified; do not claim the store error is gone.
- No uploaded merchant logo or licensed Figma brand asset was used. Logo ratio support is implemented via image dimensions/object-fit but real merchant image variants still need visual verification.
- Shopify account sheet/sign-in, localization submission, real Theme Editor setting changes, and header-over-hero integration remain pending. No new store upload or publish was performed.

Official sources accessed: [localization](https://shopify.dev/docs/storefronts/themes/markets/multiple-currencies-languages), [localization object](https://shopify.dev/docs/api/liquid/objects/localization), [link object](https://shopify.dev/docs/api/liquid/objects/link), [account component](https://shopify.dev/docs/storefronts/themes/customer-engagement/account-component), [font_url](https://shopify.dev/docs/api/liquid/filters/font_url), [fonts](https://shopify.dev/docs/storefronts/themes/architecture/settings/fonts). Figma: file C2rhn7BP2nXA0LyByRDn09, node 3374:243, fresh context/screenshot read for T01.
