if (!customElements.get("footer-gallery")) {
  customElements.define(
    "footer-gallery",
    class extends HTMLElement {
      async connectedCallback() {
        if (!window.ThemeMotion) return;
        if (this.controller && !this.controller.signal.aborted) return;
        this.controller?.abort();
        this.swiper?.destroy(true, true);
        this.controller = new AbortController();
        const { signal } = this.controller;
        this.reduced = matchMedia("(prefers-reduced-motion: reduce)");
        this.paused = false;
        this.visible = false;
        this.hovered = false;
        this.autoEnabled = this.dataset.autoplay === "true";
        this.slides = [...this.querySelectorAll("[data-footer-slide]")];
        this.indicators = [...this.querySelectorAll("[data-footer-indicator]")];
        const controls = this.querySelector("[data-footer-controls]");
        if (controls) controls.hidden = this.slides.length < 2;
        this.addEventListener(
          "keydown",
          (event) => {
            if (event.target !== this || event.code !== "Space") return;
            event.preventDefault();
            this.paused = !this.paused;
            this.syncAutoplay();
          },
          { signal },
        );
        this.addEventListener(
          "shopify:block:select",
          (event) => {
            this.paused = true;
            this.syncAutoplay();
            const index = this.slides.indexOf(
              event.target.closest("[data-footer-slide]"),
            );
            if (index >= 0) this.select(index);
          },
          { signal },
        );
        const swiper = await ThemeMotion.create(this, this.slides, {
          slidesPerView: 1,
          effect: "fade",
          fadeEffect: { crossFade: true },
          rewind: true,
          autoplay: {
            enabled: false,
            delay: 5000,
            disableOnInteraction: false,
          },
          observer: false,
          observeParents: false,
          on: { slideChange: (swiper) => this.paint(swiper.realIndex) },
        });
        if (signal.aborted) {
          swiper?.destroy(true, true);
          return;
        }
        this.swiper = swiper;
        if (!swiper) {
          if (controls) controls.hidden = true;
          return;
        }
        this.select(0);
        this.addEventListener(
          "pointerenter",
          () => {
            this.hovered = true;
            this.syncAutoplay();
          },
          { signal },
        );
        this.addEventListener(
          "pointerleave",
          () => {
            this.hovered = false;
            this.syncAutoplay();
          },
          { signal },
        );
        this.addEventListener(
          "focusin",
          (event) => {
            this.paused = true;
            this.syncAutoplay();
          },
          { signal },
        );
        this.reduced.addEventListener("change", () => this.syncAutoplay(), {
          signal,
        });
        document.addEventListener(
          "visibilitychange",
          () => this.syncAutoplay(),
          { signal },
        );
        if ("IntersectionObserver" in window) {
          this.visibilityObserver = new IntersectionObserver((entries) => {
            this.visible = entries.some((entry) => entry.isIntersecting);
            this.syncAutoplay();
          });
          this.visibilityObserver.observe(this);
          signal.addEventListener(
            "abort",
            () => this.visibilityObserver.disconnect(),
            { once: true },
          );
        } else this.visible = true;
        this.syncAutoplay();
      }
      syncAutoplay() {
        const enabled =
          this.autoEnabled && this.slides.length > 1 && !this.reduced.matches;
        if (
          enabled &&
          this.visible &&
          !this.paused &&
          !this.hovered &&
          !document.hidden
        ) {
          if (!this.swiper?.autoplay?.running) this.swiper?.autoplay?.start();
        } else if (this.swiper?.autoplay?.running) this.swiper.autoplay.stop();
      }
      select(index) {
        this.swiper?.slideTo(index, ThemeMotion.speed);
        this.paint(index);
      }
      paint(index) {
        this.slides.forEach((slide, i) => {
          slide.inert = i !== index;
          slide.setAttribute("aria-hidden", String(i !== index));
        });
        this.indicators.forEach(
          (indicator, i) => (indicator.dataset.active = String(i === index)),
        );
      }
      disconnectedCallback() {
        this.controller?.abort();
        this.swiper?.destroy(true, true);
        this.swiper = null;
      }
    },
  );
}
