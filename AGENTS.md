# AGENTS.md

Original Shopify theme for furniture merchants, targeting the Shopify Theme Store. Design source: Figma. Foundation: the official Shopify Skeleton Theme has been imported and adapted in T00. Inspect the current files; do not reinitialize it.

## Start here — any AI assistant

These instructions travel with the repository. They do not depend on previous chats, a specific AI product, plugins, or absolute machine paths. Read `docs/project-brief.md`, inspect the files relevant to the request, then read the active task and applicable standards. Do not read the whole docs folder or full reports for every change. Treat historical notes as dated observations, not live state.

The user's current request determines the work. `docs/tasks.md` records scope and progress; its IDs, dates, and status fields are organizational aids, not a permission ritual. Do not rewrite these instructions, reinitialize an existing theme, change the stack, or regenerate documentation merely because a different AI is working on the project.

## Task entry point

- **"eksekusi task"**, **"ekseskui task"**, or "jalankan task" without another target: read `docs/tasks.md` fresh and use its active task.
- **An implementation request plus a Figma section URL, section name, or task ID**: use that explicit target instead of the previously active ID. Match file key and node ID to the backlog, allowing `3374-270` and `3374:270`. Inspect descendants/ancestors when needed; do not match by node number across unrelated files.
- A link alone follows clear ongoing implementation context. With no clear action context, inspect and summarize the target, then clarify only whether implementation is intended. A request to analyze, check, plan, or edit docs does not authorize building.
- Do not require the user to edit Markdown, select an ID, change `draft` to `ready`, or repeat a date when their current request already gives a clear scope. Update bookkeeping yourself. Ask only for missing material decisions, not routine implementation choices.
- If a linked frame covers multiple tasks (for example header + hero or newsletter + footer), use the named section when supplied. Otherwise inspect the frame and explain the coherent scope before proceeding; clarify only if it would materially change the work. A homepage link is not automatic authorization to implement the whole backlog.
- Reuse a matching task. For a new target, append a scoped task with the inspected Figma reference, Shopify mapping, and verifiable acceptance criteria. Report this mapping before coding; approval is unnecessary unless a material choice remains unresolved.
- Keep only the active task and a concise result in docs/tasks.md. Carry unfinished work forward; use Git for history. Do not persist task-history archives, validation dumps, screenshots or duplicate reports in the repository unless requested. A change to a completed section is a follow-up, not a reason to refuse.
- Implement only the requested target and necessary prerequisites. Existing code comes first; initialize Skeleton only when no foundation exists and the requested implementation needs it. Do not complete unrelated prerequisites or redesign other sections silently.
- A generic execution command runs one active task, then stops. Do not advance through the backlog automatically. An explicit multi-section request may cover those sections together.
- Documentation-only work needs documentation checks. Apply code, editor, accessibility, and performance checks according to actual scope. Never report an unperformed check as passed.
- Installation of plugins is not requested or required. Do not install or configure them without a new explicit user request. Publishing, deployment, purchases, unrelated deletion, and messages to others require explicit scope.

## Read these files (on demand, with your file tools)

- `docs/theme-standards.md`: detailed Liquid, CSS, JS, settings copy, accessibility, performance, content, and required-functionality rules. **Read it before writing any code.**
- `docs/theme-store-checklist.md`: full Theme Store requirement checklist. **Check it before declaring any task done** and update the items you verified.
- `docs/README.md`: documentation map and daily-task instructions.
- `docs/project-brief.md`: project context, design source, and confirmed decisions.

This file is the core guidance. Read the referenced documents when relevant to the active task.

## 0. Precedence

When rules conflict, higher wins:

1. Safety and legality (licenses, no deceptive content, no secrets in the repo)
2. Shopify Theme Store requirements (hard gate; one miss means rejection): https://shopify.dev/docs/storefronts/themes/store/requirements
3. Shopify documented behavior (verified through official Shopify documentation)
4. Accessibility, performance, browser compatibility
5. Figma design
6. Existing repo conventions
7. Convenience

If Figma conflicts with 1-4, adapt, keep the visual intent, and **report the deviation**. If unclear, research or ask. Do not guess. Requirements change, so re-fetch the official page at the start of each milestone.

