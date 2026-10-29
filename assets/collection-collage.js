/* Five Figma scroll states; native sticky keeps custom-element lifecycle stable. */
if (!customElements.get("collection-collage")) {
  customElements.define(
    "collection-collage",
    class extends HTMLElement {
      connectedCallback() {
        if (this.controller && !this.controller.signal.aborted) return;
        this.controller = new AbortController();
        const { signal } = this.controller;
        this.selected = false;
        const owns = (event) =>
          this.contains(event.target) || event.target.contains(this);
        const select = (event) => {
          if (!owns(event)) return;
          this.selected = true;
          this.media?.revert();
          this.media = null;
        };
        const deselect = (event) => {
          if (!owns(event)) return;
          this.selected = false;
          this.queue();
        };
        for (const type of ["shopify:section:select", "shopify:block:select"])
          document.addEventListener(type, select, { signal });
        for (const type of [
          "shopify:section:deselect",
          "shopify:block:deselect",
        ])
          document.addEventListener(type, deselect, { signal });
        signal.addEventListener(
          "abort",
          () => {
            this.observer?.disconnect();
            this.introObserver?.disconnect();
          },
          { once: true },
        );
        this.queue();
      }

      queue() {
        this.observer?.disconnect();
        this.introObserver?.disconnect();
        this.introObserver = null;
        if (
          this.dataset.scrollReveal !== "true" ||
          this.selected ||
          this.media ||
          this.controller.signal.aborted ||
          !window.ThemeMotion
        )
          return;
        let near = !("IntersectionObserver" in window);
        const start = () => {
          if (!near || this.selected || this.controller.signal.aborted) return;
          const intro = document.querySelector("hero-intro.is-intro-running");
          if (intro) {
            if (!this.introObserver) {
              this.introObserver = new MutationObserver(start);
              this.introObserver.observe(intro, {
                attributes: true,
                attributeFilter: ["class"],
              });
            }
            return;
          }
          this.observer?.disconnect();
          this.introObserver?.disconnect();
          this.introObserver = null;
          this.setup();
        };
        if ("IntersectionObserver" in window) {
          this.observer = new IntersectionObserver(
            (entries) => {
              near = entries.some((entry) => entry.isIntersecting);
              start();
            },
            { rootMargin: "0px 0px 25% 0px" },
          );
          this.observer.observe(this);
        } else start();
      }

      async setup() {
        const signal = this.controller.signal;
        if (
          this.pending ||
          this.media ||
          this.selected ||
          signal.aborted ||
          matchMedia("(prefers-reduced-motion: reduce)").matches
        )
          return;
        const request = { signal };
        this.pending = request;
        try {
          const { gsap, ScrollTrigger } = await ThemeMotion.scrollAnimation({
            splitText: false,
          });
          await document.fonts.ready;
          if (signal.aborted || this.selected || !this.isConnected) return;
          const stage = this.querySelector(".collection-collage__stage");
          const heading = this.querySelector("h2");
          const description = this.querySelector(
            ".collection-collage__description",
          );
          const promotions = [
            ...this.querySelectorAll(".collection-collage__promotion"),
          ];
          const photos = [
            ...this.querySelectorAll(".collection-collage__photo"),
          ];
          if (!heading || !description || !photos.length) return;
          this.querySelectorAll("img").forEach((img) => {
            img.loading = "eager";
          });
          this.media = gsap.matchMedia();
          this.media.add(
            {
              desktop: "(min-width: 990px)",
              reduced: "(prefers-reduced-motion: reduce)",
            },
            ({ conditions }) => {
              if (conditions.reduced || !conditions.desktop) return;
              // Arbitrary merchant block counts keep their natural grid, without a forced scene.
              if (
                promotions.length !== 2 ||
                stage.querySelectorAll(".collection-collage__grid > *")
                  .length !== 8
              )
                return;
              this.classList.add("is-scroll-scene");
              if (
                promotions.some(
                  (item) => item.scrollHeight > item.clientHeight + 4,
                )
              ) {
                this.classList.remove("is-scroll-scene");
                return;
              }
              const position = (element) => {
                let left = 0,
                  top = 0,
                  node = element;
                while (node && node !== stage) {
                  left += node.offsetLeft;
                  top += node.offsetTop;
                  node = node.offsetParent;
                }
                return {
                  x: left + element.offsetWidth / 2,
                  y: top + element.offsetHeight / 2,
                };
              };
              const centerX = (element) =>
                stage.clientWidth / 2 - position(element).x;
              const atY = (element, fraction) =>
                stage.clientHeight * fraction - position(element).y;
              gsap.set([heading, description], { textAlign: "center" });
              gsap.set(heading, {
                width: () => Math.min(626, stage.clientWidth * 0.85),
              });
              gsap.set(heading, {
                x: () => centerX(heading),
                y: () => atY(heading, 0.42),
              });
              gsap.set(description, {
                x: () => centerX(description),
                y: () => atY(description, 0.56),
              });
              const gridItems = [
                ...stage.querySelectorAll(".collection-collage__grid > *"),
              ];
              const reveals = photos.map((photo) => {
                const slot = gridItems.indexOf(photo.parentElement);
                // The outer image cell clips a single translating photo. A second
                // moving clip-path hides early forward motion and makes it pop in.
                // Figma guides are reveal origins, not visible decoration.
                const from =
                  slot === 0 || slot === 6
                    ? {
                        xPercent: 100,
                        yPercent: 0,
                        clipPath: "none",
                        autoAlpha: 1,
                      }
                    : slot < 4
                      ? {
                          xPercent: 0,
                          yPercent: 100,
                          clipPath: "none",
                          autoAlpha: 1,
                        }
                      : {
                          xPercent: 0,
                          yPercent: -100,
                          clipPath: "none",
                          autoAlpha: 1,
                        };
                gsap.set(photo, from);
                return { photo, from };
              });
              promotions.forEach((item, index) =>
                gsap.set(item, {
                  autoAlpha: 0,
                  x: () =>
                    centerX(item) +
                    (index ? 1 : -1) * (item.offsetWidth / 2 + 10),
                  y: () => atY(item, 0.64),
                }),
              );
              const timeline = gsap.timeline({
                defaults: { ease: "power2.inOut" },
                scrollTrigger: {
                  trigger: this,
                  start: "top top",
                  end: "bottom bottom",
                  scrub: 1.2,
                  invalidateOnRefresh: true,
                },
              });
              timeline
                .fromTo(
                  [heading, description],
                  { opacity: 0.25 },
                  { opacity: 1, duration: 1.2 },
                  0,
                )
                .to(heading, { y: () => atY(heading, 0.16), duration: 1.5 }, 1)
                .to(
                  description,
                  { y: () => atY(description, 0.31), duration: 1.5 },
                  1,
                )
                .to(
                  promotions,
                  { autoAlpha: 1, duration: 1, stagger: 0.15 },
                  1.4,
                )
                .set([heading, description], { textAlign: "left" }, 2.8)
                .to([heading, description], { x: 0, y: 0, duration: 1.5 }, 2.8)
                .to(
                  heading,
                  {
                    width: () => Math.min(518, stage.clientWidth * 0.36),
                    duration: 1.5,
                  },
                  2.8,
                )
                .to(
                  promotions,
                  { x: 0, y: 0, duration: 1.5, stagger: 0.12 },
                  2.8,
                );
              reveals.forEach(({ photo, from }, index) => {
                timeline.fromTo(
                  photo,
                  from,
                  {
                    xPercent: 0,
                    yPercent: 0,
                    clipPath: "none",
                    autoAlpha: 1,
                    duration: 1.8,
                    immediateRender: false,
                    ease: "power2.inOut",
                  },
                  4.3 + index * 0.12,
                );
              });
              timeline.to({}, { duration: 0.7 });
              const access = () =>
                promotions.forEach((item) => {
                  item.inert = timeline.time() < 4.3;
                });
              timeline.eventCallback("onUpdate", access);
              access();
              const finishForKeyboard = (event) => {
                const trigger = timeline.scrollTrigger;
                if (event.key !== "Tab" || !trigger.isActive) return;
                timeline.progress(1);
                if (ThemeMotion.pageScroll)
                  ThemeMotion.pageScroll.scrollTo(trigger.end, {
                    immediate: true,
                  });
                else trigger.scroll(trigger.end);
              };
              document.addEventListener("keydown", finishForKeyboard);
              ScrollTrigger.refresh();
              ThemeMotion.pageScroll?.resize();
              return () => {
                document.removeEventListener("keydown", finishForKeyboard);
                timeline.scrollTrigger?.kill();
                timeline.kill();
                this.classList.remove("is-scroll-scene");
                promotions.forEach((item) => {
                  item.inert = false;
                });
                ThemeMotion.pageScroll?.resize();
              };
            },
          );
        } catch (error) {
          this.media?.revert();
          this.media = null;
          this.classList.remove("is-scroll-scene");
          console.warn(
            "Collection collage animation could not initialize.",
            error,
          );
        } finally {
          if (this.pending === request) this.pending = null;
        }
      }

      disconnectedCallback() {
        this.controller?.abort();
        this.media?.revert();
        this.media = null;
      }
    },
  );
}
