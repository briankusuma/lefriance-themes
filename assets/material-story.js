if (!customElements.get("material-story")) {
  customElements.define(
    "material-story",
    class extends HTMLElement {
      connectedCallback() {
        if (
          !window.ThemeMotion ||
          (this.controller && !this.controller.signal.aborted)
        )
          return;
        this.motionMedia?.revert();
        this.motionMedia = null;
        this.editorSelected = false;
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

        // Editor selection must expose all content, without disabling preview globally.
        const selectInEditor = (event) => {
          if (!event.target.contains(this) && !this.contains(event.target))
            return;
          this.editorSelected = true;
          this.motionMedia?.revert();
          this.motionMedia = null;
        };
        const deselectInEditor = (event) => {
          if (!event.target.contains(this) && !this.contains(event.target))
            return;
          this.editorSelected = false;
          this.queueMotion();
        };
        document.addEventListener("shopify:section:select", selectInEditor, {
          signal,
        });
        document.addEventListener("shopify:block:select", selectInEditor, {
          signal,
        });
        document.addEventListener(
          "shopify:section:deselect",
          deselectInEditor,
          { signal },
        );
        document.addEventListener("shopify:block:deselect", deselectInEditor, {
          signal,
        });

        this.classList.add("is-enhanced");
        this.querySelectorAll("[data-story-controls]").forEach((control) => {
          control.hidden = this.items.length === 0;
        });
        signal.addEventListener(
          "abort",
          () => {
            this.visibilityObserver?.disconnect();
            this.introObserver?.disconnect();
          },
          { once: true },
        );
        this.update(false).then(() => this.queueMotion());
      }

      queueMotion() {
        this.visibilityObserver?.disconnect();
        this.introObserver?.disconnect();
        this.introObserver = null;
        if (
          this.controller.signal.aborted ||
          this.editorSelected ||
          this.motionMedia ||
          this.dataset.scrollReveal !== "true" ||
          matchMedia("(prefers-reduced-motion: reduce)").matches
        )
          return;
        let near = !("IntersectionObserver" in window);
        const start = () => {
          if (!near || this.controller.signal.aborted || this.editorSelected)
            return;
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
          this.visibilityObserver?.disconnect();
          this.introObserver?.disconnect();
          this.introObserver = null;
          this.setupMotion();
        };
        if ("IntersectionObserver" in window) {
          this.visibilityObserver = new IntersectionObserver(
            (entries) => {
              near = entries.some((entry) => entry.isIntersecting);
              start();
            },
            { rootMargin: "0px 0px 25% 0px" },
          );
          this.visibilityObserver.observe(this);
        } else start();
      }

      async setupMotion() {
        const signal = this.controller.signal;
        if (
          this.dataset.scrollReveal !== "true" ||
          !this.items.length ||
          !this.swiper ||
          this.editorSelected ||
          this.motionMedia ||
          matchMedia("(prefers-reduced-motion: reduce)").matches
        )
          return;
        try {
          const { gsap, SplitText, ScrollTrigger } =
            await ThemeMotion.scrollAnimation();
          if (
            signal.aborted ||
            !this.isConnected ||
            this.editorSelected ||
            this.motionMedia
          )
            return;
          await document.fonts.ready;
          if (signal.aborted || this.editorSelected || this.motionMedia) return;
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
              desktop: "(min-width: 750px)",
              mobile: "(max-width: 749px)",
              reduced: "(prefers-reduced-motion: reduce)",
            },
            ({ conditions }) => {
              if (conditions.reduced) return;
              const pinScene = conditions.desktop;
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
                this.swiper?.update?.();
                let halfWidth = stories.offsetWidth / 2;
                let halfHeight = stories.offsetHeight / 2;
                const opening = { value: 0 };
                // quickSetter does not expand the compound scale alias for CSS targets.
                const setScaleX = gsap.quickSetter(stories, "scaleX");
                const setScaleY = gsap.quickSetter(stories, "scaleY");
                const setTop = gsap.quickSetter(line("top"), "y", "px");
                const setBottom = gsap.quickSetter(line("bottom"), "y", "px");
                const setLeft = gsap.quickSetter(line("left"), "x", "px");
                const setRight = gsap.quickSetter(line("right"), "x", "px");
                const paintOpening = () => {
                  const value = opening.value;
                  setScaleX(value);
                  setScaleY(value);
                  setTop(-halfHeight * value);
                  setBottom(halfHeight * value);
                  setLeft(-halfWidth * value);
                  setRight(halfWidth * value);
                };
                const finalItems = [
                  ...this.querySelectorAll(
                    ".material-story__filters button, .material-story__intro > *, .material-story__thumbnail, .material-story__aside-copy > *, .material-story__indicator",
                  ),
                ];
                const centerY = (element) =>
                  layout.offsetHeight / 2 -
                  element.offsetTop -
                  element.offsetHeight / 2;
                gsap.set(sides, { autoAlpha: 0 });
                gsap.set(finalItems, {
                  yPercent: 105,
                  autoAlpha: 0,
                  clipPath: "inset(100% 0 0 0)",
                });
                gsap.set(stories, { scale: 0, autoAlpha: 1 });
                gsap.set(
                  [line("top"), line("bottom"), line("left"), line("right")],
                  { x: 0, y: 0 },
                );
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
                    // CSS sticky reserves the scene in normal flow: no pin wrapper,
                    // reparenting, custom-element callbacks or pin refresh feedback.
                    end: "bottom bottom",
                    scrub: 1.2,
                    invalidateOnRefresh: true,
                    onRefresh: () => {
                      halfWidth = stories.offsetWidth / 2;
                      halfHeight = stories.offsetHeight / 2;
                      paintOpening();
                    },
                  },
                });
                timeline
                  .to(title, { progress: 1, duration: 2.2, ease: "none" }, 0)
                  .to(line("horizontal"), { scaleX: 0.896, duration: 1.2 }, 1.8)
                  .to(line("horizontal"), { scaleX: 1, duration: 0.8 }, 2.7)
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
                  .fromTo(
                    opening,
                    { value: 0 },
                    {
                      value: 0.25,
                      duration: 1,
                      immediateRender: false,
                      onUpdate: paintOpening,
                    },
                    3.5,
                  )
                  .to(heading, { y: 0, duration: 3 }, 3.5)
                  .to(footer, { y: 0, duration: 3 }, 3.5)
                  .fromTo(
                    opening,
                    { value: 0.25 },
                    {
                      value: 1,
                      duration: 2.6,
                      immediateRender: false,
                      onUpdate: paintOpening,
                    },
                    4.5,
                  )
                  .to(
                    layout,
                    { "--story-frame-opacity": 1, duration: 0.9 },
                    6.8,
                  )
                  .set(sides, { autoAlpha: 1 }, 7.4)
                  .to(
                    finalItems,
                    {
                      yPercent: 0,
                      autoAlpha: 1,
                      clipPath: "inset(0% 0 0 0)",
                      duration: 1.2,
                      stagger: { amount: 0.65 },
                      ease: "power3.out",
                    },
                    7.4,
                  )
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
              // Card/media geometry is reserved by CSS and image dimensions.
              // One initial refresh; ScrollTrigger handles viewport resizes itself.
              ScrollTrigger.refresh();
              ThemeMotion.pageScroll?.resize();
              return () => {
                document.removeEventListener("keydown", finishForKeyboard);
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
        } catch (error) {
          this.motionMedia?.revert();
          this.motionMedia = null;
          this.classList.remove("is-scroll-scene");
          console.warn(
            "Material story scroll animation could not initialize.",
            error,
          );
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
        this.motionMedia = null;
        this.controller?.abort();
        this.swiper?.destroy(true, true);
      }
    },
  );
}
