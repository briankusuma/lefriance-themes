if (!customElements.get("journal-stories")) {
  customElements.define(
    "journal-stories",
    class extends HTMLElement {
      async connectedCallback() {
        this.controller?.abort();
        this.swiper?.destroy(true, true);
        this.controller = new AbortController();
        const { signal } = this.controller;
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
        this.swiper?.destroy(true, true);
        this.classList.remove("is-enhanced");
      }
    },
  );
}