## 1. Figma (design source; tool-independent)

For every component or page:

1. Read the target design, obtain a screenshot, and inspect available styles/variables. Prefer available Figma tools; another authorized integration or user-provided export is acceptable. Never work from memory. If design access is missing, finish independent work and report the precise missing input; do not fabricate design values or claim visual verification.
2. Extract tokens first: colors, type scale, spacing, radii, borders, shadows, breakpoints, image ratios.
3. Propose the Shopify mapping before coding (table below). Ask if ambiguous.
4. Implement, then compare to the Figma screenshot at desktop and mobile.
5. If a frame, breakpoint, or state is missing, build it from existing tokens and flag it as "not in Figma". Never invent silently.

| Figma | Shopify |
| --- | --- |
| Color styles | `settings_schema.json` color settings and color schemes, exposed as CSS custom properties |
| Text styles | `font_picker` settings plus CSS type-scale tokens |
| Page module | Section |
| Repeatable item in a module | Block (theme block in `blocks/` if reused across sections) |
| Markup reused in 2+ places | Snippet |
| Icons | Inline SVG in snippets (no icon fonts, no CDNs) |
| Auto-layout | CSS grid/flex, relative units |

Known traps:

- **Custom fonts are not accepted.** Map Figma fonts to Shopify's font library and tell the user when no exact match exists.
- Figma shows one content length. The layout must hold with short and long text, 1 or 12 images, mixed ratios, and missing optional content.
- Figma rarely shows: empty cart, empty collection, no results, 404, password, gift card, sold out, unavailable variant, errors, loading, focus, disabled. All are required.
- Do not copy Figma text blindly into setting defaults. Editor labels and help text explain usage; section/block content defaults must explain how to use the setting rather than contain demo-store copy. Keep demo-store copy authentic. Use sentence case and American English; never Lorem Ipsum.

## 2. Official Shopify documentation (technical source)

Mandatory before writing or changing Liquid, objects, filters, tags, schema, setting types, templates, or any Shopify behavior.

1. Read the relevant official shopify.dev documentation using available web, documentation, or MCP tools. No particular connector is required.
2. Verify the object, filter, tag, property, return type, and theme support.
3. Implement the documented pattern.
4. Use available Liquid validation tooling; optional integration checks do not replace Theme Check.
5. Run `shopify theme check`; fix relevant findings.

Never invent Liquid objects, filters, tags, properties, schema keys, or setting types. Do not rely on memory, blogs, or other themes.

Tools are interchangeable; Shopify behavior and evidence requirements are not. Use Shopify CLI where relevant. If CLI, browser, or store access is unavailable, record the unavailable check and continue independent work without claiming completion of that check. No plugin is a development or theme runtime dependency.

## 3. Foundation and originality

- Base: **Shopify Skeleton only.** Never use or copy Dawn, Horizon, their derivatives, or any other theme's code. Read docs examples for understanding; write independent code.
- Uniqueness is architectural: header and navigation system, product cards, media treatment, page composition, component relationships, editing experience. Colors, fonts, spacing, gradients, blurs, shadows, and animation tweaks do **not** count.
- The theme targets one merchant type or industry. Keep decisions consistent with it.

## 4. Structure and required files

```text
assets/ blocks/ config/ layout/ listings/ locales/ sections/ snippets/ templates/
```

(`listings/` only when there are 2+ presets.)

Required: `layout/theme.liquid`; `templates/` `404.json`, `article.json`, `blog.json`, `cart.json`, `collection.json`, `index.json`, `list-collections.json`, `page.json`, `page.contact.json`, `password.json`, `product.json`, `search.json`, `gift_card.liquid`; `config/settings_schema.json`, `config/settings_data.json`.

Never include: `config/markets.json`, `robots.txt.liquid`, `.scss`/`.scss.liquid`, minified CSS/JS (ES modules and approved third-party libs excepted), demo-store-specific resources in JSON (custom metafields, `shopify://` URLs).

