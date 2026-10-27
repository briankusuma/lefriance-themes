if (!customElements.get("footer-gallery")) {
  customElements.define(
    "footer-gallery",
    class extends HTMLElement {
      async connectedCallback() {
        if (!window.ThemeMotion) return;
        this.controller?.abort();
        this.swiper?.destroy(true, true);
        this.controller = new AbortController();
        const { signal } = this.controller;
        this.slides = [...this.querySelectorAll("[data-footer-slide]")];
        this.buttons = [...this.querySelectorAll("[data-footer-select]")];
        const controls = this.querySelector("[data-footer-controls]");
        if (controls) controls.hidden = this.slides.length < 2;
        this.addEventListener(
          "click",
          (event) => {
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
      }
    },
  );
}
