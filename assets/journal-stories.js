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
        this.rail
          .querySelectorAll("[data-journal-clone]")
          .forEach((card) => card.remove());
        this.cards = [...this.querySelectorAll("[data-journal-card]")];
        this.cards.forEach((card, index) => (card.dataset.storyIndex = index));
        if (this.cards.length > 1) {
          for (const position of ["before", "after"]) {
            const fragment = document.createDocumentFragment();
            this.cards.forEach((card) => {
              const clone = card.cloneNode(true);
              clone.dataset.journalClone = "";
              clone.removeAttribute("data-journal-card");
              clone.removeAttribute("data-shopify-editor-block");
              clone.removeAttribute("id");
              clone
                .querySelectorAll("[id]")
                .forEach((element) => element.removeAttribute("id"));
              clone.setAttribute("aria-hidden", "true");
              clone.inert = true;
              fragment.append(clone);
            });
            if (position === "before") this.rail.prepend(fragment);
            else this.rail.append(fragment);
          }
        }
        this.slides = [...this.rail.querySelectorAll("[data-story-index]")];
        this.railWidth = null;
        this.numbers = [...this.querySelectorAll("[data-journal-select]")];
        this.activeIndex = this.cards[Number(this.dataset.initialIndex)]
          ? Number(this.dataset.initialIndex)
          : 0;
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
            if (this.resizing) return;
            this.update();
            clearTimeout(this.scrollTimer);
            this.scrollTimer = setTimeout(() => {
              const bounds = this.rail.getBoundingClientRect();
              const center = bounds.left + bounds.width / 2;
              let nearest = 0;
              this.slides.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const current = this.slides[nearest].getBoundingClientRect();
                if (
                  Math.abs(rect.left + rect.width / 2 - center) <
                  Math.abs(current.left + current.width / 2 - center)
                )
                  nearest = index;
              });
              this.select(
                Number(this.slides[nearest].dataset.storyIndex),
                false,
              );
            }, 120);
          },
          { signal, passive: true },
        );
        this.observer = new ResizeObserver(() => this.resize());
        this.observer.observe(this.rail);
        this.resize();
      }
      resize() {
        const width = this.rail.clientWidth;
        if (width === this.railWidth) return;
        this.railWidth = width;
        clearTimeout(this.scrollTimer);
        cancelAnimationFrame(this.resizeFrame);
        clearTimeout(this.resizeTimer);
        const index = this.activeIndex;
        this.resizing = true;
        const gap = parseFloat(getComputedStyle(this.rail).columnGap) || 0;
        const size = matchMedia("(min-width: 990px)").matches
          ? (width - gap * 2) / 3
          : width * 0.85;
        this.rail.style.setProperty("--journal-card-size", `${size}px`);
        this.rail.style.setProperty(
          "--journal-edge",
          `${(width - size) / 2}px`,
        );
        this.resizeFrame = requestAnimationFrame(() => {
          this.select(index, false);
          this.resizeTimer = setTimeout(() => {
            this.select(index, false);
            this.resizing = false;
          }, 80);
        });
      }
      select(index, announce, target = this.cards[index]) {
        if (!this.cards[index]) return;
        this.activeIndex = index;
        this.slides.forEach((card) =>
          card.classList.toggle(
            "is-active",
            Number(card.dataset.storyIndex) === index,
          ),
        );
        this.numbers.forEach((number, i) =>
          number.setAttribute("aria-pressed", String(i === index)),
        );
        const railRect = this.rail.getBoundingClientRect();
        const cardRect = target.getBoundingClientRect();
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
        if (this.cards.length < 2) return;
        const next = this.activeIndex + direction;
        const index = (next + this.cards.length) % this.cards.length;
        const target =
          next < 0
            ? this.slides[this.cards.length - 1]
            : next >= this.cards.length
              ? this.slides[this.cards.length * 2]
              : this.cards[index];
        this.select(index, true, target);
      }
      update() {
        this.querySelector("[data-journal-previous]").disabled =
          this.cards.length < 2;
        this.querySelector("[data-journal-next]").disabled =
          this.cards.length < 2;
      }
      disconnectedCallback() {
        this.controller?.abort();
        this.observer?.disconnect();
        clearTimeout(this.scrollTimer);
        cancelAnimationFrame(this.resizeFrame);
        clearTimeout(this.resizeTimer);
      }
    },
  );
}
