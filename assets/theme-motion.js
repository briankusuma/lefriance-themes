(() => {
  if (window.ThemeMotion) return;
  const config = document.currentScript.dataset;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const instances = new Set();
  let swiperReady;
  let lenisReady;
  let lenis;
  const load = (src, style) =>
    Promise.all([
      new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.append(script);
      }),
      new Promise((resolve, reject) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = style;
        link.onload = resolve;
        link.onerror = reject;
        document.head.append(link);
      }),
    ]);
  window.ThemeMotion = {
    get pageScroll() {
      return lenis;
    },
    get speed() {
      return reduced.matches ? 0 : 520;
    },
    async create(container, slides, options = {}) {
      if (!slides.length) return null;
      try {
        await (swiperReady ||= load(config.swiperSrc, config.swiperCss));
      } catch {
        return null;
      }
      if (!container.isConnected) return null;
      const wrapper = document.createElement("div");
      wrapper.className = "swiper-wrapper";
      container.prepend(wrapper);
      slides.forEach((slide) => {
        slide.classList.add("swiper-slide");
        wrapper.append(slide);
      });
      container.classList.add("swiper", "theme-swiper");
      const swiper = new window.Swiper(container, {
        speed: this.speed,
        grabCursor: slides.length > 1,
        watchOverflow: true,
        a11y: {
          enabled: true,
          prevSlideMessage:
            options.navigation?.prevEl?.getAttribute("aria-label") ||
            "Previous slide",
          nextSlideMessage:
            options.navigation?.nextEl?.getAttribute("aria-label") ||
            "Next slide",
        },
        ...options,
        ...(options.navigation
          ? { navigation: { addIcons: false, ...options.navigation } }
          : {}),
      });
      instances.add(swiper);
      const onKey = (event) => {
        if (
          event.target !== container ||
          !["ArrowLeft", "ArrowRight"].includes(event.key)
        )
          return;
        event.preventDefault();
        const forward = (event.key === "ArrowRight") !== swiper.rtlTranslate;
        if (forward) swiper.slideNext(this.speed);
        else swiper.slidePrev(this.speed);
      };
      container.addEventListener("keydown", onKey);
      swiper.on("destroy", () => {
        instances.delete(swiper);
        container.removeEventListener("keydown", onKey);
        slides.forEach((slide) => {
          slide.classList.remove("swiper-slide");
          container.insertBefore(slide, wrapper);
        });
        wrapper.remove();
        container.classList.remove("swiper", "theme-swiper");
      });
      return swiper;
    },
  };
  const syncLock = () => {
    if (!lenis) return;
    const locked =
      Boolean(
        document.querySelector("dialog[open], details[scroll-lock][open]"),
      ) ||
      document.body.style.overflow === "hidden" ||
      document.documentElement.style.overflow === "hidden";
    if (locked) lenis.stop();
    else lenis.start();
  };
  const locks = new MutationObserver(syncLock);
  locks.observe(document.body, {
    subtree: true,
    attributes: true,
    attributeFilter: ["open"],
  });
  const inlineLocks = new MutationObserver(syncLock);
  inlineLocks.observe(document.body, {
    attributes: true,
    attributeFilter: ["style"],
  });
  inlineLocks.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["style"],
  });
  const syncScroll = async () => {
    if (
      config.lenisEnabled !== "true" ||
      config.designMode === "true" ||
      reduced.matches
    ) {
      lenis?.destroy();
      lenis = null;
      return;
    }
    try {
      await (lenisReady ||= load(config.lenisSrc, config.lenisCss));
    } catch {
      return;
    }
    if (reduced.matches || lenis) return;
    lenis = new window.Lenis({
      autoRaf: true,
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      anchors: false,
      prevent: (node) =>
        node.matches?.(
          'dialog, [data-lenis-prevent], textarea, select, [contenteditable="true"]',
        ),
      virtualScroll: () =>
        !document.querySelector("dialog[open], details[scroll-lock][open]") &&
        !["hidden", "clip"].includes(
          getComputedStyle(document.documentElement).overflowY,
        ) &&
        !["hidden", "clip"].includes(getComputedStyle(document.body).overflowY),
    });
    syncLock();
  };
  reduced.addEventListener("change", () => {
    instances.forEach((swiper) => {
      swiper.params.speed = window.ThemeMotion.speed;
    });
    syncScroll();
  });
  window.addEventListener("pagehide", () => {
    lenis?.destroy();
    lenis = null;
  });
  window.addEventListener("pageshow", syncScroll);
  document.addEventListener("shopify:section:load", () => lenis?.resize());
  syncScroll();
})();
