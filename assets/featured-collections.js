if (!customElements.get("featured-collections")) {
  customElements.define(
    "featured-collections",
    class extends HTMLElement {
      async connectedCallback() {
        if (!window.ThemeMotion) return;
        this.controller?.abort();
        this.swipers?.forEach((swiper) => swiper?.destroy(true, true));
        this.swipers = new Map();
        this.controller = new AbortController();
        const { signal } = this.controller;
        this.tabs = [...this.querySelectorAll("[data-featured-tab]")];
        this.panels = [...this.querySelectorAll("[data-featured-panel]")];
        this.classList.add("is-enhanced");
        this.querySelector("[data-featured-tabs]").hidden =
          this.tabs.length < 2;
        this.panels.forEach((panel, index) => {
          panel.setAttribute("role", "tabpanel");
          panel.setAttribute("aria-labelledby", this.tabs[index].id);
          const rail = panel.querySelector("[data-featured-products]");
          panel.querySelector("[data-featured-arrows]").hidden = false;
        });
        this.addEventListener(
          "click",
          (event) => {
            const tab = event.target.closest("[data-featured-tab]");
            if (tab) this.select(Number(tab.dataset.featuredTab), true);
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
        await Promise.all(
          this.panels.map(async (panel) => {
            const rail = panel.querySelector("[data-featured-products]");
            const swiper = await ThemeMotion.create(
              rail,
              [...rail.querySelectorAll(".product-card")],
              {
                slidesPerView: 1,
                spaceBetween: 21,
                breakpoints: {
                  600: { slidesPerView: 2 },
                  990: { slidesPerView: 4 },
                },
                observer: true,
                observeParents: true,
                navigation: {
                  prevEl: panel.querySelector("[data-featured-previous]"),
                  nextEl: panel.querySelector("[data-featured-next]"),
                },
              },
            );
            if (signal.aborted) {
              swiper?.destroy(true, true);
              return;
            }
            this.swipers.set(panel, swiper);
          }),
        );
        this.updateArrows();
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
        const swiper = this.swipers.get(panel);
        swiper?.update();
        panel.querySelector("[data-featured-previous]").disabled =
          !swiper || swiper.isBeginning || swiper.isLocked;
        panel.querySelector("[data-featured-next]").disabled =
          !swiper || swiper.isEnd || swiper.isLocked;
      }

      disconnectedCallback() {
        this.controller?.abort();
        this.swipers?.forEach((swiper) => swiper?.destroy(true, true));
      }
    },
  );
}
