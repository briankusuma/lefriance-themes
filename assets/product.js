if (!customElements.get("lefriance-product")) {
  customElements.define(
    "lefriance-product",
    class extends HTMLElement {
      connectedCallback() {
        this.abort?.abort();
        this.abort = new AbortController();
        const data = this.querySelector("[data-product-variants]");
        if (!data) return;
        this.variants = JSON.parse(data.textContent);
        const options = this.querySelector("[data-product-options]");
        const selected = this.variants.find(
          (item) =>
            String(item.id) ===
            this.querySelector("[data-variant-select]")?.value,
        );
        if (options && selected && this.variants.length < 250) {
          options.hidden = false;
          this.querySelector("[data-variant-fallback]").hidden = true;
          this.querySelectorAll("[data-option-group]").forEach(
            (group, index) => {
              group.querySelectorAll("[data-option-radio]").forEach((input) => {
                input.checked = input.value === selected.options[index];
              });
            },
          );
        }
        this.querySelectorAll("[data-quantity-step]").forEach((button) => {
          button.hidden = false;
        });
        this.addEventListener(
          "change",
          (event) => {
            if (event.target.matches("[data-option-radio]")) {
              const values = [
                ...this.querySelectorAll("[data-option-group]"),
              ].map((group) => group.querySelector(":checked")?.value);
              const matching = this.variants.find((item) =>
                item.options.every((value, index) => value === values[index]),
              );
              this.querySelector("[data-variant-select]").value = matching
                ? matching.id
                : "";
              this.update(true);
            }
            if (
              event.target.matches("[data-variant-select], [data-selling-plan]")
            )
              this.update(event.target.matches("[data-variant-select]"));
            if (event.target.matches('[name="quantity"]')) this.syncQuantity();
            // External form-associated controls do not bubble through the form.
            // Notify native checkout listeners after their values have changed.
            if (event.target.matches('[data-option-radio], [data-variant-select], [name="quantity"]')) {
              this.querySelector('[data-product-form]')?.dispatchEvent(new Event('change', { bubbles: true }));
            }
          },
          { signal: this.abort.signal },
        );
        this.addEventListener(
          "click",
          (event) => {
            const button = event.target.closest("[data-quantity-step]");
            if (!button) return;
            const input = this.querySelector('[name="quantity"]');
            if (!input || input.type !== "number") return;
            if (!Number.isFinite(input.valueAsNumber))
              input.value = input.min || "1";
            if (button.dataset.quantityStep === "1") input.stepUp();
            else input.stepDown();
            input.dispatchEvent(new Event("input", { bubbles: true }));
            input.dispatchEvent(new Event("change", { bubbles: true }));
          },
          { signal: this.abort.signal },
        );
        this.addEventListener(
          "input",
          (event) => {
            if (event.target.matches('[name="quantity"]')) this.syncQuantity();
          },
          { signal: this.abort.signal },
        );
        this.update(false);
      }
      disconnectedCallback() {
        this.abort?.abort();
      }
      syncQuantity() {
        const input = this.querySelector('[name="quantity"]');
        if (!input) return;
        this.querySelectorAll("[data-quantity-step]").forEach((button) => {
          button.disabled =
            button.dataset.quantityStep === "-1"
              ? Number(input.value) <= Number(input.min || 1)
              : !!input.max && Number(input.value) >= Number(input.max);
        });
      }
      update(variantChanged) {
        const variant = this.variants.find(
          (item) =>
            String(item.id) ===
            this.querySelector("[data-variant-select]")?.value,
        );
        const button = this.querySelector("[data-add-button]");
        const price = this.querySelector("[data-product-price]");
        if (!variant) {
          if (button) {
            button.disabled = true;
            button.textContent = button.dataset.invalidLabel;
          }
          if (price) price.textContent = this.dataset.unavailableLabel;
          return;
        }
        const plan = this.querySelector("[data-selling-plan]");
        if (plan) {
          [...plan.options].forEach((option) => {
            option.disabled =
              !!option.value &&
              !variant.plans.some((item) => String(item.id) === option.value);
          });
          if (plan.selectedOptions[0]?.disabled)
            plan.value =
              [...plan.options].find((option) => !option.disabled)?.value || "";
        }
        const selectedPlan = variant.plans.find(
          (item) => String(item.id) === plan?.value,
        );
        if (price) {
          if (selectedPlan) price.textContent = selectedPlan.price;
          else price.innerHTML = variant.price;
        }
        if (button) {
          button.disabled =
            !variant.available ||
            (!!plan && ![...plan.options].some((option) => !option.disabled));
          button.textContent = button.disabled
            ? button.dataset.unavailableLabel
            : button.dataset.availableLabel;
        }
        const quantity = this.querySelector('[name="quantity"]');
        if (quantity) {
          quantity.min = variant.min;
          quantity.step = variant.step;
          if (variant.max) quantity.max = variant.max;
          else quantity.removeAttribute("max");
          if (variantChanged) quantity.value = variant.min;
          this.syncQuantity();
        }
        if (variantChanged) {
          const url = new URL(location.href);
          url.searchParams.set("variant", variant.id);
          history.replaceState({}, "", url);
          if (variant.media) {
            const section = this.closest("section");
            const gallery = section?.querySelector("product-detail-gallery");
            if (typeof gallery?.selectMedia === "function")
              gallery.selectMedia(variant.media);
            else
              section
                ?.querySelector(`[data-product-media="${variant.media}"]`)
                ?.scrollIntoView({ block: "nearest", behavior: "instant" });
          }
        }
      }
    },
  );
}
