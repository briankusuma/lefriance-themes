if (!customElements.get("theme-predictive-search")) {
  customElements.define(
    "theme-predictive-search",
    class extends HTMLElement {
      connectedCallback() {
        this.abort?.abort();
        this.abort = new AbortController();
        const { signal } = this.abort;
        this.input = this.querySelector('input[type="search"]');
        this.results = this.querySelector("[data-predictive-results]");
        this.input.setAttribute("role", "combobox");
        this.input.setAttribute("aria-autocomplete", "list");
        this.input.setAttribute("aria-expanded", "false");
        this.addEventListener(
          "input",
          (event) => {
            if (event.isComposing) return;
            clearTimeout(this.timer);
            this.request?.abort();
            this.close();
            const query = this.input.value.trim();
            if (query) this.timer = setTimeout(() => this.search(query), 180);
          },
          { signal },
        );
        this.addEventListener(
          "keydown",
          (event) => {
            if (event.key === "Escape") {
              this.close();
              return;
            }
            if (this.results.hidden) return;
            const options = [
              ...this.results.querySelectorAll("[data-predictive-option]"),
            ];
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              if (!options.length) return;
              event.preventDefault();
              this.index =
                ((this.index ?? -1) +
                  (event.key === "ArrowDown" ? 1 : -1) +
                  options.length) %
                options.length;
              options.forEach((option, index) =>
                option.setAttribute(
                  "aria-selected",
                  String(index === this.index),
                ),
              );
              this.input.setAttribute(
                "aria-activedescendant",
                options[this.index].id,
              );
            } else if (event.key === "Enter" && options[this.index]) {
              event.preventDefault();
              options[this.index].querySelector("a").click();
            }
          },
          { signal },
        );
        this.addEventListener(
          "focusout",
          (event) => {
            if (!this.contains(event.relatedTarget)) this.close();
          },
          { signal },
        );
        this.addEventListener(
          "focusin",
          () => {
            if (
              this.results.querySelector("[data-predictive-list]") &&
              this.query === this.input.value.trim()
            )
              this.open();
          },
          { signal },
        );
      }
      async search(query) {
        const request = new AbortController();
        this.request = request;
        this.results.setAttribute("aria-busy", "true");
        try {
          const url = new URL(this.dataset.url, location.origin);
          url.searchParams.set("q", query);
          url.searchParams.set("section_id", "predictive-search");
          url.searchParams.set(
            "resources[type]",
            "product,collection,article,page,query",
          );
          url.searchParams.set("resources[limit]", "6");
          const response = await fetch(url, { signal: request.signal });
          if (!response.ok) throw Error("Suggestions unavailable");
          const html = new DOMParser().parseFromString(
            await response.text(),
            "text/html",
          );
          const list = html.querySelector("[data-predictive-list]");
          if (
            !list ||
            request.signal.aborted ||
            this.abort.signal.aborted ||
            query !== this.input.value.trim()
          )
            return;
          this.results.replaceChildren(list);
          this.query = query;
          this.index = -1;
          if (this.contains(document.activeElement)) this.open();
        } catch {
          if (this.request === request) this.close();
        } finally {
          if (this.request === request)
            this.results.removeAttribute("aria-busy");
        }
      }
      open() {
        this.results.hidden = false;
        this.input.setAttribute("aria-expanded", "true");
      }
      close() {
        this.results.hidden = true;
        this.input.setAttribute("aria-expanded", "false");
        this.input.removeAttribute("aria-activedescendant");
        this.index = -1;
      }
      disconnectedCallback() {
        clearTimeout(this.timer);
        this.request?.abort();
        this.abort?.abort();
      }
    },
  );
}