- All templates except account, gift card, and checkout are JSON and support sections.
- Header and footer render through **section groups**.
- Required **Custom Liquid** section (with a `liquid` setting) on every section-capable template, and a **Custom Liquid** block wherever an app block would fit.
- Main product section is block-based and supports `@app` blocks; the featured product section also supports `@app` blocks.
- Sections have one clear job. Blocks exist for merchant reorder/add/remove, not to inflate settings. Snippets are for reusable logic, not every fragment.

## 5. Core rules digest (details in `docs/theme-standards.md`)

- Liquid: verified syntax, `routes` for all URLs, `<html lang="{{ request.locale.iso_code }}">`, never touch `content_for_header`, `alt` on every image.
- CSS: native only, no minified files, CSS custom properties driven by settings, low specificity, `:focus-visible`, `prefers-reduced-motion`.
- JS: native first, progressive enhancement, hosted in `assets/`, no external hosts, handle Theme Editor events, no interference with native Shopify features.
- Accessibility: valid semantic HTML, full keyboard use, visible focus, contrast 4.5:1 text and 3:1 large text and UI, touch targets at least 24 x 24px.
- Performance: Lighthouse averages on home, collection, and product pages (desktop and mobile) must be Performance >= 60 and Accessibility >= 90, with real content. Responsive images, lazy-load below the fold.
- Content: no Lorem Ipsum, fake urgency, scarcity, stock, visitors, or reviews. No credits, promo links, or affiliate links. Links to Shopify domains carry `rel="nofollow"`. No app dependencies or app-like features (wishlist, scheduling, Instagram feed, cart-level discount codes). License every third-party asset.

## 6. Workflow and definition of done

```text
Figma context + tokens -> Shopify mapping -> official Shopify docs -> implement
-> shopify theme check -> Theme Editor test -> compare with Figma
-> a11y + performance -> update checklist
```

Before creating a section, block, snippet, setting, or script, ask: does Shopify or the repo already provide it? Does Figma require it? Does it add editor complexity, performance cost, a11y risk, or Theme Store risk? Before modifying code, understand why it exists and make the smallest correct change.

Run `shopify theme check` after meaningful Liquid or JSON changes. Never silence a rule just to pass; justify any disabled rule in a comment.

A task is done when its scoped work and acceptance criteria are verified. Record the validation method and result, or explain why a check does not apply. Do not treat every task as a complete theme release.

- Documentation: check instructions, consistency, and local links.
- Foundation or tooling: check the structure, configuration, and commands introduced. Apply Theme Check when Liquid or theme JSON changes.
- Storefront components: apply the relevant checks below to the affected components.
- Release or submission: verify the full Theme Store checklist against current official requirements.

Storefront checks, where applicable:

- [ ] Matches Figma at desktop and mobile (deviations listed)
- [ ] Shopify APIs verified in official docs
- [ ] Theme Check clean for relevant findings
- [ ] Works in the Theme Editor (add, remove, reorder, edit, live preview)
- [ ] Keyboard and focus verified
- [ ] Empty, long-content, and mixed-ratio cases handled
- [ ] No new minified files, external hosts, or unlicensed assets
- [ ] Relevant checklist items updated

Final report: files changed, Shopify docs used, Theme Check result, Figma deviations, states not in Figma, risks, open questions.

For missing Figma states or breakpoints, follow the task's stated design discretion. If authorized, derive them from existing tokens, record assumptions and deviations, and continue. Ask only when a material decision cannot be resolved within the task scope, a font substitution materially changes the design, or a hard requirement is unclear or conflicting. Routine implementation choices do not require repeated approval.

## 7. Never

Use or copy Dawn, Horizon, or other themes. Invent Shopify APIs. Skip Theme Check, accessibility, or performance. Add Sass, minified assets, external script hosts, or unlicensed assets. Ship fake urgency, scarcity, or social proof. Add credits or affiliate links. Build features that need an app or external API. Hard-code merchant content that belongs in settings or blocks. Interfere with native behavior in the Theme Editor or Admin. Silently deviate from Figma or invent design it does not contain.

When in doubt: compliance over convenience, Shopify's documented practice over generic practice, research before guessing.
