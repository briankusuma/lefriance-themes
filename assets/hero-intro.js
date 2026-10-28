/* A progressive, session-aware introduction. The unenhanced hero is always visible. */
if (!customElements.get("hero-intro")) {
  customElements.define(
    "hero-intro",
    class extends HTMLElement {
      connectedCallback() {
        this.motion = matchMedia("(prefers-reduced-motion: reduce)");
        const seen = (() => {
          try {
            return sessionStorage.getItem("lefriance:hero-intro:v1");
          } catch {
            return false;
          }
        })();
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
        this.animations = new Set();
        this.restores = [];
        this.active = true;
        this.run().catch(() => this.finish());
      }

      animate(
        element,
        frames,
        duration,
        easing = "cubic-bezier(.76, 0, .24, 1)",
      ) {
        if (!this.active || !element) return Promise.resolve();
        const animation = element.animate(frames, {
          duration,
          easing,
          fill: "forwards",
        });
        this.animations.add(animation);
        return animation.finished;
      }

      async run() {
        const signal = this.controller.signal;
        const detail = this.querySelector(".editorial-hero__detail-content");
        const surface = this.querySelector(".editorial-hero__intro-surface");
        const pre = this.querySelector(".editorial-hero__pre");
        const title = this.querySelector(".editorial-hero__title");
        const line = this.querySelector(".editorial-hero__reveal-line");
        const progress = this.querySelector(
          ".editorial-hero__intro-progress span",
        );
        const skip = this.querySelector("[data-intro-skip]");
        const header = document.querySelector('.site-header[data-home="true"]');
        if (!detail || !surface || !skip) return this.finish();
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        this.classList.add("is-intro-running");
        skip.hidden = false;
        this.safety = setTimeout(() => this.finish(), 14000);
        skip.addEventListener("click", () => this.finish(), { signal });
        document.addEventListener(
          "keydown",
          (event) => {
            if (event.key === "Escape") this.finish();
          },
          { signal },
        );
        window.addEventListener("pagehide", () => this.finish(), { signal });
        window.addEventListener("resize", () => this.finish(), { signal });
        this.motion.addEventListener("change", () => this.finish(), { signal });
        // Keep the skip control available while the rest of the page is covered.
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
        if (header)
          this.animate(
            header,
            [
              { opacity: 0, transform: "translateY(-110%)" },
              { opacity: 0, transform: "translateY(-110%)" },
            ],
            1,
          );
        const box = detail.getBoundingClientRect();
        const hero = this.getBoundingClientRect();
        const offset = `translate(${innerWidth / 2 - box.left - box.width / 2}px, ${innerHeight / 2 - box.top - box.height / 2}px)`;
        const positioned = detail.animate([{ transform: offset }], {
          duration: 1,
          fill: "forwards",
        });
        this.animations.add(positioned);
        this.classList.add("is-intro-loading");
        const images = [...this.querySelectorAll("img")];
        const loaded = Promise.all(
          images.map((img) => {
            img.loading = "eager";
            return img.decode().catch(() => {});
          }),
        );
        await Promise.all([
          this.animate(
            detail,
            [{ opacity: 0 }, { opacity: 1 }],
            900,
            "ease-out",
          ),
          this.animate(
            progress,
            [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
            1800,
            "linear",
          ),
          Promise.race([
            loaded,
            new Promise((resolve) => {
              this.loadTimer = setTimeout(resolve, 2600);
            }),
          ]),
        ]);
        if (!this.active) return;
        try {
          sessionStorage.setItem("lefriance:hero-intro:v1", "1");
        } catch {
          /* Storage is optional. */
        }
        this.classList.remove("is-intro-loading");
        this.classList.add("is-intro-moving");
        positioned.cancel();
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
        await Promise.all([
          this.animate(
            detail,
            [{ transform: offset }, { transform: "translate(0, 0)" }],
            1800,
          ),
          this.animate(
            surface,
            [
              { transform: "translate(0, 0) rotate(0deg) scale(1, 1)" },
              {
                transform: `translate(${hero.left + x}px, ${hero.top + y}px) rotate(1.44deg) scale(${targetWidth / innerWidth}, ${targetHeight / innerHeight})`,
              },
            ],
            1800,
          ),
          this.animate(
            progress.parentElement,
            [{ opacity: 1 }, { opacity: 0 }],
            500,
          ),
        ]);
        if (!this.active) return;
        await Promise.all([
          this.animate(
            pre,
            [{ opacity: 1 }, { opacity: 0 }],
            1800,
            "ease-in-out",
          ),
          this.animate(
            surface,
            [{ opacity: 1 }, { opacity: 0 }],
            1800,
            "ease-in-out",
          ),
          this.animate(
            this.querySelector(".editorial-hero__shade"),
            [
              { opacity: 0 },
              {
                opacity:
                  getComputedStyle(this)
                    .getPropertyValue("--hero-overlay-opacity")
                    .trim() || ".6",
              },
            ],
            1800,
          ),
        ]);
        if (!this.active) return;
        await this.animate(
          line,
          [
            { transform: "scaleX(0)", opacity: 1 },
            { transform: "scaleX(1)", opacity: 1 },
          ],
          1000,
          "ease-in-out",
        );
        if (!this.active) return;
        await Promise.all([
          this.animate(
            title,
            [{ clipPath: "inset(100% 0 0)" }, { clipPath: "inset(0% 0 0)" }],
            1500,
          ),
          this.animate(line, [{ opacity: 1 }, { opacity: 0 }], 650),
          this.animate(
            header,
            [
              { opacity: 0, transform: "translateY(-110%)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            1200,
          ),
        ]);
        this.finish();
      }

      finish() {
        if (!this.active) return;
        this.active = false;
        clearTimeout(this.safety);
        clearTimeout(this.loadTimer);
        this.controller.abort();
        const skip = this.querySelector("[data-intro-skip]");
        const restoreFocus = document.activeElement === skip;
        this.classList.remove(
          "is-intro-running",
          "is-intro-loading",
          "is-intro-moving",
        );
        for (const animation of this.animations) animation.cancel();
        for (const restore of this.restores.reverse()) restore();
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
