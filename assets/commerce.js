/* Native forms remain the fallback. Shopify bundled sections supply every cart price. */
(() => {
  if (window.lefrianceCommerce) return;
  window.lefrianceCommerce = true;
  let busy = false;
  let refreshVersion = 0;
  let opener;
  const panel = () => document.getElementById('CartPanel');
  function enhanceQuantities() {
    document.querySelectorAll('.cart-quantity').forEach(control => {
      const input = control.querySelector('[data-cart-quantity]');
      if (!input) return;
      control.classList.add('is-enhanced');
      control.querySelectorAll('[data-cart-quantity-step]').forEach(button => {
        button.hidden = false;
        button.disabled = busy || (button.dataset.cartQuantityStep === '-1'
          ? Number(input.value) <= 0
          : !!input.max && Number(input.value) >= Number(input.max));
      });
    });
  }
  const endpoint = (key) => `${document.body.dataset[key]}.js`;
  // The cart page omits the drawer. Render sections in their current page context.
  const sectionContext = () => {
    const url = new URL(location.href);
    url.searchParams.delete('sections');
    url.searchParams.delete('section_id');
    return url;
  };
  const sectionIds = () => [...new Set([...document.querySelectorAll('[data-cart-section]')].map(el => el.dataset.cartSection))].slice(0, 5);
  const showError = (message, form) => {
    const targets = form?.querySelector('[data-product-error]') ? [form.querySelector('[data-product-error]')] : document.querySelectorAll('[data-cart-error]');
    targets.forEach(el => { el.textContent = message; el.hidden = false; });
  };
  async function readJSON(response) {
    const result = await response.json();
    if (!response.ok) throw new Error(typeof result.description === 'string' ? result.description : document.body.dataset.cartErrorMessage);
    return result;
  }
  function paint(sections) {
    let refreshed = 0;
    for (const id of sectionIds()) {
      if (typeof sections?.[id] !== 'string') continue;
      const parsed = new DOMParser().parseFromString(sections[id], 'text/html');
      const next = [...parsed.querySelectorAll('[data-cart-section]')].find(el => el.dataset.cartSection === id);
      const current = [...document.querySelectorAll('[data-cart-section]')].find(el => el.dataset.cartSection === id);
      if (!next || !current) continue;
      current.replaceChildren(...next.childNodes);
      current.dataset.itemCount = next.dataset.itemCount;
      refreshed++;
    }
    enhanceQuantities();
    return refreshed;
  }
  async function refresh(sections) {
    const version = ++refreshVersion;
    const ids = sectionIds();
    if (paint(sections) < ids.length) {
      const url = sectionContext();
      url.searchParams.set('sections', ids.join(','));
      const rendered = await fetch(url, { headers: { Accept: 'application/json' } }).then(readJSON);
      if (version !== refreshVersion) return;
      if (paint(rendered) < ids.length) throw new Error(document.body.dataset.cartErrorMessage);
    }
    const cart = await fetch(endpoint('cartUrl'), { headers: { Accept: 'application/json' } }).then(readJSON);
    if (version !== refreshVersion) return;
    document.querySelectorAll('[data-cart-error]').forEach(el => { el.hidden = true; el.textContent = ''; });
    document.querySelectorAll('[data-cart-count]').forEach(el => { el.textContent = cart.item_count; el.hidden = cart.item_count === 0; });
    document.querySelectorAll('[data-cart-open]').forEach(el => el.setAttribute('aria-label', `${el.dataset.cartLabel} (${cart.item_count})`));
    const status = document.querySelector('[data-cart-status]');
    if (status) status.textContent = `${document.body.dataset.cartUpdatedMessage}: ${cart.item_count}`;
  }
  function positionPanel(trigger) {
    const cartPanel = panel();
    if (!cartPanel || cartPanel.dataset.cartPresentation !== 'popover') return;
    const triggerBox = trigger.getBoundingClientRect();
    const offset = Number(cartPanel.dataset.cartOffset) || 12;
    cartPanel.style.setProperty('--cart-panel-top', `${Math.max(0, triggerBox.bottom + offset)}px`);
  }
  function openPanel(trigger) {
    if (!panel()?.showModal) return false;
    opener = trigger;
    const positionAnchor = panel().dataset.cartPresentation === 'popover'
      ? document.querySelector('[data-cart-open]') || trigger
      : trigger;
    positionPanel(positionAnchor);
    if (!panel().open) panel().showModal();
    document.querySelectorAll('[data-cart-open]').forEach(link => link.setAttribute('aria-expanded', 'true'));
    return true;
  }
  function closePanel() {
    panel()?.close();
    if (opener?.isConnected) opener.focus();
  }
  async function mutate(route, payload, form, trigger) {
    if (busy) return;
    busy = true;
    refreshVersion++;
    document.querySelectorAll('[data-cart-error], [data-product-error]').forEach(el => { el.hidden = true; });
    const controls = [...document.querySelectorAll('[data-cart-form] button, [data-cart-form] input, [data-cart-form] textarea'), ...(form ? form.querySelectorAll('button, input, select') : [])];
    const enabled = controls.filter(el => !el.disabled);
    enabled.forEach(el => { el.disabled = true; });
    form?.setAttribute('aria-busy', 'true');
    let restoreFocus;
    try {
      const ids = sectionIds();
      let options;
      if (payload instanceof FormData) {
        const context = sectionContext();
        payload.set('sections', ids.join(',')); payload.set('sections_url', context.pathname + context.search);
        options = { method: 'POST', body: payload, headers: { Accept: 'application/json' } };
      } else {
        const context = sectionContext();
        options = { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...payload, sections: ids, sections_url: context.pathname + context.search }) };
      }
      const result = await fetch(endpoint(route), options).then(readJSON);
      // Never repeat a successful mutation if rendering fails: that could add an item twice.
      await refresh(result.sections);
      if (route === 'cartAddUrl') openPanel(trigger);
      else if (trigger && !trigger.isConnected) {
        const scope = panel()?.open ? panel() : document;
        const selector = trigger.matches('[data-cart-quantity-step]') ? '[data-cart-quantity-step]' : '[data-cart-quantity]';
        const replacement = [...scope.querySelectorAll(selector)].find(input => input.dataset.key === trigger.dataset.key && input.dataset.cartQuantityStep === trigger.dataset.cartQuantityStep);
        restoreFocus = replacement || scope.querySelector('[data-cart-content] a, [data-cart-content] input');
      }
    } catch (error) {
      if (trigger?.isConnected) restoreFocus = trigger;
      if (trigger?.matches('[data-cart-quantity-step]')) {
        const input = trigger.closest('.cart-quantity')?.querySelector('input');
        if (input) input.value = input.defaultValue;
      }
      showError(error.message || document.body.dataset.cartErrorMessage, form);
    }
    finally {
      enabled.forEach(el => { if (el.isConnected) el.disabled = false; });
      form?.removeAttribute('aria-busy'); busy = false; enhanceQuantities();
      const focusTarget = restoreFocus?.disabled ? restoreFocus.closest('.cart-quantity')?.querySelector('input') : restoreFocus;
      focusTarget?.focus();
    }
  }
  function changeLine(key, quantity, form, trigger) {
    const note = form?.elements.note;
    if (note && note.value !== note.defaultValue) {
      mutate('cartUpdateUrl', { updates: { [key]: quantity }, note: note.value }, form, trigger);
    } else mutate('cartChangeUrl', { id: key, quantity }, form, trigger);
  }
  document.addEventListener('click', event => {
    const stepper = event.target.closest('[data-cart-quantity-step]');
    if (stepper) {
      if (busy) return;
      const input = stepper.closest('.cart-quantity')?.querySelector('[data-cart-quantity]');
      if (!input) return;
      const minimum = Number(input.dataset.minimum) || 1;
      const step = Number(input.step) || 1;
      const current = Number.isFinite(input.valueAsNumber) ? input.valueAsNumber : Number(input.defaultValue);
      let next = current + Number(stepper.dataset.cartQuantityStep) * step;
      if (next > 0 && next < minimum) next = stepper.dataset.cartQuantityStep === '-1' ? 0 : minimum;
      if (input.max) next = Math.min(next, Number(input.max));
      input.value = Math.max(0, next);
      if (input.checkValidity()) changeLine(input.dataset.key, Number(input.value), input.form, stepper);
      return;
    }
    const open = event.target.closest('[data-cart-open]');
    if (open && document.body.dataset.cartType !== 'page' && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0 && openPanel(open)) {
      event.preventDefault(); if (!busy) refresh().catch(error => showError(error.message));
    }
    if (event.target.closest('[data-cart-close]')) closePanel();
    const remove = event.target.closest('[data-cart-remove]');
    if (remove && !event.metaKey && !event.ctrlKey && !event.shiftKey && event.button === 0) { event.preventDefault(); changeLine(remove.dataset.key, 0, remove.closest('form'), remove); }
    if (event.target === panel()) { const rect = panel().getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closePanel(); }
  });
  document.addEventListener('submit', event => {
    const form = event.target;
    if (form.matches('[data-product-form]') && document.body.dataset.cartType !== 'page' && panel()?.showModal) {
      event.preventDefault(); const payload = new FormData(form); mutate('cartAddUrl', payload, form, event.submitter);
    } else if (form.matches('[data-cart-form]') && event.submitter?.name !== 'checkout') {
      event.preventDefault();
      const updates = {}; form.querySelectorAll('[data-cart-quantity]').forEach(input => { updates[input.dataset.key] = Number(input.value); });
      const payload = { updates }; if (form.elements.note) payload.note = form.elements.note.value;
      mutate('cartUpdateUrl', payload, form, event.submitter);
    }
  });
  document.addEventListener('change', event => {
    const input = event.target.closest('[data-cart-quantity]');
    if (input && input.checkValidity()) changeLine(input.dataset.key, Number(input.value), input.form, input);
  });
  panel()?.addEventListener('close', () => {
    document.querySelectorAll('[data-cart-open]').forEach(link => link.setAttribute('aria-expanded', 'false'));
    if (opener?.isConnected) opener.focus();
  });
  document.addEventListener('shopify:section:load', enhanceQuantities);
  enhanceQuantities();
})();
