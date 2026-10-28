/* Native details work without JS. This element adds Escape, outside-close, and editor lifecycle handling. */
if (!customElements.get('lefriance-header')) {
  customElements.define('lefriance-header', class extends HTMLElement {
    connectedCallback() {
      this.controller?.abort();
      this.resizeObserver?.disconnect();
      this.controller = new AbortController();
      const options = { signal: this.controller.signal };
      this.mobileMenu = this.querySelector('.site-header__mobile-menu');
      this.mobilePanel = this.querySelector('.site-header__mobile-panel');
      this.mobileMenu?.classList.add('is-enhanced');
      const closeButton = this.querySelector('[data-mobile-menu-close]');
      if (closeButton) closeButton.hidden = false;
      closeButton?.addEventListener('click', () => this.closeMobile(true), options);
      this.mobilePanel?.addEventListener('click', event => {
        if (event.target.closest('a[href]')) this.closeMobile(false);
      }, options);
      this.mobilePanel?.querySelector('shopify-account')?.addEventListener('open', () => this.closeMobile(false), options);
      this.addEventListener('keydown', (event) => {
        if (event.key === 'Tab' && this.mobileMenu?.open && !this.media.matches) {
          const focusable = [...this.mobilePanel.querySelectorAll('a[href], button, input, select, textarea, summary, [tabindex="0"]')]
            .filter(el => {
              if (el.disabled || !el.getClientRects().length) return false;
              // Closed details can retain layout rectangles for hidden children.
              for (let parent = el.parentElement; parent && parent !== this.mobilePanel; parent = parent.parentElement) {
                if (parent.matches('details:not([open])') && parent.querySelector(':scope > summary') !== el) return false;
              }
              return true;
            });
          const first = focusable[0];
          const last = focusable.at(-1);
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault(); last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault(); first?.focus();
          }
        }
        if (event.key !== 'Escape') return;
        const opened = event.target.closest('details[open]') || this.querySelector('details[open]');
        if (!opened) return;
        event.preventDefault();
        if (opened === this.mobileMenu) { this.closeMobile(true); return; }
        opened.open = false;
        opened.querySelector(':scope > summary')?.focus();
      }, options);
      this.addEventListener('toggle', (event) => {
        const details = event.target;
        if (details === this.mobileMenu) {
          this.mobilePanel.setAttribute('aria-modal', String(details.open));
          if (details.open) closeButton?.focus();
          else this.mobilePanel.querySelectorAll('details[open]').forEach(item => { item.open = false; });
        }
        if (!(details instanceof HTMLDetailsElement) || !details.open) return;
        // Close only sibling disclosures; nested parents must stay open.
        const list = details.parentElement?.parentElement;
        list?.querySelectorAll(':scope > li > details[open]').forEach((other) => {
          if (other !== details) other.open = false;
        });
      }, { ...options, capture: true });
      document.addEventListener('pointerdown', (event) => {
        this.closeOutside(event.target);
      }, options);
      document.addEventListener('focusin', (event) => {
        if (this.mobileMenu?.open && !this.media.matches && !this.mobilePanel.contains(event.target)) {
          closeButton?.focus();
          return;
        }
        this.closeOutside(event.target);
      }, options);
      this.media = matchMedia('(min-width: 1100px)');
      this.media.addEventListener('change', () => {
        const wasOpen = this.mobileMenu?.open;
        this.closeAll();
        if (wasOpen && this.media.matches) this.querySelector('.site-header__brand')?.focus();
      }, options);
      this.resizeObserver = new ResizeObserver(() => {
        this.style.setProperty('--header-height', `${this.getBoundingClientRect().height}px`);
      });
      this.resizeObserver.observe(this);
    }
    closeOutside(target) {
      this.querySelectorAll('details[open]').forEach((details) => {
        if (!details.contains(target)) details.open = false;
      });
    }
    closeAll() {
      this.querySelectorAll('details[open]').forEach((details) => { details.open = false; });
    }
    closeMobile(restoreFocus) {
      if (!this.mobileMenu?.open) return;
      this.mobileMenu.open = false;
      if (restoreFocus) this.mobileMenu.querySelector(':scope > summary')?.focus();
    }
    disconnectedCallback() {
      this.closeAll();
      this.mobileMenu?.classList.remove('is-enhanced');
      this.controller?.abort();
      this.resizeObserver?.disconnect();
    }
  });
}
