if (!customElements.get("journal-stories")) {
  customElements.define(
    "journal-stories",
    class extends HTMLElement {
      connectedCallback() {
        this.controller?.abort();
        this.observer?.disconnect();
        this.controller = new AbortController();
        const { signal } = this.controller;
        this.rail = this.querySelector("[data-journal-rail]");
        this.cards = [...this.querySelectorAll("[data-journal-card]")];
        this.numbers = [...this.querySelectorAll("[data-journal-select]")];
        this.classList.add("is-enhanced");
        this.querySelectorAll("[data-journal-controls]").forEach((control) => {
          control.hidden = this.cards.length < 2;
        });
        this.addEventListener(
          "click",
          (event) => {
            const number = event.target.closest("[data-journal-select]");
            if (number) this.select(Number(number.dataset.journalSelect), true);
            if (event.target.closest("[data-journal-previous]")) this.move(-1);
            if (event.target.closest("[data-journal-next]")) this.move(1);
          },
          { signal },
        );
        this.addEventListener(
          "keydown",
          (event) => {
            const number = event.target.closest("[data-journal-select]");
            if (
              !number ||
              !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
            )
              return;
            const rtl = getComputedStyle(this).direction === "rtl";
            let index = this.numbers.indexOf(number);
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
        this.rail.addEventListener(
          "scroll",
          () => {
            this.update();
            clearTimeout(this.scrollTimer);
            this.scrollTimer = setTimeout(() => {
              const bounds = this.rail.getBoundingClientRect();
              const center = bounds.left + bounds.width / 2;
              let nearest = 0;
              this.cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const current = this.cards[nearest].getBoundingClientRect();
                if (
                  Math.abs(rect.left + rect.width / 2 - center) <
                  Math.abs(current.left + current.width / 2 - center)
                )
                  nearest = index;
              });
              this.numbers.forEach((number, index) =>
                number.setAttribute("aria-pressed", String(index === nearest)),
              );
            }, 120);
          },
          { signal, passive: true },
        );
        this.observer = new ResizeObserver(() => this.update());
        this.observer.observe(this.rail);
        this.select(
          this.cards[Number(this.dataset.initialIndex)]
            ? Number(this.dataset.initialIndex)
            : 0,
          false,
        );
      }
      select(index, announce) {
        if (!this.cards[index]) return;
        this.numbers.forEach((number, i) =>
          number.setAttribute("aria-pressed", String(i === index)),
        );
        const railRect = this.rail.getBoundingClientRect();
        const cardRect = this.cards[index].getBoundingClientRect();
        this.rail.scrollBy({
          left:
            cardRect.left -
            railRect.left -
            (railRect.width - cardRect.width) / 2,
          behavior:
            announce && !matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "smooth"
              : "instant",
        });
        if (announce)
          this.querySelector("[data-journal-status]").textContent =
            this.cards[index].querySelector("h3").textContent;
        this.update();
      }
      move(direction) {
        const rtl = getComputedStyle(this.rail).direction === "rtl";
        this.rail.scrollBy({
          left: direction * (rtl ? -1 : 1) * this.rail.clientWidth,
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
        });
      }
      update() {
        const position = Math.abs(this.rail.scrollLeft);
        this.querySelector("[data-journal-previous]").disabled = position < 2;
        this.querySelector("[data-journal-next]").disabled =
          position >= this.rail.scrollWidth - this.rail.clientWidth - 2;
      }
      disconnectedCallback() {
        this.controller?.abort();
        this.observer?.disconnect();
        clearTimeout(this.scrollTimer);
      }
    },
  );
}
