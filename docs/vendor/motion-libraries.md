# Motion libraries

User-requested migration on 2026-10-27: Swiper 14.3.0 for Journal, Featured collections, Material story and footer gallery; Lenis 1.3.27 for wheel scrolling. Both use the MIT license. No third-party request is made at storefront runtime: scripts and styles are theme assets, loaded once through `theme-motion.js`. Product detail gallery also uses the shared Swiper helper; header menus remain native.

Swiper contains only Core, Navigation, A11y and EffectFade. The readable bundle is about 177KB before transfer compression; its CSS is about 6.5KB. Lenis JS is about 36KB. Total gzip estimate is approximately 46KB for both libraries and CSS, excluding component adapters. Swiper is loaded only when a nonempty carousel initializes. Lenis is not loaded when disabled, in Theme Editor, or when reduced motion is requested. This is a transfer estimate, not a Lighthouse score.

`motion-libraries.json` records pinned package URLs, verified npm SHA-512 archive integrity, final asset SHA-256 hashes, sizes and gzip estimates. Licenses are included in the distributed JS as well as `docs/licenses/`.

## Rebuilding Swiper

Use the pinned npm package `swiper@14.3.0`, with `swiper-entry.js` as the build entry. Build with esbuild, `--bundle --format=iife --target=es2020 --legal-comments=inline`, resolving `swiper` and `swiper/modules` from that pinned package. Do not minify the output. Prepend `docs/licenses/swiper-MIT.txt` as a JS block comment. CSS concatenates the package's `swiper.css`, `modules/effect-fade.css`, and `modules/a11y.css`. Lenis uses the package's unmodified `dist/lenis.js` and `dist/lenis.css`, with its MIT license prepended to JS. Regenerate the manifest after changing vendor files. No build step is required to run the theme.

## Behavior

- Journal uses Swiper centered loop with six real stories and crossfades between the active text view and neighboring photo views. No manually cloned cards or scroll timers. For fewer than five stories, desktop shows one slide per view so loop requirements remain valid; one/two-story states use bounded/rewind behavior.
- Featured collections retain their tabs, collection picks, product links and keyboard tab behavior. Each product rail uses responsive 1/2/4-slide Swiper navigation.
- Material story retains category filtering, selectors, and native links; each filtered set uses a fade Swiper.
- Footer gallery uses fade and rewind, synchronized with its photo selectors.
- Each custom element destroys its Swiper on disconnection. Reconnected/editor-rendered sections initialize independently. Native grids/content remain available if scripts are unavailable.
- Swiper transitions use 520ms with a gentle easing curve. Reduced motion sets speed to zero, including live preference changes.
- Lenis can be disabled in Theme settings > Motion. Touch input, anchors, focus, and keyboard scrolling remain native. Open dialogs/scroll-lock menus stop Lenis and closing them resumes it. Nested form controls and the journal text area are excluded. Theme Editor always uses native page scrolling.

Sources: [Swiper API](https://swiperjs.com/swiper-api), [Lenis documentation](https://github.com/darkroomengineering/lenis), [Shopify asset loading](https://shopify.dev/docs/storefronts/themes/best-practices/javascript-and-stylesheet-tags). Browser evidence and outstanding live-store checks are recorded in `docs/tasks.md`.


2026-10-29: GSAP core + SplitText 3.15.0 added on user request for the hero intro. Readable official UMD distributions; Standard No Charge License (not MIT), notices retained. `ThemeMotion.animation()` loads them once and only for an eligible hero. SplitText affects only the aria-hidden copy; `gsap.context().revert()` and `SplitText.revert()` clean up on finish/skip/disconnect. Lenis remains the sole page scroll engine with its existing auto RAF; GSAP does not attach another Lenis RAF, ScrollTrigger, ScrollSmoother or global ticker settings. Shared owner-based scroll locks keep Lenis stopped until all intro/modal/menu locks clear. Swiper creation ignores superseded async requests; Material Story ignores stale filter results.

Sources: [GSAP context cleanup](https://gsap.com/docs/v3/GSAP/gsap.context()/), [SplitText](https://gsap.com/docs/v3/Plugins/SplitText/), [license](https://gsap.com/standard-license/). Performance cost: ~47 KB gzip on eligible intro pages only; other sections keep existing Swiper/native behavior. Actual store Lighthouse remains pending.
