/* Native details work without JS. This element adds Escape, outside-close, and editor lifecycle handling. */
if (!customElements.get('lefriance-header')) {
  customElements.define('lefriance-header', class extends HTMLElement {
    connectedCallback() {
      this.controller?.abort();
      this.resizeObserver?.disconnect();
      this.controller = new AbortController();
      const options = { signal: this.controller.signal };
      this.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        const opened = event.target.closest('details[open]') || this.querySelector('details[open]');
        if (!opened) return;
        event.preventDefault();
        opened.open = false;
        opened.querySelector(':scope > summary')?.focus();
      }, options);
      this.addEventListener('toggle', (event) => {
        const details = event.target;
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
        this.closeOutside(event.target);
      }, options);
      this.media = matchMedia('(min-width: 1100px)');
      this.media.addEventListener('change', () => this.closeAll(), options);
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
    disconnectedCallback() {
      this.controller?.abort();
      this.resizeObserver?.disconnect();
    }
  });
}
