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
        this.toggle = this.querySelector("[data-footer-toggle]");
        this.autoEnabled =
          this.dataset.autoplay === "true" && !window.Shopify?.designMode;
        this.slides = [...this.querySelectorAll("[data-footer-slide]")];
        this.buttons = [...this.querySelectorAll("[data-footer-select]")];
        const controls = this.querySelector("[data-footer-controls]");
        if (controls) controls.hidden = this.slides.length < 2;
        this.addEventListener(
          "click",
          (event) => {
            if (event.target.closest("[data-footer-toggle]")) {
              this.paused = !this.paused;
              this.syncAutoplay();
              return;
            }
            const button = event.target.closest("[data-footer-select]");
            if (button) this.select(Number(button.dataset.footerSelect));
          },
          { signal },
        );
        this.addEventListener(
          "keydown",
          (event) => {
            const button = event.target.closest("[data-footer-select]");
            if (
              !button ||
              !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
            )
              return;
            let index = this.buttons.indexOf(button);
            const rtl = getComputedStyle(this).direction === "rtl";
            if (event.key === "Home") index = 0;
            else if (event.key === "End") index = this.slides.length - 1;
            else
              index =
                (index +
                  ((event.key === "ArrowRight") !== rtl ? 1 : -1) +
                  this.slides.length) %
                this.slides.length;
            event.preventDefault();
            this.select(index);
            this.buttons[index].focus();
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
            if (event.target.closest("[data-footer-toggle]")) return;
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
        if (this.toggle) {
          this.toggle.hidden = !enabled;
          this.toggle.setAttribute("aria-pressed", String(this.paused));
          this.toggle.textContent = this.paused
            ? this.dataset.playLabel
            : this.dataset.pauseLabel;
        }
        if (
          enabled &&
          this.visible &&
          !this.paused &&
          !this.hovered &&
          !document.hidden
        )
          this.swiper?.autoplay?.start();
        else this.swiper?.autoplay?.stop();
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
        this.buttons.forEach((button, i) =>
          button.setAttribute("aria-pressed", String(i === index)),
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
