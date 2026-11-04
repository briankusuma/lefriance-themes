if (!customElements.get("product-recommendations")) {
  customElements.define(
    "product-recommendations",
    class extends HTMLElement {
      connectedCallback() {
        const existing = this.querySelector("[data-recommendation-content]");
        if (existing && existing.dataset.recommendationSource === "native")
          return;
        if (this.abort && !this.abort.signal.aborted) return;
        this.abort?.abort();
        this.abort = new AbortController();
        const { signal } = this.abort;
        const load = async () => {
          this.observer?.disconnect();
          try {
            const url = new URL(this.dataset.url, location.origin);
            for (const [key, value] of Object.entries({
              product_id: this.dataset.productId,
              section_id: this.dataset.sectionId,
              intent: this.dataset.intent,
              limit: this.dataset.limit,
            }))
              url.searchParams.set(key, value);
            const response = await fetch(url, { signal });
            if (!response.ok) throw Error("Recommendations unavailable");
            const html = new DOMParser().parseFromString(
              await response.text(),
              "text/html",
            );
            const content = html.querySelector("[data-recommendation-content]");
            if (
              content?.dataset.recommendationSource === "native" &&
              !signal.aborted &&
              this.isConnected
            )
              this.replaceChildren(document.importNode(content, true));
          } catch {
            /* Keep the server-rendered catalog/merchant fallback on API failure. */
          }
        };
        if ("IntersectionObserver" in window) {
          this.observer = new IntersectionObserver(
            (entries) => {
              if (entries.some((entry) => entry.isIntersecting)) load();
            },
            { rootMargin: "150px" },
          );
          this.observer.observe(this);
        } else load();
      }
      disconnectedCallback() {
        this.observer?.disconnect();
        this.abort?.abort();
      }
    },
  );
}
if (!customElements.get("pickup-availability")) {
  customElements.define(
    "pickup-availability",
    class extends HTMLElement {
      connectedCallback() {
        this.abort?.abort();
        this.abort = new AbortController();
        this.closest("lefriance-product")?.addEventListener(
          "product:variant",
          (event) => this.load(event.detail?.id),
          { signal: this.abort.signal },
        );
        this.load(this.dataset.variant);
      }
      async load(id) {
        this.request?.abort();
        if (!id) {
          this.replaceChildren();
          return;
        }
        const request = new AbortController();
        this.request = request;
        try {
          const url = new URL(
            `${this.dataset.root}variants/${encodeURIComponent(id)}/`,
            location.origin,
          );
          url.searchParams.set("section_id", "pickup-availability");
          const response = await fetch(url, { signal: request.signal });
          if (!response.ok) throw Error("Pickup unavailable");
          const html = new DOMParser().parseFromString(
            await response.text(),
            "text/html",
          );
          const content = html.querySelector("[data-pickup-result]");
          if (content && !request.signal.aborted && !this.abort.signal.aborted)
            this.replaceChildren(...content.childNodes);
        } catch {
          if (this.request === request && !this.abort.signal.aborted)
            this.textContent = this.dataset.error;
        }
      }
      disconnectedCallback() {
        this.request?.abort();
        this.abort?.abort();
      }
    },
  );
}
if (!customElements.get("gift-card-recipient")) {
  customElements.define(
    "gift-card-recipient",
    class extends HTMLElement {
      connectedCallback() {
        this.abort?.abort();
        this.abort = new AbortController();
        const toggle = this.querySelector("[data-recipient-toggle]");
        const fields = this.querySelector("[data-recipient-fields]");
        const email = this.querySelector("[data-recipient-email]");
        const date = this.querySelector("[data-recipient-date]");
        this.querySelector("[data-recipient-offset]").value =
          new Date().getTimezoneOffset();
        const localDate = (value) =>
          `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(value.getDate()).padStart(2, "0")}`;
        const today = new Date(),
          latest = new Date();
        latest.setDate(latest.getDate() + 90);
        date.min = localDate(today);
        date.max = localDate(latest);
        const update = () => {
          fields.hidden = fields.disabled = !toggle.checked;
          email.required = toggle.checked;
          const accelerated = this.closest("form")?.querySelector(
            "[data-accelerated-checkout]",
          );
          if (accelerated)
            accelerated.hidden =
              toggle.checked ||
              !!this.closest("form")?.querySelector("[data-add-button]")
                ?.disabled;
        };
        toggle.addEventListener("change", update, {
          signal: this.abort.signal,
        });
        update();
      }
      disconnectedCallback() {
        this.abort?.abort();
      }
    },
  );
}
