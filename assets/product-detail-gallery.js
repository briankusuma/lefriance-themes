if (!customElements.get("product-detail-gallery")) {
  customElements.define(
    "product-detail-gallery",
    class extends HTMLElement {
      async connectedCallback() {
        this.abort?.abort();
        const controller = new AbortController();
        this.abort = controller;
        this.fallback = false;
        this.slides = [...this.querySelectorAll("[data-product-media]")];
        this.links = [...this.querySelectorAll("[data-media-target]")];
        const initial = this.pendingMedia || this.dataset.initialMedia;
        const initialSlide = Math.max(
          0,
          this.slides.findIndex(
            (slide) => slide.dataset.productMedia === initial,
          ),
        );
        const swiper = await window.ThemeMotion?.create(
          this.querySelector(".product-detail__stage"),
          this.slides,
          { slidesPerView: 1, initialSlide, autoHeight: true },
        );
        if (controller.signal.aborted) {
          swiper?.destroy(true, true);
          return;
        }
        if (!swiper) {
          this.fallback = true; // Anchor links and all media remain usable.
          if (this.pendingMedia) this.selectMedia(this.pendingMedia);
          return;
        }
        this.swiper = swiper;
        swiper.on("slideChange", () => this.sync());
        this.addEventListener(
          "click",
          (event) => {
            const link = event.target.closest("[data-media-target]");
            if (
              !link ||
              event.metaKey ||
              event.ctrlKey ||
              event.shiftKey ||
              event.altKey
            )
              return;
            event.preventDefault();
            this.selectMedia(link.dataset.mediaTarget);
          },
          { signal: controller.signal },
        );
        this.addEventListener(
          "keydown",
          (event) => {
            const index = this.links.indexOf(event.target);
            if (index < 0) return;
            const rtl = getComputedStyle(this).direction === "rtl";
            const offsets = {
              ArrowRight: rtl ? -1 : 1,
              ArrowLeft: rtl ? 1 : -1,
              ArrowDown: 2,
              ArrowUp: -2,
              Home: -index,
              End: this.links.length - 1 - index,
            };
            if (!(event.key in offsets)) return;
            event.preventDefault();
            const next = Math.max(
              0,
              Math.min(this.links.length - 1, index + offsets[event.key]),
            );
            this.links[next].focus();
            this.selectMedia(this.links[next].dataset.mediaTarget);
          },
          { signal: controller.signal },
        );
        this.selectMedia(this.pendingMedia || initial, 0);
        this.sync();
      }

      selectMedia(id, speed = window.ThemeMotion?.speed || 0) {
        this.pendingMedia = String(id);
        const index = this.slides?.findIndex(
          (slide) => slide.dataset.productMedia === String(id),
        );
        if (index >= 0) this.swiper?.slideTo(index, speed);
        if (index >= 0 && this.fallback) {
          this.slides[index].scrollIntoView({
            block: "nearest",
            behavior: "instant",
          });
        }
      }

      sync() {
        const active = this.swiper.activeIndex;
        this.slides.forEach((slide, index) => {
          const wasActive = slide.getAttribute("aria-hidden") === "false";
          slide.inert = index !== active;
          slide.setAttribute("aria-hidden", String(index !== active));
          if (index !== active) {
            slide.querySelectorAll("video").forEach((video) => video.pause());
            // Reload only a departing external player, stopping its audio without
            // depending on a YouTube/Vimeo runtime API or another library.
            if (wasActive) {
              slide.querySelectorAll("iframe").forEach((frame) => {
                frame.src = frame.src;
              });
            }
          }
        });
        this.links.forEach((link, index) => {
          if (index === active) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      }

      disconnectedCallback() {
        this.abort?.abort();
        this.swiper?.destroy(true, true);
        this.swiper = null;
        this.slides?.forEach((slide) => {
          slide.inert = false;
          slide.removeAttribute("aria-hidden");
        });
      }
    },
  );
}
