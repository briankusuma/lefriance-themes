if (!customElements.get("journal-stories")) {
  customElements.define(
    "journal-stories",
    class extends HTMLElement {
      async connectedCallback() {
        if (this.controller && !this.controller.signal.aborted) return;
        this.motionMedia?.revert();
        this.motionMedia = null;
        this.selected = false;
        this.controller?.abort();
        this.swiper?.destroy(true, true);
        this.controller = new AbortController();
        const { signal } = this.controller;
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
        this.cards = [...this.querySelectorAll("[data-journal-card]")];
        this.numbers = [...this.querySelectorAll("[data-journal-select]")];
        this.rail = this.querySelector("[data-journal-rail]");
        this.cards.forEach((card, index) => (card.dataset.storyIndex = index));
        if (!this.cards.length || !window.ThemeMotion) return;
        this.classList.add("is-enhanced");
        const initial = this.cards[Number(this.dataset.initialIndex)]
          ? Number(this.dataset.initialIndex)
          : 0;
        const paint = (swiper) => {
          this.activeIndex = swiper.realIndex;
          this.cards.forEach((card, index) => {
            const active = index === this.activeIndex;
            card.classList.toggle("is-active", active);
            for (const [selector, visible] of [
              [".journal-stories__text", active],
              [".journal-stories__image", !active],
            ]) {
              const view = card.querySelector(selector);
              view.inert = !visible;
              view.setAttribute("aria-hidden", String(!visible));
            }
          });
          this.numbers.forEach((button, index) =>
            button.setAttribute(
              "aria-pressed",
              String(index === this.activeIndex),
            ),
          );
        };
        const swiper = await ThemeMotion.create(this.rail, this.cards, {
          initialSlide: initial,
          centeredSlides: true,
          loop: this.cards.length >= 3,
          rewind: this.cards.length === 2,
          loopAddBlankSlides: false,
          slidesPerView: this.cards.length >= 4 ? 1.15 : 1,
          spaceBetween: 21,
          observer: false,
          observeParents: false,
          breakpoints: {
            600: { slidesPerView: this.cards.length >= 4 ? 1.7 : 1 },
            990: { slidesPerView: this.cards.length >= 5 ? 3 : 1 },
          },
          navigation: {
            prevEl: this.querySelector("[data-journal-previous]"),
            nextEl: this.querySelector("[data-journal-next]"),
          },
          on: { init: paint, realIndexChange: paint },
        });
        if (signal.aborted) {
          swiper?.destroy(true, true);
          return;
        }
        this.swiper = swiper;
        if (!swiper) {
          this.classList.remove("is-enhanced");
          return;
        }
        paint(swiper);
        this.querySelectorAll("[data-journal-controls]").forEach(
          (control) => (control.hidden = this.cards.length < 2),
        );
        this.addEventListener(
          "click",
          (event) => {
            const number = event.target.closest("[data-journal-select]");
            if (number) this.select(Number(number.dataset.journalSelect), true);
          },
          { signal },
        );
        this.addEventListener(
          "keydown",
          (event) => {
            const button = event.target.closest("[data-journal-select]");
            if (
              !button ||
              !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
            )
              return;
            const rtl = getComputedStyle(this).direction === "rtl";
            let index = this.numbers.indexOf(button);
            if (event.key === "Home") index = 0;
            else if (event.key === "End") index = this.cards.length - 1;
            else
              index =
                (index +
                  ((event.key === "ArrowRight") !== rtl ? 1 : -1) +
                  this.cards.length) %
                this.cards.length;
            event.preventDefault();
            this.select(index, true);
            this.numbers[index].focus();
          },
          { signal },
        );
        this.addEventListener(
          "shopify:block:select",
          (event) => {
            const index = this.cards.indexOf(
              event.target.closest("[data-journal-card]"),
            );
            if (index >= 0) this.select(index, false);
          },
          { signal },
        );
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
          !this.swiper
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
          signal.aborted
        )
          return;
        const request = {};
        this.motionPending = request;
        try {
          const { gsap, ScrollTrigger } = await ThemeMotion.scrollAnimation({
            splitText: false,
          });
          await document.fonts.ready;
          if (
            signal.aborted ||
            this.selected ||
            !this.isConnected ||
            this.cards.length < 5
          )
            return;
          const stage = this.querySelector(".journal-stories__stage");
          const plane = this.querySelector(".journal-stories__motion-plane");
          const band = this.querySelector(".journal-stories__motion-band");
          const grid = this.querySelector(".journal-stories__motion-grid");
          const line = (name) =>
            grid.querySelector(`[data-journal-line="${name}"]`);
          const topLine = line("top"),
            bottomLine = line("bottom");
          const sideLines = [line("left"), line("right")];
          const studio = this.querySelector(".journal-stories__studio");
          const heading = this.querySelector(".journal-stories__heading");
          const copy = [...heading.children];
          const tags = [...studio.children].filter(
            (node) => !node.classList.contains("journal-stories__numbers"),
          );
          const captions = this.cards.map((card) =>
            card.querySelector(".journal-stories__caption"),
          );
          const arrows = [...this.querySelectorAll(".journal-stories__arrow")];
          const numbers = this.querySelector(".journal-stories__numbers");
          this.motionMedia = gsap.matchMedia();
          this.motionMedia.add(
            {
              desktop: "(min-width: 990px) and (min-height: 700px)",
              reduced: "(prefers-reduced-motion: reduce)",
            },
            ({ conditions }) => {
              if (!conditions.desktop || conditions.reduced) return;
              this.classList.add("is-scroll-scene");
              this.swiper.update();
              const carousel = this.querySelector(".journal-stories__carousel");
              if (
                [studio, heading, carousel].some(
                  (node) => node.scrollHeight > node.clientHeight + 4,
                )
              ) {
                this.classList.remove("is-scroll-scene");
                this.swiper.update();
                return;
              }
              // Read final geometry once per refresh, never inside a scroll update.
              let geometry;
              const measure = () => {
                const rect = (node) => {
                  const box = node.getBoundingClientRect();
                  return {
                    left: box.left - (Number(gsap.getProperty(node, "x")) || 0),
                    top: box.top - (Number(gsap.getProperty(node, "y")) || 0),
                    width: node.offsetWidth,
                    height: node.offsetHeight,
                  };
                };
                const base = stage.getBoundingClientRect();
                const buttons = this.numbers.map(rect);
                const size = buttons[0].width;
                const total =
                  this.numbers.length * size + (this.numbers.length - 1) * 10;
                const card = rect(
                  this.cards.find((item) =>
                    item.classList.contains("is-active"),
                  ) || this.cards[0],
                );
                const body = this.cards[0].querySelector(
                  ".journal-stories__body",
                );
                const bodyBox = body.getBoundingClientRect();
                geometry = {
                  base,
                  buttons,
                  size,
                  total,
                  card,
                  bodyTop:
                    bodyBox.top -
                    (Number(gsap.getProperty(this.cards[0], "y")) || 0),
                  width: stage.offsetWidth,
                  height: stage.offsetHeight,
                };
              };
              measure();
              const brown = getComputedStyle(plane).backgroundColor;
              const white = getComputedStyle(plane).color;
              const muted = getComputedStyle(this.numbers[0]).color;
              gsap.set(stage, { "--journal-motion-background": brown });
              this.classList.add("is-journal-opening");
              gsap.set(plane, {
                autoAlpha: 1,
                x: 0,
                y: 0,
                width: () => geometry.width,
                height: () => geometry.height,
                borderRadius: "10.66px",
                transformOrigin: "0 0",
              });
              gsap.set(this.numbers, {
                x: (i) =>
                  geometry.base.left +
                  (geometry.width - geometry.total) / 2 +
                  i * (geometry.size + 10) -
                  geometry.buttons[i].left,
                y: (i) =>
                  geometry.base.top +
                  (geometry.height - geometry.size) / 2 -
                  geometry.buttons[i].top,
                "--journal-fill": 0,
              });
              gsap.set(this.numbers[0], {
                "--journal-fill": 1,
                "--journal-ink": white,
              });
              gsap.set(tags, { autoAlpha: 0, y: 24 });
              gsap.set(copy, {
                autoAlpha: 0,
                y: 60,
                clipPath: "inset(100% 0 0 0)",
              });
              gsap.set([topLine, bottomLine], { scaleX: 0 });
              gsap.set(sideLines, { scaleY: 0 });
              gsap.set([this.rail, band, ...arrows], { autoAlpha: 0 });
              gsap.set(captions, { opacity: 0 });
              gsap.set(band, {
                x: () => studio.offsetLeft,
                y: () =>
                  geometry.bodyTop -
                  geometry.base.top +
                  geometry.card.width / 2,
                width: () => studio.clientWidth,
                height: 0,
                transformOrigin: "center",
              });
              // Swiper owns card positions and its 21px gaps throughout the
              // reveal. Translating loop slides pulls offscreen cards into view.
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
                .to(
                  plane,
                  {
                    width: () => geometry.width * 0.975,
                    height: () => geometry.height * 0.927,
                    x: () => geometry.width * 0.0125,
                    y: () => geometry.height * 0.0365,
                    duration: 1.2,
                    ease: "power3.inOut",
                  },
                  0.2,
                )
                .to(
                  plane,
                  {
                    width: () => geometry.size,
                    height: () => geometry.size,
                    x: () => (geometry.width - geometry.total) / 2,
                    y: () => (geometry.height - geometry.size) / 2,
                    duration: 2,
                    ease: "power3.inOut",
                  },
                  1.4,
                )
                .set(
                  this.numbers[0],
                  { "--journal-fill": 1, "--journal-ink": white },
                  3.4,
                )
                .set(plane, { autoAlpha: 0 }, 3.4);
              this.numbers.slice(1).forEach((button, index) => {
                timeline.to(
                  button,
                  {
                    "--journal-fill": 1,
                    "--journal-ink": white,
                    duration: 0.65,
                  },
                  3.6 + index * 0.55,
                );
              });
              const filled = 3.6 + (this.numbers.length - 1) * 0.55 + 0.65;
              timeline
                .to(
                  this.numbers,
                  {
                    y: (i) =>
                      geometry.base.top +
                      geometry.height * 0.18 -
                      geometry.buttons[i].top,
                    duration: 1.5,
                  },
                  filled,
                )
                .to(topLine, { scaleX: 1, duration: 1.5 }, filled + 1)
                .to(bottomLine, { scaleX: 1, duration: 1.6 }, filled + 5.5)
                .to(sideLines, { scaleY: 1, duration: 1.5 }, filled + 7.1)
                .to(
                  this.numbers,
                  { x: 0, y: 0, duration: 1.8, stagger: { amount: 0.2 } },
                  filled + 2.8,
                )
                .to(
                  this.numbers,
                  {
                    "--journal-fill": (index) =>
                      index === this.activeIndex ? 1 : 0,
                    "--journal-ink": (index) =>
                      index === this.activeIndex ? white : muted,
                    duration: 0.8,
                  },
                  filled + 2.8,
                )
                .to(
                  tags,
                  {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1.4,
                    stagger: { amount: 0.25 },
                  },
                  filled + 4.2,
                )
                .to(
                  copy,
                  {
                    autoAlpha: 1,
                    y: 0,
                    clipPath: "inset(0% 0 0 0)",
                    duration: 1.6,
                    stagger: 0.25,
                  },
                  filled + 5.5,
                )
                .to(
                  band,
                  {
                    autoAlpha: 1,
                    height: () => geometry.card.width,
                    y: () => geometry.bodyTop - geometry.base.top,
                    duration: 1.6,
                    ease: "power3.out",
                  },
                  filled + 5.5,
                )
                .to(
                  band,
                  {
                    // Figma 3776:1588: 40px of brown around the three cards.
                    width: () => this.rail.clientWidth + 80,
                    height: () => geometry.card.width + 80,
                    x: () =>
                      geometry.card.left +
                      geometry.card.width / 2 -
                      this.rail.clientWidth / 2 -
                      40 -
                      geometry.base.left,
                    y: () => geometry.bodyTop - geometry.base.top - 40,
                    duration: 1,
                    ease: "power3.inOut",
                  },
                  filled + 7.4,
                )
                .to(this.rail, { autoAlpha: 1, duration: 0.8 }, filled + 8.4)
                .to(
                  band,
                  {
                    width: () => geometry.card.width,
                    x: () => geometry.card.left - geometry.base.left,
                    height: () => geometry.card.width,
                    y: () => geometry.bodyTop - geometry.base.top,
                    duration: 2.2,
                    ease: "power3.inOut",
                  },
                  filled + 9.4,
                )
                .to(band, { autoAlpha: 0, duration: 0.6 }, filled + 11.7)
                .to(
                  captions,
                  { opacity: 1, duration: 1.2, stagger: { amount: 0.25 } },
                  filled + 12.4,
                )
                .to(arrows, { autoAlpha: 1, duration: 1.2 }, filled + 12.4)
                .to({}, { duration: 0.8 });
              let wasLocked;
              const access = () => {
                const locked = timeline.time() < filled + 13.9;
                if (locked === wasLocked) return;
                wasLocked = locked;
                this.classList.toggle("is-journal-opening", locked);
                numbers.inert = locked;
                carousel.inert = locked;
                this.swiper.allowTouchMove = !locked;
              };
              timeline.eventCallback("onUpdate", access);
              access();
              const keyboard = (event) => {
                if (event.key !== "Tab" || !timeline.scrollTrigger.isActive)
                  return;
                timeline.progress(1);
                const end = timeline.scrollTrigger.end;
                if (ThemeMotion.pageScroll)
                  ThemeMotion.pageScroll.scrollTo(end, { immediate: true });
                else timeline.scrollTrigger.scroll(end);
              };
              document.addEventListener("keydown", keyboard);
              ScrollTrigger.addEventListener("refreshInit", measure);
              ScrollTrigger.refresh();
              ThemeMotion.pageScroll?.resize();
              return () => {
                document.removeEventListener("keydown", keyboard);
                ScrollTrigger.removeEventListener("refreshInit", measure);
                timeline.scrollTrigger?.kill();
                timeline.kill();
                this.classList.remove("is-scroll-scene", "is-journal-opening");
                numbers.inert = false;
                carousel.inert = false;
                this.swiper.allowTouchMove = true;
                this.swiper.update();
                ThemeMotion.pageScroll?.resize();
              };
            },
          );
        } catch (error) {
          this.motionMedia?.revert();
          this.motionMedia = null;
          this.classList.remove("is-scroll-scene", "is-journal-opening");
          console.warn("Journal animation could not initialize.", error);
        } finally {
          if (this.motionPending === request) this.motionPending = null;
        }
      }

      select(index, announce) {
        if (!this.swiper || !this.cards[index]) return;
        const speed = announce ? ThemeMotion.speed : 0;
        if (this.swiper.params.loop) this.swiper.slideToLoop(index, speed);
        else this.swiper.slideTo(index, speed);
        if (announce)
          this.querySelector("[data-journal-status]").textContent =
            this.cards[index].querySelector("h3").textContent;
      }
      disconnectedCallback() {
        this.controller?.abort();
        this.motionMedia?.revert();
        this.motionMedia = null;
        this.motionPending = null;
        this.swiper?.destroy(true, true);
        this.swiper = null;
        this.classList.remove("is-enhanced");
      }
    },
  );
}
