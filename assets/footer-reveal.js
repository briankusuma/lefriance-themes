if (!customElements.get("footer-reveal")) {
  customElements.define(
    "footer-reveal",
    class extends HTMLElement {
      connectedCallback() {
        if (this.controller && !this.controller.signal.aborted) return;
        this.controller = new AbortController();
        const { signal } = this.controller;
        const owns = (event) =>
          event.target.contains(this) || this.contains(event.target);
        for (const type of ["shopify:section:select", "shopify:block:select"]) {
          document.addEventListener(
            type,
            (event) => {
              if (!owns(event)) return;
              this.selected = true;
              this.media?.revert();
              this.media = null;
            },
            { signal },
          );
        }
        for (const type of [
          "shopify:section:deselect",
          "shopify:block:deselect",
        ]) {
          document.addEventListener(
            type,
            (event) => {
              if (!owns(event)) return;
              this.selected = false;
              this.queue();
            },
            { signal },
          );
        }
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
          this.controller.signal.aborted
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
          !window.ThemeMotion
        )
          return;
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const request = {};
        this.pending = request;
        try {
          const { gsap, ScrollTrigger, SplitText } =
            await ThemeMotion.scrollAnimation();
          await document.fonts.ready;
          if (signal.aborted || this.selected || !this.isConnected) return;
          const footer = this.closest(".editorial-footer");
          this.media = gsap.matchMedia();
          this.media.add(
            { reduced: "(prefers-reduced-motion: reduce)" },
            ({ conditions }) => {
              if (conditions.reduced) return;
              const items = [
                ...this.querySelectorAll(
                  ".editorial-footer__thumbnails > *, .editorial-footer__socials > *, .editorial-footer__social-copy, .editorial-footer__follow, .editorial-footer__navigation > nav, .editorial-footer__studio-copy",
                ),
              ];
              const gallery = this.querySelector(".editorial-footer__gallery");
              const newsletter = [
                ...this.querySelectorAll(
                  ".editorial-footer__brand-copy, .editorial-footer__form",
                ),
              ];
              const headings = [
                ...this.querySelectorAll(".editorial-footer__newsletter h2"),
              ];
              const split = headings.length
                ? SplitText.create(headings, {
                    type: "words,chars",
                    aria: "auto",
                    wordsClass: "footer-reveal-word",
                  })
                : null;
              const chars = split?.chars || [];
              const wordmark = this.querySelector(
                ".editorial-footer__wordmark",
              );
              const paths = [
                ...(wordmark?.querySelectorAll(
                  ".editorial-footer__wordmark-vector path",
                ) || []),
              ].sort((a, b) => b.getBBox().x - a.getBBox().x);
              const logo = paths.length
                ? paths
                : [...(wordmark?.querySelectorAll("img, p") || [])];
              footer.classList.add("is-motion-ready");
              gsap.set(footer, { "--footer-line-progress": 0 });
              gsap.set(items, { autoAlpha: 0, y: 32 });
              gsap.set(headings, { y: 24 });
              gsap.set(chars, { opacity: 0.25 });
              gsap.set(newsletter, { autoAlpha: 0, y: 32 });
              gsap.set(logo, { opacity: 0, yPercent: 110 });
              if (gallery)
                gsap.set(gallery, {
                  autoAlpha: 0,
                  y: 32,
                  clipPath: "inset(100% 0 0 0 round 8.528px)",
                });
              const timeline = gsap.timeline({
                defaults: { ease: "power3.out" },
                scrollTrigger: {
                  trigger: this,
                  start: "top 90%",
                  end: "bottom bottom",
                  scrub: 1.2,
                  invalidateOnRefresh: true,
                },
              });
              timeline
                .to(
                  footer,
                  {
                    "--footer-line-progress": 1,
                    duration: 1.4,
                    ease: "power2.inOut",
                  },
                  0,
                )
                .to(
                  items,
                  {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1.3,
                    stagger: { amount: 0.6 },
                  },
                  0.3,
                );
              if (gallery)
                timeline.to(
                  gallery,
                  {
                    autoAlpha: 1,
                    y: 0,
                    clipPath: "inset(0% 0 0 0 round 8.528px)",
                    duration: 1.8,
                  },
                  0.6,
                );
              timeline
                .to(headings, { y: 0, duration: 1.4 }, 1.5)
                .to(
                  chars,
                  {
                    opacity: 1,
                    duration: 1,
                    stagger: { amount: 1.2 },
                    ease: "none",
                  },
                  1.5,
                )
                .to(
                  newsletter,
                  {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1.4,
                    stagger: { amount: 0.25 },
                  },
                  1.8,
                )
                .to(
                  logo,
                  {
                    opacity: 1,
                    yPercent: 0,
                    duration: 1.8,
                    stagger: { amount: paths.length ? 1.1 : 0 },
                  },
                  3.2,
                )
                .to({}, { duration: 0.4 });
              // A focused newsletter or link must remain visible without scrolling.
              const showForFocus = () => {
                timeline.scrollTrigger.disable(false);
                timeline.progress(1);
              };
              this.addEventListener("focusin", showForFocus);
              ScrollTrigger.refresh();
              ThemeMotion.pageScroll?.resize();
              return () => {
                this.removeEventListener("focusin", showForFocus);
                timeline.scrollTrigger?.kill();
                timeline.kill();
                split?.revert();
                footer.classList.remove("is-motion-ready");
              };
            },
          );
        } catch (error) {
          this.media?.revert();
          this.media = null;
          this.closest(".editorial-footer")?.classList.remove(
            "is-motion-ready",
          );
          console.warn("Footer reveal could not initialize.", error);
        } finally {
          if (this.pending === request) this.pending = null;
        }
      }
      disconnectedCallback() {
        this.controller?.abort();
        this.media?.revert();
        this.media = null;
        this.pending = null;
        this.selected = false;
      }
    },
  );
}
