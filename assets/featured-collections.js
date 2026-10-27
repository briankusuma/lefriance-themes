if (!customElements.get("featured-collections")) {
  customElements.define(
    "featured-collections",
    class extends HTMLElement {
      connectedCallback() {
        this.controller?.abort();
        this.observer?.disconnect();
        this.controller = new AbortController();
        const { signal } = this.controller;
        this.tabs = [...this.querySelectorAll("[data-featured-tab]")];
        this.panels = [...this.querySelectorAll("[data-featured-panel]")];
        this.classList.add("is-enhanced");
        this.querySelector("[data-featured-tabs]").hidden =
          this.tabs.length < 2;
        this.observer = new ResizeObserver(() => this.updateArrows());
        this.panels.forEach((panel, index) => {
          panel.setAttribute("role", "tabpanel");
          panel.setAttribute("aria-labelledby", this.tabs[index].id);
          const rail = panel.querySelector("[data-featured-products]");
          this.observer.observe(rail);
          rail.addEventListener("scroll", () => this.updateArrows(), {
            signal,
            passive: true,
          });
          panel.querySelector("[data-featured-arrows]").hidden = false;
        });
        this.addEventListener(
          "click",
          (event) => {
            const tab = event.target.closest("[data-featured-tab]");
            if (tab) this.select(Number(tab.dataset.featuredTab), true);
            const arrow = event.target.closest(
              "[data-featured-previous], [data-featured-next]",
            );
            if (!arrow) return;
            const rail = arrow
              .closest("[data-featured-panel]")
              .querySelector("[data-featured-products]");
            const rtl = getComputedStyle(rail).direction === "rtl";
            const direction = arrow.hasAttribute("data-featured-next") ? 1 : -1;
            rail.scrollBy({
              left: direction * (rtl ? -1 : 1) * rail.clientWidth,
              behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "instant"
                : "smooth",
            });
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
        this.select(
          this.panels[Number(this.dataset.initialIndex)]
            ? Number(this.dataset.initialIndex)
            : 0,
          false,
        );
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
        const rail = panel.querySelector("[data-featured-products]");
        const position = Math.abs(rail.scrollLeft);
        const max = rail.scrollWidth - rail.clientWidth;
        panel.querySelector("[data-featured-previous]").disabled = position < 2;
        panel.querySelector("[data-featured-next]").disabled =
          position >= max - 2;
      }

      disconnectedCallback() {
        this.controller?.abort();
        this.observer?.disconnect();
      }
    },
  );
}
