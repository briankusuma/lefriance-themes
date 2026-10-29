/* Scoped GSAP intro; the unenhanced hero remains available when assets fail. */
if (!customElements.get("hero-intro")) {
  customElements.define(
    "hero-intro",
    class extends HTMLElement {
      connectedCallback() {
        this.finish();
        this.motion = matchMedia("(prefers-reduced-motion: reduce)");
        let seen;
        try {
          seen = sessionStorage.getItem("lefriance:hero-intro:v1");
        } catch {
          /* Optional storage. */
        }
        if (
          this.dataset.introEnabled !== "true" ||
          this.dataset.designMode === "true" ||
          window.Shopify?.designMode ||
          this.motion.matches ||
          (this.dataset.introOnce === "true" && seen) ||
          document.querySelector("dialog[open], details[scroll-lock][open]")
        )
          return;
        this.controller = new AbortController();
        this.restores = [];
        this.active = true;
        const { signal } = this.controller;
        this.safety = setTimeout(() => this.finish(), 16000);
        window.addEventListener("pagehide", () => this.finish(), { signal });
        window.addEventListener("resize", () => this.finish(), { signal });
        this.motion.addEventListener("change", () => this.finish(), { signal });
        this.start(signal).catch(() => {
          if (!signal.aborted) this.finish();
        });
      }

      async start(signal) {
        const engine = await window.ThemeMotion?.animation();
        if (signal.aborted) return;
        if (!engine || !this.isConnected) return this.finish();
        const { gsap, SplitText } = engine;
        const find = (suffix) =>
          this.querySelector(`.editorial-hero__${suffix}`);
        const detail = find("detail-content"),
          surface = find("intro-surface"),
          pre = find("pre");
        const title = find("title"),
          line = find("reveal-line"),
          progress = find("intro-progress");
        const copy = find("intro-copy"),
          skip = this.querySelector("[data-intro-skip]");
        const header = document.querySelector('.site-header[data-home="true"]');
        if (!detail || !surface || !skip) return this.finish();
        this.releaseScroll = window.ThemeMotion.lockScroll(this);
        window.ThemeMotion.pageScroll?.scrollTo(0, {
          immediate: true,
          force: true,
        });
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        this.classList.add("is-intro-running", "is-intro-loading");
        skip.hidden = false;
        skip.addEventListener("click", () => this.finish(), { signal });
        document.addEventListener(
          "keydown",
          (event) => {
            if (event.key === "Escape") this.finish();
          },
          { signal },
        );
        // Keep only the intro and its Skip control interactive while covered.
        let branch = this;
        while (
          branch.parentElement &&
          branch.parentElement !== document.documentElement
        ) {
          for (const sibling of branch.parentElement.children) {
            if (sibling === branch || sibling.inert) continue;
            sibling.inert = true;
            this.restores.push(() => {
              sibling.inert = false;
            });
          }
          branch = branch.parentElement;
        }
        const link = detail.querySelector("a");
        if (link && !link.inert) {
          link.inert = true;
          this.restores.push(() => {
            link.inert = false;
          });
        }
        const headerGroup = header?.closest(".shopify-section");
        if (headerGroup) {
          const value = headerGroup.style.getPropertyValue("z-index");
          const priority = headerGroup.style.getPropertyPriority("z-index");
          headerGroup.style.setProperty("z-index", "120");
          this.restores.push(() =>
            value
              ? headerGroup.style.setProperty("z-index", value, priority)
              : headerGroup.style.removeProperty("z-index"),
          );
        }
        const box = detail.getBoundingClientRect(),
          hero = this.getBoundingClientRect();
        const targetWidth = Math.min(
          (261 * hero.width) / 1535,
          hero.width * 0.24,
        );
        const targetHeight = (57 * hero.height) / 1092;
        const x = Math.min(
          hero.width - targetWidth - 24,
          (hero.width * 1138) / 1535,
        );
        const y = (hero.height * 691) / 1092;
        const images = [...this.querySelectorAll("img")].map((img) => {
          img.loading = "eager";
          return img.decode().catch(() => {});
        });
        const loaded = Promise.race([
          Promise.all(images),
          new Promise((resolve) => {
            this.loadTimer = setTimeout(resolve, 2600);
          }),
        ]);
        try {
          sessionStorage.setItem("lefriance:hero-intro:v1", "1");
        } catch {
          /* Optional storage. */
        }
        // The accessible rich text stays intact; only its aria-hidden visual copy splits.
        if (copy)
          this.split = SplitText.create(copy, {
            type: "words",
            aria: "none",
            wordsClass: "editorial-hero__intro-word",
          });
        this.context = gsap.context(() => {
          gsap.set(detail, {
            x: innerWidth / 2 - box.left - box.width / 2,
            y: innerHeight / 2 - box.top - box.height / 2,
            opacity: 0,
          });
          gsap.set(title, { y: 0, yPercent: 100 });
          if (header) gsap.set(header, { yPercent: -110, opacity: 0 });
          const timeline = (this.timeline = gsap.timeline({
            defaults: { ease: "power3.inOut" },
            onComplete: () => this.finish(),
          }));
          timeline
            .to(detail, { opacity: 1, duration: 0.9 }, 0)
            .to(
              progress.firstElementChild,
              { scaleX: 1, duration: 1.8, ease: "none" },
              0,
            );
          if (this.split?.words.length)
            timeline.fromTo(
              this.split.words,
              { opacity: 0.12, yPercent: 20, clipPath: "inset(0 100% 0 0)" },
              {
                opacity: 1,
                yPercent: 0,
                clipPath: "inset(0 0% 0 0)",
                duration: 1.1,
                stagger: { amount: 0.7 },
                ease: "power2.out",
              },
              0,
            );
          timeline
            .addPause(1.8, () => {
              loaded.then(() => {
                if (!signal.aborted) timeline.resume();
              });
            })
            .call(() => this.classList.add("is-intro-moving"), null, 1.8)
            .to(detail, { x: 0, y: 0, duration: 1.8 }, 1.8)
            .to(
              surface,
              {
                x: hero.left + x,
                y: hero.top + y,
                rotation: 1.44,
                scaleX: targetWidth / innerWidth,
                scaleY: targetHeight / innerHeight,
                duration: 1.8,
              },
              1.8,
            )
            .to(progress, { opacity: 0, duration: 0.5 }, 1.8)
            .to(
              [pre, surface],
              { opacity: 0, duration: 1.8, ease: "power1.inOut" },
              3.6,
            )
            .to(
              find("shade"),
              {
                opacity:
                  Number(
                    getComputedStyle(this).getPropertyValue(
                      "--hero-overlay-opacity",
                    ),
                  ) || 0,
                duration: 1.8,
              },
              3.6,
            )
            .call(() => this.classList.remove("is-intro-loading"), null, 5.4)
            .to(
              line,
              { scaleX: 1, opacity: 1, duration: 1, ease: "power1.inOut" },
              5.4,
            )
            .to(title, { yPercent: 0, duration: 1.5 }, 6.4)
            .to(line, { opacity: 0, duration: 0.35 }, 7.55);
          if (header)
            timeline.to(
              header,
              { yPercent: 0, opacity: 1, duration: 1.2 },
              6.4,
            );
        }, this);
      }

      finish() {
        if (!this.active) return;
        this.active = false;
        clearTimeout(this.safety);
        clearTimeout(this.loadTimer);
        this.controller?.abort();
        const skip = this.querySelector("[data-intro-skip]");
        const restoreFocus = document.activeElement === skip;
        this.timeline?.kill();
        this.context?.revert();
        this.split?.revert();
        this.context = this.split = this.timeline = null;
        this.classList.remove(
          "is-intro-running",
          "is-intro-loading",
          "is-intro-moving",
        );
        for (const restore of this.restores.reverse()) restore();
        this.releaseScroll?.();
        this.releaseScroll = null;
        if (skip) skip.hidden = true;
        if (restoreFocus)
          document
            .querySelector(".site-header a, .site-header button")
            ?.focus({ preventScroll: true });
      }

      disconnectedCallback() {
        this.finish();
      }
    },
  );
}
