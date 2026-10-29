if (!customElements.get("material-story")) {
  customElements.define(
    "material-story",
    class extends HTMLElement {
      connectedCallback() {
        if (!window.ThemeMotion) return;
        this.motionMedia?.revert();
        this.controller?.abort();
        this.swiper?.destroy(true, true);
        this.swiperCategory = null;
        this.controller = new AbortController();
        const { signal } = this.controller;
        this.items = [...this.querySelectorAll("[data-story-item]")];
        this.selectors = [...this.querySelectorAll("[data-story-select]")];
        this.categories = [...this.querySelectorAll("[data-story-category]")];
        this.category = "";
        this.activeIndex = Number(this.dataset.initialIndex) || 0;
        if (!this.items[this.activeIndex]) this.activeIndex = 0;

        this.addEventListener(
          "click",
          (event) => {
            const filter = event.target.closest("[data-story-category]");
            const selector = event.target.closest("[data-story-select]");
            if (filter) {
              this.category = filter.dataset.storyCategory;
              this.activeIndex = this.items.findIndex((item) =>
                this.matchesCategory(item),
              );
              this.update(true);
            } else if (selector) {
              this.activeIndex = Number(selector.dataset.storySelect);
              this.update(true);
            }
          },
          { signal },
        );

        this.addEventListener(
          "keydown",
          (event) => {
            const button = event.target.closest(
              "[data-story-select], [data-story-category]",
            );
            if (
              !button ||
              ![
                "ArrowLeft",
                "ArrowRight",
                "ArrowUp",
                "ArrowDown",
                "Home",
                "End",
              ].includes(event.key)
            )
              return;
            const buttons = [
              ...button.parentElement.querySelectorAll("button"),
            ].filter((item) => !item.hidden);
            let index = buttons.indexOf(button);
            if (event.key === "Home") index = 0;
            else if (event.key === "End") index = buttons.length - 1;
            else
              index =
                (index +
                  (["ArrowLeft", "ArrowUp"].includes(event.key) ? -1 : 1) +
                  buttons.length) %
                buttons.length;
            event.preventDefault();
            buttons[index]?.focus();
            buttons[index]?.click();
          },
          { signal },
        );

        this.addEventListener(
          "shopify:block:select",
          (event) => {
            const item = event.target.closest("[data-story-item]");
            if (!item) return;
            this.category = "";
            this.activeIndex = this.items.indexOf(item);
            this.update(false);
          },
          { signal },
        );

        this.classList.add("is-enhanced");
        this.querySelectorAll("[data-story-controls]").forEach((control) => {
          control.hidden = this.items.length === 0;
        });
        this.update(false).then(() => this.setupMotion());
      }

      async setupMotion() {
        const signal = this.controller.signal;
        if (
          this.dataset.scrollReveal !== "true" ||
          !this.items.length ||
          !this.swiper ||
          window.Shopify?.designMode ||
          matchMedia("(prefers-reduced-motion: reduce)").matches
        )
          return;
        try {
          const { gsap, SplitText, ScrollTrigger } =
            await ThemeMotion.scrollAnimation();
          if (signal.aborted || !this.isConnected) return;
          await document.fonts.ready;
          if (signal.aborted) return;
          const layout = this.querySelector(".material-story__layout");
          const heading = this.querySelector(".material-story__heading");
          const footer = this.querySelector(".material-story__footer");
          const stories = this.querySelector(".material-story__stories");
          const sides = [
            ...this.querySelectorAll(
              ".material-story__left, .material-story__right",
            ),
          ];
          this.motionMedia = gsap.matchMedia();
          this.motionMedia.add(
            {
              desktop: "(min-width: 990px) and (min-height: 700px)",
              mobile: "(max-width: 989px), (max-height: 699px)",
              reduced: "(prefers-reduced-motion: reduce)",
            },
            ({ conditions }) => {
              if (conditions.reduced) return;
              let pinScene = conditions.desktop;
              if (pinScene) {
                this.classList.add("is-scroll-scene");
                const rowSpace =
                  (layout.clientHeight - stories.clientHeight) / 2;
                if (
                  this.items.some(
                    (item) => item.scrollHeight > item.clientHeight + 2,
                  ) ||
                  heading.scrollHeight > rowSpace ||
                  footer.scrollHeight > rowSpace
                ) {
                  this.classList.remove("is-scroll-scene");
                  pinScene = false;
                }
              }
              const split = SplitText.create(heading, {
                type: "words,chars",
                aria: "auto",
                wordsClass: "story-reveal-word",
              });
              // Inline words preserve natural wrapping; opacity never changes layout.
              const title = gsap.fromTo(
                split.chars,
                { opacity: 0.25 },
                {
                  opacity: 1,
                  duration: 1,
                  stagger: { amount: 2.5 },
                  ease: "none",
                  paused: true,
                },
              );
              let timeline;
              if (pinScene) {
                this.classList.add("is-scroll-scene");
                const line = (name) =>
                  this.querySelector(`[data-story-line="${name}"]`);
                const half = () => stories.offsetHeight / 2;
                const centerY = (element) =>
                  layout.offsetHeight / 2 -
                  element.offsetTop -
                  element.offsetHeight / 2;
                gsap.set(sides, { autoAlpha: 0 });
                gsap.set(stories, { scale: 0.25, autoAlpha: 0 });
                gsap.set(heading, { y: () => centerY(heading) - 90 });
                gsap.set(footer, { y: () => centerY(footer) + 65 });
                gsap.set([line("horizontal"), line("top"), line("bottom")], {
                  scaleX: 0,
                });
                gsap.set([line("vertical"), line("left"), line("right")], {
                  scaleY: 0,
                });
                timeline = gsap.timeline({
                  defaults: { ease: "power2.inOut" },
                  scrollTrigger: {
                    trigger: this,
                    start: "top top",
                    end: () => `+=${innerHeight * 4.5}`,
                    pin: true,
                    scrub: 1.2,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onRefresh: () => ThemeMotion.pageScroll?.resize(),
                  },
                });
                timeline
                  .to(title, { progress: 1, duration: 2.2, ease: "none" }, 0)
                  .to(line("horizontal"), { scaleX: 1, duration: 1.2 }, 1.8)
                  .to(line("vertical"), { scaleY: 1, duration: 1 }, 2.7)
                  .to(
                    [line("horizontal"), line("vertical")],
                    { opacity: 0, duration: 0.3 },
                    3.5,
                  )
                  .to(
                    [line("top"), line("bottom")],
                    { scaleX: 1, duration: 0.3 },
                    3.5,
                  )
                  .to(
                    [line("left"), line("right")],
                    { scaleY: 1, duration: 0.3 },
                    3.5,
                  )
                  .to(
                    line("top"),
                    { y: () => -half() * 0.25, duration: 1 },
                    3.5,
                  )
                  .to(
                    line("bottom"),
                    { y: () => half() * 0.25, duration: 1 },
                    3.5,
                  )
                  .to(
                    line("left"),
                    { x: () => -half() * 0.25, duration: 1 },
                    3.5,
                  )
                  .to(
                    line("right"),
                    { x: () => half() * 0.25, duration: 1 },
                    3.5,
                  )
                  .to(stories, { autoAlpha: 1, duration: 0.8 }, 3.8)
                  .to(heading, { y: 0, duration: 3 }, 3.5)
                  .to(footer, { y: 0, duration: 3 }, 3.5)
                  .to(stories, { scale: 1, duration: 2.6 }, 4.5)
                  .to(line("top"), { y: () => -half(), duration: 2.6 }, 4.5)
                  .to(line("bottom"), { y: () => half(), duration: 2.6 }, 4.5)
                  .to(line("left"), { x: () => -half(), duration: 2.6 }, 4.5)
                  .to(line("right"), { x: () => half(), duration: 2.6 }, 4.5)
                  .to(
                    layout,
                    { "--story-frame-opacity": 1, duration: 0.9 },
                    6.8,
                  )
                  .to(sides, { autoAlpha: 1, duration: 1.2, stagger: 0.2 }, 7.4)
                  .to({}, { duration: 0.7 });
                const updateAccess = () => {
                  sides.forEach((side) => {
                    side.inert = timeline.time() < 7.4;
                  });
                  stories.inert = timeline.time() < 6.5;
                };
                timeline.eventCallback("onUpdate", updateAccess);
                updateAccess();
              } else {
                timeline = gsap.timeline({
                  scrollTrigger: {
                    trigger: heading,
                    start: "top 85%",
                    end: "top 30%",
                    scrub: 0.8,
                  },
                });
                timeline.to(title, { progress: 1, duration: 1, ease: "none" });
              }
              const finishForKeyboard = (event) => {
                const trigger = timeline.scrollTrigger;
                if (event.key !== "Tab" || !pinScene || !trigger?.isActive)
                  return;
                timeline.progress(1);
                if (ThemeMotion.pageScroll)
                  ThemeMotion.pageScroll.scrollTo(trigger.end, {
                    immediate: true,
                  });
                else trigger.scroll(trigger.end);
              };
              document.addEventListener("keydown", finishForKeyboard);
              // Refresh after lazy media dimensions settle; no extra RAF or scroll owner.
              const refresh = () => ScrollTrigger.refresh();
              const images = [...this.querySelectorAll("img")].filter(
                (img) => !img.complete,
              );
              images.forEach((img) =>
                img.addEventListener("load", refresh, { once: true }),
              );
              ScrollTrigger.refresh();
              return () => {
                document.removeEventListener("keydown", finishForKeyboard);
                images.forEach((img) =>
                  img.removeEventListener("load", refresh),
                );
                timeline.scrollTrigger?.kill();
                timeline.kill();
                title.kill();
                split.revert();
                this.classList.remove("is-scroll-scene");
                sides.forEach((side) => {
                  side.inert = false;
                });
                stories.inert = false;
                ThemeMotion.pageScroll?.resize();
              };
            },
          );
        } catch {
          this.motionMedia?.revert();
          this.classList.remove("is-scroll-scene");
        }
      }

      matchesCategory(item) {
        return (
          this.category === "" ||
          item.dataset.storyCategoryName === this.category
        );
      }

      async update(announce) {
        const signal = this.controller.signal;
        const category = this.category;
        const visible = this.items.filter((item) => this.matchesCategory(item));
        if (this.swiperCategory !== this.category) {
          this.swiper?.destroy(true, true);
          this.swiperCategory = this.category;
          this.items.forEach((item) => {
            item.hidden = !this.matchesCategory(item);
          });
          const swiper = await ThemeMotion.create(
            this.querySelector(".material-story__stories"),
            visible,
            {
              slidesPerView: 1,
              autoHeight: true,
              effect: "fade",
              fadeEffect: { crossFade: true },
              rewind: true,
              on: {
                slideChange: (swiper) => {
                  this.activeIndex = this.items.indexOf(
                    visible[swiper.realIndex],
                  );
                  this.paint(false);
                },
              },
            },
          );
          if (signal.aborted || this.category !== category) {
            swiper?.destroy(true, true);
            return;
          }
          this.swiper = swiper;
          if (!swiper && visible.length) {
            this.classList.remove("is-enhanced");
            this.items.forEach((item) => {
              item.hidden = false;
              item.inert = false;
              item.removeAttribute("aria-hidden");
            });
            this.querySelectorAll("[data-story-controls]").forEach(
              (control) => (control.hidden = true),
            );
            return;
          }
        }
        const index = visible.indexOf(this.items[this.activeIndex]);
        this.swiper?.slideTo(
          Math.max(0, index),
          announce ? ThemeMotion.speed : 0,
        );
        this.paint(announce);
      }

      paint(announce) {
        this.items.forEach((item, index) => {
          item.inert = index !== this.activeIndex;
          item.setAttribute("aria-hidden", String(index !== this.activeIndex));
        });
        this.categories.forEach((button) => {
          button.setAttribute(
            "aria-pressed",
            String(button.dataset.storyCategory === this.category),
          );
        });
        this.selectors.forEach((button) => {
          const index = Number(button.dataset.storySelect);
          button.hidden = !this.matchesCategory(this.items[index]);
          button.setAttribute(
            "aria-pressed",
            String(index === this.activeIndex),
          );
        });
        this.querySelector("[data-story-empty]").hidden = Boolean(
          this.items[this.activeIndex],
        );
        if (announce)
          this.querySelector("[data-story-status]").textContent =
            this.items[this.activeIndex]?.dataset.storyTitle ||
            this.querySelector("[data-story-empty]").textContent;
      }

      disconnectedCallback() {
        this.motionMedia?.revert();
        this.controller?.abort();
        this.swiper?.destroy(true, true);
      }
    },
  );
}
