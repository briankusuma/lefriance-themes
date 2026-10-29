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


2026-10-29: GSAP core + SplitText + ScrollTrigger 3.15.0 use readable official UMD distributions under the Standard No Charge License (not MIT), with notices retained. `ThemeMotion.animation({ splitText: false })` loads core only for the hero; its native grapheme spans are reused. The default animation loader adds SplitText once; `scrollAnimation()` adds ScrollTrigger only for eligible material-story motion when near the viewport and after the hero intro finishes. Geometry is reserved; no per-image global refresh. ScrollTrigger adds approximately 26.2 KB gzip. No ScrollSmoother, extra Lenis RAF, scroll proxy or global ticker changes. Lenis owns native-window smooth scrolling and sends scroll updates to ScrollTrigger. The scene uses CSS sticky with no GSAP pin or refresh→Lenis-resize callback; Lenis is resized once after scene setup/cleanup. This is a transfer estimate; live Lighthouse remains pending.

Material stories: seven desktop steps from Figma 3734:390; native sticky stage with 4.5 viewport scroll range, scrub 1.2s, reversible title/lines/card/side controls. Full scene is enabled at widths of at least 750px, including short desktop/editor viewports; below 750px uses an unpinned title reveal. Long card content scrolls internally. Editor selection/reduced motion/library failure keeps the static section; editor deselection reinitializes motion. There is no ScrollTrigger pin target: native CSS sticky avoids wrapper/reparent lifecycle callbacks entirely. Media context and SplitText revert on disconnect/breakpoint/preference changes. Tab in the pinned scene finishes it so controls are reachable. Swiper still owns story changes, independently of the scroll animation.

Hero caption replays a decorative 2.4s fill after a 0.35s delay (latest user direction); actual resource readiness remains separate. Shared owner-based intro/modal/menu locks control Lenis. See project brief for the current hero sequence.

Sources: [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [SplitText](https://gsap.com/docs/v3/Plugins/SplitText/), [license](https://gsap.com/standard-license/).
