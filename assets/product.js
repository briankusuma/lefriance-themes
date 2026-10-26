if (!customElements.get('lefriance-product')) {
  customElements.define('lefriance-product', class extends HTMLElement {
    connectedCallback() {
      this.abort?.abort(); this.abort = new AbortController();
      this.variants = JSON.parse(this.querySelector('[data-product-variants]').textContent);
      const options = this.querySelector('[data-product-options]');
      if (options && this.variants.length < 250) {
        options.hidden = false;
        this.querySelector('[data-variant-select]').hidden = true;
        this.querySelector('[data-variant-label]').hidden = true;
        const selected = this.variants.find(item => String(item.id) === this.querySelector('[data-variant-select]').value);
        this.querySelectorAll('[data-option-select]').forEach((select, index) => { select.value = selected.options[index]; });
      }
      this.addEventListener('change', event => {
        if (event.target.matches('[data-option-select]')) {
          const values = [...this.querySelectorAll('[data-option-select]')].map(select => select.value);
          const matching = this.variants.find(item => item.options.every((value, index) => value === values[index]));
          this.querySelector('[data-variant-select]').value = matching ? matching.id : '';
          this.update(true);
        }
        if (event.target.matches('[data-variant-select], [data-selling-plan]')) this.update(event.target.matches('[data-variant-select]'));
      }, { signal: this.abort.signal });
      this.update(false);
    }
    disconnectedCallback() { this.abort?.abort(); }
    update(variantChanged) {
      const variant = this.variants.find(item => String(item.id) === this.querySelector('[data-variant-select]').value);
      if (!variant) {
        const button = this.querySelector('[data-add-button]');
        button.disabled = true; button.textContent = button.dataset.invalidLabel;
        this.querySelector('[data-product-price]').textContent = button.dataset.invalidLabel;
        return;
      }
      const plan = this.querySelector('[data-selling-plan]');
      if (plan) {
        [...plan.options].forEach(option => { option.disabled = !!option.value && !variant.plans.some(item => String(item.id) === option.value); });
        if (plan.selectedOptions[0]?.disabled) plan.value = [...plan.options].find(option => !option.disabled)?.value || '';
      }
      const selectedPlan = variant.plans.find(item => String(item.id) === plan?.value);
      const price = this.querySelector('[data-product-price]');
      if (selectedPlan) price.textContent = selectedPlan.price; else price.innerHTML = variant.price;
      const button = this.querySelector('[data-add-button]');
      button.disabled = !variant.available || (!!plan && ![...plan.options].some(option => !option.disabled));
      button.textContent = button.disabled ? button.dataset.unavailableLabel : button.dataset.availableLabel;
      const quantity = this.querySelector('[name="quantity"]');
      quantity.min = variant.min; quantity.step = variant.step;
      if (variant.max) quantity.max = variant.max; else quantity.removeAttribute('max');
      if (variantChanged) quantity.value = variant.min;
      if (variantChanged) {
        const url = new URL(location.href); url.searchParams.set('variant', variant.id); history.replaceState({}, '', url);
        if (variant.media) this.closest('section')?.querySelector(`[data-product-media="${variant.media}"]`)?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
      }
    }
  });
}
