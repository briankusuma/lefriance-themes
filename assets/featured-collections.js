if (!customElements.get("featured-collections")) {
  customElements.define(
    "featured-collections",
    class extends HTMLElement {
      async connectedCallback() {
        if (
          !window.ThemeMotion ||
          (this.controller && !this.controller.signal.aborted)
        )
          return;
        this.motionMedia?.revert();
        this.motionMedia = null;
        this.selected = false;
        this.controller?.abort();
        this.swipers?.forEach((swiper) => swiper?.destroy(true, true));
        this.swipers = new Map();
        this.controller = new AbortController();
        const { signal } = this.controller;
        this.tabs = [...this.querySelectorAll("[data-featured-tab]")];
        this.panels = [...this.querySelectorAll("[data-featured-panel]")];
        this.classList.add("is-enhanced");
        this.querySelector("[data-featured-tabs]").hidden =
          this.tabs.length < 2;
        this.panels.forEach((panel, index) => {
          panel.setAttribute("role", "tabpanel");
          panel.setAttribute("aria-labelledby", this.tabs[index].id);
          const rail = panel.querySelector("[data-featured-products]");
          panel.querySelector("[data-featured-arrows]").hidden = false;
        });
        this.addEventListener(
          "click",
          (event) => {
            const tab = event.target.closest("[data-featured-tab]");
            if (tab) this.select(Number(tab.dataset.featuredTab), true);
          },
          { signal },
        );
        this.addEventListener(
          "keydown",
          (event) => {
            const tab = event.target.closest("[data-featured-tab]");
            if (
              !tab ||
              !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
            )
              return;
            let index = this.tabs.indexOf(tab);
            const rtl = getComputedStyle(tab).direction === "rtl";
            if (event.key === "Home") index = 0;
            else if (event.key === "End") index = this.tabs.length - 1;
            else
              index =
                (index +
                  ((event.key === "ArrowRight") !== rtl ? 1 : -1) +
                  this.tabs.length) %
                this.tabs.length;
            event.preventDefault();
            this.select(index, true);
            this.tabs[index].focus();
          },
          { signal },
        );
        this.addEventListener(
          "shopify:block:select",
          (event) => {
            const index = this.panels.indexOf(
              event.target.closest("[data-featured-panel]"),
            );
            if (index >= 0) this.select(index, false);
          },
          { signal },
        );
        const owns = (event) =>
          event.target.contains(this) || this.contains(event.target);
        const selected = (event) => {
          if (!owns(event)) return;
          this.selected = true;
          this.motionMedia?.revert();
          this.motionMedia = null;
        };
        const deselected = (event) => {
          if (!owns(event)) return;
          this.selected = false;
          this.queueMotion();
        };
        for (const type of ["shopify:section:select", "shopify:block:select"])
          document.addEventListener(type, selected, { signal });
        for (const type of [
          "shopify:section:deselect",
          "shopify:block:deselect",
        ])
          document.addEventListener(type, deselected, { signal });
        signal.addEventListener(
          "abort",
          () => {
            this.observer?.disconnect();
            this.introObserver?.disconnect();
          },
          { once: true },
        );
        this.select(
          this.panels[Number(this.dataset.initialIndex)]
            ? Number(this.dataset.initialIndex)
            : 0,
          false,
        );
        await Promise.all(
          this.panels.map(async (panel) => {
            const rail = panel.querySelector("[data-featured-products]");
            const swiper = await ThemeMotion.create(
              rail,
              [...rail.querySelectorAll(".product-card")],
              {
                slidesPerView: 1,
                spaceBetween: 21,
                breakpoints: {
                  600: { slidesPerView: 2 },
                  990: { slidesPerView: 4 },
                },
                // Explicit tab updates + Swiper's ResizeObserver are sufficient.
                // Observing parent style mutations would update Swiper every animation frame.
                observer: false,
                observeParents: false,
                navigation: {
                  prevEl: panel.querySelector("[data-featured-previous]"),
                  nextEl: panel.querySelector("[data-featured-next]"),
                },
              },
            );
            if (signal.aborted) {
              swiper?.destroy(true, true);
              return;
            }
            this.swipers.set(panel, swiper);
          }),
        );
        if (signal.aborted) return;
        this.updateArrows();
        this.queueMotion();
      }

      queueMotion() {
        this.observer?.disconnect();
        this.introObserver?.disconnect();
        this.introObserver = null;
        if (
          this.dataset.scrollReveal !== "true" ||
          this.selected ||
          this.motionMedia ||
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
          this.setupMotion();
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

      async setupMotion() {
        const signal = this.controller.signal;
        if (
          this.motionPending ||
          this.motionMedia ||
          this.selected ||
          signal.aborted ||
          matchMedia("(prefers-reduced-motion: reduce)").matches
        )
          return;
        const request = {};
        this.motionPending = request;
        try {
          const { gsap, ScrollTrigger } = await ThemeMotion.scrollAnimation({
            splitText: false,
          });
          await document.fonts.ready;
          if (signal.aborted || this.selected || !this.isConnected) return;
          const layout = this.querySelector(".featured-collections__layout");
          const active = this.panels.find((panel) => !panel.hidden);
          if (!active?.querySelector(".product-card")) return;
          const tabs = this.querySelector("[data-featured-tabs]");
          const intros = this.panels.flatMap((panel) => [
            ...panel.querySelectorAll(
              ".featured-collections__brand, .featured-collections__intro h2",
            ),
          ]);
          const details = this.panels.flatMap((panel) => [
            ...panel.querySelectorAll(".featured-collections__details > *"),
          ]);
          const links = this.panels.flatMap((panel) => [
            ...panel.querySelectorAll(".featured-collections__view a"),
          ]);
          const rails = this.panels.map((panel) =>
            panel.querySelector("[data-featured-products]"),
          );
          const cards = this.panels.flatMap((panel) => [
            ...panel.querySelectorAll(".product-card"),
          ]);
          this.motionMedia = gsap.matchMedia();
          this.motionMedia.add(
            {
              desktop: "(min-width: 990px) and (min-height: 500px)",
              reduced: "(prefers-reduced-motion: reduce)",
            },
            ({ conditions }) => {
              if (!conditions.desktop || conditions.reduced) return;
              this.classList.add("is-scroll-scene");
              this.swipers.forEach((swiper) => swiper?.update());
              const bounds = [
                active.querySelector(".featured-collections__intro"),
                active.querySelector(".featured-collections__details"),
                active.querySelector("[data-featured-products]"),
              ];
              if (
                bounds.some(
                  (element) =>
                    element?.clientHeight > 0 &&
                    element.scrollHeight > element.clientHeight + 4,
                )
              ) {
                this.classList.remove("is-scroll-scene");
                return;
              }
              const line = (name) =>
                layout.querySelector(`[data-featured-line="${name}"]`);
              const horizontal = line("horizontal"),
                center = line("center"),
                left = line("left"),
                right = line("right");
              const tabItems = [...this.tabs, ...links];
              gsap.set(horizontal, { scaleX: 0, y: 0 });
              gsap.set(center, { scaleY: 0 });
              gsap.set([left, right], { x: 0, scaleY: 1, autoAlpha: 0 });
              gsap.set(intros, { autoAlpha: 0, y: -30 });
              gsap.set(details, { autoAlpha: 0, y: 55 });
              gsap.set(tabItems, { autoAlpha: 0, y: 24 });
              gsap.set(rails, { autoAlpha: 0 });
              gsap.set(cards, {
                autoAlpha: 0,
                x: (index) =>
                  ((index % 4 < 2 ? -230 : 200) * layout.clientWidth) / 1432,
              });
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
                .to(horizontal, { scaleX: 1, duration: 1.2 }, 0.2)
                .to(center, { scaleY: 1, duration: 1.2 }, 0.5)
                .set([left, right], { autoAlpha: 1 }, 1.8)
                .fromTo(
                  left,
                  { x: 0 },
                  {
                    x: () => -layout.clientWidth / 6,
                    immediateRender: false,
                    duration: 1.2,
                  },
                  1.8,
                )
                .fromTo(
                  right,
                  { x: 0 },
                  {
                    x: () => layout.clientWidth / 6,
                    immediateRender: false,
                    duration: 1.2,
                  },
                  1.8,
                )
                .fromTo(
                  left,
                  { x: () => -layout.clientWidth / 6 },
                  {
                    x: () => -layout.clientWidth / 2 - 17,
                    immediateRender: false,
                    duration: 1.5,
                  },
                  3,
                )
                .fromTo(
                  right,
                  { x: () => layout.clientWidth / 6 },
                  {
                    x: () => layout.clientWidth / 2 + 17,
                    immediateRender: false,
                    duration: 1.5,
                  },
                  3,
                )
                .to(
                  horizontal,
                  { y: () => -layout.clientHeight / 2 + 25, duration: 1.2 },
                  1.8,
                )
                .fromTo(
                  horizontal,
                  { y: () => -layout.clientHeight / 2 + 25 },
                  {
                    y: () => {
                      const intro = this.panels
                        .find((panel) => !panel.hidden)
                        ?.querySelector(".featured-collections__intro");
                      return intro
                        ? intro.offsetTop +
                            intro.offsetHeight -
                            layout.clientHeight / 2
                        : -layout.clientHeight * 0.3;
                    },
                    duration: 1.2,
                    immediateRender: false,
                  },
                  4.4,
                )
                .to(
                  intros,
                  {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1.2,
                    stagger: { amount: 0.2 },
                    ease: "power3.out",
                  },
                  4.4,
                )
                .to(
                  details,
                  {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1.2,
                    stagger: { amount: 0.2 },
                    ease: "power3.out",
                  },
                  4.6,
                )
                .to(
                  tabItems,
                  {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1.1,
                    stagger: { amount: 0.25 },
                    ease: "power3.out",
                  },
                  5.1,
                )
                .set(rails, { autoAlpha: 1 }, 5.3)
                .to(cards, { autoAlpha: 1, duration: 0.6 }, 5.3)
                .to(
                  cards,
                  { x: 0, duration: 2.2, stagger: { amount: 0.2 } },
                  5.3,
                )
                .to({}, { duration: 0.8 });
              let previousLock;
              const access = () => {
                const locked = timeline.time() < 7.7;
                if (locked === previousLock) return;
                previousLock = locked;
                tabs.inert = locked;
                this.panels.forEach((panel) => {
                  panel.inert = locked;
                });
              };
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
                tabs.inert = false;
                this.panels.forEach((panel) => {
                  panel.inert = false;
                });
                this.swipers.forEach((swiper) => swiper?.update());
                ThemeMotion.pageScroll?.resize();
              };
            },
          );
        } catch (error) {
          this.motionMedia?.revert();
          this.motionMedia = null;
          this.classList.remove("is-scroll-scene");
          console.warn(
            "Featured collection animation could not initialize.",
            error,
          );
        } finally {
          if (this.motionPending === request) this.motionPending = null;
        }
      }

      select(index, announce) {
        this.panels.forEach((panel, position) => {
          panel.hidden = position !== index;
        });
        this.tabs.forEach((tab, position) => {
          tab.setAttribute("aria-selected", String(position === index));
          tab.tabIndex = position === index ? 0 : -1;
        });
        if (announce)
          this.querySelector("[data-featured-status]").textContent =
            this.tabs[index]?.textContent || "";
        this.updateArrows();
      }

      updateArrows() {
        const panel = this.panels.find((item) => !item.hidden);
        if (!panel) return;
        const swiper = this.swipers.get(panel);
        swiper?.update();
        panel.querySelector("[data-featured-previous]").disabled =
          !swiper || swiper.isBeginning || swiper.isLocked;
        panel.querySelector("[data-featured-next]").disabled =
          !swiper || swiper.isEnd || swiper.isLocked;
      }

      disconnectedCallback() {
        this.controller?.abort();
        this.motionMedia?.revert();
        this.motionMedia = null;
        this.motionPending = null;
        this.swipers?.forEach((swiper) => swiper?.destroy(true, true));
      }
    },
  );
}
