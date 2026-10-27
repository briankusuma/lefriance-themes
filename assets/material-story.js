if (!customElements.get("material-story")) {
  customElements.define(
    "material-story",
    class extends HTMLElement {
      connectedCallback() {
        if (!window.ThemeMotion) return;
        this.controller?.abort();
        this.swiper?.destroy(true, true);
        this.swiperCategory = null;
        this.controller = new AbortController();
        const { signal } = this.controller;
        this.items = [...this.querySelectorAll("[data-story-item]")];
        this.selectors = [...this.querySelectorAll("[data-story-select]")];
        this.categories = [...this.querySelectorAll("[data-story-category]")];
        this.category = "";
        this.activeIndex = Number(this.dataset.initialIndex) || 0;
        if (!this.items[this.activeIndex]) this.activeIndex = 0;

        this.addEventListener(
          "click",
          (event) => {
            const filter = event.target.closest("[data-story-category]");
            const selector = event.target.closest("[data-story-select]");
            if (filter) {
              this.category = filter.dataset.storyCategory;
              this.activeIndex = this.items.findIndex((item) =>
                this.matchesCategory(item),
              );
              this.update(true);
            } else if (selector) {
              this.activeIndex = Number(selector.dataset.storySelect);
              this.update(true);
            }
          },
          { signal },
        );

        this.addEventListener(
          "keydown",
          (event) => {
            const button = event.target.closest(
              "[data-story-select], [data-story-category]",
            );
            if (
              !button ||
              ![
                "ArrowLeft",
                "ArrowRight",
                "ArrowUp",
                "ArrowDown",
                "Home",
                "End",
              ].includes(event.key)
            )
              return;
            const buttons = [
              ...button.parentElement.querySelectorAll("button"),
            ].filter((item) => !item.hidden);
            let index = buttons.indexOf(button);
            if (event.key === "Home") index = 0;
            else if (event.key === "End") index = buttons.length - 1;
            else
              index =
                (index +
                  (["ArrowLeft", "ArrowUp"].includes(event.key) ? -1 : 1) +
                  buttons.length) %
                buttons.length;
            event.preventDefault();
            buttons[index]?.focus();
            buttons[index]?.click();
          },
          { signal },
        );

        this.addEventListener(
          "shopify:block:select",
          (event) => {
            const item = event.target.closest("[data-story-item]");
            if (!item) return;
            this.category = "";
            this.activeIndex = this.items.indexOf(item);
            this.update(false);
          },
          { signal },
        );

        this.classList.add("is-enhanced");
        this.querySelectorAll("[data-story-controls]").forEach((control) => {
          control.hidden = this.items.length === 0;
        });
        this.update(false);
      }

      matchesCategory(item) {
        return (
          this.category === "" ||
          item.dataset.storyCategoryName === this.category
        );
      }

      async update(announce) {
        const visible = this.items.filter((item) => this.matchesCategory(item));
        if (this.swiperCategory !== this.category) {
          this.swiper?.destroy(true, true);
          this.swiperCategory = this.category;
          this.items.forEach((item) => {
            item.hidden = !this.matchesCategory(item);
          });
          const swiper = await ThemeMotion.create(
            this.querySelector(".material-story__stories"),
            visible,
            {
              slidesPerView: 1,
              autoHeight: true,
              effect: "fade",
              fadeEffect: { crossFade: true },
              rewind: true,
              on: {
                slideChange: (swiper) => {
                  this.activeIndex = this.items.indexOf(
                    visible[swiper.realIndex],
                  );
                  this.paint(false);
                },
              },
            },
          );
          if (this.controller.signal.aborted) {
            swiper?.destroy(true, true);
            return;
          }
          this.swiper = swiper;
          if (!swiper && visible.length) {
            this.classList.remove("is-enhanced");
            this.items.forEach((item) => {
              item.hidden = false;
              item.inert = false;
              item.removeAttribute("aria-hidden");
            });
            this.querySelectorAll("[data-story-controls]").forEach(
              (control) => (control.hidden = true),
            );
            return;
          }
        }
        const index = visible.indexOf(this.items[this.activeIndex]);
        this.swiper?.slideTo(
          Math.max(0, index),
          announce ? ThemeMotion.speed : 0,
        );
        this.paint(announce);
      }

      paint(announce) {
        this.items.forEach((item, index) => {
          item.inert = index !== this.activeIndex;
          item.setAttribute("aria-hidden", String(index !== this.activeIndex));
        });
        this.categories.forEach((button) => {
          button.setAttribute(
            "aria-pressed",
            String(button.dataset.storyCategory === this.category),
          );
        });
        this.selectors.forEach((button) => {
          const index = Number(button.dataset.storySelect);
          button.hidden = !this.matchesCategory(this.items[index]);
          button.setAttribute(
            "aria-pressed",
            String(index === this.activeIndex),
          );
        });
        this.querySelector("[data-story-empty]").hidden = Boolean(
          this.items[this.activeIndex],
        );
        if (announce)
          this.querySelector("[data-story-status]").textContent =
            this.items[this.activeIndex]?.dataset.storyTitle ||
            this.querySelector("[data-story-empty]").textContent;
      }

      disconnectedCallback() {
        this.controller?.abort();
        this.swiper?.destroy(true, true);
      }
    },
  );
}
