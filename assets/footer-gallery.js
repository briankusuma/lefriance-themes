if (!customElements.get("footer-gallery")) {
  customElements.define(
    "footer-gallery",
    class extends HTMLElement {
      connectedCallback() {
        this.controller?.abort();
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
        this.select(0);
      }
      select(index) {
        this.slides.forEach((slide, i) => {
          slide.hidden = i !== index;
        });
        this.buttons.forEach((button, i) =>
          button.setAttribute("aria-pressed", String(i === index)),
        );
      }
      disconnectedCallback() {
        this.controller?.abort();
      }
    },
  );
}
