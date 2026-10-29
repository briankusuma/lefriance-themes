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
        window.addEventListener("pagehide", () => this.finish(), { signal });
        window.addEventListener("resize", () => this.finish(), { signal });
        this.motion.addEventListener("change", () => this.finish(), { signal });
        this.start(signal).catch(() => {
          if (!signal.aborted) this.finish();
        });
      }

      async start(signal) {
        const engineReady = window.ThemeMotion?.animation();
        if (!engineReady || !this.isConnected) return this.finish();
        const find = (suffix) =>
          this.querySelector(`.editorial-hero__${suffix}`);
        const detail = find("detail-content"),
          surface = find("intro-surface"),
          pre = find("pre");
        const sofa = find("intro-sofa");
        const title = find("title"),
          line = find("reveal-line"),
          progress = find("intro-progress");
        const copy = find("intro-copy"),
          skip = this.querySelector("[data-intro-skip]");
        const wordmarkSvg = title.querySelector(
          ".editorial-hero__wordmark-vector svg",
        );
        const letters = wordmarkSvg
          ? [...wordmarkSvg.querySelectorAll("path")].sort(
              (a, b) => b.getBBox().x - a.getBBox().x,
            )
          : [];
        const header = document.querySelector('.site-header[data-home="true"]');
        if (!detail || !surface || !skip || !sofa) return this.finish();
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
        // Frame 3725:1786: 274.995 x 70.797 at the center. Frame 3725:1775:
        // center (1266.675, 722.18), rotated 2.05 degrees in a 1535 x 1092 room.
        const sofaWidth = Math.min(
          Math.max(96, (274.995 * hero.width) / 1535),
          hero.width - 48,
        );
        const sofaHeight = (sofaWidth * 70.797) / 274.995;
        const centerX =
          hero.left +
          hero.width / 2 +
          (0.64 * hero.width) / 1535 -
          sofaWidth / 2;
        const centerY =
          hero.top +
          hero.height / 2 +
          (0.29 * hero.height) / 1092 -
          sofaHeight / 2;
        const cornerX =
          hero.left +
          Math.min(
            hero.width - sofaWidth - 24,
            (hero.width * 1266.675) / 1535 - sofaWidth / 2,
          );
        const cornerY =
          hero.top + (hero.height * 722.18) / 1092 - sofaHeight / 2;
        try {
          sessionStorage.setItem("lefriance:hero-intro:v1", "1");
        } catch {
          /* Optional storage. */
        }
        // Show real progress immediately, including while the animation library loads.
        this.prepareLoadingCopy(copy);
        this.progressFill = progress.firstElementChild;
        const oldTransform = this.progressFill.style.transform;
        this.restores.push(() => {
          this.progressFill.style.transform = oldTransform;
        });
        const oldDetailTransform = detail.style.transform;
        detail.style.transform = `translate(${innerWidth / 2 - box.left - box.width / 2}px, ${innerHeight / 2 - box.top - box.height / 2}px)`;
        this.restores.push(() => {
          detail.style.transform = oldDetailTransform;
        });
        const loaded = this.waitForLoading(signal, engineReady).catch(() => {
          if (!signal.aborted) this.finish();
        });
        const engine = await engineReady;
        if (signal.aborted) return;
        if (!engine) return this.finish();
        const { gsap, SplitText } = engine;
        const currentProgress = this.loadingValue;
        this.split?.revert();
        if (copy)
          this.split = SplitText.create(copy, {
            type: "words,chars",
            tag: "span",
            charsClass: "editorial-hero__intro-char",
            reduceWhiteSpace: false,
            aria: "none",
            wordsClass: "editorial-hero__intro-word",
          });
        this.paintLoadingProgress(currentProgress);
        this.context = gsap.context(() => {
          gsap.set(detail, {
            x: innerWidth / 2 - box.left - box.width / 2,
            y: innerHeight / 2 - box.top - box.height / 2,
            opacity: 1,
          });
          gsap.set(title, {
            y: 0,
            yPercent: 0,
            clipPath: letters.length ? "none" : "inset(0 0 0 100%)",
          });
          if (letters.length)
            gsap.set(letters, {
              y: wordmarkSvg.viewBox.baseVal.height,
              opacity: 0,
            });
          if (header) gsap.set(header, { yPercent: -110, opacity: 0 });
          const timeline = (this.timeline = gsap.timeline({
            paused: true,
            defaults: { ease: "power3.inOut" },
            onComplete: () => this.finish(),
          }));
          timeline
            .call(() => this.classList.add("is-intro-moving"), null, 0)
            .to(detail, { x: 0, y: 0, duration: 1.8 }, 0)
            .to(
              surface,
              {
                x: centerX,
                y: centerY,
                width: sofaWidth,
                height: sofaHeight,
                borderRadius: (10 * hero.width) / 1535,
                rotation: 0,
                duration: 1.8,
              },
              0,
            )
            .to(
              sofa,
              { opacity: 1, duration: 0.45, ease: "power1.inOut" },
              1.35,
            )
            .to(
              surface,
              {
                backgroundColor: "rgba(0, 0, 0, 0)",
                duration: 0.45,
                ease: "power1.inOut",
              },
              1.35,
            )
            .addLabel("center-sofa", 1.8)
            .to(
              surface,
              { x: cornerX, y: cornerY, rotation: 2.05, duration: 2 },
              "center-sofa",
            )
            .addLabel("sofa-settled", 3.8)
            .to(progress, { opacity: 0, duration: 0.5 }, 0)
            .to(
              [pre, surface],
              { opacity: 0, duration: 2, ease: "power1.inOut" },
              "sofa-settled",
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
                duration: 2,
              },
              "sofa-settled",
            )
            .addLabel("room-ready", 5.8)
            .addLabel("wordmark-reveal", 2.3)
            .call(
              () => this.classList.remove("is-intro-loading"),
              null,
              "room-ready",
            )
            .to(
              line,
              { scaleX: 1, opacity: 1, duration: 0.5, ease: "power1.inOut" },
              "center-sofa",
            )
            .to(line, { opacity: 0, duration: 0.35 }, 3.45);
          if (letters.length) {
            // Use the original Figma paths; rightmost letter rises from the line first.
            timeline.to(
              letters,
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: { amount: 0.7 },
                ease: "power3.out",
              },
              "wordmark-reveal",
            );
          } else {
            // A merchant-uploaded wordmark is one image, so retain it and reveal right to left.
            timeline.to(
              title,
              { clipPath: "inset(0 0 0 0%)", duration: 1.5 },
              "wordmark-reveal",
            );
          }
          if (header)
            timeline.to(
              header,
              { yPercent: 0, opacity: 1, duration: 1.4 },
              2.4,
            );
        }, this);
        await loaded;
        if (!signal.aborted) this.timeline.play();
      }

      prepareLoadingCopy(copy) {
        if (!copy) return;
        const original = [...copy.childNodes];
        const chars = [],
          fragment = document.createDocumentFragment();
        const segmenter =
          typeof Intl.Segmenter === "function"
            ? new Intl.Segmenter(undefined, { granularity: "grapheme" })
            : null;
        for (const token of copy.textContent.split(/(\s+)/)) {
          if (!token) continue;
          if (/^\s+$/.test(token)) {
            fragment.append(document.createTextNode(token));
            continue;
          }
          const word = document.createElement("span");
          word.className = "editorial-hero__intro-word";
          word.style.display = "inline-block";
          const letters = segmenter
            ? [...segmenter.segment(token)].map((item) => item.segment)
            : Array.from(token);
          for (const letter of letters) {
            const char = document.createElement("span");
            char.className = "editorial-hero__intro-char";
            char.style.display = "inline-block";
            char.textContent = letter;
            word.append(char);
            chars.push(char);
          }
          fragment.append(word);
        }
        copy.replaceChildren(fragment);
        this.split = { chars, revert: () => copy.replaceChildren(...original) };
      }

      async waitForLoading(signal, engineReady) {
        // Readiness milestones, not a percentage of network bytes. Native image
        // requests do not expose byte progress; reuse their actual decode lifecycle.
        const tasks = [...this.querySelectorAll("img")].map((image) => {
          image.loading = "eager";
          return () => this.waitForImage(image, signal);
        });
        if (document.fonts) tasks.push(() => document.fonts.ready);
        if (engineReady) tasks.push(() => engineReady);
        let completed = 0;
        this.paintLoadingProgress(0);
        await Promise.all(
          tasks.map(async (ready) => {
            await ready();
            if (signal.aborted) return;
            this.paintLoadingProgress(++completed / tasks.length);
          }),
        );
        if (!tasks.length && !signal.aborted) this.paintLoadingProgress(1);
      }

      async waitForImage(image, signal) {
        if (signal.aborted) return;
        if (!image.complete) {
          // Eager/srcset selection can still be pending. Wait for the actual load
          // event before decoding; a failed request must not count as ready.
          await new Promise((resolve, reject) => {
            const clean = () => {
              image.removeEventListener("load", onLoad);
              image.removeEventListener("error", onError);
              signal.removeEventListener("abort", onAbort);
            };
            const onLoad = () => {
              clean();
              resolve();
            };
            const onError = () => {
              clean();
              reject(new Error("Hero image failed to load"));
            };
            const onAbort = () => {
              clean();
              resolve();
            };
            image.addEventListener("load", onLoad, { once: true });
            image.addEventListener("error", onError, { once: true });
            signal.addEventListener("abort", onAbort, { once: true });
          });
        }
        if (!signal.aborted) await image.decode();
      }

      paintLoadingProgress(progress) {
        const value = Math.max(0, Math.min(1, progress || 0));
        this.loadingValue = value;
        const chars = this.split?.chars || [];
        // Three adjacent characters overlap in progress space; no time-based tween.
        const overlap = Math.min(3, chars.length);
        const cursor = value * (Math.max(0, chars.length - 1) + overlap);
        chars.forEach((char, index) => {
          const fill = Math.max(0, Math.min(1, (cursor - index) / overlap));
          const eased = fill * fill * (3 - 2 * fill);
          char.style.opacity = String(0.25 + 0.75 * eased);
        });
        // Keep the existing line honest; do not introduce another indicator.
        this.progressFill.style.transform = `scaleX(${value})`;
      }

      finish() {
        if (!this.active) return;
        this.active = false;
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
